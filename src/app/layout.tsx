import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { site } from '@/data/site'

// Body font — clean, legible sans.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
})

// Heading font — warm editorial serif for a distinctive, human brand voice.
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // NOINDEX: keeps the site out of Google while it's a private draft.
  // When you're ready to go fully public, remove this `robots` block (and
  // delete src/app/robots.ts) so search engines can index the site.
  robots: { index: false, follow: false },
  title: {
    default: `${site.name} (${site.acronym}) | Language Access & Health Communication`,
    template: `%s | ${site.acronym}`,
  },
  description: site.subtagline,
  keywords: [
    'language access',
    'health communication',
    'health literacy',
    'ESL tutoring',
    'multilingual resources',
    'inclusive language learning',
    'youth-led nonprofit',
    'culturally responsive communication',
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
