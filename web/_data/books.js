const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateBook (book) {
  const intCoversContent = book.internationalCovers ? book.internationalCovers.map(generateIntCovers) : []
  const reviewsContent = book.reviews ? book.reviews.map(generateReviews) : []
  return {
    ...book,
    cover: imageUrl(book.cover)
      .height(500)
      .url(),
    hook: BlocksToMarkdown(
      book.hook,
      {serializers, ...client.config()}
    ),
    internationalCovers: intCoversContent,
    reviews: reviewsContent,
    synopsis: BlocksToMarkdown(
      book.synopsis,
      {serializers, ...client.config()}
    )
  }
}

function generateIntCovers (cover) {
  return {
    caption: cover.caption,
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
  const testQuery = groq`*[_type == "book" && defined(slug)]`
  const filter = groq`*[_type == "book" && defined(slug)]`
  const projection = groq`{
    _id,
    cover,
    hook[]{
      ...,
      children[]{
        ...
      }
    },
    internationalCovers[],
    links[],
    "original": cover.asset->url,
    "press": press[]{
      publishedAt,
      source,
      title,
      url
    },
    "pressItems": pressItems[]->{
      publishedAt,
      source,
      title,
      lead[]{
        ...,
      },
      url
    },
    publishers[]{
      title,
      url
    },
    releaseDate,
    "reviews": reviews[]{
      author,
      content[]
    },
    "series": series->{
      _id
    },
    slug,
    synopsis[]{
      ...,
      children[]{
        ...
      }
    },
    "theme": theme->{
      "primary": primary.hex,
      "secondary": secondary.hex,
      "tertiary": tertiary.hex,
    },
    title,
    buyBookFrom[],
    addToGoodreads
  }`
  const order = `| order(releaseDate desc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const test = await client.fetch(testQuery)
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareBooks = reducedDocs.map(generateBook)
  return prepareBooks
}

module.exports = getBooks
