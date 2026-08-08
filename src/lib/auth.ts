// ----------------------------------------------------------------------------
// PASSWORDLESS AUTH — stateless signed tokens (no auth provider, no DB rows).
//
// Members never set a password. They request a magic link, and clicking it
// exchanges a short-lived "magic" token for a longer-lived "session" cookie.
// Both are HMAC-signed JSON payloads, so we verify them with a secret and never
// have to store or look them up. This runs in the Node runtime of the API
// route handlers (not the Edge middleware), so node:crypto is available.
//
// Set AUTH_SECRET in production. It falls back to ADMIN_PASSWORD, then to a
// dev-only constant, so local development needs no setup.
// ----------------------------------------------------------------------------
import crypto from 'node:crypto'

const SECRET = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || 'msc-dev-secret-change-me'

export const SESSION_COOKIE = 'msc_session'
export const MAGIC_TTL_SEC = 15 * 60 // 15 minutes
export const SESSION_TTL_SEC = 30 * 24 * 60 * 60 // 30 days

type Kind = 'magic' | 'session'
interface Payload {
  email: string
  kind: Kind
  exp: number
}

/** Sign a payload into a `data.signature` token string. */
export function sign(email: string, kind: Kind, ttlSec: number): string {
  const body: Payload = { email: email.toLowerCase(), kind, exp: Date.now() + ttlSec * 1000 }
  const data = Buffer.from(JSON.stringify(body)).toString('base64url')
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url')
  return `${data}.${sig}`
}

/** Verify a token; returns the payload or null if tampered/expired/wrong kind. */
export function verify(token: string | undefined | null, kind: Kind): Payload | null {
  if (!token) return null
  const [data, sig] = token.split('.')
  if (!data || !sig) return null

  const expected = crypto.createHmac('sha256', SECRET).update(data).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null

  try {
    const body = JSON.parse(Buffer.from(data, 'base64url').toString()) as Payload
    if (body.kind !== kind) return null
    if (typeof body.exp !== 'number' || Date.now() > body.exp) return null
    return body
  } catch {
    return null
  }
}

/** Read the signed-in member's email from the session cookie, or null. */
export function getSessionEmail(req: Request): string | null {
  const cookie = req.headers.get('cookie') || ''
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`))
  if (!match) return null
  const payload = verify(decodeURIComponent(match[1]), 'session')
  return payload?.email ?? null
}

/** Options for the session cookie (secure only in production). */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_TTL_SEC,
  }
}
