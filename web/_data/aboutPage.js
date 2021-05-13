const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateAboutPage (aboutPage) {
  return {
    ...aboutPage,
    bio: BlocksToMarkdown(
      aboutPage.bio,
      {serializers, ...client.config()}
    ),
    bioSpanish: BlocksToMarkdown(
      aboutPage.bioSpanish,
      {serializers, ...client.config()}
    ),
    image: imageUrl(aboutPage.mainImage)
      .height(580)
      .width(460)
      .url(),
  }
}

async function getAboutPage () {
  const filter = groq`*[_type == "aboutPage"]`
  const projection = groq`{
    _id,
    bio[]{
      ...,
      children[]{
        ...
      }
    },
    bioSpanish[]{
      ...,
      children[]{
        ...
      }
    },
    mainImage,
    "original": mainImage.asset->url,
    publishers[]{
      title,
      url
    }
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareAboutPage = reducedDocs.map(generateAboutPage)
  return prepareAboutPage[0]
}

module.exports = getAboutPage
