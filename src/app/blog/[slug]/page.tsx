import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CtaBand from '@/components/shared/CtaBand'
import CoverArt from '@/components/shared/CoverArt'
import { blogPosts, getPost, formatPostDate } from '@/data/blog'

function categoryIcon(category: string): string {
  if (/community|event/i.test(category)) return 'users'
  if (/news|update/i.test(category)) return 'megaphone'
  return 'book-open'
}

// Blog articles are generated from src/data/blog.ts — edit content there.

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const morePosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <article>
        {/* Cover banner — real event photo when available */}
        {post.images?.[0] ? (
          <div className="relative h-56 md:h-80 w-full overflow-hidden">
            <Image src={post.images[0].src} alt={post.images[0].alt} fill priority className="object-cover" sizes="100vw" />
          </div>
        ) : (
          <CoverArt icon={categoryIcon(post.category)} seed={post.slug} className="h-48 md:h-60" />
        )}

        {/* Article header */}
        <header className="bg-white pt-10 pb-8 border-b border-gray-100">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-msc-teal hover:underline mb-6">
                ← All posts
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-msc-teal bg-white/80 rounded-full px-3 py-1">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">
                  {formatPostDate(post.date)} · {post.readMinutes} min read
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-msc-charcoal leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </header>

        {/* Article body */}
        <div className="py-14 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {post.body.map((section, i) => (
                <section key={section.heading ?? i}>
                  {section.heading && (
                    <h2 className="text-2xl font-bold text-msc-charcoal mt-10 mb-4">{section.heading}</h2>
                  )}
                  {section.paragraphs.map((para) => (
                    <p key={para.slice(0, 40)} className="text-gray-700 leading-relaxed text-lg mb-5">
                      {para}
                    </p>
                  ))}
                </section>
              ))}

              <div className="mt-12 bg-msc-cream rounded-2xl p-7 text-center">
                <p className="text-base font-semibold text-msc-charcoal mb-2">
                  Written by the MSC team
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Questions, corrections, or a story to share? We read everything.
                </p>
                <Link href="/contact" className="text-sm font-semibold text-msc-teal hover:underline">
                  Contact us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Photo gallery — real event photos */}
      {post.images && post.images.length > 1 && (
        <section className="pb-16 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold text-msc-charcoal mb-6 text-center">Photos from the day</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
              {post.images.slice(1).map((img) => (
                <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-msc-cream">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More posts */}
      <section className="py-16 bg-msc-cream">
        <div className="container">
          <h2 className="text-2xl font-bold text-msc-charcoal mb-8 text-center">Keep reading</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {morePosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <p className="text-xs text-gray-400 mb-2">
                  {formatPostDate(p.date)} · {p.readMinutes} min read
                </p>
                <h3 className="text-lg font-bold text-msc-charcoal mb-2 group-hover:text-msc-teal transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Turn reading into doing"
        description="Behind every story is real work, and volunteers make it happen."
        primary={{ label: 'Volunteer With MSC', href: '/volunteer' }}
        secondary={{ label: 'Browse Free Resources', href: '/resources' }}
      />
    </>
  )
}
