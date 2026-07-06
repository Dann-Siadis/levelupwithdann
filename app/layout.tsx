import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import ConditionalLayout from './components/ConditionalLayout'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LevelUpWithDann — Gaming Reviews, Gear & More',
  description: 'Honest game reviews, the best gear picks, gaming blogs and kickboxing content from Dann.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
