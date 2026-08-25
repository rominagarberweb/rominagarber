const axios = require('axios')

const INSTAGRAM_WEB_APP_ID = '936619743392459'
const INSTAGRAM_FALLBACK_RETRY_DELAYS_MS = [1000, 3000, 7000]

const params = {
  access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
  business_id: process.env.INSTAGRAM_BUSINESS_ID,
  username: process.env.INSTAGRAM_USERNAME || 'rominagarber',
  max_posts: 8
}

function mapPublicInstagramPost ({ node, username }) {
  if (!node || !node.display_url) {
    return null
  }

  const captionEdges = node.edge_media_to_caption && node.edge_media_to_caption.edges
    ? node.edge_media_to_caption.edges
    : []
  const firstCaption = captionEdges[0] && captionEdges[0].node
    ? captionEdges[0].node.text
    : ''

  return {
    media_url: node.display_url,
    thumbnail_url: node.thumbnail_src || node.display_url,
    caption: firstCaption,
    media_type: node.is_video ? 'VIDEO' : 'IMAGE',
    like_count: null,
    shortcode: node.shortcode,
    timestamp: node.taken_at_timestamp
      ? new Date(node.taken_at_timestamp * 1000).toISOString()
      : null,
    comments_count: null,
    username
  }
}

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isRetryableInstagramError (err) {
  const status = err && err.response ? err.response.status : null
  return status === 429 || (status >= 500 && status < 600)
}

function getInstagramErrorDetails (err) {
  const status = err && err.response ? err.response.status : 'unknown'
  const payload = err && err.response && err.response.data
    ? err.response.data
    : null

  const apiError = payload && payload.error ? payload.error : null
  const type = apiError && apiError.type ? apiError.type : null
  const code = apiError && typeof apiError.code !== 'undefined' ? apiError.code : null
  const message = apiError && apiError.message ? apiError.message : (err && err.message ? err.message : String(err))

  return {
    status,
    type,
    code,
    message
  }
}

function mapGraphApiPost ({ post, username }) {
  return {
    media_url: post.media_url,
    thumbnail_url: post.thumbnail_url || post.media_url,
    caption: post.caption || '',
    media_type: post.media_type,
    like_count: post.like_count || null,
    shortcode: post.shortcode || null,
    timestamp: post.timestamp || null,
    comments_count: post.comments_count || null,
    username: post.username || username
  }
}

async function getBusinessGraphPosts ({ access_token, business_id, username, max_posts }) {
  if (!access_token || !business_id) {
    return null
  }

  const response = await axios.get(
    `https://graph.facebook.com/v8.0/${business_id}/media?fields=media_url,thumbnail_url,caption,media_type,like_count,shortcode,timestamp,comments_count,username&limit=${max_posts}&access_token=${access_token}`
  )

  const posts = response.data && response.data.data ? response.data.data : []
  return posts
    .slice(0, max_posts)
    .map((post) => mapGraphApiPost({ post, username }))
    .filter((post) => post.media_url)
}

async function getBasicDisplayGraphPosts ({ access_token, username, max_posts }) {
  if (!access_token) {
    return null
  }

  const response = await axios.get(
    `https://graph.instagram.com/me/media?fields=media_url,thumbnail_url,caption,media_type,permalink,timestamp&limit=${max_posts}&access_token=${access_token}`
  )

  const posts = response.data && response.data.data ? response.data.data : []
  return posts
    .slice(0, max_posts)
    .map((post) => mapGraphApiPost({ post: { ...post, shortcode: post.permalink }, username }))
    .filter((post) => post.media_url)
}

async function getPublicInstagramPosts ({ username, max_posts }) {
  const fallbackUsername = username || 'rominagarber'

  // Temporary fallback: remove once Graph API token flow is stable again.
  if (!username) {
    console.warn('\nINSTAGRAM_USERNAME is missing. Falling back to default username: rominagarber.')
  }

  let lastError = null

  for (let attempt = 0; attempt <= INSTAGRAM_FALLBACK_RETRY_DELAYS_MS.length; attempt++) {
    try {
      const response = await axios.get(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(fallbackUsername)}`,
        {
          headers: {
            'x-ig-app-id': INSTAGRAM_WEB_APP_ID,
            'x-requested-with': 'XMLHttpRequest',
            'user-agent': 'Mozilla/5.0',
            referer: `https://www.instagram.com/${encodeURIComponent(fallbackUsername)}/`
          },
          timeout: 15000
        }
      )

      const edges = response.data &&
        response.data.data &&
        response.data.data.user &&
        response.data.data.user.edge_owner_to_timeline_media &&
        response.data.data.user.edge_owner_to_timeline_media.edges
        ? response.data.data.user.edge_owner_to_timeline_media.edges
        : []

      return edges
        .slice(0, max_posts)
        .map(({ node }) => mapPublicInstagramPost({ node, username: fallbackUsername }))
        .filter(Boolean)
    } catch (err) {
      lastError = err
      if (!isRetryableInstagramError(err) || attempt === INSTAGRAM_FALLBACK_RETRY_DELAYS_MS.length) {
        break
      }

      const waitMs = INSTAGRAM_FALLBACK_RETRY_DELAYS_MS[attempt]
      const status = err.response ? err.response.status : 'unknown'
      console.warn(
        `\nInstagram public fallback got status ${status}. Retrying in ${waitMs}ms (attempt ${attempt + 1}/${INSTAGRAM_FALLBACK_RETRY_DELAYS_MS.length + 1}).`
      )
      await sleep(waitMs)
    }
  }

  console.warn(
    `\nCould not get instagram posts using temporary public fallback. Details: ${JSON.stringify(getInstagramErrorDetails(lastError))}`
  )
  return []
}

async function getInstagramPosts ({ access_token, business_id, username, max_posts }) {
  if (!access_token) {
    console.warn(
      '\nINSTAGRAM_ACCESS_TOKEN is missing. Using temporary public fallback.'
    )
    return getPublicInstagramPosts({ username, max_posts })
  }

  if (business_id) {
    try {
      return await getBusinessGraphPosts({ access_token, business_id, username, max_posts })
    } catch (err) {
      const details = getInstagramErrorDetails(err)
      console.warn(
        `\nCould not get instagram posts using the Graph API business endpoint. Details: ${JSON.stringify(details)}`
      )
    }
  } else {
    console.warn('\nINSTAGRAM_BUSINESS_ID is missing. Skipping Graph API business endpoint.')
  }

  try {
    return await getBasicDisplayGraphPosts({ access_token, username, max_posts })
  } catch (err) {
    const details = getInstagramErrorDetails(err)
    console.warn(
      `\nCould not get instagram posts using the Graph API basic display endpoint. Details: ${JSON.stringify(details)}`
    )
  }

  console.warn(
    '\nFalling back to temporary public instagram profile fetch.'
  )
  return getPublicInstagramPosts({ username, max_posts })
}

module.exports = getInstagramPosts(params)
