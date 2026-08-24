export default {
  name: 'ctaPortableText',
  type: 'array',
  title: 'Call to action',
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'}
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({scheme: ['http', 'https']})
              }
            ]
          }
        ]
      }
    }
  ]
}
