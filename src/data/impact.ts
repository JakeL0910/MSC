// ----------------------------------------------------------------------------
// IMPACT / OUR STORY DATA
// Verified, qualitative content only. This file intentionally contains NO
// fabricated metrics (participant counts, donation totals, reach numbers) and
// NO invented testimonials. Add real, documented figures and quotes (with
// permission) only when they are confirmed. Headline highlights live in
// src/data/site.ts.
// ----------------------------------------------------------------------------

export interface Milestone {
  phase: string // short label instead of an unverified exact date
  title: string
  description: string
}

// MSC's evolution, told as ordered phases. Exact founding/expansion years can
// be added here once confirmed (see completion report — dates need verifying).
export const milestones: Milestone[] = [
  {
    phase: 'How we started',
    title: 'Make Spanish Casual',
    description:
      'We started with free, practical materials for the Spanish people really speak.',
  },
  {
    phase: 'Growing',
    title: 'Resources, events, and volunteers',
    description:
      'Free resources grew alongside events across Dallas–Fort Worth, powered by volunteers.',
  },
  {
    phase: 'Advocating',
    title: 'Speaking up for language access',
    description:
      'We advocated before the Plano ISD Board for accessible language education.',
  },
  {
    phase: 'Expanding',
    title: 'From casual Spanish to language access',
    description:
      'The same idea grew into a broader mission: accessible language for neurodivergent and multilingual people.',
  },
]

export interface ImpactStat {
  value: string
  label: string
  note?: string
}

// Real, documented numbers ONLY. The Impact page shows this band when it's
// non-empty. After each event/program, add confirmed figures here, e.g.:
//   { value: 'NN', label: 'Sprint registrations' }
//   { value: 'NN', label: 'Access Plans completed' }
//   { value: 'NN', label: 'Volunteers' }   { value: 'NN', label: 'Attendees' }
// Do NOT add a number you can't document.
export const impactStats: ImpactStat[] = [
  { value: '4', label: 'Free resources published', note: 'Read and print at no cost' },
  { value: '2', label: 'ACTFL conference presentations', note: '2024 Philadelphia, 2025 New Orleans' },
  { value: '1', label: 'Testimony to the Plano ISD Board', note: 'For accessible language education' },
]

export interface Accomplishment {
  title: string
  detail: string
}

// Verified areas of work (qualitative — no fabricated counts).
export const accomplishments: Accomplishment[] = [
  {
    title: 'Developed free educational language resources',
    detail: 'Practical, plain-language materials for learning and everyday language.',
  },
  {
    title: 'Organized educational events across DFW',
    detail: 'Virtual and in-person events for students, families, and community members.',
  },
  {
    title: 'Recruited and coordinated volunteers',
    detail: 'A dedicated team creating resources, running events, and reaching families.',
  },
  {
    title: 'Built strategic partnerships',
    detail: 'Working with schools and community organizations to extend access.',
  },
  {
    title: 'Advocated before the Plano ISD Board',
    detail: 'Bringing a student voice to decisions about accessible language education.',
  },
  {
    title: 'Promoted practical Spanish and cultural understanding',
    detail: 'Keeping real-world language approachable, relevant, and free.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
}

// Intentionally empty. Add real quotes here ONLY with the person's permission.
// The Impact page hides this section while the list is empty — do not add
// placeholder or invented testimonials.
export const testimonials: Testimonial[] = []

export interface ReachType {
  name: string
  detail: string
}

// The kinds of settings MSC works in (qualitative — partner network is growing).
export const reachTypes: ReachType[] = [
  { name: 'Schools & school communities', detail: 'Events, advocacy, and resources for students and families' },
  { name: 'Public libraries', detail: 'Community learning and resource sharing' },
  { name: 'Community organizations', detail: 'Partnerships that help resources reach more families' },
  { name: 'Online', detail: 'Free resources and webinars, open to anyone' },
]
