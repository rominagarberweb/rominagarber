import {FiUser} from 'react-icons/fi'

export default {
  name: 'authorReference',
  type: 'object',
  title: 'Author reference',
  icon: FiUser,
  fields: [
    {
      name: 'author',
      type: 'reference',
      to: [
        {
          type: 'author'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'author.name',
      media: 'author.image.asset'
    }
  }
}
