import { format } from 'date-fns'
import { MdEvent } from 'react-icons/md'
import Tabs from '../../plugins/tabs'

export default {
  name: 'event',
  type: 'document',
  title: 'Event',
  icon: MdEvent,
  fields: [
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: [
        { name: 'overview', title: 'Overview' },
        { name: 'venue', title: 'Venue' }
      ],
      options: {
        // setting layout to object will group the tab content in an object fieldset border.
        // ... Useful for when your tab is in between other fields inside a document.
        layout: 'object'
      },
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Name',
          fieldset: 'overview'
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          fieldset: 'overview',
          options: {
            source: 'content.name',
            maxLength: 96
          }
        },
        {
          name: 'bannerText',
          type: 'string',
          title: 'Banner Text',
          description: 'Banner headline including short combo of venue/city and title',
          fieldset: 'overview'
        },
        {
          name: 'description',
          type: 'eventPortableText',
          title: 'Description',
          description: 'Describe the event for search and social media',
          fieldset: 'overview'
        },
        {
          name: 'schedule',
          type: 'schedule',
          title: 'Schedule',
          description: 'From when to when will the event last?',
          fieldset: 'overview'
        },
        {
          name: 'link',
          type: 'url',
          title: 'Event Link',
          description: 'Where will visitors sign up',
          fieldset: 'overview'
        },
        {
          name: 'venue',
          type: 'venue',
          title: 'Venue',
          description: 'Where will the event take place?',
          fieldset: 'venue'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'content.name',
      fromDate: 'content.schedule.from',
      media: 'content.cover'
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
