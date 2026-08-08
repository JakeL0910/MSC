// ----------------------------------------------------------------------------
// POST /api/auth/request — start passwordless sign-in.
// Body: { email }. If the email belongs to a member, we email a magic link.
// The response is identical whether or not the email is a member, so this can't
// be used to discover who is a member. In development (no mail provider) the
// link is returned in the response so you can sign in without email.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readList } from '@/lib/store'
import { type Member } from '@/data/members'
import { sign, MAGIC_TTL_SEC } from '@/lib/auth'
import { sendMagicLink } from '@/lib/mailer'

export const dynamic = 'force-dynamic'

const MEMBERS = { key: 'msc:members', file: 'data/members.json' }
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const generic = { ok: true, message: 'If that email is a member, a sign-in link is on its way.' }

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const email = (typeof body.email === 'string' ? body.email.trim().toLowerCase() : '').slice(0, 200)
  if (!isEmail(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })

  const members = await readList<Member>({ ...MEMBERS, seed: [] })
  const member = members.find((m) => m.email === email)

  // Only members can sign in. Respond generically either way.
  if (!member) return NextResponse.json(generic)

  const token = sign(email, 'magic', MAGIC_TTL_SEC)
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  const link = `${origin}/api/auth/verify?token=${encodeURIComponent(token)}`

  const { delivered } = await sendMagicLink(email, link)

  // In non-production, hand back the link so local sign-in needs no email.
  if (!delivered && process.env.NODE_ENV !== 'production') {
    return NextResponse.json({ ...generic, devLink: link })
  }
  return NextResponse.json(generic)
}
