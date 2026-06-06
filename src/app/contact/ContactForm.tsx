'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { setError('Email address is required.'); return }
    if (!message.trim()) { setError('Message is required.'); return }
    setError('')

    const subjectLine = subject
      ? `[MSC Website — ${subject}] Message from ${firstName} ${lastName}`.trim()
      : `[MSC Website] Message from ${firstName} ${lastName}`.trim()

    const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`
    const mailtoHref = `mailto:jake@makespanishcasual.org?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoHref
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-msc-charcoal mb-2">Your email client opened!</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Your message has been pre-filled. Hit send in your email app to reach us.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm text-msc-teal font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <div className="bg-msc-coral-light text-msc-coral text-sm px-4 py-3 rounded-xl font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            First name
          </label>
          <input
            id="first_name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Jake"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Last name
          </label>
          <input
            id="last_name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Li"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Email address <span className="text-msc-coral">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Subject
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors"
        >
          <option value="">Select a topic…</option>
          <option value="Partnership inquiry">Partnership inquiry</option>
          <option value="Press or media">Press or media</option>
          <option value="Volunteer or event support">Volunteer or event support</option>
          <option value="Research collaboration">Research collaboration</option>
          <option value="General question">General question</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Message <span className="text-msc-coral">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you're working on and how MSC can help…"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
      >
        Open Email Client
      </button>

      <p className="text-xs text-center text-gray-400">
        Or email directly:{' '}
        <a href="mailto:jake@makespanishcasual.org" className="hover:text-msc-teal transition-colors">
          jake@makespanishcasual.org
        </a>
      </p>
    </form>
  )
}
