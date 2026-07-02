import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { site } from '@/data/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
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
