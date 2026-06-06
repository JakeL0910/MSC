import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About MSC | Make Spanish Casual',
  description: 'Learn about Make Spanish Casual, a student-led 501(c)3 nonprofit founded by Jake Li, whose research and advocacy work connects authentic language education to health equity.',
}

const team = [
  {
    name: 'Jake Li',
    role: 'CEO & Founder',
    email: 'jake@makespanishcasual.org',
    bio: `Jake Li is a high school student (Class of 2027, Plano East Senior High School / T.H. Williams High School) whose work sits at the intersection of language science, health equity, and AI. He is the founder of Make Spanish Casual and the AI patient safety startup Hindsight, which has been accepted into MIT Sandbox, Microsoft for Startups (Azure), and AWS programs.

Jake has conducted over 500 hours of language acquisition research at the University of Wisconsin-Madison's Language Acquisition and Bilingualism (LAB) Laboratory under Dr. Kaushanskaya, investigating how colloquialisms affect cognitive development in children with developmental disabilities. He has also conducted clinical research at UT Southwestern Medical Center, completed Rice University's Spanish for Successful Communication in Healthcare Settings course with an A+, and served as a student researcher at Syracuse University improving language transcript analysis software.

He serves on the Advocacy Committee for NNELL, has advocated for language legislation on Capitol Hill alongside U.S. Representatives Lloyd Doggett and Jasmine Crockett and Senator Ted Cruz, and has presented at the ACTFL Annual Convention in Chicago (2023), Philadelphia (2024), and New Orleans (2025). His intended major is Cognitive Science / Computational Linguistics at the intersection of language, AI, and medicine (Pre-Medicine track).`,
  },
  {
    name: 'Jada Li',
    role: 'Head of Development',
    email: '',
    bio: 'Jada graduated from the Massachusetts Institute of Technology with a minor in Spanish. She leads MSC\'s development and fundraising strategy, bringing institutional experience and a commitment to making language education accessible at scale.',
  },
  {
    name: 'Devin Carroll',
    role: 'Social Media Manager & Content Creator',
    email: '',
    bio: 'Devin is a student at Plano East Senior High School and one of MSC\'s earliest community members. He creates content that makes authentic Spanish learning visible and shareable — and is living proof that MSC\'s approach works. "I used to be nervous speaking Spanish. Now I drop slang and everyone thinks I\'m fluent."',
  },
  {
    name: 'Jordan Stafford',
    role: 'Social Media Manager & Content Creator',
    email: '',
    bio: 'Jordan is a student at Plano East Senior High School. She develops content across MSC\'s social platforms, with a focus on making Spanish feel approachable and culturally rich for new learners.',
  },
  {
    name: 'Braeden Quach',
    role: 'Event Volunteer',
    email: '',
    bio: 'Braeden is a student at Plano East Senior High School. He supports MSC\'s in-person events and community building in the DFW area. "I joined to improve my Spanish. I stayed because it felt like I belonged."',
  },
  {
    name: 'Rishan Patel',
    role: 'Event Volunteer',
    email: '',
    bio: 'Rishan is a student at Plano East Senior High School. He helps organize and run MSC\'s community events across the DFW metroplex.',
  },
  {
    name: 'Jacob Habtemariam',
    role: 'Event Volunteer',
    email: '',
    bio: 'Jacob is a student at Plano East Senior High School. He volunteers at MSC events, helping build the in-person community that complements the online learning platform.',
  },
]

const affiliations = [
  'National Network for Early Language Learning (NNELL)',
  'ACTFL — American Council on the Teaching of Foreign Languages',
  'University of Wisconsin-Madison',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#1A6B72' }} className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Why we exist
          </h1>
          <p className="text-lg text-white/85 max-w-2xl leading-relaxed">
            Language shapes every interaction — including whether a patient trusts their provider, whether a student feels seen in the classroom, whether a family can navigate the systems meant to serve them.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
              Our Mission
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              Make Spanish Casual exists because authentic, culturally grounded language education can change those interactions. We believe language access is a matter of equity. Our job is to make it free.
            </p>
            <blockquote className="mt-8 pl-5 border-l-4 text-lg italic text-gray-700" style={{ borderColor: '#E8A020' }}>
              Make Spanish Casual advances equitable language access by providing free, culturally authentic Spanish education — with a particular focus on healthcare settings where language barriers directly affect the quality and safety of care.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8F6F1' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
              Our Story
            </p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1C1E' }}>
              From a slang platform to a language access org
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              MSC began as a Spanish slang education platform in Plano, TX — a free resource for learners who felt left behind by textbook Spanish that didn't match the language they heard in their communities or wanted to speak in real life.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              Over time, the work evolved. As MSC's founder deepened his research in language acquisition, pursued pre-medicine studies, and saw firsthand how language barriers affect clinical outcomes, the organization's mission came into focus: language access isn't just an educational issue. It's a health equity issue.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Today, MSC combines free community education with a healthcare-focused training initiative and policy advocacy — connecting authentic language learning to real-world impact.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-white" id="team">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
            The Team
          </p>
          <h2 className="text-3xl font-bold mb-12" style={{ color: '#1C1C1E' }}>
            The people behind MSC
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl border border-gray-100 p-7 hover:border-[#1A6B72]/30 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#1C1C1E' }}>{member.name}</h3>
                    <p className="text-sm font-medium" style={{ color: '#1A6B72' }}>{member.role}</p>
                  </div>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs text-gray-400 hover:text-[#1A6B72] transition-colors shrink-0"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-16 px-4" style={{ backgroundColor: '#E8F4F5' }}>
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
            Affiliations & Partners
          </p>
          <h2 className="text-3xl font-bold mb-10" style={{ color: '#1C1C1E' }}>
            Organizations we work with
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {affiliations.map((org) => (
              <div key={org} className="bg-white rounded-xl px-5 py-4 shadow-sm border border-white flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#1A6B72' }} />
                <p className="text-sm font-medium text-gray-700">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1C1C1E' }}>
            Join the community
          </h2>
          <p className="text-base text-gray-600 mb-8 max-w-lg mx-auto">
            Everything MSC offers is free. Create an account to access courses, resources, and community spaces.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: '#1A6B72' }}
            >
              Create Free Account
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base border-2 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: '#1A6B72', color: '#1A6B72' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
