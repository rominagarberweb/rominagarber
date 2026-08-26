import {FiType} from 'react-icons/fi'

function blockText(blocks) {
  const first = (blocks || []).find(block => block._type === 'block' && block.children)
  return first ? first.children.map(child => child.text).join('') : ''
}

export default {
  name: 'textBlock',
  type: 'object',
  title: 'Text',
  icon: FiType,
  fields: [
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {body: 'body'},
    prepare({body}) {
      return {
        title: blockText(body) || 'Text',
        subtitle: 'Text'
      }
    }
  }
}
