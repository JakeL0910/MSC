'use client'

// COMMUNICATION ACCESS SCORECARD — an educational self-assessment checklist
// for organizations. Edit the questions array to change the checklist.

import { useState } from 'react'
import Link from 'next/link'

interface ScorecardItem {
  id: string
  question: string
  why: string
}

const questions: ScorecardItem[] = [
  {
    id: 'q1',
    question: 'Are your public materials written at an accessible reading level (roughly 6th–8th grade)?',
    why: 'Most adults — in any language — process information best in plain language.',
  },
  {
    id: 'q2',
    question: 'Are your most important documents available in the languages your community speaks?',
    why: 'Even translating the top three documents removes a major barrier.',
  },
  {
    id: 'q3',
    question: 'Do translated materials get reviewed by a second bilingual reader before publishing?',
    why: 'A quick second review catches errors machine translation and rushed work miss.',
  },
  {
    id: 'q4',
    question: 'Do your materials avoid jargon, acronyms, and idioms — or explain them when unavoidable?',
    why: 'Terms like “EOB” or “RSVP” are invisible walls for many readers.',
  },
  {
    id: 'q5',
    question: 'Does every flyer or notice state a clear next step (who to contact, where to go, by when)?',
    why: 'Understanding a message is only useful if people know what to do next.',
  },
  {
    id: 'q6',
    question: 'Do you use visuals — icons, photos, maps — to support key information?',
    why: 'Visual support helps readers at every literacy level, in every language.',
  },
  {
    id: 'q7',
    question: 'Can families reach a real person who can help in their language (or access interpretation)?',
    why: 'A phone tree in English only can undo everything your materials get right.',
  },
  {
    id: 'q8',
    question: 'Is your signage understandable to someone who reads limited English?',
    why: 'Arrows, symbols, and translated headers make physical spaces navigable.',
  },
  {
    id: 'q9',
    question: 'Do you tell your community that language help is available — in their language?',
    why: 'People can’t request an interpreter they don’t know exists.',
  },
  {
    id: 'q10',
    question: 'Have you asked multilingual families for feedback on your communication in the last year?',
    why: 'The people navigating your materials are the best judges of whether they work.',
  },
]

function scoreBand(score: number) {
  if (score >= 9)
    return {
      label: 'Strong access foundations',
      color: 'text-msc-teal',
      message:
        'Your organization has strong language-access habits. Keep collecting community feedback — needs change as communities do.',
    }
  if (score >= 6)
    return {
      label: 'Good start, real gaps',
      color: 'text-msc-amber',
      message:
        'You’re doing several things well, but a few gaps are likely blocking families. Start with the unchecked items above that touch your most-used documents.',
    }
  return {
    label: 'Big opportunity',
    color: 'text-msc-coral',
    message:
      'There’s meaningful room to grow — and that’s good news, because small changes (plain-language rewrites, translating your top documents) have outsized impact. MSC can help.',
  }
}

export default function Scorecard() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [showResults, setShowResults] = useState(false)

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setShowResults(false)
  }

  const score = checked.size
  const band = scoreBand(score)

  return (
    <div className="max-w-3xl mx-auto">
      <ol className="space-y-4 mb-8">
        {questions.map((q, i) => (
          <li key={q.id}>
            <label
              className={`flex items-start gap-4 bg-white rounded-2xl border p-5 cursor-pointer transition-all ${
                checked.has(q.id)
                  ? 'border-msc-teal shadow-sm'
                  : 'border-gray-100 shadow-sm hover:border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={checked.has(q.id)}
                onChange={() => toggle(q.id)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-msc-teal focus:ring-msc-teal/30 flex-shrink-0"
              />
              <span>
                <span className="block text-sm font-semibold text-msc-charcoal mb-1">
                  {i + 1}. {q.question}
                </span>
                <span className="block text-xs text-gray-500 leading-relaxed">{q.why}</span>
              </span>
            </label>
          </li>
        ))}
      </ol>

      <div className="text-center">
        <button
          onClick={() => setShowResults(true)}
          className="btn-primary"
        >
          See My Score
        </button>
      </div>

      {showResults && (
        <div className="mt-8 bg-msc-teal-light/60 rounded-2xl p-8 text-center" role="status">
          <p className="text-5xl font-bold text-msc-charcoal mb-2">
            {score}<span className="text-2xl text-gray-500">/10</span>
          </p>
          <p className={`text-lg font-bold mb-3 ${band.color}`}>{band.label}</p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto mb-6">{band.message}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/partners" className="btn-secondary">
              Get Help From MSC
            </Link>
            <Link
              href="/resources/plain-language-writing-guide"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm text-msc-teal hover:underline"
            >
              Read the Plain-Language Guide →
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            This scorecard is an educational self-assessment, not a formal compliance audit.
          </p>
        </div>
      )}
    </div>
  )
}
