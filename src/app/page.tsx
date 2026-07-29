import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Voices from '@/components/features/Voices'
import Icon from '@/components/shared/Icons'
import SectionHeading from '@/components/shared/SectionHeading'
import StatGrid from '@/components/shared/StatGrid'
import CtaBand from '@/components/shared/CtaBand'
import CoverArt, { type CoverPalette } from '@/components/shared/CoverArt'
import Reveal from '@/components/ui/Reveal'
import { site, highlights } from '@/data/site'
import { programs } from '@/data/programs'

const colorToPalette: Record<'teal' | 'amber' | 'coral', CoverPalette> = {
  teal: 'teal',
  amber: 'amber',
  coral: 'coral',
}

// Real event photos (from /public/blog) for the community strip.
const communityPhotos = [
  { src: '/blog/dia-de-los-muertos-community-celebration/img-1.jpg', alt: 'Community members at MSC’s Día de los Muertos celebration in Allen, Texas' },
  { src: '/blog/dia-de-los-muertos-community-celebration/img-3.jpg', alt: 'A games and coloring station at the Día de los Muertos celebration' },
  { src: '/blog/dia-de-los-muertos-community-celebration/img-4.jpg', alt: 'Families enjoying the Día de los Muertos community event' },
  { src: '/blog/jake-at-actfl-2025-new-orleans/img-1.jpg', alt: 'MSC at the ACTFL 2025 convention in New Orleans' },
  { src: '/blog/dia-de-los-muertos-community-celebration/img-2.jpg', alt: 'Families taking part in Día de los Muertos activities' },
  { src: '/blog/dia-de-los-muertos-community-celebration/img-6.jpg', alt: 'MSC volunteers and the Williams High School Spanish Club at the event' },
  { src: '/blog/jake-presents-at-actfl-2024-philadelphia/img-1.jpg', alt: 'Jake presenting to educators at ACTFL 2024 in Philadelphia' },
  { src: '/blog/jake-at-actfl-2025-new-orleans/img-3.jpg', alt: 'MSC volunteering with NNELL at ACTFL 2025' },
]

export const metadata: Metadata = {
  title: `${site.name} (${site.acronym}) | Making language more accessible`,
  description: site.subtagline,
}

// Everyday bilingual phrases for the hero card — MSC's casual, conversational
// Spanish roots (decorative; edit freely).
const heroPhrases = [
  { en: 'How’s it going?', es: '¿Qué tal?' },
  { en: 'Nice to meet you.', es: 'Mucho gusto.' },
  { en: 'Let’s grab a coffee.', es: 'Vamos por un café.' },
]

// The language-access need, framed without deficit or clinical language.
const principles = [
  {
    icon: 'chat',
    title: 'Language takes many forms',
    text: 'Speaking, writing, signing, gestures, and more are all valid. Access means meeting people where they are.',
  },
  {
    icon: 'globe',
    title: 'Multilingualism is a strength',
    text: 'Moving between languages is an asset, not a deficit. We build on it.',
  },
  {
    icon: 'hand-raised',
    title: 'Meet people where they are',
    text: 'Language education should be flexible and welcoming, never one-size-fits-all.',
  },
]

export default function HomePage() {
  const focusAreas = programs.filter((p) => p.featured)

  return (
    <>
      {/* ================= 1–3. HERO: statement, who we serve, two CTAs ========= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-msc-teal-light/70 via-white to-msc-amber-light/40">
        <div className="animate-blob pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-msc-teal/10 blur-3xl" aria-hidden="true" />
        <div className="animate-blob-slow pointer-events-none absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-msc-amber/10 blur-3xl" aria-hidden="true" />

        <div className="container relative py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="animate-enter inline-block text-xs font-bold uppercase tracking-widest text-msc-teal bg-white/80 rounded-full px-3.5 py-1.5 mb-6">
                Youth-led · {site.legalLine}
              </p>
              <h1 className="animate-enter enter-delay-1 text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-msc-charcoal mb-6">
                Making language{' '}
                <span className="text-msc-teal">more accessible</span>.
              </h1>
              <p className="animate-enter enter-delay-2 serif-lead text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                {site.subtagline}
              </p>
              <div className="animate-enter enter-delay-3 flex flex-wrap gap-3">
                <Link href="/resources" className="btn-primary">Explore Resources</Link>
                <Link href="/volunteer" className="btn-secondary">Get Involved</Link>
              </div>
              <p className="animate-enter enter-delay-4 text-sm text-gray-500 mt-6">
                Are you a school or community organization?{' '}
                <Link href="/partners" className="text-msc-teal font-semibold hover:underline">
                  Partner with us
                </Link>
              </p>
            </div>

            {/* Hero visual: casual conversational-Spanish card (MSC's roots) */}
            <div className="animate-enter enter-delay-2 hidden lg:block" aria-hidden="true">
              <div className="animate-float relative max-w-md ml-auto">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-msc-teal/10 rotate-3" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-7">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-msc-teal">
                      Conversational Spanish
                    </p>
                    <span className="w-8 h-8 rounded-lg bg-msc-teal-light text-msc-teal flex items-center justify-center">
                      <Icon name="chat" className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="space-y-4">
                    {heroPhrases.map((p) => (
                      <div key={p.en} className="rounded-2xl border border-gray-100 bg-msc-cream/60 p-4">
                        <p className="text-sm font-semibold text-msc-charcoal">{p.en}</p>
                        <p className="text-sm text-msc-teal font-medium mt-1">{p.es}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-5 text-center">
                    Free · Practical · Made for everyday life
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-4">Our mission</p>
            <p className="serif-lead text-2xl md:text-3xl font-semibold text-msc-charcoal leading-snug max-w-4xl mx-auto">
              {site.mission}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= 4. THE LANGUAGE-ACCESS NEED ================= */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Why this work matters"
            title="Language looks different for everyone"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                  <span className="w-12 h-12 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mb-5">
                    <Icon name={item.icon} className="w-6 h-6" />
                  </span>
                  <h3 className="text-lg font-bold text-msc-charcoal mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. FOCUS-AREA CARDS ================= */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Our areas of work"
          />
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {focusAreas.map((program, i) => (
              <Reveal key={program.slug} delay={i * 0.08}>
                <Link
                  href={`/programs/${program.slug}`}
                  className="group flex h-full flex-col overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-msc-teal/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative">
                    <CoverArt icon={program.icon} palette={colorToPalette[program.color]} seed={program.slug} className="h-32" />
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={program.status} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-lg font-bold text-msc-charcoal mb-2 group-hover:text-msc-teal transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{program.summary}</p>
                    <span className="text-sm font-semibold text-msc-teal">
                      Learn more <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center">
            <Link href="/programs" className="btn-secondary">See all areas of work</Link>
          </Reveal>
        </div>
      </section>

      {/* ================= 6. CURRENT PROGRAMS / EVENTS / RESOURCES ============= */}
      <section className="py-20 bg-msc-teal">
        <div className="container">
          <Reveal className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-msc-amber mb-3">Happening now</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Learn with us</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <Link href="/classes" className="group block h-full bg-white/10 rounded-2xl p-7 border border-white/10 hover:bg-white/15 transition-colors duration-300">
                <span className="w-12 h-12 rounded-xl bg-msc-amber text-msc-charcoal flex items-center justify-center mb-5">
                  <Icon name="presentation" className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-white mb-2">Events &amp; Webinars</h3>
                <p className="text-sm text-msc-teal-light/90 leading-relaxed mb-4">
                  Virtual and in-person events across DFW and online. See upcoming sessions and recordings.
                </p>
                <span className="text-sm font-semibold text-white">
                  See the schedule <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <Link href="/resources" className="group block h-full bg-white/10 rounded-2xl p-7 border border-white/10 hover:bg-white/15 transition-colors duration-300">
                <span className="w-12 h-12 rounded-xl bg-msc-amber text-msc-charcoal flex items-center justify-center mb-5">
                  <Icon name="book-open" className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-white mb-2">Free Resources</h3>
                <p className="text-sm text-msc-teal-light/90 leading-relaxed mb-4">
                  Practical materials for students, families, and educators, labeled available or in development.
                </p>
                <span className="text-sm font-semibold text-white">
                  Browse resources <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 7. OUR EVOLUTION ================= */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-3">Our evolution</p>
              <h2 className="text-3xl md:text-4xl font-bold text-msc-charcoal mb-5">
                From conversational Spanish to language access
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We began by making conversational Spanish approachable. That grew into a broader
                commitment: accessible language education for people with
                different linguistic, cultural, and neurodevelopmental experiences.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The same idea, now reaching a wider community.
              </p>
              <Link href="/about#evolution" className="btn-secondary">Read our story</Link>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'sparkles', label: 'Approachable, practical learning' },
                { icon: 'users', label: 'Neurodivergent & multilingual community' },
                { icon: 'globe', label: 'Bilingual, real-world language' },
                { icon: 'hand-raised', label: 'Volunteer-driven, mentor-guided' },
              ].map((item, i) => (
                <Reveal key={item.label} delay={0.1 + i * 0.08}>
                  <div className="h-full bg-msc-cream rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-3">
                      <Icon name={item.icon} className="w-6 h-6" />
                    </span>
                    <p className="text-sm font-semibold text-msc-charcoal leading-snug">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. VERIFIED HIGHLIGHTS ================= */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Our work so far"
            title="What we’ve built together"
          />
          <StatGrid items={highlights} />
          <p className="text-center mt-8">
            <Link href="/impact" className="text-sm font-semibold text-msc-teal hover:underline">
              See our full impact →
            </Link>
          </p>
        </div>
      </section>

      {/* ================= IN THE COMMUNITY (real photos) ================= */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading eyebrow="In the community" title="Out in the world" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {communityPhotos.map((p, i) => (
              <div
                key={p.src}
                className={`relative aspect-square overflow-hidden rounded-xl bg-msc-cream ${i >= 6 ? 'hidden md:block' : ''}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VOICES ================= */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading eyebrow="Voices" title="From our community" />
          <Voices />
        </div>
      </section>

      {/* ================= 9. FINAL CTA ================= */}
      <CtaBand
        title="Help make language more accessible"
        description="Every contribution helps another person be understood."
        primary={{ label: 'Volunteer With Us', href: '/volunteer' }}
        secondary={{ label: 'Partner With Us', href: '/partners' }}
      />
    </>
  )
}

// Small active / in-development badge used on focus-area cards.
function StatusBadge({ status }: { status: 'Active' | 'In Development' }) {
  const active = status === 'Active'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
        active ? 'bg-msc-teal-light text-msc-teal' : 'bg-msc-amber-light text-msc-amber'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-msc-teal' : 'bg-msc-amber'}`} aria-hidden="true" />
      {status}
    </span>
  )
}
