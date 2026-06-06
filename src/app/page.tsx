import Image from 'next/image'
import Link from 'next/link'

/* ── Icon helpers ──────────────────────────────────────── */

function SpeechIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )
}

function UnlockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

/* ── Component: PillarCard ─────────────────────────────── */

function PillarCard({
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode
  number: string
  title: string
  description: string
}) {
  return (
    <div className="bg-msc-cream rounded-2xl p-7 border border-gray-100 hover:border-msc-teal/30 hover:shadow-sm transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-msc-teal text-white flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <span className="text-xs font-bold text-gray-400 tracking-widest">{number}</span>
      </div>
      <h3 className="text-lg font-bold text-msc-charcoal mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

/* ── Component: ProgramCard ────────────────────────────── */

function ProgramCard({
  title,
  description,
  audience,
  ctaLabel,
  ctaHref,
  accentClass,
  borderClass,
}: {
  title: string
  description: string
  audience: string
  ctaLabel: string
  ctaHref: string
  accentClass: string
  borderClass: string
}) {
  return (
    <div className={`bg-white rounded-2xl p-8 border-t-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5 ${borderClass}`}>
      <h3 className="text-xl font-bold text-msc-charcoal">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed flex-1">{description}</p>
      <p className={`text-sm font-medium ${accentClass}`}>For: {audience}</p>
      <Link
        href={ctaHref}
        className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${accentClass}`}
      >
        {ctaLabel}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}

/* ── Component: Testimonial ────────────────────────────── */

function Testimonial({
  quote,
  name,
  role,
  initials,
  bgClass,
}: {
  quote: string
  name: string
  role: string
  initials: string
  bgClass: string
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <svg className="w-8 h-8 mb-4 text-msc-amber/30" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>
      <p className="text-base text-gray-700 leading-relaxed mb-6 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${bgClass}`}>
          {initials}
        </div>
        <div>
          <p className="font-semibold text-sm text-msc-charcoal">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ── Hero: split layout ── */}
      <section className="relative overflow-hidden bg-msc-teal min-h-[580px] flex items-center">
        {/* Right-side photo, desktop only */}
        <div className="absolute inset-y-0 right-0 w-[45%] hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
            sizes="45vw"
          />
          {/* Gradient: teal on left edge → transparent → faint on right */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #1A6B72 0%, rgba(26,107,114,0.65) 30%, rgba(26,107,114,0.15) 75%, rgba(26,107,114,0.05) 100%)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full py-24 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest mb-5 text-white/70">
                Make Spanish Casual — 501(c)3 Nonprofit
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight text-balance">
                Language is access.
              </h1>
              <p className="text-lg text-white/85 leading-relaxed mb-10">
                Make Spanish Casual is a nonprofit advancing health equity through free, culturally authentic Spanish education — for learners, providers, and communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start Learning Free
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base border-2 border-white/50 text-white hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Our Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-msc-charcoal mb-3 text-balance">
              Why language access matters
            </h2>
            <p className="text-base text-gray-500 max-w-lg mx-auto">The gap between language need and provider capacity is a patient safety crisis.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              {
                number: '~25M',
                label: 'people in the U.S. have limited English proficiency',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                number: '2–3×',
                label: 'higher rate of adverse clinical events for patients with language barriers',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ),
              },
              {
                number: '<13%',
                label: 'of U.S. physicians report proficiency in a second language',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
            ].map(({ number, label, icon }) => (
              <div key={number} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-4">
                  {icon}
                </div>
                <div className="text-4xl font-bold text-msc-teal mb-2">{number}</div>
                <div className="text-sm text-gray-600 leading-snug">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-base font-semibold text-msc-coral">
            Language barriers aren't just inconvenient. In healthcare, they cost lives.
          </p>
        </div>
      </section>

      {/* ── Four Pillars ── */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-msc-teal">Our approach</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-msc-charcoal mb-4 text-balance">
              Four principles. One purpose.
            </h2>
            <p className="text-base text-gray-500 max-w-lg mx-auto">
              These anchors guide every program, resource, and conversation at MSC.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PillarCard
              icon={<SpeechIcon />}
              number="01"
              title="Authentic Language"
              description="Slang, colloquialisms, and cultural context — the layer of Spanish that most programs skip, but that determines whether communication actually works."
            />
            <PillarCard
              icon={<HeartIcon />}
              number="02"
              title="Health Equity"
              description="We train the next generation of providers, community health workers, and advocates to communicate authentically across language and culture."
            />
            <PillarCard
              icon={<UnlockIcon />}
              number="03"
              title="Free Access"
              description="No paywalls. No gatekeeping. Every resource, course, and program MSC offers is free — because language access is a right, not a privilege."
            />
            <PillarCard
              icon={<PeopleIcon />}
              number="04"
              title="Community-Driven"
              description="Language is learned and lived in community. MSC creates spaces where learners practice together, support each other, and grow into confident speakers."
            />
          </div>
        </div>
      </section>

      {/* ── Programs Preview ── */}
      <section className="py-20 px-4 bg-msc-teal-light">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-msc-teal">What we offer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-msc-charcoal mb-4 text-balance">
              Three programs. One mission.
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Everything MSC does is free — and everything connects back to equitable language access.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProgramCard
              title="Healthcare Spanish Initiative"
              description="Free training for pre-health students and healthcare workers in authentic, culturally grounded medical Spanish — the layer that vocabulary alone can't teach."
              audience="Pre-health students, nursing students, community health workers, providers"
              ctaLabel="Learn More"
              ctaHref="/programs/healthcare-spanish"
              accentClass="text-msc-teal"
              borderClass="border-msc-teal"
            />
            <ProgramCard
              title="Community Learning Platform"
              description="Free courses, slang guides, and community spaces for anyone who wants to speak Spanish the way it's actually spoken — with slang, cultural context, and real-world confidence."
              audience="General learners, heritage speakers, students"
              ctaLabel="Start Learning"
              ctaHref="/programs/community"
              accentClass="text-msc-amber"
              borderClass="border-msc-amber"
            />
            <ProgramCard
              title="Language Access Advocacy"
              description="Policy resources, research, and community education on language rights — because systemic change requires more than individual learning."
              audience="Advocates, community organizations, policymakers"
              ctaLabel="Get Involved"
              ctaHref="/programs/advocacy"
              accentClass="text-msc-coral"
              borderClass="border-msc-coral"
            />
          </div>
        </div>
      </section>

      {/* ── About / Founder ── */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-msc-teal">Who we are</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-msc-charcoal mb-6 text-balance">
                Student-led.<br />Research-backed.<br />Mission-driven.
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                MSC was founded by Jake Li, a high school student from Plano, TX whose work sits at the intersection of language, health, and equity. Jake has conducted language acquisition research at the University of Wisconsin-Madison, interned at UT Southwestern Medical Center, and advocated for language legislation on Capitol Hill.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-base text-msc-teal hover:text-msc-teal-dark transition-colors"
              >
                Meet Our Team
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '500+', label: 'hours of language acquisition research', bg: 'bg-msc-teal-light', color: 'text-msc-teal' },
                { number: '3×', label: 'ACTFL convention presenter', bg: 'bg-msc-amber-light', color: 'text-msc-amber' },
                { number: '100%', label: 'free programs — always', bg: 'bg-msc-coral-light', color: 'text-msc-coral' },
                { number: 'DC', label: 'Capitol Hill language advocacy', bg: 'bg-msc-teal-light', color: 'text-msc-teal' },
              ].map(({ number, label, bg, color }) => (
                <div key={number} className={`rounded-2xl p-6 text-center ${bg}`}>
                  <div className={`text-3xl font-bold mb-1 ${color}`}>{number}</div>
                  <div className="text-sm text-gray-600 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-msc-teal">Community</p>
            <h2 className="text-3xl font-bold text-msc-charcoal text-balance">From the MSC community</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Testimonial
              quote="I used to be nervous speaking Spanish. Now I drop slang and everyone thinks I'm fluent."
              name="Devin Carroll"
              role="MSC Community Member"
              initials="DC"
              bgClass="bg-msc-teal"
            />
            <Testimonial
              quote="I joined to improve my Spanish. I stayed because it felt like I belonged."
              name="Braeden Quach"
              role="MSC Community Member"
              initials="BQ"
              bgClass="bg-msc-amber"
            />
          </div>
        </div>
      </section>

      {/* ── Donate CTA ── */}
      <section className="py-20 px-4 bg-msc-teal">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Help us keep it free.
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every resource, course, and program MSC offers is free. Your donation keeps it that way — and helps us expand the Healthcare Spanish Initiative to serve more students and providers.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
          >
            Make a Donation
          </Link>
        </div>
      </section>
    </>
  )
}
