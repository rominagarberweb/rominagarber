import {FiInfo} from 'react-icons/fi'

function blockText(blocks) {
  const first = (blocks || []).find(block => block._type === 'block' && block.children)
  return first ? first.children.map(child => child.text).join('') : ''
}

export default {
  name: 'callToAction',
  type: 'object',
  title: 'Call to action',
  icon: FiInfo,
  fields: [
    {
      name: 'body',
      type: 'ctaPortableText',
      title: 'Text',
      description: 'Short note with an optional link',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {body: 'body'},
    prepare({body}) {
      return {
        title: blockText(body) || 'Call to action',
        subtitle: 'Call to action'
      }
    }
  }
}
