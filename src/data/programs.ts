// ----------------------------------------------------------------------------
// PROGRAMS DATA
// Each entry generates a card on /programs and a full page at /programs/[slug].
// To add a program, add an object here — no page code changes needed.
// ----------------------------------------------------------------------------

export interface Program {
  slug: string
  name: string
  tagline: string
  icon: string // icon name from components/shared/Icons.tsx
  color: 'teal' | 'amber' | 'coral'
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
    slug: 'health-communication-resources',
    name: 'Health Communication Resources',
    tagline: 'Plain-language guides for navigating care in more than one language.',
    icon: 'heart',
    color: 'teal',
    featured: true,
    summary:
      'Multilingual guides that explain healthcare vocabulary, appointment phrases, insurance basics, and how to communicate clearly with providers.',
    description: [
      'A doctor’s visit is stressful enough without a language barrier. Our health communication resources break down the vocabulary of clinics, pharmacies, and insurance into plain, practical language — in English and Spanish, with more languages planned.',
      'Every guide is written for real situations: checking in for an appointment, describing symptoms, asking a pharmacist a question, or understanding a bill. We focus on the words and phrases people actually encounter, reviewed by bilingual volunteers for accuracy and tone.',
    ],
    whatWeDo: [
      'Publish free bilingual guides to clinic, pharmacy, and insurance vocabulary',
      'Maintain the searchable Healthcare Phrase Library for common care situations',
      'Create appointment-preparation checklists families can bring to visits',
      'Partner with community organizations to distribute printed guides',
    ],
    whoItsFor:
      'Multilingual families, patients navigating care in a second language, caregivers, and the community organizations that support them.',
    ctaLabel: 'Browse Health Resources',
    ctaHref: '/resources?category=healthcare-spanish',
  },
  {
    slug: 'esl-tutoring',
    name: 'ESL & Language Tutoring',
    tagline: 'Free, volunteer-led tutoring that meets learners where they are.',
    icon: 'academic-cap',
    color: 'amber',
    featured: true,
    summary:
      'Volunteer tutoring for students, families, and community members building English skills — practical, patient, and free of charge.',
    description: [
      'Our trained student volunteers offer free ESL tutoring for learners of all ages — from school-age students working on classroom English to parents preparing for a job interview or a parent-teacher conference.',
      'Sessions focus on practical communication: the English people need for school, work, appointments, and everyday life. Tutors follow a simple, structured curriculum but adapt to each learner’s goals and pace.',
    ],
    whatWeDo: [
      'Match learners with trained volunteer tutors for free one-on-one sessions',
      'Run small-group conversation practice focused on everyday situations',
      'Provide take-home practice materials aligned to each learner’s goals',
      'Train every tutor in patient, culturally responsive teaching',
    ],
    whoItsFor:
      'English learners of all ages — students, parents, and community members — plus schools and libraries looking for tutoring support.',
    ctaLabel: 'Request or Offer Tutoring',
    ctaHref: '/volunteer',
  },
  {
    slug: 'bilingual-healthcare-project',
    name: 'Bilingual Healthcare Communication Project',
    tagline: 'Spanish–English tools for clearer conversations about care.',
    icon: 'chat',
    color: 'coral',
    featured: true,
    summary:
      'Focused resources for Spanish/English healthcare settings — phrase cards, visit-preparation tools, and vocabulary support for patients and volunteers.',
    description: [
      'Spanish is the second most spoken language in U.S. healthcare settings, yet patients and families are often left to interpret complex medical conversations on their own. This project builds practical Spanish–English tools for those moments.',
      'We create phrase cards for common visits, bilingual symptom and medication vocabulary lists, and preparation sheets that help patients organize questions before an appointment. Our materials support communication — they never replace professional medical interpretation or advice.',
    ],
    whatWeDo: [
      'Develop Spanish–English phrase cards for clinic, pharmacy, and insurance settings',
      'Publish bilingual vocabulary lists for symptoms, medications, and instructions',
      'Create visit-preparation worksheets families can fill out in either language',
      'Recruit bilingual student volunteers to review and improve every resource',
    ],
    whoItsFor:
      'Spanish-speaking patients and families, bilingual students who want to serve their communities, and clinics seeking supplementary plain-language materials.',
    ctaLabel: 'Explore the Phrase Library',
    ctaHref: '/phrase-library',
  },
  {
    slug: 'inclusive-language-learning',
    name: 'Inclusive Language Learning',
    tagline: 'Language support designed for every kind of learner.',
    icon: 'puzzle',
    color: 'teal',
    summary:
      'Support for neurodiverse learners and children with developmental or language differences — because language access includes accessible learning.',
    description: [
      'Language learning materials are rarely designed with neurodiverse learners in mind. Children with developmental or language differences — especially in bilingual households — often need clearer structure, more visual support, and more patience than standard materials provide.',
      'We adapt our tutoring approaches and resources for these learners: visual vocabulary supports, predictable session structures, and family guides that help parents support communication at home. We collaborate with educators and speech-language professionals to keep our materials practical and inclusive.',
    ],
    whatWeDo: [
      'Adapt tutoring materials with visual supports and predictable structure',
      'Publish family guides on supporting bilingual, neurodiverse communicators',
      'Train volunteers on inclusive, strengths-based tutoring practices',
      'Incorporate feedback from families and educators into our materials',
    ],
    whoItsFor:
      'Neurodiverse learners, children with developmental or language differences, their families, and the educators who support them.',
    ctaLabel: 'See Support Resources',
    ctaHref: '/resources?category=neurodiverse-support',
  },
  {
    slug: 'community-translation',
    name: 'Community Translation & Resource Guides',
    tagline: 'Helping local organizations reach every family they serve.',
    icon: 'globe',
    color: 'amber',
    summary:
      'Simple language-access materials for local organizations — translated flyers, plain-language rewrites, and communication guides.',
    description: [
      'Libraries, food banks, schools, and community centers want to reach multilingual families — but professional translation is expensive and plain-language writing is a skill. MSC helps close that gap.',
      'Our volunteer teams translate and simplify community materials: event flyers, program signups, and informational guides. Every translation is reviewed by a second bilingual volunteer, and we’re transparent with partners about what volunteer translation can and can’t be used for.',
    ],
    whatWeDo: [
      'Translate community flyers, signup forms, and informational materials',
      'Rewrite complex documents into plain, accessible language',
      'Offer the Communication Access Scorecard so organizations can self-assess',
      'Build reusable bilingual templates local organizations can adapt',
    ],
    whoItsFor:
      'Libraries, schools, community centers, and small nonprofits serving multilingual neighborhoods.',
    ctaLabel: 'Partner With Us',
    ctaHref: '/partners',
  },
  {
    slug: 'creative-language-projects',
    name: 'Creative Language Projects',
    tagline: 'Making language access visible, joyful, and shareable.',
    icon: 'paint-brush',
    color: 'teal',
    summary:
      'Design contests, story projects, vocabulary campaigns, posters, and social media awareness — creativity in service of communication.',
    description: [
      'Awareness matters. Many people have never thought about what it’s like to navigate a hospital, a classroom, or a government form in a language they’re still learning. Our creative projects make that experience visible.',
      'We run student design contests, bilingual story projects, vocabulary poster campaigns for schools and clinics, and social media series that teach one useful phrase at a time. Everything is free to share and reuse.',
    ],
    whatWeDo: [
      'Host design and storytelling contests for student creators',
      'Produce vocabulary posters and visual guides for schools and clinics',
      'Run social media campaigns on language access and health literacy',
      'Publish community stories about navigating language barriers',
    ],
    whoItsFor:
      'Student artists, writers, and content creators — and anyone who wants to make communication access more visible.',
    ctaLabel: 'Join a Creative Project',
    ctaHref: '/volunteer',
  },
]

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug)
}
