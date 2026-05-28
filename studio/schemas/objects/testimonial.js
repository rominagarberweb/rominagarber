export default {
  name: 'testimonial',
  type: 'object',
  title: 'Testimonial',
  fields: [
    {
      name: 'quote',
      type: 'text',
      title: 'Quote',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'sourceName',
      type: 'string',
      title: 'Source name'
    },
    {
      name: 'sourceTitle',
      type: 'string',
      title: 'Source title'
    },
    {
      name: 'sourceOrganization',
      type: 'string',
      title: 'Source organization'
    }
  ],
  preview: {
    select: {
      quote: 'quote',
      sourceName: 'sourceName',
      sourceTitle: 'sourceTitle',
      sourceOrganization: 'sourceOrganization'
    },
    prepare ({quote, sourceName, sourceTitle, sourceOrganization}) {
      const normalizedQuote = quote || ''
      const title = normalizedQuote.length > 90
        ? `${normalizedQuote.slice(0, 87)}...`
        : normalizedQuote || 'Testimonial'

      const subtitleParts = [sourceName, sourceTitle, sourceOrganization].filter(Boolean)

      return {
        title,
        subtitle: subtitleParts.join(', ')
      }
    }
  }
}