const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function extractYouTubeId (url = '') {
  if (!url) return null
  let id = null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) {
      id = u.searchParams.get('v')
    } else if (u.hostname.includes('youtu.be')) {
      id = u.pathname.replace('/', '')
    }
  } catch (e) {
    // fallback parsing
    const vMatch = url.match(/v=([^&]+)/)
    if (vMatch) id = vMatch[1]
    else {
      const short = url.split('/').pop()
      id = short || null
    }
  }
  if (!id) return null
  const amp = id.indexOf('&')
  return amp === -1 ? id : id.substring(0, amp)
}

function prepareServiceCard (card = {}) {
  return {
    ...card,
    description: card.description ? BlocksToMarkdown(card.description, { serializers, ...client.config() }) : null,
    image: card.image ? imageUrl(card.image).height(260).width(160).url() : null
  }
}

function generateEditingServices (doc = {}) {
  return {
    ...doc,
    title: doc.title || null,
    description: doc.description || null,
    image: doc.mainImage ? imageUrl(doc.mainImage).height(580).width(460).url() : null,
    youtube: doc.youtube
      ? {
          url: doc.youtube.url || null,
          description: doc.youtube.description || null
        }
      : null,
    introduction: doc.introduction ? BlocksToMarkdown(doc.introduction, { serializers, ...client.config() }) : null,
    serviceCards: Array.isArray(doc.serviceCards) ? doc.serviceCards.map(prepareServiceCard) : []
  }
}

async function getEditingServices () {
  const filter = groq`*[_type == "editingServices"]`
  const projection = groq`{
    _id,
    title,
    description,
    mainImage,
    youtube{ url, description },
    introduction[]{
      ...,
      children[]{ ... }
    },
    serviceCards[]{
      ...,
      image
    }
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => { console.error('editingServices data fetch error', err); return [] })
  const reduced = overlayDrafts(hasToken, docs)
  const prepared = reduced.map(generateEditingServices)
  return prepared[0] || null
}

module.exports = getEditingServices