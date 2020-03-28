// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import aboutPage from './documents/aboutPage'
import author from './documents/author'
import blogPage from './documents/blogPage'
import book from './documents/book'
import booksPage from './documents/booksPage'
import category from './documents/category'
import event from './documents/event'
import eventsPage from './documents/eventsPage'
import homePage from './documents/homePage'
import post from './documents/post'
import press from './documents/press'
import series from './documents/series'
import siteSettings from './documents/siteSettings'
import tip from './documents/tip'

// Object types
import authorReference from './objects/authorReference'
import bioPortableText from './objects/bioPortableText'
import blurb from './objects/blurb'
import blurbPortableText from './objects/blurbPortableText'
import bodyPortableText from './objects/bodyPortableText'
import excerptPortableText from './objects/excerptPortableText'
import eventPortableText from './objects/eventPortableText'
import introPortableText from './objects/introPortableText'
import link from './objects/link'
import mainImage from './objects/mainImage'
import review from './objects/review'
import reviewPortableText from './objects/reviewPortableText'
import schedule from './objects/schedule'
import tipReference from './objects/tipReference'
import venue from './objects/venue'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document and object types
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // Document types
    aboutPage,
    author,
    blogPage,
    book,
    booksPage,
    category,
    event,
    eventsPage,
    homePage,
    post,
    press,
    series,
    siteSettings,
    tip,
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
    link,
    mainImage,
    review,
    reviewPortableText,
    schedule,
    tipReference,
    venue
  ])
})
