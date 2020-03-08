import { GiBookshelf } from 'react-icons/gi'

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
      name: 'blurbs',
      type: 'array',
      title: 'Blurbs',
      of: [
        {
          type: 'blurb',
          title: 'Blurb'
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
    {
      title: 'Agent link',
      name: 'agent',
      type: 'link'
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}
