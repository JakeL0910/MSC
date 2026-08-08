import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Voices from '@/components/features/Voices'
import Icon from '@/components/shared/Icons'
import SectionHeading from '@/components/shared/SectionHeading'
import StatGrid from '@/components/shared/StatGrid'
import CtaBand from '@/components/shared/CtaBand'
import CoverArt, { type CoverPalette } from '@/components/shared/CoverArt'
import CinematicHero from '@/components/shared/CinematicHero'
import Reveal from '@/components/ui/Reveal'
import RotatingWord from '@/components/ui/RotatingWord'
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

// The language-access need, framed without deficit or clinical language.
const principles = [
  { icon: 'chat', title: 'Language takes many forms' },
  { icon: 'globe', title: 'Multilingualism is a strength' },
  { icon: 'hand-raised', title: 'Meet people where they are' },
]

export default function HomePage() {
  const focusAreas = programs.filter((p) => p.featured)

  return (
    <>
      {/* ================= 1–3. HERO: cinematic statement + two CTAs ========= */}
      <CinematicHero
        eyebrow="A Youth-Led Movement"
        meta="Dallas–Fort Worth"
        title={
          <>
            Making language more{' '}
            <RotatingWord words={['accessible.', 'welcoming.', 'human.', 'joyful.']} className="gradient-text-bright" />
          </>
        }
        description={
          <>
            Everyone deserves to be{' '}
            <RotatingWord
              words={['understood', 'comprendido', 'compris', 'được hiểu', 'verstanden', '理解', 'مفهوم']}
              className="gradient-text-bright font-semibold"
              interval={2600}
            />
          </>
        }
        actions={[
          { label: 'Explore Resources', href: '/resources', variant: 'light' },
          { label: 'Get Involved', href: '/volunteer', variant: 'outline-light' },
        ]}
        ghost="MSC"
        edgeLabel="Language access"
        footerLeft="A youth-led movement"
        footerRight="Everyone deserves to be understood"
      />

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
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex items-center gap-4">
                  <span className="w-12 h-12 shrink-0 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center">
                    <Icon name={item.icon} className="w-6 h-6" />
                  </span>
                  <h3 className="text-lg font-bold text-msc-charcoal">{item.title}</h3>
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
                  <CoverArt icon={program.icon} palette={colorToPalette[program.color]} seed={program.slug} className="h-32" />
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-lg font-bold text-msc-charcoal mb-4 flex-1 group-hover:text-msc-teal transition-colors">
                      {program.name}
                    </h3>
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
                  Live sessions, online and around DFW.
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
                  Practical materials you can use today.
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
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We started making Spanish approachable. It grew into something bigger:
                language that works for everyone.
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
      <section className="py-20 bg-white overflow-hidden">
        <div className="container">
          <SectionHeading eyebrow="In the community" title="Out in the world" />
        </div>
        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
            {[...communityPhotos, ...communityPhotos].map((p, i) => (
              <div
                key={i}
                className="group relative h-52 w-72 md:h-60 md:w-80 shrink-0 overflow-hidden rounded-2xl bg-msc-cream"
              >
                <Image
                  src={p.src}
                  alt={i < communityPhotos.length ? p.alt : ''}
                  aria-hidden={i >= communityPhotos.length}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="320px"
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
