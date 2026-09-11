import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client, bannerQuery } from '@/lib/sanity'
import AffiliateBanner from './AffiliateBanner'
import ShopBanner from './ShopBanner'
import ReviewCard from './ReviewCard'
import { ptComponents } from './portableTextComponents'

interface RecommendedPost {
  title: string
  subtitle?: string
  rating?: number
  slug: string
  category: string
  imageUrl?: string
}

interface PostDetailProps {
  title: string
  subtitle?: string
  rating?: number
  imageUrl?: string
  body?: any[]
  body2?: any[]
  publishedAt?: string
  affiliateLink?: string
  recommendedPosts?: RecommendedPost[]
  backHref: string
  backLabel: string
  category?: string
}

const categoryPath: Record<string, string> = {
  games: '/reviews',
  tvshows: '/tvshows',
  gear: '/gear',
  gaming: '/blogs',
  kickboxing: '/kickboxing',
}

function ScoreBadge({ score }: { score: number }) {
  const bg = score >= 8 ? '#22c55e' : score >= 6 ? '#f97316' : '#ef4444'
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold text-white shadow" style={{ background: bg }}>
      {score}
    </span>
  )
}

export default async function PostDetail({
  title, subtitle, rating, imageUrl, body, body2,
  publishedAt, affiliateLink, recommendedPosts, backHref, backLabel, category,
}: PostDetailProps) {
  // Fetch the most specific matching banner: category-specific first, general fallback second
  const cat = category ?? ''

  const [affiliateBannerData, shopBannerData] = await Promise.all([
    client.fetch(
      bannerQuery('affiliateBanner', 'slides[]{ "imageUrl": image.asset->url, textLines, ctaText, ctaLink }'),
      { cat }
    ).catch(() => null),
    client.fetch(
      bannerQuery('shopBanner', '"imageUrl": image.asset->url, heading, subtext, ctaText, ctaLink, "imageUrl2": image2.asset->url, heading2, subtext2, ctaText2, ctaLink2'),
      { cat }
    ).catch(() => null),
  ])

  return (
    <div className="max-w-2xl mx-auto px-5 pb-16">
      {/* Back link */}
      <div className="pt-6 pb-4">
        <Link href={backHref} className="text-xs text-white/30 hover:text-white/60 transition">
          ← {backLabel}
        </Link>
      </div>

      {/* Hero image */}
      {imageUrl && (
        <div className="relative w-full rounded-2xl overflow-hidden mb-6" style={{ height: 'clamp(180px, 40vw, 340px)' }}>
          <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} priority />
        </div>
      )}

      {/* Title block */}
      <div className="flex items-start gap-3 mb-6">
        <div className="flex-1">
          <h1 className="text-xl font-extrabold text-white leading-snug">{title}</h1>
          {subtitle && <p className="text-sm text-white/40 mt-1">{subtitle}</p>}
          {publishedAt && (
            <p className="text-xs text-white/20 mt-2">
              {new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>
        {rating != null && <ScoreBadge score={rating} />}
      </div>

      {/* Affiliate CTA */}
      {affiliateLink && (
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-2 w-full bg-[#e53935] hover:bg-[#c62828] text-white text-sm font-bold py-3 rounded-xl transition shadow-lg mb-8"
        >
          Buy now
        </a>
      )}

      {/* Body 1 */}
      {body && body.length > 0 && (
        <div className="mb-10">
          <PortableText value={body} components={ptComponents} />
        </div>
      )}

      {/* Affiliate banner slider */}
      {affiliateBannerData?.slides?.length > 0 && (
        <div className="mb-10 -mx-5">
          <AffiliateBanner slides={affiliateBannerData.slides} />
        </div>
      )}

      {/* Body 2 */}
      {body2 && body2.length > 0 && (
        <div className="mb-10">
          <PortableText value={body2} components={ptComponents} />
        </div>
      )}

      {/* Shop banner */}
      {shopBannerData && (
        <div className="-mx-5 mb-10">
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
        </div>
      )}

      {/* Recommended articles */}
      {recommendedPosts && recommendedPosts.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">Recommended</h2>
          <div className="grid grid-cols-2 gap-3">
            {recommendedPosts.map(post => {
              const basePath = categoryPath[post.category] ?? '/reviews'
              return (
                <ReviewCard
                  key={post.slug}
                  title={post.title}
                  subtitle={post.subtitle}
                  rating={post.rating}
                  href={`${basePath}/${post.slug}`}
                  imageUrl={post.imageUrl}
                  className="w-full"
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
