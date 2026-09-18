import { defineType, defineField } from 'sanity'

export const ProjectType = defineType({
    name: 'project',
    title: 'Project',
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
            name: 'description',
            type: 'text',
            title: 'Description',
            validation: (Rule) =>
                Rule.required()
                    .min(10)
                    .max(130)
                    .error('Description must be between 10 and 130 characters long.'),
        }),
        defineField({
            name: 'createdAt',
            type: 'datetime',
            title: 'Created At',
            initialValue: new Date().toISOString(),
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
          type: "code",
          options: {
            language: 'typescript',
            languageAlternatives: [
              { title: 'Javascript', value: 'javascript' },
              { title: "TypeScript", value: "typescript" },
              { title: "Python", value: "python"},
              { title: "SQL", value: "sql" },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: "TSX", value: "tsx" },
              { title: "JSX", value: "jsx" },
              { title: "JSON", value: "json" },
              { title: "Bash", value: "bash" },
            ],
            withFilename: true,
            disableFullscreen: false,
          },
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
    ]
})