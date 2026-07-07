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
}

export default function ShopBanner({ imageUrl, heading, subtext, ctaText, ctaLink }: ShopBannerProps) {
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

  return (
    <div className="px-5 pb-8">
      <div
        ref={ref}
        className={`opacity-0 flex overflow-hidden rounded-2xl ${visible ? 'animate-bounce-in' : ''}`}
        style={{
          height: 'clamp(80px, 14vh, 150px)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Square image */}
        <div className="relative shrink-0" style={{ width: 'clamp(80px, 14vh, 150px)', height: '100%' }}>
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
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 5h6M5 2l3 3-3 3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
