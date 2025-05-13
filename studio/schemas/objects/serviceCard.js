export default {
    name: 'serviceCard',
    type: 'object',
    title: 'Service card',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'price',
        type: 'number',
        title: 'Price',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        description: 'Describe the service you offer'
      }
    ]
  }