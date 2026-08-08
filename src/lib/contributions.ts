// ----------------------------------------------------------------------------
// CONTRIBUTIONS SERVER HELPERS
// One place to read the contribution store and roll it up into impact totals.
// The public /impact numbers use verifiedOnly=true so nothing unverified is
// ever shown as documented impact.
// ----------------------------------------------------------------------------
import { readList, writeList } from '@/lib/store'
import { type Contribution, type ImpactTotals } from '@/data/contributions'

const STORE = { key: 'msc:contributions', file: 'data/contributions.json' }

export const readContributions = () => readList<Contribution>({ ...STORE, seed: [] })
export const writeContributions = (list: Contribution[]) => writeList(STORE, list)

/** Roll a list of contributions into headline totals. */
export function totalsOf(list: Contribution[]): ImpactTotals {
  const languages = new Set<string>()
  let hours = 0
  let peopleHelped = 0
  let documents = 0
  for (const c of list) {
    hours += c.hours || 0
    peopleHelped += c.peopleHelped || 0
    documents += c.documents || 0
    if (c.language) languages.add(c.language.toLowerCase())
  }
  return {
    sessions: list.length,
    hours: Math.round(hours * 10) / 10,
    peopleHelped,
    documents,
    languages: languages.size,
  }
}

/** Verified impact totals for the public /impact page. */
export async function getImpactTotals(): Promise<ImpactTotals> {
  const all = await readContributions()
  return totalsOf(all.filter((c) => c.status === 'verified'))
}
