import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign In | Make Spanish Casual',
  description: 'Sign in to your Make Spanish Casual account to access courses, resources, and community spaces.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 bg-msc-cream">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-msc-teal">Make Spanish Casual</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1">Language Access | 501(c)3 Nonprofit</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold mb-1 text-msc-charcoal">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold hover:underline text-msc-teal">
              Create one free
            </Link>
          </p>

          {/* External platform notice */}
          <div className="flex items-start gap-3 bg-msc-cream rounded-xl px-4 py-3.5 mb-6 border border-msc-teal/20">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-msc-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs leading-relaxed text-msc-charcoal">
              <span className="font-semibold">MSC accounts are managed on our main platform.</span>{' '}
              Clicking "Sign In" will take you to{' '}
              <span className="font-medium">makespanishcasual.org</span> to complete sign-in.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium hover:underline text-msc-teal">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="Your password"
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
              />
            </div>

            <a
              href="https://makespanishcasual.org/login/"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-msc-teal hover:-translate-y-0.5 transition-all duration-200 mt-2"
            >
              Sign In on makespanishcasual.org
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-xs text-gray-400">or</span>
            </div>
          </div>

          <Link
            href="/register"
            className="block w-full py-3 rounded-xl text-center text-sm font-semibold border-2 transition-all duration-200 hover:-translate-y-0.5 border-msc-teal text-msc-teal"
          >
            Create Free Account
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          MSC is free. Always. No credit card, no paywall.
        </p>
      </div>
    </div>
  )
}
