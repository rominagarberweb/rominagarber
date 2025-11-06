export default {
  name: 'aboutPage',
  type: 'document',
  title: 'About page',
  __experimental_actions: [
    /* 'create', */
    'update',
    /* 'delete', */
    'publish'
  ],
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
      name: 'bioSpanish',
      type: 'bioPortableText',
      title: 'Biografía Español'
    },
    {
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      description: 'Email shown on the About page (will be linked mailto:)',
      // optional: use validation if your Sanity version supports Rule.email()
      validation: Rule => Rule.email()
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
      to: [{ type: 'agent' }],
      readOnly: true
    },
    {
      title: 'Publicist',
      name: 'publicist',
      type: 'reference',
      to: [{ type: 'publicist' }],
      readOnly: true
    }
  ]
}
