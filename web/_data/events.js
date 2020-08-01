const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateEvent (event) {
  return {
    ...event,
    description: BlocksToMarkdown(event.content.description,
      { serializers, ...client.config() }
    ),
    previewImage: imageUrl(event.content.previewImage)
      .height(450)
      .width(800)
      .url(),
  }
}

async function getEvents () {
  const filter = groq`*[_type == "event"]`
  const projection = groq`{
    content {
      _id,
      bannerText,
      description[]{
        ...,
        children[]{
          ...
        }
      },
      link,
      name,
      previewImage,
      schedule,
      shortDescription,
      slug,
      venue
    }
  }`
  const order = `| order(content.schedule.from asc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareEvents = reducedDocs.map(generateEvent)
  return prepareEvents
}

module.exports = getEvents
