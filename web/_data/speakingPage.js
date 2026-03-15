const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function prepareTestimonial (testimonial = {}) {
  return {
    ...testimonial,
    content: testimonial.content
      ? BlocksToMarkdown(testimonial.content, {serializers, ...client.config()})
      : null,
    author: testimonial.author || null
  }
}

function prepareAdditionalImage (entry = {}) {
  const image = entry.image || null
  return {
    image,
    imageUrl: image ? imageUrl(image).height(580).width(460).url() : null,
    photoCredit: entry.photoCredit || null
  }
}

function generateSpeakingPage (doc = {}) {
  return {
    ...doc,
    headline: doc.headline || 'Speaking Events and Workshops',
    description: doc.description || null,
    heroImageUrl: doc.heroImage ? imageUrl(doc.heroImage).height(580).width(460).url() : null,
    heroPhotoCredit: doc.heroPhotoCredit || null,
    speakingTopics: Array.isArray(doc.speakingTopics) ? doc.speakingTopics.filter(Boolean) : [],
    availabilityLocations: Array.isArray(doc.availabilityLocations)
      ? doc.availabilityLocations.filter(Boolean)
      : [],
    testimonials: Array.isArray(doc.testimonials)
      ? doc.testimonials.map(prepareTestimonial).filter(one => one.content)
      : [],
    additionalImages: Array.isArray(doc.additionalImages)
      ? doc.additionalImages.map(prepareAdditionalImage).filter(one => one.imageUrl)
      : [],
    presentationLength: doc.presentationLength || null,
    checkAvailabilityEmail: doc.checkAvailabilityEmail || null,
    checkAvailabilitySubject: doc.checkAvailabilitySubject || 'Speaking Inquiry',
    contactNote: doc.contactNote || null
  }
}

async function getSpeakingPage () {
  const filter = groq`*[_type == "speakingPage"]`
  const projection = groq`{
    _id,
    headline,
    description,
    heroImage,
    heroPhotoCredit,
    speakingTopics,
    presentationLength,
    availabilityLocations,
    testimonials[]{
      content[]{
        ...,
        children[]{
          ...
        }
      },
      author,
      starred
    },
    additionalImages[]{
      image,
      photoCredit
    },
    checkAvailabilityEmail,
    checkAvailabilitySubject,
    contactNote
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => {
    console.error('speakingPage data fetch error', err)
    return []
  })
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepared = reducedDocs.map(generateSpeakingPage)
  return prepared[0] || null
}

module.exports = getSpeakingPage
