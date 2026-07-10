'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TextLine {
  text: string
  size: string
  color: string
  bold: boolean
}

interface Slide {
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
  sm: '0.75rem', base: '1rem', lg: '1.125rem',
  xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem',
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)

  const next = useCallback(() => {
    setCurrent(i => (i + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrent(i => (i - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, slides.length])

  if (!slides.length) return null

  return (
    <div className="h-[210px] md:h-[460px] lg:h-[520px]">
      {/* Slides */}
      <div
        className="relative w-full h-full overflow-hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (diff > 50) next()
          else if (diff < -50) prev()
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
          >
            {slide.imageUrl ? (
              <Image src={slide.imageUrl} alt={`Slide ${i + 1}`} fill priority={i === 0} style={{ objectFit: 'cover' }} />
            ) : (
              <div style={{ background: 'linear-gradient(135deg, #0d0f1a 0%, #1e0a3c 50%, #0a1628 100%)', width: '100%', height: '100%' }} />
            )}
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-center">
              {slide.textLines && slide.textLines.length > 0 && (
                <div className="flex flex-col items-center gap-0.5">
                  {slide.textLines.map((line, j) => (
                    <span
                      key={j}
                      style={{
                        color: colorMap[line.color] ?? '#ffffff',
                        fontSize: sizeMap[line.size] ?? '1.125rem',
                        fontWeight: line.bold ? 700 : 400,
                        textShadow: '0 1px 6px rgba(0,0,0,0.7)',
                      }}
                    >
                      {line.text}
                    </span>
                  ))}
                </div>
              )}
              {slide.ctaText && slide.ctaLink && (
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-1.5 bg-[#e53935] hover:bg-[#c62828] text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-lg whitespace-nowrap"
                >
                  {slide.ctaText}
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-1.5 pt-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? '16px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === current ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
