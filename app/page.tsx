import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import ReviewCard from './components/ReviewCard'
import SeeAllCard from './components/SeeAllCard'
import SwipeCarousel from './components/SwipeCarousel'
import AffiliateBanner from './components/AffiliateBanner'
import HeroSlider from './components/HeroSlider'
import ShopBanner from './components/ShopBanner'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'LevelUpWithDann — Gaming Reviews, Gear & Kickboxing',
  description: 'Honest game reviews, top gear picks, gaming blogs, and kickboxing content.',
  alternates: { canonical: 'https://www.levelupwithdann.com' },
}

const SECTIONS = [
  { key: 'games',      label: 'Game Reviews',       href: '/reviews' },
  { key: 'gear',       label: 'Tech & Gear',         href: '/gear' },
  { key: 'gaming',     label: 'Gaming Blogs',        href: '/blogs' },
  { key: 'tvshows',    label: 'Movie & TV Reviews',  href: '/tvshows' },
  { key: 'kickboxing', label: 'Kickboxing',          href: '/kickboxing' },
]

export default async function Home() {
  const [hero, posts, products, banner, shopBannerData] = await Promise.all([
    client.fetch(`*[_type == "heroSettings"][0]{
      slides[]{ "imageUrl": image.asset->url, textLines, ctaText, ctaLink }
    }`).catch(() => null),
    client.fetch(`*[_type == "post"] | order(publishedAt desc){
      title, subtitle, "slug": slug.current, category, rating, mainImage
    }`).catch(() => [] as any[]),
    client.fetch(`*[_type == "product"] | order(_createdAt desc){
      title, "slug": slug.current, mainImage, price
    }`).catch(() => [] as any[]),
    client.fetch(`*[_type == "affiliateBanner" && active == true][0]{
      slides[]{ "imageUrl": image.asset->url, textLines, ctaText, ctaLink }
    }`).catch(() => null),
    client.fetch(`*[_type == "shopBanner" && active == true][0]{
      "imageUrl": image.asset->url, heading, subtext, ctaText, ctaLink
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
    price: p.price,
    href: `/shop/${p.slug}`,
    imageUrl: p.mainImage
      ? urlFor(p.mainImage).width(400).height(350).fit('crop').format('webp').quality(80).url()
      : undefined,
  }))

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={hero?.slides ?? []} />

      {/* Category sections */}
      <div className="pt-8 pb-4 space-y-10">
        {SECTIONS.map((section, idx) => {
          const { cards, total } = buildCards(section.key, section.href)
          return (
            <section key={section.key}>
              {section.key === 'tvshows' && banner?.slides?.length > 0 && (
                <div className="mb-10">
                  <AffiliateBanner slides={banner.slides} />
                </div>
              )}
              <div className="flex items-center gap-2.5 px-5 mb-4">
                <h2 className="text-base font-bold text-white tracking-tight">{section.label}</h2>
                {total > 0 && (
                  <Link href={section.href} className="ml-auto text-xs text-white/25 hover:text-white/60 transition">
                    See all →
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
                See all →
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

        {/* Shop Banner */}
        {shopBannerData && (
          <ShopBanner
            imageUrl={shopBannerData.imageUrl}
            heading={shopBannerData.heading}
            subtext={shopBannerData.subtext}
            ctaText={shopBannerData.ctaText}
            ctaLink={shopBannerData.ctaLink}
          />
        )}
      </div>
    </>
  )
}
