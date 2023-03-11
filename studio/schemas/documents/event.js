import { format } from 'date-fns'
import { MdEvent } from 'react-icons/md'

export default {
  name: 'event',
  type: 'document',
  title: 'Event',
  groups: [
    {
      name: 'overview',
      title: 'Overview',
    }, 
    {
      name: 'venue',
      title: 'Venue',
    }, 
  ],
  icon: MdEvent,
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Name',
          validation: Rule => Rule.required(),
          group: 'overview'
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          validation: Rule => Rule.required(),
          options: {
            source: 'content.name',
            maxLength: 96
          },
          group: 'overview'
        },
        {
          name: 'bannerText',
          type: 'string',
          title: 'Banner Text',
          description: 'Banner headline including short combo of venue/city and title',
          group: 'overview'
        },
        {
          name: 'previewImage',
          type: 'mainImage',
          title: 'Preview Image',
          description: 'Image will display on social sharing',
          group: 'overview'
        },
        {
          name: 'shortDescription',
          type: 'string', //make me portable text
          title: 'Short Description',
          description: 'Text will display on social media when link is shared',
          group: 'overview'
        },
        {
          name: 'description',
          type: 'eventPortableText',
          title: 'Description',
          description: 'Describe the event for body of the event page on rominagarber.com',
          group: 'overview'
        },
        {
          name: 'schedule',
          type: 'schedule',
          title: 'Schedule',
          description: 'From when to when will the event last? Due to a bug please also subtract 4 hours from the time until further notice',
          group: 'overview'
        },
        {
          name: 'link',
          type: 'url',
          title: 'Event Link',
          description: 'Where will visitors sign up',
          group: 'overview'
        },
        {
          name: 'venue',
          type: 'venue',
          title: 'Venue',
          description: 'Where will the event take place?',
          group: 'venue'
        }
      ],
  orderings: [
    {
      name: 'startDateAsc',
      title: 'Start date new–>old',
      by: [
        {
          field: 'content.schedule.from',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'startDateDesc',
      title: 'Start date old->new',
      by: [
        {
          field: 'content.schedule.from',
          direction: 'desc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'content.name',
      fromDate: 'content.schedule.from',
      media: 'content.previewImage'
    },
    prepare ({ title = 'No name', fromDate, media }) {
      const date = format(fromDate, 'YYYY/MM/DD')
      return {
        title,
        media,
        subtitle: date ? date : 'Missing date'
      }
    }
  }
}
