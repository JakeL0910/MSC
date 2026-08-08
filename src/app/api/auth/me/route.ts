// ----------------------------------------------------------------------------
// GET /api/auth/me — the signed-in member's own profile (safe subset).
// Returns 401 when there is no valid session. Never returns other members.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readList } from '@/lib/store'
import { type Member } from '@/data/members'
import { getSessionEmail } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const MEMBERS = { key: 'msc:members', file: 'data/members.json' }

export async function GET(req: Request) {
  const email = getSessionEmail(req)
  if (!email) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 })

  const members = await readList<Member>({ ...MEMBERS, seed: [] })
  const member = members.find((m) => m.email === email)
  if (!member) return NextResponse.json({ error: 'Member not found.' }, { status: 401 })

  return NextResponse.json({
    memberNo: member.memberNo,
    name: member.name,
    email: member.email,
    roles: member.roles,
    languages: member.languages,
    city: member.city,
  })
}
