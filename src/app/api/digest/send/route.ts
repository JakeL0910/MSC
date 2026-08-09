// ----------------------------------------------------------------------------
// GET /api/digest/send — send the member impact digest.
// Auth (any one):
//   • Vercel Cron: Authorization: Bearer $CRON_SECRET
//   • Admin: x-admin-key header, or ?key= query for a manual browser trigger
// Options: ?dry=1 builds and counts without sending (safe to test).
//
// Only members who consented to contact are emailed (all members consent at
// join today). Each email is personalized to that member's own contributions.
//
// NOTE: while the private-preview password gate is on, the site middleware will
// block cron requests. In production with SITE_PUBLIC=true the gate is off, so
// scheduled sends work. Manual admin sends work either way when you pass creds.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readList } from '@/lib/store'
import { type Member } from '@/data/members'
import { buildDigest, renderDigestHTML } from '@/lib/digest'
import { sendEmail } from '@/lib/mailer'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const MEMBERS = { key: 'msc:members', file: 'data/members.json' }
const ADMIN_KEY = process.env.ADMIN_PASSWORD || 'msc2026'

function authorized(req: Request): boolean {
  const cronSecret = process.env.CRON_SECRET
  const auth = req.headers.get('authorization')
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true
  const url = new URL(req.url)
  const key = req.headers.get('x-admin-key') || url.searchParams.get('key')
  return key === ADMIN_KEY
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const dryRun = url.searchParams.get('dry') === '1'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || url.origin

  const members = (await readList<Member>({ ...MEMBERS, seed: [] })).filter((m) => m.consent)
  const digest = await buildDigest()

  if (dryRun) {
    return NextResponse.json({ ok: true, dryRun: true, recipients: members.length, monthLabel: digest.monthLabel })
  }

  let sent = 0
  let failed = 0
  for (const m of members) {
    const html = renderDigestHTML({ name: m.name, email: m.email }, digest, siteUrl)
    const { delivered } = await sendEmail(m.email, `MLC impact digest · ${digest.monthLabel}`, html)
    delivered ? sent++ : failed++
  }

  return NextResponse.json({ ok: true, recipients: members.length, sent, failed })
}
