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
      type: 'array',
      title: 'Hero images',
      description: 'Speaking photos displayed near the top of the page carousel',
      of: [{type: 'mainImage'}],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'logoGridHeading',
      type: 'string',
      title: 'Logo grid heading',
      description: 'Heading text shown above the logos section',
      hidden: true,
      initialValue: 'Featured organizations'
    },
    {
      name: 'logoGrid',
      type: 'array',
      title: 'Logo grid',
      description: 'Organization logos shown in a responsive grid',
      of: [{type: 'mainImage'}]
    },
    {
      name: 'speakingTopics',
      type: 'array',
      title: 'Speaking topics',
      description: 'Most-requested topics event planners can pick from',
      hidden: true,
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
      name: 'testimonialsHeading',
      type: 'string',
      title: 'Testimonials heading',
      description: 'Heading text shown above testimonials',
      initialValue: 'Voices from the Community'
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
      name: 'checkAvailabilityHeading',
      type: 'string',
      title: 'Check availability heading',
      description: 'Heading text shown on the speaking inquiry card',
      initialValue: 'Check Availability'
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
