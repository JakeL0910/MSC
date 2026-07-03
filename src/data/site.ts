// ----------------------------------------------------------------------------
// CENTRAL SITE CONFIGURATION
// Edit this file to update branding, contact info, social links, and headline
// stats across the entire site. Every page pulls from here.
// ----------------------------------------------------------------------------

export const site = {
  acronym: 'MSC',
  name: 'Multilingual Support Collective',
  shortName: 'MSC — Multilingual Support Collective',
  tagline: 'Bridging language gaps in healthcare, education, and community life.',
  subtagline:
    'MSC is a youth-led initiative creating multilingual resources, tutoring programs, and tools that make communication more accessible for families, students, and underserved communities.',
  mission:
    'MSC empowers communities through language access.',
  vision:
    'A world where language is never a barrier to health, education, or belonging.',

  // TODO: update this email when the new domain goes live
  email: 'hello@makespanishcasual.org',
  legalLine: '501(c)(3) Nonprofit Organization',
  // TODO: add your EIN here for donor pages, e.g. 'EIN 88-1234567'
  ein: '',

  // TODO: update when the new domain is live (used for SEO/Open Graph URLs)
  url: 'https://makespanishcasual.org',

  // TODO: replace with your real social handles (omit or leave empty to hide a link)
  social: {
    instagram: 'https://instagram.com/makespanishcasual_',
    youtube: 'https://youtube.com/@makespanishcasual',
    twitter: '',
    linkedin: '',
  },
}

// ----------------------------------------------------------------------------
// HEADLINE STATS — placeholder numbers. Update these as your programs grow;
// they appear on the homepage and the Impact page.
// ----------------------------------------------------------------------------
export interface Stat {
  value: string
  label: string
  detail?: string
}

export const stats: Stat[] = [
  {
    value: '1,200+',
    label: 'Learners & families reached',
    detail: 'Through tutoring, resources, and community events',
  },
  {
    value: '45+',
    label: 'Multilingual resources published',
    detail: 'Free guides, toolkits, and phrase libraries',
  },
  {
    value: '30+',
    label: 'Student volunteers',
    detail: 'Tutors, translators, designers, and organizers',
  },
  {
    value: '8',
    label: 'Community partners',
    detail: 'Schools, libraries, and local organizations',
  },
]
