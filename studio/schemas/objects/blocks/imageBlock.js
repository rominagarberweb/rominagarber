import {FiImage} from 'react-icons/fi'

export default {
  name: 'imageBlock',
  type: 'object',
  title: 'Image',
  icon: FiImage,
  fields: [
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      caption: 'image.caption',
      alt: 'image.alt',
      media: 'image'
    },
    prepare({caption, alt, media}) {
      return {
        title: caption || alt || 'Image',
        subtitle: 'Image',
        media
      }
    }
  }
}
