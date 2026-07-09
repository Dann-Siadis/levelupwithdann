import { defineField, defineType } from 'sanity'

const CATEGORY_OPTIONS = [
  { title: 'Game Reviews', value: 'games' },
  { title: 'Tech & Gear', value: 'gear' },
  { title: 'Gaming Blogs', value: 'gaming' },
  { title: 'Movie & TV Reviews', value: 'tvshows' },
  { title: 'Kickboxing', value: 'kickboxing' },
]

export default defineType({
  name: 'shopBanner',
  title: 'Shop Banner',
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
    select: { title: 'heading', categories: 'categories', media: 'image', active: 'active' },
    prepare({ title, categories, media, active }) {
      const label = categories?.length
        ? categories.join(', ')
        : 'Algemeen (fallback)'
      return {
        title: `${title || 'Shop Banner'} — ${label}`,
        subtitle: active ? 'Actief' : 'Inactief',
        media,
      }
    },
  },
})
