import {FaRegNewspaper} from 'react-icons/fa'

export default {
  name: 'press',
  type: 'document',
  title: 'Press item',
  icon: FaRegNewspaper,
  fields: [
    {
      name: 'source',
      type: 'string',
      title: 'Source',
      description: 'Add name of the outlet or publication'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Match the headline of the story. Will also be hyperlinked'
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
      name: 'lead',
      type: 'introPortableText',
      title: 'Lead',
      description: 'Describe the jist of the press item'
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
      title: 'title',
      subtitle: 'source'
    }
  }
}
