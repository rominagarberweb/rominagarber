import {FiDownload} from 'react-icons/fi'

export default {
  name: 'downloadItem',
  type: 'object',
  title: 'Download',
  icon: FiDownload,
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      description: 'Example: Download PDF',
      validation: Rule => Rule.required()
    },
    {
      name: 'format',
      type: 'string',
      title: 'Format',
      options: {
        list: [
          {title: 'PDF', value: 'pdf'},
          {title: 'EPUB', value: 'epub'},
          {title: 'MOBI', value: 'mobi'},
          {title: 'Other', value: 'other'}
        ],
        layout: 'radio'
      }
    },
    {
      name: 'source',
      type: 'string',
      title: 'Source',
      initialValue: 'file',
      options: {
        list: [
          {title: 'File', value: 'file'},
          {title: 'URL', value: 'url'}
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'file',
      type: 'file',
      title: 'File',
      hidden: ({parent}) => parent?.source !== 'file',
      validation: Rule =>
        Rule.custom((file, context) => {
          if (context.parent?.source === 'file' && !file?.asset) {
            return 'Upload a file or switch the source to URL'
          }
          return true
        })
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      hidden: ({parent}) => parent?.source !== 'url',
      validation: Rule =>
        Rule.custom((url, context) => {
          if (context.parent?.source !== 'url') return true
          if (!url) return 'Add a URL or switch the source to File'
          try {
            const parsed = new URL(url)
            if (!['http:', 'https:'].includes(parsed.protocol)) {
              return 'Use an http or https URL'
            }
          } catch (err) {
            return 'Enter a valid URL'
          }
          return true
        })
    }
  ],
  preview: {
    select: {
      title: 'label',
      format: 'format',
      source: 'source'
    },
    prepare({title, format, source}) {
      const formatLabel = format ? format.toUpperCase() : 'Download'
      return {
        title: title || 'Download',
        subtitle: `${formatLabel} · ${source === 'url' ? 'URL' : 'File'}`
      }
    }
  }
}
