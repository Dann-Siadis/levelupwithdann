import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import ReviewCard from './components/ReviewCard'
import SeeAllCard from './components/SeeAllCard'
import SwipeCarousel from './components/SwipeCarousel'
import AffiliateBanner from './components/AffiliateBanner'
import HeroSlider from './components/HeroSlider'
import ShopBanner from './components/ShopBanner'
import AffiliateCard from './components/AffiliateCard'
import GameQuiz from './components/GameQuiz'
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
  const [hero, homepage, banner, shopBannerData, gameAffiliate, quizData] = await Promise.all([
    client.fetch(`*[_type == "heroSettings"][0]{
      slides[]{ "imageUrl": image.asset->url, textLines, ctaText, ctaLink }
    }`).catch(() => null),
    client.fetch(`*[_type == "homepageSettings"][0]{
      "gameReviews": gameReviews[]->{
        title, subtitle, rating, "slug": slug.current, mainImage
      },
      "techGear": techGear[]->{
        title, subtitle, rating, "slug": slug.current, mainImage
      },
      "gamingBlogs": gamingBlogs[]->{
        title, subtitle, rating, "slug": slug.current, mainImage
      },
      "movieTV": movieTV[]->{
        title, subtitle, rating, "slug": slug.current, mainImage
      },
      "kickboxing": kickboxing[]->{
        title, subtitle, rating, "slug": slug.current, mainImage
      },
      "shop": shop[]->{
        title, "slug": slug.current, mainImage, price
      }
    }`).catch(() => null),
    client.fetch(`*[_type == "affiliateBanner" && active == true][0]{
      slides[]{ "imageUrl": image.asset->url, textLines, ctaText, ctaLink }
    }`).catch(() => null),
    client.fetch(`*[_type == "shopBanner" && active == true][0]{
      "imageUrl": image.asset->url, heading, subtext, ctaText, ctaLink,
      "imageUrl2": image2.asset->url, heading2, subtext2, ctaText2, ctaLink2
    }`).catch(() => null),
    client.fetch(`*[_type == "gameAffiliateCard" && active == true][0]{
      title, affiliateLink, "imageUrl": image.asset->url
    }`).catch(() => null),
    client.fetch(`*[_type == "gameQuiz" && active == true][0]{
      title, subtitle,
      questions[]{ question, answers[]{ text, correct } },
      "flipImageUrl": flipImage.asset->url,
      flipBadge, flipTitle, flipSubtext, flipCtaText, flipCtaLink
    }`).catch(() => null),
  ])

  const homepageKey: Record<string, string> = {
    games: 'gameReviews',
    gear: 'techGear',
    gaming: 'gamingBlogs',
    tvshows: 'movieTV',
    kickboxing: 'kickboxing',
  }

  function buildCards(category: string, basePath: string) {
    const raw: any[] = homepage?.[homepageKey[category]] ?? []
    return {
      cards: raw.map(p => ({
        title: p.title,
        subtitle: p.subtitle,
        href: `${basePath}/${p.slug}`,
        imageUrl: p.mainImage
          ? urlFor(p.mainImage).width(400).height(350).fit('crop').format('webp').quality(80).url()
          : undefined,
        rating: p.rating ?? undefined,
      })),
      total: raw.length,
    }
  }

  const shopCards = (homepage?.shop ?? []).map((p: any) => ({
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
      <div className="max-w-6xl mx-auto pt-8 pb-4 space-y-10">
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
                    {cards.map((card, i) => (
                      <>
                        <ReviewCard key={i} {...card} />
                        {section.key === 'games' && i === 3 && gameAffiliate && (
                          <AffiliateCard
                            key="affiliate"
                            title={gameAffiliate.title}
                            href={gameAffiliate.affiliateLink}
                            imageUrl={gameAffiliate.imageUrl}
                          />
                        )}
                      </>
                    ))}
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
            {shopCards.length > 0 && (
              <Link href="/shop" className="ml-auto text-xs text-white/25 hover:text-white/60 transition">
                See all →
              </Link>
            )}
          </div>
          <div className="pl-5">
            {shopCards.length > 0 ? (
              <SwipeCarousel>
                {shopCards.map((card: any, i: number) => <ReviewCard key={i} {...card} />)}
                <SeeAllCard href="/shop" total={shopCards.length} label="See all Products" />
                <div className="shrink-0 w-3" />
              </SwipeCarousel>
            ) : (
              <p className="text-xs text-white/20 py-6">Coming soon</p>
            )}
          </div>
        </section>

        {/* Game Quiz */}
        {quizData?.questions?.length > 0 && (
          <section>
            <GameQuiz
              title={quizData.title}
              subtitle={quizData.subtitle}
              questions={quizData.questions}
              flipImageUrl={quizData.flipImageUrl}
              flipBadge={quizData.flipBadge}
              flipTitle={quizData.flipTitle}
              flipSubtext={quizData.flipSubtext}
              flipCtaText={quizData.flipCtaText}
              flipCtaLink={quizData.flipCtaLink}
            />
          </section>
        )}

        {/* Shop Banner */}
        {shopBannerData && (
          <ShopBanner
            imageUrl={shopBannerData.imageUrl}
            heading={shopBannerData.heading}
            subtext={shopBannerData.subtext}
            ctaText={shopBannerData.ctaText}
            ctaLink={shopBannerData.ctaLink}
            imageUrl2={shopBannerData.imageUrl2}
            heading2={shopBannerData.heading2}
            subtext2={shopBannerData.subtext2}
            ctaText2={shopBannerData.ctaText2}
            ctaLink2={shopBannerData.ctaLink2}
          />
        )}
      </div>
    </>
  )
}
