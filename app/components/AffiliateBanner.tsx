'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TextLine {
  text: string
  size: string
  color: string
  bold: boolean
}

interface AffiliateBannerProps {
  imageUrl?: string
  textLines?: TextLine[]
  ctaText?: string
  ctaLink?: string
}

const colorMap: Record<string, string> = {
  white: '#ffffff',
  lightgrey: '#cccccc',
  red: '#e53935',
  yellow: '#ffd600',
  orange: '#ff6d00',
}

const sizeMap: Record<string, string> = {
  sm: '0.75rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem',
}

export default function AffiliateBanner({ imageUrl, textLines, ctaText, ctaLink }: AffiliateBannerProps) {
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
    <div className="px-5">
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-2xl opacity-0 ${visible ? 'animate-bounce-in' : ''}`}
        style={{ height: 'clamp(80px, 14vh, 150px)' }}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="Banner" fill style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ background: 'linear-gradient(135deg, #1e0a3c 0%, #0a1628 100%)', width: '100%', height: '100%' }} />
        )}
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-4 text-center">
          {textLines && textLines.length > 0 && (
            <div className="flex flex-col items-center gap-0.5">
              {textLines.map((line, i) => (
                <span
                  key={i}
                  style={{
                    color: colorMap[line.color] ?? '#ffffff',
                    fontSize: sizeMap[line.size] ?? '1rem',
                    fontWeight: line.bold ? 700 : 400,
                    textShadow: '0 1px 6px rgba(0,0,0,0.7)',
                  }}
                >
                  {line.text}
                </span>
              ))}
            </div>
          )}
          {ctaText && ctaLink && (
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-1.5 bg-[#e53935] hover:bg-[#c62828] text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition shadow-lg whitespace-nowrap"
            >
              {ctaText}
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
