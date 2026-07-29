// ----------------------------------------------------------------------------
// STORY / TESTIMONIAL collection API.
//   POST /api/stories        → public: submit a story (consent required)
//   GET  /api/stories        → admin only (x-admin-key): list submissions
//
// Submissions are stored in /data/story-submissions.json. A person's story is
// only PUBLISHED (added to src/data/stories.ts) after staff review and the
// consent box was checked. Works in local/preview; on Vercel's read-only
// serverless filesystem this needs a real store (KV/Postgres) for production.
//
// PRIVACY: collects only first name, role, the story, an optional email, and
// explicit consent. No sensitive data; minors handled via parent/guardian
// consent in the form. Extra fields on the request are ignored.
// ----------------------------------------------------------------------------
import { NextResponse } from 'next/server'
import { readList, writeList } from '@/lib/store'

export const dynamic = 'force-dynamic'

const STORE = { key: 'msc:stories', file: 'data/story-submissions.json' }
const ADMIN_KEY = process.env.ADMIN_PASSWORD || 'msc2026'

interface StorySubmission {
  id: string
  createdAt: string
  name: string
  role: string
  story: string
  email: string
  consent: boolean
}

const readAll = () => readList<StorySubmission>({ ...STORE, seed: [] })

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = clean(body.name, 80)
  const role = clean(body.role, 60)
  const story = clean(body.story, 1500)
  const email = clean(body.email, 200)
  const consent = body.consent === true

  if (!name) return NextResponse.json({ error: 'Please add your name.' }, { status: 400 })
  if (story.length < 10) return NextResponse.json({ error: 'Please share a little more.' }, { status: 400 })
  if (!consent) return NextResponse.json({ error: 'Please check the permission box so we can share your story.' }, { status: 400 })

  const submission: StorySubmission = {
    id: `story-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    name,
    role,
    story,
    email,
    consent,
  }

  const list = await readAll()
  list.push(submission)
  await writeList(STORE, list)

  return NextResponse.json({ ok: true })
}

export async function GET(req: Request) {
  if (req.headers.get('x-admin-key') !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(await readAll())
}
