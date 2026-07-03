import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import { blogPosts, formatPostDate } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Blog & Updates',
  description:
    'Stories and explainers on language access, health communication, bilingual families, inclusive learning, and youth volunteering.',
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      <PageHero
        eyebrow="Blog & Updates"
        title="Notes on language, access, and care"
        description="Explainers, community stories, and updates from the MSC team — written the way we write everything: plainly."
      />

      <section className="py-16 bg-white">
        <div className="container">
          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block bg-msc-teal-light/50 rounded-3xl p-8 md:p-10 mb-10 hover:bg-msc-teal-light transition-colors duration-200"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-msc-teal rounded-full px-3 py-1">
                Latest
              </span>
              <span className="text-xs font-semibold text-msc-teal">{featured.category}</span>
              <span className="text-xs text-gray-500">
                {formatPostDate(featured.date)} · {featured.readMinutes} min read
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-msc-charcoal mb-3 group-hover:text-msc-teal transition-colors max-w-3xl">
              {featured.title}
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mb-5">{featured.excerpt}</p>
            <span className="text-sm font-semibold text-msc-teal">Read the post →</span>
          </Link>

          {/* Post grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
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
