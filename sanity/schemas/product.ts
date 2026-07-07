import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Product Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      description: 'Short line below the title on cards',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    }),
    defineField({
      name: 'price',
      type: 'string',
      title: 'Price (e.g. €49.99)',
    }),
    defineField({
      name: 'affiliateLink',
      type: 'url',
      title: 'Affiliate / Buy Link',
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Gaming', value: 'gaming' },
          { title: 'Kickboxing', value: 'kickboxing' },
          { title: 'Phone / Mobile', value: 'phone' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'price', media: 'mainImage' },
  },
})
