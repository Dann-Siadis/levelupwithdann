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
          { title: '📺 TV Shows', value: 'tvshows' },
          { title: '🎧 Gear', value: 'gear' },
          { title: '🕹️ Gaming Blogs', value: 'gaming' },
          { title: '🥊 Kickboxing', value: 'kickboxing' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating (1–5)',
      validation: Rule => Rule.min(1).max(5),
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
      title: 'Excerpt',
      rows: 3,
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
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
      title: 'Affiliate Link',
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
