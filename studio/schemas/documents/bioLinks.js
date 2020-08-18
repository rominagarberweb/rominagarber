import { FiExternalLink } from 'react-icons/fi'

export default {
    name: 'bioLinks',
    type: 'document',
    title: 'Bio Links',
    fields: [ 
        {
            title: 'Links',
            description: 'These items populate a vertical list of cards that serve as a social media profile link in bio page',
            name: 'links',
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