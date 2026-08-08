// ----------------------------------------------------------------------------
// CONTRIBUTIONS API
//   POST /api/contributions  → member (session): log an act of support
//   GET  /api/contributions  → admin only (x-admin-key): every contribution
//
// New contributions are always status "self-reported". They only become part
// of the public impact numbers once an admin verifies them (see ./verify).
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readList } from '@/lib/store'
import { type Member } from '@/data/members'
import { type Contribution, type ContributionType, CONTRIBUTION_TYPES } from '@/data/contributions'
import { readContributions, writeContributions } from '@/lib/contributions'
import { getSessionEmail } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const MEMBERS = { key: 'msc:members', file: 'data/members.json' }
const ADMIN_KEY = process.env.ADMIN_PASSWORD || 'msc2026'
const TYPE_IDS = CONTRIBUTION_TYPES.map((t) => t.id)

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Clamp a numeric metric to a sane, non-negative range. */
function num(v: unknown, max: number): number {
  const n = typeof v === 'number' ? v : parseFloat(String(v))
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(n, max)
}

/** Accept YYYY-MM-DD; otherwise fall back to today. */
function cleanDate(v: unknown): string {
  const s = clean(v, 10)
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
  return new Date().toISOString().slice(0, 10)
}

export async function POST(req: Request) {
  const email = getSessionEmail(req)
  if (!email) return NextResponse.json({ error: 'Please sign in to log activity.' }, { status: 401 })

  const members = await readList<Member>({ ...MEMBERS, seed: [] })
  const member = members.find((m) => m.email === email)
  if (!member) return NextResponse.json({ error: 'Member not found.' }, { status: 401 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const type = (TYPE_IDS.includes(body.type as ContributionType) ? body.type : '') as ContributionType | ''
  if (!type) return NextResponse.json({ error: 'Please choose a type of contribution.' }, { status: 400 })

  const hours = num(body.hours, 1000)
  const peopleHelped = Math.round(num(body.peopleHelped, 100000))
  const documents = Math.round(num(body.documents, 100000))
  const language = clean(body.language, 60)
  const note = clean(body.note, 1000)
  const date = cleanDate(body.date)

  if (hours === 0 && peopleHelped === 0 && documents === 0) {
    return NextResponse.json({ error: 'Please add at least one number (hours, people, or documents).' }, { status: 400 })
  }

  const contribution: Contribution = {
    id: `con-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    memberEmail: member.email,
    memberName: member.name,
    memberNo: member.memberNo,
    type,
    hours,
    peopleHelped,
    documents,
    language,
    date,
    note,
    status: 'self-reported',
    verifiedAt: null,
  }

  const list = await readContributions()
  list.push(contribution)
  await writeContributions(list)

  return NextResponse.json({ ok: true, id: contribution.id })
}

export async function GET(req: Request) {
  if (req.headers.get('x-admin-key') !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(await readContributions())
}
