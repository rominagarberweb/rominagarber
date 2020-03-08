import CustomQuickLinkComponent from '../components/customQuickLinkComponent'

export default {
  name: 'booksPage',
  type: 'document',
  title: 'Books page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'genre',
      type: 'introPortableText',
      title: 'Genre description'
    },
    {
      name: 'featured',
      title: 'Featured book(s)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'book'}
        }
      ]
    },
    {
      name: 'quickLink',
      title: 'Books',
      type: 'string',
      inputComponent: CustomQuickLinkComponent,
      options: {
        slug: 'books'
      }
    }
  ]
}
