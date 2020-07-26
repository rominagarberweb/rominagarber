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
      validation: Rule => Rule.required()
    },
    {
      name: 'heroDescription',
      type: 'heroPortableText',
      title: 'Hero description',
      validation: Rule => Rule.required()
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
      },
      validation: Rule => Rule.required()
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
      ],
      validation: Rule => Rule.required()
    },
    {
      title: 'Priority links',
      name: 'priorityLinks',
      description: 'Currently unused',
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
      description: 'Currently unused field. These icons and links are hard coded right now',
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
