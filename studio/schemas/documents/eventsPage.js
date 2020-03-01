export default {
  name: 'eventsPage',
  type: 'document',
  title: 'Events page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'intro',
      type: 'introPortableText',
      title: 'Availability and contact instructions'
    }
  ]
}
