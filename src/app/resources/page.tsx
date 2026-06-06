import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resource Center | Make Spanish Casual',
  description: 'Free Spanish learning resources — lessons, slang guides, activities, games, and quizzes. Browse by category or start with a featured track.',
}

const categories = [
  {
    slug: 'lesson',
    label: 'Lessons',
    description: 'Structured lessons on slang, culture, grammar, and healthcare Spanish.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'bg-msc-teal-light',
    textColor: 'text-msc-teal',
  },
  {
    slug: 'activity',
    label: 'Activities',
    description: 'Interactive exercises and conversation practice for real-world fluency.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'bg-msc-amber-light',
    textColor: 'text-msc-charcoal',
  },
  {
    slug: 'game',
    label: 'Games',
    description: 'Learn slang, vocab, and culture through fun, low-stakes games.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    color: 'bg-msc-coral-light',
    textColor: 'text-msc-coral',
  },
  {
    slug: 'quiz',
    label: 'Quizzes',
    description: 'Test your knowledge and track your progress with quick quizzes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: 'bg-msc-teal-light',
    textColor: 'text-msc-teal',
  },
]

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-msc-teal pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Resource Center</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">
            Everything you need to learn real Spanish.
          </h1>
          <p className="text-lg text-white/85 max-w-xl leading-relaxed mb-8">
            Lessons, activities, games, and quizzes — all free, all authentic, all focused on the Spanish that actually gets spoken.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse All Resources
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-msc-teal">Browse by type</p>
          <h2 className="text-2xl font-bold text-msc-charcoal mb-8">What do you want to do?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}s`}
                className="rounded-2xl p-6 border border-gray-100 bg-white hover:shadow-md hover:border-msc-teal/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} ${cat.textColor} flex items-center justify-center mb-4`}>
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-msc-charcoal mb-2 group-hover:text-msc-teal transition-colors">
                  {cat.label}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
              </Link>
            ))}
          </div>

          {/* CTA row */}
          <div className="rounded-2xl bg-white border border-gray-100 p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-msc-charcoal mb-1">Ready to dive in?</h3>
              <p className="text-sm text-gray-600">All resources are free. Create an account to track your progress.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
              >
                Browse Courses
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl font-semibold text-sm border-2 border-msc-teal text-msc-teal hover:bg-msc-teal hover:text-white transition-all duration-200"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
