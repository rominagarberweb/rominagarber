export default {
  name: 'aboutPage',
  type: 'document',
  title: 'About page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
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
      title: 'Agent link',
      name: 'agent',
      type: 'link'
    }
  ]
}
