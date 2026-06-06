import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Make Spanish Casual | Language Access Nonprofit',
  description: 'Make Spanish Casual is a nonprofit advancing equitable language access through free, culturally authentic Spanish education — with a focus on healthcare settings where language barriers affect outcomes.',
  keywords: ['Spanish education', 'language access', 'health equity', 'nonprofit', 'medical Spanish', 'healthcare Spanish'],
  openGraph: {
    title: 'Make Spanish Casual | Language Access Nonprofit',
    description: 'Free, culturally authentic Spanish education for learners, providers, and communities.',
    type: 'website',
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
