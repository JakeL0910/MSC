import type { MetadataRoute } from 'next'

// Tells search-engine crawlers not to index the site while it's a private
// draft. Belt-and-suspenders alongside the `robots` noindex tag in layout.tsx
// and the password gate in middleware.ts.
//
// TO GO PUBLIC LATER: change `disallow: '/'` to `allow: '/'` (and remove the
// noindex block in src/app/layout.tsx).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
