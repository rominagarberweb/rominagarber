const SanityImageUrl = require('@sanity/image-url')
const sanityClient = require('./sanityClient')

// Learn more: https://www.sanity.io/docs/asset-pipeline/image-urls
// Prevents third-party cookies by appending no-cookies parameter
function urlFor(source) {
  const builder = SanityImageUrl(sanityClient).image(source)
  
  // Create a wrapper object that intercepts method calls
  const wrappedBuilder = {
    // Store original builder methods for chaining
    _builder: builder,
    
    height(h) {
      this._builder = this._builder.height(h)
      return this
    },
    
    width(w) {
      this._builder = this._builder.width(w)
      return this
    },
    
    rect(left, top, width, height) {
      this._builder = this._builder.rect(left, top, width, height)
      return this
    },
    
    url() {
      const url = this._builder.url()
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}no-cookies=true`
    }
  }
  
  return wrappedBuilder
}

module.exports = urlFor
