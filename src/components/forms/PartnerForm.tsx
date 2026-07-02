'use client'

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

const orgTypes = [
  'School or district',
  'Clinic or health organization',
  'Library',
  'Community center',
  'Nonprofit',
  'Other',
]

const interests = [
  'Tutoring or workshops for our community',
  'Translated or plain-language materials',
  'Resource displays / printed guides',
  'Communication access review',
  'Sponsorship or funding',
  'Something else',
]

export default function PartnerForm() {
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [orgType, setOrgType] = useState('')
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (!org.trim()) { setError('Please enter your organization name.'); return }
    if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return }
    if (!message.trim()) { setError('Please tell us a little about what you have in mind.'); return }
    setError('')

    // Opens the visitor's email client with the inquiry pre-filled.
    // See fields.tsx for how to switch this to a real form backend.
    window.location.href = buildMailto(site.email, `[Partnership Inquiry] ${org}`, [
      ['Contact name', name],
      ['Organization', org],
      ['Organization type', orgType],
      ['Email', email],
      ['Interested in', interest],
      ['Details', `\n${message}`],
    ])
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <SuccessCard
        title="Inquiry ready to send!"
        message="Your email client opened with the inquiry pre-filled — hit send and our outreach team will follow up within a few days."
        onReset={() => setSubmitted(false)}
        resetLabel="Send another inquiry"
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormError message={error} />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField id="partner-name" label="Your name" value={name} onChange={setName} required placeholder="Contact person" />
        <TextField id="partner-email" label="Work email" type="email" value={email} onChange={setEmail} required placeholder="you@organization.org" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField id="partner-org" label="Organization" value={org} onChange={setOrg} required placeholder="Organization name" />
        <SelectField id="partner-orgtype" label="Organization type" value={orgType} onChange={setOrgType} options={orgTypes} />
      </div>

      <SelectField
        id="partner-interest"
        label="What are you interested in?"
        value={interest}
        onChange={setInterest}
        options={interests}
        placeholder="Choose the closest fit…"
      />

      <TextAreaField
        id="partner-message"
        label="Tell us about your community and goals"
        value={message}
        onChange={setMessage}
        required
        rows={4}
        placeholder="Who do you serve, and where do language barriers show up?"
      />

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
      >
        Send Partnership Inquiry
      </button>
    </form>
  )
}
