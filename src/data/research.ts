// ----------------------------------------------------------------------------
// RESEARCH & INNOVATION DATA
// Powers the /research page: focus areas, current projects, methods, and
// publication placeholders. Replace placeholder entries as work is published.
// ----------------------------------------------------------------------------

export interface FocusArea {
  title: string
  icon: string
  description: string
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Practical Language Input',
    icon: 'chat',
    description:
      'How exposure to real-world, context-dependent language — everyday expressions, register shifts, and informal speech — shapes comprehension and learning, compared with textbook-style input.',
  },
  {
    title: 'AI-Assisted Language Analysis',
    icon: 'sparkles',
    description:
      'Exploring whether AI tools can analyze language samples faster and more consistently than manual methods — and where accuracy, bias, and privacy limits lie.',
  },
  {
    title: 'Bilingual & Neurodiverse Communication',
    icon: 'puzzle',
    description:
      'Communication development in bilingual and neurodiverse populations, including how language input at home interacts with developmental and language differences.',
  },
  {
    title: 'Health Literacy & Language Access',
    icon: 'heart',
    description:
      'How reading level, translation quality, and vocabulary choices affect whether families can actually use health information — and what makes materials genuinely accessible.',
  },
  {
    title: 'Student-Led Applied Linguistics',
    icon: 'academic-cap',
    description:
      'Building a pathway for high school and college students to design, run, and present real applied-linguistics research with mentor guidance.',
  },
]

export interface ResearchProject {
  title: string
  status: 'Active' | 'In Analysis' | 'Planning'
  description: string
  tags: string[]
}

export const currentProjects: ResearchProject[] = [
  {
    title: 'Informal Language Input in Bilingual Children with Developmental Differences',
    status: 'In Analysis',
    description:
      'A student-led study examining how everyday, informal Spanish input — including context-dependent expressions — appears in the language environment of bilingual children with developmental disabilities, and what that means for family-centered language support.',
    tags: ['Bilingualism', 'Neurodiversity', 'Language input'],
  },
  {
    title: 'AI-Assisted Analysis of Language Samples',
    status: 'Active',
    description:
      'Comparing AI-assisted transcription and analysis of language samples against established manual methods, measuring where automation helps, where it fails, and what safeguards responsible use requires.',
    tags: ['AI tools', 'Methods', 'Language sampling'],
  },
  {
    title: 'Readability of Community Health Materials',
    status: 'Active',
    description:
      'Auditing the reading level and translation availability of publicly distributed health materials in our community, and testing plain-language rewrites with volunteer readers.',
    tags: ['Health literacy', 'Plain language', 'Community'],
  },
  {
    title: 'What Makes Tutoring Stick: Volunteer Session Structures',
    status: 'Planning',
    description:
      'A program-evaluation project tracking which ESL tutoring session structures lead to the strongest learner-reported confidence gains across a semester.',
    tags: ['ESL', 'Program evaluation', 'Tutoring'],
  },
]

export interface Method {
  title: string
  description: string
}

export const methods: Method[] = [
  {
    title: 'Language sample analysis',
    description:
      'Recording and analyzing natural speech samples using established measures — vocabulary diversity, utterance length, and register — with consent and privacy protections throughout.',
  },
  {
    title: 'Corpus and input analysis',
    description:
      'Studying what learners actually hear and read: comparing textbook language against transcripts of real conversation, media, and community materials.',
  },
  {
    title: 'Readability and comprehension testing',
    description:
      'Scoring materials with standard readability measures, then verifying with real readers whether “accessible on paper” means understandable in practice.',
  },
  {
    title: 'Mentored study design',
    description:
      'Every student project is reviewed by adult mentors for ethics, feasibility, and rigor before data collection begins — and presented publicly when complete.',
  },
]

export interface Publication {
  title: string
  venue: string
  year: string
  type: 'Presentation' | 'Poster' | 'Paper'
  note?: string
}

// TODO: replace these placeholders with real titles, venues, and links
// as work is presented or published.
export const publications: Publication[] = [
  {
    title:
      'The Impact of Informal Spanish Input on Language Acquisition in Bilingual Children with Developmental Disabilities',
    venue: 'Regional Science & Engineering Fair',
    year: '2026',
    type: 'Poster',
    note: 'Student-led research poster; full brief available on request.',
  },
  {
    title: 'AI-Assisted Language Sample Analysis: Promise and Pitfalls',
    venue: 'Student research symposium (placeholder)',
    year: '2026',
    type: 'Presentation',
    note: 'Placeholder — update with venue and link when scheduled.',
  },
  {
    title: 'Plain-Language Rewrites of Community Health Materials: A Case Study',
    venue: 'MSC research brief (placeholder)',
    year: '2026',
    type: 'Paper',
    note: 'Placeholder — link the published brief when finalized.',
  },
]
