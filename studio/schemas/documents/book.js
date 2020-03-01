import { format } from 'date-fns'
import { FiBook } from 'react-icons/fi'

export default {
  name: 'book',
  type: 'document',
  title: 'Book',
  icon: FiBook,
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
      name: 'cover',
      type: 'mainImage',
      title: 'Cover'
    },
    {
      name: 'synopsis',
      type: 'introPortableText',
      title: 'Synopsis'
    },
    {
      name: 'releaseDate',
      type: 'date',
      title: 'Release date'
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
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [
        {
          type: 'link',
          title: 'Link'
        }
      ]
    }  ],
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
      title: 'title',
      releaseDate: 'releaseDate',
      slug: 'slug',
      media: 'cover'
    },
    prepare ({ title = 'No title', releaseDate, slug = {}, media }) {
      const dateSegment = format(releaseDate, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: releaseDate ? path : 'Missing release date'
      }
    }
  }
}
