// ----------------------------------------------------------------------------
// MEMBERSHIP SERVER HELPERS
// Shared aggregation used by the public stats API and by server components that
// want real numbers in their first paint. Keeps the privacy rules in one place:
// this returns aggregates plus opted-in first names only, never emails.
// ----------------------------------------------------------------------------
import { readList } from '@/lib/store'
import { type Member, type CollectiveStats, MEMBER_ROLE_IDS } from '@/data/members'

const STORE = { key: 'msc:members', file: 'data/members.json' }

const firstNameOf = (name: string) => name.trim().split(/\s+/)[0] || name.trim()

/** Compute privacy-safe collective stats from the member store. */
export async function getCollectiveStats(): Promise<CollectiveStats> {
  const members = await readList<Member>({ ...STORE, seed: [] })

  const languageSet = new Set<string>()
  const citySet = new Set<string>()
  const roleCounts: Record<string, number> = Object.fromEntries(MEMBER_ROLE_IDS.map((id) => [id, 0]))

  for (const m of members) {
    m.languages.forEach((l) => languageSet.add(l))
    if (m.city) citySet.add(m.city.toLowerCase())
    m.roles.forEach((r) => {
      if (r in roleCounts) roleCounts[r] += 1
    })
  }

  const wall = members
    .filter((m) => m.showPublicly)
    .slice(-24)
    .reverse()
    .map((m) => ({ firstName: firstNameOf(m.name), city: m.city, languages: m.languages }))

  return {
    total: members.length,
    languageCount: languageSet.size,
    languages: Array.from(languageSet).sort((a, b) => a.localeCompare(b)),
    cityCount: citySet.size,
    roleCounts,
    wall,
  }
}
