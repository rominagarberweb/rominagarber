const axios = require('axios')

const INSTAGRAM_WEB_APP_ID = '936619743392459'

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

async function getPublicInstagramPosts ({ username, max_posts }) {
  const fallbackUsername = username || 'rominagarber'

  // Temporary fallback: remove once Graph API token flow is stable again.
  if (!username) {
    console.warn('\nINSTAGRAM_USERNAME is missing. Falling back to default username: rominagarber.')
  }

  try {
    const response = await axios.get(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(fallbackUsername)}`,
      {
        headers: {
          'x-ig-app-id': INSTAGRAM_WEB_APP_ID,
          'x-requested-with': 'XMLHttpRequest',
          'user-agent': 'Mozilla/5.0'
        }
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
    console.warn(
      `\nCould not get instagram posts using temporary public fallback. Error status: ${err}`
    )
    return []
  }
}

async function getInstagramPosts ({ access_token, business_id, username, max_posts }) {
  if (!access_token || !business_id) {
    console.warn(
      '\nINSTAGRAM_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ID is missing. Using temporary public fallback.'
    )
    return getPublicInstagramPosts({ username, max_posts })
  }

  return axios
    .get(`https://graph.facebook.com/v8.0/${business_id}/media?fields=media_url,thumbnail_url,caption,media_type,like_count,shortcode,timestamp,comments_count,username&limit=${max_posts}&access_token=${access_token}`)
    .then(async (response) => {
      const posts = []
      posts.push(...response.data.data)
      return posts
    })
    .catch(async (err) => {
      console.warn(
        `\nCould not get instagram posts using the Graph API. Error status: ${err}`
      )

      console.warn(
        '\nFalling back to temporary public instagram profile fetch.'
      )
      return getPublicInstagramPosts({ username, max_posts })
    })
}

module.exports = getInstagramPosts(params)
