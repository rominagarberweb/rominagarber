const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateBioLinks (bioLinks) {
    return {
    ...bioLinks,
    image: imageUrl(bioLinks.mainImage)
      .height(400)
      .width(400)
      .url(),
    }
}
    
async function getBioLinks () {
    const filter = groq`*[_type == "bioLinks"]`
    const projection = groq`{
        _id,
        links[],
        mainImage,
        url
        }
    }`
    const query = [filter, projection].join(' ')
    const docs = await client.fetch(query).catch(err => console.error(err))
    const reducedDocs = overlayDrafts(hasToken, docs)
    const prepareAboutPage = reducedDocs.map(generateAboutPage)
    return prepareAboutPage[0]
}

module.exports = getBioLinks