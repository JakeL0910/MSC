// ----------------------------------------------------------------------------
// PARTNERS DATA — partnership types, offerings, and example collaborations
// for the /partners page.
// ----------------------------------------------------------------------------

export interface PartnerType {
  audience: string
  icon: string
  headline: string
  weProvide: string[]
}

export const partnerTypes: PartnerType[] = [
  {
    audience: 'Schools & Districts',
    icon: 'academic-cap',
    headline: 'Support your multilingual students and families',
    weProvide: [
      'Free ESL tutoring support for students',
      'Bilingual family guides for conferences, forms, and IEP meetings',
      'Student workshops on health literacy and language access',
      'Translated versions of family-facing flyers and announcements',
    ],
  },
  {
    audience: 'Clinics & Health Organizations',
    icon: 'heart',
    headline: 'Help patients arrive prepared and leave informed',
    weProvide: [
      'Plain-language vocabulary guides for waiting rooms',
      'Bilingual visit-preparation checklists for patients',
      'A Communication Access Scorecard self-assessment of your materials',
      'Supplementary phrase resources (never a replacement for interpretation)',
    ],
  },
  {
    audience: 'Libraries & Community Centers',
    icon: 'book-open',
    headline: 'Bring language programs to your community space',
    weProvide: [
      'Volunteer-led ESL conversation groups and tutoring hours',
      'Family Language Toolkit workshops for parents',
      'Free printed resource displays for your patrons',
      'Bilingual event flyers and program materials',
    ],
  },
  {
    audience: 'Nonprofits & Local Organizations',
    icon: 'users',
    headline: 'Reach every family your mission serves',
    weProvide: [
      'Volunteer translation and plain-language rewrites of outreach materials',
      'Communication access reviews with practical recommendations',
      'Co-branded community guides for your programs',
      'Cross-promotion of language-access events',
    ],
  },
]

export interface ExampleCollaboration {
  title: string
  partner: string
  description: string
}

// TODO: replace these with real collaborations as they launch —
// keep the format: what happened, with whom, and the outcome.
export const exampleCollaborations: ExampleCollaboration[] = [
  {
    title: 'Bilingual Family Night',
    partner: 'With a local elementary school',
    description:
      'MSC volunteers ran a bilingual station at a school family night — walking parents through the Family Language Toolkit and helping them prepare questions for upcoming conferences.',
  },
  {
    title: 'Waiting Room Resource Rack',
    partner: 'With a community health clinic',
    description:
      'A clinic partner now stocks MSC’s bilingual clinic phrasebook and insurance vocabulary guide in its waiting area, restocked each month by our outreach team.',
  },
  {
    title: 'Library Conversation Hours',
    partner: 'With a public library branch',
    description:
      'Weekly ESL conversation practice hosted in a library meeting room, led by trained MSC student tutors, with drop-in attendance open to the whole community.',
  },
]

// TODO: replace with real partner names/logos — drop logo files in
// /public/partners/ and reference them here.
export const partnerLogoPlaceholders: string[] = [
  'Your School District',
  'Community Health Clinic',
  'Public Library System',
  'Local Family Nonprofit',
  'Youth Service Organization',
  'Community Foundation',
]
