export default {
  name: 'review',
  type: 'object',
  title: 'Review',
  fields: [
    {
      title: 'Review',
      name: 'content',
      type: 'reviewPortableText'
    },
    {
      title: 'Starred Review',
      name: 'starred',
      type: 'boolean'
    },
    {
      title: 'Author',
      name: 'author',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'author',
      starred: 'starred'
    },
    prepare(selection) {
      const {title, subtitle, starred} = selection
      const star = starred ? '☆ ' : ''
      const starredTitle = `${star}${title[0].children[0].text}`
      return {
        title: starredTitle,
        subtitle: subtitle
      }
    }
  }
}
