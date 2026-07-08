// Stripe Checkout session creator for the donate page.
//
// Setup (see docs/STRIPE_SETUP.md for the full walkthrough):
//   1. Create a Stripe account for MSC (needs the org's EIN + bank account).
//   2. Add STRIPE_SECRET_KEY to .env.local (sk_test_… while testing) and to
//      Vercel → Settings → Environment Variables (sk_live_… for production).
// Until the key is set, /donate automatically shows the email-us fallback.

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { site } from '@/data/site'

const MIN_CENTS = 100 // $1
const MAX_CENTS = 2_500_000 // $25,000 — above this, talk to us directly

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'Online giving is not configured yet. Please email us instead.' },
      { status: 503 },
    )
  }

  let amountCents: number
  let monthly: boolean
  try {
    const body = await request.json()
    amountCents = Math.round(Number(body.amountCents))
    monthly = body.monthly === true
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!Number.isFinite(amountCents) || amountCents < MIN_CENTS || amountCents > MAX_CENTS) {
    return NextResponse.json(
      { error: 'Please choose an amount between $1 and $25,000.' },
      { status: 400 },
    )
  }

  const stripe = new Stripe(key)
  const origin = request.headers.get('origin') ?? site.url

  try {
    const session = await stripe.checkout.sessions.create({
      mode: monthly ? 'subscription' : 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amountCents,
            ...(monthly ? { recurring: { interval: 'month' as const } } : {}),
            product_data: {
              name: monthly ? 'MSC Monthly Donation' : 'MSC Donation',
              description: `Tax-deductible gift to ${site.name}, a ${site.legalLine.toLowerCase()}.`,
            },
          },
        },
      ],
      ...(monthly ? {} : { submit_type: 'donate' as const }),
      success_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate`,
      metadata: { source: 'msc-website-donate-page' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: 'We could not start the checkout. Please try again or email us.' },
      { status: 502 },
    )
  }
}
