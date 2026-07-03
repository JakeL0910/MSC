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

const topics = [
  'General question',
  'Partner inquiry',
  'Volunteer question',
  'Press or media',
  'Resource request',
  'Other',
]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return }
    if (!message.trim()) { setError('Please include a message.'); return }
    setError('')

    // Opens the visitor's email client with a pre-filled message.
    // See fields.tsx for how to switch this to a real form backend.
    const subject = `[MSC Website] ${topic || 'Message'} from ${name}`
    window.location.href = buildMailto(site.email, subject, [
      ['Name', name],
      ['Email', email],
      ['Topic', topic],
      ['Newsletter signup', newsletter ? 'Yes, add me to the newsletter' : ''],
      ['Message', `\n${message}`],
    ])
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <SuccessCard
        title="Your email client opened!"
        message="Your message is pre-filled and ready — just hit send in your email app to reach us."
        onReset={() => setSubmitted(false)}
        resetLabel="Send another message"
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormError message={error} />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField id="contact-name" label="Name" value={name} onChange={setName} required placeholder="Your name" />
        <TextField id="contact-email" label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@example.com" />
      </div>

      <SelectField id="contact-topic" label="Topic" value={topic} onChange={setTopic} options={topics} placeholder="Select a topic…" />

      <TextAreaField
        id="contact-message"
        label="Message"
        value={message}
        onChange={setMessage}
        required
        placeholder="Tell us what you're working on and how MSC can help…"
      />

      <label className="flex items-start gap-2.5 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-msc-teal focus:ring-msc-teal/30"
        />
        Also sign me up for the MSC newsletter (about once a month).
      </label>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
      >
        Send Message
      </button>

      <p className="text-xs text-center text-gray-400">
        Or email directly:{' '}
        <a href={`mailto:${site.email}`} className="hover:text-msc-teal transition-colors">
          {site.email}
        </a>
      </p>
    </form>
  )
}
