import {MdLightbulbOutline} from 'react-icons/md'

export default {
  name: 'tip',
  type: 'document',
  title: 'Writing tip',
  icon: MdLightbulbOutline,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      type: 'bioPortableText',
      title: 'Tip content'
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}
