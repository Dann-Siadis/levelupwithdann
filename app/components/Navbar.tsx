'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/reviews', label: 'Reviews' },
  { href: '/gear', label: 'Gear' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/shop', label: 'Shop' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0d14]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-xl tracking-tight shrink-0">
          <span className="text-white">LevelUp</span>
          <span className="text-[#00ff88]">Dann</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname?.startsWith(link.href)
                  ? 'text-[#00ff88]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="https://www.twitch.tv/levelupwithdann"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-[#9146ff] hover:bg-[#7d33ff] text-white text-xs font-bold px-4 py-2 rounded-full transition shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Twitch
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/60 hover:text-white transition p-1"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#1a1a2e] border-t border-white/5 px-6 py-5 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium transition ${
                pathname?.startsWith(link.href) ? 'text-[#00ff88]' : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.twitch.tv/levelupwithdann"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#9146ff] text-sm font-semibold mt-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9146ff] animate-pulse" />
            Live on Twitch
          </a>
        </div>
      )}
    </nav>
  )
}
