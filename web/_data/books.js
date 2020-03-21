const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateBook (book) {
  return {
    ...book,
    cover: imageUrl(book.content.cover)
      .height(500)
      .url(),
    synopsis: BlocksToMarkdown(
      book.synopsis,
      {serializers, ...client.config()}
    )
  }
}

async function getBooks () {
  const filter = groq`*[_type == "book" && defined(content.slug)]`
  const projection = groq`{
    content {
      _id,
      cover,
      synopsis[]{
        ...,
        children[]{
          ...
        }
      },
      reviews[],
      releaseDate,
      slug,
      title
    }
  }`
  const order = `| order(releaseDate desc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareBooks = reducedDocs.map(generateBook)
  return prepareBooks
}

module.exports = getBooks
