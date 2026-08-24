import {FiFileText} from 'react-icons/fi'

const reservedSlugs = [
  'about',
  'blog',
  'books',
  'editing',
  'events',
  'speaking',
  'preorder',
  'bioLinks',
  'bioLinks',
  'uploads',
  'tips',
  'series',
  'posts',
  'newsletter',
  'success',
  'success-editing-services',
  'feed',
  'images',
  'fonts',
  'scripts',
  'pdfs'
]

export default {
  name: 'simplePage',
  type: 'document',
  title: 'Simple page',
  icon: FiFileText,
  description:
    'Unlisted pages. They are not in the site navigation — share the URL (and password, if set) directly.',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO and sharing',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'access',
      title: 'Access',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'This is the public URL, for example /saysaSays/',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule =>
        Rule.required().custom(slug => {
          const value = slug && slug.current
          if (!value) return 'A slug is required'
          if (reservedSlugs.includes(value)) {
            return `"${value}" is already used by another page. Choose a different slug.`
          }
          return true
        })
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
      fieldset: 'seo',
      description: 'Used for search and social sharing. Aim for under 160 characters.',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'socialImage',
      type: 'mainImage',
      title: 'Social image',
      fieldset: 'seo',
      description: 'Image used when the page is shared'
    },
    {
      name: 'password',
      type: 'string',
      title: 'Page password',
      fieldset: 'access',
      description:
        'Optional. If set, visitors must enter this before seeing the page. This is a simple lock for exclusive content, not encryption. Do not use it for personal data.'
    },
    {
      name: 'pageBuilder',
      type: 'pageBuilder',
      title: 'Page content',
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      password: 'password'
    },
    prepare({title, slug, password}) {
      const path = slug ? `/${slug}/` : '/…/'
      return {
        title: title || 'Untitled',
        subtitle: password ? `${path} · Password protected` : `${path} · Unlisted`
      }
    }
  }
}
