import CustomQuickLinkComponent from '../components/customQuickLinkComponent'

export default {
  name: 'speakingPage',
  type: 'document',
  title: 'Speaking page',
  __experimental_actions: [
    /* 'create', */
    'update',
    /* 'delete', */
    'publish'
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Main page title shown as the H1',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL segment for this page. Keep as "speaking".',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => (input || 'speaking').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      },
      initialValue: {
        current: 'speaking'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'descriptionPortable',
      type: 'introPortableText',
      title: 'Description',
      description: 'Short description block for the speaking page',
    },
    {
      name: 'heroImage',
      type: 'mainImage',
      title: 'Hero image',
      description: 'Primary speaking photo displayed near the top of the page'
    },
    {
      name: 'heroPhotoCredit',
      type: 'string',
      title: 'Hero photo credit',
      description: 'Photo credit line, e.g. "Photo by Jane Doe"'
    },
    {
      name: 'speakingTopics',
      type: 'array',
      title: 'Speaking topics',
      description: 'Most-requested topics event planners can pick from',
      of: [
        {
          type: 'object',
          title: 'Speaking topic',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Topic name',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              type: 'introPortableText',
              title: 'Description'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description'
            },
            prepare ({title, subtitle}) {
              return {
                title: title || 'Untitled topic',
                subtitle: subtitle && subtitle[0] && subtitle[0].children
                  ? subtitle[0].children.map(c => c.text).join(' ')
                  : null
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'additionalImages',
      type: 'array',
      title: 'Additional speaking photos',
      description: 'Optional gallery images with caption and credit',
      of: [
        {
          type: 'object',
          title: 'Speaking photo',
          fields: [
            {
              name: 'image',
              type: 'mainImage',
              title: 'Image'
            },
            {
              name: 'photoCredit',
              type: 'string',
              title: 'Photo credit'
            }
          ],
          preview: {
            select: {
              title: 'image.caption',
              subtitle: 'photoCredit',
              media: 'image'
            },
            prepare ({title, subtitle, media}) {
              return {
                title: title || 'Speaking photo',
                subtitle,
                media
              }
            }
          }
        }
      ]
    },
    {
      name: 'testimonials',
      type: 'array',
      title: 'Testimonials',
      description: 'Short endorsements from hosts or attendees',
      of: [{type: 'testimonial'}],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'checkAvailabilityEmail',
      title: 'Check availability email',
      type: 'string',
      description: 'Email used for speaking inquiries',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'checkAvailabilitySubject',
      title: 'Check availability subject line',
      type: 'string',
      description: 'Prefilled subject used in the mailto link',
      initialValue: 'Speaking Inquiry',
      validation: Rule => Rule.required()
    },
    {
      name: 'contactNote',
      type: 'text',
      title: 'Contact note',
      rows: 3,
      description: 'Optional short note shown above contact CTA'
    },
  ]
}
