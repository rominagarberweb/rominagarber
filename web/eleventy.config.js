require('dotenv').config()
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(feedPlugin, {
		type: "rss", // "atom", or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 0,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Romina's Blog",
			subtitle: "About Young Adult books and writing tips.",
			base: "https://rominagarber.com/",
			author: {
				name: "Romina Garber",
				email: "", // Optional
			}
		}
	});
};