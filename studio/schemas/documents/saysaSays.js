export default {
    name: 'saysaSays',
    type: 'document',
    title: 'Saysa Says',
    fields: [
      // {
      //   name: 'mainImage',
      //   type: 'mainImage',
      //   title: 'Image',
      //   description: 'Image used for social sharing'
      // },
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        description: 'This is the title of the deleted scene',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        type: 'string',
        title: 'Description',
        description: 'This is text that will show up in the social share'
      },
      {
        name: 'bodyContent',
        type: 'bodyPortableText',
        title: 'Body Content',
        validation: Rule => Rule.required()
      },
      {
        name: 'cta',
        type: 'bioPortableText',
        title: 'Call to Action',
        description: 'write a short CTA and hyperlink to a relevant resource',
      }
    ]
  }
  