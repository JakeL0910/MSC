import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { site } from '@/data/site'

// Single site-wide typeface — Open Sauce One (self-hosted, OFL licensed). Used
// for headings, body, and UI alike, matching the clean geometric-sans look.
// Exposed as --font-sans; globals.css maps the legacy sans/serif slots to it.
const openSauce = localFont({
  src: [
    { path: './fonts/open-sauce-one-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/open-sauce-one-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/open-sauce-one-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Indexing is gated by SITE_PUBLIC (the single "we are live" switch). Until
  // it's set to "true", the site stays out of search results.
  robots:
    process.env.SITE_PUBLIC === 'true'
      ? { index: true, follow: true }
      : { index: false, follow: false },
  title: {
    default: `${site.name} (${site.acronym}) | Language Access & Inclusive Learning`,
    template: `%s | ${site.acronym}`,
  },
  description: site.subtagline,
  keywords: [
    'language access',
    'health language',
    'health literacy',
    'ESL tutoring',
    'multilingual resources',
    'inclusive language learning',
    'culturally responsive language',
  ],
  openGraph: {
    title: `${site.name} (${site.acronym})`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} (${site.acronym})`,
    description: site.tagline,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={openSauce.variable}>
      <body className={`${openSauce.className} antialiased`}>
        <ScrollProgress />
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
