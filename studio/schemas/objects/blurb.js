export default {
  name: 'blurb',
  type: 'object',
  title: 'Blurb',
  fields: [
    {
      title: 'Blurb',
      name: 'content',
      type: 'blurbPortableText'
    }
  ],
  preview: {
    select: {
      title: 'content'
    }
  }
}
