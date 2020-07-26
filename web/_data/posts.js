const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function generatePost (post) {
  return {
    ...post,
    body: BlocksToMarkdown(
      post.body,
      {serializers, ...client.config()}
    ),
    excerpt: BlocksToMarkdown(
      post.excerpt,
      {serializers, ...client.config()}
    ),
    thumbImage: imageUrl(post.mainImage)
      .height(200)
      .width(200)
      .url(),
    image: imageUrl(post.mainImage)
      .height(800)
      .width(800)
      .url(),
  }
}

async function getPosts () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "post" && defined(slug) && publishedAt < now()]`
  const projection = groq`{
    _id,
    "authors": authors[].author->{name},
    body[]{
      ...,
      children[]{
        ...,
        // Join inline reference
        _type == "tipReference" => {
          // check /studio/documents/tip.js for more fields
          "name": @.tip->name,
          "slug": @.tip->slug
        }
      }
    },
    excerpt[]{
      ...,
      children[]{
        ...,
      }
    },
    mainImage,
    publishedAt,
    title,
    slug
  }`
  const order = `| order(publishedAt asc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const preparePosts = reducedDocs.map(generatePost)
  return preparePosts
}

module.exports = getPosts
