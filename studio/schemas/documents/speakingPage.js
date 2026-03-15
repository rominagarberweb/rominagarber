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
      name: 'headline',
      type: 'string',
      title: 'Headline',
      description: 'Main page headline, e.g. "Speaking Events and Workshops"',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      description: 'Appears in social sharing previews',
      validation: Rule => Rule.required().max(180)
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
      of: [{type: 'string'}],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'presentationLength',
      type: 'string',
      title: 'Length of presentation',
      description: 'Optional, e.g. "45-60 min keynote + Q&A"'
    },
    {
      name: 'availabilityLocations',
      type: 'array',
      title: 'Locations of availability',
      description: 'Optional list such as "In-person (US)" or "Virtual worldwide"',
      of: [{type: 'string'}]
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
      of: [{type: 'review'}],
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
    {
      name: 'quickLink',
      title: 'Speaking',
      type: 'string',
      components: {
        input: CustomQuickLinkComponent
      },
      options: {
        slug: 'speaking'
      }
    }
  ]
}
