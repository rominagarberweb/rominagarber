import { FaRegNewspaper } from 'react-icons/fa'

export default {
  name: 'press',
  type: 'document',
  title: 'Press item',
  icon: FaRegNewspaper,
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
      title: 'URL of publication',
      name: 'url',
      type: 'url'
    },
    {
      name: 'publishedAt',
      type: 'date',
      title: 'Published at'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
