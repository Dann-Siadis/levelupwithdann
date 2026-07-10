import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gameQuiz',
  title: 'Game Quiz',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Actief',
      description: 'Zet aan om het quiz blok te tonen op de homepage.',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Quiz titel',
      description: 'Wordt bovenaan het quiz blok getoond.',
      initialValue: 'Gaming Quiz',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitel (optioneel)',
      description: 'Korte beschrijving onder de titel.',
    }),
    defineField({
      name: 'questions',
      type: 'array',
      title: 'Vragen (max 3)',
      description: 'Voeg 1 tot 3 vragen toe. Elke vraag heeft 2 of 3 antwoorden.',
      validation: Rule => Rule.min(1).max(3),
      of: [
        {
          type: 'object',
          name: 'question',
          title: 'Vraag',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Vraag tekst',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'answers',
              type: 'array',
              title: 'Antwoorden (2 of 3)',
              description: 'Markeer precies 1 antwoord als correct.',
              validation: Rule => Rule.min(2).max(3),
              of: [
                {
                  type: 'object',
                  name: 'answer',
                  title: 'Antwoord',
                  fields: [
                    defineField({ name: 'text', type: 'string', title: 'Antwoord tekst', validation: Rule => Rule.required() }),
                    defineField({ name: 'correct', type: 'boolean', title: 'Correct antwoord', initialValue: false }),
                  ],
                  preview: {
                    select: { title: 'text', correct: 'correct' },
                    prepare({ title, correct }) {
                      return { title: `${correct ? '✓' : '✗'} ${title}` }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'question' },
            prepare({ title }) {
              return { title: title || 'Vraag' }
            },
          },
        },
      ],
    }),

    // --- Flip side (affiliate content) ---
    defineField({
      name: 'flipImage',
      type: 'image',
      title: 'Flip — Afbeelding (achtergrond)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'flipBadge',
      type: 'string',
      title: 'Flip — Badge tekst (optioneel)',
      description: 'Bv. "SALE", "TOP PICK", "AANBIEDING"',
    }),
    defineField({
      name: 'flipBadgeColor',
      type: 'string',
      title: 'Flip — Badge kleur',
      initialValue: 'red',
      options: {
        list: [
          { title: 'Rood', value: 'red' },
          { title: 'Groen', value: 'green' },
          { title: 'Oranje', value: 'orange' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'flipTitle',
      type: 'string',
      title: 'Flip — Titel',
    }),
    defineField({
      name: 'flipSubtext',
      type: 'string',
      title: 'Flip — Subtext',
    }),
    defineField({
      name: 'flipCtaText',
      type: 'string',
      title: 'Flip — Button tekst',
      initialValue: 'Bekijk aanbieding',
    }),
    defineField({
      name: 'flipCtaLink',
      type: 'string',
      title: 'Flip — Button link',
    }),
  ],
  preview: {
    select: { title: 'title', active: 'active', media: 'flipImage' },
    prepare({ title, active, media }) {
      return {
        title: title || 'Game Quiz',
        subtitle: active ? 'Actief' : 'Inactief',
        media,
      }
    },
  },
})
