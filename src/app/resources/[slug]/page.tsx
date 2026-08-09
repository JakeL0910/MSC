import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Icon from '@/components/shared/Icons'
import CoverArt from '@/components/shared/CoverArt'
import PrintButton from '@/components/shared/PrintButton'
import { resources, getResource, getCategory, type Resource } from '@/data/resources'

const formatIcons: Record<Resource['format'], string> = {
  Guide: 'book-open',
  Toolkit: 'clipboard-check',
  'Phrase Cards': 'chat',
  Checklist: 'check',
  Worksheet: 'document-text',
  Summary: 'beaker',
}

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
      <CoverArt icon={formatIcons[resource.format]} seed={resource.slug} className="h-44 md:h-56" />

      <section className="bg-white pt-10 pb-8 border-b border-gray-100">
        <div className="container">
          <Link
            href={`/resources#${resource.category}`}
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
            <div id="resource-print" className="lg:col-span-2">
              {/* Print-only header so the saved PDF has a clear title */}
              <div className="print-only mb-6">
                <h1 className="text-2xl font-bold text-msc-charcoal">{resource.title}</h1>
                <p className="text-sm text-gray-500">The MLC Project · makelanguagecasual.org</p>
              </div>

              <div className="space-y-4">
                {resource.overview.map((para) => (
                  <p key={para.slice(0, 40)} className="text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {resource.content && (
                <div className="mt-8 space-y-9">
                  {resource.content.map((sec, i) => (
                    <section key={sec.heading ?? i} className="break-inside-avoid">
                      {sec.heading && (
                        <h2 className="text-lg font-bold text-msc-charcoal mb-3">{sec.heading}</h2>
                      )}
                      {sec.paragraphs?.map((p) => (
                        <p key={p.slice(0, 32)} className="text-gray-600 leading-relaxed mb-3">{p}</p>
                      ))}
                      {sec.items && (
                        <ul className="space-y-2.5">
                          {sec.items.map((it) => (
                            <li key={it.slice(0, 32)} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-msc-teal-light text-msc-teal">
                                <Icon name="check" className="h-3.5 w-3.5" />
                              </span>
                              {it}
                            </li>
                          ))}
                        </ul>
                      )}
                      {sec.pairs && (
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {sec.pairs.map((pr) => (
                            <div key={pr.es} className="rounded-xl border border-gray-100 bg-msc-cream/50 p-3.5">
                              <p className="font-semibold text-msc-charcoal">{pr.es}</p>
                              <p className="text-sm font-medium text-msc-teal">{pr.en}</p>
                              {pr.note && <p className="mt-0.5 text-xs text-gray-400">{pr.note}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-400 mt-10 leading-relaxed">
                MLC resources are educational materials, not medical, legal, or professional advice.
                Translations are volunteer-produced and reviewed for accuracy.
              </p>
            </div>

            <aside className="no-print">
              <div className="bg-msc-cream rounded-2xl p-7 sticky top-24">
                {resource.content ? (
                  <>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-msc-teal mb-3">Save it</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                      Read it here, or save a copy to print or share.
                    </p>
                    <PrintButton />
                  </>
                ) : resource.file ? (
                  <>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-msc-teal mb-3">Download</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                      Free PDF. Print it, share it, keep it handy.
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
                      ready, or want to help finish it?
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
