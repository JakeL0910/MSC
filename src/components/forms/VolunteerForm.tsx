'use client'

import { useState } from 'react'
import { site } from '@/data/site'
import { volunteerRoles, timeCommitments } from '@/data/volunteer'
import {
  TextField,
  SelectField,
  TextAreaField,
  FormError,
  SuccessCard,
  isValidEmail,
  buildMailto,
} from './fields'

export default function VolunteerForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [role, setRole] = useState('')
  const [commitment, setCommitment] = useState('')
  const [languages, setLanguages] = useState('')
  const [why, setWhy] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return }
    if (!role) { setError('Please choose the role you’re most interested in.'); return }
    if (!why.trim()) { setError('Tell us a little about why you want to volunteer.'); return }
    setError('')

    // Opens the applicant's email client with the application pre-filled.
    // See fields.tsx for how to switch this to a real form backend.
    window.location.href = buildMailto(site.email, `[Volunteer Application] ${name} — ${role}`, [
      ['Name', name],
      ['Email', email],
      ['Age / grade', age],
      ['Preferred role', role],
      ['Time commitment', commitment],
      ['Languages spoken', languages],
      ['Why I want to volunteer', `\n${why}`],
    ])
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <SuccessCard
        title="Application ready to send!"
        message="Your email client opened with your application pre-filled — hit send and we'll reply within about a week with next steps."
        onReset={() => setSubmitted(false)}
        resetLabel="Start another application"
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormError message={error} />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField id="vol-name" label="Full name" value={name} onChange={setName} required placeholder="Your name" />
        <TextField id="vol-email" label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@example.com" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField id="vol-age" label="Age or grade" value={age} onChange={setAge} placeholder="e.g. 11th grade" />
        <SelectField
          id="vol-role"
          label="Role you're most interested in"
          value={role}
          onChange={setRole}
          options={volunteerRoles.map((r) => r.title)}
          required
          placeholder="Choose a role…"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          id="vol-commitment"
          label="Time commitment"
          value={commitment}
          onChange={setCommitment}
          options={timeCommitments.map((t) => `${t.label} (${t.hours})`)}
          placeholder="How much time do you have?"
        />
        <TextField
          id="vol-languages"
          label="Languages you speak"
          value={languages}
          onChange={setLanguages}
          placeholder="e.g. English, Spanish (conversational)"
        />
      </div>

      <TextAreaField
        id="vol-why"
        label="Why do you want to volunteer with MSC?"
        value={why}
        onChange={setWhy}
        required
        rows={4}
        placeholder="A few sentences is perfect — experience is not required."
      />

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
      >
        Submit Application
      </button>

      <p className="text-xs text-center text-gray-400">
        Volunteers under 18 will receive a guardian permission form during onboarding.
      </p>
    </form>
  )
}
