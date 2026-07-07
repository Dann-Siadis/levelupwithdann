import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface PostDetailProps {
  title: string
  subtitle?: string
  rating?: number
  imageUrl?: string
  body?: any[]
  excerpt?: string
  publishedAt?: string
  affiliateLink?: string
  backHref: string
  backLabel: string
}

function ScoreBadge({ score }: { score: number }) {
  const bg = score >= 8 ? '#22c55e' : score >= 6 ? '#f97316' : '#ef4444'
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold text-white shadow"
      style={{ background: bg }}
    >
      {score}
    </span>
  )
}

export default function PostDetail({
  title, subtitle, rating, imageUrl, body, excerpt,
  publishedAt, affiliateLink, backHref, backLabel,
}: PostDetailProps) {
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
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </a>
      )}

      {/* Body */}
      {body && body.length > 0 ? (
        <div className="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed">
          <PortableText value={body} />
        </div>
      ) : excerpt ? (
        <p className="text-white/60 text-sm leading-relaxed">{excerpt}</p>
      ) : (
        <p className="text-white/20 text-sm text-center py-10">Content coming soon.</p>
      )}
    </div>
  )
}
