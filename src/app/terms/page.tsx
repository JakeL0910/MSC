import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms for using the MSC website and resources.',
}

// TODO: have this reviewed before launch — it's a reasonable starting template,
// not legal advice.
export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" description="Last updated: July 2026" />
      <section className="py-14 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">Use of resources</h2>
              <p>
                MSC resources are free for personal, educational, and community use. You may
                print, share, and distribute them non-commercially with attribution to{' '}
                {site.name}. Please don't sell them or present them as your own work.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">Educational purpose only</h2>
              <p>
                MSC is not a medical provider, law firm, or licensed interpretation service. Our
                materials — including healthcare vocabulary guides and phrase libraries — are
                educational communication support. They are not medical, legal, or professional
                advice, and they are not a substitute for professional interpretation, evaluation,
                or care. Always consult qualified professionals for decisions about health,
                education, or legal matters.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">Accuracy</h2>
              <p>
                Our volunteer teams review materials for accuracy, but we cannot guarantee that
                every translation or explanation is error-free or appropriate for every situation.
                If you find an error, please tell us — we correct published resources promptly.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">Volunteer contributions</h2>
              <p>
                By submitting a resource contribution, you confirm the work is yours to share and
                grant MSC permission to review, edit, and publish it with credit to you.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">Contact</h2>
              <p>
                Questions about these terms? Email{' '}
                <a href={`mailto:${site.email}`} className="text-msc-teal font-semibold hover:underline">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
