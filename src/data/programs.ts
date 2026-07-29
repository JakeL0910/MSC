// ----------------------------------------------------------------------------
// WHAT WE DO — MSC's central areas of work.
// Each entry generates a card on /programs ("What We Do") and a full page at
// /programs/[slug]. To add or change an area, edit an object here.
//
// `status` keeps the site honest about what is already happening vs. what is
// still being built. Do NOT mark something "Active" unless it is verifiably
// running.
// ----------------------------------------------------------------------------

export type ProgramStatus = 'Active' | 'In Development'

export interface Program {
  slug: string
  name: string
  tagline: string
  icon: string // icon name from components/shared/Icons.tsx (never 'puzzle')
  color: 'teal' | 'amber' | 'coral'
  status: ProgramStatus
  summary: string
  description: string[]
  whatWeDo: string[]
  whoItsFor: string
  ctaLabel: string
  ctaHref: string
  featured?: boolean
}

export const programs: Program[] = [
  {
    slug: 'language-education',
    name: 'Language Education',
    tagline: 'Approachable, practical language learning for everyone.',
    icon: 'book-open',
    color: 'teal',
    status: 'Active',
    featured: true,
    summary:
      'Practical, approachable language education, including conversational Spanish and free community events and webinars.',
    description: [
      'Language education is at the heart of MSC. We keep learning approachable and practical, from everyday conversational Spanish (our roots) to plain-language education about how people use language differently. We share it through free resources and community events, virtual and in person across Dallas–Fort Worth and online.',
    ],
    whatWeDo: [
      'Free, practical conversational Spanish materials and everyday phrases',
      'Plain-language guides to language-processing differences',
      'Virtual and in-person events and webinars across DFW and online',
      'Recordings you can watch any time',
    ],
    whoItsFor:
      'Students, families, educators, and anyone learning language or wanting clearer language.',
    ctaLabel: 'See Events & Webinars',
    ctaHref: '/classes',
  },
  {
    slug: 'neurodivergent-and-student-resources',
    name: 'Resources for Neurodivergent Individuals & Students',
    tagline: 'Language support that respects how you already use language.',
    icon: 'light-bulb',
    color: 'amber',
    status: 'In Development',
    featured: true,
    summary:
      'Affirming, practical resources for neurodivergent students, focused on access and self-advocacy.',
    description: [
      'Neurodivergent people use language in many ways, with different strengths and needs. We build resources that make learning and language more accessible while respecting each person’s style. We don’t treat neurodivergence as something to fix; the focus is access and self-advocacy.',
    ],
    whatWeDo: [
      'Develop resources on language access and self-advocacy',
      'Offer flexible, low-pressure ways to practice and participate',
      'Center neurodivergent perspectives and agency in the materials',
      'Point to qualified professionals for individualized support',
    ],
    whoItsFor:
      'Neurodivergent students and young people, their families, and educators.',
    ctaLabel: 'See Student Resources',
    ctaHref: '/resources#students',
  },
  {
    slug: 'family-and-educator-resources',
    name: 'Bilingual Resources for Families & Educators',
    tagline: 'Clearer, more inclusive materials for the people who support learners.',
    icon: 'document-text',
    color: 'coral',
    status: 'In Development',
    featured: true,
    summary:
      'English–Spanish materials to help families and educators support language and learning.',
    description: [
      'Families and educators are often the bridge for a student’s language. We build bilingual (English–Spanish) resources that make that role easier, with plain language and practical steps. Educational only, not accommodations or professional advice.',
    ],
    whatWeDo: [
      'Create bilingual family guides in plain English and Spanish',
      'Share inclusive-language ideas educators can adapt',
      'Build reusable, practical templates rather than one-off handouts',
      'Invite feedback from families and educators to improve materials',
    ],
    whoItsFor:
      'Parents, teachers, and school communities supporting multilingual and neurodivergent learners.',
    ctaLabel: 'Resources for Families & Educators',
    ctaHref: '/resources#families',
  },
  {
    slug: 'youth-advocacy-and-volunteering',
    name: 'Advocacy & Volunteer Engagement',
    tagline: 'Volunteers building more accessible language for everyone.',
    icon: 'hand-raised',
    color: 'teal',
    status: 'Active',
    featured: true,
    summary:
      'Volunteers creating resources, running events, building partnerships, and advocating for accessible language education.',
    description: [
      'Our volunteers develop resources, run events, build partnerships, and advocate for accessible language education, including before the Plano ISD Board of Trustees. It’s real, meaningful work, led by volunteers with mentor guidance.',
    ],
    whatWeDo: [
      'Recruit, train, and coordinate volunteers',
      'Advocate for accessible language education in local schools',
      'Build partnerships with schools, libraries, and community groups',
      'Create volunteer-led language-access campaigns and materials',
    ],
    whoItsFor:
      'People who want to volunteer or lead, and community partners.',
    ctaLabel: 'Get Involved',
    ctaHref: '/volunteer',
  },
]

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug)
}
