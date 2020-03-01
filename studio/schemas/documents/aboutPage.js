export default {
  name: 'aboutPage',
  type: 'document',
  title: 'About page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: [{type: 'author'}]
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Author photo'
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
      title: 'Book links',
      name: 'books',
      type: 'array',
      of: [
        {
          type: 'link',
          title: 'Link'
        }
      ]
    },
    {
      title: 'Publicist link',
      name: 'publicist',
      type: 'link'
    }
  ]
}
