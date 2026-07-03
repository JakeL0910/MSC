# MSC — Multilingual Support Collective

The website for MSC, a youth-led nonprofit bridging language gaps in healthcare,
education, and community life. Built with Next.js 15 (App Router), TypeScript,
and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy

- **Vercel** (easiest): import the repo, no config needed.
- **Netlify**: build command `npm run build`, uses the Next.js runtime automatically.
- **GitHub Pages**: requires static export — add `output: 'export'` to
  `next.config.js` and remove the `redirects()` block (static hosts can't run them).

## Where to edit content

Almost all content lives in plain data files — you rarely need to touch page code:

| File | Controls |
|---|---|
| `src/data/site.ts` | Brand name, mission, email, social links, headline stats |
| `src/data/programs.ts` | All 7 program cards + their detail pages |
| `src/data/resources.ts` | Resource Hub cards, categories, detail pages, PDF links |
| `src/data/blog.ts` | Blog posts (cards + full articles) |
| `src/data/phrases.ts` | Healthcare Phrase Library cards |
| `src/data/learn.ts` | MSC Learn flashcard decks |
| `src/data/volunteer.ts` | Volunteer roles, time commitments, FAQ |
| `src/data/partners.ts` | Partnership types, example collaborations, logo placeholders |
| `src/data/impact.ts` | Timeline, testimonials, program outcomes |
| `src/data/team.ts` | Team and advisor profiles |

Search the codebase for `TODO:` to find every placeholder that needs a real
value (email, EIN, social handles, team names, partner logos, donation platform).

## Resource PDFs

The downloadable resources (phrasebook, family toolkit, ESL pack, tutor toolkit,
scorecard) are generated from `scripts/generate-resource-pdfs.mjs` — content and
layout live there as HTML/CSS, rendered to PDF via Playwright.

```bash
node scripts/generate-resource-pdfs.mjs   # rewrites public/downloads/*.pdf
```

Edit a document's content object in that script and re-run to update its PDF.

To add a **new** downloadable resource:

1. Drop the PDF in `public/downloads/` (or add it to the generator script)
2. In `src/data/resources.ts`, set `file: '/downloads/your-file.pdf'` on the resource
3. Download buttons appear automatically; resources without a `file` show a
   polished "coming soon" state

## Forms

All forms (contact, volunteer, partner, resource contribution) validate on the
frontend and open the visitor's email client with a pre-filled message — no
backend needed. To switch to a real backend (Formspree, Netlify Forms), see the
comment at the top of `src/components/forms/fields.tsx`.

## Design system

- Colors are defined in `src/app/globals.css` (`@theme` block): teal is the
  brand color, amber is the action color.
- Shared building blocks: `src/components/shared/` (PageHero, SectionHeading,
  CtaBand, StatGrid, Icons).
- The favicon (`src/app/icon.svg`) and social preview image
  (`src/app/opengraph-image.tsx`) are placeholders — replace with real
  brand assets when ready.
