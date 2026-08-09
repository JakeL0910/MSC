// ----------------------------------------------------------------------------
// AUGUST ACCESS SPRINT — flagship daily-class series data.
//
// This is a self-contained content file (edit here to change the program). It
// is intentionally SEPARATE from data/classes.json so the 31 daily sessions
// never flood the standard Events grid — the /classes page shows a compact
// featured banner, and the full curriculum lives on /classes/august-access-sprint.
//
// HONESTY RULES (do not violate):
//   • Times are unconfirmed → `time: null` renders "Time to be announced" and
//     disables Add to Calendar. Fill a time only when it is real.
//   • Do NOT add join/registration URLs until a real link exists.
//   • Do NOT set `captions`/`interpretation` true until confirmed.
//   • `registrationStatus: 'opening-soon'` — there is no live registration yet.
// Everything below is meant to be edited by staff.
// ----------------------------------------------------------------------------

export type SprintAudience = 'Students' | 'Families' | 'Educators' | 'All Audiences'
export type SprintLanguage = 'English' | 'Spanish' | 'Bilingual'
export type SprintFormat = 'Live Class' | 'Practice Session' | 'Q&A' | 'Workshop'

export interface SprintSession {
  day: number // 1–31
  date: string // 'YYYY-MM-DD' (August 2026)
  title: string
  stageId: string
  audience: SprintAudience[]
  language: SprintLanguage
  format: SprintFormat
  description: string
  /** null → "Time to be announced" (and Add to Calendar is disabled). */
  time: string | null
  /** null → host to be announced. */
  host: string | null
  /** null → registration handled at the program level (opening soon). */
  registerUrl: string | null
  joinUrl: string | null
  /** Only true once the service is actually confirmed for that session. */
  captions: boolean
  interpretation: boolean
}

export interface SprintStage {
  id: string
  number: number
  title: string
  dateRange: string
  goal: string
  /** Short preview line used in the three weekly-theme cards. */
  preview: string
  days: [number, number] // inclusive day range
}

const d = (day: number) => `2026-08-${String(day).padStart(2, '0')}`

export const sprintStages: SprintStage[] = [
  {
    id: 's1',
    number: 1,
    title: 'Understand Your Language',
    dateRange: 'August 1–7',
    goal:
      'Notice the conditions, formats, and language styles that help someone participate and feel understood.',
    preview: 'Notice what helps you understand, participate, and feel understood.',
    days: [1, 7],
  },
  {
    id: 's2',
    number: 2,
    title: 'Practice Self-Advocacy',
    dateRange: 'August 8–14',
    goal:
      'Practice respectful, practical ways to express needs, preferences, questions, and boundaries.',
    preview: 'Practical, kind language for asking for what helps and setting boundaries.',
    days: [8, 14],
  },
  {
    id: 's3',
    number: 3,
    title: 'Use language Across Languages',
    dateRange: 'August 15–21',
    goal:
      'Affirm multilingual language and explore flexible ways to use English, Spanish, and other home languages.',
    preview: 'Multilingualism as a strength: English, Spanish, and home languages.',
    days: [15, 21],
  },
  {
    id: 's4',
    number: 4,
    title: 'Make Everyday Environments More Accessible',
    dateRange: 'August 22–28',
    goal:
      'Apply language-access principles across school, family, community, and online situations.',
    preview: 'Apply what you’ve learned at school, home, online, and in the community.',
    days: [22, 28],
  },
  {
    id: 's5',
    number: 5,
    title: 'Put It Into Practice',
    dateRange: 'August 29–31',
    goal: 'Complete the Language Access Plan and practice using it.',
    preview: 'Finish and practice your one-page Language Access Plan.',
    days: [29, 31],
  },
]

// Shared defaults for every session. Time is confirmed (7:00 PM Central, every
// day). Hosts are filled by rotation below. Spanish subtitles are NOT yet
// confirmed, so `captions` stays false until they are actually in place.
const base = {
  time: '7:00 PM CT',
  host: null as string | null,
  registerUrl: null,
  joinUrl: null,
  captions: false,
  interpretation: false,
}

export const sprintSessions: SprintSession[] = [
  // ---- Stage 1: Understand Your Language (Aug 1–7) ----
  { ...base, day: 1, date: d(1), stageId: 's1', title: 'Kickoff: What Language Access Means', audience: ['All Audiences'], language: 'English', format: 'Live Class', description: 'What we mean by language access, why it matters, and how this month works. A friendly, no-pressure start.' },
  { ...base, day: 2, date: d(2), stageId: 's1', title: 'Notice What Helps You Use language', audience: ['Students', 'Families'], language: 'English', format: 'Live Class', description: 'Start noticing the conditions and formats that help you understand and take part. The first step toward your plan.' },
  { ...base, day: 3, date: d(3), stageId: 's1', title: 'Clear Language Without Talking Down', audience: ['Educators', 'Families'], language: 'English', format: 'Live Class', description: 'How to make language clear and welcoming without being condescending, respecting everyone as a capable language user.' },
  { ...base, day: 4, date: d(4), stageId: 's1', title: 'Making Space for Processing Time', audience: ['All Audiences'], language: 'English', format: 'Live Class', description: 'Why processing time varies from person to person, and simple ways to make room for it.' },
  { ...base, day: 5, date: d(5), stageId: 's1', title: 'Visual, Written, and Spoken Options', audience: ['Students', 'Educators'], language: 'English', format: 'Live Class', description: 'Different formats work for different people. Explore visual, written, and spoken ways to share and receive information.' },
  { ...base, day: 6, date: d(6), stageId: 's1', title: 'Different Ways to Participate', audience: ['All Audiences'], language: 'English', format: 'Live Class', description: 'Participation isn’t one thing. Look at many valid ways to join a conversation or a class.' },
  { ...base, day: 7, date: d(7), stageId: 's1', title: 'Build Your Language Profile', audience: ['All Audiences'], language: 'English', format: 'Practice Session', description: 'Pull the week together into a short profile of what helps you use language. The foundation of your Access Plan.' },

  // ---- Stage 2: Practice Self-Advocacy (Aug 8–14) ----
  { ...base, day: 8, date: d(8), stageId: 's2', title: 'Asking for Clarification', audience: ['Students', 'Families'], language: 'English', format: 'Live Class', description: 'Practical, low-pressure phrases for asking someone to explain again or in a different way.' },
  { ...base, day: 9, date: d(9), stageId: 's2', title: 'Asking for More Time', audience: ['Students'], language: 'English', format: 'Live Class', description: 'Simple, respectful ways to ask for the time you need to think or respond.' },
  { ...base, day: 10, date: d(10), stageId: 's2', title: 'Expressing Preferences and Boundaries', audience: ['Students', 'Families'], language: 'English', format: 'Live Class', description: 'How to name what works for you, and what doesn’t, kindly and clearly.' },
  { ...base, day: 11, date: d(11), stageId: 's2', title: 'Repairing Misunderstandings', audience: ['All Audiences'], language: 'English', format: 'Live Class', description: 'Misunderstandings happen. Friendly ways to notice and fix them together.' },
  { ...base, day: 12, date: d(12), stageId: 's2', title: 'Preparing for New Situations', audience: ['Students', 'Families'], language: 'English', format: 'Live Class', description: 'Reduce uncertainty by planning ahead for new places, people, and conversations.' },
  { ...base, day: 13, date: d(13), stageId: 's2', title: 'Low-Pressure Family Language', audience: ['Families'], language: 'English', format: 'Live Class', description: 'Warm, everyday ways families can make language at home feel easier for everyone.' },
  { ...base, day: 14, date: d(14), stageId: 's2', title: 'Self-Advocacy Practice Lab', audience: ['Students', 'Families'], language: 'English', format: 'Practice Session', description: 'A hands-on session to practice this week’s self-advocacy language in a supportive space.' },

  // ---- Stage 3: Use language Across Languages (Aug 15–21) ----
  { ...base, day: 15, date: d(15), stageId: 's3', title: 'Multilingualism as a Strength', audience: ['All Audiences'], language: 'English', format: 'Live Class', description: 'More than one language is an asset. We celebrate multilingual language and clear up common myths.' },
  { ...base, day: 16, date: d(16), stageId: 's3', title: 'Code-Switching Without Shame', audience: ['Students', 'Families'], language: 'English', format: 'Live Class', description: 'Moving between languages is skillful, not sloppy. Why code-switching is a valid, useful part of how many people use language.' },
  { ...base, day: 17, date: d(17), stageId: 's3', title: 'Supporting Home Languages', audience: ['Families', 'Educators'], language: 'English', format: 'Live Class', description: 'Practical ways families can keep home languages strong alongside English.' },
  { ...base, day: 18, date: d(18), stageId: 's3', title: 'Making Spanish Practice More Approachable', audience: ['Students', 'Families'], language: 'English', format: 'Live Class', description: 'Casual, real-world Spanish practice that feels welcoming. MLC’s roots, taught in English; great for learners and heritage speakers alike.' },
  { ...base, day: 19, date: d(19), stageId: 's3', title: 'Using language Across Language Differences', audience: ['All Audiences'], language: 'English', format: 'Live Class', description: 'Friendly strategies for understanding and being understood when people share different languages.' },
  { ...base, day: 20, date: d(20), stageId: 's3', title: 'Inclusive Bilingual Family Routines', audience: ['Families'], language: 'English', format: 'Live Class', description: 'Everyday bilingual routines that make language at home flexible and inclusive.' },
  { ...base, day: 21, date: d(21), stageId: 's3', title: 'Build a Multilingual Access Plan', audience: ['All Audiences'], language: 'English', format: 'Practice Session', description: 'Add your languages and multilingual supports to your growing Language Access Plan.' },

  // ---- Stage 4: Make Everyday Environments More Accessible (Aug 22–28) ----
  { ...base, day: 22, date: d(22), stageId: 's4', title: 'Making Classroom Instructions More Accessible', audience: ['Educators'], language: 'English', format: 'Workshop', description: 'Small changes that make classroom instructions clearer for every kind of learner. For educators.' },
  { ...base, day: 23, date: d(23), stageId: 's4', title: 'Navigating Group Conversations', audience: ['Students', 'Families'], language: 'English', format: 'Live Class', description: 'Ways to take part in group conversations that can feel fast or overwhelming.' },
  { ...base, day: 24, date: d(24), stageId: 's4', title: 'Making Written Information Easier to Use', audience: ['Educators', 'Families'], language: 'English', format: 'Workshop', description: 'Plain-language and layout tips that make handouts, forms, and messages easier to use.' },
  { ...base, day: 25, date: d(25), stageId: 's4', title: 'Preparing for Meetings and Appointments', audience: ['Families', 'Students'], language: 'English', format: 'Live Class', description: 'Get ready for meetings and appointments so you can participate and be understood.' },
  { ...base, day: 26, date: d(26), stageId: 's4', title: 'Accessible Online Language', audience: ['All Audiences'], language: 'English', format: 'Live Class', description: 'Making video calls, chats, and messages more accessible and less draining.' },
  { ...base, day: 27, date: d(27), stageId: 's4', title: 'Families and Educators Working Together', audience: ['Families', 'Educators'], language: 'English', format: 'Live Class', description: 'How families and educators can partner around a student’s language access.' },
  { ...base, day: 28, date: d(28), stageId: 's4', title: 'Advocating for Language Access', audience: ['All Audiences'], language: 'English', format: 'Live Class', description: 'Respectful ways to ask for language access in schools, events, and community settings.' },

  // ---- Stage 5: Put It Into Practice (Aug 29–31) ----
  { ...base, day: 29, date: d(29), stageId: 's5', title: 'Complete Your Language Access Plan', audience: ['All Audiences'], language: 'English', format: 'Practice Session', description: 'Bring the month together and finish your one-page Language Access Plan.' },
  { ...base, day: 30, date: d(30), stageId: 's5', title: 'Practice Real-Life Language Scenarios', audience: ['Students', 'Families'], language: 'English', format: 'Practice Session', description: 'Try your plan in friendly, realistic practice scenarios.' },
  { ...base, day: 31, date: d(31), stageId: 's5', title: 'Reflection, Next Steps, and Community Showcase', audience: ['All Audiences'], language: 'English', format: 'Q&A', description: 'Reflect on what you learned, share if you’d like, and plan your next steps. A warm close to the month.' },
]

// Rotate confirmed hosts across the month. Staff can override any single
// session by adding an explicit `host: '…'` to it above (that won't be replaced).
const SPRINT_HOSTS = ['Jake Li', 'Devin Carroll', 'Jordan Stafford']
sprintSessions.forEach((s, i) => {
  if (!s.host) s.host = SPRINT_HOSTS[i % SPRINT_HOSTS.length]
})

export const sprint = {
  slug: 'august-access-sprint',
  name: 'August Access Sprint',
  subtitle: '31 Days · One Access Plan',
  summary:
    'One practical live class every day in August, for students, families, and educators. Each short session builds toward a personalized Language Access Plan: what helps you understand, participate, express preferences, and feel understood.',
  supportingLine: '31 days. 30 minutes a day. One practical language toolkit.',
  startLabel: 'August 1–31, 2026',
  dailyLabel: 'Daily Live Class',
  durationLabel: '30 minutes per day',
  timeLabel: '7:00 PM Central',
  durationMin: 30,
  hosts: SPRINT_HOSTS,
  // Registration is live (form → /api/register). Persists in local/preview;
  // needs a database to persist on the production Vercel deployment.
  registrationStatus: 'open' as 'opening-soon' | 'open',
  disclaimer:
    'These sessions provide general educational information and do not replace individualized guidance from a qualified professional.',
  flexibilityNote:
    'Come to the sessions most relevant to you; you don’t need perfect attendance to benefit. Attend what helps; skip what doesn’t.',
  // All sessions are in English. Spanish subtitles and Spanish-speaking support
  // are planned but not yet confirmed — do not claim them as available.
  accessibilityNote:
    'All sessions are in English. Spanish subtitles and Spanish-speaking support are planned; we’re working on adding them and will confirm here once they’re in place.',
  stages: sprintStages,
  sessions: sprintSessions,
}

export function sessionsForStage(stageId: string): SprintSession[] {
  return sprintSessions.filter((s) => s.stageId === stageId)
}

// 7:00 PM Central in August = CDT (UTC−5). Returns a full ISO instant or null.
export function sprintStartISO(s: SprintSession): string | null {
  if (!s.time) return null
  return `${s.date}T19:00:00-05:00`
}

// Google Calendar "add event" link for a session (null if time not set).
export function sprintGoogleCalendarUrl(s: SprintSession): string | null {
  const startIso = sprintStartISO(s)
  if (!startIso) return null
  const start = new Date(startIso)
  const end = new Date(+start + 30 * 60_000)
  const fmt = (dt: Date) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `August Access Sprint, Day ${s.day}: ${s.title}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${s.description}${s.host ? `\n\nHost: ${s.host}` : ''}\n\nPart of MLC’s August Access Sprint. All sessions are in English.`,
    location: 'Online',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// Format a date-only string as e.g. "Sat, Aug 1" without timezone surprises.
export function formatSprintDate(dateOnly: string): string {
  const m = dateOnly.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return dateOnly
  const [, y, mo, day] = m.map(Number) as unknown as number[]
  const WK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const wd = WK[new Date(Date.UTC(y, mo - 1, day)).getUTCDay()]
  return `${wd}, ${MO[mo - 1]} ${day}`
}
