# Stripe Setup for the MSC Donate Page

The donation flow is fully built and ships in two states:

- **No key configured** → `/donate` shows the "email us" fallback card. Safe default.
- **`STRIPE_SECRET_KEY` set** → `/donate` shows the live donation widget
  (one-time + monthly, preset + custom amounts) that opens Stripe Checkout.

Nothing else needs to change in the code. Set the key, redeploy, done.

## 1. Create the Stripe account

Go to <https://dashboard.stripe.com/register>. You'll need:

- The organization's legal name (Multilingual Support Collective) and **EIN**
- A **bank account** for payouts
- An account owner who is **18+** — if Jake is under 18, a board member,
  advisor, or parent must be the account owner
- Select "Nonprofit" as the business type. Once verified, email
  <nonprofit@stripe.com> to ask for the discounted nonprofit rate
  (2.2% + $0.30 instead of 2.9% + $0.30 for eligible 501(c)(3)s).

## 2. Test mode first

1. In the Stripe Dashboard, toggle **Test mode** (top right).
2. Copy the **Secret key** (starts with `sk_test_`) from Developers → API keys.
3. Locally: add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```
4. `npm run dev`, open `/donate`, donate with the test card
   `4242 4242 4242 4242` (any future expiry, any CVC, any ZIP).
5. Confirm you land on `/donate/thank-you` and the payment appears in the
   test-mode Dashboard. Test a **monthly** gift too (creates a subscription).

## 3. Go live

1. Complete Stripe's activation checklist (identity + bank verification).
2. Copy the **live** secret key (`sk_live_...`).
3. Vercel → Project → Settings → Environment Variables →
   add `STRIPE_SECRET_KEY` = `sk_live_...` for **Production**
   (use the `sk_test_` key for Preview so test donations never charge real cards).
4. Redeploy. The widget appears automatically.

## Notes

- **Never commit keys.** `.env.local` is gitignored; keep it that way.
- Receipts: enable automatic receipts in Stripe → Settings → Emails.
  Stripe receipts are not formal 501(c)(3) acknowledgment letters — for gifts
  of $250+ the IRS requires a written acknowledgment from MSC itself.
- Donors manage/cancel monthly gifts via the Stripe customer portal —
  enable it in Stripe → Settings → Billing → Customer portal.
- The API route lives at `src/app/api/checkout/route.ts`
  (amount limits: $1–$25,000). The widget is
  `src/components/forms/DonateWidget.tsx`.
