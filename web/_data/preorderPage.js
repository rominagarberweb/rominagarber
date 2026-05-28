const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token

const defaultPreorderPage = {
  metaDescription: "Preorder Romina Garber's next book and get updates on release details and bonus information.",
  heroTitle: '2-in-1 Lobizona & Cazadora Preorder Campaign',
  slug: {
    current: 'preorder'
  },
  intro: `After you preorder the 2-in-1 paperback of *Wolves of No World*, submit your proof of purchase and email address using the form below.

You'll receive brand-new, never-before-seen scenes that take place after the events of *Cazadora*.

**Before you begin:** The form takes about 1 minute. Have your preorder proof and email address ready.`,
  campaignDeadlineLabel: 'Campaign deadline:',
  campaignDeadline: 'Month DD, YYYY (placeholder).',
  formCardTitle: 'Visit the Google Form',
  formButtonText: 'Go to Preorder Form',
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScXaHqAwwE28Kg_8sUA1WMtQwvt7cNdmU4cN1eWmCWldb4iGQ/viewform',
  formDisclaimer: 'Your email will only be used for preorder verification and campaign reward delivery.',
  faqsTitle: 'FAQs',
  faqs: [
    {
      question: 'What should I upload as proof of purchase?',
      answer: 'A screenshot or receipt showing your preorder confirmation.'
    },
    {
      question: 'When will I receive the bonus scenes?',
      answer: 'After your submission is reviewed, details will be sent to your submitted email.'
    },
    {
      question: 'Can international readers participate?',
      answer: 'Yes, if you can provide valid proof of preorder.'
    }
  ]
}

function generatePreorderPage (doc = {}) {
  const introBlocks = Array.isArray(doc.intro)
    ? BlocksToMarkdown(doc.intro, { serializers, ...client.config() })
    : null
  const intro = introBlocks && introBlocks.trim()
    ? introBlocks
    : defaultPreorderPage.intro

  return {
    ...defaultPreorderPage,
    ...doc,
    intro,
    faqs: Array.isArray(doc.faqs) && doc.faqs.length > 0
      ? doc.faqs.filter(item => item && item.question && item.answer)
      : defaultPreorderPage.faqs
  }
}

async function getPreorderPage () {
  const filter = groq`*[_type == "preorderPage"]`
  const projection = groq`{
    _id,
    metaDescription,
    heroTitle,
    slug,
    intro[]{
      ...,
      children[]{
        ...
      }
    },
    campaignDeadlineLabel,
    campaignDeadline,
    formCardTitle,
    formButtonText,
    formUrl,
    formDisclaimer,
    faqsTitle,
    faqs[]{
      question,
      answer
    }
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => {
    console.error('preorderPage data fetch error', err)
    return []
  })
  const reduced = overlayDrafts(hasToken, docs)
  const prepared = reduced.map(generatePreorderPage)
  return prepared[0] || defaultPreorderPage
}

module.exports = getPreorderPage
