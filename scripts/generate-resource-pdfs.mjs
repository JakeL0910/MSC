// ---------------------------------------------------------------------------
// MSC RESOURCE PDF GENERATOR
//
// Produces the downloadable PDFs for the Resource Hub. Content is written to be
// genuinely useful and accurate — real bilingual phrases, real checklists, real
// vocabulary — with restrained, editorial typography (serif body, sans headers).
//
// Run:  node scripts/generate-resource-pdfs.mjs
// Output: public/downloads/*.pdf
//
// To edit a document, change its content object below and re-run. Each entry in
// DOCS maps to one PDF; the `slug` becomes the filename.
// ---------------------------------------------------------------------------

import { chromium } from '/Users/Jake_/.nvm/versions/node/v22.17.0/lib/node_modules/playwright/index.mjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'downloads')
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

// Brand
const TEAL = '#1A6B72'
const TEAL_DK = '#134f54'
const AMBER = '#E8A020'
const INK = '#22303a'
const MUTE = '#5b6b73'
const LINE = '#dfe6e5'
const TEAL_WASH = '#eef5f5'
const AMBER_WASH = '#fbf1dd'

const VERSION = 'First edition · 2026'

// --- escaping ---------------------------------------------------------------
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// --- shared building blocks -------------------------------------------------
const LOGO = `
<svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="15" fill="#ffffff" fill-opacity="0.14"/>
  <path d="M34 24 H44 A6 6 0 0 1 50 30 V36 A6 6 0 0 1 44 42 H42 L38 47 V42 H34 A6 6 0 0 1 28 36 V30 A6 6 0 0 1 34 24 Z" fill="${AMBER}"/>
  <path d="M18 14 H34 A6 6 0 0 1 40 20 V28 A6 6 0 0 1 34 34 H26 L21 39 V34 H18 A6 6 0 0 1 12 28 V20 A6 6 0 0 1 18 14 Z" fill="#ffffff"/>
</svg>`

function cover({ kicker, title, subtitle, blurb }) {
  return `
  <section class="cover">
    <div class="cover-band">
      <div class="cover-brand">
        ${LOGO}
        <div>
          <div class="cover-org">Multilingual Support Collective</div>
          <div class="cover-orgsub">Youth-led · 501(c)(3) nonprofit</div>
        </div>
      </div>
    </div>
    <div class="cover-main">
      <div class="cover-kicker">${esc(kicker)}</div>
      <h1 class="cover-title">${esc(title)}</h1>
      <p class="cover-sub">${esc(subtitle)}</p>
      <div class="cover-rule"></div>
      <p class="cover-blurb">${esc(blurb)}</p>
    </div>
    <div class="cover-foot">
      <span>${VERSION}</span>
      <span>Free to print and share · Educational use</span>
    </div>
  </section>`
}

function section(kicker, title) {
  return `<div class="sec"><div class="kicker">${esc(kicker)}</div><h2>${esc(title)}</h2></div>`
}

function lead(t) {
  return `<p class="lead">${t}</p>`
}
function para(t) {
  return `<p class="body">${t}</p>`
}

function phraseTable(rows) {
  const body = rows
    .map(
      (r) => `<tr>
      <td class="en">${esc(r.en)}</td>
      <td class="es" lang="es">${esc(r.es)}</td>
      <td class="use">${esc(r.use)}</td>
    </tr>`
    )
    .join('')
  return `<table class="phr">
    <thead><tr><th>English</th><th>Español</th><th>When to use it</th></tr></thead>
    <tbody>${body}</tbody>
  </table>`
}

function twoCol(headers, rows) {
  const body = rows
    .map((r) => `<tr><td class="term">${esc(r[0])}</td><td class="def">${r[1]}</td></tr>`)
    .join('')
  return `<table class="two"><thead><tr><th>${esc(headers[0])}</th><th>${esc(
    headers[1]
  )}</th></tr></thead><tbody>${body}</tbody></table>`
}

function callout(kind, title, inner) {
  return `<div class="callout ${kind}"><div class="callout-title">${esc(title)}</div>${inner}</div>`
}

function checklist(items) {
  return `<ul class="check">${items
    .map((i) => `<li><span class="box"></span><span>${i}</span></li>`)
    .join('')}</ul>`
}

function dialogue(turns) {
  return `<div class="dialogue">${turns
    .map(
      (t) =>
        `<div class="turn"><div class="who ${t.who === 'You' ? 'you' : ''}">${esc(
          t.who
        )}</div><div class="say">${esc(t.say)}${
          t.note ? `<span class="say-note">${esc(t.note)}</span>` : ''
        }</div></div>`
    )
    .join('')}</div>`
}

function subhead(t) {
  return `<h3 class="sub">${esc(t)}</h3>`
}

// --- stylesheet -------------------------------------------------------------
const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: letter; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: Georgia, 'Times New Roman', serif;
    color: ${INK}; font-size: 11.5px; line-height: 1.62;
  }
  .sans { font-family: 'Helvetica Neue', Arial, sans-serif; }

  /* Cover */
  .cover { height: 9.7in; display: flex; flex-direction: column; page-break-after: always; }
  .cover-band { background: ${TEAL}; margin: -0.05in -0.1in 0; padding: 26px 30px; border-radius: 0 0 14px 14px; }
  .cover-brand { display: flex; align-items: center; gap: 14px; }
  .cover-org { font-family:'Helvetica Neue',Arial,sans-serif; color:#fff; font-size:15px; font-weight:700; letter-spacing:-0.2px; }
  .cover-orgsub { font-family:'Helvetica Neue',Arial,sans-serif; color:rgba(255,255,255,.7); font-size:9px; font-weight:600; text-transform:uppercase; letter-spacing:1.6px; margin-top:3px; }
  .cover-main { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 6px; }
  .cover-kicker { font-family:'Helvetica Neue',Arial,sans-serif; color:${TEAL}; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:3px; margin-bottom:18px; }
  .cover-title { font-size: 40px; line-height:1.08; font-weight:700; color:${INK}; letter-spacing:-0.5px; }
  .cover-sub { font-size: 16px; color:${MUTE}; margin-top:16px; font-style:italic; max-width: 5.4in; }
  .cover-rule { width:54px; height:4px; background:${AMBER}; border-radius:2px; margin:26px 0 22px; }
  .cover-blurb { font-size: 12px; color:${INK}; max-width: 5in; line-height:1.7; }
  .cover-foot { display:flex; justify-content:space-between; border-top:1px solid ${LINE}; padding-top:12px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9.5px; color:${MUTE}; text-transform:uppercase; letter-spacing:0.8px; }

  /* Sections */
  .sec { margin: 24px 0 12px; }
  .sec:first-of-type { margin-top: 4px; }
  .kicker { font-family:'Helvetica Neue',Arial,sans-serif; color:${TEAL}; font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:2.4px; margin-bottom:5px; }
  h2 { font-size:19px; font-weight:700; color:${INK}; letter-spacing:-0.3px; padding-bottom:9px; border-bottom:2px solid ${TEAL}; }
  h3.sub { font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; font-weight:700; color:${TEAL_DK}; margin:16px 0 6px; }
  p.lead { font-size:12.5px; color:${INK}; margin:10px 0; line-height:1.7; }
  p.body { margin:8px 0; color:#33424b; }
  a { color:${TEAL}; }

  /* Phrase table */
  table { width:100%; border-collapse:collapse; margin:12px 0 6px; }
  table.phr th { background:${TEAL}; color:#fff; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1px; text-align:left; padding:7px 10px; }
  table.phr td { padding:8px 10px; border-bottom:1px solid ${LINE}; vertical-align:top; }
  table.phr tr:nth-child(even) td { background:${TEAL_WASH}; }
  td.en { font-weight:700; color:${INK}; width:33%; }
  td.es { color:${TEAL_DK}; width:33%; font-style:italic; }
  td.use { color:${MUTE}; font-size:10px; width:34%; }

  /* Two-column glossary table */
  table.two th { text-align:left; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:${TEAL}; padding:6px 10px; border-bottom:2px solid ${TEAL}; }
  table.two td { padding:8px 10px; border-bottom:1px solid ${LINE}; vertical-align:top; }
  td.term { font-weight:700; color:${INK}; width:32%; }
  td.def { color:#33424b; }

  /* Callouts */
  .callout { border-radius:10px; padding:14px 16px; margin:14px 0; }
  .callout .callout-title { font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:1.4px; margin-bottom:6px; }
  .callout.teal { background:${TEAL_WASH}; border-left:4px solid ${TEAL}; }
  .callout.teal .callout-title { color:${TEAL}; }
  .callout.amber { background:${AMBER_WASH}; border-left:4px solid ${AMBER}; }
  .callout.amber .callout-title { color:#a9700c; }
  .callout p { font-size:11px; color:#33424b; margin:4px 0; }
  .callout .say-line { font-style:italic; color:${TEAL_DK}; }

  /* Checklist */
  ul.check { list-style:none; margin:10px 0; }
  ul.check li { display:flex; align-items:flex-start; gap:10px; padding:5px 0; font-size:11.5px; color:#33424b; }
  ul.check .box { flex:0 0 auto; width:13px; height:13px; border:1.5px solid ${TEAL}; border-radius:3px; margin-top:2px; }

  /* Dialogue */
  .dialogue { margin:10px 0; border:1px solid ${LINE}; border-radius:10px; overflow:hidden; }
  .dialogue .turn { display:flex; gap:12px; padding:9px 14px; border-bottom:1px solid ${LINE}; }
  .dialogue .turn:last-child { border-bottom:none; }
  .dialogue .turn:nth-child(even) { background:#fafbfb; }
  .dialogue .who { flex:0 0 58px; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; font-weight:700; color:${MUTE}; text-transform:uppercase; letter-spacing:0.5px; padding-top:1px; }
  .dialogue .who.you { color:${TEAL}; }
  .dialogue .say { color:${INK}; }
  .dialogue .say-note { display:block; font-size:9.5px; color:${MUTE}; font-style:italic; margin-top:2px; }

  .cols { display:flex; gap:20px; }
  .cols > * { flex:1; }
  .pb { page-break-before: always; }
  .note { font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; color:${MUTE}; margin-top:6px; }
  .steps { counter-reset: step; list-style:none; margin:10px 0; }
  .steps li { position:relative; padding:6px 0 6px 34px; font-size:11.5px; color:#33424b; border-bottom:1px solid ${LINE}; }
  .steps li:before { counter-increment: step; content: counter(step); position:absolute; left:0; top:6px; width:22px; height:22px; background:${TEAL_WASH}; color:${TEAL}; font-family:'Helvetica Neue',Arial,sans-serif; font-weight:800; font-size:11px; border-radius:6px; display:flex; align-items:center; justify-content:center; }
`

function doc(bodyHtml) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${bodyHtml}</body></html>`
}

// ===========================================================================
// DOCUMENT CONTENT
// ===========================================================================

// 1) CLINIC VISIT PHRASEBOOK ------------------------------------------------
const phrases = {
  Appointments: [
    { en: 'I would like to make an appointment.', es: 'Quisiera hacer una cita.', use: 'Scheduling by phone or at the front desk.' },
    { en: 'This is my first visit.', es: 'Esta es mi primera visita.', use: 'New patients usually arrive early for forms.' },
    { en: 'I need to cancel my appointment.', es: 'Necesito cancelar mi cita.', use: 'Call early — offices may have a cancellation policy.' },
    { en: 'Do you have anything earlier?', es: '¿Tiene algo más temprano?', use: 'Asking for a sooner date or time.' },
    { en: 'I’m here for my two o’clock appointment.', es: 'Vengo a mi cita de las dos.', use: 'Checking in when you arrive.' },
  ],
  'At the clinic': [
    { en: 'It hurts here.', es: 'Me duele aquí.', use: 'Point to the area as you say it.' },
    { en: 'The pain started three days ago.', es: 'El dolor empezó hace tres días.', use: 'Providers almost always ask when it began.' },
    { en: 'I take medication for high blood pressure.', es: 'Tomo medicamento para la presión alta.', use: 'Bring a list of your medications.' },
    { en: 'I am allergic to penicillin.', es: 'Soy alérgico/a a la penicilina.', use: 'State allergies early; swap in your own.' },
    { en: 'Could you explain that more slowly, please?', es: '¿Podría explicarlo más despacio, por favor?', use: 'It is always okay to ask a provider to slow down.' },
    { en: 'What are the next steps?', es: '¿Cuáles son los siguientes pasos?', use: 'A good closing question before you leave.' },
  ],
  Pharmacy: [
    { en: 'I’m picking up a prescription.', es: 'Vengo a recoger una receta.', use: 'Have your name and date of birth ready.' },
    { en: 'How many times a day do I take this?', es: '¿Cuántas veces al día tomo esto?', use: 'Confirm the dosage before leaving.' },
    { en: 'Should I take it with food?', es: '¿Debo tomarlo con comida?', use: 'Some medicines work best with or without food.' },
    { en: 'Is there a generic version?', es: '¿Hay una versión genérica?', use: 'Generics are usually much less expensive.' },
    { en: 'I need a refill.', es: 'Necesito un resurtido de mi receta.', use: 'The label shows how many refills remain.' },
  ],
  'Insurance & billing': [
    { en: 'Do you accept my insurance?', es: '¿Aceptan mi seguro?', use: 'Ask before the visit; show your card.' },
    { en: 'How much is the copay?', es: '¿Cuánto es el copago?', use: 'The fixed amount you pay at the visit.' },
    { en: 'Can I get an itemized bill?', es: '¿Me puede dar una factura detallada?', use: 'Lists every charge — useful for spotting errors.' },
    { en: 'Do you offer a payment plan?', es: '¿Ofrecen un plan de pagos?', use: 'Many clinics offer plans if you ask.' },
  ],
  'Asking for help': [
    { en: 'I would like an interpreter, please.', es: 'Quisiera un intérprete, por favor.', use: 'You can ask — many facilities must provide one.' },
    { en: 'Could you write that down for me?', es: '¿Me lo puede escribir, por favor?', use: 'Written notes are easier to review later.' },
    { en: 'I don’t understand. Could you repeat that?', es: 'No entiendo. ¿Puede repetirlo?', use: 'Never leave with unanswered confusion.' },
    { en: 'Is this information available in Spanish?', es: '¿Esta información está disponible en español?', use: 'Many offices have translated materials.' },
  ],
}

const phrasebook = doc(
  cover({
    kicker: 'Healthcare Spanish',
    title: 'Clinic Visit Phrasebook',
    subtitle: 'Practical Spanish–English phrases for a medical appointment, from check-in to checkout.',
    blurb:
      'A pocket reference for patients, families, and volunteers. Print it, fold it, and bring it to your next visit. Every phrase is paired with a plain note on when to use it.',
  }) +
    section('How to use this', 'Reading this phrasebook') +
    lead(
      'Phrases are grouped by the moment you’ll need them — scheduling, the exam room, the pharmacy, the billing desk, and asking for help. Each row gives the English, the Spanish, and a short note. Words like <em>alérgico/a</em> change with gender: use <em>-o</em> if you are male, <em>-a</em> if female.'
    ) +
    callout(
      'amber',
      'You can ask for an interpreter',
      `<p>In many U.S. healthcare settings, providers that receive federal funding are required to offer free language assistance, including interpreters. You do not have to bring your own, and you should never be asked to rely on a child to interpret.</p><p class="say-line">“Quisiera un intérprete, por favor.” — I would like an interpreter, please.</p>`
    ) +
    Object.entries(phrases)
      .map(([cat, rows], i) => (i === 2 ? '<div class="pb"></div>' : '') + section('Phrases', cat) + phraseTable(rows))
      .join('') +
    callout(
      'teal',
      'Before you go — a 30-second checklist',
      `<p>Bring a list of your current medications and doses · Write down your top two or three questions · Bring your insurance card and photo ID · If you take notes, ask the provider to spell or write key words.</p>`
    ) +
    `<p class="note">This phrasebook supports everyday communication and is not medical advice or a substitute for a professional interpreter. Reviewed by MSC bilingual volunteers.</p>`
)

// 2) FAMILY LANGUAGE TOOLKIT -------------------------------------------------
const familyToolkit = doc(
  cover({
    kicker: 'Parent & Family Communication',
    title: 'Family Language Toolkit',
    subtitle: 'Practical guides for parents navigating school and health settings in more than one language.',
    blurb:
      'Short, plain-language guides for the moments that matter most: requesting an interpreter, preparing for a parent–teacher conference, getting ready for a checkup, and decoding the forms schools send home.',
  }) +
    section('Start here', 'Your right to understand') +
    lead(
      'You are your family’s strongest advocate — and you do not have to do it in a language you are still learning, alone. Two systems families deal with most, schools and healthcare, both have obligations to communicate with you in a way you understand.'
    ) +
    twoCol(
      ['Setting', 'What you can generally ask for'],
      [
        ['Healthcare', 'Free interpretation and key documents in your language at providers that receive federal funding. Ask: <em>“Quisiera un intérprete.”</em>'],
        ['Public schools', 'An interpreter for meetings and translation of essential information about your child’s education. Ask the front office what is available.'],
      ]
    ) +
    callout(
      'amber',
      'One phrase worth memorizing',
      `<p class="say-line">“We would like an interpreter, please.” · “Quisiéramos un intérprete, por favor.”</p><p>Say it early — at the front desk, on the phone, or at the start of a meeting — rather than waiting until you are lost.</p>`
    ) +
    `<div class="pb"></div>` +
    section('Guide 1', 'Preparing for a parent–teacher conference') +
    para('Conferences are short — often ten to fifteen minutes. A little preparation lets you use that time for what matters.') +
    subhead('Bring these') +
    checklist([
      'A notebook and your child’s most recent report card or progress report',
      'Your top three questions, written down in advance',
      'A request for an interpreter if you want one — made when you schedule',
    ]) +
    subhead('Good questions to ask') +
    checklist([
      'Is my child on track for their grade level in reading and math?',
      'What is one thing my child does well, and one thing to work on?',
      'How can I support this learning at home?',
      'How would you prefer I contact you, and how often?',
    ]) +
    twoCol(
      ['You may hear…', 'It usually means…'],
      [
        ['“Benchmark” / “grade level”', 'The skill target expected for your child’s grade at this point in the year.'],
        ['“Below / approaching / meets”', 'How your child is doing against that target — not a final judgment.'],
        ['“Intervention”', 'Extra support the school provides. Usually a good thing; ask what it involves.'],
      ]
    ) +
    `<div class="pb"></div>` +
    section('Guide 2', 'Getting ready for a checkup') +
    para('Families who prepare before a medical visit consistently report better, calmer appointments. This works for a child’s visit or your own.') +
    checklist([
      'Write down symptoms and when they started (dates help more than “a while ago”)',
      'List current medications, vitamins, and doses — a phone photo of each bottle works',
      'Note any allergies and past reactions',
      'Prepare two or three questions; you will not remember them all in the moment',
      'Bring your insurance card and, for children, the vaccine record',
    ]) +
    callout(
      'teal',
      'If a child is being asked to interpret',
      `<p>It is common but not required, and for medical conversations it puts children in a hard position. You can decline and request a professional interpreter instead — it is your right, and it protects your child.</p>`
    ) +
    section('Guide 3', 'Decoding common school forms') +
    twoCol(
      ['Term on the form', 'What it means'],
      [
        ['Permission / consent slip', 'Your signature allowing your child to do an activity, like a field trip.'],
        ['Free & reduced-price meals', 'A program that lowers or removes school meal costs for families who qualify.'],
        ['IEP / 504 plan', 'A written plan of extra support or accommodations for a student who needs them.'],
        ['Emergency contact', 'Who the school calls if they cannot reach you — list someone who speaks English if you can.'],
        ['Home Language Survey', 'Asks what languages you speak at home; it helps the school offer language services.'],
      ]
    ) +
    `<p class="note">Educational guidance only, not legal advice. Rules vary by state and institution — when in doubt, ask the school or provider directly. Reviewed by MSC volunteers.</p>`
)

// 3) EVERYDAY ENGLISH STARTER PACK ------------------------------------------
const eslPack = doc(
  cover({
    kicker: 'ESL Learning',
    title: 'Everyday English Starter Pack',
    subtitle: 'Practical English for real situations — greetings, phone calls, and appointments.',
    blurb:
      'A beginner’s collection built around everyday moments rather than grammar drills. Use it on your own or with an MSC tutor. Practice the dialogues out loud; that is where confidence comes from.',
  }) +
    section('Unit 1', 'Greetings & introductions') +
    twoCol(
      ['Phrase', 'Use it to…'],
      [
        ['“Hello, my name is ___.”', 'introduce yourself to anyone.'],
        ['“Nice to meet you.”', 'respond warmly to an introduction.'],
        ['“Could you repeat that, please?”', 'ask someone to say it again — the most useful phrase here.'],
        ['“How do you spell that?”', 'get names and addresses right.'],
        ['“I’m still learning English.”', 'kindly set expectations; most people slow down.'],
      ]
    ) +
    section('Unit 2', 'Making a phone call') +
    para('Phone calls are hard in a new language — you lose gestures and facial cues. A short script helps.') +
    dialogue([
      { who: 'Office', say: 'Good morning, Dr. Lee’s office.' },
      { who: 'You', say: 'Hello. I would like to make an appointment, please.' },
      { who: 'Office', say: 'Sure. Have you been here before?' },
      { who: 'You', say: 'No, this is my first time.', note: 'New patients usually arrive 15 minutes early.' },
      { who: 'Office', say: 'Can you come Tuesday at 3:00?' },
      { who: 'You', say: 'Could you repeat that, please? … Tuesday at three. Yes, thank you.' },
    ]) +
    `<div class="pb"></div>` +
    section('Unit 3', 'At an appointment') +
    dialogue([
      { who: 'Staff', say: 'What brings you in today?' },
      { who: 'You', say: 'I have a sore throat. It started three days ago.' },
      { who: 'Staff', say: 'Any fever?' },
      { who: 'You', say: 'A little. I don’t understand — could you explain that more slowly?' },
      { who: 'Staff', say: 'Of course. Is your pain mild, medium, or severe?' },
      { who: 'You', say: 'Medium. What are the next steps?' },
    ]) +
    section('Unit 4', 'Numbers, dates & time you’ll use constantly') +
    twoCol(
      ['Category', 'Worth practicing'],
      [
        ['Your details', 'phone number, date of birth, and address — slowly and clearly.'],
        ['Days & times', '“Tuesday at 3:00,” “next Monday,” “in the morning / afternoon.”'],
        ['Money', '“How much is it?”, “Do you take cards?”, “copay,” “total.”'],
        ['Quantities', '“once a day,” “twice a day,” “every eight hours.”'],
      ]
    ) +
    callout(
      'teal',
      'How to practice this pack',
      `<p>Read each dialogue out loud three times. Then cover the “You” lines and try them from memory. With a tutor, take turns playing each role and swap in your own real details.</p>`
    ) +
    `<p class="note">A starter resource used by MSC volunteer tutors. Free to copy and adapt for non-commercial learning.</p>`
)

// 4) VOLUNTEER TUTOR TRAINING TOOLKIT ---------------------------------------
const tutorToolkit = doc(
  cover({
    kicker: 'Volunteer Toolkits',
    title: 'Volunteer Tutor Training Toolkit',
    subtitle: 'Everything a new MSC tutor needs for a confident, useful first session.',
    blurb:
      'You do not need a teaching degree to make a real difference for an English learner. You need patience, consistency, and a simple structure. This toolkit gives you all three.',
  }) +
    section('Before you begin', 'Getting ready for your first session') +
    checklist([
      'Confirm the time, place (or video link), and your learner’s first name',
      'Ask MSC what your learner’s main goal is — work, school, appointments, daily life',
      'Prepare one simple activity and one backup; do not over-plan',
      'Arrive a few minutes early and bring something to write with and on',
    ]) +
    section('The session', 'A simple 30-minute structure') +
    `<ol class="steps">
      <li><strong>Warm up (5 min).</strong> Greet, ask how their week was, and let them talk. This lowers nerves and is itself real practice.</li>
      <li><strong>Set the focus (2 min).</strong> Name one thing you’ll work on today, tied to their goal: “Let’s practice calling to make an appointment.”</li>
      <li><strong>Practice together (15 min).</strong> Model it once, do it together, then let them try while you support. Roleplay real situations.</li>
      <li><strong>Use it for real (5 min).</strong> Have them do it once more, as independently as they can. Praise specifics.</li>
      <li><strong>Wrap up (3 min).</strong> Recap the one thing you practiced, suggest a small task before next time, and confirm the next session.</li>
    </ol>` +
    `<div class="pb"></div>` +
    section('The craft', 'Culturally responsive tutoring') +
    `<div class="cols">
      <div>${subhead('Do')}${checklist([
        'Let silence sit — thinking takes time in a new language',
        'Correct gently and selectively; pick what matters most',
        'Build on what your learner already knows',
        'Follow their goals, not a rigid curriculum',
        'Assume competence, always',
      ])}</div>
      <div>${subhead('Don’t')}${checklist([
        'Correct every single error — it discourages',
        'Treat an accent as a problem to fix',
        'Speak louder instead of slower and clearer',
        'Fill every pause; give room to respond',
        'Overload a session with new material',
      ])}</div>
    </div>` +
    section('When it happens', 'Handling common moments') +
    twoCol(
      ['If…', 'Try…'],
      [
        ['Your learner goes quiet', 'wait, then simplify the question or offer two choices to pick from.'],
        ['You don’t know an answer', 'say “Great question — let me find out and tell you next time.” Honesty builds trust.'],
        ['They keep making one error', 'note it, and gently focus one short activity on just that next session.'],
        ['A session falls flat', 'that’s normal. Consistency over weeks matters more than any single meeting.'],
      ]
    ) +
    callout(
      'teal',
      'Logging your hours',
      `<p>After each session, record the date, length, and a one-line note on what you practiced. MSC verifies these hours for school service requirements, NHS, and similar programs.</p>`
    ) +
    `<p class="note">Part of MSC volunteer onboarding. Every tutor completes this toolkit before their first session.</p>`
)

// 5) COMMUNICATION ACCESS SCORECARD -----------------------------------------
const scorecardItems = [
  ['Are your public materials written at an accessible reading level (roughly 6th–8th grade)?', 'Most adults, in any language, understand plain language best.'],
  ['Are your most important documents available in the languages your community speaks?', 'Even translating your top three documents removes a major barrier.'],
  ['Does a second bilingual reader review translations before you publish them?', 'A quick second review catches errors machine translation misses.'],
  ['Do your materials avoid jargon and acronyms, or explain them when unavoidable?', 'Terms like “EOB” or “RSVP” are invisible walls for many readers.'],
  ['Does every notice state a clear next step — who to contact, where, by when?', 'Understanding a message only helps if people know what to do next.'],
  ['Do you use visuals — icons, photos, maps — to support key information?', 'Visual support helps readers at every literacy level and language.'],
  ['Can families reach a real person who can help in their language?', 'An English-only phone tree can undo everything your materials get right.'],
  ['Is your signage understandable to someone who reads limited English?', 'Arrows, symbols, and translated headers make spaces navigable.'],
  ['Do you tell your community, in their language, that language help exists?', 'People can’t request an interpreter they don’t know is available.'],
  ['Have you asked multilingual families for feedback in the past year?', 'The people using your materials are the best judges of whether they work.'],
]

const scorecard = doc(
  cover({
    kicker: 'Community Guides',
    title: 'Communication Access Scorecard',
    subtitle: 'A ten-question self-assessment for schools, clinics, libraries, and nonprofits.',
    blurb:
      'How easy is your organization’s communication to understand — and how accessible is it to the multilingual families you serve? Work through the ten questions, tally your score, and use the guide to decide what to improve first.',
  }) +
    section('How it works', 'Using this scorecard') +
    lead(
      'For each question, check <strong>Yes</strong>, <strong>Partly</strong>, or <strong>No</strong>, and jot a note. Count one point for every “Yes.” Then read the scoring guide. This is a self-assessment to spark improvement — not a formal compliance audit.'
    ) +
    `<table class="two" style="margin-top:14px">
      <thead><tr><th style="width:56%">Question</th><th style="width:20%">Y · Partly · N</th><th style="width:24%">Notes</th></tr></thead>
      <tbody>
      ${scorecardItems
        .map(
          (q, i) => `<tr>
          <td class="def"><strong>${i + 1}.</strong> ${esc(q[0])}<div class="note" style="margin-top:3px">${esc(q[1])}</div></td>
          <td class="def" style="letter-spacing:2px; color:${MUTE}">▢ &nbsp; ▢ &nbsp; ▢</td>
          <td class="def" style="border-bottom:1px solid ${LINE}">&nbsp;</td>
        </tr>`
        )
        .join('')}
      </tbody>
    </table>` +
    `<div class="pb"></div>` +
    section('Your result', 'Scoring guide') +
    twoCol(
      ['Score', 'What it suggests'],
      [
        ['9–10 · Strong', 'Strong access habits. Keep gathering community feedback — needs change as communities do.'],
        ['6–8 · Good start', 'Several things are working, but a few gaps are likely blocking families. Start with the unchecked items on your most-used documents.'],
        ['0–5 · Big opportunity', 'Real room to grow — and the good news is that small changes (plain-language rewrites, translating your top documents) have outsized impact.'],
      ]
    ) +
    section('Next steps', 'Turning a score into a plan') +
    `<ol class="steps">
      <li><strong>Pick your three most-used documents.</strong> The intake form, the welcome flyer, the appointment reminder — start where volume is highest.</li>
      <li><strong>Fix reading level first.</strong> Shorter sentences, everyday words, one clear next step. It’s the fastest, cheapest win.</li>
      <li><strong>Translate what matters most,</strong> and have a second bilingual reader check it.</li>
      <li><strong>Ask five families</strong> whether they understood — then believe what they tell you.</li>
    </ol>` +
    callout(
      'teal',
      'MSC can help',
      `<p>Our volunteers assist community organizations with plain-language rewrites, translation review, and communication-access checks — at no cost. Reach us at hello@makespanishcasual.org.</p>`
    ) +
    `<p class="note">An educational self-assessment from the Multilingual Support Collective. Not a legal or compliance audit.</p>`
)

// ===========================================================================
// RENDER
// ===========================================================================
const DOCS = [
  { slug: 'clinic-visit-phrasebook', title: 'Clinic Visit Phrasebook', html: phrasebook },
  { slug: 'family-language-toolkit', title: 'Family Language Toolkit', html: familyToolkit },
  { slug: 'everyday-english-starter-pack', title: 'Everyday English Starter Pack', html: eslPack },
  { slug: 'volunteer-tutor-training-toolkit', title: 'Volunteer Tutor Training Toolkit', html: tutorToolkit },
  { slug: 'communication-access-scorecard', title: 'Communication Access Scorecard', html: scorecard },
]

const footerTemplate = (title) => `
  <div style="width:100%; font-family:'Helvetica Neue',Arial,sans-serif; font-size:7.5px; color:#8a979d; padding:0 0.55in; display:flex; justify-content:space-between; align-items:center;">
    <span>MSC · Multilingual Support Collective</span>
    <span>${esc(title)} · Educational resource, not medical advice</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`

const browser = await chromium.launch()
for (const d of DOCS) {
  const page = await browser.newPage()
  await page.setContent(d.html, { waitUntil: 'networkidle' })
  await page.pdf({
    path: path.join(OUT, `${d.slug}.pdf`),
    format: 'letter',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: footerTemplate(d.title),
    margin: { top: '0.5in', bottom: '0.55in', left: '0.55in', right: '0.55in' },
  })
  await page.close()
  const kb = Math.round(fs.statSync(path.join(OUT, `${d.slug}.pdf`)).size / 1024)
  console.log(`✓ ${d.slug}.pdf (${kb} KB)`)
}
await browser.close()
console.log('Done.')
