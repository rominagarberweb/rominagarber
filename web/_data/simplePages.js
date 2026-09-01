const crypto = require('crypto')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function toMarkdown (value) {
  if (!value || !value.length) return ''
  return BlocksToMarkdown(value, {serializers, ...client.config()})
}

const DEFAULT_GATE_WHY =
  'This page is exclusive. Enter the password you were given to view it.'
const DEFAULT_GATE_UNLOCKS =
  'Once you unlock it, you can read the full page and use any downloads within.'
const DEFAULT_GATE_HELP = "Don't have the password? Reach out to Romina on social."

function hashPassword (password) {
  const normalized = (password || '').trim().toLowerCase()
  if (!normalized) return null
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex')
}

function downloadHref (item) {
  if (item.source === 'url') return item.url || null
  const fileUrl = item.file && item.file.asset && item.file.asset.url
  if (!fileUrl) return null
  const filename = (item.file.asset.originalFilename || 'download').replace(/"/g, '')
  return `${fileUrl}?dl=${encodeURIComponent(filename)}`
}

function generateBlocks (blocks) {
  return (blocks || []).map(block => {
    if (block._type === 'textBlock' || block._type === 'introBlock') {
      return {
        ...block,
        body: toMarkdown(block.body)
      }
    }
    if (block._type === 'callToAction') {
      return {
        ...block,
        body: toMarkdown(block.body)
      }
    }
    if (block._type === 'imageBlock' && block.image) {
      return {
        ...block,
        imageUrl: imageUrl(block.image).width(1200).url()
      }
    }
    if (block._type === 'downloadList') {
      return {
        ...block,
        items: (block.items || []).map(item => ({
          ...item,
          href: downloadHref(item)
        }))
      }
    }
    return block
  })
}

function firstText (...values) {
  for (const value of values) {
    const trimmed = (value || '').trim()
    if (trimmed) return trimmed
  }
  return ''
}

function generateSimplePage (page, settings) {
  const passwordHash = hashPassword(page.password)
  return {
    _id: page._id,
    title: page.title,
    slug: page.slug,
    description: page.description || '',
    socialImageUrl: page.socialImage ? imageUrl(page.socialImage).width(1200).url() : '',
    isProtected: Boolean(page.passwordProtected) && Boolean(passwordHash),
    passwordHash,
    gateWhy: firstText(page.gateWhy, settings.gateWhy, DEFAULT_GATE_WHY),
    gateUnlocks: firstText(page.gateUnlocks, settings.gateUnlocks, DEFAULT_GATE_UNLOCKS),
    gateHelp: firstText(page.gateHelp, settings.gateHelp, DEFAULT_GATE_HELP),
    pageBuilder: generateBlocks(page.pageBuilder)
  }
}

async function getSimplePages () {
  const filter = groq`*[_type == "simplePage" && defined(slug.current)]`
  const projection = groq`{
    _id,
    title,
    slug,
    description,
    password,
    passwordProtected,
    gateWhy,
    gateUnlocks,
    gateHelp,
    socialImage,
    pageBuilder[] {
      _key,
      _type,
      ...,
      _type == "downloadList" => {
        items[] {
          _key,
          label,
          format,
          source,
          url,
          file {
            asset->{
              url,
              originalFilename
            }
          }
        }
      }
    }
  }`
  const settingsQuery = groq`*[_id == "siteSettings"][0]{gateWhy, gateUnlocks, gateHelp}`
  const query = [filter, projection].join(' ')
  const [docs, settings] = await Promise.all([
    client.fetch(query).catch(err => {
      console.error(err)
      return []
    }),
    client.fetch(settingsQuery).catch(err => {
      console.error(err)
      return null
    })
  ])
  const reducedDocs = overlayDrafts(hasToken, docs || [])
  return reducedDocs.map(page => generateSimplePage(page, settings || {}))
}

module.exports = getSimplePages
