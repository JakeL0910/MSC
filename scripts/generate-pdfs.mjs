import { chromium } from '/Users/Jake_/.nvm/versions/node/v22.17.0/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const T = '#1A6B72';   // teal
const A = '#E8A020';   // amber
const C = '#E05C4B';   // coral
const CR = '#F8F6F1';  // cream
const CH = '#1C1C1E';  // charcoal
const TL = '#E8F4F5';  // teal light
const AL = '#FDF3E3';  // amber light
const CL = '#FDECEA';  // coral light

const BASE_STYLE = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, 'Segoe UI', Arial, sans-serif; color: ${CH}; background: white; }
  @page { margin: 0; size: letter; }
`;

// ─── DOCUMENT 1: ORG OVERVIEW ONE-PAGER ─────────────────────────────────────

const overview = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
${BASE_STYLE}
.page { width:816px; min-height:1056px; display:flex; flex-direction:column; }
.header { background:${T}; padding:36px 48px 32px; }
.header-top { display:flex; align-items:flex-start; justify-content:space-between; }
.org-name { font-size:28px; font-weight:800; color:white; letter-spacing:-0.5px; }
.org-sub { font-size:11px; color:rgba(255,255,255,0.7); font-weight:600; text-transform:uppercase; letter-spacing:1.5px; margin-top:4px; }
.tagline { font-size:18px; color:rgba(255,255,255,0.9); font-style:italic; margin-top:14px; }
.badge { background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); border-radius:20px; padding:4px 12px; font-size:10px; font-weight:700; color:white; text-transform:uppercase; letter-spacing:1px; }
.body { flex:1; padding:36px 48px 24px; }
.section-label { font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:${T}; margin-bottom:8px; }
.section-title { font-size:18px; font-weight:700; color:${CH}; margin-bottom:12px; }
.body-text { font-size:12px; line-height:1.65; color:#444; }
.mission-block { background:${CR}; border-left:4px solid ${A}; border-radius:0 8px 8px 0; padding:18px 20px; margin-bottom:28px; }
.mission-text { font-size:13px; line-height:1.7; color:${CH}; font-style:italic; }
.programs-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:28px; }
.program-card { border:1.5px solid #e5e7eb; border-radius:10px; padding:16px; }
.program-number { font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:${T}; margin-bottom:6px; }
.program-name { font-size:13px; font-weight:700; color:${CH}; margin-bottom:6px; line-height:1.3; }
.program-desc { font-size:10.5px; line-height:1.55; color:#555; }
.program-tag { display:inline-block; background:${TL}; color:${T}; font-size:9px; font-weight:700; padding:2px 8px; border-radius:10px; margin-top:8px; text-transform:uppercase; letter-spacing:0.5px; }
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:28px; }
.stat-box { background:${CR}; border-radius:8px; padding:14px; text-align:center; }
.stat-num { font-size:22px; font-weight:800; color:${T}; }
.stat-label { font-size:9.5px; color:#666; margin-top:3px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; }
.who-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:28px; }
.who-item { display:flex; align-items:flex-start; gap:10px; }
.who-dot { width:8px; height:8px; border-radius:50%; background:${A}; flex-shrink:0; margin-top:4px; }
.who-text { font-size:11.5px; color:#444; line-height:1.4; }
.who-label { font-weight:700; color:${CH}; display:block; }
.cta-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
.cta-card { background:${T}; border-radius:10px; padding:14px 16px; text-align:center; }
.cta-card.amber { background:${A}; }
.cta-card.outline { background:white; border:2px solid ${T}; }
.cta-head { font-size:11px; font-weight:800; color:white; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; }
.cta-card.outline .cta-head { color:${T}; }
.cta-card.amber .cta-head { color:${CH}; }
.cta-sub { font-size:10px; color:rgba(255,255,255,0.8); }
.cta-card.amber .cta-sub { color:rgba(28,28,30,0.65); }
.cta-card.outline .cta-sub { color:#555; }
.footer { background:${CH}; padding:16px 48px; display:flex; align-items:center; justify-content:space-between; }
.footer-url { font-size:13px; font-weight:700; color:white; }
.footer-contact { font-size:11px; color:rgba(255,255,255,0.65); }
.footer-legal { font-size:9.5px; color:rgba(255,255,255,0.4); text-align:right; }
</style></head><body>
<div class="page">
  <div class="header">
    <div class="header-top">
      <div>
        <div class="org-name">Make Spanish Casual</div>
        <div class="org-sub">Language Access · 501(c)3 Nonprofit · Est. 2023</div>
      </div>
      <div style="display:flex;gap:8px;padding-top:4px;">
        <span class="badge">Free</span>
        <span class="badge">DFW-Based</span>
      </div>
    </div>
    <div class="tagline">"Language is access."</div>
  </div>

  <div class="body">
    <div class="section-label">Our Mission</div>
    <div class="mission-block">
      <div class="mission-text">Make Spanish Casual advances equitable language access by providing free, culturally authentic Spanish education — with a particular focus on healthcare settings where language barriers directly affect the quality and safety of care.</div>
    </div>

    <div class="section-label">Three Programs. One Mission.</div>
    <div class="programs-grid">
      <div class="program-card">
        <div class="program-number">Program 01</div>
        <div class="program-name">Healthcare Spanish Initiative</div>
        <div class="program-desc">Free training in culturally authentic medical Spanish for pre-health students, providers, and community health workers. Built on language acquisition research and designed for where communication failures cost lives.</div>
        <span class="program-tag">HSI</span>
      </div>
      <div class="program-card" style="border-color:${A}30;">
        <div class="program-number" style="color:${A};">Program 02</div>
        <div class="program-name">Community Learning Platform</div>
        <div class="program-desc">Free courses, resources, games, and cultural content for any learner who wants to connect with the Spanish actually spoken in communities — not textbook Spanish.</div>
        <span class="program-tag" style="background:${AL};color:#8B5E0A;">CLP</span>
      </div>
      <div class="program-card" style="border-color:${C}30;">
        <div class="program-number" style="color:${C};">Program 03</div>
        <div class="program-name">Language Access Advocacy</div>
        <div class="program-desc">Community events, policy advocacy, and partnerships that advance language access as a civil right — working across healthcare, education, and civic spaces in the DFW area and beyond.</div>
        <span class="program-tag" style="background:${CL};color:#8B2A1E;">LAA</span>
      </div>
    </div>

    <div class="section-label">By the Numbers</div>
    <div class="stats-row">
      <div class="stat-box"><div class="stat-num">100%</div><div class="stat-label">Free — Always</div></div>
      <div class="stat-box"><div class="stat-num">501(c)3</div><div class="stat-label">Registered Nonprofit</div></div>
      <div class="stat-box"><div class="stat-num">12+</div><div class="stat-label">Free Resources</div></div>
      <div class="stat-box"><div class="stat-num">3</div><div class="stat-label">Active Programs</div></div>
    </div>

    <div class="section-label">Who We Serve</div>
    <div class="who-grid" style="margin-bottom:24px;">
      <div class="who-item"><div class="who-dot"></div><div class="who-text"><span class="who-label">Pre-Health Students</span>Future providers learning the language their patients actually speak</div></div>
      <div class="who-item"><div class="who-dot"></div><div class="who-text"><span class="who-label">Healthcare Providers</span>Physicians, nurses, and CHWs seeking cultural communication skills</div></div>
      <div class="who-item"><div class="who-dot"></div><div class="who-text"><span class="who-label">General Learners</span>Anyone who wants authentic, culturally grounded Spanish</div></div>
      <div class="who-item"><div class="who-dot"></div><div class="who-text"><span class="who-label">Heritage Speakers</span>Learners building on home-language knowledge</div></div>
      <div class="who-item"><div class="who-dot"></div><div class="who-text"><span class="who-label">Educators</span>Teachers integrating cultural and healthcare contexts</div></div>
      <div class="who-item"><div class="who-dot"></div><div class="who-text"><span class="who-label">Organizations</span>Healthcare systems, universities, schools seeking language equity</div></div>
    </div>

    <div class="section-label">Get Involved</div>
    <div class="cta-row">
      <div class="cta-card">
        <div class="cta-head">Learn</div>
        <div class="cta-sub">Access all courses and resources free at makespanishcasual.org</div>
      </div>
      <div class="cta-card outline">
        <div class="cta-head">Partner</div>
        <div class="cta-sub">Bring MSC's programs to your organization or institution</div>
      </div>
      <div class="cta-card amber">
        <div class="cta-head">Donate</div>
        <div class="cta-sub">Support free language access programs for all</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>
      <div class="footer-url">makespanishcasual.org</div>
      <div class="footer-contact">jake@makespanishcasual.org</div>
    </div>
    <div class="footer-legal">Make Spanish Casual · 501(c)3 Nonprofit<br>Donations are tax-deductible to the extent permitted by law.</div>
  </div>
</div>
</body></html>`;

// ─── DOCUMENT 2: HEALTHCARE SPANISH INITIATIVE ──────────────────────────────

const hsi = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
${BASE_STYLE}
.page { width:816px; min-height:1056px; display:flex; flex-direction:column; }
.header { background:${T}; padding:40px 48px 36px; }
.pre-label { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:2.5px; color:rgba(255,255,255,0.65); margin-bottom:10px; }
.main-title { font-size:32px; font-weight:800; color:white; line-height:1.15; letter-spacing:-0.5px; margin-bottom:10px; }
.sub-title { font-size:14px; color:rgba(255,255,255,0.8); line-height:1.5; max-width:480px; }
.header-tags { display:flex; gap:8px; margin-top:20px; flex-wrap:wrap; }
.tag { background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); border-radius:20px; padding:4px 12px; font-size:10px; font-weight:700; color:white; text-transform:uppercase; letter-spacing:0.8px; }
.body { flex:1; padding:36px 48px 20px; }
.two-col { display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-bottom:28px; }
.section-label { font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:${T}; margin-bottom:8px; }
.section-title { font-size:16px; font-weight:700; color:${CH}; margin-bottom:10px; }
.body-text { font-size:11.5px; line-height:1.65; color:#444; }
.problem-box { background:#FFF5F4; border-left:4px solid ${C}; border-radius:0 8px 8px 0; padding:16px 18px; margin-bottom:16px; }
.problem-text { font-size:11px; line-height:1.6; color:#444; }
.problem-quote { font-style:italic; font-size:12.5px; color:${C}; font-weight:600; margin-bottom:6px; }
.modules { margin-bottom:28px; }
.module-item { display:flex; gap:14px; align-items:flex-start; padding:12px 0; border-bottom:1px solid #f0f0f0; }
.module-item:last-child { border-bottom:none; }
.module-num { width:28px; height:28px; border-radius:50%; background:${T}; color:white; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.module-name { font-size:12.5px; font-weight:700; color:${CH}; margin-bottom:3px; }
.module-desc { font-size:10.5px; color:#555; line-height:1.5; }
.for-whom { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:28px; }
.whom-item { background:${CR}; border-radius:8px; padding:12px; }
.whom-title { font-size:11.5px; font-weight:700; color:${CH}; margin-bottom:4px; }
.whom-text { font-size:10px; color:#555; line-height:1.45; }
.outcomes { background:${T}; border-radius:12px; padding:22px 24px; margin-bottom:24px; }
.outcome-title { font-size:13px; font-weight:700; color:white; margin-bottom:14px; }
.outcome-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.outcome-item { display:flex; align-items:flex-start; gap:8px; }
.outcome-check { width:16px; height:16px; border-radius:50%; background:${A}; flex-shrink:0; margin-top:1px; }
.outcome-text { font-size:10.5px; color:rgba(255,255,255,0.9); line-height:1.4; }
.enroll-box { background:${A}; border-radius:12px; padding:18px 24px; display:flex; align-items:center; justify-content:space-between; }
.enroll-text { font-size:14px; font-weight:700; color:${CH}; }
.enroll-sub { font-size:11px; color:rgba(28,28,30,0.7); margin-top:2px; }
.enroll-url { font-size:13px; font-weight:800; color:${CH}; text-decoration:none; }
.footer { background:${CH}; padding:14px 48px; display:flex; align-items:center; justify-content:space-between; }
.footer-brand { font-size:13px; font-weight:700; color:white; }
.footer-url { font-size:11px; color:rgba(255,255,255,0.6); }
.footer-legal { font-size:9px; color:rgba(255,255,255,0.35); text-align:right; }
</style></head><body>
<div class="page">
  <div class="header">
    <div class="pre-label">Make Spanish Casual · Program 01</div>
    <div class="main-title">Healthcare Spanish<br>Initiative</div>
    <div class="sub-title">Free training in culturally authentic medical Spanish for the next generation of healthcare providers, students, and community health workers.</div>
    <div class="header-tags">
      <span class="tag">Free Enrollment</span>
      <span class="tag">Pre-Health Students</span>
      <span class="tag">Healthcare Providers</span>
      <span class="tag">Community Health Workers</span>
      <span class="tag">Research-Backed</span>
    </div>
  </div>

  <div class="body">
    <div class="two-col">
      <div>
        <div class="section-label">The Problem</div>
        <div class="section-title">Vocabulary isn't enough.</div>
        <div class="problem-box">
          <div class="problem-quote">"Me cayó el estómago."</div>
          <div class="problem-text">A patient says this — meaning they feel a deep sense of dread or foreboding, communicated through a culturally specific idiom. A provider trained only in medical Spanish hears stomach pain. This gap costs lives.</div>
        </div>
        <div class="body-text">Medical Spanish programs teach anatomical terms and clinical phrases. That's necessary — but not sufficient. Language barriers in healthcare are not vocabulary problems. They are cultural competence problems. When a patient defers to a family member, describes pain through metaphor, or says "sí" to avoid confrontation rather than to signal understanding, a provider needs more than a glossary.</div>
      </div>
      <div>
        <div class="section-label">Who It's For</div>
        <div class="section-title">Built for the people on the front lines.</div>
        <div class="for-whom">
          <div class="whom-item">
            <div class="whom-title">Pre-Health Students</div>
            <div class="whom-text">Medical, nursing, PA, and public health students building clinical communication skills early</div>
          </div>
          <div class="whom-item">
            <div class="whom-title">Healthcare Providers</div>
            <div class="whom-text">Physicians, NPs, nurses, and medical assistants serving Spanish-speaking patient populations</div>
          </div>
          <div class="whom-item">
            <div class="whom-title">Community Health Workers</div>
            <div class="whom-text">CHWs and promotores working in community health navigation and patient advocacy</div>
          </div>
          <div class="whom-item">
            <div class="whom-title">Residents & Fellows</div>
            <div class="whom-text">Trainees in clinical settings who need authentic patient communication skills immediately</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-label">Curriculum — Five Modules</div>
    <div class="modules">
      <div class="module-item">
        <div class="module-num">1</div>
        <div><div class="module-name">Colloquial vs. Clinical: Why the Gap Matters</div><div class="module-desc">Introduction to the difference between textbook medical Spanish and the Spanish patients actually speak — with real case examples from clinical encounters.</div></div>
      </div>
      <div class="module-item">
        <div class="module-num">2</div>
        <div><div class="module-name">Cultural Communication Norms</div><div class="module-desc">Indirect communication, familismo, pain expression through idiom, and avoiding confrontation — the cultural patterns that change what patients mean vs. what they say.</div></div>
      </div>
      <div class="module-item">
        <div class="module-num">3</div>
        <div><div class="module-name">Patient Intake & History Taking</div><div class="module-desc">Practice authentic intake conversations using language a Spanish-speaking patient would actually use. Includes slang expressions for symptoms, body parts, and feelings.</div></div>
      </div>
      <div class="module-item">
        <div class="module-num">4</div>
        <div><div class="module-name">Mental Health & Sensitive Topics</div><div class="module-desc">Culturally sensitive approaches to mental health check-ins, including idioms around emotion, indirect disclosure patterns, and stigma navigation in Spanish.</div></div>
      </div>
      <div class="module-item">
        <div class="module-num">5</div>
        <div><div class="module-name">Regional Variation & Demographic Competence</div><div class="module-desc">Spanish is not one language. This module covers the major regional differences in slang, expression, and cultural norm across Mexican, Caribbean, and South American Spanish.</div></div>
      </div>
    </div>

    <div class="outcomes">
      <div class="outcome-title">Learning Outcomes</div>
      <div class="outcome-grid">
        <div class="outcome-item"><div class="outcome-check"></div><div class="outcome-text">Recognize colloquial symptom expressions patients actually use</div></div>
        <div class="outcome-item"><div class="outcome-check"></div><div class="outcome-text">Navigate culturally indirect communication patterns</div></div>
        <div class="outcome-item"><div class="outcome-check"></div><div class="outcome-text">Conduct authentic patient intake conversations in Spanish</div></div>
        <div class="outcome-item"><div class="outcome-check"></div><div class="outcome-text">Adapt communication for regional and cultural variation</div></div>
      </div>
    </div>

    <div class="enroll-box">
      <div>
        <div class="enroll-text">Enroll free — no credit card, no application, no waitlist.</div>
        <div class="enroll-sub">Create a free account and start immediately at makespanishcasual.org</div>
      </div>
      <div class="enroll-url">makespanishcasual.org/programs/healthcare-spanish</div>
    </div>
  </div>

  <div class="footer">
    <div><div class="footer-brand">Make Spanish Casual</div><div class="footer-url">jake@makespanishcasual.org · makespanishcasual.org</div></div>
    <div class="footer-legal">501(c)3 Nonprofit · All programs are free · Language is access.</div>
  </div>
</div>
</body></html>`;

// ─── DOCUMENT 3: RESOURCE CATALOG ───────────────────────────────────────────

const catalog = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
${BASE_STYLE}
.page { width:816px; min-height:1056px; display:flex; flex-direction:column; }
.header { background:${T}; padding:36px 48px 30px; }
.pre-label { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:2.5px; color:rgba(255,255,255,0.65); margin-bottom:8px; }
.main-title { font-size:30px; font-weight:800; color:white; letter-spacing:-0.5px; margin-bottom:8px; }
.sub-title { font-size:13px; color:rgba(255,255,255,0.8); line-height:1.5; }
.header-row { display:flex; align-items:flex-end; justify-content:space-between; margin-top:16px; }
.header-note { font-size:11px; color:rgba(255,255,255,0.7); }
.body { flex:1; padding:32px 48px 20px; }
.cat-section { margin-bottom:24px; }
.cat-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; padding-bottom:8px; border-bottom:2px solid #f0f0f0; }
.cat-icon { width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
.cat-name { font-size:14px; font-weight:800; color:${CH}; }
.cat-count { font-size:10px; font-weight:700; color:#888; text-transform:uppercase; letter-spacing:1px; }
.resources-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; }
.resource-card { border:1.5px solid #e8eaec; border-radius:8px; padding:12px; }
.resource-badges { display:flex; gap:6px; margin-bottom:8px; }
.badge-diff { font-size:8.5px; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; padding:2px 8px; border-radius:10px; }
.beginner { background:${TL}; color:${T}; }
.intermediate { background:${AL}; color:#8B5E0A; }
.advanced { background:${CL}; color:#8B2A1E; }
.badge-type { font-size:8.5px; font-weight:700; text-transform:uppercase; background:#f3f4f6; color:#666; padding:2px 8px; border-radius:10px; }
.resource-title { font-size:11.5px; font-weight:700; color:${CH}; margin-bottom:4px; line-height:1.3; }
.resource-desc { font-size:9.5px; color:#555; line-height:1.5; }
.resource-meta { margin-top:8px; font-size:9px; color:#888; display:flex; align-items:center; gap:8px; }
.resource-rating { color:${A}; font-weight:700; }
.access-bar { background:${T}; border-radius:10px; padding:18px 24px; display:flex; align-items:center; justify-content:space-between; }
.access-text { font-size:13px; font-weight:700; color:white; }
.access-sub { font-size:10.5px; color:rgba(255,255,255,0.75); margin-top:2px; }
.access-url { font-size:12px; font-weight:800; color:${A}; }
.footer { background:${CH}; padding:14px 48px; display:flex; align-items:center; justify-content:space-between; }
.footer-brand { font-size:12px; font-weight:700; color:white; }
.footer-url { font-size:10px; color:rgba(255,255,255,0.55); }
.footer-legal { font-size:9px; color:rgba(255,255,255,0.35); text-align:right; }
</style></head><body>
<div class="page">
  <div class="header">
    <div class="pre-label">Make Spanish Casual</div>
    <div class="main-title">Free Resource Catalog</div>
    <div class="sub-title">All resources are free, accessible online without a subscription, and focused on authentic, culturally grounded Spanish.</div>
    <div class="header-row">
      <div class="header-note">12 resources across 4 types · Beginner to Advanced · Free forever</div>
      <div style="display:flex;gap:8px;">
        <span style="background:rgba(255,255,255,0.15);border-radius:20px;padding:3px 10px;font-size:9.5px;font-weight:700;color:white;">Lessons</span>
        <span style="background:rgba(255,255,255,0.15);border-radius:20px;padding:3px 10px;font-size:9.5px;font-weight:700;color:white;">Activities</span>
        <span style="background:rgba(255,255,255,0.15);border-radius:20px;padding:3px 10px;font-size:9.5px;font-weight:700;color:white;">Games</span>
        <span style="background:rgba(255,255,255,0.15);border-radius:20px;padding:3px 10px;font-size:9.5px;font-weight:700;color:white;">Quizzes</span>
      </div>
    </div>
  </div>

  <div class="body">
    <div class="cat-section">
      <div class="cat-header">
        <div class="cat-icon" style="background:${TL};color:${T};">📖</div>
        <span class="cat-name">Lessons</span>
        <span class="cat-count">3 lessons</span>
      </div>
      <div class="resources-grid">
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff beginner">Beginner</span><span class="badge-type">Lesson</span></div>
          <div class="resource-title">Why "Me Cayó el Estómago" Matters</div>
          <div class="resource-desc">How colloquial body language phrases change clinical complaints — and why textbook Spanish misses this entirely in patient care.</div>
          <div class="resource-meta"><span>25 min</span><span class="resource-rating">★ 4.9</span><span>Healthcare</span></div>
        </div>
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff intermediate">Intermediate</span><span class="badge-type">Lesson</span></div>
          <div class="resource-title">Regional Slang: Mexico, Caribbean, and Southern Cone</div>
          <div class="resource-desc">Major regional differences in slang, accent, and expression across the Spanish-speaking world. Spanish is not one language.</div>
          <div class="resource-meta"><span>40 min</span><span class="resource-rating">★ 4.7</span><span>Culture</span></div>
        </div>
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff beginner">Beginner</span><span class="badge-type">Lesson</span></div>
          <div class="resource-title">Spanish in the Digital World</div>
          <div class="resource-desc">Texting abbreviations, social media slang, and internet culture in Spanish — the layer of language no classroom teaches.</div>
          <div class="resource-meta"><span>20 min</span><span class="resource-rating">★ 4.6</span><span>Slang</span></div>
        </div>
      </div>
    </div>

    <div class="cat-section">
      <div class="cat-header">
        <div class="cat-icon" style="background:${AL};color:#8B5E0A;">✏️</div>
        <span class="cat-name">Activities</span>
        <span class="cat-count">3 activities</span>
      </div>
      <div class="resources-grid">
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff intermediate">Intermediate</span><span class="badge-type">Activity</span></div>
          <div class="resource-title">Patient Intake Roleplay</div>
          <div class="resource-desc">Practice a full clinical intake conversation using authentic language a Spanish-speaking patient would actually use in a real appointment.</div>
          <div class="resource-meta"><span>30 min</span><span class="resource-rating">★ 4.9</span><span>Healthcare</span></div>
        </div>
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff beginner">Beginner</span><span class="badge-type">Activity</span></div>
          <div class="resource-title">Everyday Conversations: At the Mercado</div>
          <div class="resource-desc">Navigate a market conversation with a native speaker. Practice bargaining, complimenting, and small talk in natural Spanish.</div>
          <div class="resource-meta"><span>20 min</span><span class="resource-rating">★ 4.6</span><span>Conversation</span></div>
        </div>
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff advanced">Advanced</span><span class="badge-type">Activity</span></div>
          <div class="resource-title">Mental Health Check-in Script</div>
          <div class="resource-desc">Culturally sensitive mental health check-ins in Spanish, including idioms around emotion and indirect communication styles.</div>
          <div class="resource-meta"><span>35 min</span><span class="resource-rating">★ 4.8</span><span>Healthcare</span></div>
        </div>
      </div>
    </div>

    <div class="cat-section">
      <div class="cat-header">
        <div class="cat-icon" style="background:${CL};color:${C};">🎮</div>
        <span class="cat-name">Games</span>
        <span class="cat-count">3 games</span>
      </div>
      <div class="resources-grid">
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff beginner">Beginner</span><span class="badge-type">Game</span></div>
          <div class="resource-title">Spanish Slang Blitz</div>
          <div class="resource-desc">Race against the clock to match everyday slang with their meanings. Learn expressions you'd actually hear in the street.</div>
          <div class="resource-meta"><span>10 min</span><span class="resource-rating">★ 4.8</span><span>Slang</span></div>
        </div>
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff intermediate">Intermediate</span><span class="badge-type">Game</span></div>
          <div class="resource-title">Colloquial vs. Clinical: Spot the Difference</div>
          <div class="resource-desc">A matching game that builds intuition for when to use formal medical Spanish vs. everyday colloquial expressions with patients.</div>
          <div class="resource-meta"><span>15 min</span><span class="resource-rating">★ 4.7</span><span>Healthcare</span></div>
        </div>
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff advanced">Advanced</span><span class="badge-type">Game</span></div>
          <div class="resource-title">Barrio Slang Word Scramble</div>
          <div class="resource-desc">Unscramble real street slang from across the Spanish-speaking world. Includes regional variants and cultural context.</div>
          <div class="resource-meta"><span>12 min</span><span class="resource-rating">★ 4.5</span><span>Slang</span></div>
        </div>
      </div>
    </div>

    <div class="cat-section" style="margin-bottom:20px;">
      <div class="cat-header">
        <div class="cat-icon" style="background:${TL};color:${T};">📋</div>
        <span class="cat-name">Quizzes</span>
        <span class="cat-count">3 quizzes</span>
      </div>
      <div class="resources-grid">
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff beginner">Beginner</span><span class="badge-type">Quiz</span></div>
          <div class="resource-title">Cultural Competence: True or False</div>
          <div class="resource-desc">Challenge common misconceptions about Spanish-speaking cultures, healthcare beliefs, and communication norms.</div>
          <div class="resource-meta"><span>10 min</span><span class="resource-rating">★ 4.8</span><span>Culture</span></div>
        </div>
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff intermediate">Intermediate</span><span class="badge-type">Quiz</span></div>
          <div class="resource-title">Slang or Formal? Know the Register</div>
          <div class="resource-desc">Quick-fire quiz: Is this expression slang, colloquial, or formal? Build the register awareness that fluency requires.</div>
          <div class="resource-meta"><span>15 min</span><span class="resource-rating">★ 4.5</span><span>Slang</span></div>
        </div>
        <div class="resource-card">
          <div class="resource-badges"><span class="badge-diff advanced">Advanced</span><span class="badge-type">Quiz</span></div>
          <div class="resource-title">Healthcare Spanish Vocabulary Check</div>
          <div class="resource-desc">Test your command of authentic clinical Spanish — including the colloquial terms patients use that providers often miss.</div>
          <div class="resource-meta"><span>20 min</span><span class="resource-rating">★ 4.3</span><span>Healthcare</span></div>
        </div>
      </div>
    </div>

    <div class="access-bar">
      <div>
        <div class="access-text">Access all resources free — no account required to browse.</div>
        <div class="access-sub">Create a free account to track progress and get notified when new resources are added.</div>
      </div>
      <div class="access-url">makespanishcasual.org/resources</div>
    </div>
  </div>

  <div class="footer">
    <div><div class="footer-brand">Make Spanish Casual · Free Resource Catalog</div><div class="footer-url">makespanishcasual.org · jake@makespanishcasual.org</div></div>
    <div class="footer-legal">501(c)3 Nonprofit · All resources are free · Language is access.</div>
  </div>
</div>
</body></html>`;

// ─── DOCUMENT 4: PARTNERSHIP GUIDE ──────────────────────────────────────────

const partnership = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
${BASE_STYLE}
.page { width:816px; min-height:1056px; display:flex; flex-direction:column; }
.header { background:${T}; padding:40px 48px 34px; }
.pre-label { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:2.5px; color:rgba(255,255,255,0.65); margin-bottom:8px; }
.main-title { font-size:32px; font-weight:800; color:white; letter-spacing:-0.5px; margin-bottom:10px; }
.sub-title { font-size:13px; color:rgba(255,255,255,0.8); max-width:520px; line-height:1.6; }
.body { flex:1; padding:36px 48px 20px; }
.section-label { font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:${T}; margin-bottom:8px; }
.section-title { font-size:17px; font-weight:700; color:${CH}; margin-bottom:14px; }
.intro-text { font-size:12px; line-height:1.65; color:#444; margin-bottom:28px; }
.partners-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:28px; }
.partner-card { border:1.5px solid #e8eaec; border-radius:10px; padding:18px; }
.partner-card.featured { border-color:${T}; background:${TL}; }
.partner-type { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:${T}; margin-bottom:8px; }
.partner-card.featured .partner-type { color:${T}; }
.partner-name { font-size:14px; font-weight:700; color:${CH}; margin-bottom:8px; }
.partner-list { list-style:none; }
.partner-list li { font-size:10.5px; color:#555; line-height:1.5; padding:3px 0; display:flex; align-items:flex-start; gap:6px; }
.partner-list li::before { content:"→"; color:${T}; font-weight:700; flex-shrink:0; }
.process { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:28px; }
.step { text-align:center; padding:16px; }
.step-num { width:36px; height:36px; border-radius:50%; background:${T}; color:white; font-size:14px; font-weight:800; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; }
.step-name { font-size:12.5px; font-weight:700; color:${CH}; margin-bottom:6px; }
.step-desc { font-size:10.5px; color:#555; line-height:1.5; }
.step-arrow { display:flex; align-items:center; justify-content:center; padding-top:18px; font-size:20px; color:#ccc; }
.process-wrapper { display:grid; grid-template-columns:1fr 24px 1fr 24px 1fr; gap:0; align-items:start; margin-bottom:28px; }
.what-we-bring { background:${CR}; border-radius:12px; padding:22px 24px; margin-bottom:24px; }
.bring-title { font-size:13px; font-weight:700; color:${CH}; margin-bottom:14px; }
.bring-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.bring-item { display:flex; align-items:flex-start; gap:8px; }
.bring-dot { width:7px; height:7px; border-radius:50%; background:${A}; flex-shrink:0; margin-top:4px; }
.bring-text { font-size:11px; color:#444; line-height:1.45; }
.contact-box { background:${T}; border-radius:12px; padding:20px 24px; display:flex; align-items:center; justify-content:space-between; }
.contact-left { }
.contact-title { font-size:14px; font-weight:700; color:white; margin-bottom:4px; }
.contact-sub { font-size:11px; color:rgba(255,255,255,0.75); }
.contact-right { text-align:right; }
.contact-name { font-size:13px; font-weight:700; color:white; }
.contact-email { font-size:11.5px; color:${A}; margin-top:3px; }
.contact-url { font-size:11px; color:rgba(255,255,255,0.7); margin-top:2px; }
.footer { background:${CH}; padding:14px 48px; display:flex; align-items:center; justify-content:space-between; }
.footer-brand { font-size:12px; font-weight:700; color:white; }
.footer-url { font-size:10px; color:rgba(255,255,255,0.55); }
.footer-legal { font-size:9px; color:rgba(255,255,255,0.35); text-align:right; }
</style></head><body>
<div class="page">
  <div class="header">
    <div class="pre-label">Make Spanish Casual · Partnerships</div>
    <div class="main-title">Partner with MSC</div>
    <div class="sub-title">We work with healthcare systems, universities, schools, and community organizations that share our commitment to equitable language access. Every partnership is free to join — we bring the curriculum, you bring the community.</div>
  </div>

  <div class="body">
    <div class="section-label">Why Partner with MSC</div>
    <div class="intro-text">Language barriers in healthcare settings contribute to misdiagnosis, reduced treatment adherence, patient safety events, and health disparities. MSC's programs address the root problem: healthcare providers and systems lack access to culturally authentic language education. A partnership with MSC brings that education directly to your students, staff, or community — at zero cost.</div>

    <div class="section-label">Partnership Types</div>
    <div class="partners-grid">
      <div class="partner-card featured">
        <div class="partner-type">Healthcare Organizations</div>
        <div class="partner-name">Hospitals, Clinics & Health Systems</div>
        <ul class="partner-list">
          <li>Deploy HSI training to clinical staff and residents</li>
          <li>Co-develop culturally competent Spanish content for your patient population</li>
          <li>Promote MSC to pre-health students in your pipeline programs</li>
          <li>Use MSC resources in orientation and continuing education</li>
        </ul>
      </div>
      <div class="partner-card">
        <div class="partner-type">Universities & Medical Schools</div>
        <div class="partner-name">Higher Education Institutions</div>
        <ul class="partner-list">
          <li>Integrate HSI curriculum into pre-health or public health coursework</li>
          <li>Pursue research partnerships on language acquisition and health outcomes</li>
          <li>License MSC content for your institutional learning management system</li>
          <li>Co-present research at ACTFL, APHA, or clinical education conferences</li>
        </ul>
      </div>
      <div class="partner-card">
        <div class="partner-type">K–12 Schools & Districts</div>
        <div class="partner-name">Secondary Education</div>
        <ul class="partner-list">
          <li>Supplement Spanish curricula with authentic cultural and slang content</li>
          <li>Run MSC as an extracurricular or after-school program</li>
          <li>Access free resources for heritage Spanish speaker support</li>
          <li>Partner for college-prep healthcare pathway programs</li>
        </ul>
      </div>
      <div class="partner-card">
        <div class="partner-type">Community Organizations</div>
        <div class="partner-name">Nonprofits & Community Groups</div>
        <ul class="partner-list">
          <li>Bring MSC's advocacy programs to your community events</li>
          <li>Use free resources in community health worker training</li>
          <li>Co-host language access workshops in the DFW area</li>
          <li>Collaborate on language equity policy and advocacy</li>
        </ul>
      </div>
    </div>

    <div class="section-label">What MSC Brings to the Partnership</div>
    <div class="what-we-bring">
      <div class="bring-title">We provide — at no cost to partners:</div>
      <div class="bring-grid">
        <div class="bring-item"><div class="bring-dot"></div><div class="bring-text">Research-backed curriculum built on language acquisition and cultural competence research</div></div>
        <div class="bring-item"><div class="bring-dot"></div><div class="bring-text">Free learner accounts with progress tracking for all participants</div></div>
        <div class="bring-item"><div class="bring-dot"></div><div class="bring-text">Custom implementation support and onboarding for your organization</div></div>
        <div class="bring-item"><div class="bring-dot"></div><div class="bring-text">Co-branding and promotional support for your partnership</div></div>
        <div class="bring-item"><div class="bring-dot"></div><div class="bring-text">Content co-development for organization-specific language needs</div></div>
        <div class="bring-item"><div class="bring-dot"></div><div class="bring-text">Access to MSC's growing network of language access advocates</div></div>
      </div>
    </div>

    <div class="section-label">How to Get Started</div>
    <div class="process-wrapper" style="margin-bottom:24px;">
      <div class="step"><div class="step-num">1</div><div class="step-name">Reach Out</div><div class="step-desc">Email Jake Li at jake@makespanishcasual.org or submit an inquiry at makespanishcasual.org/partner</div></div>
      <div class="step-arrow">→</div>
      <div class="step"><div class="step-num">2</div><div class="step-name">Discovery Call</div><div class="step-desc">30-minute call to understand your organization's needs and identify the best partnership structure</div></div>
      <div class="step-arrow">→</div>
      <div class="step"><div class="step-num">3</div><div class="step-name">Launch</div><div class="step-desc">Custom implementation plan, account setup for your team, and dedicated onboarding support</div></div>
    </div>

    <div class="contact-box">
      <div class="contact-left">
        <div class="contact-title">Ready to bring language equity to your organization?</div>
        <div class="contact-sub">Partnerships are free. We move fast. Reach out to start a conversation.</div>
      </div>
      <div class="contact-right">
        <div class="contact-name">Jake Li, CEO & Founder</div>
        <div class="contact-email">jake@makespanishcasual.org</div>
        <div class="contact-url">makespanishcasual.org/partner</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div><div class="footer-brand">Make Spanish Casual · Partnership Guide</div><div class="footer-url">makespanishcasual.org · jake@makespanishcasual.org</div></div>
    <div class="footer-legal">501(c)3 Nonprofit · All programs are free · Language is access.</div>
  </div>
</div>
</body></html>`;

// ─── DOCUMENT 5: DONATION IMPACT SHEET ──────────────────────────────────────

const donation = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
${BASE_STYLE}
.page { width:816px; min-height:1056px; display:flex; flex-direction:column; }
.header { background:${T}; padding:40px 48px 34px; }
.pre-label { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:2.5px; color:rgba(255,255,255,0.65); margin-bottom:8px; }
.main-title { font-size:32px; font-weight:800; color:white; letter-spacing:-0.5px; margin-bottom:10px; }
.sub-title { font-size:13px; color:rgba(255,255,255,0.8); max-width:540px; line-height:1.6; }
.trust-row { display:flex; gap:10px; margin-top:20px; }
.trust-badge { background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); border-radius:20px; padding:4px 14px; font-size:10px; font-weight:700; color:white; text-transform:uppercase; letter-spacing:0.8px; }
.body { flex:1; padding:36px 48px 20px; }
.section-label { font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:${T}; margin-bottom:8px; }
.section-title { font-size:17px; font-weight:700; color:${CH}; margin-bottom:12px; }
.why-text { font-size:12px; line-height:1.65; color:#444; margin-bottom:8px; }
.quote-block { border-left:4px solid ${A}; padding:14px 18px; background:${CR}; border-radius:0 8px 8px 0; margin-bottom:28px; }
.quote-text { font-size:12.5px; font-style:italic; color:${CH}; line-height:1.6; }
.impact-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:28px; }
.impact-card { border-radius:12px; padding:22px 20px; display:flex; gap:16px; align-items:flex-start; }
.impact-card.t1 { background:${TL}; }
.impact-card.t2 { background:${AL}; }
.impact-card.t3 { background:${CL}; }
.impact-card.t4 { background:#F0F0FF; }
.amount-badge { width:56px; height:56px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; flex-shrink:0; }
.t1 .amount-badge { background:${T}; color:white; }
.t2 .amount-badge { background:${A}; color:${CH}; }
.t3 .amount-badge { background:${C}; color:white; }
.t4 .amount-badge { background:#5B5BD6; color:white; }
.impact-label { font-size:11px; font-weight:700; color:#555; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:6px; }
.impact-desc { font-size:12px; line-height:1.6; color:${CH}; font-weight:500; }
.facts-row { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:28px; }
.fact-box { background:${CR}; border-radius:10px; padding:16px; text-align:center; }
.fact-num { font-size:24px; font-weight:800; color:${T}; }
.fact-label { font-size:10px; color:#666; margin-top:4px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; line-height:1.4; }
.how-to-donate { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:24px; }
.donate-method { border:1.5px solid #e8eaec; border-radius:10px; padding:16px; }
.donate-method-title { font-size:12.5px; font-weight:700; color:${CH}; margin-bottom:6px; }
.donate-method-text { font-size:10.5px; color:#555; line-height:1.5; }
.donate-method-url { font-size:11px; font-weight:700; color:${T}; margin-top:8px; display:block; }
.cta-box { background:${A}; border-radius:12px; padding:20px 24px; display:flex; align-items:center; justify-content:space-between; }
.cta-text { font-size:15px; font-weight:800; color:${CH}; }
.cta-sub { font-size:11px; color:rgba(28,28,30,0.7); margin-top:3px; }
.cta-url { font-size:13px; font-weight:800; color:${CH}; }
.footer { background:${CH}; padding:14px 48px; display:flex; align-items:center; justify-content:space-between; }
.footer-brand { font-size:12px; font-weight:700; color:white; }
.footer-url { font-size:10px; color:rgba(255,255,255,0.55); }
.footer-legal { font-size:9px; color:rgba(255,255,255,0.35); text-align:right; }
</style></head><body>
<div class="page">
  <div class="header">
    <div class="pre-label">Make Spanish Casual · Support MSC</div>
    <div class="main-title">Help Us Keep It Free.</div>
    <div class="sub-title">Every resource, course, and program MSC offers is free. Your donation keeps it that way — and helps us expand the Healthcare Spanish Initiative to reach more learners, providers, and communities.</div>
    <div class="trust-row">
      <span class="trust-badge">501(c)3 Nonprofit</span>
      <span class="trust-badge">Tax-Deductible</span>
      <span class="trust-badge">100% Funds Programs</span>
      <span class="trust-badge">No Admin Overhead</span>
    </div>
  </div>

  <div class="body">
    <div class="section-label">Why It Matters</div>
    <div class="why-text">MSC was built on the belief that authentic, culturally grounded language education should be available to everyone — regardless of income, background, or zip code. That means no subscriptions, no paywalls, no premium tiers. But free programs aren't free to run. Donations fund curriculum development, community events, advocacy work, and the platform that keeps everything accessible.</div>
    <div class="quote-block">
      <div class="quote-text">"Language barriers in healthcare aren't a vocabulary problem — they're an equity problem. When a patient can't communicate their symptoms authentically, and a provider can't understand what they actually mean, lives are at risk. MSC exists to close that gap, for free."<br><br>— Jake Li, CEO & Founder, Make Spanish Casual</div>
    </div>

    <div class="section-label">Your Donation at Work</div>
    <div class="impact-grid">
      <div class="impact-card t1">
        <div class="amount-badge">$25</div>
        <div>
          <div class="impact-label">Impact</div>
          <div class="impact-desc">Keeps one learner enrolled in the Healthcare Spanish Initiative for a full semester, including access to all 5 modules and assessments.</div>
        </div>
      </div>
      <div class="impact-card t2">
        <div class="amount-badge">$50</div>
        <div>
          <div class="impact-label">Impact</div>
          <div class="impact-desc">Funds the development of new slang guides and cultural content for the community platform, reaching hundreds of learners.</div>
        </div>
      </div>
      <div class="impact-card t3">
        <div class="amount-badge">$100</div>
        <div>
          <div class="impact-label">Impact</div>
          <div class="impact-desc">Supports a community event or language access advocacy workshop in the DFW area, bringing real-world language equity to the community.</div>
        </div>
      </div>
      <div class="impact-card t4">
        <div class="amount-badge">$250</div>
        <div>
          <div class="impact-label">Impact</div>
          <div class="impact-desc">Helps MSC develop a new curriculum module — a lesson, activity, game, or quiz — and release it free to all learners on the platform.</div>
        </div>
      </div>
    </div>

    <div class="section-label">Organization Facts</div>
    <div class="facts-row">
      <div class="fact-box"><div class="fact-num">501(c)3</div><div class="fact-label">Registered Nonprofit — Donations Tax-Deductible</div></div>
      <div class="fact-box"><div class="fact-num">Free</div><div class="fact-label">All Programs and Resources — Always Free to Learners</div></div>
      <div class="fact-box"><div class="fact-num">2023</div><div class="fact-label">Founded in DFW — Active Nationally and Online</div></div>
    </div>

    <div class="section-label">How to Give</div>
    <div class="how-to-donate">
      <div class="donate-method">
        <div class="donate-method-title">Online Donation</div>
        <div class="donate-method-text">Donate online via our secure donation page. Choose one-time or monthly giving. All major credit cards accepted. Instant tax receipt provided.</div>
        <span class="donate-method-url">makespanishcasual.org/donate</span>
      </div>
      <div class="donate-method">
        <div class="donate-method-title">Check or Wire Transfer</div>
        <div class="donate-method-text">For larger gifts, institutional giving, or grant funding, contact Jake Li directly to arrange payment and receive donation documentation.</div>
        <span class="donate-method-url">jake@makespanishcasual.org</span>
      </div>
    </div>

    <div class="cta-box">
      <div>
        <div class="cta-text">Make a donation today.</div>
        <div class="cta-sub">Every dollar keeps MSC's programs free for students, providers, and communities.</div>
      </div>
      <div class="cta-url">makespanishcasual.org/donate</div>
    </div>
  </div>

  <div class="footer">
    <div><div class="footer-brand">Make Spanish Casual · Donation Impact Sheet</div><div class="footer-url">makespanishcasual.org · jake@makespanishcasual.org</div></div>
    <div class="footer-legal">501(c)3 Nonprofit EIN on file · Donations tax-deductible to the extent permitted by law.</div>
  </div>
</div>
</body></html>`;

// ─── GENERATE PDFS ───────────────────────────────────────────────────────────

const docs = [
  { filename: 'msc-overview.pdf',                  title: 'MSC Overview',                   html: overview    },
  { filename: 'healthcare-spanish-initiative.pdf', title: 'Healthcare Spanish Initiative',  html: hsi         },
  { filename: 'resource-catalog.pdf',              title: 'Resource Catalog',               html: catalog     },
  { filename: 'partnership-guide.pdf',             title: 'Partnership Guide',              html: partnership },
  { filename: 'donation-impact.pdf',               title: 'Donation Impact Sheet',          html: donation    },
];

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });

for (const doc of docs) {
  const page = await browser.newPage();
  await page.setContent(doc.html, { waitUntil: 'networkidle' });
  await page.pdf({
    path: path.join(OUTPUT_DIR, doc.filename),
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await page.close();
  console.log(`✓ Generated ${doc.filename}`);
}

await browser.close();
console.log(`\nAll PDFs saved to public/downloads/`);
