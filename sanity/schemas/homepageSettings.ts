import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageSettings',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'gameReviews',
      type: 'array',
      title: 'Game Reviews — kaarten op homepage',
      description: 'Kies welke posts je wil tonen en sleep ze in de gewenste volgorde.',
      of: [{ type: 'reference', to: [{ type: 'post' }], options: { filter: 'category == "games"' } }],
    }),
    defineField({
      name: 'techGear',
      type: 'array',
      title: 'Tech & Gear — kaarten op homepage',
      description: 'Kies welke posts je wil tonen en sleep ze in de gewenste volgorde.',
      of: [{ type: 'reference', to: [{ type: 'post' }], options: { filter: 'category == "gear"' } }],
    }),
    defineField({
      name: 'gamingBlogs',
      type: 'array',
      title: 'Gaming Blogs — kaarten op homepage',
      description: 'Kies welke posts je wil tonen en sleep ze in de gewenste volgorde.',
      of: [{ type: 'reference', to: [{ type: 'post' }], options: { filter: 'category == "gaming"' } }],
    }),
    defineField({
      name: 'movieTV',
      type: 'array',
      title: 'Movie & TV Reviews — kaarten op homepage',
      description: 'Kies welke posts je wil tonen en sleep ze in de gewenste volgorde.',
      of: [{ type: 'reference', to: [{ type: 'post' }], options: { filter: 'category == "tvshows"' } }],
    }),
    defineField({
      name: 'kickboxing',
      type: 'array',
      title: 'Kickboxing — kaarten op homepage',
      description: 'Kies welke posts je wil tonen en sleep ze in de gewenste volgorde.',
      of: [{ type: 'reference', to: [{ type: 'post' }], options: { filter: 'category == "kickboxing"' } }],
    }),
    defineField({
      name: 'shop',
      type: 'array',
      title: 'Shop — kaarten op homepage',
      description: 'Kies welke producten je wil tonen en sleep ze in de gewenste volgorde.',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage instellingen' }
    },
  },
})
