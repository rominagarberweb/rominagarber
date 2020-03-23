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
      title: 'Author',
      name: 'author',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'author'
    }
  }
}
