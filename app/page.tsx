import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import ReviewCard from './components/ReviewCard'
import SeeAllCard from './components/SeeAllCard'
import SwipeCarousel from './components/SwipeCarousel'
import AffiliateBanner from './components/AffiliateBanner'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'LevelUpWithDann — Gaming Reviews, Gear & Kickboxing',
  description: 'Honest game reviews, top gear picks, gaming blogs, and kickboxing content.',
  alternates: { canonical: 'https://www.levelupwithdann.com' },
}

const SECTIONS = [
  { key: 'games',      label: 'Game Reviews',  href: '/reviews' },
  { key: 'tvshows',    label: 'TV Show Reviews', href: '/tvshows' },
  { key: 'gear',       label: 'Gear',           href: '/gear' },
  { key: 'gaming',     label: 'Gaming Blogs',   href: '/blogs' },
  { key: 'kickboxing', label: 'Kickboxing',     href: '/kickboxing' },
]

export default async function Home() {
  const [hero, posts, products, banner] = await Promise.all([
    client.fetch(`*[_type == "heroSettings"][0]{
      "imageUrl": image.asset->url, ctaText, ctaLink, textLines
    }`).catch(() => null),
    client.fetch(`*[_type == "post"] | order(publishedAt desc){
      title, subtitle, "slug": slug.current, category, rating, mainImage
    }`).catch(() => [] as any[]),
    client.fetch(`*[_type == "product"] | order(_createdAt desc){
      title, subtitle, "slug": slug.current, mainImage
    }`).catch(() => [] as any[]),
    client.fetch(`*[_type == "affiliateBanner" && active == true][0]{
      "imageUrl": image.asset->url, textLines, ctaText, ctaLink
    }`).catch(() => null),
  ])

  function buildCards(category: string, basePath: string) {
    const all = (posts as any[]).filter(p => p.category === category)
    const visible = all.slice(0, 6)
    return {
      cards: visible.map(p => ({
        title: p.title,
        subtitle: p.subtitle,
        href: `${basePath}/${p.slug}`,
        imageUrl: p.mainImage
          ? urlFor(p.mainImage).width(400).height(350).fit('crop').format('webp').quality(80).url()
          : undefined,
        rating: p.rating ?? undefined,
      })),
      total: all.length,
    }
  }

  const shopCards = (products as any[]).slice(0, 6).map(p => ({
    title: p.title,
    subtitle: p.subtitle,
    href: `/shop/${p.slug}`,
    imageUrl: p.mainImage
      ? urlFor(p.mainImage).width(400).height(350).fit('crop').format('webp').quality(80).url()
      : undefined,
  }))

  return (
    <>
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(160px, 28vh, 300px)' }}>
        {hero?.imageUrl ? (
          <Image src={hero.imageUrl} alt="Hero" fill priority style={{ objectFit: 'cover' }} />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #0d0f1a 0%, #1e0a3c 50%, #0a1628 100%)' }}
          />
        )}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-center">
          {hero?.textLines?.length > 0 && (
            <div className="flex flex-col items-center gap-0.5">
              {hero.textLines.map((line: any, i: number) => {
                const colorMap: Record<string, string> = {
                  white: '#ffffff',
                  lightgrey: '#cccccc',
                  red: '#e53935',
                  yellow: '#ffd600',
                  orange: '#ff6d00',
                }
                const sizeMap: Record<string, string> = {
                  sm: '0.75rem', base: '1rem', lg: '1.125rem',
                  xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem',
                }
                return (
                  <span
                    key={i}
                    style={{
                      color: colorMap[line.color] ?? '#ffffff',
                      fontSize: sizeMap[line.size] ?? '1.125rem',
                      fontWeight: line.bold ? 700 : 400,
                      textShadow: '0 1px 6px rgba(0,0,0,0.7)',
                    }}
                  >
                    {line.text}
                  </span>
                )
              })}
            </div>
          )}
          {hero?.ctaText && hero?.ctaLink && (
            <Link
              href={hero.ctaLink}
              className="inline-flex items-center gap-1.5 bg-[#e53935] hover:bg-[#c62828] text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-lg whitespace-nowrap"
            >
              {hero.ctaText}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Category sections */}
      <div className="py-8 space-y-10">
        {SECTIONS.map((section, idx) => {
          const { cards, total } = buildCards(section.key, section.href)
          return (
            <section key={section.key}>
              {section.key === 'gaming' && banner && (
                <div className="mb-10">
                  <AffiliateBanner
                    imageUrl={banner.imageUrl}
                    textLines={banner.textLines}
                    ctaText={banner.ctaText}
                    ctaLink={banner.ctaLink}
                  />
                </div>
              )}
              <div className="flex items-center gap-2.5 px-5 mb-4">
                <h2 className="text-base font-bold text-white tracking-tight">{section.label}</h2>
                {total > 0 && (
                  <Link href={section.href} className="ml-auto text-xs text-white/25 hover:text-white/60 transition">
                    See all ({total}) →
                  </Link>
                )}
              </div>
              <div className="pl-5">
                {cards.length > 0 ? (
                  <SwipeCarousel>
                    {cards.map((card, i) => <ReviewCard key={i} {...card} />)}
                    <SeeAllCard href={section.href} total={total} label={`See all ${section.label}`} />
                    <div className="shrink-0 w-3" />
                  </SwipeCarousel>
                ) : (
                  <p className="text-xs text-white/20 py-6">Coming soon</p>
                )}
              </div>
            </section>
          )
        })}

        {/* Shop */}
        <section>
          <div className="flex items-center gap-2.5 px-5 mb-4">
            <h2 className="text-base font-bold text-white tracking-tight">Shop</h2>
            {products.length > 0 && (
              <Link href="/shop" className="ml-auto text-xs text-white/25 hover:text-white/60 transition">
                See all ({(products as any[]).length}) →
              </Link>
            )}
          </div>
          <div className="pl-5">
            {shopCards.length > 0 ? (
              <SwipeCarousel>
                {shopCards.map((card, i) => <ReviewCard key={i} {...card} />)}
                <SeeAllCard href="/shop" total={(products as any[]).length} label="See all Products" />
                <div className="shrink-0 w-3" />
              </SwipeCarousel>
            ) : (
              <p className="text-xs text-white/20 py-6">Coming soon</p>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
