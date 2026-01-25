export default {
  name: 'edition',
  title: 'Edition',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility. Avoid special characters like quotation marks or angle brackets.',
          validation: Rule =>
            Rule.required().custom(value => {
              if (!value) return 'You have to fill out the alternative text.';
              // forbid straight and curly quotes and angle brackets which can break HTML attributes/markup
              const badChars = /["'<>]/;
              return badChars.test(value)
                ? 'Alt text must not contain quotation marks or angle brackets. Please remove them.'
                : true;
            })
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Untitled Edition',
        media: media
      }
    }
  }
}
