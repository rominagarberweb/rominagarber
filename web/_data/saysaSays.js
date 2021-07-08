const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateSaysaSays (saysaSays) {
  return {
    ...saysaSays,
    bodyContent: BlocksToMarkdown(
      saysaSays.bodyContent,
      {serializers, ...client.config()}
    ),
    cta: BlocksToMarkdown(
        saysaSays.cta,
        {serializers, ...client.config()}
    ),
    image: imageUrl(saysaSays.mainImage)
      .height(580)
      .width(460)
      .url(),
  }
}

async function getSaysaSays () {
  const filter = groq`*[_type == "saysaSays"]`
  const projection = groq`{
    _id,
    mainImage,
    title,
    bodyContent[]{
      ...,
      children[]{
        ...
      }
    },
    cta[]{
      ...,
      children[]{
        ...
      }
    },
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareSaysaSays = reducedDocs.map(generateSaysaSays)
  return prepareSaysaSays[0]
}

module.exports = getSaysaSays
