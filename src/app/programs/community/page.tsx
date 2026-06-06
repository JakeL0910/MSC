import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Community Learning Platform | Make Spanish Casual',
  description: 'Free courses, slang guides, and community spaces for anyone who wants to learn authentic, conversational Spanish. No paywalls, no gatekeeping.',
}

const categories = [
  { name: 'Slang & Street Spanish', description: 'The expressions you hear in real conversations — not in textbooks.' },
  { name: 'Conversational Confidence', description: 'Build the fluency to hold a real conversation and be understood.' },
  { name: 'Culture & Identity', description: 'The stories, humor, and history behind the language.' },
  { name: 'Foundations of Spanish Slang', description: 'Start here if you\'re new to authentic Spanish.' },
  { name: 'Content-Based Spanish', description: 'Learn through content that interests you — music, sports, news, food.' },
  { name: 'Creative Expression', description: 'Poetry, storytelling, and language as art.' },
  { name: 'Spanish in the Digital World', description: 'Memes, social media, texting, and online culture.' },
  { name: 'Travel & Survival Spanish', description: 'Real-world phrases for navigating Spanish-speaking spaces.' },
]

export default function CommunityPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#E8A020' }} className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(28,28,30,0.6)' }}>
            Community Learning Platform
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 max-w-3xl" style={{ color: '#1C1C1E' }}>
            Real Spanish. Free. For everyone.
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed mb-10" style={{ color: 'rgba(28,28,30,0.75)' }}>
            Free courses, slang guides, and community spaces for anyone who wants to speak Spanish the way it's actually spoken.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#1A6B72' }}
          >
            Start Learning Free
          </Link>
        </div>
      </section>

      {/* What It Is */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#E8A020' }}>
              About This Program
            </p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1C1E' }}>
              The original MSC platform, evolved.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              MSC started as a free resource for learners who felt left behind by textbook Spanish that didn't match the language they heard in their communities or wanted to speak in real life. The Community Learning Platform is that original mission, fully realized.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Free courses, resource library, slang guides, and community spaces for anyone who wants to learn authentic, conversational Spanish. Focus on slang, cultural context, and real-world communication — not grammar drills.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4" style={{ backgroundColor: '#FEF3D0' }}>
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#E8A020' }}>
            What's Inside
          </p>
          <h2 className="text-3xl font-bold mb-10" style={{ color: '#1C1C1E' }}>
            Learning categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: '#E8A020' }} />
                <h3 className="text-sm font-bold mb-2" style={{ color: '#1C1C1E' }}>{cat.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1C1E' }}>
            Who is this for?
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-12">
            The Community Learning Platform is built for general learners, heritage speakers reconnecting with their language, youth, and anyone priced out of traditional language instruction.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { label: 'General learners', desc: 'Anyone who wants to speak Spanish authentically.' },
              { label: 'Heritage speakers', desc: 'Reconnect with your language and cultural roots.' },
              { label: 'Students', desc: 'Supplement classroom learning with real-world Spanish.' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-6 text-left" style={{ backgroundColor: '#FEF3D0' }}>
                <p className="font-bold text-sm mb-2" style={{ color: '#1C1C1E' }}>{item.label}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: '#1A6B72' }}>
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            It's all free. Start now.
          </h2>
          <p className="text-base text-white/80 mb-8 max-w-lg mx-auto">
            No subscription. No hidden fees. Create one free account to access everything.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: '#E8A020', color: '#1C1C1E' }}
            >
              Create Free Account
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
