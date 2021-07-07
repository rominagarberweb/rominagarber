export default {
    name: 'saysaSays',
    type: 'document',
    title: 'Saysa Says',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        description: 'This is the title of the deleted scene',
        validation: Rule => Rule.required()
      },
      {
        name: 'bodyContent',
        type: 'bodyPortableText',
        title: 'Body Content',
        validation: Rule => Rule.required()
      },
    ]
  }
  