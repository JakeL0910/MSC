// ----------------------------------------------------------------------------
// GET /api/contributions/mine — the signed-in member's own contributions.
// Scoped strictly to the session email; never returns anyone else's logs.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readContributions } from '@/lib/contributions'
import { getSessionEmail } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const email = getSessionEmail(req)
  if (!email) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 })

  const all = await readContributions()
  const mine = all
    .filter((c) => c.memberEmail === email)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.createdAt.localeCompare(a.createdAt)))

  return NextResponse.json(mine)
}
