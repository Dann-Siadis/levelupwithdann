import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
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
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: '🎮 Game Reviews', value: 'games' },
          { title: '📺 Movie & TV Reviews', value: 'tvshows' },
          { title: '🎧 Tech & Gear', value: 'gear' },
          { title: '🕹️ Gaming Blogs', value: 'gaming' },
          { title: '🥊 Kickboxing', value: 'kickboxing' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      description: 'Short line below the title on cards and detail page',
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Score (0–10)',
      validation: Rule => Rule.min(0).max(10).integer(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt (SEO)',
      description: 'Leave empty to auto-generate from body. Max 160 characters for best SEO.',
      rows: 2,
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Content (first section)',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'body2',
      type: 'array',
      title: 'Content (second section — below affiliate banner)',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
    }),
    defineField({
      name: 'affiliateLink',
      type: 'url',
      title: 'Affiliate Link (buy button)',
    }),
    defineField({
      name: 'recommendedPosts',
      type: 'array',
      title: 'Aanbevolen artikelen',
      description: 'Kies minimaal 2 artikelen om onderaan te tonen',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: Rule => Rule.max(6),
    }),
  ],
  preview: {
    select: { title: 'title', category: 'category', media: 'mainImage' },
    prepare({ title, category, media }) {
      const icons: Record<string, string> = {
        games: '🎮', tvshows: '📺', gear: '🎧', gaming: '🕹️', kickboxing: '🥊',
      }
      return { title, subtitle: icons[category] ? `${icons[category]} ${category}` : category, media }
    },
  },
})
