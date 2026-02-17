const SanityImageUrl = require('@sanity/image-url')
const sanityClient = require('./sanityClient')

// Learn more: https://www.sanity.io/docs/asset-pipeline/image-urls
function urlFor(source) {
  const builder = SanityImageUrl(sanityClient).image(source)
  
  // Wrap the url() method to append no-cookies parameter
  const originalUrl = builder.url.bind(builder)
  builder.url = function() {
    const url = originalUrl()
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}no-cookies=true`
  }
  
  return builder
}

module.exports = urlFor
