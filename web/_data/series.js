const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateSeriesItem (series) {
  const reviewsContent = series.reviews ? series.reviews.map(r => ({
    ...r,
    content: r.content ? BlocksToMarkdown(r.content, { serializers, ...client.config() }) : ''
  })) : []

  const seriesBooks = series.seriesBooks ? series.seriesBooks.map(b => ({
    _id: b._id,
    title: b.title,
    slug: b.slug || (b.slug && b.slug.current) || null,
    cover: b.cover ? imageUrl(b.cover).height(260).width(160).url() : null,
    theme: b.theme || null,
    releaseDate: b.releaseDate || null
  })) : []

  return {
    ...series,
    description: series.description ? BlocksToMarkdown(series.description, { serializers, ...client.config() }) : '',
    image: series.image ? imageUrl(series.image).height(500).url() : null,
    reviews: reviewsContent,
    seriesBooks: seriesBooks
  }
}

async function getSeries () {
  const filter = groq`*[_type == "series"]`
  const projection = groq`{
    _id,
    title,
    slug,
    image,
    links[]{ title, url },
    publishers[]{ title, url },
    "pressItems": pressItems[]->{publishedAt, title},
    reviews[]{
      author,
      content[]{ ..., children[]{ ... } }
    },
    "seriesBooks": seriesBooks[]->{
      _id,
      title,
      "slug": slug,
      cover,
      theme,
      releaseDate
    },
    description[]{ ..., children[]{ ... } }
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => { console.error(err); return [] })
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepared = reducedDocs.map(generateSeriesItem)
  return prepared
}

module.exports = getSeries
