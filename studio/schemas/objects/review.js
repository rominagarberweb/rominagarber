export default {
  name: 'review',
  type: 'object',
  title: 'Review',
  fields: [
    {
      title: 'Review',
      name: 'content',
      type: 'reviewPortableText'
    }
  ],
  preview: {
    select: {
      title: 'content'
    }
  }
}
