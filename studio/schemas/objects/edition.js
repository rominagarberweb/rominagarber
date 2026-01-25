export default {
  name: 'edition',
  title: 'Edition',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Untitled Edition',
        media: media
      }
    }
  }
}
