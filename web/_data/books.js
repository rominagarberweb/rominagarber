const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateBook (book) {
  const intCoversContent = book.content.internationalCovers ? book.content.internationalCovers.map(generateIntCovers) : []
  const reviewsContent = book.content.reviews ? book.content.reviews.map(generateReviews) : []
  return {
    ...book,
    cover: imageUrl(book.content.cover)
      .height(500)
      .url(),
    internationalCovers: intCoversContent,
    reviews: reviewsContent,
    synopsis: BlocksToMarkdown(
      book.content.synopsis,
      {serializers, ...client.config()}
    )
  }
}

function generateIntCovers (cover) {
  return {
    alt: cover.alt,
    cover: imageUrl(cover)
      .height(500)
      .url()
  }
}

function generateReviews (review) {
  return {
    author: review.author,
    content: BlocksToMarkdown(
      review.content,
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
      internationalCovers[],
      links[],
      "pressItems": pressItems[]->{
        publishedAt,
        title
      },
      releaseDate,
      "reviews": reviews[]{
        author,
        content[]
      },
      slug,
      synopsis[]{
        ...,
        children[]{
          ...
        }
      },
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
