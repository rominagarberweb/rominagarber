import CustomQuickLinkComponent from '../components/customQuickLinkComponent'

export default {
  name: 'blogPage',
  type: 'document',
  title: 'Blog page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'featured',
      title: 'Featured post',
      type: 'reference',
      to: {type: 'post'}
    },
    {
      name: 'quickLink',
      title: 'Blog posts',
      type: 'string',
      inputComponent: CustomQuickLinkComponent,
      options: {
        slug: 'blogPosts'
      }
    }
  ]
}
