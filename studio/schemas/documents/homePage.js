export default {
  name: 'homePage',
  type: 'document',
  title: 'Home page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'heroText',
      type: 'string',
      title: 'Hero text',
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero image',
      options: {
        hotspot: true,
      }
    },
    {
      title: 'Priority links',
      name: 'priorityLinks',
      type: 'array',
      of: [
        {
          type: 'link',
          title: 'Link'
        }
      ]
    },
    {
      title: 'Social links',
      name: 'socialLinks',
      type: 'array',
      of: [
        {
          type: 'link',
          title: 'Link'
        }
      ]
    }
  ]
}
