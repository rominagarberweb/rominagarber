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
        type: 'string',
        title: 'Price',
        description: "Add the price. Do not include $ sign or decimal places."
      },
      {
        name: 'description',
        type: 'bioPortableText',
        title: 'Description',
        description: 'Describe the service you offer'
      }
    ]
  }