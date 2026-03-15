const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const imageUrl = require('../utils/imageUrl')
const hasToken = !!client.config().token

function prepareTestimonial (testimonial = {}) {
  const legacyContent = testimonial.content
    ? BlocksToMarkdown(testimonial.content, {serializers, ...client.config()})
    : null

  const sourceParts = [testimonial.sourceTitle, testimonial.sourceOrganization].filter(Boolean)

  return {
    ...testimonial,
    quote: testimonial.quote || legacyContent,
    sourceName: testimonial.sourceName || testimonial.author || null,
    sourceTitle: testimonial.sourceTitle || null,
    sourceOrganization: testimonial.sourceOrganization || null,
    sourceDetail: sourceParts.join(', ') || null
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
  const portableDescription = Array.isArray(doc.descriptionPortable)
    ? BlocksToMarkdown(doc.descriptionPortable, {serializers, ...client.config()})
    : null
  const legacyDescription = typeof doc.description === 'string'
    ? doc.description
    : null

  return {
    ...doc,
    title: doc.title || 'Speaking Events and Workshops',
    description: portableDescription || legacyDescription,
    heroImageUrl: doc.heroImage ? imageUrl(doc.heroImage).height(520).width(920).url() : null,
    heroPhotoCredit: doc.heroPhotoCredit || null,
    speakingTopics: Array.isArray(doc.speakingTopics)
      ? doc.speakingTopics.filter(Boolean).map(topic => {
          if (typeof topic === 'string') return {name: topic, description: null}
          return {
            name: topic.name || null,
            description: Array.isArray(topic.description)
              ? BlocksToMarkdown(topic.description, {serializers, ...client.config()})
              : null
          }
        }).filter(t => t.name)
      : [],
    availabilityLocations: Array.isArray(doc.availabilityLocations)
      ? doc.availabilityLocations.filter(Boolean)
      : [],
    testimonials: Array.isArray(doc.testimonials)
      ? doc.testimonials.map(prepareTestimonial).filter(one => one.quote)
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
    title,
    description,
    descriptionPortable[]{
      ...,
      children[]{
        ...
      }
    },
    heroImage,
    heroPhotoCredit,
    speakingTopics[]{
      ...,
      description[]{
        ...,
        children[]{
          ...
        }
      }
    },
    presentationLength,
    availabilityLocations,
    testimonials[]{
      quote,
      sourceName,
      sourceTitle,
      sourceOrganization,

      // Legacy fallback for existing review-shaped entries
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
