import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create Free Account | Make Spanish Casual',
  description: 'Create a free MSC account to access courses, the Healthcare Spanish Initiative, resource library, and community spaces.',
}

const perks = [
  'Access all courses and the full resource library',
  'Enroll in the Healthcare Spanish Initiative',
  'Join community practice spaces',
  'Track your learning progress',
  'Free — always, no credit card needed',
]

export default function RegisterPage() {
  return (
    <div className="min-h-screen py-16 px-4 bg-msc-cream">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — value prop */}
          <div className="pt-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:opacity-75 transition-opacity text-msc-teal">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to MSC
            </Link>
            <h1 className="text-4xl font-bold mb-4 text-msc-charcoal">
              Join MSC.<br />It's free.
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              One account gives you access to everything — courses, the Healthcare Spanish Initiative, cultural resources, and community spaces. No cost, ever.
            </p>
            <ul className="space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-msc-teal-light flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-msc-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {perk}
                </li>
              ))}
            </ul>
            <blockquote className="mt-10 pl-4 border-l-4 border-msc-amber italic text-sm text-gray-600">
              "I joined to improve my Spanish. I stayed because it felt like I belonged."
              <div className="mt-2 not-italic font-medium text-xs text-gray-500">— Braeden, MSC community member</div>
            </blockquote>
          </div>

          {/* Right — redirect card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold mb-1 text-msc-charcoal">Create your account</h2>
            <p className="text-sm text-gray-500 mb-6">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold hover:underline text-msc-teal">
                Sign in
              </Link>
            </p>

            {/* External platform notice */}
            <div className="flex items-start gap-3 bg-msc-cream rounded-xl px-4 py-3.5 mb-6 border border-msc-teal/20">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-msc-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs leading-relaxed text-msc-charcoal">
                <span className="font-semibold">Account creation is handled on our main platform.</span>{' '}
                Clicking below will take you to{' '}
                <span className="font-medium">makespanishcasual.org</span> to complete registration.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">First name</label>
                  <input
                    type="text"
                    placeholder="Jake"
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Last name</label>
                  <input
                    type="text"
                    placeholder="Li"
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>

            <a
              href="https://makespanishcasual.org/registration/"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
            >
              Create Account on makespanishcasual.org
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <p className="text-xs text-center text-gray-400 mt-5 leading-relaxed">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="hover:text-msc-teal transition-colors">terms of service</Link>.
              MSC will never sell your data or charge you for access.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
