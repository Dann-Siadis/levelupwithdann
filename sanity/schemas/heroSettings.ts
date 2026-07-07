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
          initialValue: 'lg',
          options: {
            list: [
              { title: 'Small', value: 'sm' },
              { title: 'Medium', value: 'base' },
              { title: 'Large', value: 'lg' },
              { title: 'XL', value: 'xl' },
              { title: '2XL', value: '2xl' },
              { title: '3XL', value: '3xl' },
              { title: '4XL', value: '4xl' },
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

export default defineType({
  name: 'heroSettings',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'slides',
      title: 'Slides',
      description: 'Add up to 3 slides. Each one auto-slides every 5 seconds.',
      type: 'array',
      validation: Rule => Rule.max(3),
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
              description: 'Internal path or external URL',
            }),
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
    select: { media: 'slides.0.image' },
    prepare({ media }) {
      return { title: 'Hero Banner', media }
    },
  },
})
