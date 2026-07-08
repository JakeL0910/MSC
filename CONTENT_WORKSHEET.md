# MSC Content Worksheet

Every real-world fact the website still needs, in priority order. Fill in the
blanks (alone or with your team), then hand this file back to Claude — each
item lists exactly where the answer gets wired in, so it's a fast pass.

**How to fill it in:** replace each `→ ________` with your answer. Delete any
section that should stay as-is for now. Partial answers are fine.

---

## P0 — Blocks launch (nothing goes public without these)

### Organization identity (`src/data/site.ts`)
- Official contact email (currently `hello@makespanishcasual.org`, a TODO)
  → ________
- EIN (shown on the donate page + receipts; required for tax-deductible language)
  → ________
- Final domain: keeping `makespanishcasual.org`, or moving to a new domain?
  (affects SEO config, the email above, and printed materials)
  → ________
- Social accounts to show in the footer (blank = hidden):
  - Instagram (currently `@makespanishcasual_`) → ________
  - YouTube (currently `@makespanishcasual`) → ________
  - TikTok / LinkedIn / X — any to add? → ________

### Stripe (see `docs/STRIPE_SETUP.md`)
- Who will own the Stripe account (must be 18+; needs EIN + bank account)?
  → ________
- Target date to have test keys in hand → ________

## P1 — Credibility (the site works, but these make it trustworthy)

### Headline stats (`src/data/site.ts` → `stats`)
Current numbers are **placeholders**. Give real ones — smaller-but-true beats
big-but-vague, and we can reframe ("500+ flashcards studied" vs "1,200 learners"):
- Learners/families reached, and how you count it → ________
- Resources published (real count of PDFs, decks, phrase entries) → ________
- Active student volunteers → ________
- Partner organizations (only ones who'd confirm it) → ________

### Team (`src/data/team.ts`)
For each real team member: name · role · 1–2 sentence bio · (optional) photo.
Include Jake's founder bio — the UW–Madison research, UTSW internship, ACTFL
presentations, and Capitol Hill advocacy belong here.
→ ________

### Partners (`src/data/partners.ts` + homepage logos)
List organizations that have actually worked with MSC and would be OK
appearing on the site (get a yes before we publish a logo):
→ ________

## P2 — Depth (upgrade over time)

### Impact page (`src/data/impact.ts`)
- 2–3 real testimonials (name/initials + role + quote, with permission)
  → ________
- One story worth telling in 3–4 sentences (a tutoring match, a clinic
  that used the phrase cards, a workshop) → ________

### Programs (`src/data/programs.ts`)
- Which of the 7 listed programs are actually running right now, and which
  are aspirational? (We can mark upcoming ones "In development" — honest and
  still impressive) → ________

### Blog (`src/data/blog.ts`)
- Any real updates from the last year to post? (events, milestones,
  new resources) → ________

## P3 — Legal & launch checklist (when the above is done)

- [ ] Privacy policy + terms reviewed by an adult advisor (`/privacy`, `/terms`)
- [ ] Donation acknowledgment letter template for gifts $250+ (IRS requirement)
- [ ] Stripe live keys in Vercel (Production) — test keys in Preview
- [ ] Domain connected in Vercel + `site.url` updated
- [ ] Password gate off: remove `SITE_PASSWORD` env or set `GATE_DISABLED=true`
- [ ] Re-run `node scripts/generate-brand-kit.mjs` if email/domain changed
      (boilerplate in the PDF mentions them)

---

*Generated July 2026. The brand kit (logos, colors, guidelines PDF) lives at
`/brand` on the site and in `public/brand/` — that part is done.*
