import {MdLightbulbOutline} from 'react-icons/md'

export default {
  name: 'tipReference',
  type: 'object',
  title: 'Tip',
  icon: MdLightbulbOutline,
  fields: [
    {
      name: 'tip',
      type: 'reference',
      to: [
        {
          type: 'tip'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'tip.name'
    }
  }
}
