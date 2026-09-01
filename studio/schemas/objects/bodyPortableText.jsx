import React from 'react'
import {FiAlignCenter, FiAlignLeft, FiAlignRight} from 'react-icons/fi'
import {exclusiveDecoratorPlugins} from '../../plugins/pte/exclusiveDecorators'

function AlignLeft({children}) {
  return <span style={{display: 'block', textAlign: 'left'}}>{children}</span>
}

function AlignCenter({children}) {
  return <span style={{display: 'block', textAlign: 'center'}}>{children}</span>
}

function AlignRight({children}) {
  return <span style={{display: 'block', textAlign: 'right'}}>{children}</span>
}

function Lowercase({children}) {
  return <span style={{textTransform: 'lowercase'}}>{children}</span>
}

function Uppercase({children}) {
  return <span style={{textTransform: 'uppercase'}}>{children}</span>
}

function Capitalize({children}) {
  return <span style={{textTransform: 'capitalize'}}>{children}</span>
}

function SmallCaps({children}) {
  return <span style={{fontVariantCaps: 'small-caps'}}>{children}</span>
}

function AllSmallCaps({children}) {
  return <span style={{fontVariantCaps: 'all-small-caps'}}>{children}</span>
}

function CaseIcon({label, style}) {
  return <span style={{fontSize: '0.75em', fontWeight: 600, ...style}}>{label}</span>
}

export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  components: {
    portableText: {
      plugins: exclusiveDecoratorPlugins
    }
  },
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {
            title: 'Align left',
            value: 'alignLeft',
            icon: FiAlignLeft,
            component: AlignLeft
          },
          {
            title: 'Align center',
            value: 'alignCenter',
            icon: FiAlignCenter,
            component: AlignCenter
          },
          {
            title: 'Align right',
            value: 'alignRight',
            icon: FiAlignRight,
            component: AlignRight
          },
          {
            title: 'Lowercase',
            value: 'lowercase',
            icon: () => <CaseIcon label="aa" />,
            component: Lowercase
          },
          {
            title: 'Uppercase',
            value: 'uppercase',
            icon: () => <CaseIcon label="AA" />,
            component: Uppercase
          },
          {
            title: 'Capitalize',
            value: 'capitalize',
            icon: () => <CaseIcon label="Aa" />,
            component: Capitalize
          },
          {
            title: 'Small caps',
            value: 'smallCaps',
            icon: () => <CaseIcon label="Sc" style={{fontVariantCaps: 'small-caps'}} />,
            component: SmallCaps
          },
          {
            title: 'All small caps',
            value: 'allSmallCaps',
            icon: () => <CaseIcon label="SC" style={{fontVariantCaps: 'all-small-caps'}} />,
            component: AllSmallCaps
          }
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
                type: 'url'
              }
            ]
          }
        ]
      },
      of: [{type: 'tipReference'}]
    },
    {
      type: 'mainImage',
      options: {hotspot: true}
    }
  ]
}
