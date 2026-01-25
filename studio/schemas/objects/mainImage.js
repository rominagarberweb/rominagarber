export default {
  name: 'mainImage',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption'
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: `Important for SEO and accessibility. Avoid special characters like " ' < >.`,
      validation: Rule =>
        Rule.required().custom(value => {
          if (!value) return 'You have to fill out the alternative text.';
          // forbid straight and curly quotes and angle brackets which can break HTML attributes/markup
          const badChars = /["'<>]/;
          return badChars.test(value)
            ? 'Alt text must not contain quotation marks or angle brackets (" \' “ ” ‘ ’ < >). Please remove them.'
            : true;
        })
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
