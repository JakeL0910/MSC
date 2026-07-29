// ----------------------------------------------------------------------------
// STORAGE LAYER
// One place that decides where our small JSON lists (events, registrations,
// story submissions) live:
//
//   • PRODUCTION (Vercel): Upstash Redis, when its env vars are present.
//     Provision it from the Vercel Marketplace (Upstash) — it injects
//     UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN automatically. (The
//     older Vercel KV env names KV_REST_API_URL / KV_REST_API_TOKEN also work.)
//
//   • LOCAL / PREVIEW (no Redis env): the JSON files under /data, exactly like
//     before — so `npm run dev` needs no setup.
//
// Build-time safe: the Redis client is created lazily on first request, never
// at import time, so `next build` won't crash before the DB is provisioned.
// ----------------------------------------------------------------------------
import { promises as fs } from 'fs'
import path from 'path'
import { Redis } from '@upstash/redis'

let _redis: Redis | null | undefined

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  _redis = url && token ? new Redis({ url, token }) : null
  return _redis
}

/** True when a production Redis store is configured. */
export function usingDatabase(): boolean {
  return getRedis() !== null
}

interface StoreOpts<T> {
  /** Redis key, e.g. 'msc:classes'. */
  key: string
  /** Local file (relative to project root), e.g. 'data/classes.json'. */
  file: string
  /** Default/seed value used when the store is empty (or on first Redis run). */
  seed: T[]
}

/** Read a list from Redis (prod) or the local JSON file (dev). */
export async function readList<T>({ key, file, seed }: StoreOpts<T>): Promise<T[]> {
  const redis = getRedis()
  if (redis) {
    const val = await redis.get<T[]>(key)
    if (val == null) {
      // First run: seed the DB from the value bundled with the deploy.
      if (seed.length) await redis.set(key, seed)
      return seed
    }
    return val
  }
  try {
    const raw = await fs.readFile(path.join(process.cwd(), file), 'utf8')
    return JSON.parse(raw) as T[]
  } catch {
    return seed
  }
}

/** Write a list to Redis (prod) or the local JSON file (dev). */
export async function writeList<T>({ key, file }: Omit<StoreOpts<T>, 'seed'>, data: T[]): Promise<void> {
  const redis = getRedis()
  if (redis) {
    await redis.set(key, data)
    return
  }
  await fs.writeFile(path.join(process.cwd(), file), JSON.stringify(data, null, 2) + '\n', 'utf8')
}
