// ----------------------------------------------------------------------------
// GET /api/digest/preview — see the digest email in the browser.
// Renders the template with a SAMPLE member (no real personal data) over the
// real collective numbers, so staff can preview the layout safely. Protected by
// the site gate already; no member data is exposed.
// ----------------------------------------------------------------------------
import { buildDigest, renderDigestHTML } from '@/lib/digest'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  const digest = await buildDigest()

  // Synthetic member: real aggregate numbers, placeholder personal fields.
  const sample = { name: 'Sample Member', email: '__preview__@example.com' }
  const html = renderDigestHTML(sample, digest, siteUrl)

  return new Response(
    `<!doctype html><meta charset="utf-8"><title>Digest preview</title><body style="margin:0;background:#eee;padding:24px">${html}</body>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}
