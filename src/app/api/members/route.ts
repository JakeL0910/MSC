// ----------------------------------------------------------------------------
// MEMBERSHIP API — the front door to MLC's impact numbers.
//   POST /api/members   → public: join the collective
//   GET  /api/members   → admin only (x-admin-key): full member list
//
// Members are stored via lib/store (Redis in prod, data/members.json in dev),
// matching every other MLC collection. Joining is idempotent by email: if you
// join again we update your record instead of creating a duplicate, so the
// member count stays honest.
//
// PRIVACY: names, emails, notes, and org names are personal and are ONLY ever
// returned to an authenticated admin. Public numbers come from
// /api/members/stats, which exposes aggregates and opted-in first names only.
// We never collect diagnoses, medical info, or disability documentation; any
// such extra fields on the request are ignored.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readList, writeList } from '@/lib/store'
import { type Member, MEMBER_ROLE_IDS } from '@/data/members'

export const dynamic = 'force-dynamic'

const STORE = { key: 'msc:members', file: 'data/members.json' }
const ADMIN_KEY = process.env.ADMIN_PASSWORD || 'msc2026'

const readAll = () => readList<Member>({ ...STORE, seed: [] })

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/** Normalize a free-form string list: trim, cap length, de-dupe, drop blanks. */
function cleanList(v: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(v)) return []
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of v) {
    const s = clean(raw, maxLen)
    if (!s) continue
    const key = s.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(s)
    if (out.length >= maxItems) break
  }
  return out
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = clean(body.name, 120)
  const email = clean(body.email, 200).toLowerCase()
  const roles = cleanList(body.roles, 8, 40).filter((r) => MEMBER_ROLE_IDS.includes(r))
  const languages = cleanList(body.languages, 30, 60)
  const city = clean(body.city, 80)
  const org = clean(body.org, 120)
  const note = clean(body.note, 1000)
  const showPublicly = body.showPublicly === true
  const consent = body.consent === true

  if (!name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  if (!isEmail(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  if (roles.length === 0) return NextResponse.json({ error: 'Please choose at least one way you want to take part.' }, { status: 400 })
  if (languages.length === 0) return NextResponse.json({ error: 'Please add at least one language you speak.' }, { status: 400 })
  if (!consent) return NextResponse.json({ error: 'Please agree to the membership consent statement.' }, { status: 400 })

  const list = await readAll()

  // Idempotent by email: returning members update in place, keeping their
  // original member number and join date so the count never inflates.
  const existing = list.find((m) => m.email === email)
  const updated: Member = {
    id: existing?.id ?? `mbr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    memberNo: existing?.memberNo ?? list.length + 1,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    name,
    email,
    roles,
    languages,
    city,
    org,
    note,
    showPublicly,
    consent,
  }

  if (existing) {
    Object.assign(existing, updated, { id: existing.id, memberNo: existing.memberNo, createdAt: existing.createdAt })
  } else {
    list.push(updated)
  }
  await writeList(STORE, list)

  return NextResponse.json({
    ok: true,
    memberNo: updated.memberNo,
    returning: Boolean(existing),
  })
}

export async function GET(req: Request) {
  if (req.headers.get('x-admin-key') !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(await readAll())
}
