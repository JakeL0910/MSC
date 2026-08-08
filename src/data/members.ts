// ----------------------------------------------------------------------------
// MEMBERSHIP DATA MODEL & CONSTANTS
// The "Become a Member" system turns joining into MSC's impact numbers. Every
// field a member submits is also a metric: role → segment counts, languages →
// the collective's headline "X languages", city → geographic reach.
//
// INTEGRITY: numbers shown on the site come only from real signups. Nothing
// here fabricates counts. Members opt in explicitly before a first name ever
// appears publicly (see `showPublicly`).
// ----------------------------------------------------------------------------

/** Ways a person can take part. A member can pick more than one. */
export interface MemberRole {
  id: string
  label: string
  /** Short first-person line shown under the role card. */
  description: string
  /** Icon name from components/shared/Icons. */
  icon: string
}

export const MEMBER_ROLES: MemberRole[] = [
  { id: 'community', label: 'Community member', description: 'Stay connected and stand with the mission.', icon: 'heart' },
  { id: 'interpreter', label: 'Interpreter', description: 'Bridge spoken language for people who need it.', icon: 'chat' },
  { id: 'translator', label: 'Translator', description: 'Turn written documents into a language people read.', icon: 'document-text' },
  { id: 'volunteer', label: 'Volunteer', description: 'Help with events, outreach, and resources.', icon: 'hand-raised' },
  { id: 'partner', label: 'Partner organization', description: 'Collaborate with us as an organization.', icon: 'users' },
  { id: 'supporter', label: 'Supporter', description: 'Back the work with your voice or a gift.', icon: 'sparkles' },
]

export const MEMBER_ROLE_IDS = MEMBER_ROLES.map((r) => r.id)
export const roleLabel = (id: string) => MEMBER_ROLES.find((r) => r.id === id)?.label ?? id

/** A language option shown in the picker. `native` is the autonym (endonym). */
export interface LanguageOption {
  name: string
  native: string
}

// A curated, DFW-relevant set of world languages, with autonyms. Members can
// also type in any language not listed here (free add), so this is a starting
// palette, not a limit. ASL is intentionally included.
export const COMMON_LANGUAGES: LanguageOption[] = [
  { name: 'Spanish', native: 'Español' },
  { name: 'Vietnamese', native: 'Tiếng Việt' },
  { name: 'Mandarin', native: '普通话' },
  { name: 'Cantonese', native: '廣東話' },
  { name: 'Arabic', native: 'العربية' },
  { name: 'French', native: 'Français' },
  { name: 'Tagalog', native: 'Tagalog' },
  { name: 'Korean', native: '한국어' },
  { name: 'Urdu', native: 'اردو' },
  { name: 'Hindi', native: 'हिन्दी' },
  { name: 'Portuguese', native: 'Português' },
  { name: 'Russian', native: 'Русский' },
  { name: 'American Sign Language', native: 'ASL' },
  { name: 'Swahili', native: 'Kiswahili' },
  { name: 'Amharic', native: 'አማርኛ' },
  { name: 'Somali', native: 'Soomaali' },
  { name: 'Nepali', native: 'नेपाली' },
  { name: 'Burmese', native: 'မြန်မာ' },
  { name: 'Persian', native: 'فارسی' },
  { name: 'Pashto', native: 'پښتو' },
  { name: 'Dari', native: 'دری' },
  { name: 'Bengali', native: 'বাংলা' },
  { name: 'Gujarati', native: 'ગુજરાતી' },
  { name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { name: 'Haitian Creole', native: 'Kreyòl Ayisyen' },
  { name: 'German', native: 'Deutsch' },
  { name: 'Italian', native: 'Italiano' },
  { name: 'Japanese', native: '日本語' },
  { name: 'Thai', native: 'ไทย' },
  { name: 'Khmer', native: 'ខ្មែរ' },
  { name: 'Lao', native: 'ລາວ' },
  { name: 'Hmong', native: 'Hmoob' },
  { name: 'Yoruba', native: 'Yorùbá' },
  { name: 'Igbo', native: 'Igbo' },
  { name: 'Twi', native: 'Twi' },
  { name: 'Kinyarwanda', native: 'Ikinyarwanda' },
  { name: 'Tigrinya', native: 'ትግርኛ' },
  { name: 'Karen', native: 'ကညီ' },
  { name: 'Rohingya', native: 'Ruáingga' },
  { name: 'English', native: 'English' },
]

/** A stored member record. Personal fields never leave the admin API. */
export interface Member {
  id: string
  /** Sequential membership number, assigned at join time. Honest, never faked. */
  memberNo: number
  createdAt: string
  name: string
  email: string
  roles: string[]
  languages: string[]
  city: string
  /** Organization name, when joining as a partner. */
  org: string
  note: string
  /** True if the member let us show their first name + city on the public wall. */
  showPublicly: boolean
  consent: boolean
}

/** Public, privacy-safe aggregate shape returned by /api/members/stats. */
export interface CollectiveStats {
  total: number
  languageCount: number
  languages: string[]
  cityCount: number
  roleCounts: Record<string, number>
  /** First names + city + languages, ONLY for members who opted in. */
  wall: { firstName: string; city: string; languages: string[] }[]
}
