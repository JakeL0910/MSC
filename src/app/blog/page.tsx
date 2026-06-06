import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Make Spanish Casual',
  description: 'Research, reflections, and stories from the Make Spanish Casual community — language access, health equity, and authentic Spanish education.',
}

const posts = [
  {
    title: 'ACTFL 2025: Language Access in Clinical Settings',
    date: 'November 2025',
    category: 'Research & Advocacy',
    description: 'Jake Li presents at ACTFL Annual Convention on the role of culturally authentic Spanish in reducing adverse health outcomes for LEP patients.',
    slug: 'actfl-2025',
  },
  {
    title: 'ACTFL 2024: Slang as a Health Equity Tool',
    date: 'November 2024',
    category: 'Research & Advocacy',
    description: 'How colloquial Spanish — the register providers are never taught — changes the power dynamic in clinical encounters. Presentation recap.',
    slug: 'actfl-2024',
  },
  {
    title: 'Día de los Muertos: Language, Culture, and Care',
    date: 'October 2024',
    category: 'Culture',
    description: 'Why Día de los Muertos is more than a holiday — and what healthcare providers miss when they skip the cultural layer of language.',
    slug: 'dia-de-los-muertos-2024',
  },
  {
    title: 'ACTFL 2023: Why Textbook Spanish Fails in Healthcare',
    date: 'November 2023',
    category: 'Research & Advocacy',
    description: "MSC's first ACTFL appearance — laying out the gap between clinical Spanish curricula and the way Spanish-speaking patients actually communicate.",
    slug: 'actfl-2023',
  },
]

const categoryColors: Record<string, string> = {
  'Research & Advocacy': 'bg-msc-teal-light text-msc-teal',
  'Culture': 'bg-msc-amber-light text-msc-charcoal',
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-msc-teal pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Blog</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">
            Research, culture, and language access.
          </h1>
          <p className="text-lg text-white/85 max-w-xl leading-relaxed">
            Reflections from the MSC community on authentic language education, health equity, and what it takes to close the language gap in healthcare.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {posts.map((post, i) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-md hover:border-msc-teal/20 transition-all group"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                  {i === 0 && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-msc-coral-light text-msc-coral">
                      Latest
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-msc-charcoal mb-3 group-hover:text-msc-teal transition-colors text-balance">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{post.description}</p>
                <a
                  href="https://makespanishcasual.org/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-msc-teal hover:text-msc-teal-dark transition-colors"
                >
                  Read on MSC.org
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="mt-12 rounded-2xl bg-msc-teal p-10 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stay in the loop</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Get new research, resources, and MSC updates delivered to your inbox.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
