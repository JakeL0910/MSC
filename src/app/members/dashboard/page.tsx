import type { Metadata } from 'next'
import MemberDashboard from '@/components/features/MemberDashboard'

export const metadata: Metadata = {
  title: 'Member Dashboard',
  robots: { index: false, follow: false },
}

// Session-specific; never cache.
export const dynamic = 'force-dynamic'

export default function MemberDashboardPage() {
  return <MemberDashboard />
}
