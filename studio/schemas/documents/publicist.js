import {MdHeadsetMic} from 'react-icons/md'

export default {
  name: 'publicist',
  type: 'document',
  title: 'Publicist',
  icon: MdHeadsetMic,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'agency',
      type: 'string',
      title: 'Agency',
      validation: Rule => Rule.required()
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: Rule => Rule.required()
    }
  ]
}
