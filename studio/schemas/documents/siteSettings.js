import {
  defaultGateHelp,
  defaultGateUnlocks,
  defaultGateWhy
} from '../lib/simplePageGateCopy'

export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  groups: [
    {
      name: 'general',
      title: 'General',
      default: true
    },
    {
      name: 'simplePages',
      title: 'Locked simple pages'
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'general'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.',
      group: 'general'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      group: 'general'
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'author'}],
      group: 'general'
    },
    {
      name: 'gateWhy',
      type: 'text',
      title: 'Why it is locked',
      rows: 3,
      initialValue: defaultGateWhy,
      group: 'simplePages',
      description: 'Shown on password-protected simple pages unless a page overrides it.'
    },
    {
      name: 'gateUnlocks',
      type: 'text',
      title: 'What the password unlocks',
      rows: 3,
      initialValue: defaultGateUnlocks,
      group: 'simplePages'
    },
    {
      name: 'gateHelp',
      type: 'text',
      title: 'If they do not have the password',
      rows: 3,
      initialValue: defaultGateHelp,
      group: 'simplePages'
    }
  ]
}
