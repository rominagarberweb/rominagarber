const axios = require('axios')

const params = {
  access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
  business_id: process.env.INSTAGRAM_BUSINESS_ID,
  username: process.env.INSTAGRAM_USERNAME,
  max_posts: 8
}

async function getInstagramPosts ({ access_token, business_id, username, max_posts }) {
  return axios
    .get(`https://graph.facebook.com/v3.1/${business_id}/media?fields=media_url,thumbnail_url,caption,media_type,like_count,shortcode,timestamp,comments_count,username&limit=${max_posts}&access_token=${access_token}`)
    .then(async (response) => {
      const posts = []
      posts.push(...response.data.data)
      return posts
    })
    .catch(async (err) => {
      console.warn(
        `\nCould not get instagram posts using the Graph API. Error status: ${err}`
      )
    })
}

module.exports = getInstagramPosts(params)
