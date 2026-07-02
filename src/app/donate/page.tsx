import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import Icon from '@/components/shared/Icons'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support MSC: your donation funds free multilingual resources, volunteer tutoring, and student-led research on language access.',
}

// Giving levels — edit amounts and impact lines freely.
const givingLevels = [
  {
    amount: '$25',
    impact: 'Prints 50 bilingual phrase cards for a clinic waiting room',
  },
  {
    amount: '$100',
    impact: 'Supplies a semester of materials for one tutoring match',
  },
  {
    amount: '$500',
    impact: 'Funds a full community workshop, printed toolkits included',
  },
]

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Support MSC"
        title="Fund the next conversation"
        description="Everything MSC makes is free for families and communities — donations cover printing, program supplies, volunteer training, and the tools behind our resources."
      />

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
            {givingLevels.map((level) => (
              <div key={level.amount} className="bg-msc-cream rounded-2xl p-7 text-center">
                <p className="text-3xl font-bold text-msc-teal mb-3">{level.amount}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{level.impact}</p>
              </div>
            ))}
          </div>

          {/*
            TODO: connect a payment processor. Recommended options for a small
            nonprofit: Zeffy (no fees), Donorbox, or GiveButter — each provides
            an embeddable widget or a hosted donation page you can link the
            button below to. Until then, the button opens an email.
          */}
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-md p-8 text-center">
            <span className="w-12 h-12 rounded-xl bg-msc-amber-light text-msc-amber flex items-center justify-center mx-auto mb-4">
              <Icon name="heart" className="w-6 h-6" />
            </span>
            <h2 className="text-xl font-bold text-msc-charcoal mb-2">Online giving is almost ready</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Our donation platform is being set up. In the meantime, email us and we'll arrange
              your gift directly — or ask about sponsoring a specific program.
            </p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent('[Donation] I would like to support MSC')}`}
              className="btn-primary w-full"
            >
              Email Us About Giving
            </a>
            <p className="text-xs text-gray-400 mt-4">
              {site.legalLine}. Donations are tax-deductible to the extent allowed by law.
              {site.ein && ` ${site.ein}.`}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Other ways to give"
            title="Money isn't the only fuel"
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: 'hand-raised',
                title: 'Give time',
                text: 'An hour a week as a tutor, translator, or designer moves the mission as much as any check.',
                href: '/volunteer',
                cta: 'Volunteer',
              },
              {
                icon: 'users',
                title: 'Give access',
                text: 'Partner organizations give us something priceless: a community that needs what we make.',
                href: '/partners',
                cta: 'Partner with us',
              },
              {
                icon: 'megaphone',
                title: 'Give reach',
                text: 'Share our free tools with a family, teacher, or clinic that could use them today.',
                href: '/resources',
                cta: 'Share resources',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 text-center flex flex-col">
                <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} className="w-6 h-6" />
                </span>
                <h3 className="text-base font-bold text-msc-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{item.text}</p>
                <Link href={item.href} className="text-sm font-semibold text-msc-teal hover:underline">
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
