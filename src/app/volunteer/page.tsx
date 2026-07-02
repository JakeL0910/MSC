import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import CtaBand from '@/components/shared/CtaBand'
import Icon from '@/components/shared/Icons'
import VolunteerForm from '@/components/forms/VolunteerForm'
import ContributeForm from '@/components/forms/ContributeForm'
import { volunteerRoles, timeCommitments, volunteerFaq } from '@/data/volunteer'

export const metadata: Metadata = {
  title: 'Volunteer',
  description:
    'Volunteer with MSC: tutor English learners, create healthcare vocabulary resources, translate materials, design, research, and lead workshops. Service hours verified.',
}

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Do work that opens doors for someone else"
        description="MSC volunteers tutor, translate, design, research, and organize. No experience required for most roles — we train you. Service hours verified for school requirements."
        actions={[
          { label: 'Apply Now', href: '#apply' },
          { label: 'See the Roles', href: '#roles', variant: 'secondary' },
        ]}
      />

      {/* Roles */}
      <section id="roles" className="py-20 bg-white scroll-mt-20">
        <div className="container">
          <SectionHeading
            eyebrow="Volunteer roles"
            title="Eight ways to contribute"
            description="Pick the role that fits your skills and schedule — or try a few. Every role comes with onboarding and a real responsibility."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {volunteerRoles.map((role) => (
              <div key={role.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mb-4">
                  <Icon name={role.icon} className="w-6 h-6" />
                </span>
                <h3 className="text-base font-bold text-msc-charcoal mb-2">{role.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{role.description}</p>
                <div className="border-t border-gray-100 pt-3.5 space-y-2.5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Skills</p>
                    <ul className="space-y-1">
                      {role.skills.map((s) => (
                        <li key={s} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="text-msc-teal mt-px flex-shrink-0">
                            <Icon name="check" className="w-3.5 h-3.5" />
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs font-semibold text-msc-teal">{role.commitment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Time commitments */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Time commitment"
            title="Volunteer on your schedule"
            description="We'd rather have two reliable hours a week than ten unsustainable ones."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {timeCommitments.map((t) => (
              <div key={t.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-2">{t.label}</p>
                <p className="text-2xl font-bold text-msc-charcoal mb-3">{t.hours}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="py-20 bg-white scroll-mt-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Apply"
                title="Volunteer application"
                description="Five minutes, no essay. We review applications weekly and reply with next steps."
              />
              <div className="bg-msc-teal-light/60 rounded-2xl p-7">
                <h3 className="text-sm font-bold uppercase tracking-wider text-msc-teal mb-4">What happens next</h3>
                <ol className="space-y-3.5">
                  {[
                    'We reply within about a week with a short intro conversation.',
                    'You get onboarding materials and training for your role.',
                    'You receive your first match, project, or assignment.',
                    'We verify your hours for school and service requirements.',
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                      <span className="w-6 h-6 rounded-lg bg-white text-msc-teal text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-7">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Resource Builder */}
      <section id="contribute" className="py-20 bg-msc-cream scroll-mt-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Volunteer Resource Builder"
                title="Have an idea? Build it with us."
                description="Volunteers don't just execute our ideas — they propose their own. Guides, flashcard sets, translations, posters: if it helps someone communicate, we want to see it."
              />
              <ul className="space-y-3.5">
                {[
                  'Propose a draft, an outline, or just an idea — any stage is welcome',
                  'Our resource team reviews it and pairs you with a reviewer',
                  'Accepted resources are published in the Resource Hub, credited to you',
                  'Great for portfolios, college applications, and real-world impact',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                    <span className="w-6 h-6 rounded-lg bg-white text-msc-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="check" className="w-4 h-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-7">
              <ContributeForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="max-w-3xl mx-auto space-y-4">
            {volunteerFaq.map((item) => (
              <details
                key={item.question}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5"
              >
                <summary className="flex items-center justify-between cursor-pointer text-base font-semibold text-msc-charcoal list-none">
                  {item.question}
                  <span className="text-msc-teal transition-transform duration-200 group-open:rotate-45 flex-shrink-0 ml-4 text-xl leading-none" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="text-sm text-gray-600 leading-relaxed mt-3.5">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Someone is waiting to be understood"
        description="Your hour a week becomes a family's confidence at the doctor's office, a student's grade in English class, a community that reads the flyer."
        primary={{ label: 'Apply to Volunteer', href: '#apply' }}
        secondary={{ label: 'Questions? Contact Us', href: '/contact' }}
      />
    </>
  )
}
