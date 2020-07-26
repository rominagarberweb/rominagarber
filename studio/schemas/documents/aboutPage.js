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
      name: 'bio',
      type: 'bioPortableText',
      title: 'Biography',
      validation: Rule => Rule.required()
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
      title: 'Agent',
      name: 'agent',
      type: 'reference',
      to: { type: 'agent' },
      readOnly: true
    },
  ]
}
