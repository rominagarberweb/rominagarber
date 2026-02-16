const { DateTime } = require("luxon")
const util = require('util')
const CleanCSS = require("clean-css")
const Image = require("@11ty/eleventy-img")
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addNunjucksAsyncShortcode("responsiveImage", async function(src, alt) {
    if(alt === undefined) {
      throw new Error(`Missing \`alt\` on responsiveImage from: ${src}`);
    }

    let stats = await Image(src, {
      formats: ['webp', 'jpeg'],
      widths: [200, 400],
      urlPath: '/images/',
      outputDir: './_site/images/'
    })
    let lowestSrc = stats.jpeg[0]
    let sizes = "(max-width: 200px) 100vw, 200px"

    // Iterate over formats and widths
    return `<picture>
     ${Object.values(stats).map(imageFormat => {
       return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}">`
     }).join("\n")}
       <img
         alt="${alt}"
         src="${lowestSrc.url}"
         width="${lowestSrc.width}"
         height="${lowestSrc.height}">
     </picture>`
  })

  eleventyConfig.addFilter("dateToRfc3339", function (date) {
    let newDate = new Date(date);
    let s = newDate.toISOString();
  
    // remove milliseconds
    let split = s.split(".");
    split.pop();
  
    return split.join("") + "Z";
  });

  eleventyConfig.addFilter("htmlBaseUrl", function(content, base) {
    return content.replace(/(href|src)="([^"]*)"/g, (match, p1, p2) => {
      if (p2.startsWith('http') || p2.startsWith('//')) {
        return match;
      }
      return `${p1}="${base}${p2}"`;
    });
  });

  eleventyConfig.addFilter("addPathPrefixToFullUrl", function(url, prefix) {
    if (url.startsWith('http') || url.startsWith('//')) {
      return url;
    }
    return `${prefix}${url}`;
  });

  eleventyConfig.addFilter("getNewestCollectionItemDate", function(collection) {
    if (!collection || !collection.length) {
      return null;
    }
    return collection.reduce((latest, item) => {
      const itemDate = new Date(item.date);
      return itemDate > latest ? itemDate : latest;
    }, new Date(0));
  });

  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles
  })

  eleventyConfig.addFilter("debug", function(value) {
    return util.inspect(value, {compact: false})
  })

  eleventyConfig.addFilter("readableDate", dateObj => {
    options = { month: 'long', day: 'numeric', year: 'numeric' }
    return new Date(dateObj).toLocaleString('en-US', options)
  })

  eleventyConfig.addFilter("readableTime", dateObj => {
    options = { hour12: true, hour: '2-digit', minute: '2-digit' }
    return new Date(dateObj).toLocaleString('en-US', options)
  })

  eleventyConfig.addFilter("eventsExcludePast", obj => {
    const result = obj.filter(el => new Date(el.data.event.content.schedule.from) >= new Date())
    return result
  })

  eleventyConfig.addFilter("eventsExcludeFuture", obj => {
    const result = obj.filter(el => new Date(el.data.event.content.schedule.from) < new Date())
    return result
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd')
  })

  let markdownIt = require("markdown-it")
  let markdownItAnchor = require("markdown-it-anchor")
  let options = {
    html: true,
    breaks: true,
    linkify: true
  }
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  }

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  )

  eleventyConfig.addFilter("markdownify", function(value) {
    const md = new markdownIt(options)
    return md.render(value)
  })

  eleventyConfig.addFilter("contrastColor", function(hexColor) {
    if (!hexColor || typeof hexColor !== "string") {
      return "#000000"
    }

    let hex = hexColor.trim().replace("#", "")
    if (hex.length === 3) {
      hex = hex.split("").map(ch => ch + ch).join("")
    }
    if (hex.length !== 6) {
      return "#000000"
    }

    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255

    const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
    const rl = toLinear(r)
    const gl = toLinear(g)
    const bl = toLinear(b)

    const luminance = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl

    return luminance > 0.25 ? "#000000" : "#ffffff"
  })

  // Passthrough copy
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('fonts')
  eleventyConfig.addPassthroughCopy('scripts')
  eleventyConfig.addPassthroughCopy('pdfs')

  eleventyConfig.addShortcode("youtube", (videoURL, title) => {
		const url = new URL(videoURL);
		const id = url.searchParams.get("v");
		return `
	<iframe class="yt-shortcode" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player${
		  title ? ` for ${title}` : ""
		}" frameborder="0" allowfullscreen></iframe>
	`;
	});

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid",
      "pdf"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  }
}
