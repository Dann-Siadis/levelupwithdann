import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'shopBanner',
  title: 'Shop Banner (below Shop)',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Active',
      description: 'Toggle to show/hide this banner',
      initialValue: true,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Square Image (left side)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'subtext',
      type: 'string',
      title: 'Subtext',
    }),
    defineField({
      name: 'ctaText',
      type: 'string',
      title: 'Button Text',
    }),
    defineField({
      name: 'ctaLink',
      type: 'string',
      title: 'Button Link',
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Shop Banner', media }
    },
  },
})
