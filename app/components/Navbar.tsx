'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)
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

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0f1a]/95 backdrop-blur-md border-b border-white/5">
      <div className="flex justify-center py-3 relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col items-center gap-1 group"
          aria-label="Menu"
        >
          <Image
            src="/lwdlogo.png"
            alt="LevelUpWithDann"
            width={72}
            height={54}
            className="object-contain"
            priority
          />
          <svg
            width="14" height="8" viewBox="0 0 14 8" fill="none"
            className={`text-white/30 group-hover:text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {open && (
          <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl py-1.5 min-w-[180px] text-center z-50">
            <Link
              href="/"
              className="block px-6 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition rounded-lg mx-1"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-6 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition rounded-lg mx-1"
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
