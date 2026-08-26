import {FiFileText} from 'react-icons/fi'
import {initialGateCopy} from '../lib/simplePageGateCopy'

const reservedSlugs = new Set(
  [
    'about',
    'blog',
    'books',
    'editing',
    'events',
    'speaking',
    'preorder',
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
  ].map(slug => slug.toLowerCase())
)

export default {
  name: 'simplePage',
  type: 'document',
  title: 'Simple page',
  icon: FiFileText,
  description:
    'Unlisted pages. They are not in the site navigation — share the URL (and password, if set) directly.',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true
    },
    {
      name: 'seo',
      title: 'SEO and sharing'
    },
    {
      name: 'access',
      title: 'Access'
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
      group: 'content'
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
          if (reservedSlugs.has(value.toLowerCase())) {
            return `"${value}" is already used by another page. Choose a different slug.`
          }
          return true
        }),
      group: 'content'
    },
    {
      name: 'pageBuilder',
      type: 'pageBuilder',
      title: 'Page content',
      validation: Rule => Rule.required().min(1),
      group: 'content'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
      group: 'seo',
      description: 'Used for search and social sharing. Aim for under 160 characters.',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'socialImage',
      type: 'mainImage',
      title: 'Social image',
      group: 'seo',
      description: 'Image used when the page is shared'
    },
    {
      name: 'passwordProtected',
      type: 'boolean',
      title: 'Password protected',
      group: 'access',
      initialValue: false,
      options: {
        layout: 'switch'
      },
      description:
        'Turn on to lock the page. Visitors must enter the password before they can read it.'
    },
    {
      name: 'password',
      type: 'string',
      title: 'Page password',
      group: 'access',
      hidden: ({document}) => !document?.passwordProtected,
      description:
        'Lowercase letters and numbers only, with no spaces. This is a simple lock for exclusive content, not encryption. Do not use it for personal data.',
      validation: Rule =>
        Rule.custom((password, context) => {
          if (!context.document?.passwordProtected) return true
          const value = (password || '').trim()
          if (!value) {
            return 'Add a password or turn off password protection'
          }
          if (!/^[a-z0-9]+$/.test(value)) {
            return 'Use lowercase letters and numbers only, with no spaces or special characters'
          }
          return true
        })
    },
    {
      name: 'gateWhy',
      type: 'text',
      title: 'Why it is locked',
      group: 'access',
      rows: 3,
      initialValue: initialGateCopy('gateWhy'),
      hidden: ({document}) => !document?.passwordProtected
    },
    {
      name: 'gateUnlocks',
      type: 'text',
      title: 'What the password unlocks',
      group: 'access',
      rows: 3,
      initialValue: initialGateCopy('gateUnlocks'),
      hidden: ({document}) => !document?.passwordProtected
    },
    {
      name: 'gateHelp',
      type: 'text',
      title: 'If they do not have the password',
      group: 'access',
      rows: 3,
      initialValue: initialGateCopy('gateHelp'),
      hidden: ({document}) => !document?.passwordProtected
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      password: 'password',
      passwordProtected: 'passwordProtected'
    },
    prepare({title, slug, password, passwordProtected}) {
      const path = slug ? `/${slug}/` : '/…/'
      const locked = passwordProtected && password
      return {
        title: title || 'Untitled',
        subtitle: locked ? `${path} · Password protected` : `${path} · Unlisted`
      }
    }
  }
}
