export default {
  name: 'event',
  type: 'document',
  title: 'Event',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Event Name',
      description: 'what is the event called, shot version?'
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
      description: 'Where will the even take place?'
    },
    {
      name: 'link',
      type: 'url',
      title: 'Event Link',
      description: 'Where will visitors sign up'
    },
    {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describes your event.',
        of: [{type: 'string'}],
        options: {
          layout: 'tags'
        }
      },
  ]
}