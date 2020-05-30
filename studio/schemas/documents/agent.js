import { MdHeadsetMic } from 'react-icons/md'

export default {
  name: 'agent',
  type: 'document',
  title: 'Agent',
  icon: MdHeadsetMic,
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'agency',
      type: 'string',
      title: 'Agency'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    }
  ]
}
