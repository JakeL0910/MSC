// ----------------------------------------------------------------------------
// RESOURCE HUB DATA
// Each resource generates a card on /resources and a detail page at
// /resources/[slug].
//
// TO ADD A REAL FILE LATER:
//   1. Drop the PDF into /public/downloads/
//   2. Set `file: '/downloads/your-file.pdf'` on the resource below
//   The download button appears automatically; without a file, the detail
//   page shows a polished "coming soon" state with a notify CTA.
// ----------------------------------------------------------------------------

export interface ResourceCategory {
  id: string
  label: string
  description: string
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'healthcare-spanish',
    label: 'Healthcare Spanish',
    description: 'Spanish-language guides for clinics, pharmacies, and insurance.',
  },
  {
    id: 'english-for-healthcare',
    label: 'English for Healthcare',
    description: 'English phrases and vocabulary for navigating medical settings.',
  },
  {
    id: 'family-communication',
    label: 'Parent & Family Communication',
    description: 'Tools for parents navigating school and health conversations.',
  },
  {
    id: 'esl-learning',
    label: 'ESL Learning',
    description: 'Practice materials for English learners of all ages.',
  },
  {
    id: 'neurodiverse-support',
    label: 'Neurodiverse Language Support',
    description: 'Inclusive materials for neurodiverse and developing communicators.',
  },
  {
    id: 'volunteer-toolkits',
    label: 'Volunteer Toolkits',
    description: 'Training guides and templates for MSC volunteers.',
  },
  {
    id: 'community-guides',
    label: 'Community Guides',
    description: 'Language-access materials for local organizations.',
  },
]

export interface Resource {
  slug: string
  title: string
  category: string // must match a ResourceCategory id
  format: 'Guide' | 'Toolkit' | 'Phrase Cards' | 'Checklist' | 'Worksheet' | 'Summary'
  languages: string[]
  description: string
  overview: string[] // paragraphs shown on the detail page
  file?: string // path under /public — enables the download button
  featured?: boolean
}

export const resources: Resource[] = [
  // --- Healthcare Spanish -----------------------------------------------
  {
    slug: 'clinic-visit-phrasebook-spanish',
    title: 'Clinic Visit Phrasebook',
    category: 'healthcare-spanish',
    format: 'Phrase Cards',
    languages: ['Spanish', 'English'],
    featured: true,
    description:
      'Side-by-side Spanish–English phrases for checking in, describing symptoms, and asking questions at a medical appointment.',
    overview: [
      'This phrasebook covers a full clinic visit from the front desk to checkout: greetings, insurance questions, symptom descriptions, and the questions patients most often want to ask but don’t know how to phrase.',
      'Every phrase appears in Spanish and English with a short note on when to use it. Designed to be printed, folded, and brought to an appointment.',
    ],
    file: '/downloads/clinic-visit-phrasebook.pdf',
  },
  {
    slug: 'pharmacy-vocabulary-guide',
    title: 'Pharmacy Vocabulary Guide',
    category: 'healthcare-spanish',
    format: 'Guide',
    languages: ['Spanish', 'English'],
    description:
      'Common pharmacy terms — dosage, refills, side effects, generic vs. brand — explained in plain Spanish and English.',
    overview: [
      'Pharmacy labels and instructions are full of specialized vocabulary. This guide explains the most common terms in both languages, with examples of how they appear on real labels.',
      'Includes a one-page quick reference for medication schedules and questions to ask the pharmacist.',
    ],
  },
  {
    slug: 'insurance-basics-bilingual',
    title: 'Insurance Basics, Explained',
    category: 'healthcare-spanish',
    format: 'Guide',
    languages: ['Spanish', 'English'],
    description:
      'Copay, deductible, premium, in-network — the vocabulary of U.S. health insurance in plain bilingual language.',
    overview: [
      'Health insurance has its own language, and it’s confusing even for native English speakers. This bilingual guide defines the core terms and walks through a sample insurance card and bill.',
      'Educational only — it explains vocabulary, not specific plans or coverage decisions.',
    ],
  },

  // --- English for Healthcare -------------------------------------------
  {
    slug: 'english-for-appointments',
    title: 'English for Medical Appointments',
    category: 'english-for-healthcare',
    format: 'Guide',
    languages: ['English', 'Spanish'],
    description:
      'Essential English phrases for scheduling, checking in, and talking with providers — with pronunciation support.',
    overview: [
      'Built for English learners who need to navigate care confidently: making an appointment by phone, filling out intake forms, and describing how you feel.',
      'Each section includes practice dialogues and simple pronunciation notes.',
    ],
  },
  {
    slug: 'describing-symptoms-english',
    title: 'Describing Symptoms in English',
    category: 'english-for-healthcare',
    format: 'Worksheet',
    languages: ['English'],
    description:
      'A visual vocabulary worksheet for describing pain, symptoms, and duration clearly to a provider.',
    overview: [
      'Providers ask the same core questions in almost every visit: where, how much, how long, what makes it better or worse. This worksheet teaches the vocabulary to answer them clearly.',
      'Uses a visual body map and a simple pain scale so learners can prepare answers before a visit.',
    ],
  },

  // --- Parent & Family Communication --------------------------------------
  {
    slug: 'family-language-toolkit',
    title: 'Family Language Toolkit',
    category: 'family-communication',
    format: 'Toolkit',
    languages: ['English', 'Spanish'],
    featured: true,
    description:
      'Simple guides for parents helping children navigate bilingual school and health settings — conferences, forms, IEP meetings, and checkups.',
    overview: [
      'Parents are often the communication bridge for their whole family. This toolkit gives them practical support: how to prepare for a parent-teacher conference, what to expect at a well-child visit, how to ask for an interpreter, and how to read common school forms.',
      'Each guide is two pages or less, bilingual, and written for busy families — not professionals.',
    ],
    file: '/downloads/family-language-toolkit.pdf',
  },
  {
    slug: 'parent-teacher-conference-guide',
    title: 'Parent–Teacher Conference Guide',
    category: 'family-communication',
    format: 'Guide',
    languages: ['English', 'Spanish'],
    description:
      'Questions to ask, phrases to use, and what to expect — so every parent can advocate for their child at school.',
    overview: [
      'A short bilingual guide that demystifies parent-teacher conferences: common vocabulary (grades, benchmarks, behavior reports), useful questions to ask, and a note-taking template to bring along.',
    ],
  },

  // --- ESL Learning --------------------------------------------------------
  {
    slug: 'everyday-english-starter-pack',
    title: 'Everyday English Starter Pack',
    category: 'esl-learning',
    format: 'Toolkit',
    languages: ['English'],
    description:
      'Practice materials for beginning English learners: greetings, directions, shopping, and phone calls.',
    overview: [
      'A starter collection for new English learners built around everyday situations rather than grammar drills. Includes practice dialogues, vocabulary cards, and self-check activities.',
      'Used by our volunteer tutors as the foundation for beginner sessions.',
    ],
    file: '/downloads/everyday-english-starter-pack.pdf',
  },
  {
    slug: 'conversation-practice-prompts',
    title: 'Conversation Practice Prompts',
    category: 'esl-learning',
    format: 'Worksheet',
    languages: ['English'],
    description:
      '60 discussion prompts for ESL conversation practice, organized by level and topic.',
    overview: [
      'Designed for tutoring pairs and small groups: prompts progress from simple personal questions to opinions and storytelling, with vocabulary support for each set.',
    ],
  },

  // --- Neurodiverse Language Support --------------------------------------
  {
    slug: 'visual-vocabulary-cards',
    title: 'Visual Vocabulary Cards',
    category: 'neurodiverse-support',
    format: 'Phrase Cards',
    languages: ['English', 'Spanish'],
    description:
      'Picture-supported vocabulary cards for learners who benefit from visual structure — home, school, and clinic sets.',
    overview: [
      'Visual supports help many neurodiverse learners connect words to meaning. These printable card sets pair simple images with bilingual labels across three environments: home, school, and clinic.',
      'Includes a short guide for parents and tutors on using the cards in routines.',
    ],
  },
  {
    slug: 'bilingual-neurodiverse-family-guide',
    title: 'Supporting Bilingual, Neurodiverse Communicators',
    category: 'neurodiverse-support',
    format: 'Guide',
    languages: ['English', 'Spanish'],
    description:
      'A plain-language guide for families raising bilingual children with developmental or language differences.',
    overview: [
      'Families often hear conflicting advice about bilingualism and developmental differences. This guide summarizes what experts generally support, in plain language, and offers practical strategies for supporting communication in both languages.',
      'Reviewed with guidance from our advisory mentors. Educational only — not a substitute for evaluation by a speech-language professional.',
    ],
  },

  // --- Volunteer Toolkits --------------------------------------------------
  {
    slug: 'tutor-training-toolkit',
    title: 'Volunteer Tutor Training Toolkit',
    category: 'volunteer-toolkits',
    format: 'Toolkit',
    languages: ['English'],
    description:
      'Everything a new MSC tutor needs: session structures, first-session checklist, and culturally responsive teaching basics.',
    overview: [
      'Our core volunteer training in one packet: how to run a first session, how to structure a lesson around a learner’s goals, and how to teach with cultural humility and patience.',
    ],
    file: '/downloads/volunteer-tutor-training-toolkit.pdf',
  },
  {
    slug: 'translation-review-checklist',
    title: 'Translation Review Checklist',
    category: 'volunteer-toolkits',
    format: 'Checklist',
    languages: ['English', 'Spanish'],
    description:
      'The two-reviewer quality checklist every MSC translation goes through before publication.',
    overview: [
      'A step-by-step checklist covering accuracy, reading level, tone, formatting, and the situations where volunteer translation is not appropriate and professional services should be recommended instead.',
    ],
  },

  // --- Community Guides -------------------------------------------------------
  {
    slug: 'communication-access-scorecard-guide',
    title: 'Communication Access Scorecard',
    category: 'community-guides',
    format: 'Checklist',
    languages: ['English'],
    featured: true,
    description:
      'A simple educational checklist organizations can use to evaluate whether their materials are easy to understand and language-accessible.',
    overview: [
      'Ten questions that reveal how accessible your organization’s communication really is — reading level, translation availability, visual clarity, and more. Use the interactive version online or download the printable checklist.',
      'Educational and self-assessment only; not a formal compliance audit.',
    ],
    file: '/downloads/communication-access-scorecard.pdf',
  },
  {
    slug: 'plain-language-writing-guide',
    title: 'Plain-Language Writing Guide',
    category: 'community-guides',
    format: 'Guide',
    languages: ['English'],
    description:
      'How to rewrite flyers, forms, and announcements so every family can understand them.',
    overview: [
      'Practical plain-language techniques for community organizations: shorter sentences, everyday words, clear next steps, and layouts that work for readers at every level — including those reading in a second language.',
    ],
  },
]

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug)
}

export function getCategory(id: string): ResourceCategory | undefined {
  return resourceCategories.find((c) => c.id === id)
}
