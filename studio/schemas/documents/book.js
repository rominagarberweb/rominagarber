import { format } from 'date-fns'
import { FiBook } from 'react-icons/fi'
import { FiZap } from 'react-icons/fi'
import { FaRegNewspaper } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { FaStore } from 'react-icons/fa'

export default {
  name: 'book',
  type: 'document',
  title: 'Book',
  groups: [
    { 
      name: 'general', 
      title: 'General',
    },
    { 
      name: 'promotion', 
      title: 'Promotion',
    },
    { 
      name: 'details', 
      title: 'Details',
    },
  ],
  icon: FiBook,
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: Rule => Rule.required(),
          group: 'general'
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          options: {
            source: 'content.title',
            maxLength: 96
          },
          validation: Rule => Rule.required(),
          group: 'general'
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
          group: 'general'
        },
        {
          name: 'releaseDate',
          type: 'date',
          title: 'Release date',
          group: 'general'
        },
        {
          name: 'cover',
          type: 'mainImage',
          title: 'Cover',
          group: 'general'
        },
        {
          title: 'Color theme',
          name: 'theme',
          type: 'reference',
          group: 'general',
          to: [{ type: 'colorTheme' }]
        },
        {
          name: 'hook',
          type: 'introPortableText',
          title: 'Hook',
          description: 'Short phrase that typically shows up on the book cover and marketing material',
          group: 'details'
        },
        {
          title: 'Buy book from',
          name: 'buyBookFrom',
          description: 'Enter short titles (e.g. Amazon) and hyperlilnks to vendor pages',
          type: 'array',
          group: 'details',
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
          group: 'details',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https', 'mailto', 'tel']
          })
        },
        {
          title: 'Links',
          name: 'links',
          type: 'array',
          group: 'details',
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
          group: 'details',
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
          group: 'details',
          readOnly: true
        },
        {
          name: 'internationalCovers',
          type: 'array',
          title: 'Promotional images',
          description: 'Add images and captions. Up to three will display alongside the Synopsis, Reviews, and Press items.',
          group: 'promotion',
          of: [{ type: 'mainImage' }]
        },
        {
          name: 'synopsis',
          type: 'introPortableText',
          title: 'Synopsis',
          group: 'promotion'
        },
        {
          name: 'reviews',
          type: 'array',
          title: 'Reviews',
          description: '7 will display by default. Later we will add a "see more" button',
          group: 'promotion',
          of: [
            {
              type: 'review',
              title: 'Review',
              icon: FiZap
            }
          ]
        },
        {
          name: 'press',
          type: 'array',
          title: 'Press',
          group: 'promotion',
          of: [
            {
              type: 'pressEntry',
              title: 'Press Entry',
              icon: FaRegNewspaper
            }
          ]
        },
        // {
        //   title: 'Press items',
        //   name: 'pressItems',
        //   description: 'This field is depriciated and will be replaced with the press field',
        //   type: 'array',
      
        //   of: [
        //     {
        //       type: 'reference',
        //       to: {type: 'press'},
        //       icon: FaRegNewspaper
        //     }
        //   ]
        // },
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
    prepare({ title = 'No title', slug = {}, media }) {
      const path = `/${slug.current}/`
      return {
        title,
        media,
        subtitle: path
      }
    }
  }
}
