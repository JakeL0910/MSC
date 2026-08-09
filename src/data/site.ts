// ----------------------------------------------------------------------------
// CENTRAL SITE CONFIGURATION
// Edit this file to update branding, contact info, social links, and the
// verified accomplishment highlights shown across the site. Every page pulls
// from here.
// ----------------------------------------------------------------------------

export const site = {
  acronym: 'MLC',
  name: 'The MLC Project',
  shortName: 'The MLC Project',
  // What MLC stands for — used in about/intro copy.
  meaning: 'Make Language Casual',
  tagline: 'Making language more accessible.',
  subtagline:
    'Approachable resources and programs for neurodivergent and multilingual people, families, and educators.',
  // Secondary message used in a few hero/intro contexts.
  secondaryMessage:
    'Language looks different for everyone. We help make it more accessible.',
  mission:
    'The MLC Project helps multilingual individuals use language, learn, and be understood through accessible language learning.',
  vision:
    'A community where language, in all its forms, is understood, respected, and within reach.',

  // TODO: confirm the public contact address before launch.
  email: 'hello@makelanguagecasual.org',
  legalLine: '501(c)(3) Nonprofit Organization',
  // TODO: add your EIN here for donor pages, e.g. 'EIN 88-1234567'
  ein: '',

  // Primary service area (verified): Dallas–Fort Worth (DFW), Texas.
  serviceArea: 'Dallas–Fort Worth, Texas',

  // Used for SEO/Open Graph URLs.
  url: 'https://makelanguagecasual.org',

  // DONATIONS via Zeffy (free for nonprofits, no Stripe account needed).
  // Create a donation form at zeffy.com, then paste its URL here — the Donate
  // page embeds it automatically. Leave empty to show the "email us" fallback.
  // Example: 'https://www.zeffy.com/en-US/donation-form/your-form-id'
  zeffyUrl: 'https://www.zeffy.com/en-US/donation-form/donate-to-support-the-movement-3',

  // TODO: confirm/990 these are the current, active handles before launch.
  social: {
    instagram: 'https://instagram.com/makelanguagecasual_',
    youtube: 'https://youtube.com/@makelanguagecasual',
    twitter: '',
    linkedin: '',
  },
}

// ----------------------------------------------------------------------------
// VERIFIED ACCOMPLISHMENT HIGHLIGHTS
// These describe real, verified work — NOT fabricated metrics. They appear on
// the homepage and Impact page. Do not add participant counts, donation totals,
// or reach numbers here unless they are confirmed and documented.
// ----------------------------------------------------------------------------
export interface Highlight {
  label: string // short headline (kept non-numeric until real figures are verified)
  detail: string
}

export const highlights: Highlight[] = [
  {
    label: 'Free educational language resources',
    detail: 'Practical materials you can read and print, free.',
  },
  {
    label: 'Events across Dallas–Fort Worth',
    detail: 'Virtual and in-person events for students, families, and community.',
  },
  {
    label: 'Advocacy before the Plano ISD Board',
    detail: 'Advocating for accessible language education in schools.',
  },
  {
    label: 'A dedicated volunteer community',
    detail: 'Volunteers building resources and running events.',
  },
]
