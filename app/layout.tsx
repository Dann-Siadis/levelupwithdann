import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ConditionalLayout from './components/ConditionalLayout'

const GA_MEASUREMENT_ID = 'G-C017C6WF5N'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LevelUpWithDann — Gaming Reviews, Gear & More',
  description: 'Honest game reviews, the best gear picks, gaming blogs and kickboxing content from Dann.',
  verification: {
    google: '0WJMxDAgu8nUKTkGSmkxvb7i8TV-FjVHXZZh4QUcuLA',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
