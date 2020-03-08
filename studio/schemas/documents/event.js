import { MdEvent } from 'react-icons/md'

export default {
  name: 'event',
  type: 'document',
  title: 'Event',
  icon: MdEvent,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe the event for search and social media'
    },
    {
      name: 'schedule',
      type: 'schedule',
      title: 'Schedule',
      description: 'From when to when will the event last?'
    },
    {
      name: 'venue',
      type: 'venue',
      title: 'Venue',
      description: 'Where will the event take place?'
    },
    {
      name: 'link',
      type: 'url',
      title: 'Event Link',
      description: 'Where will visitors sign up'
    }
  ]
}
