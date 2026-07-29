import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import CtaBand from '@/components/shared/CtaBand'
import Icon from '@/components/shared/Icons'
import PartnerForm from '@/components/forms/PartnerForm'
import { partnerTypes, exampleCollaborations } from '@/data/partners'

export const metadata: Metadata = {
  title: 'Partner With Us',
  description:
    'Make Spanish Casual partners with schools, libraries, and community organizations to bring free, accessible language resources, events, and volunteer support to their communities.',
}

export default function PartnersPage() {
  return (
    <>
      <PageHero
        illustration="community"
        eyebrow="Partners"
        title="Bring accessible language to the people you serve"
        description="MSC provides free resources, events, and volunteer support. You provide the community that benefits."
        actions={[
          { label: 'Start a Partnership', href: '#inquire' },
          { label: 'See What We Provide', href: '#types', variant: 'secondary' },
        ]}
      />

      {/* Partnership types */}
      <section id="types" className="py-20 bg-white scroll-mt-20">
        <div className="container">
          <SectionHeading
            eyebrow="Partnership types"
            title="What MSC brings to each partner"
            description="Every partnership is free."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map((type) => (
              <div key={type.audience} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <span className="w-12 h-12 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mb-5">
                  <Icon name={type.icon} className="w-6 h-6" />
                </span>
                <h3 className="text-xl font-bold text-msc-charcoal mb-1">{type.audience}</h3>
                <p className="text-sm font-medium text-msc-teal mb-4">{type.headline}</p>
                <ul className="space-y-2.5">
                  {type.weProvide.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <span className="text-msc-teal mt-0.5 flex-shrink-0">
                        <Icon name="check" className="w-4 h-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to work together (illustrative, not claimed past partnerships) */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Ways to work together"
            title="What a collaboration could look like"
            description="We’ll shape a partnership around what you need."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {exampleCollaborations.map((collab) => (
              <div key={collab.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <h3 className="text-lg font-bold text-msc-charcoal mb-1">{collab.title}</h3>
                <p className="text-sm font-medium text-msc-teal mb-3">{collab.partner}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{collab.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquire" className="py-20 bg-msc-cream scroll-mt-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Start the conversation"
                title="Partnership inquiry"
                description="Tell us about your community. We'll suggest a small first step."
              />
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <h3 className="text-sm font-bold uppercase tracking-wider text-msc-teal mb-4">Good first projects</h3>
                <ul className="space-y-3">
                  {[
                    'A resource display of free bilingual guides in your lobby',
                    'One translated flyer or plain-language rewrite',
                    'A single workshop or conversation-practice event',
                    'A Language Access Scorecard review of your materials',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <span className="text-msc-amber mt-0.5 flex-shrink-0">
                        <Icon name="sparkles" className="w-4 h-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-7">
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Sponsor the work behind the resources"
        description="Businesses and foundations can sponsor printing, program supplies, and volunteer training. Every dollar stays in free community programming."
        primary={{ label: 'Become a Sponsor', href: '/donate' }}
        secondary={{ label: 'Email Us Directly', href: '/contact' }}
      />
    </>
  )
}
