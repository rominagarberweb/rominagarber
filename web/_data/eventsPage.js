const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token

function generateEventsPage (eventsPage) {
  return {
    ...eventsPage,
    intro: BlocksToMarkdown(eventsPage.intro, { serializers, ...client.config() })
  }
}

async function getEventsPage () {
  const filter = groq`*[_type == 'eventsPage']`
  const projection = groq`{
    _id,
    intro[]{
      ...,
      children[]{
        ...
      }
    }
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareEventsPage = reducedDocs.map(generateEventsPage)
  return prepareEventsPage[0]
}

module.exports = getEventsPage
