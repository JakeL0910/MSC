import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import Icon from '@/components/shared/Icons'
import ContactForm from '@/components/forms/ContactForm'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact MSC — questions, partnership inquiries, volunteer questions, press, and newsletter signup.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Questions, ideas, partnership inquiries, or just a hello — every message gets read by a real person on the team."
      />

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-msc-cream rounded-2xl p-7">
                <span className="w-11 h-11 rounded-xl bg-white text-msc-teal flex items-center justify-center mb-4 shadow-sm">
                  <Icon name="mail" className="w-6 h-6" />
                </span>
                <h2 className="text-base font-bold text-msc-charcoal mb-1.5">Email us</h2>
                <p className="text-sm text-gray-600 mb-3">We usually reply within a few days.</p>
                <a href={`mailto:${site.email}`} className="text-sm font-semibold text-msc-teal hover:underline">
                  {site.email}
                </a>
              </div>

              <div className="bg-msc-cream rounded-2xl p-7">
                <span className="w-11 h-11 rounded-xl bg-white text-msc-teal flex items-center justify-center mb-4 shadow-sm">
                  <Icon name="users" className="w-6 h-6" />
                </span>
                <h2 className="text-base font-bold text-msc-charcoal mb-1.5">Partner inquiries</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Schools, clinics, libraries, and nonprofits — there's a dedicated form with
                  partnership details.
                </p>
                <Link href="/partners#inquire" className="text-sm font-semibold text-msc-teal hover:underline">
                  Go to partnership form →
                </Link>
              </div>

              <div className="bg-msc-cream rounded-2xl p-7">
                <span className="w-11 h-11 rounded-xl bg-white text-msc-teal flex items-center justify-center mb-4 shadow-sm">
                  <Icon name="megaphone" className="w-6 h-6" />
                </span>
                <h2 className="text-base font-bold text-msc-charcoal mb-1.5">Follow along</h2>
                <p className="text-sm text-gray-600 mb-3">
                  New phrases, resources, and volunteer spotlights every week.
                  {/* TODO: update social handles in src/data/site.ts */}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {[
                    { href: site.social.instagram, label: 'Instagram' },
                    { href: site.social.linkedin, label: 'LinkedIn' },
                    { href: site.social.youtube, label: 'YouTube' },
                    { href: site.social.twitter, label: 'X' },
                  ]
                    .filter((item): item is typeof item & { href: string } => Boolean(item.href))
                    .map(({ href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-msc-teal hover:underline"
                      >
                        {label}
                      </a>
                    ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-md p-7 md:p-9">
              <h2 className="text-xl font-bold text-msc-charcoal mb-1.5">Send a message</h2>
              <p className="text-sm text-gray-500 mb-6">
                Use the newsletter checkbox to also get our monthly update.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
