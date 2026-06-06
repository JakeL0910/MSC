import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Make Spanish Casual',
  description: 'Get in touch with Make Spanish Casual — for partnerships, press inquiries, volunteering, or general questions.',
}

const contactReasons = [
  { label: 'Partnership inquiry', description: 'Healthcare system, university, school, or community org', href: '/partner' },
  { label: 'Press or media', description: "Interviews, stories, or coverage of MSC's work" },
  { label: 'Volunteer or event support', description: 'Help out at events or advocacy work in DFW or online' },
  { label: 'General question', description: 'About MSC, our programs, or our courses' },
]

export default function ContactPage() {
  return (
    <>
      <section className="bg-msc-teal pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">Get in touch</h1>
          <p className="text-lg text-white/85 max-w-xl leading-relaxed">
            Questions about our programs, partnership opportunities, or want to volunteer? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-msc-teal">Direct contact</p>
              <div className="bg-white rounded-2xl p-7 border border-gray-100 mb-6">
                <p className="text-base font-bold mb-1 text-msc-charcoal">Jake Li — CEO & Founder</p>
                <a href="mailto:jake@makespanishcasual.org" className="text-sm font-medium hover:underline text-msc-teal">
                  jake@makespanishcasual.org
                </a>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                  Best for: partnership inquiries, press, research collaboration, and anything substantive.
                </p>
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-msc-teal">What are you reaching out about?</p>
              <div className="space-y-3">
                {contactReasons.map((reason) => (
                  <div key={reason.label} className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-msc-charcoal">{reason.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{reason.description}</p>
                      </div>
                      {reason.href && (
                        <Link href={reason.href} className="text-xs font-semibold flex-shrink-0 hover:underline text-msc-teal">
                          See page →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — interactive form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold mb-6 text-msc-charcoal">Send a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
