// Dynamic sitemap for search engines. Lists the public, indexable routes plus
// the dynamic program / resource / blog slugs pulled from data. Excludes admin,
// member, and API routes (private / not for indexing).
import type { MetadataRoute } from 'next'
import { site } from '@/data/site'
import { programs } from '@/data/programs'
import { resources } from '@/data/resources'
import { blogPosts } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '')
  const now = new Date()

  const staticPaths = [
    '', // home
    '/about',
    '/impact',
    '/programs',
    '/resources',
    '/classes',
    '/classes/august-access-sprint',
    '/volunteer',
    '/partners',
    '/chapters',
    '/contact',
    '/donate',
    '/blog',
    '/become-a-member',
    '/share-story',
    '/learn',
    '/phrase-library',
    '/scorecard',
    '/brand',
    '/privacy',
    '/terms',
  ]

  const dynamicPaths = [
    ...programs.map((p) => `/programs/${p.slug}`),
    ...resources.map((r) => `/resources/${r.slug}`),
    ...blogPosts.map((b) => `/blog/${b.slug}`),
  ]

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.split('/').length > 2 ? 0.6 : 0.8,
  }))
}
