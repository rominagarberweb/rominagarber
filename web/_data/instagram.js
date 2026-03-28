const axios = require('axios')

const params = {
  access_token: process.env.INSTAGRAM_ACCESS_TOKEN || 'REPLACE_WITH_TOKEN',
  business_id: process.env.INSTAGRAM_BUSINESS_ID || 'REPLACE_WITH_ID',
  username: process.env.INSTAGRAM_USERNAME || 'rominagarber',
  max_posts: 8
}

async function getInstagramPosts ({ access_token, business_id, username, max_posts }) {
  if (!access_token || !business_id) {
    console.warn('instagram: missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ID')
    return []
  }

  const version = process.env.FB_GRAPH_VERSION || 'v8.0'
  const url = `https://graph.facebook.com/${version}/${business_id}/media`
  const qs = `?fields=media_url,thumbnail_url,caption,media_type,like_count,shortcode,timestamp,comments_count,username&limit=${max_posts}&access_token=${access_token}`

  try {
    const response = await axios.get(url + qs)
    const data = response && response.data && response.data.data
    if (!Array.isArray(data)) {
      console.warn('instagram: unexpected API response shape', response.data)
      return []
    }
    // normalize posts
    return data.map(item => ({
      media_url: item.media_url || item.thumbnail_url || null,
      thumbnail_url: item.thumbnail_url || null,
      caption: item.caption || '',
      media_type: item.media_type || 'IMAGE',
      like_count: item.like_count || 0,
      shortcode: item.shortcode || null,
      timestamp: item.timestamp || null,
      comments_count: item.comments_count || 0,
      username: item.username || username || null
    }))
  } catch (err) {
    console.warn('instagram: API request failed', err.response ? err.response.data : err.message)
    return []
  }
}

module.exports = getInstagramPosts(params)
