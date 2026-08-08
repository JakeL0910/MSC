// ----------------------------------------------------------------------------
// BREAKDOWN AGGREGATION
// Joins the membership roster with VERIFIED contributions to produce per-language
// and per-city rollups for the public /impact breakdown and the grant report.
// Contributions carry a member email but not a city, so city activity is joined
// back through the member record.
// ----------------------------------------------------------------------------
import { readList } from '@/lib/store'
import { type Member } from '@/data/members'
import { readContributions } from '@/lib/contributions'
import { type Breakdown, type LanguageRow, type CityRow } from '@/data/breakdown'

const MEMBERS = { key: 'msc:members', file: 'data/members.json' }

const round1 = (n: number) => Math.round(n * 10) / 10
/** Title-case a lowercased key for display (keeps multi-word cities readable). */
const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase())

export async function getBreakdown(): Promise<Breakdown> {
  const [members, contributions] = await Promise.all([readList<Member>({ ...MEMBERS, seed: [] }), readContributions()])
  const verified = contributions.filter((c) => c.status === 'verified')

  // Map member email → city, for the city join.
  const cityByEmail = new Map<string, string>()
  for (const m of members) cityByEmail.set(m.email, m.city)

  // ---- Languages -----------------------------------------------------------
  const langRows = new Map<string, LanguageRow>()
  const rowFor = (name: string) => {
    const key = name.toLowerCase()
    let row = langRows.get(key)
    if (!row) {
      row = { language: name, members: 0, hours: 0, peopleHelped: 0, documents: 0, sessions: 0 }
      langRows.set(key, row)
    }
    return row
  }
  for (const m of members) {
    const seen = new Set<string>()
    for (const l of m.languages) {
      const key = l.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      rowFor(l).members += 1
    }
  }
  for (const c of verified) {
    if (!c.language) continue
    const row = rowFor(c.language)
    row.hours = round1(row.hours + (c.hours || 0))
    row.peopleHelped += c.peopleHelped || 0
    row.documents += c.documents || 0
    row.sessions += 1
  }

  // ---- Cities --------------------------------------------------------------
  const cityRows = new Map<string, CityRow>()
  const cityFor = (name: string) => {
    const key = name.toLowerCase()
    let row = cityRows.get(key)
    if (!row) {
      row = { city: titleCase(name), members: 0, hours: 0, peopleHelped: 0, sessions: 0 }
      cityRows.set(key, row)
    }
    return row
  }
  for (const m of members) {
    if (m.city) cityFor(m.city).members += 1
  }
  for (const c of verified) {
    const city = cityByEmail.get(c.memberEmail)
    if (!city) continue
    const row = cityFor(city)
    row.hours = round1(row.hours + (c.hours || 0))
    row.peopleHelped += c.peopleHelped || 0
    row.sessions += 1
  }

  return {
    byLanguage: Array.from(langRows.values()).sort((a, b) => b.members - a.members || b.hours - a.hours),
    byCity: Array.from(cityRows.values()).sort((a, b) => b.members - a.members || b.hours - a.hours),
  }
}
