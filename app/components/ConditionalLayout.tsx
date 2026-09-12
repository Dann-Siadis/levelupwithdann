'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')
  // This build reports the homepage's pathname as "/index" rather than "/"
  // (a static-export quirk), so both need to be treated as home.
  const isHome = pathname === '/' || pathname === '/index'

  if (isStudio) return <>{children}</>

  return (
    <>
      {!isHome && (
        <div
          style={{
            background: '#e53935',
            color: '#fff',
            textAlign: 'center',
            padding: '6px 16px',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          Some pages are still in the works.
        </div>
      )}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
