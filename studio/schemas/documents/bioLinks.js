import { FiExternalLink } from 'react-icons/fi'

export default {
    name: 'bioLinks',
    type: 'document',
    title: 'Bio Links',
    fields: [ 
      {
        name: 'mainImage',
        type: 'mainImage',
        title: 'Romina Social Photo',
        description: 'Add a photo that matches social profile image',
      },
      {
        title: 'Bio links',
        description: 'Enter a maximum of 12 promotional links',
        name: 'bioLinks',
        type: 'array',
        of: [
          {
            type: 'link',
            title: 'Link',
            icon: FiExternalLink
          }
        ]
      }
    ]
  }