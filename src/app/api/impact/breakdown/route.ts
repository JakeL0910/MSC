// ----------------------------------------------------------------------------
// GET /api/impact/breakdown — public per-language and per-city rollups.
// Aggregates only (member counts + verified impact). No personal data.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { getBreakdown } from '@/lib/breakdown'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await getBreakdown()
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=30, s-maxage=30, stale-while-revalidate=120' },
  })
}
