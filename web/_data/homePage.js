const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateHomePage (homePage) {
  return {
    ...homePage,
    image: imageUrl(homePage.heroImage)
      .height(580)
      .width(460)
      .url(),
  }
}

async function getHomePage () {
  const filter = groq`*[_type == "homePage"]`
  const projection = groq`{
    _id,
    heroDescription,
    heroImage,
    heroTitle,
    priorityLinks[]{
      title,
      url
    },
    socialLinks[]{
      title,
      url
    }
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareHomePage = reducedDocs.map(generateHomePage)
  return prepareHomePage[0]
}

module.exports = getHomePage