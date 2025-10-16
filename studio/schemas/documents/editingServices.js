export default {
  name: 'editingServices',
  type: 'document',
  title: 'Editing Services', 
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Displayed in the Studio preview and on the site',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      description: 'Displays on social share previews',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Editing Services Photo',
      description: 'Add a photo that displays in social sharing preview'
    },
    {
     name: 'youtube',
     title: 'YouTube Video',
     type: 'object',
     description: 'Video url + accessible description (grouped)',
     fields: [
       {
         name: 'url',
         type: 'url',
         title: 'YouTube video URL',
         validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
       },
       {
         name: 'description',
         type: 'string',
         title: 'Video description (for accessibility / caption)'
       },
       {
         name: 'preferVideo',
         type: 'boolean',
         title: 'Prefer showing video over image',
         initialValue: false
       }
     ]
    },
    {
      title: 'Introduction',
      description: 'Write a section about the editing services you offer',
      name: 'introduction',
      type: 'bioPortableText',
    },
    {
      title: 'Service cards',
      description: 'Describe the services and limit to 2-4 cards',
      name: 'serviceCards',
      type: 'array',
      of: [
        {
          type: 'serviceCard',
          title: 'Service card',
        }
      ]
    }
  ]
}
