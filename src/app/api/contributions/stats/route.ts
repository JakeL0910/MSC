// ----------------------------------------------------------------------------
// GET /api/contributions/stats — public VERIFIED impact totals only.
// Powers the "Verified member impact" band on /impact. Nothing unverified is
// exposed, and no personal data is included — just the headline numbers.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { getImpactTotals } from '@/lib/contributions'

export const dynamic = 'force-dynamic'

export async function GET() {
  const totals = await getImpactTotals()
  return NextResponse.json(totals, {
    headers: { 'Cache-Control': 'public, max-age=30, s-maxage=30, stale-while-revalidate=120' },
  })
}
