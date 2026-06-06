import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Reset Password | Make Spanish Casual',
  description: 'Reset your Make Spanish Casual account password.',
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-msc-cream">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-msc-teal">Make Spanish Casual</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1">Language Access | 501(c)3 Nonprofit</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-msc-charcoal mb-3">Reset your password</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Password reset is handled on our main platform. Click below to reset your MSC account password on makespanishcasual.org.
          </p>
          <a
            href="https://makespanishcasual.org/login/"
            className="block w-full py-3 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200 text-center mb-4"
          >
            Reset Password on MSC.org
          </a>
          <Link
            href="/login"
            className="block text-sm text-msc-teal font-medium hover:underline"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
