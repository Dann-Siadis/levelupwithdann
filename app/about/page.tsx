import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'About Dann — LevelUpWithDann',
  description: 'Gamer, kickboxer, content creator. The story behind LevelUpWithDann.',
}

export default async function AboutPage() {
  const about = await client.fetch(`*[_type == "about"][0]{
    heading, subheading, bio, highlights,
    "photoUrl": photo.asset->url,
    socialLinks
  }`).catch(() => null)

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
        <div className="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed">
          <PortableText value={about.bio} />
        </div>
      ) : (
        <p className="text-white/25 text-sm text-center py-10">
          Add content via the Studio to fill this page.
        </p>
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
    </div>
  )
}
