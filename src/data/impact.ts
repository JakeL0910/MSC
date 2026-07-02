// ----------------------------------------------------------------------------
// IMPACT PAGE DATA — timeline, testimonials, and program outcomes.
// Headline stats live in src/data/site.ts (shared with the homepage).
// ----------------------------------------------------------------------------

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export const timeline: TimelineEvent[] = [
  {
    year: '2023',
    title: 'The spark',
    description:
      'MSC begins as Make Spanish Casual — a student project sharing free, real-world Spanish learning materials and building its first community of learners.',
  },
  {
    year: '2024',
    title: 'First community programs',
    description:
      'Volunteer tutoring begins, the first bilingual resource sets are published, and student research on real-world language input gets underway.',
  },
  {
    year: '2025',
    title: 'The mission grows',
    description:
      'Work expands beyond Spanish learning into health communication, family resources, and inclusive language support — the questions our community was actually asking.',
  },
  {
    year: '2026',
    title: 'Multilingual Support Collective',
    description:
      'MSC rebrands to reflect its full mission: language access, health communication, inclusive tutoring, and student-led research, with a growing volunteer and partner network.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
}

// TODO: replace with real quotes (with permission). Aim for voices outside
// the core team — learners, parents, and partners are most credible.
export const testimonials: Testimonial[] = [
  {
    quote:
      'Before my appointment I practiced with the phrase cards. For the first time I asked the doctor my own questions, in my own words.',
    name: 'Community member',
    role: 'Healthcare Phrase Library user (placeholder)',
  },
  {
    quote:
      'My tutor never makes me feel behind. We practice the English I actually need — for work, for my kids’ school, for real life.',
    name: 'Adult learner',
    role: 'ESL Tutoring participant (placeholder)',
  },
  {
    quote:
      'MSC translated our program flyers and suddenly families who had never signed up before started showing up. That’s what access looks like.',
    name: 'Program coordinator',
    role: 'Community partner organization (placeholder)',
  },
]

export interface ProgramOutcome {
  program: string
  outcome: string
  metric: string
}

// TODO: update metrics as real program data comes in.
export const programOutcomes: ProgramOutcome[] = [
  {
    program: 'ESL & Language Tutoring',
    outcome: 'Learners matched with a consistent weekly volunteer tutor',
    metric: '60+ sessions delivered',
  },
  {
    program: 'Health Communication Resources',
    outcome: 'Bilingual guides downloaded and distributed through partners',
    metric: '45+ resources published',
  },
  {
    program: 'Community Translation',
    outcome: 'Local organization materials translated or simplified',
    metric: '25+ documents completed',
  },
  {
    program: 'Youth Research & Innovation',
    outcome: 'Student research projects designed, mentored, and presented',
    metric: '4 active studies',
  },
]

export interface ReachLocation {
  name: string
  detail: string
}

// Community reach — shown as a simple list until a real map is warranted.
export const reachLocations: ReachLocation[] = [
  { name: 'Local schools', detail: 'Tutoring, workshops, and family guides' },
  { name: 'Public libraries', detail: 'Conversation hours and resource displays' },
  { name: 'Community clinics', detail: 'Waiting-room resources and phrasebooks' },
  { name: 'Online community', detail: 'Free downloads and remote tutoring nationwide' },
]
