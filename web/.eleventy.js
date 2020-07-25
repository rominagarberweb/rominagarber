const { DateTime } = require("luxon")
const util = require('util')
const CleanCSS = require("clean-css")
const Image = require("@11ty/eleventy-img")

module.exports = function(eleventyConfig) {

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
    const result = obj.filter(el => new Date(el.data.event.content.schedule.to) >= new Date())
    return result
  })

  eleventyConfig.addFilter("eventsExcludeFuture", obj => {
    const result = obj.filter(el => new Date(el.data.event.content.schedule.to) < new Date())
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

  // Passthrough copy
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('fonts')
  eleventyConfig.addPassthroughCopy('scripts')

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
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
