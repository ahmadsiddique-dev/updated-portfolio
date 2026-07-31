import { defineField, defineType} from 'sanity'

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        validation: (Rule) => Rule.required(),
    }),
    //  tags can be only one of the following: frontend, backend, database, devops, other.
    defineField({
        name: 'tag',
        title: 'Tag',
        type: 'string',
        options: {
          list: [
            { title: 'Frontend', value: 'frontend' },
            { title: 'Backend', value: 'backend' },
            { title: 'Database', value: 'database' },
            { title: 'DevOps', value: 'devops' },
            { title: 'Other', value: 'other' },
          ],
        },
        validation: (Rule) => Rule.required(),
    })
  ]
})