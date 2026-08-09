// ----------------------------------------------------------------------------
// MEMBER DIGEST
// Builds the data for a periodic impact digest and renders a member-personalized,
// email-safe HTML message: the collective's growth, verified impact, top
// languages, and the member's own verified + pending contribution. Sending is
// handled by /api/digest/send (cron or admin). Personal totals never leak
// between members — each render only uses that member's own contributions.
// ----------------------------------------------------------------------------
import { readList } from '@/lib/store'
import { type Member } from '@/data/members'
import { readContributions, totalsOf } from '@/lib/contributions'
import { getCollectiveStats } from '@/lib/members'
import { getBreakdown } from '@/lib/breakdown'
import { type ImpactTotals } from '@/data/contributions'

const MEMBERS = { key: 'msc:members', file: 'data/members.json' }

export interface MemberTotals {
  verified: ImpactTotals
  pendingCount: number
}

export interface DigestData {
  generatedAt: string
  monthLabel: string
  collective: { members: number; languages: number; cities: number }
  impact: ImpactTotals
  topLanguages: { language: string; members: number }[]
  /** member email → that member's own totals */
  byEmail: Record<string, MemberTotals>
}

/** Gather everything the digest needs in one pass. */
export async function buildDigest(): Promise<DigestData> {
  const [members, contributions, collective, breakdown] = await Promise.all([
    readList<Member>({ ...MEMBERS, seed: [] }),
    readContributions(),
    getCollectiveStats(),
    getBreakdown(),
  ])

  const byEmail: Record<string, MemberTotals> = {}
  for (const m of members) {
    const mine = contributions.filter((c) => c.memberEmail === m.email)
    byEmail[m.email] = {
      verified: totalsOf(mine.filter((c) => c.status === 'verified')),
      pendingCount: mine.filter((c) => c.status === 'self-reported').length,
    }
  }

  const now = new Date()
  return {
    generatedAt: now.toISOString(),
    monthLabel: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    collective: { members: collective.total, languages: collective.languageCount, cities: collective.cityCount },
    impact: totalsOf(contributions.filter((c) => c.status === 'verified')),
    topLanguages: breakdown.byLanguage.slice(0, 5).map((r) => ({ language: r.language, members: r.members })),
    byEmail,
  }
}

const firstName = (name: string) => name.trim().split(/\s+/)[0] || 'there'

function statCell(value: number | string, label: string): string {
  return `
    <td style="text-align:center;padding:8px">
      <div style="font-size:26px;font-weight:700;color:#1A6B72">${value}</div>
      <div style="font-size:12px;color:#6b7280">${label}</div>
    </td>`
}

/** Render the personalized digest HTML for one member. */
export function renderDigestHTML(member: { name: string; email: string }, data: DigestData, siteUrl: string): string {
  const mine = data.byEmail[member.email] ?? { verified: totalsZero(), pendingCount: 0 }
  const dash = `${siteUrl}/members/dashboard`
  const impactUrl = `${siteUrl}/impact`

  const topLangs = data.topLanguages
    .map((l) => `<span style="display:inline-block;background:#E8F4F5;color:#135459;border-radius:8px;padding:4px 10px;margin:2px;font-size:13px;font-weight:600">${l.language} · ${l.members}</span>`)
    .join(' ')

  const yourImpact =
    mine.verified.sessions > 0
      ? `You’ve contributed <strong>${mine.verified.hours} hours</strong> and helped <strong>${mine.verified.peopleHelped} ${mine.verified.peopleHelped === 1 ? 'person' : 'people'}</strong> (verified).`
      : `You haven’t logged any activity yet. When you help someone, log it and we’ll add it to the collective’s impact.`

  const pending = mine.pendingCount > 0 ? ` You have <strong>${mine.pendingCount}</strong> entr${mine.pendingCount === 1 ? 'y' : 'ies'} awaiting review.` : ''

  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1C1C1E;background:#F8F6F1;padding:24px;border-radius:16px">
    <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1A6B72;margin:0 0 4px">MLC impact digest · ${data.monthLabel}</p>
    <h1 style="font-size:22px;margin:0 0 12px">Hi ${firstName(member.name)},</h1>
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px">Here’s how the Multilingual Support Collective is growing, and where you fit in.</p>

    <div style="background:#fff;border-radius:12px;padding:12px;margin-bottom:16px">
      <p style="font-size:12px;font-weight:700;text-transform:uppercase;color:#6b7280;margin:4px 8px 8px">The collective</p>
      <table role="presentation" width="100%" style="border-collapse:collapse">
        <tr>${statCell(data.collective.members, 'Members')}${statCell(data.collective.languages, 'Languages')}${statCell(data.collective.cities, 'Cities')}</tr>
      </table>
    </div>

    <div style="background:#fff;border-radius:12px;padding:12px;margin-bottom:16px">
      <p style="font-size:12px;font-weight:700;text-transform:uppercase;color:#6b7280;margin:4px 8px 8px">Verified impact</p>
      <table role="presentation" width="100%" style="border-collapse:collapse">
        <tr>${statCell(data.impact.hours, 'Hours')}${statCell(data.impact.peopleHelped, 'People helped')}${statCell(data.impact.documents, 'Documents')}</tr>
      </table>
    </div>

    ${topLangs ? `<div style="margin-bottom:16px"><p style="font-size:12px;font-weight:700;text-transform:uppercase;color:#6b7280;margin:0 0 6px">Top languages</p>${topLangs}</div>` : ''}

    <div style="background:#E8F4F5;border-radius:12px;padding:16px;margin-bottom:20px">
      <p style="font-size:12px;font-weight:700;text-transform:uppercase;color:#1A6B72;margin:0 0 6px">Your impact</p>
      <p style="font-size:15px;line-height:1.6;margin:0">${yourImpact}${pending}</p>
    </div>

    <p style="margin:0 0 24px">
      <a href="${dash}" style="background:#1A6B72;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px">Log an activity</a>
      <a href="${impactUrl}" style="color:#1A6B72;padding:12px 12px;text-decoration:none;font-weight:600;font-size:14px">See full impact →</a>
    </p>

    <p style="font-size:12px;color:#9ca3af;margin:0">You’re receiving this as an MLC member. Reply to this email to update your preferences.</p>
  </div>`
}

function totalsZero(): ImpactTotals {
  return { sessions: 0, hours: 0, peopleHelped: 0, documents: 0, languages: 0 }
}
