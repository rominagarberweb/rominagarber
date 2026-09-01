import {FiType} from 'react-icons/fi'

function blockText(blocks) {
  const first = (blocks || []).find(block => block._type === 'block' && block.children)
  return first ? first.children.map(child => child.text).join('') : ''
}

export default {
  name: 'introBlock',
  type: 'object',
  title: 'Intro',
  icon: FiType,
  fields: [
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body',
      description: 'Title page, quotes, and other front matter. Uses normal paragraph spacing, not story typesetting.',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {body: 'body'},
    prepare({body}) {
      return {
        title: blockText(body) || 'Intro',
        subtitle: 'Intro'
      }
    }
  }
}
