import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Dann',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      description: 'e.g. "About Dann"',
    }),
    defineField({
      name: 'subheading',
      type: 'string',
      title: 'Subheading',
      description: 'One-liner under the heading',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      type: 'array',
      title: 'Bio (rich text)',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      title: 'Highlights / Facts',
      description: 'Short bullet points e.g. "Gamer since 2005", "Kickboxer"',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Social Links',
      fields: [
        defineField({ name: 'twitch', type: 'url', title: 'Twitch' }),
        defineField({ name: 'instagram', type: 'url', title: 'Instagram' }),
        defineField({ name: 'youtube', type: 'url', title: 'YouTube' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'photo' },
    prepare({ title, media }) {
      return { title: title || 'About Dann', media }
    },
  },
})
