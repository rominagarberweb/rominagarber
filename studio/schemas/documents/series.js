import {GiBookshelf} from 'react-icons/gi'

export default {
  name: 'series',
  type: 'document',
  title: 'Series',
  icon: GiBookshelf,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image'
    },
    {
      name: 'description',
      type: 'introPortableText',
      title: 'Description'
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [
        {
          type: 'link',
          title: 'Link'
        }
      ]
    },
    {
      title: 'Publisher links',
      name: 'publishers',
      type: 'array',
      of: [
        {
          type: 'link',
          title: 'Link'
        }
      ]
    },
    // {
    //   title: 'Agent',
    //   name: 'agent',
    //   description: 'Agent is editable under settings content',
    //   type: 'reference',
    //   to: [{type: 'agent'}],
    //   readOnly: true
    // },
    {
      name: 'reviews',
      type: 'array',
      title: 'Reviews',
      of: [
        {
          type: 'review',
          title: 'Review'
        }
      ]
    },
    {
      title: 'Press items',
      name: 'pressItems',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'press'}
        }
      ]
    },
    {
      name: 'seriesBooks',
      title: 'Series books',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'book'}
        }
      ],
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}
