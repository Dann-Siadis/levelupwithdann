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
      name: 'skills',
      type: 'array',
      title: 'Skill bars',
      description: 'Horizontal bars on the About page. Each row = a label + a percentage (0–100).',
      of: [
        {
          type: 'object',
          name: 'skill',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              type: 'number',
              title: 'Percentage (0–100)',
              validation: (Rule) => Rule.required().min(0).max(100),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Skill',
                subtitle: subtitle != null ? `${subtitle}%` : '',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'affiliateBanner',
      type: 'reference',
      title: 'Affiliate banner (bottom of About page)',
      description:
        'Which Affiliate Banner shows at the bottom of the About page. Leave empty to use the general fallback banner.',
      to: [{ type: 'affiliateBanner' }],
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
