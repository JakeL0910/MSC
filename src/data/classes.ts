// ----------------------------------------------------------------------------
// WEBINARS & LIVE CLASSES — data store (server only).
// Sessions are edited through the admin UI at /admin/classes. Storage is
// handled by src/lib/store.ts: Redis in production (Vercel), the JSON file at
// /data/classes.json locally. The bundled JSON also seeds the DB on first run.
//
// Pure helpers + the LiveClass type live in ./classes-utils.ts so client
// components can import them without pulling in `fs`.
// ----------------------------------------------------------------------------
import type { LiveClass } from './classes-utils'
import { readList, writeList } from '@/lib/store'
import seed from '../../data/classes.json'

export * from './classes-utils'

const STORE = { key: 'msc:classes', file: 'data/classes.json' }

/** Read every session, newest start first. */
export async function readClasses(): Promise<LiveClass[]> {
  const list = await readList<LiveClass>({ ...STORE, seed: seed as unknown as LiveClass[] })
  return list.sort((a, b) => +new Date(b.start) - +new Date(a.start))
}

/** Overwrite the store (used by the admin API). */
export async function writeClasses(list: LiveClass[]): Promise<void> {
  await writeList(STORE, list)
}
