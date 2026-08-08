// ----------------------------------------------------------------------------
// CONTRIBUTIONS DATA MODEL
// A contribution is one logged act of support by a member: an interpreted
// session, a translated document, volunteer hours, an event. Members log their
// own; an admin verifies. Only VERIFIED contributions ever count toward the
// public impact numbers, keeping the /impact page's "documented figures only"
// promise intact while still letting the whole thing be self-serve.
// ----------------------------------------------------------------------------

export type ContributionType = 'interpretation' | 'translation' | 'volunteering' | 'event' | 'other'

/** Which metric fields a given type collects, plus whether it names a language. */
export interface ContributionTypeDef {
  id: ContributionType
  label: string
  icon: string
  description: string
  metrics: MetricKey[]
  language: boolean
}

export type MetricKey = 'hours' | 'peopleHelped' | 'documents'

export const METRIC_LABELS: Record<MetricKey, string> = {
  hours: 'Hours',
  peopleHelped: 'People helped',
  documents: 'Documents',
}

export const CONTRIBUTION_TYPES: ContributionTypeDef[] = [
  {
    id: 'interpretation',
    label: 'Interpretation',
    icon: 'chat',
    description: 'Interpreted spoken language for someone.',
    metrics: ['hours', 'peopleHelped'],
    language: true,
  },
  {
    id: 'translation',
    label: 'Translation',
    icon: 'document-text',
    description: 'Translated written material.',
    metrics: ['documents', 'hours'],
    language: true,
  },
  {
    id: 'volunteering',
    label: 'Volunteering',
    icon: 'hand-raised',
    description: 'Gave time to outreach, resources, or coordination.',
    metrics: ['hours'],
    language: false,
  },
  {
    id: 'event',
    label: 'Event',
    icon: 'presentation',
    description: 'Helped run or present at an event.',
    metrics: ['hours', 'peopleHelped'],
    language: false,
  },
  {
    id: 'other',
    label: 'Other',
    icon: 'sparkles',
    description: 'Another kind of support.',
    metrics: ['hours'],
    language: false,
  },
]

export const typeDef = (id: string) => CONTRIBUTION_TYPES.find((t) => t.id === id)
export const typeLabel = (id: string) => typeDef(id)?.label ?? id

export interface Contribution {
  id: string
  createdAt: string
  memberEmail: string
  memberName: string
  memberNo: number
  type: ContributionType
  hours: number
  peopleHelped: number
  documents: number
  language: string
  /** When the activity happened (YYYY-MM-DD). */
  date: string
  note: string
  status: 'self-reported' | 'verified'
  verifiedAt: string | null
}

/** Aggregate impact totals. `sessions` is the count of contributions. */
export interface ImpactTotals {
  sessions: number
  hours: number
  peopleHelped: number
  documents: number
  languages: number
}
