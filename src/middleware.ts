import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// PASSWORD GATE (private preview)
//
// Requires a shared username + password before anyone can view the site.
// Uses HTTP Basic Auth, so it also protects the PDF downloads and every page —
// no login screen to build, works on Vercel's free plan.
//
// Credentials (override in Vercel → Project → Settings → Environment Variables,
// or in a local .env.local file):
//   SITE_USER      default: "msc"
//   SITE_PASSWORD  default: "msc2026"
//
// TO GO FULLY PUBLIC LATER: either delete this file, or set the environment
// variable  GATE_DISABLED=true  in Vercel and redeploy.
// ---------------------------------------------------------------------------

const USER = process.env.SITE_USER || 'msc'
const PASSWORD = process.env.SITE_PASSWORD || 'msc2026'
const DISABLED = process.env.GATE_DISABLED === 'true'

export function middleware(req: NextRequest) {
  if (DISABLED) return NextResponse.next()

  const header = req.headers.get('authorization')
  if (header?.startsWith('Basic ')) {
    // atob is available in the Edge runtime
    const decoded = atob(header.slice(6))
    const sep = decoded.indexOf(':')
    const user = decoded.slice(0, sep)
    const pass = decoded.slice(sep + 1)
    if (user === USER && pass === PASSWORD) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="MSC private preview", charset="UTF-8"',
    },
  })
}

// Gate everything except Next.js internals and the favicon (so the browser
// tab icon still shows on the login prompt).
export const config = {
  matcher: ['/((?!_next/static|_next/image|icon.svg).*)'],
}
