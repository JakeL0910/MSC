// ----------------------------------------------------------------------------
// AUGUST ACCESS SPRINT — registration API.
//   POST /api/register        → public: submit a registration
//   GET  /api/register        → admin only (x-admin-key): list registrations
//
// Registrations are stored in /data/registrations.json. This works in local
// development and preview. NOTE: on Vercel's serverless runtime the filesystem
// is read-only, so for the live site this needs a real store (Vercel KV /
// Postgres) — swap readRegistrations/writeRegistrations for that later.
//
// PRIVACY: we intentionally collect only what's needed to contact a registrant
// (name, email, which sessions, audience, and an optional free-text note). We
// do NOT collect or accept diagnoses, medical information, or disability
// documentation — any extra fields on the request are ignored.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readList, writeList } from '@/lib/store'

export const dynamic = 'force-dynamic'

const STORE = { key: 'msc:registrations', file: 'data/registrations.json' }
const ADMIN_KEY = process.env.ADMIN_PASSWORD || 'msc2026'

interface Registration {
  id: string
  createdAt: string
  name: string
  email: string
  registrationType: 'full-series' | 'individual'
  sessionDays: number[]
  audience: string
  note: string
}

const readRegistrations = () => readList<Registration>({ ...STORE, seed: [] })
const writeRegistrations = (list: Registration[]) => writeList(STORE, list)

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = clean(body.name, 120)
  const email = clean(body.email, 200)
  const registrationType = body.registrationType === 'individual' ? 'individual' : 'full-series'
  const audience = clean(body.audience, 40)
  const note = clean(body.note, 1000)
  const consent = body.consent === true

  // Only accept valid day numbers 1–31.
  const sessionDays = Array.isArray(body.sessionDays)
    ? Array.from(new Set(body.sessionDays.map(Number).filter((n) => Number.isInteger(n) && n >= 1 && n <= 31))).sort((a, b) => a - b)
    : []

  if (!name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  if (!isEmail(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  if (!consent) return NextResponse.json({ error: 'Please agree to the consent statement to register.' }, { status: 400 })
  if (registrationType === 'individual' && sessionDays.length === 0) {
    return NextResponse.json({ error: 'Please choose at least one session, or register for the full series.' }, { status: 400 })
  }

  const registration: Registration = {
    id: `reg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    name,
    email,
    registrationType,
    sessionDays: registrationType === 'full-series' ? [] : sessionDays,
    audience,
    note,
  }

  const list = await readRegistrations()
  list.push(registration)
  await writeRegistrations(list)

  return NextResponse.json({ ok: true, id: registration.id })
}

export async function GET(req: Request) {
  if (req.headers.get('x-admin-key') !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const list = await readRegistrations()
  return NextResponse.json(list)
}
