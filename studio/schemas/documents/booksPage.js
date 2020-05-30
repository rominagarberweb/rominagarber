import CustomQuickLinkComponent from '../components/customQuickLinkComponent'

export default {
  name: 'booksPage',
  type: 'document',
  title: 'Books page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'genre',
      type: 'string',
      title: 'Genre description',
      description: 'Enter title case, will display as a heading'
    },
    {
      name: 'books',
      title: 'Books',
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
      title: 'Manage books',
      type: 'string',
      inputComponent: CustomQuickLinkComponent,
      options: {
        slug: 'books'
      }
    }
  ]
}
