import {FiDownload} from 'react-icons/fi'

export default {
  name: 'downloadList',
  type: 'object',
  title: 'Downloads',
  icon: FiDownload,
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
      description: 'Optional heading above the download links'
    },
    {
      name: 'items',
      type: 'array',
      title: 'Downloads',
      of: [{type: 'downloadItem'}],
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      heading: 'heading',
      item0: 'items.0.label',
      items: 'items'
    },
    prepare({heading, item0, items}) {
      const count = items ? items.length : 0
      return {
        title: heading || item0 || 'Downloads',
        subtitle: `Downloads · ${count} ${count === 1 ? 'file' : 'files'}`
      }
    }
  }
}
