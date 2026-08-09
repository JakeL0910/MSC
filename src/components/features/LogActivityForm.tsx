'use client'

// LOG ACTIVITY — a member records one act of support. The visible metric fields
// change with the chosen type (interpretation asks hours + people, translation
// asks documents, etc.). Language offers the member's own languages as quick
// picks. Submits to /api/contributions; the entry starts as "pending review".
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import Icon from '@/components/shared/Icons'
import { CONTRIBUTION_TYPES, METRIC_LABELS, type ContributionType, type MetricKey } from '@/data/contributions'

const today = () => new Date().toISOString().slice(0, 10)

export default function LogActivityForm({
  memberLanguages,
  onLogged,
}: {
  memberLanguages: string[]
  onLogged: () => void
}) {
  const reduce = useReducedMotion()
  const [type, setType] = useState<ContributionType>('interpretation')
  const [metrics, setMetrics] = useState<Record<MetricKey, string>>({ hours: '', peopleHelped: '', documents: '' })
  const [language, setLanguage] = useState('')
  const [date, setDate] = useState(today())
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle')
  const [error, setError] = useState('')

  const def = useMemo(() => CONTRIBUTION_TYPES.find((t) => t.id === type)!, [type])

  function setMetric(k: MetricKey, v: string) {
    setMetrics((prev) => ({ ...prev, [k]: v }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const payload = {
      type,
      hours: def.metrics.includes('hours') ? Number(metrics.hours) || 0 : 0,
      peopleHelped: def.metrics.includes('peopleHelped') ? Number(metrics.peopleHelped) || 0 : 0,
      documents: def.metrics.includes('documents') ? Number(metrics.documents) || 0 : 0,
      language: def.language ? language : '',
      date,
      note,
    }
    if (!payload.hours && !payload.peopleHelped && !payload.documents) {
      return setError('Please add at least one number.')
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      // Reset for the next entry, keep the chosen type + date.
      setMetrics({ hours: '', peopleHelped: '', documents: '' })
      setLanguage('')
      setNote('')
      setStatus('idle')
      onLogged()
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-msc-charcoal">Log an activity</h3>
      <p className="mt-1 text-sm text-gray-500">Record what you did. An MLC admin verifies entries before they count publicly.</p>

      {/* Type pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {CONTRIBUTION_TYPES.map((t) => {
          const on = t.id === type
          return (
            <button
              type="button"
              key={t.id}
              onClick={() => setType(t.id)}
              aria-pressed={on}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                on ? 'border-msc-teal bg-msc-teal text-white' : 'border-gray-200 text-gray-600 hover:border-msc-teal/40'
              }`}
            >
              <Icon name={t.icon} className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-gray-400">{def.description}</p>

      {/* Metric fields, driven by the chosen type */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {def.metrics.map((k) => (
          <label key={k} className="block">
            <span className="text-sm font-semibold text-msc-charcoal">{METRIC_LABELS[k]}</span>
            <input
              type="number"
              min="0"
              step={k === 'hours' ? '0.5' : '1'}
              value={metrics[k]}
              onChange={(e) => setMetric(k, e.target.value)}
              placeholder="0"
              className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
            />
          </label>
        ))}
        <label className="block">
          <span className="text-sm font-semibold text-msc-charcoal">Date</span>
          <input
            type="date"
            value={date}
            max={today()}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
          />
        </label>
      </div>

      {/* Language (interpretation / translation), with quick picks */}
      <AnimatePresence initial={false}>
        {def.language && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              <span className="text-sm font-semibold text-msc-charcoal">Language</span>
              {memberLanguages.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {memberLanguages.map((l) => (
                    <button
                      type="button"
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                        language === l ? 'bg-msc-teal text-white' : 'bg-msc-teal-light text-msc-teal-dark hover:bg-msc-teal/20'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Language"
                className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note */}
      <label className="mt-4 block">
        <span className="text-sm font-semibold text-msc-charcoal">
          Note <span className="font-normal text-gray-500">(optional)</span>
        </span>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Any context that helps verification"
          className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
        />
        <span className="mt-1 block text-xs text-gray-400">Please don’t include anyone’s medical or personal details.</span>
      </label>

      {error && <p className="mt-3 text-sm font-medium text-msc-coral">{error}</p>}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-5 w-full disabled:opacity-60 sm:w-auto">
        {status === 'submitting' ? 'Logging…' : 'Log activity'}
      </button>
    </form>
  )
}
