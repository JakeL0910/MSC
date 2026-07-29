// Compact featured-series banner for the top of /classes. Server-rendered (no
// client JS) so it stays fast and accessible. Links through to the full
// program page. Registration is honestly labeled "opening soon" — no fake URLs.
import Link from 'next/link'
import Icon from '@/components/shared/Icons'
import { sprint } from '@/data/sprint'

// Per-stage cell styles for the 31-day progression (text label + color, so the
// stage is never conveyed by color alone).
const cellStyle: Record<string, string> = {
  s1: 'bg-msc-teal-light text-msc-teal-dark',
  s2: 'bg-msc-amber-light text-msc-charcoal',
  s3: 'bg-msc-coral-light text-msc-coral',
  s4: 'bg-msc-teal text-white',
  s5: 'bg-msc-charcoal text-white',
}
const legendDot: Record<string, string> = {
  s1: 'bg-msc-teal',
  s2: 'bg-msc-amber',
  s3: 'bg-msc-coral',
  s4: 'bg-msc-teal',
  s5: 'bg-msc-charcoal',
}

export default function SprintBanner() {
  const previews = sprint.stages.slice(0, 3)
  const base = `/classes/${sprint.slug}`

  return (
    <section aria-labelledby="sprint-heading" className="scroll-mt-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-msc-teal/15 bg-gradient-to-br from-msc-teal-light/70 via-white to-msc-amber-light/40 p-7 md:p-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center">
            {/* Left: identity + CTAs */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-msc-teal px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  <Icon name="sparkles" className="h-3.5 w-3.5" />
                  Featured series
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-msc-teal">
                  {sprint.startLabel}
                </span>
              </div>

              <h2 id="sprint-heading" className="text-3xl md:text-4xl font-bold text-msc-charcoal">
                {sprint.name}
              </h2>
              <p className="mt-1 text-lg font-semibold text-msc-teal">{sprint.subtitle}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[sprint.dailyLabel, `${sprint.durationLabel} · ${sprint.timeLabel}`, 'Free'].map((label) => (
                  <span key={label} className="rounded-full bg-white/70 border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                    {label}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-gray-600 leading-relaxed max-w-xl">
                One short, practical live class every day in August, building toward a personalized
                <strong className="font-semibold text-msc-charcoal"> Language Access Plan</strong>. {sprint.supportingLine}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href={`${base}#register`} className="btn-primary">
                  Join the August Sprint
                </Link>
                <Link href={`${base}#schedule`} className="btn-secondary">
                  View Full Schedule
                </Link>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Free · Register for the full series or single sessions. Perfect attendance isn’t required.
              </p>
            </div>

            {/* Right: three weekly-theme previews + 31-day progression */}
            <div>
              <ol className="space-y-2.5" aria-label="Weekly theme previews">
                {previews.map((stage) => (
                  <li key={stage.id} className="flex items-start gap-3 rounded-2xl bg-white/80 border border-gray-100 p-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-msc-teal-light text-sm font-bold text-msc-teal">
                      {stage.number}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-msc-charcoal leading-snug">{stage.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{stage.preview}</p>
                    </div>
                  </li>
                ))}
                <li className="text-center">
                  <Link href={`${base}#schedule`} className="text-xs font-semibold text-msc-teal hover:underline">
                    + 2 more stages &amp; all 31 days →
                  </Link>
                </li>
              </ol>

              {/* 31-day progression: labeled cells, not color-only */}
              <div className="mt-5 rounded-2xl bg-white/80 border border-gray-100 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-2.5">
                  31 days · 5 stages
                </p>
                <ol className="flex flex-wrap gap-1.5" aria-label="August: 31 daily sessions across 5 stages">
                  {sprint.sessions.map((s) => (
                    <li key={s.day}>
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold ${cellStyle[s.stageId]}`}
                        title={`Aug ${s.day}: ${s.title}`}
                      >
                        {s.day}
                      </span>
                    </li>
                  ))}
                </ol>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                  {sprint.stages.map((stage) => (
                    <li key={stage.id} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <span className={`h-2.5 w-2.5 rounded-sm ${legendDot[stage.id]}`} aria-hidden="true" />
                      Stage {stage.number}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
