import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gameAffiliateCard',
  title: 'Game Reviews — Affiliate Card',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Active',
      description: 'Show this card in the Game Reviews carousel at position 5',
      initialValue: true,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title (max 2 lines)',
    }),
    defineField({
      name: 'affiliateLink',
      type: 'url',
      title: 'Affiliate Link',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Affiliate Card', media }
    },
  },
})
