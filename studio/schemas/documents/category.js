import { FiGrid } from 'react-icons/fi'

export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  icon: FiGrid,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    }
  ]
}
