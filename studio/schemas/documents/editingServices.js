export default {
  name: 'editingServices',
  type: 'document',
  title: 'Editing Services',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'This is the title of the editing services page',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      description: 'This is text that will show up in the social share'
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Editing Services Photo',
      description: 'Add a photo that displays on the top of the page and in social sharing preview'
    },
    {
      title: 'Introduction',
      description: 'Write a short introduction about the editing services you offer',
      name: 'introduction',
      type: 'text',
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
