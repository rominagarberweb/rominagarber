import {FiFileText} from 'react-icons/fi'

const defaultGateWhy =
  'This page is exclusive. Enter the password you were given to view it.'
const defaultGateUnlocks =
  'Once you unlock it, you can read the full page and use any downloads on it.'
const defaultGateHelp = "Don't have the password? Reach out to Romina on social."

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
      name: 'passwordProtected',
      type: 'boolean',
      title: 'Password protected',
      fieldset: 'access',
      initialValue: false,
      options: {
        layout: 'switch'
      },
      description:
        'Turn on to set a password and the message visitors see. The live page is locked when a password is saved.'
    },
    {
      name: 'password',
      type: 'string',
      title: 'Page password',
      fieldset: 'access',
      hidden: ({document}) => !document?.passwordProtected,
      description:
        'Visitors must enter this before seeing the page. This is a simple lock for exclusive content, not encryption. Do not use it for personal data.',
      validation: Rule =>
        Rule.custom((password, context) => {
          if (!context.document?.passwordProtected) return true
          if (!(password || '').trim()) {
            return 'Add a password or turn off password protection'
          }
          return true
        })
    },
    {
      name: 'gateWhy',
      type: 'text',
      title: 'Why it is locked',
      fieldset: 'access',
      rows: 3,
      initialValue: defaultGateWhy,
      hidden: ({document}) => !document?.passwordProtected
    },
    {
      name: 'gateUnlocks',
      type: 'text',
      title: 'What the password unlocks',
      fieldset: 'access',
      rows: 3,
      initialValue: defaultGateUnlocks,
      hidden: ({document}) => !document?.passwordProtected
    },
    {
      name: 'gateHelp',
      type: 'text',
      title: 'If they do not have the password',
      fieldset: 'access',
      rows: 3,
      initialValue: defaultGateHelp,
      hidden: ({document}) => !document?.passwordProtected
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
