import CustomQuickLinkComponent from '../components/customQuickLinkComponent'

export default {
  name: 'eventsPage',
  type: 'document',
  title: 'Events page',
  __experimental_actions: [
    /* 'create', */
    'update',
    /* 'delete', */
    'publish'
  ],
  fields: [
    {
      name: 'intro',
      type: 'introPortableText',
      title: 'Availability and contact instructions',
      description: 'currently unused on website'
    },
    {
      name: 'quickLink',
      title: 'Events',
      type: 'string',
      inputComponent: CustomQuickLinkComponent,
      options: {
        slug: 'events'
      }
    }
  ]
}
