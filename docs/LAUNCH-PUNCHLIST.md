# The MLC Project — Launch Punch-List

Prioritized list of what's left. The site is **live and public** as The MLC Project.
Items marked ⛔ block real functionality; ⚠️ are important; 💡 are polish.
(No credentials are stored in this file — the repo is public.)

## ⛔ P0 — needed before the public relies on the new brand
These are the things I *can't* do for you (they involve real-world accounts/records):

1. **Register the domain.** The site now references `makelanguagecasual.org` for
   its SEO/OpenGraph URL, but the live site is served from `msc-mscnonprofit.vercel.app`.
   Either register `makelanguagecasual.org` (or decide on `themlcproject.org`) and
   attach it as the Vercel custom domain, or tell me the real domain and I'll update `site.ts`.
2. **Set up the contact mailbox** `hello@makelanguagecasual.org` (referenced on the
   Contact page). Until it exists, the contact email is dead.
3. **Claim the social handles** `@makelanguagecasual` (Instagram) and `@makelanguagecasual`
   (YouTube), or give me the real handles.
4. **Enable member emails** — set `RESEND_API_KEY` + `MAIL_FROM` in Vercel. Without them,
   people can *join*, but the member sign-in link never sends, so the member dashboard /
   activity logging is unavailable in production.
5. **Real impact numbers** — the activity/impact figures (learners served, events,
   people reached, students/districts, grant). Give me the numbers and I'll populate
   `impactStats` in one edit so they render on the homepage + Impact page.

## ⚠️ P1 — important, soon
- **`CRON_SECRET`** in Vercel so the monthly member digest cron can authenticate.
- **EIN** — add the real EIN to `src/data/site.ts` (`ein`) for donor pages and legal.
- **Legal review** — `/privacy` and `/terms` are placeholders; have them reviewed.
- **Confirm the Zeffy donation form** URL in `site.ts` is the current, correct one.

## 💡 P2 — polish / my-side, on request
- **Roll the dark→light cinematic hero to the remaining pages** (About, Programs,
  Resources, Volunteer, Partners, Blog). Currently only Home / Impact / Become a Member
  use it. This is a taste call — say the word and I'll do it.
- **Content deepening for the rebrand** — broaden Spanish-specific copy to multilingual
  where appropriate, *without* erasing the real Spanish work (events, curriculum, ACTFL).
- **Accessibility audit** — a focused pass on alt text, aria, focus states, contrast.
- **Code/security review** of the membership + impact system before real users arrive.
- **Per-page OpenGraph images** (optional) for nicer link previews.

## ✅ Recently shipped (for reference)
- Rebrand: Make Spanish Casual (MSC) → The MLC Project (Make Language Casual, MLC);
  old name kept only in the founding-history/evolution copy.
- Membership + impact system, cinematic visual system, Tiers 1–3, route transitions,
  live ticker, understanding slider, accessibility preferences panel.
- Went public (`SITE_PUBLIC=true`) with a strong `ADMIN_PASSWORD` + `AUTH_SECRET`
  set in Vercel (the old code-default admin password no longer works — the new one
  is in your password manager).
- SEO: `sitemap.ts` + Organization JSON-LD in the layout.
- Colors: deeper hero background, two-tone teal→amber accents.
- Dark heroes now melt into the light content below.
