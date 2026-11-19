import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gameAffiliateCard',
  title: 'Homepage — Affiliate Card',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Active',
      description: 'Show this card in the homepage carousel of its category',
      initialValue: true,
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Categorie',
      description: 'In welke rij op de homepage deze kaart staat. Leeg = Game Reviews.',
      initialValue: 'games',
      options: {
        list: [
          { title: 'Game Reviews', value: 'games' },
          { title: 'Tech & Gear', value: 'gear' },
          { title: 'Gaming Blogs', value: 'gaming' },
          { title: 'Movie & TV Reviews', value: 'tvshows' },
          { title: 'Kickboxing', value: 'kickboxing' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'positie',
      type: 'number',
      title: 'Positie',
      description: 'Na hoeveel kaarten deze kaart komt. Bijv. 2 = na de 2e kaart (plek 3), 0 = helemaal vooraan. Leeg = na de 4e kaart. Groter dan de rij = achteraan, vóór "See all".',
      validation: Rule => Rule.min(0).integer(),
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
    select: { title: 'title', media: 'image', category: 'category', positie: 'positie', active: 'active' },
    prepare({ title, media, category, positie, active }) {
      const namen: Record<string, string> = { games: 'Game Reviews', gear: 'Tech & Gear', gaming: 'Gaming Blogs', tvshows: 'Movie & TV Reviews', kickboxing: 'Kickboxing' }
      return {
        title: title || 'Affiliate Card',
        subtitle: `${namen[category || 'games'] ?? category} · na kaart ${positie ?? 4}${active === false ? ' · inactief' : ''}`,
        media,
      }
    },
  },
})
