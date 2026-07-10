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
      title: 'Banner 1 — Afbeelding (links)',
      options: { hotspot: true },
    }),
    defineField({ name: 'heading', type: 'string', title: 'Banner 1 — Heading' }),
    defineField({ name: 'subtext', type: 'string', title: 'Banner 1 — Subtext' }),
    defineField({ name: 'ctaText', type: 'string', title: 'Banner 1 — Button tekst' }),
    defineField({ name: 'ctaLink', type: 'string', title: 'Banner 1 — Button link' }),

    defineField({
      name: 'image2',
      type: 'image',
      title: 'Banner 2 — Afbeelding (links) — optioneel',
      description: 'Vul dit in om een tweede banner naast de eerste te tonen (op desktop naast elkaar, op mobiel eronder).',
      options: { hotspot: true },
    }),
    defineField({ name: 'heading2', type: 'string', title: 'Banner 2 — Heading' }),
    defineField({ name: 'subtext2', type: 'string', title: 'Banner 2 — Subtext' }),
    defineField({ name: 'ctaText2', type: 'string', title: 'Banner 2 — Button tekst' }),
    defineField({ name: 'ctaLink2', type: 'string', title: 'Banner 2 — Button link' }),
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
