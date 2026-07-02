'use client'

// VOLUNTEER RESOURCE BUILDER — lets volunteers propose guides, flashcards,
// or translated materials. Submissions arrive by email; the team reviews
// and publishes accepted contributions to the Resource Hub.

import { useState } from 'react'
import { site } from '@/data/site'
import {
  TextField,
  SelectField,
  TextAreaField,
  FormError,
  SuccessCard,
  isValidEmail,
  buildMailto,
} from './fields'

const contributionTypes = [
  'Plain-language guide',
  'Flashcard set / vocabulary list',
  'Translation of an existing MSC resource',
  'Phrase cards for a new situation',
  'Poster or visual design',
  'Other idea',
]

const audiences = [
  'Multilingual families',
  'English learners',
  'Neurodiverse learners',
  'Community organizations',
  'Student volunteers',
]

export default function ContributeForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [audience, setAudience] = useState('')
  const [idea, setIdea] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return }
    if (!type) { setError('Please choose what you’d like to contribute.'); return }
    if (!idea.trim()) { setError('Please describe your idea — a few sentences is plenty.'); return }
    setError('')

    // Opens the contributor's email client with the proposal pre-filled.
    // Attachments (drafts, designs) can be added directly in the email.
    window.location.href = buildMailto(site.email, `[Resource Contribution] ${type} — ${name}`, [
      ['Name', name],
      ['Email', email],
      ['Contribution type', type],
      ['Intended audience', audience],
      ['Idea / draft description', `\n${idea}`],
      ['Note', 'Attach any drafts or designs to this email before sending.'],
    ])
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <SuccessCard
        title="Proposal ready to send!"
        message="Your email client opened with your proposal pre-filled. Attach any drafts before sending — our resource team reviews every submission."
        onReset={() => setSubmitted(false)}
        resetLabel="Propose another resource"
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormError message={error} />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField id="con-name" label="Name" value={name} onChange={setName} required placeholder="Your name" />
        <TextField id="con-email" label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@example.com" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          id="con-type"
          label="What would you like to contribute?"
          value={type}
          onChange={setType}
          options={contributionTypes}
          required
        />
        <SelectField id="con-audience" label="Who is it for?" value={audience} onChange={setAudience} options={audiences} />
      </div>

      <TextAreaField
        id="con-idea"
        label="Describe your idea or draft"
        value={idea}
        onChange={setIdea}
        required
        rows={4}
        placeholder="What does it cover, and what gap does it fill? You can attach drafts in the email."
      />

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
      >
        Propose a Resource
      </button>

      <p className="text-xs text-center text-gray-400">
        Every published contribution is credited to its creator — great for portfolios and applications.
      </p>
    </form>
  )
}
