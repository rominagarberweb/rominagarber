export default {
  name: 'homePage',
  type: 'document',
  title: 'Home page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'heroTitle',
      type: 'string',
      title: 'Hero title',
    },
    {
      name: 'heroDescription',
      type: 'string',
      title: 'Hero description',
    },
    {
      title: 'Color theme',
      name: 'theme',
      type: 'reference',
      to: [{ type: 'colorTheme' }]
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
