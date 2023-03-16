
// document schemas
import aboutPage from './documents/aboutPage'
import agent from './documents/agent'
import author from './documents/author'
import blogPage from './documents/blogPage'
import book from './documents/book'
import booksPage from './documents/booksPage'
import category from './documents/category'
import colorTheme from './documents/colorTheme'
import event from './documents/event'
import eventsPage from './documents/eventsPage'
import homePage from './documents/homePage'
import post from './documents/post'
import press from './documents/press'
import series from './documents/series'
import siteSettings from './documents/siteSettings'
import tip from './documents/tip'
import bioLinks from './documents/bioLinks'
import saysaSays from './documents/saysaSays'

// Object types
import authorReference from './objects/authorReference'
import bioPortableText from './objects/bioPortableText'
import blurb from './objects/blurb'
import blurbPortableText from './objects/blurbPortableText'
import bodyPortableText from './objects/bodyPortableText'
import excerptPortableText from './objects/excerptPortableText'
import eventPortableText from './objects/eventPortableText'
import introPortableText from './objects/introPortableText'
import heroPortableText from './objects/heroPortableText'
import link from './objects/link'
import mainImage from './objects/mainImage'
import review from './objects/review'
import reviewPortableText from './objects/reviewPortableText'
import pressEntry from './objects/pressEntry'
import schedule from './objects/schedule'
import tipReference from './objects/tipReference'
import venue from './objects/venue'

// Then we give our schema to the builder and provide the result to Sanity
export default [
  // Document types
  aboutPage,
  agent,
  author,
  blogPage,
  book,
  booksPage,
  category,
  colorTheme,
  event,
  eventsPage,
  homePage,
  post,
  press,
  series,
  siteSettings,
  tip,
  bioLinks,
  saysaSays,
  // Object types - can be used as { type: 'typename' }
  // in document schemas
  authorReference,
  bioPortableText,
  blurb,
  blurbPortableText,
  bodyPortableText,
  excerptPortableText,
  eventPortableText,
  introPortableText,
  heroPortableText,
  link,
  mainImage,
  review,
  reviewPortableText,
  pressEntry,
  schedule,
  tipReference,
  venue
]
