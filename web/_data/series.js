const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateSeries (series) {
  const reviewsContent = series.reviews ? series.reviews.map(generateReviews) : []
  return {
    ...series,
    description: BlocksToMarkdown(
      series.description,
      {serializers, ...client.config()}
    ),
    image: imageUrl(series.image)
      .height(500)
      .url(),
    reviews: reviewsContent
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

async function getSeries () {
  const filter = groq`*[_type == "series" && defined(slug)]`
  const projection = groq`{
    _id,
    agent{
      title,
      url
    },
    description[]{
      ...,
      children[]{
        ...
      }
    },
    image,
    links[]{
      title,
      url
    },
    "pressItems": pressItems[]->{
      publishedAt,
      title
    },
    publishers[]{
      title,
      url
    },
    "reviews": reviews[]{
      author,
      content[]
    },
    slug,
    title
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareSeries = reducedDocs.map(generateSeries)
  return prepareSeries
}

module.exports = getSeries
