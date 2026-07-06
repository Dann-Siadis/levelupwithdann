import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSettings',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Background Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaText',
      type: 'string',
      title: 'Button Text',
      description: 'e.g. "GTA VI — Pre-order now"',
    }),
    defineField({
      name: 'ctaLink',
      type: 'string',
      title: 'Button Link',
      description: 'Internal path (/reviews/gta-vi) or external URL',
    }),
  ],
  preview: {
    select: { title: 'ctaText', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Hero Banner', media }
    },
  },
})
