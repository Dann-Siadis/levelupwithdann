'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="sticky top-0 z-50 border-b transition-all duration-300"
      style={
        scrolled
          ? {
              background: 'rgba(145, 70, 255, 0.10)',
              borderColor: 'rgba(145, 70, 255, 0.22)',
              backdropFilter: 'blur(14px) saturate(160%)',
              WebkitBackdropFilter: 'blur(14px) saturate(160%)',
              boxShadow: '0 4px 30px rgba(145, 70, 255, 0.12)',
            }
          : {
              background: 'transparent',
              borderColor: 'transparent',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              boxShadow: 'none',
            }
      }
    >
      <div className="flex justify-center py-1.5 relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col items-center gap-0.5 group"
          aria-label="Menu"
        >
          <Image
            src="/lwdlogo.png"
            alt="LevelUpWithDann"
            width={52}
            height={39}
            className="object-contain"
            priority
          />
          <svg
            width="12" height="7" viewBox="0 0 14 8" fill="none"
            className={`text-white/30 group-hover:text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {open && (
          <div
            className="absolute top-full mt-1 left-1/2 -translate-x-1/2 rounded-xl py-1.5 min-w-[190px] text-center z-50"
            style={{
              background: 'rgba(145, 70, 255, 0.10)',
              border: '1px solid rgba(145, 70, 255, 0.22)',
              backdropFilter: 'blur(14px) saturate(160%)',
              WebkitBackdropFilter: 'blur(14px) saturate(160%)',
              boxShadow: '0 8px 40px rgba(145, 70, 255, 0.12)',
            }}
          >
            <Link
              href="/"
              className="block px-6 py-3 text-base font-semibold text-white hover:bg-[rgba(145,70,255,0.20)] transition rounded-lg mx-1"
              style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.65)' }}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-6 py-3 text-base font-semibold text-white hover:bg-[rgba(145,70,255,0.20)] transition rounded-lg mx-1"
              style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.65)' }}
              onClick={() => setOpen(false)}
            >
              About Dann
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
