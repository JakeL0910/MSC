// ----------------------------------------------------------------------------
// VOLUNTEER DATA — roles, time commitments, and FAQ for /volunteer.
// ----------------------------------------------------------------------------

export interface VolunteerRole {
  id: string
  title: string
  icon: string
  description: string
  skills: string[]
  commitment: string
}

export const volunteerRoles: VolunteerRole[] = [
  {
    id: 'spanish-contributor',
    title: 'Conversational Spanish Contributor',
    icon: 'chat',
    description:
      'Help create approachable, everyday Spanish materials: the practical, casual Spanish people actually use. Great for bilingual students.',
    skills: ['Comfortable with everyday Spanish', 'Clear language', 'Reliability'],
    commitment: '1–2 hours/week, flexible',
  },
  {
    id: 'resource-creator',
    title: 'Resource Creator',
    icon: 'document-text',
    description:
      'Write and draft plain-language resources on language access, self-advocacy, and inclusive learning. No clinical expertise needed; we keep materials educational.',
    skills: ['Clear writing', 'Attention to accuracy', 'Respectful, plain-language style'],
    commitment: '2–3 hours/week, flexible',
  },
  {
    id: 'translator',
    title: 'Translator / Reviewer',
    icon: 'globe',
    description:
      'Translate MLC materials or review translations for accuracy and tone. Every document gets two bilingual sets of eyes before publication.',
    skills: ['Strong bilingual proficiency', 'Careful reading', 'Cultural awareness'],
    commitment: 'Per-project, ~2 hours each',
  },
  {
    id: 'designer',
    title: 'Graphic Designer',
    icon: 'paint-brush',
    description:
      'Design guides, phrase cards, posters, and social graphics that make our resources beautiful and easy to read.',
    skills: ['Canva, Figma, or similar', 'Eye for accessible layout', 'Portfolio welcome, not required'],
    commitment: 'Per-project, flexible',
  },
  {
    id: 'content-creator',
    title: 'Social Media / Content Creator',
    icon: 'megaphone',
    description:
      'Run phrase-of-the-week series, awareness campaigns, and volunteer spotlights across our social channels.',
    skills: ['Short-form writing or video', 'Consistency', 'Good judgment on tone'],
    commitment: '1–2 hours/week',
  },
  {
    id: 'outreach-coordinator',
    title: 'Outreach Coordinator',
    icon: 'users',
    description:
      'Connect MLC with schools, libraries, and community organizations: scheduling events, managing contacts, and following up with partners.',
    skills: ['Organized language', 'Comfort emailing adults/organizations', 'Follow-through'],
    commitment: '1–3 hours/week',
  },
  {
    id: 'event-helper',
    title: 'Event & Workshop Helper',
    icon: 'presentation',
    description:
      'Help run community events and webinars: conversational Spanish nights, family resource walkthroughs, and school presentations.',
    skills: ['Comfortable presenting or helping out', 'Warm, clear language', 'Training provided'],
    commitment: 'Per-event, ~3 hours each',
  },
]

export interface TimeCommitment {
  label: string
  hours: string
  description: string
}

export const timeCommitments: TimeCommitment[] = [
  {
    label: 'Light',
    hours: '1–2 hrs/week',
    description: 'One tutoring session or content task per week. Perfect alongside a busy school schedule.',
  },
  {
    label: 'Regular',
    hours: '3–4 hrs/week',
    description: 'Multiple sessions or an ongoing project role. Our most common commitment level.',
  },
  {
    label: 'Project-based',
    hours: 'Flexible',
    description: 'Contribute per-project (a translation, a design, a workshop) on your own timeline.',
  },
]

export interface FaqItem {
  question: string
  answer: string
}

export const volunteerFaq: FaqItem[] = [
  {
    question: 'Do I need to be bilingual to volunteer?',
    answer:
      'No. Translation, review, and Spanish-content roles benefit from bilingual proficiency, but design, content creation, outreach, and event help only require fluent English. Many of our volunteers speak one language.',
  },
  {
    question: 'Do I need special experience or credentials?',
    answer:
      'No. Every volunteer gets onboarding before they start, and our resources stay educational (not clinical), so no professional or medical credentials are needed. Patience, care, and reliability matter most.',
  },
  {
    question: 'Can I volunteer remotely?',
    answer:
      'Yes. Resource creation, translation, design, and social media roles are fully remote. Event and outreach help can be remote or in person depending on what’s happening in your area.',
  },
  {
    question: 'Does volunteering count for service hours?',
    answer:
      'Yes. We track and verify volunteer hours and can sign off for school service requirements, NHS, and similar programs.',
  },
  {
    question: 'How old do I need to be?',
    answer:
      'Most roles are open to high school students and up. Volunteers under 18 need a parent or guardian signature during onboarding.',
  },
  {
    question: 'What happens after I apply?',
    answer:
      'We review applications on a rolling basis and reply within about a week with next steps: a short intro conversation, onboarding materials for your role, and your first assignment or match.',
  },
]
