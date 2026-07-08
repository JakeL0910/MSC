// ---------------------------------------------------------------------------
// MSC BRAND KIT GENERATOR
//
// Produces every brand asset the team needs, into public/brand/:
//   • Logo SVGs (tile mark, white + mono variants) — pure paths, open anywhere
//   • Horizontal lockup PNGs (transparent, with real brand fonts)
//   • msc-brand-guidelines.pdf — the full brand guide
//   • msc-brand-kit.zip — everything above, zipped for easy sharing
//
// Run:  node scripts/generate-brand-kit.mjs
// The /brand page on the site links to these files.
// ---------------------------------------------------------------------------

import { chromium } from '/Users/Jake_/.nvm/versions/node/v22.17.0/lib/node_modules/playwright/index.mjs'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'brand')
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

// Brand tokens — keep in sync with src/app/globals.css @theme
const TEAL = '#1A6B72'
const TEAL_DARK = '#135459'
const TEAL_LIGHT = '#E8F4F5'
const AMBER = '#E8A020'
const AMBER_LIGHT = '#FEF3D0'
const CORAL = '#E05C4B'
const CREAM = '#F8F6F1'
const CHARCOAL = '#1C1C1E'
const VERSION = 'Version 1.0 · July 2026'

// ===========================================================================
// 1. LOGO SVGs (paths only — portable everywhere)
// ===========================================================================
const bubbles = (backFill, frontFill, frontStroke) => `
  <path d="M34 24 H44 A6 6 0 0 1 50 30 V36 A6 6 0 0 1 44 42 H42 L38 47 V42 H34 A6 6 0 0 1 28 36 V30 A6 6 0 0 1 34 24 Z" fill="${backFill}"/>
  <path d="M18 14 H34 A6 6 0 0 1 40 20 V28 A6 6 0 0 1 34 34 H26 L21 39 V34 H18 A6 6 0 0 1 12 28 V20 A6 6 0 0 1 18 14 Z" fill="${frontFill}"${
    frontStroke ? ` stroke="${frontStroke}" stroke-width="2" stroke-linejoin="round"` : ''
  }/>`

const svg = (inner, size = 64) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">${inner}\n</svg>\n`

const SVGS = {
  // Primary: teal tile, amber + white bubbles (matches the site header)
  'msc-logo-mark.svg': svg(
    `<rect width="64" height="64" rx="15" fill="${TEAL}"/>` + bubbles(AMBER, '#FFFFFF', TEAL),
  ),
  // For dark / teal backgrounds: no tile, white front bubble
  'msc-logo-mark-white.svg': svg(bubbles(AMBER, '#FFFFFF')),
  // For light backgrounds without the tile: teal front bubble
  'msc-logo-mark-color.svg': svg(bubbles(AMBER, TEAL)),
  // One-color uses (embroidery, stamps, faxes, engraving)
  'msc-logo-mark-mono.svg': svg(bubbles(CHARCOAL, CHARCOAL)),
}

for (const [name, content] of Object.entries(SVGS)) {
  fs.writeFileSync(path.join(OUT, name), content)
  console.log(`✓ ${name}`)
}

// ===========================================================================
// Shared: font loading for rendered assets (real brand fonts)
// ===========================================================================
const FONTS = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
`

const MARK_TILE = SVGS['msc-logo-mark.svg']
const MARK_WHITE = SVGS['msc-logo-mark-white.svg']

// ===========================================================================
// 2. HORIZONTAL LOCKUP PNGs (transparent background, @2x)
// ===========================================================================
function lockupHtml({ textColor, subColor, markSvg }) {
  return `<!doctype html><html><head>${FONTS}<style>
    * { margin:0; padding:0; }
    body { background: transparent; }
    .lockup { display:inline-flex; align-items:center; gap:22px; padding:8px; }
    .lockup svg { width:96px; height:96px; }
    .name { font-family:'Fraunces', serif; font-weight:700; font-size:52px; letter-spacing:-0.5px; color:${textColor}; line-height:1.05; }
    .sub { font-family:'Inter', sans-serif; font-weight:500; font-size:19px; color:${subColor}; margin-top:8px; letter-spacing:0.2px; }
  </style></head><body>
    <div class="lockup" id="lockup">
      ${markSvg}
      <div><div class="name">Multilingual Support Collective</div>
      <div class="sub">Language is access.</div></div>
    </div>
  </body></html>`
}

const PNG_JOBS = [
  { file: 'msc-logo-horizontal.png', html: lockupHtml({ textColor: CHARCOAL, subColor: TEAL, markSvg: MARK_TILE }) },
  { file: 'msc-logo-horizontal-white.png', html: lockupHtml({ textColor: '#FFFFFF', subColor: AMBER, markSvg: MARK_WHITE }) },
  { file: 'msc-logo-mark-512.png', html: `<!doctype html><html><head><style>*{margin:0}body{background:transparent}</style></head><body><div id="lockup" style="display:inline-block">${MARK_TILE.replace('width="64" height="64"', 'width="512" height="512"')}</div></body></html>` },
]

// ===========================================================================
// 3. BRAND GUIDELINES PDF
// ===========================================================================
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const swatch = (hex, name, use, dark) => `
  <div class="swatch">
    <div class="chip" style="background:${hex};${hex === CREAM || hex === TEAL_LIGHT || hex === AMBER_LIGHT ? 'border:1px solid #e2e8e7;' : ''}">
      <span style="color:${dark ? 'rgba(255,255,255,0.92)' : CHARCOAL}">${hex}</span>
    </div>
    <div class="swatch-name">${esc(name)}</div>
    <div class="swatch-use">${esc(use)}</div>
  </div>`

const voiceRow = (do_, dont) => `
  <tr><td class="do">${do_}</td><td class="dont">${dont}</td></tr>`

const GUIDE_HTML = `<!doctype html><html><head>${FONTS}<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  @page { size: letter; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family:'Inter', sans-serif; color:${CHARCOAL}; font-size:11px; line-height:1.65; }
  .page { page-break-after: always; padding: 12px 6px; }
  .page:last-child { page-break-after: auto; }

  /* cover */
  .cover { background:${TEAL}; color:#fff; border-radius:18px; padding:52px 48px; min-height:9.1in; display:flex; flex-direction:column; }
  .cover-top { display:flex; align-items:center; gap:16px; }
  .cover-top svg { width:56px; height:56px; }
  .cover-org { font-family:'Fraunces',serif; font-weight:600; font-size:17px; }
  .cover-orgsub { font-size:10.5px; color:rgba(255,255,255,0.75); }
  .cover-main { margin:auto 0; }
  .cover-kicker { font-size:11px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:${AMBER}; margin-bottom:14px; }
  .cover-title { font-family:'Fraunces',serif; font-weight:700; font-size:54px; line-height:1.06; letter-spacing:-1px; margin-bottom:18px; }
  .cover-sub { font-size:14px; color:rgba(255,255,255,0.85); max-width:430px; line-height:1.7; }
  .cover-foot { display:flex; justify-content:space-between; font-size:9.5px; color:rgba(255,255,255,0.65); }

  .kicker { font-size:9.5px; font-weight:700; letter-spacing:2.2px; text-transform:uppercase; color:${TEAL}; margin-bottom:6px; }
  h2 { font-family:'Fraunces',serif; font-weight:700; font-size:26px; letter-spacing:-0.4px; margin-bottom:12px; }
  h3 { font-family:'Fraunces',serif; font-weight:600; font-size:14.5px; margin:18px 0 6px; }
  p.lead { font-family:'Fraunces',serif; font-size:13.5px; line-height:1.75; color:#3e5257; max-width:560px; margin-bottom:10px; }
  p.body { color:#3e5257; max-width:580px; margin-bottom:8px; }
  .rule { height:3px; width:44px; background:${AMBER}; border-radius:2px; margin:14px 0 18px; }

  .quote { background:${TEAL_LIGHT}; border-left:4px solid ${TEAL}; border-radius:0 12px 12px 0; padding:14px 18px; font-family:'Fraunces',serif; font-size:14px; line-height:1.6; margin:10px 0 14px; max-width:560px; }
  .tag { font-family:'Fraunces',serif; font-weight:700; font-size:30px; color:${TEAL}; margin:6px 0 2px; }

  .pillars { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:12px; }
  .pillar { background:${CREAM}; border-radius:12px; padding:14px 16px; }
  .pillar b { display:block; font-family:'Fraunces',serif; font-size:13px; margin-bottom:3px; color:${TEAL_DARK}; }
  .pillar span { font-size:10.5px; color:#5f7377; }

  /* logo page */
  .logo-row { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin:12px 0 4px; }
  .logo-cell { border:1px solid #e2e8e7; border-radius:12px; padding:18px 10px 10px; text-align:center; }
  .logo-cell svg { width:64px; height:64px; }
  .logo-cell.dark { background:${TEAL}; border-color:${TEAL}; }
  .logo-cap { font-size:9px; color:#5f7377; margin-top:10px; }
  .logo-cell.dark .logo-cap { color:rgba(255,255,255,0.75); }
  .donts { columns:2; column-gap:24px; margin-top:8px; font-size:10.5px; color:#3e5257; }
  .donts li { margin:0 0 5px 14px; }

  /* colors */
  .palette { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin:12px 0; }
  .chip { height:74px; border-radius:12px; display:flex; align-items:flex-end; padding:8px 10px; font-size:9px; font-weight:600; }
  .swatch-name { font-weight:700; font-size:10.5px; margin-top:6px; }
  .swatch-use { font-size:9px; color:#5f7377; line-height:1.45; }

  /* typography */
  .type-card { border:1px solid #e2e8e7; border-radius:12px; padding:16px 18px; margin:10px 0; }
  .type-label { font-size:9px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase; color:${AMBER}; margin-bottom:6px; }
  .fraunces-demo { font-family:'Fraunces',serif; font-weight:700; font-size:24px; letter-spacing:-0.4px; }
  .inter-demo { font-size:12px; color:#3e5257; }

  /* voice */
  table.voice { width:100%; border-collapse:collapse; margin-top:10px; }
  table.voice th { text-align:left; font-size:9.5px; letter-spacing:1.5px; text-transform:uppercase; padding:6px 10px; }
  table.voice th:first-child { color:${TEAL}; } table.voice th:last-child { color:${CORAL}; }
  table.voice td { vertical-align:top; padding:8px 10px; font-size:10.5px; line-height:1.55; border-top:1px solid #eef1f0; width:50%; }
  td.do { background:${TEAL_LIGHT}40; } td.dont { color:#5f7377; }

  .boiler { background:${CREAM}; border-radius:12px; padding:14px 18px; margin:8px 0; font-size:10.5px; line-height:1.7; color:#3e5257; }
  .boiler b { display:block; color:${CHARCOAL}; margin-bottom:4px; font-size:10px; letter-spacing:1.2px; text-transform:uppercase; }
</style></head><body>

<div class="page"><section class="cover">
  <div class="cover-top">${MARK_WHITE}<div>
    <div class="cover-org">Multilingual Support Collective</div>
    <div class="cover-orgsub">Youth-led · 501(c)(3) nonprofit</div></div></div>
  <div class="cover-main">
    <div class="cover-kicker">Brand Guidelines</div>
    <h1 class="cover-title">How MSC looks, sounds, and shows up.</h1>
    <p class="cover-sub">One shared reference for everyone who makes something with the MSC name on it — volunteers, designers, partners, and press. When in doubt, come back here.</p>
  </div>
  <div class="cover-foot"><span>${VERSION}</span><span>multilingual support collective · brand kit</span></div>
</section></div>

<div class="page">
  <div class="kicker">01 · Foundation</div>
  <h2>Who we are</h2>
  <div class="rule"></div>
  <p class="lead">The Multilingual Support Collective (MSC) is a youth-led 501(c)(3) nonprofit bridging language gaps in healthcare, education, and community life.</p>
  <h3>Mission</h3>
  <div class="quote">MSC empowers communities through language access.</div>
  <h3>Vision</h3>
  <div class="quote">A world where language is never a barrier to health, education, or belonging.</div>
  <h3>Tagline</h3>
  <p class="tag">Language is access.</p>
  <p class="body">Use the tagline as a sign-off — under the logo, at the end of a video, on the back of a shirt. Secondary line for program materials: <i>“Real help, in real languages.”</i></p>
  <h3>What we stand on</h3>
  <div class="pillars">
    <div class="pillar"><b>Authentic language</b><span>Language as people actually speak it — practical, respectful, culturally grounded.</span></div>
    <div class="pillar"><b>Health &amp; education equity</b><span>Communication barriers are access barriers. Removing them is the mission, not a side effect.</span></div>
    <div class="pillar"><b>Free access</b><span>Every resource, program, and tool is free. No paywalls, no sign-up walls.</span></div>
    <div class="pillar"><b>Youth-led, community-driven</b><span>Built by student volunteers who grew up between languages, guided by adult advisors.</span></div>
  </div>
</div>

<div class="page">
  <div class="kicker">02 · Logo</div>
  <h2>The mark</h2>
  <div class="rule"></div>
  <p class="lead">Two overlapping speech bubbles: a conversation, and a collective. The rounded tile makes it feel like a tool you can pick up and use.</p>
  <div class="logo-row">
    <div class="logo-cell">${SVGS['msc-logo-mark.svg']}<div class="logo-cap"><b>Primary</b> — default on light backgrounds</div></div>
    <div class="logo-cell dark">${MARK_WHITE}<div class="logo-cap"><b>Reversed</b> — on teal or dark photos</div></div>
    <div class="logo-cell">${SVGS['msc-logo-mark-color.svg']}<div class="logo-cap"><b>No tile</b> — when the tile feels heavy</div></div>
    <div class="logo-cell">${SVGS['msc-logo-mark-mono.svg']}<div class="logo-cap"><b>Mono</b> — single-color printing</div></div>
  </div>
  <h3>Rules of thumb</h3>
  <ul class="donts">
    <li>Keep clear space around the mark equal to the height of one speech bubble.</li>
    <li>Minimum size: 24 px on screen, 0.3&quot; in print.</li>
    <li>Don't recolor the bubbles outside the brand palette.</li>
    <li>Don't stretch, rotate, outline, or add drop shadows.</li>
    <li>Don't place the primary tile version on teal — use the reversed mark.</li>
    <li>The full name should appear near the mark on first use; “MSC” alone is fine after that.</li>
  </ul>
  <h3>Files in this kit</h3>
  <p class="body">SVGs scale to any size (use for print &amp; web). PNGs are for slides, docs, and social. All in <b>/brand</b> on the website or the shared drive: <i>msc-logo-mark.svg, msc-logo-mark-white.svg, msc-logo-mark-color.svg, msc-logo-mark-mono.svg, msc-logo-horizontal.png, msc-logo-horizontal-white.png, msc-logo-mark-512.png</i>.</p>
</div>

<div class="page">
  <div class="kicker">03 · Color</div>
  <h2>Palette</h2>
  <div class="rule"></div>
  <p class="lead">Teal leads. Amber acts. Cream softens. Coral is reserved for warnings and errors — never decoration.</p>
  <div class="palette">
    ${swatch(TEAL, 'MSC Teal', 'Primary brand color. Headers, links, brand moments.', true)}
    ${swatch(TEAL_DARK, 'Teal Dark', 'Hover states, small text on light teal.', true)}
    ${swatch(TEAL_LIGHT, 'Teal Light', 'Tinted backgrounds, selected states.', false)}
    ${swatch(AMBER, 'MSC Amber', 'Action color — buttons and CTAs only. Charcoal text on top.', false)}
    ${swatch(AMBER_LIGHT, 'Amber Light', 'Highlight washes, callouts.', false)}
    ${swatch(CORAL, 'MSC Coral', 'Errors and alerts only.', true)}
    ${swatch(CREAM, 'Cream', 'Warm section backgrounds.', false)}
    ${swatch(CHARCOAL, 'Charcoal', 'Body text, near-black UI.', true)}
  </div>
  <h3>Accessibility</h3>
  <p class="body">Teal on white passes WCAG AA for text. Amber does <b>not</b> — never set text in amber on white; amber is a background for charcoal text. Body copy is charcoal or the warm grays derived from teal (see globals.css), never pure gray.</p>
</div>

<div class="page">
  <div class="kicker">04 · Typography</div>
  <h2>Type system</h2>
  <div class="rule"></div>
  <div class="type-card">
    <div class="type-label">Headings &amp; editorial — Fraunces</div>
    <div class="fraunces-demo">Language is the front door to everything</div>
    <p class="body" style="margin-top:6px">A warm, characterful serif. Used for every heading, large pull-quotes, and long-form reading. Weights 600–700 for headings. Google Fonts, free.</p>
  </div>
  <div class="type-card">
    <div class="type-label">Body &amp; UI — Inter</div>
    <div class="inter-demo">Body copy, buttons, forms, navigation, captions, and anything functional is set in Inter — clear at small sizes and neutral enough to let Fraunces carry the personality. Weights 400–700. Google Fonts, free.</div>
  </div>
  <h3>Rules</h3>
  <ul class="donts">
    <li>Never set body paragraphs in Fraunces below 13 px — it's a display face.</li>
    <li>Headings are tight (letter-spacing −0.015em), body is relaxed (line-height 1.6+).</li>
    <li>In Google Docs/Slides where Fraunces is unavailable, substitute Georgia; for Inter, use Arial.</li>
    <li>Eyebrow labels: Inter bold, ALL CAPS, wide letter-spacing, teal.</li>
  </ul>
</div>

<div class="page">
  <div class="kicker">05 · Voice</div>
  <h2>How MSC sounds</h2>
  <div class="rule"></div>
  <p class="lead">Direct and confident. Warm and communal. Purposeful — every sentence connects language to real life. We talk like a person, not a grant application.</p>
  <table class="voice">
    <thead><tr><th>✓ Sounds like us</th><th>✗ Doesn't</th></tr></thead>
    ${voiceRow('“Language barriers are linked to medication errors. Our phrase cards help.”', '“We leverage innovative solutions to empower diverse stakeholders.”')}
    ${voiceRow('“Free for every family, always.”', '“Complimentary access may be provided to qualifying individuals.”')}
    ${voiceRow('“Built by students who interpreted for their own families.”', '“Our team of passionate changemakers is disrupting language education.”')}
    ${voiceRow('“An hour a week moves the mission as much as any check.”', '“Consider engaging in impactful volunteerism opportunities.”')}
  </table>
  <h3>Boilerplate (copy-paste ready)</h3>
  <div class="boiler"><b>One-liner</b>The Multilingual Support Collective (MSC) is a youth-led 501(c)(3) nonprofit bridging language gaps in healthcare, education, and community life.</div>
  <div class="boiler"><b>Short paragraph</b>The Multilingual Support Collective (MSC) is a youth-led 501(c)(3) nonprofit that creates free multilingual resources, tutoring programs, and communication tools for families, students, and underserved communities. From bilingual healthcare phrase libraries to volunteer ESL tutoring, MSC works toward a world where language is never a barrier to health, education, or belonging. Everything MSC makes is free. Learn more at makespanishcasual.org.</div>
  <p class="body" style="margin-top:10px">Questions about using the brand? Email <b>hello@makespanishcasual.org</b>.</p>
</div>

</body></html>`

// ===========================================================================
// RENDER
// ===========================================================================
const browser = await chromium.launch()

for (const job of PNG_JOBS) {
  const page = await browser.newPage({ deviceScaleFactor: 2 })
  await page.setContent(job.html, { waitUntil: 'networkidle' })
  const el = page.locator('#lockup')
  await el.screenshot({ path: path.join(OUT, job.file), omitBackground: true })
  await page.close()
  console.log(`✓ ${job.file}`)
}

{
  const page = await browser.newPage()
  await page.setContent(GUIDE_HTML, { waitUntil: 'networkidle' })
  await page.pdf({
    path: path.join(OUT, 'msc-brand-guidelines.pdf'),
    format: 'letter',
    printBackground: true,
    margin: { top: '0.45in', bottom: '0.5in', left: '0.55in', right: '0.55in' },
  })
  await page.close()
  const kb = Math.round(fs.statSync(path.join(OUT, 'msc-brand-guidelines.pdf')).size / 1024)
  console.log(`✓ msc-brand-guidelines.pdf (${kb} KB)`)
}

await browser.close()

// Zip the whole kit for one-click team sharing
execSync(`cd "${OUT}" && rm -f msc-brand-kit.zip && zip -q msc-brand-kit.zip ${[
  ...Object.keys(SVGS),
  ...PNG_JOBS.map((j) => j.file),
  'msc-brand-guidelines.pdf',
].join(' ')}`)
console.log('✓ msc-brand-kit.zip')
console.log('Done.')
