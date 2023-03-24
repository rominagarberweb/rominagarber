const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateBooksPage (booksPage) {
  return {
    ...booksPage,
    books: booksPage.books.map(generateBooksList)
  }
}

function generateBooksList (books) {
  return {
    ...books,
    // Prepare featured books covers
    cover: imageUrl(books.cover)
      .height(500)
      .url(),
    hook: BlocksToMarkdown(
      books.hook,
      {serializers, ...client.config()}
    ),
    // Load first review from reviews array
    review: BlocksToMarkdown(
      books.reviews && books.reviews[0] && books.reviews[0].content,
      {serializers, ...client.config()}
    ),
    reviewAuthor: books.reviews && books.reviews[0] && books.reviews[0].author,
    synopsis: BlocksToMarkdown(
      books.synopsis,
      {serializers, ...client.config()}
    )
  }
}

async function getBooksPage () {
  const filter = groq`*[_type == "booksPage"]`
  const projection = groq`{
    _id,
    "books": books[]->{cover},
    genre
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareBooksPage = reducedDocs.map(generateBooksPage)
  return prepareBooksPage[0]
}

module.exports = getBooksPage
