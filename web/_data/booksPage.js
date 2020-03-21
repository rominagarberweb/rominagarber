const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token

function generateBooksPage (booksPage) {
  return {
    ...booksPage,
    genre: BlocksToMarkdown(booksPage.genre, { serializers, ...client.config() })
  }
}

async function getBooksPage () {
  const filter = groq`*[_type == "booksPage"]`
  const projection = groq`{
    _id,
    "featured": featured[]->{
      content
    },
    genre[]{
      ...,
      children[]{
        ...
      }
    }
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareBooksPage = reducedDocs.map(generateBooksPage)
  return prepareBooksPage[0]
}

module.exports = getBooksPage
