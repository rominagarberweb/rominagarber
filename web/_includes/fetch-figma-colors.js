/*
 * This script fetches all color styles from a Figma team/document. https://johanbrook.com/writings/2019-03-30-using-figmas-api-to-sync-colours/
 *
 * Dependencies:
 *
 *  - node-fetch
 *
 * Due to a limitation in the Figma /styles endpoint, we need to use a
 * document for actually using the colors in a color grid 🙄That's why
 * we're both fetching from /styles and /files below.
 *
 * For now, you need to input the page and team IDs, as well as the file keys.
 * The team ID is in the Figma URL of your team, and the file key is the long
 * string in the full URL of a Figma file. The page ID is visible in the JSON
 * payload when you call /files 🤷‍♂️
 */
// Inspect the /files JSON response, or the URL of the Figma page:
// https://www.figma.com/file/<file key>/Some-Name?node-id=<encoded page ID, like '183%3A0 = 183:0'>
const PAGE_ID = '309:313';
// Go to a team URL and get the ID:
// https://www.figma.com/files/team/<team id>/Team-Name
const TEAM_ID = '755621434830415363';
// Get this from the URL of a single file:
// https://www.figma.com/file/<file key>/Some-Name?node-id=182%3A0
const FILE_KEY = 'N8Lhk2clpB5ESC6eERpvcK';

const fetch = require('node-fetch');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const writeFile = promisify(fs.writeFile);

const personalToken = process.env.FIGMA_PERSONAL_TOKEN;

if (!personalToken) {
    console.error('Please pass FIGMA_PERSONAL_TOKEN to this script and re-run');
    process.exit(1);
}

const figmaBase = 'https://api.figma.com/';

const rgbToHex = (r, g, b) =>
    '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

const slugify = (str) => str.toLowerCase().replace(/\s+/, '-');

const doFetch = (url) =>
    fetch(`${figmaBase}v1${url}`, {
        headers: {
            'X-Figma-Token': personalToken,
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Status: ${res.status}`);
            }

            return res.json();
        })
        .then((json) => {
            if (json.error || (json.status && json.status !== 200)) {
                throw new Error(
                    json.error || `Status ${json.status}: ${json.err}`
                );
            }

            return json;
        });

const fetchStyles = async (teamId) => {
    const json = await doFetch(`/teams/${teamId}/styles?page_size=99`);

    return json.meta.styles;
};

const fetchFile = async (key) => await doFetch(`/files/${key}`);

// eslint-disable-next-line
const fetchStyle = async (key) => await doFetch(`/styles/${key}`);

/**
 * Fetches all color styles from the Figma doc and returns an object
 * array with this shape:
 * 
 * ```json
 * {
 *   "key": "206f4e4753e2e8f2e7ac24744bd1843ac206ead1",
 *   "file_key": "bMb57SxaX0ugGmWMmi7KVzIP",
 *   "node_id": "189:85",
 *   "style_type": "FILL",
 *   "thumbnail_url": "<url>",
 *   "name": "Green 10",
 *   "description": "Desc",
 *   "created_at": "2019-02-16T16:00:39.126Z",
 *   "updated_at": "2019-02-16T16:00:39.126Z",
 *   "user": {
 *     "id": "575212366706412863",
 *     "handle": "Johan Brook",
 *     "img_url": "<url>"
 *   },
 *   "sort_position": "=O",
 *   "color": "#ebfff7"
 * }
 ```
 */
const fetchAllColorStyles = async () => {
    const styles = await fetchStyles(TEAM_ID);
    const file = await fetchFile(FILE_KEY);

    const canvas = file.document.children.find((page) => page.id === PAGE_ID);

    return (
        canvas &&
        canvas.children
            .filter((c) => c.type === 'INSTANCE')
            .map((c) => c.children.filter((c) => c.type === 'RECTANGLE')[0])
            .filter((c) => !!c.styles && !!c.styles.fill)
            .map((c) => {
                const { r, g, b } = c.fills[0].color;
                const nodeId = c.styles.fill;

                return {
                    // Cross reference to the array of styles, since Figma doesn't
                    // give us the HEX color codes in their /styles endpoint .. :(
                    ...styles.find((s) => s.node_id === nodeId),
                    color: rgbToHex(r * 255, g * 255, b * 255),
                };
            })
            .filter((c) => !!c.name)
    );
};

/**
 * Calls Figma's API and saves to a `colors.js` file in the project root.
 */
const writeColorsFromFigma = async () => {
    const styles = await fetchAllColorStyles();

    if (!styles) {
        throw new Error('No styles found');
    }

    const colors = styles
        .sort((a, b) => (a.sort_position < b.sort_position ? -1 : 1))
        .map(
            (s) => {
                return (s.description ? `/** ${s.description} */\n` : '') + `'${slugify(s.name)}': '${s.color}',`
            }
        )
        .join('\n');

    const fileContents = `/* eslint-disable */
/* Updated at ${new Date().toUTCString()}*/
module.exports = {
${colors}
}`;

    await writeFile(path.resolve(__dirname + './colors.js'), fileContents);

    console.log(`Wrote ${styles.length} colors to colors.js`);
};

writeColorsFromFigma().catch(console.error);