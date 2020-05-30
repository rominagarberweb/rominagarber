const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generateHomePage (homePage) {
  return {
    ...homePage,
    featured: homePage.featured.map(generateFeaturedBooks),
    image: imageUrl(homePage.heroImage)
      .height(580)
      .width(460)
      .url()
  }
}

function generateFeaturedBooks (featuredBooks) {
  return {
    ...featuredBooks,
    // Prepare featured books covers
    cover: imageUrl(featuredBooks.content.cover)
      .height(500)
      .url(),
    hook: BlocksToMarkdown(
      featuredBooks.content.hook,
      {serializers, ...client.config()}
    ),
    // Load first review from reviews array
    review: BlocksToMarkdown(
      featuredBooks.content.reviews[0].content,
      {serializers, ...client.config()}
    ),
    reviewAuthor: featuredBooks.content.reviews[0].author,
    synopsis: BlocksToMarkdown(
      featuredBooks.content.synopsis,
      {serializers, ...client.config()}
    )
  }
}

async function getHomePage () {
  const filter = groq`*[_type == "homePage"]`
  const projection = groq`{
    _id,
    "featured": featured[]->{
      content
    },
    heroDescription,
    heroImage,
    heroTitle,
    priorityLinks[]{
      title,
      url
    },
    socialLinks[]{
      title,
      url
    },
    "theme": theme->{
      "primary": primary.hex,
      "secondary": secondary.hex,
      "tertiary": tertiary.hex,
    },
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareHomePage = reducedDocs.map(generateHomePage)
  return prepareHomePage[0]
}

module.exports = getHomePage
