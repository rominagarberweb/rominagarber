const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token

function generateTip (tip) {
  return {
    ...tip,
    content: BlocksToMarkdown(tip.content, { serializers, ...client.config() })
  }
}

async function getTips () {
  const filter = groq`*[_type == 'tip']`
  const projection = groq`{
    _id,
    content[]{
      ...,
      children[]{
        ...
      }
    },
    name,
    slug
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareTips = reducedDocs.map(generateTip)
  return prepareTips
}

module.exports = getTips
