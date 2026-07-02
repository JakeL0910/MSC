import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MSC handles information on this website.',
}

// TODO: have this reviewed before launch — it's a reasonable starting template,
// not legal advice.
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: July 2026" />
      <section className="py-14 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">What we collect</h2>
              <p>
                This website does not require accounts and does not collect personal information
                unless you choose to send it to us — for example, by submitting a contact,
                volunteer, or partnership form (which opens an email from your own email client)
                or emailing us directly.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">How we use it</h2>
              <p>
                Information you send us is used only to respond to you, coordinate volunteering or
                partnerships, and send the newsletter if you asked for it. We do not sell or rent
                personal information to anyone.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">Young volunteers</h2>
              <p>
                Volunteers under 18 require a parent or guardian permission form before
                participating in MSC programs. We collect only the information needed to
                coordinate volunteering.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">Third-party links</h2>
              <p>
                Our site links to external services (such as social media platforms). Their
                privacy practices are governed by their own policies.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-msc-charcoal mb-3">Contact</h2>
              <p>
                Questions about this policy? Email{' '}
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
