export default {
  name: 'preorderPage',
  type: 'document',
  title: 'Preorder page',
  __experimental_actions: [
    /* 'create', */
    'update',
    /* 'delete', */
    'publish'
  ],
  fields: [
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta description',
      rows: 3,
      validation: Rule => Rule.required().max(160)
    },
    {
      name: 'heroTitle',
      type: 'string',
      title: 'Page title',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Page URL segment. Keep this as "preorder" unless you are intentionally changing the route.',
      options: {
        source: 'heroTitle',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'intro',
      type: 'bioPortableText',
      title: 'Introduction',
      description: 'Paragraphs shown at the top of the page',
      validation: Rule => Rule.required()
    },
    {
      name: 'campaignDeadlineLabel',
      type: 'string',
      title: 'Campaign deadline label',
      initialValue: 'Campaign deadline:',
      validation: Rule => Rule.required()
    },
    {
      name: 'campaignDeadline',
      type: 'string',
      title: 'Campaign deadline text',
      description: 'Example: Month DD, YYYY',
      validation: Rule => Rule.required()
    },
    {
      name: 'formCardTitle',
      type: 'string',
      title: 'Form card title',
      initialValue: 'Visit the Google Form',
      validation: Rule => Rule.required()
    },
    {
      name: 'formButtonText',
      type: 'string',
      title: 'Form button text',
      initialValue: 'Go to Preorder Form',
      validation: Rule => Rule.required()
    },
    {
      name: 'formUrl',
      type: 'url',
      title: 'Form URL',
      validation: Rule => Rule.required().uri({ scheme: ['http', 'https'] })
    },
    {
      name: 'formDisclaimer',
      type: 'string',
      title: 'Form disclaimer',
      validation: Rule => Rule.required()
    },
    {
      name: 'faqsTitle',
      type: 'string',
      title: 'FAQ section title',
      initialValue: 'FAQs',
      validation: Rule => Rule.required()
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ item',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: Rule => Rule.required()
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Answer',
              rows: 3,
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer'
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    }
  ]
}
