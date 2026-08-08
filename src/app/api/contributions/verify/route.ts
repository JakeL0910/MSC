// ----------------------------------------------------------------------------
// POST /api/contributions/verify — admin marks a contribution verified (or not).
// Body: { id, verified: boolean }. Verifying is what moves a member's logged
// numbers into the public impact totals. Admin-only (x-admin-key).
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readContributions, writeContributions } from '@/lib/contributions'

export const dynamic = 'force-dynamic'

const ADMIN_KEY = process.env.ADMIN_PASSWORD || 'msc2026'

export async function POST(req: Request) {
  if (req.headers.get('x-admin-key') !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const id = typeof body.id === 'string' ? body.id : ''
  const verified = body.verified === true

  const list = await readContributions()
  const item = list.find((c) => c.id === id)
  if (!item) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  item.status = verified ? 'verified' : 'self-reported'
  item.verifiedAt = verified ? new Date().toISOString() : null
  await writeContributions(list)

  return NextResponse.json({ ok: true, status: item.status })
}
