import { defineField, defineType } from 'sanity'

const textLinesField = defineField({
  name: 'textLines',
  title: 'Text (above button)',
  description: 'Each item = one line.',
  type: 'array',
  of: [
    {
      type: 'object',
      name: 'textLine',
      title: 'Line',
      fields: [
        defineField({ name: 'text', type: 'string', title: 'Text' }),
        defineField({
          name: 'size',
          type: 'string',
          title: 'Size',
          initialValue: 'base',
          options: {
            list: [
              { title: 'Small', value: 'sm' },
              { title: 'Medium', value: 'base' },
              { title: 'Large', value: 'lg' },
              { title: 'XL', value: 'xl' },
              { title: '2XL', value: '2xl' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
        }),
        defineField({
          name: 'color',
          type: 'string',
          title: 'Color',
          initialValue: 'white',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Light grey', value: 'lightgrey' },
              { title: 'Red', value: 'red' },
              { title: 'Yellow', value: 'yellow' },
              { title: 'Orange', value: 'orange' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
        }),
        defineField({ name: 'bold', type: 'boolean', title: 'Bold', initialValue: false }),
      ],
      preview: { select: { title: 'text', subtitle: 'size' } },
    },
  ],
})

const CATEGORY_OPTIONS = [
  { title: 'Game Reviews', value: 'games' },
  { title: 'Tech & Gear', value: 'gear' },
  { title: 'Gaming Blogs', value: 'gaming' },
  { title: 'Movie & TV Reviews', value: 'tvshows' },
  { title: 'Kickboxing', value: 'kickboxing' },
]

export default defineType({
  name: 'affiliateBanner',
  title: 'Affiliate Banner',
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
      name: 'categories',
      type: 'array',
      title: 'Categorieën',
      description: 'Laat leeg = algemene fallback (zichtbaar op homepage en overal waar geen specifieke banner is). Vink categorieën aan om deze banner alleen voor die categorieën te tonen op de postdetailpagina.',
      of: [{ type: 'string' }],
      options: { list: CATEGORY_OPTIONS, layout: 'grid' },
    }),
    defineField({
      name: 'slides',
      title: 'Slides (max 2)',
      type: 'array',
      validation: Rule => Rule.max(2),
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Background Image',
              options: { hotspot: true },
            }),
            textLinesField,
            defineField({ name: 'ctaText', type: 'string', title: 'Button Text' }),
            defineField({ name: 'ctaLink', type: 'string', title: 'Button Link' }),
          ],
          preview: {
            select: { title: 'ctaText', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Slide', media }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { categories: 'categories', media: 'slides.0.image', active: 'active' },
    prepare({ categories, media, active }) {
      const label = categories?.length
        ? categories.join(', ')
        : 'Algemeen (fallback)'
      return {
        title: `Affiliate Banner — ${label}`,
        subtitle: active ? 'Actief' : 'Inactief',
        media,
      }
    },
  },
})
