const markdownIt = require('markdown-it')
const imageUrl = require('./imageUrl')

const inlineMd = markdownIt({html: true, breaks: false, linkify: false})

function classMark (className, props) {
  const content = Array.isArray(props.children) ? props.children.join('') : (props.children || '')
  return `<span class="${className}">${inlineMd.renderInline(String(content))}</span>`
}

// Learn more on https://www.sanity.io/docs/guides/introduction-to-portable-text
module.exports = {
  types: {
    tipReference: ({node}) => `[${node.name}](/tips/${node.slug.current})`,
    code: ({node}) =>
      '```' + node.language + '\n' + node.code + '\n```',
    mainImage: ({node}) => `![${node.alt}](${imageUrl(node).width(600).url()})`
  },
  marks: {
    alignLeft: props => classMark('pt-align-left', props),
    alignCenter: props => classMark('pt-align-center', props),
    alignRight: props => classMark('pt-align-right', props),
    lowercase: props => classMark('pt-lowercase', props),
    uppercase: props => classMark('pt-uppercase', props),
    capitalize: props => classMark('pt-capitalize', props),
    smallCaps: props => classMark('pt-small-caps', props),
    allSmallCaps: props => classMark('pt-all-small-caps', props)
  }
}
