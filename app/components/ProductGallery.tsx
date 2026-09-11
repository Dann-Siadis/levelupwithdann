'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)

  if (images.length === 0) return null

  const next = () => setCurrent(i => (i + 1) % images.length)
  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)

  return (
    <div className="mb-6">
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-white/5"
        style={{ height: 'clamp(180px, 40vw, 340px)' }}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (diff > 50) next()
          else if (diff < -50) prev()
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
          >
            <Image src={src} alt={`${alt} ${i + 1}`} fill style={{ objectFit: 'cover' }} priority={i === 0} />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Foto ${i + 1}`}
              className="relative shrink-0 rounded-lg overflow-hidden transition"
              style={{
                width: 56,
                height: 56,
                outline: i === current ? '2px solid #e53935' : '2px solid rgba(255,255,255,0.1)',
                outlineOffset: '-2px',
                opacity: i === current ? 1 : 0.6,
              }}
            >
              <Image src={src} alt="" fill style={{ objectFit: 'cover' }} sizes="56px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
