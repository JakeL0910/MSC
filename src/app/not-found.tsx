import Link from 'next/link'
import Icon from '@/components/shared/Icons'

export default function NotFound() {
  return (
    <section className="py-28 bg-msc-cream/50">
      <div className="container text-center">
        <span className="w-16 h-16 rounded-2xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-6">
          <Icon name="search" className="w-8 h-8" />
        </span>
        <h1 className="text-4xl font-bold text-msc-charcoal mb-3">Page not found</h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
          The page you're looking for may have moved during our rebrand. Try one of these instead:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/resources" className="btn-secondary">Browse Resources</Link>
          <Link href="/programs" className="btn-secondary">Explore Programs</Link>
        </div>
      </div>
    </section>
  )
}
