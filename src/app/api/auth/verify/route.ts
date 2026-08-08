// ----------------------------------------------------------------------------
// GET /api/auth/verify?token=… — the magic link target.
// Verifies the short-lived magic token, sets a 30-day session cookie, and
// redirects to the member dashboard. Invalid/expired links bounce back to the
// login page with an error flag.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { verify, sign, SESSION_COOKIE, SESSION_TTL_SEC, sessionCookieOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token')
  const payload = verify(token, 'magic')

  if (!payload) {
    return NextResponse.redirect(new URL('/members/login?error=expired', req.url))
  }

  const session = sign(payload.email, 'session', SESSION_TTL_SEC)
  const res = NextResponse.redirect(new URL('/members/dashboard', req.url))
  res.cookies.set(SESSION_COOKIE, session, sessionCookieOptions())
  return res
}
