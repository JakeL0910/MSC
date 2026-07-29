import type { MetadataRoute } from 'next'

// Search-engine rules. The site is blocked from indexing until it goes live.
// Set SITE_PUBLIC=true (the single "we are live" switch — see middleware.ts and
// layout.tsx) and redeploy to allow crawling.
const PUBLIC = process.env.SITE_PUBLIC === 'true'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(PUBLIC ? { allow: '/' } : { disallow: '/' }),
    },
  }
}
