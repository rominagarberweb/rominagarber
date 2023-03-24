export default {
  name: 'pressEntry',
  type: 'object',
  title: 'Press Entry',
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
      source: 'source',
      publishedAt: 'publishedAt'
    },
    prepare ({title, media, source, publishedAt}) {
      const sourceAndDate = `${publishedAt} | ${source}`
      return {
        title,
        media,
        subtitle: sourceAndDate
      }
    }
  }
}
