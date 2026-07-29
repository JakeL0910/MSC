import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import CoverArt from '@/components/shared/CoverArt'
import { blogPosts, formatPostDate, type BlogPost } from '@/data/blog'

// Icon per post category (cover art is decorative; the heading carries meaning).
function categoryIcon(category: string): string {
  if (/community|event/i.test(category)) return 'users'
  if (/news|update/i.test(category)) return 'megaphone'
  return 'book-open'
}

// Real event photo when the post has one; otherwise generated cover art.
function PostCover({ post, className }: { post: BlogPost; className: string }) {
  const img = post.images?.[0]
  if (!img) return <CoverArt icon={categoryIcon(post.category)} seed={post.slug} className={className} />
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'News & Stories',
  description:
    'News and community stories from Make Spanish Casual: events across DFW, conference updates, and moments from our work.',
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      <PageHero
        illustration="story"
        eyebrow="News & Stories"
        title="What we’ve been up to"
        description="Community events, updates, and stories from our work."
      />

      <section className="py-16 bg-white">
        <div className="container">
          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-[1.5fr_1fr] items-center gap-8 bg-msc-teal-light/50 rounded-3xl p-8 md:p-10 mb-10 hover:bg-msc-teal-light transition-colors duration-200"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-msc-teal rounded-full px-3 py-1">
                  Latest
                </span>
                <span className="text-xs font-semibold text-msc-teal">{featured.category}</span>
                <span className="text-xs text-gray-500">
                  {formatPostDate(featured.date)} · {featured.readMinutes} min read
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-msc-charcoal mb-3 group-hover:text-msc-teal transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">{featured.excerpt}</p>
              <span className="text-sm font-semibold text-msc-teal">Read the post →</span>
            </div>
            <PostCover post={featured} className="hidden md:block h-52 rounded-2xl" />
          </Link>

          {/* Post grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <PostCover post={post} className="h-36" />
                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-msc-teal">{post.category}</span>
                    <span className="text-xs text-gray-400">
                      {formatPostDate(post.date)} · {post.readMinutes} min read
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-msc-charcoal mb-2.5 group-hover:text-msc-teal transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="text-sm font-semibold text-msc-teal">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Get new posts and resources by email"
        description="One email a month: new resources and volunteer opportunities. No spam, ever."
        primary={{ label: 'Subscribe via Contact Page', href: '/contact' }}
        secondary={{ label: 'Browse Resources', href: '/resources' }}
      />
    </>
  )
}
