import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-msc-cream">
      <div className="max-w-md">
        <p className="text-8xl font-bold text-msc-teal/20 mb-2 leading-none">404</p>
        <h1 className="text-2xl font-bold text-msc-charcoal mb-3">Page not found</h1>
        <p className="text-base text-gray-600 mb-10 leading-relaxed">
          We couldn't find what you're looking for. Try one of these to get back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
          >
            Back to Home
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm border-2 border-msc-teal text-msc-teal hover:bg-msc-teal hover:text-white transition-all duration-200"
          >
            Browse Courses
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: 'Our Programs', href: '/programs' },
            { label: 'About MSC', href: '/about' },
            { label: 'Make a Donation', href: '/donate' },
            { label: 'Contact Us', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2.5 px-4 rounded-xl bg-white border border-gray-100 text-gray-600 hover:text-msc-teal hover:border-msc-teal/30 transition-colors text-center"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
