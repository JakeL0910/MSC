import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Icon from '@/components/shared/Icons'
import { resources, getResource, getCategory } from '@/data/resources'

// Resource detail pages are generated from src/data/resources.ts.
// Add a `file` path to a resource to enable its download button.

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) return { title: 'Resource Not Found' }
  return {
    title: resource.title,
    description: resource.description,
  }
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) notFound()

  const category = getCategory(resource.category)
  const related = resources
    .filter((r) => r.category === resource.category && r.slug !== resource.slug)
    .slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden bg-msc-teal-light/60">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-msc-teal/10 blur-3xl" aria-hidden="true" />
        <div className="container relative py-16">
          <Link
            href={`/resources?category=${resource.category}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-msc-teal hover:underline mb-6"
          >
            ← {category?.label ?? 'All resources'}
          </Link>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-msc-teal bg-white/80 rounded-full px-3 py-1">
                {resource.format}
              </span>
              {resource.languages.map((lang) => (
                <span key={lang} className="text-xs font-medium text-gray-600 bg-white/80 rounded-full px-3 py-1">
                  {lang}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-msc-charcoal mb-4">{resource.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{resource.description}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-msc-charcoal mb-5">About this resource</h2>
              <div className="space-y-4">
                {resource.overview.map((para) => (
                  <p key={para.slice(0, 40)} className="text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-8 leading-relaxed">
                MSC resources are educational materials, not medical, legal, or professional
                advice. Translations are volunteer-produced and reviewed for accuracy.
              </p>
            </div>

            <aside>
              <div className="bg-msc-cream rounded-2xl p-7 sticky top-24">
                {resource.file ? (
                  <>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-msc-teal mb-3">Download</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                      Free PDF — print it, share it, bring it to an appointment.
                    </p>
                    <a
                      href={resource.file}
                      download
                      className="btn-primary w-full text-sm inline-flex items-center justify-center gap-2"
                    >
                      <Icon name="download" className="w-4 h-4" />
                      Download PDF
                    </a>
                  </>
                ) : (
                  <>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-msc-amber mb-3">Coming soon</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                      This resource is in review with our volunteer team. Want a copy when it's
                      ready — or want to help finish it?
                    </p>
                    <div className="space-y-2.5">
                      <Link href="/contact" className="btn-primary w-full text-sm">Notify Me</Link>
                      <Link href="/volunteer#contribute" className="btn-secondary w-full text-sm">
                        Help Create It
                      </Link>
                    </div>
                  </>
                )}
                <p className="text-xs text-gray-400 mt-5 text-center">
                  Always free · No signup required
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-msc-cream">
          <div className="container">
            <h2 className="text-2xl font-bold text-msc-charcoal mb-8 text-center">
              More in {category?.label}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/resources/${r.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-msc-teal mb-2">{r.format}</p>
                  <h3 className="text-base font-bold text-msc-charcoal mb-2 group-hover:text-msc-teal transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
