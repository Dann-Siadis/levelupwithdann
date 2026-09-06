import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import type { Metadata } from 'next'
import ReviewCard from '@/app/components/ReviewCard'
import AffiliateBanner from '@/app/components/AffiliateBanner'
import { ptComponents } from '@/app/components/portableTextComponents'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'About Dann — LevelUpWithDann',
  description: 'Gamer, kickboxer, content creator. The story behind LevelUpWithDann.',
}

const CATEGORY_PATH: Record<string, string> = {
  games: '/reviews',
  gear: '/gear',
  gaming: '/blogs',
  tvshows: '/tvshows',
  kickboxing: '/kickboxing',
}

const bannerProjection = `"slides": slides[]{ "imageUrl": image.asset->url, textLines, ctaText, ctaLink }`

export default async function AboutPage() {
  const [about, latestPosts] = await Promise.all([
    client
      .fetch(`*[_type == "about"][0]{
        heading, subheading, bio, highlights, skills,
        "photoUrl": photo.asset->url,
        socialLinks,
        "banner": affiliateBanner->{ ${bannerProjection} }
      }`)
      .catch(() => null),
    client
      .fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]{
        title, subtitle, rating, category, "slug": slug.current, mainImage
      }`)
      .catch(() => [] as any[]),
  ])

  let banner = about?.banner ?? null
  if (!banner?.slides?.length) {
    banner = await client
      .fetch(`*[_type == "affiliateBanner" && active == true && !defined(categories)][0]{ ${bannerProjection} }`)
      .catch(() => null)
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        {about?.photoUrl ? (
          <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 border-2 border-[#e53935]/30">
            <Image src={about.photoUrl} alt="Dann" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        ) : (
          <div className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-5xl mb-5">
            🎮
          </div>
        )}
        <h1 className="text-3xl font-extrabold text-white mb-2">
          {about?.heading || 'About Dann'}
        </h1>
        {about?.subheading && (
          <p className="text-white/40 text-base">{about.subheading}</p>
        )}
      </div>

      {/* Highlights */}
      {about?.highlights?.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {about.highlights.map((h: string, i: number) => (
            <span
              key={i}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(229,57,53,0.1)', border: '1px solid rgba(229,57,53,0.2)', color: '#f0f0f0' }}
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Bio */}
      {about?.bio ? (
        <div className="max-w-none">
          <PortableText value={about.bio} components={ptComponents} />
        </div>
      ) : (
        <p className="text-white/25 text-sm text-center py-10">
          Add content via the Studio to fill this page.
        </p>
      )}

      {/* Skill bars */}
      {about?.skills?.length > 0 && (
        <div className="mt-12 space-y-4">
          {about.skills.map((s: { label: string; value: number }, i: number) => {
            const pct = Math.max(0, Math.min(100, s.value ?? 0))
            return (
              <div key={i}>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-white/70">{s.label}</span>
                  <span className="text-white/35">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#e53935' }} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Social links */}
      {about?.socialLinks && (
        <div className="flex gap-4 justify-center mt-12">
          {about.socialLinks.twitch && (
            <a href={about.socialLinks.twitch} target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-[#9146ff] transition font-semibold">
              Twitch
            </a>
          )}
          {about.socialLinks.instagram && (
            <a href={about.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-white transition font-semibold">
              Instagram
            </a>
          )}
          {about.socialLinks.youtube && (
            <a href={about.socialLinks.youtube} target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-white transition font-semibold">
              YouTube
            </a>
          )}
        </div>
      )}

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-bold text-white mb-4">Latest Posts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(latestPosts as any[]).map((p) => (
              <ReviewCard
                key={p.slug}
                title={p.title}
                subtitle={p.subtitle}
                href={`${CATEGORY_PATH[p.category] ?? '/blogs'}/${p.slug}`}
                imageUrl={
                  p.mainImage
                    ? urlFor(p.mainImage).width(400).height(350).fit('crop').format('webp').quality(80).url()
                    : undefined
                }
                rating={p.rating ?? undefined}
                className="w-full"
              />
            ))}
          </div>
        </section>
      )}

      {/* Affiliate banner */}
      {banner?.slides?.length > 0 && (
        <div className="mt-16 -mx-5">
          <AffiliateBanner slides={banner.slides} />
        </div>
      )}
    </div>
  )
}
