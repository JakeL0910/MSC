// ----------------------------------------------------------------------------
// BREAKDOWN TYPES (no server imports, safe for client components)
// Per-language and per-city rollups shown publicly. Member counts come from the
// membership roster; the impact metrics (hours, people, documents) come from
// VERIFIED contributions only.
// ----------------------------------------------------------------------------

export interface LanguageRow {
  language: string
  members: number
  hours: number
  peopleHelped: number
  documents: number
  sessions: number
}

export interface CityRow {
  city: string
  members: number
  hours: number
  peopleHelped: number
  sessions: number
}

export interface Breakdown {
  byLanguage: LanguageRow[]
  byCity: CityRow[]
}
