// ----------------------------------------------------------------------------
// ADMIN API for webinars & live classes.
//   GET    /api/classes           → list everything (public; drives the page)
//   POST   /api/classes           → create or update a session (admin only)
//   DELETE /api/classes?id=...     → remove a session (admin only)
//
// Writes go to /data/classes.json. This works in local development and on any
// server with a writable filesystem. NOTE: on Vercel's serverless runtime the
// filesystem is read-only, so for the live site these writes need a real store
// (Vercel KV / Postgres / Blob) — swap readClasses/writeClasses for that later.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readClasses, writeClasses, type LiveClass } from '@/data/classes'

export const dynamic = 'force-dynamic'

const ADMIN_KEY = process.env.ADMIN_PASSWORD || 'msc2026'

function authorized(req: Request): boolean {
  return req.headers.get('x-admin-key') === ADMIN_KEY
}

function slugId(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
  return `${base || 'session'}-${Math.random().toString(36).slice(2, 7)}`
}

export async function GET() {
  const list = await readClasses()
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Partial<LiveClass>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.title || !body.start || !body.type) {
    return NextResponse.json(
      { error: 'title, start, and type are required' },
      { status: 400 },
    )
  }

  const list = await readClasses()

  const session: LiveClass = {
    id: body.id || slugId(body.title),
    title: body.title,
    type: body.type,
    description: body.description || '',
    start: body.start,
    durationMin: Number(body.durationMin) || 60,
    tzLabel: body.tzLabel || 'ET',
    host: body.host || 'MSC',
    language: body.language || 'Bilingual',
    level: body.level,
    joinUrl: body.joinUrl || undefined,
    registerUrl: body.registerUrl || undefined,
    recordingUrl: body.recordingUrl || undefined,
    capacity: body.capacity ? Number(body.capacity) : undefined,
  }

  const idx = list.findIndex((c) => c.id === session.id)
  if (idx >= 0) list[idx] = session
  else list.push(session)

  await writeClasses(list)
  return NextResponse.json(session)
}

export async function DELETE(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const list = await readClasses()
  const next = list.filter((c) => c.id !== id)
  await writeClasses(next)
  return NextResponse.json({ ok: true, removed: list.length - next.length })
}
