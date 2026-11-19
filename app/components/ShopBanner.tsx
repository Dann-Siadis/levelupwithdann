'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ShopBannerProps {
  imageUrl?: string
  heading?: string
  subtext?: string
  ctaText?: string
  ctaLink?: string
  imageUrl2?: string
  heading2?: string
  subtext2?: string
  ctaText2?: string
  ctaLink2?: string
  imageUrl3?: string
  heading3?: string
  subtext3?: string
  ctaText3?: string
  ctaLink3?: string
}

function BannerCard({ imageUrl, heading, subtext, ctaText, ctaLink }: {
  imageUrl?: string; heading?: string; subtext?: string; ctaText?: string; ctaLink?: string
}) {
  return (
    <div
      className="flex overflow-hidden rounded-2xl flex-1"
      style={{
        height: 'clamp(90px, 14vh, 150px)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Square image */}
      <div className="relative shrink-0" style={{ width: 'clamp(90px, 14vh, 150px)', height: '100%' }}>
        {imageUrl ? (
          <Image src={imageUrl} alt={heading ?? 'Banner'} fill style={{ objectFit: 'cover' }} />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/10 text-3xl">🎮</div>
        )}
      </div>

      {/* Text + CTA */}
      <div className="flex flex-col justify-center gap-1.5 px-4 flex-1 min-w-0">
        {heading && (
          <p className="text-sm font-bold text-white leading-tight line-clamp-2">{heading}</p>
        )}
        {subtext && (
          <p className="text-xs text-white/40 leading-tight line-clamp-1">{subtext}</p>
        )}
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="self-start inline-flex items-center gap-1 bg-[#e53935] hover:bg-[#c62828] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow whitespace-nowrap mt-0.5"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  )
}

export default function ShopBanner({
  imageUrl, heading, subtext, ctaText, ctaLink,
  imageUrl2, heading2, subtext2, ctaText2, ctaLink2,
  imageUrl3, heading3, subtext3, ctaText3, ctaLink3,
}: ShopBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hasBanner2 = !!(heading2 || imageUrl2)
  const hasBanner3 = !!(heading3 || imageUrl3)
  const aantal = 1 + (hasBanner2 ? 1 : 0) + (hasBanner3 ? 1 : 0)
  const layout = aantal === 1
    ? 'flex'
    : aantal === 2
      ? 'grid grid-cols-1 md:grid-cols-2 gap-3'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'

  return (
    <div className="px-5">
      <div
        ref={ref}
        className={`opacity-0 ${visible ? 'animate-bounce-in' : ''} ${layout}`}
      >
        <BannerCard
          imageUrl={imageUrl}
          heading={heading}
          subtext={subtext}
          ctaText={ctaText}
          ctaLink={ctaLink}
        />
        {hasBanner2 && (
          <BannerCard
            imageUrl={imageUrl2}
            heading={heading2}
            subtext={subtext2}
            ctaText={ctaText2}
            ctaLink={ctaLink2}
          />
        )}
        {hasBanner3 && (
          <BannerCard
            imageUrl={imageUrl3}
            heading={heading3}
            subtext={subtext3}
            ctaText={ctaText3}
            ctaLink={ctaLink3}
          />
        )}
      </div>
    </div>
  )
}
