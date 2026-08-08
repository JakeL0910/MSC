// ----------------------------------------------------------------------------
// PUBLIC COLLECTIVE STATS — the live impact numbers, safe to show anyone.
//   GET /api/members/stats → aggregates only, no personal data
//
// Powers the live counters on /become-a-member and /impact. Aggregation lives
// in lib/members so server components can reuse it. Emails, full names, notes,
// and org names never appear here — only counts and opted-in first names.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { getCollectiveStats } from '@/lib/members'

export const dynamic = 'force-dynamic'

export async function GET() {
  const stats = await getCollectiveStats()
  return NextResponse.json(stats, {
    // Small cache so counters feel live without hammering the store.
    headers: { 'Cache-Control': 'public, max-age=15, s-maxage=15, stale-while-revalidate=60' },
  })
}
