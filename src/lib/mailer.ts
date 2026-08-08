// ----------------------------------------------------------------------------
// MAILER — sends the magic sign-in link.
//
// Mirrors the rest of MSC's "works in dev, real service in prod" approach:
//   • PROD with RESEND_API_KEY set → sends a real email via Resend.
//   • DEV / no key → logs the link to the server console and reports
//     delivered:false, so /api/auth/request can surface the link locally.
//
// To go live: set RESEND_API_KEY (and optionally MAIL_FROM) in Vercel. No code
// change needed. Any transactional provider can be swapped in here.
// ----------------------------------------------------------------------------

/** Send one email. Uses Resend when configured; otherwise logs (dev/preview). */
export async function sendEmail(to: string, subject: string, html: string): Promise<{ delivered: boolean }> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM || 'MSC <onboarding@resend.dev>'

  if (!key) {
    console.log(`\n[MSC] Email to ${to} — "${subject}" (no mail provider configured; not sent)\n`)
    return { delivered: false }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, html }),
  })
  return { delivered: res.ok }
}

export async function sendMagicLink(email: string, link: string): Promise<{ delivered: boolean }> {
  if (!process.env.RESEND_API_KEY) {
    // Local / preview: no provider configured. Surface the link in the logs.
    console.log(`\n[MSC] Magic sign-in link for ${email}:\n${link}\n`)
    return { delivered: false }
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:480px;margin:0 auto;color:#1C1C1E">
      <h2 style="color:#1A6B72">Sign in to MSC</h2>
      <p>Click the button below to sign in to your member dashboard. This link works once and expires in 15 minutes.</p>
      <p style="margin:28px 0">
        <a href="${link}" style="background:#1A6B72;color:#fff;padding:12px 22px;border-radius:12px;text-decoration:none;font-weight:600">Sign in</a>
      </p>
      <p style="font-size:13px;color:#6b7280">If you didn’t request this, you can ignore this email.</p>
    </div>`

  return sendEmail(email, 'Your MSC sign-in link', html)
}
