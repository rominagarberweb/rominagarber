import { format } from 'date-fns'
import { FiBook } from 'react-icons/fi'
import { FiZap } from 'react-icons/fi'
import { FiExternalLink } from 'react-icons/fi'
import { FaRegNewspaper } from 'react-icons/fa'
import { FaStore } from 'react-icons/fa'
import Tabs from '../../plugins/tabs'

export default {
  name: 'book',
  type: 'document',
  title: 'Book',
  icon: FiBook,
  fields: [
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: [
        { name: 'general', title: 'General' },
        { name: 'details', title: 'Details' },
        { name: 'promotion', title: 'Promotion' },
      ],
      options: {
        // setting layout to object will group the tab content in an object fieldset border.
        // ... Useful for when your tab is in between other fields inside a document.
        layout: 'object'
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          fieldset: 'general'
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          fieldset: 'general',
          options: {
            source: 'content.title',
            maxLength: 96
          }
        },
        {
          name: 'series',
          title: 'Series',
          type: 'reference',
          to: [
            {
              type: 'series'
            }
          ],
          fieldset: 'general'
        },
        {
          name: 'releaseDate',
          type: 'date',
          title: 'Release date',
          fieldset: 'general'
        },
        {
          name: 'cover',
          type: 'mainImage',
          title: 'Cover',
          fieldset: 'general'
        },
        {
          title: 'Color theme',
          name: 'theme',
          type: 'reference',
          fieldset: 'general',
          to: [{ type: 'colorTheme' }]
        },
        {
          name: 'hook',
          type: 'introPortableText',
          title: 'Hook',
          description: 'Short phrase that typically shows up on the book cover and marketing material',
          fieldset: 'details'
        },
        {
          title: 'Buy book from',
          name: 'buyBookFrom',
          description: 'Enter short titles (e.g. Amazon) and hyperlilnks to vendor pages',
          type: 'array',
          fieldset: 'details',
          of: [
            {
              type: 'link',
              title: 'Link',
              icon: FaStore
            }
          ]
        },
        {
          // change this so only hyperlinks is editable
          title: 'Add to Goodreads',
          name: 'addToGoodreads',
          type: 'url',
          description: 'Enter url of the GoodReads book page',
          fieldset: 'details',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https', 'mailto', 'tel']
          })
        },
        {
          title: 'Links',
          name: 'links',
          type: 'array',
          fieldset: 'details',
          of: [
            {
              type: 'link',
              title: 'Link',
              icon: FiExternalLink
            }
          ]
        },
        {
          title: 'Publisher links',
          name: 'publishers',
          type: 'array',
          fieldset: 'details',
          of: [
            {
              type: 'link',
              title: 'Link',
              icon: FiExternalLink
            }
          ]
        },
        {
          title: 'Agent',
          name: 'agent',
          description: 'Agent is editable under settings content',
          type: 'reference',
          to: { type: 'agent' },
          fieldset: 'details',
          readOnly: true
        },
        {
          name: 'internationalCovers',
          type: 'array',
          title: 'Promotional images',
          description: 'Add images and captions. Up to three will display alongside the Synopsis, Reviews, and Press items.',
          fieldset: 'promotion',
          of: [{ type: 'mainImage' }]
        },
        {
          name: 'synopsis',
          type: 'introPortableText',
          title: 'Synopsis',
          fieldset: 'promotion'
        },
        {
          name: 'reviews',
          type: 'array',
          title: 'Reviews',
          description: '7 will display by default. Later we will add a "see more" button',
          fieldset: 'promotion',
          of: [
            {
              type: 'review',
              title: 'Review',
              icon: FiZap
            }
          ]
        },
        {
          title: 'Press items',
          name: 'pressItems',
          type: 'array',
          fieldset: 'promotion',
          of: [
            {
              type: 'reference',
              to: {type: 'press'},
              icon: FaRegNewspaper
            }
          ]
        },
      ]
    }
  ],
  initialValue: {
    content: {
      _type: 'object',
      agent: {
        _type: 'reference',
        _ref: 'agent'
      }
    }
  },
  orderings: [
    {
      name: 'releaseDateAsc',
      title: 'Release date new–>old',
      by: [
        {
          field: 'releaseDate',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'releaseDateDesc',
      title: 'Release date old->new',
      by: [
        {
          field: 'releaseDate',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'content.title',
      slug: 'content.slug',
      media: 'content.cover'
    },
    prepare ({ title = 'No title', slug = {}, media }) {
      const path = `/${slug.current}/`
      return {
        title,
        media,
        subtitle: path
      }
    }
  }
}
