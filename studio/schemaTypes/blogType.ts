import {defineType, defineField} from 'sanity'

export const BlogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) =>
        Rule.required().min(3).max(100).error('Title must be between 3 and 100 characters long.'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required().error('Slug is required.'),
    }),
    defineField({
      name: 'time',
      type: 'number',
      title: 'Read Time (in minutes)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: new Date().toISOString(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(130) // Otherwise it will overflow from my card
          .error('Description must be between 10 and 130 characters long.'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Thumbnail',
      options: {
        hotspot: true,
      },
      validation: (Rule) => {
        return Rule.custom((image) => {
          if (!image?.asset?._ref) {
            return true
          }
          // Check if image is in landscape orientation
          if (image && image.asset && image.asset._ref) {
            const [, , dimensions] = image.asset._ref.split('-')
            const [width, height] = dimensions.split('x').map(Number)
            if (width < height) {
              return 'Thumbnail image must be in landscape orientation.'
            }
          }
          return true
        })
      },
    }),
    defineField({
      name: 'detail',
      title: 'Detail',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'show',
      type: 'boolean',
      title: 'Show',
      initialValue: true,
    }),
  ],
})
