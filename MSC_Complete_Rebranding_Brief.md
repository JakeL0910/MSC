# Make Spanish Casual (MSC) — Complete Rebranding & Implementation Brief
*Prepared June 2026 | For implementation via Claude Code on WordPress/Elementor*

---

## OVERVIEW FOR IMPLEMENTER

This document is a complete specification for the rebranding, restructuring, and rebuild of **makespanishcasual.org**. It covers:

1. New organizational mission, vision, and brand identity
2. Program architecture (three programs)
3. Full site architecture (new nav, pages, and structure)
4. Page-by-page content specifications and copy
5. Design direction
6. Immediate cleanup tasks (critical bugs to fix first)
7. Founder bio and team content

The site runs on **WordPress with Elementor**. All implementation should work within that stack. Do not rebuild in a different framework unless explicitly requested.

---

## PART 1: ORGANIZATIONAL IDENTITY

### Background

Make Spanish Casual (MSC) is a 501(c)3 nonprofit founded by Jake Li, a high school student in Plano, TX (Class of 2027). Jake has an unusually strong background for a student founder: he has conducted language acquisition research at the University of Wisconsin-Madison (500 hours under Dr. Kaushanskaya), served as a research intern at UT Southwestern Medical Center, completed an A+ course in *Spanish for Successful Communication in Healthcare Settings* (Rice University/Coursera), presented at ACTFL conventions in Chicago, Philadelphia, and New Orleans, advocated for language legislation on Capitol Hill, and founded an AI patient-safety startup (Hindsight) backed by MIT, Microsoft, and AWS. His intended major is Cognitive Science / Computational Linguistics at the intersection of language, AI, and medicine (Pre-Medicine track).

MSC is pivoting from a general Spanish slang education platform to a **health equity and language access organization** — one that uses authentic, culturally grounded language education as the vehicle for reducing healthcare disparities affecting Spanish-speaking communities.

---

### Mission Statement

> **Make Spanish Casual advances equitable language access by providing free, culturally authentic Spanish education — with a particular focus on healthcare settings where language barriers directly affect the quality and safety of care.**

---

### Vision Statement

> A future where no one receives worse care, fewer opportunities, or less justice because of the language they speak.

---

### Tagline (replace all instances of "Education for Everyone")

> **Language is access.**

Secondary tagline (for subheadings, program descriptions):
> **Real Spanish. Real impact.**

---

### Four Mission Pillars

These four pillars anchor the organization's identity and should appear across the website, donation asks, and program descriptions.

**1. Authentic Language**
Spanish as it's actually spoken — slang, regional expressions, cultural idioms, and colloquialisms. Not the textbook version that leaves learners unable to communicate naturally. Research shows that authentic, colloquial language acquisition produces meaningfully better communicative outcomes than formal instruction alone.

**2. Health Equity**
Language barriers are a public health crisis. Patients with limited English proficiency experience higher rates of medical errors, longer hospital stays, and worse health outcomes — not because of their health, but because of communication failures. Authentic cultural and linguistic competence in healthcare providers and community members is a direct intervention on health equity.

**3. Free Access**
Quality language education should not be gated behind cost. MSC provides free resources, courses, and programs so that anyone — regardless of income or background — can participate fully and benefit from what we offer.

**4. Community-Driven**
Language is learned and lived in community. MSC builds spaces for learners to practice together, support one another, and use their language skills in service of others.

---

### Brand Voice

- **Direct and confident** — not cautious, not overly academic
- **Warm and communal** — this is about belonging, not just learning
- **Purposeful** — every piece of copy should connect language learning to real-world impact
- **Accessible** — we don't talk down to learners OR up to funders; same voice throughout
- Avoid: corporate nonprofit-speak ("leveraging synergies," "impactful programming"), excessive hedging, generic ed-nonprofit phrases like "education for everyone" or "empowering learners"

---

### Design Direction

**Color palette (suggested):**
- Primary: Deep teal `#1A6B72` — trust, health, community
- Accent: Warm amber `#E8A020` — energy, accessibility, warmth
- Secondary: Soft coral `#E05C4B` — urgency, passion
- Neutral: Off-white `#F8F6F1` and dark charcoal `#1C1C1E`

The current site uses a generic blue/white palette. The new palette should feel more human — warm but credible, community-forward but not juvenile. Think: health equity org that takes its mission seriously, not a startup or a tutoring service.

**Typography direction:**
- Headings: A clean sans-serif (Inter, DM Sans, or similar)
- Body: Readable, accessible (minimum 16px body text)
- Avoid the current site's multiple conflicting font weights

**Logo:**
Keep the existing MSC logo for now. The tagline beneath it should change from "501(c)3 Non-Profit Organization that Celebrates Spanish Slang and Culture" to simply "Language Access | 501(c)3 Nonprofit"

---

## PART 2: PROGRAM ARCHITECTURE

MSC now operates three programs. Each has its own page on the website.

---

### Program 1: Community Learning Platform
*Free, accessible Spanish education for all learners*

**What it is:** The original MSC platform, evolved. Free courses, resource library, slang guides, and community spaces for anyone who wants to learn authentic, conversational Spanish. Focus on slang, cultural context, real-world communication — not grammar drills.

**Who it's for:** General learners, heritage speakers reconnecting with their language, youth, and anyone priced out of traditional language instruction.

**Key features:**
- Free course library (existing)
- Resource center: slang guides, conversational scenarios, cultural explainers
- Community member spaces for collaborative practice
- Content categories: Slang & Street Spanish, Conversational Confidence, Culture & Identity, Foundations of Spanish Slang, Content-Based Spanish, Creative Expression, Spanish in the Digital World, Travel & Survival Spanish

**Connection to mission:** This is the access layer — breaking down cost and cultural barriers to authentic Spanish learning.

---

### Program 2: Healthcare Spanish Initiative
*Authentic Spanish training for pre-health students, providers, and community health workers*

**What it is:** A free training track specifically designed for people entering or working in healthcare who need to communicate authentically — not just literally — with Spanish-speaking patients. Built on the insight that most medical Spanish programs teach vocabulary, but miss the cultural layer that determines whether patients actually feel heard and understood.

**Who it's for:**
- Pre-med, pre-nursing, and pre-health students (college and high school)
- Community health workers and patient navigators
- Medical interpreters and healthcare volunteers
- Practicing providers who want to expand their cultural competence

**Why this matters (the problem statement for the page):**
- Approximately 25 million people in the United States have limited English proficiency
- Spanish is the most common non-English language spoken at home in the U.S.
- Patients with limited English proficiency face significantly higher rates of adverse clinical events, misdiagnosis, and medication errors
- A provider who knows "me duele el estómago" but not "me cayó el estómago" — or who doesn't understand why a patient describes pain indirectly, or defers to a family member rather than answering questions directly — is missing the cultural context that shapes the entire clinical encounter
- Fewer than 13% of U.S. physicians report proficiency in a second language
- Most medical Spanish curricula teach anatomical vocabulary; very few teach the colloquial, cultural, and community-specific language that determines whether patients feel safe and understood

**What makes MSC's approach different:**
MSC teaches the layer that most programs skip: culturally authentic, colloquial Spanish — informed by academic research on how colloquialisms affect communication and cognitive processing. This isn't a phrasebook. It's communication as a clinical skill.

**Curriculum areas (proposed):**
1. Foundations: Colloquial vs. clinical Spanish and why it matters
2. Patient communication: Intake, history-taking, informed consent in natural language
3. Cultural context: Regional variation, health beliefs, family dynamics in clinical settings
4. Sensitive conversations: Mental health, reproductive health, end-of-life — cultural and linguistic considerations
5. Community navigation: Helping patients access systems, understand their rights, follow care plans

**Research backing:**
This program draws on Jake Li's research at the UW-Madison Language Acquisition and Bilingualism (LAB) Laboratory (under Dr. Kaushanskaya, investigating the impact of colloquialisms on cognitive development), his completion of Rice University's *Spanish for Successful Communication in Healthcare Settings* course, and his clinical research experience at UT Southwestern Medical Center.

**CTA:** Free enrollment — same registration as the community platform

---

### Program 3: Language Access Advocacy
*Policy, research, and community education on language rights*

**What it is:** MSC's policy and public education arm. This program translates MSC's work into advocacy — pushing for systemic change alongside the individual-level education the other two programs provide.

**What it does:**
- Publishes accessible summaries of research on language barriers in healthcare and education
- Connects learners and community members with information about their language access rights (Title VI of the Civil Rights Act, Executive Order 13166, state laws)
- Supports language policy advocacy at local, state, and national levels
- Partners with healthcare systems, community organizations, and schools on language access initiatives

**Connection to founder's work:** Jake Li has presented at congressional meetings through NNELL's Language Advocacy Days (Virtual 2024, Capitol Hill 2025 and 2026), met with U.S. Rep. Lloyd Doggett, U.S. Rep. Jasmine Crockett, and Sen. Ted Cruz, and advocated for the World Language Advancement and Readiness Act, the Bilingual Education Seal and Teaching Act, and the Native American Language Resource Center Act.

**Content for this page:**
- Why language access is a civil right (brief explainer)
- Key legislation MSC supports and why
- Resources for communities on language rights
- How to get involved / volunteer
- Partnership opportunities for organizations

---

## PART 3: SITE ARCHITECTURE

### New Navigation Structure

Replace the current bloated navigation (which exposes backend pages like "User," "Account," "Members") with:

```
Home | Programs | Learn | About | Donate | Partner
```

**Programs** dropdown:
- Healthcare Spanish Initiative
- Community Learning Platform
- Language Access Advocacy

**Learn** dropdown:
- Courses
- Resource Center
- Free Registration

**About** dropdown:
- About MSC
- Our Team
- Blog
- Contact

**Donate:** Direct link to donation page (keep existing)

**Partner:** Direct link to partnerships page (reworked — see below)

**Remove entirely from nav:** Login, Register, Members, User, Account, Instructor Registration — these should only be accessible from a "Sign In" button or from within the user dashboard, not the primary navigation.

---

### Pages Required

#### Existing pages to keep and update:
- Home (major rewrite)
- About MSC / About Us (consolidate into one, major rewrite)
- Courses (keep, minor updates)
- Resource Center (keep, minor updates)
- Donations / Make a Donation (keep)
- Contact (keep)
- Blog (keep, but remove demo posts)
- Login / Register / Account (keep as functional pages, remove from primary nav)

#### New pages to create:
- Programs (overview page with 3 program cards)
- Healthcare Spanish Initiative (full program page)
- Language Access Advocacy (full program page)

#### Pages to consolidate or remove:
- "About MSC" parent page and "About Us" child page → consolidate into single "About" page
- "Resource Store" and "All Products" → keep but de-emphasize; rename to "Support Our Work" or fold into Donate

---

## PART 4: PAGE-BY-PAGE CONTENT SPECIFICATIONS

---

### HOME PAGE

**Hero Section**

Headline:
> Language is access.

Subheadline:
> Make Spanish Casual is a nonprofit advancing health equity through free, culturally authentic Spanish education — for learners, providers, and communities.

Two CTAs (equal weight):
- [Start Learning Free] → /registration/
- [Our Programs] → /programs/

Hero image/visual: Community-forward — people learning together, not stock photos of books or globes. If using existing site imagery, the MSC logo on a warm-toned background works.

---

**The Problem Section** (new — replaces broken counters)

Headline: *Why language access matters*

Three stat cards (verify these numbers before publishing — they reflect well-established research but should be confirmed):

- **~25 million** people in the U.S. have limited English proficiency
- **2–3x** higher rate of adverse clinical events for patients with language barriers
- **< 13%** of U.S. physicians report proficiency in a second language

Below stats, one line of copy:
> Language barriers aren't just inconvenient. In healthcare settings, they cost lives.

---

**Three Pillars Section** (replaces current "Why learn with us")

Use fresh icons — do NOT use images from themegrilldemos.com.

**01. Authentic Language**
Slang, colloquialisms, and cultural context — the layer of Spanish that most programs skip but that determines whether communication actually works.

**02. Health Equity**
We train the next generation of providers, community health workers, and advocates to communicate authentically across language and culture.

**03. Free Access**
No paywalls. No gatekeeping. Every resource, course, and program MSC offers is free — because language access is a right, not a privilege.

---

**Programs Preview Section** (new)

Headline: *Three programs. One mission.*

Three cards, each with a short description and link:

**Healthcare Spanish Initiative**
Free training for pre-health students and healthcare workers in authentic, culturally grounded medical Spanish — the layer that vocabulary alone can't teach.
[Learn More →]

**Community Learning Platform**
Free courses, slang guides, and community spaces for anyone who wants to learn real, conversational Spanish.
[Start Learning →]

**Language Access Advocacy**
Policy, resources, and community education on language rights — because systemic change requires more than individual learning.
[Get Involved →]

---

**About / Founder Section**

Headline: *Student-led. Research-backed. Mission-driven.*

Body:
> MSC was founded by Jake Li, a high school student from Plano, TX whose work sits at the intersection of language, health, and equity. Jake has conducted language acquisition research at the University of Wisconsin-Madison, interned at UT Southwestern Medical Center, and advocated for language legislation on Capitol Hill. He founded MSC because he believes authentic language education — the kind that reflects how people actually speak — is one of the most direct tools we have for reducing health disparities and building more connected communities.

CTA: [Meet Our Team →] → /about/

---

**Testimonials Section**

Keep the existing testimonials from Devin and Braeden. Add a note that these are MSC community members, not paid endorsers. Seek 1–2 additional testimonials from learners who are *not* on the MSC team.

---

**Donate CTA Section**

Headline: *Help us keep it free.*

Body:
> Every resource, course, and program MSC offers is free. Your donation keeps it that way — and helps us expand the Healthcare Spanish Initiative to serve more pre-health students and providers.

CTA: [Make a Donation →]

---

### ABOUT PAGE

*Consolidate "About MSC" and "About Us" into one page at /about/. Remove the blog sidebar entirely.*

**Page structure:**

**Section 1: Mission**

Headline: *Why we exist*

> Language shapes every interaction — including whether a patient trusts their provider, whether a student feels seen in the classroom, whether a family can navigate the systems meant to serve them. Make Spanish Casual exists because authentic, culturally grounded language education can change those interactions. We believe language access is a matter of equity. Our job is to make it free.

---

**Section 2: Our Story**

> MSC began as a Spanish slang education platform in Plano, TX — a free resource for learners who felt left behind by textbook Spanish that didn't match the language they heard in their communities or wanted to speak in real life. Over time, the work evolved. As MSC's founder deepened his research in language acquisition, pursued pre-medicine studies, and saw firsthand how language barriers affect clinical outcomes, the organization's mission came into focus: language access isn't just an educational issue. It's a health equity issue. Today, MSC combines free community education with a healthcare-focused training initiative and policy advocacy — connecting authentic language learning to real-world impact.

---

**Section 3: Our Team**

*Use updated headshots and bios below. Remove the duplicate bio block that appears lower on the current page.*

---

**Jake Li — CEO & Founder**
jake@makespanishcasual.org

Jake Li is a high school student (Class of 2027, Plano East Senior High School / T.H. Williams High School) whose work sits at the intersection of language science, health equity, and AI. He is the founder of Make Spanish Casual and the AI patient safety startup Hindsight, which has been accepted into MIT Sandbox, Microsoft for Startups (Azure), and AWS programs.

Jake has conducted over 500 hours of language acquisition research at the University of Wisconsin-Madison's Language Acquisition and Bilingualism (LAB) Laboratory under Dr. Kaushanskaya, investigating how colloquialisms affect cognitive development in children with developmental disabilities. He has also conducted clinical research at UT Southwestern Medical Center, completed Rice University's *Spanish for Successful Communication in Healthcare Settings* course with an A+, and served as a student researcher at Syracuse University improving language transcript analysis software.

He serves on the Advocacy Committee for the National Network for Early Language Learning (NNELL), has advocated for language legislation on Capitol Hill alongside U.S. Representatives Lloyd Doggett and Jasmine Crockett and Senator Ted Cruz, and has presented at the ACTFL Annual Convention and World Language Expo in Chicago (2023), Philadelphia (2024), and New Orleans (2025). His research has been presented at the UT Arlington Student Conference in Linguistics and TESOL and the UC Davis Symposium on Language Research.

His intended major is Cognitive Science / Computational Linguistics, with a concentration in the intersection of language, AI, and medicine (Pre-Medicine track), with a minor in Spanish.

---

**Jada Li — Head of Development**

Jada graduated from the Massachusetts Institute of Technology with a minor in Spanish. She leads MSC's development and fundraising strategy, bringing institutional experience and a commitment to making language education accessible at scale.

---

**Devin Carroll — Social Media Manager & Content Creator**

Devin is a student at Plano East Senior High School and one of MSC's earliest community members. He creates content that makes authentic Spanish learning visible and shareable — and is living proof that MSC's approach works. "I used to be nervous speaking Spanish. Now I drop slang and everyone thinks I'm fluent."

---

**Jordan Stafford — Social Media Manager & Content Creator**

Jordan is a student at Plano East Senior High School. She develops content across MSC's social platforms, with a focus on making Spanish feel approachable and culturally rich for new learners.

---

**Braeden Quach — Event Volunteer**
Braeden is a student at Plano East Senior High School. He supports MSC's in-person events and community building in the DFW area. "I joined to improve my Spanish. I stayed because it felt like I belonged."

---

**Rishan Patel — Event Volunteer**
Rishan is a student at Plano East Senior High School. He helps organize and run MSC's community events across the DFW metroplex.

---

**Jacob Habtemariam — Event Volunteer**
Jacob is a student at Plano East Senior High School. He volunteers at MSC events, helping build the in-person community that complements the online learning platform.

---

**Section 4: Affiliations & Partners**

Display logos or text references for:
- National Network for Early Language Learning (NNELL)
- ACTFL (American Council on the Teaching of Foreign Languages)
- Language Connects Foundation
- University of Wisconsin-Madison
- Syracuse University
- MIT Sandbox
- UT Southwestern Medical Center

---

### PROGRAMS PAGE (NEW)

URL: /programs/

**Hero:**
Headline: *Three programs. One mission.*
Subheadline: *Everything MSC does is free — and everything connects back to equitable language access.*

**Three program cards (full-width, stacked or 3-column):**

Each card includes: program name, 2-sentence description, key audience, CTA button

[Card 1 — Healthcare Spanish Initiative]
Authentic, culturally grounded Spanish training for the next generation of healthcare providers, students, and community health workers. Built on language acquisition research and designed for the clinical settings where communication failures cost lives.
*For: Pre-health students, nursing students, community health workers, providers*
[Learn More]

[Card 2 — Community Learning Platform]
Free courses, slang guides, and collaborative learning spaces for anyone who wants to speak Spanish the way it's actually spoken — with slang, cultural context, and real-world confidence.
*For: General learners, heritage speakers, students*
[Start Learning]

[Card 3 — Language Access Advocacy]
Policy resources, research, and community education on language rights. From Capitol Hill to the classroom, MSC advocates for the systemic changes that individual education alone can't achieve.
*For: Advocates, community organizations, policymakers*
[Get Involved]

---

### HEALTHCARE SPANISH INITIATIVE PAGE (NEW)

URL: /healthcare-spanish/

**Hero:**
Headline: *The Spanish your patients are actually speaking.*
Subheadline: *Free training in culturally authentic medical Spanish for pre-health students, providers, and community health workers.*
CTA: [Enroll Free]

---

**The Problem:**

Headline: *Vocabulary isn't enough.*

> Medical Spanish programs typically teach anatomical terms and clinical phrases. That's necessary — but it's not sufficient. When a patient says "me cayó el estómago" instead of "me duele el estómago," they're communicating something culturally specific about their symptoms. When a patient defers to a family member instead of answering directly, or describes pain through metaphor rather than scale, or says "sí" to avoid confrontation rather than to signal understanding — a provider who only knows textbook Spanish will miss it entirely.
>
> Language barriers in healthcare are not primarily vocabulary problems. They are cultural communication problems. And they have measurable consequences: higher rates of adverse clinical events, lower patient satisfaction, worse adherence to care plans, and reduced trust in the healthcare system among Spanish-speaking patients.
>
> MSC's Healthcare Spanish Initiative addresses the layer that most programs skip.

---

**What You'll Learn:**

1. **Colloquial vs. Clinical Spanish** — why the gap between them matters clinically and how to bridge it
2. **Patient Communication** — intake, history-taking, and informed consent in natural, culturally appropriate language
3. **Cultural Context in Clinical Settings** — regional and community variation in health beliefs, communication styles, and family dynamics
4. **Sensitive Conversations** — mental health, reproductive health, and end-of-life discussions with cultural and linguistic care
5. **Community Navigation** — helping patients understand their rights, access systems, and follow care plans

---

**Research Foundation:**

> This program is informed by peer-reviewed language acquisition research, including work conducted at the University of Wisconsin-Madison's Language Acquisition and Bilingualism Laboratory on how colloquialisms affect cognitive processing and communication. It is also shaped by direct clinical experience at UT Southwestern Medical Center and completion of Rice University's *Spanish for Successful Communication in Healthcare Settings* curriculum.

---

**Who It's For:**
- Pre-med, pre-nursing, and pre-health students (high school and college)
- Medical and nursing students seeking to expand cultural competence
- Community health workers and patient navigators
- Healthcare volunteers and interpreters
- Practicing providers seeking continuing education in cultural communication

**CTA Section:**
Headline: *It's free. Enroll today.*
[Create Free Account] [Contact Us About Partnerships]

---

### LANGUAGE ACCESS ADVOCACY PAGE (NEW or rework of Partnerships)

URL: /advocacy/

**Hero:**
Headline: *Language access is a civil right.*
Subheadline: *MSC advocates for the policy changes that make equitable communication possible — in healthcare, education, and beyond.*

---

**Section: The Legal Landscape**

> Under Title VI of the Civil Rights Act of 1964 and Executive Order 13166, organizations receiving federal funding are required to provide meaningful access to people with limited English proficiency. In practice, these protections are unevenly enforced — and many patients and community members don't know their rights.
>
> MSC publishes plain-language resources on language access rights for patients, families, and community organizations.

[Download: Know Your Language Rights (link placeholder)]

---

**Section: Legislation We Support**

- **World Language Advancement and Readiness Act** — expands access to language education in underserved schools
- **Bilingual Education Seal and Teaching Act** — creates a federal bilingual educator credential and supports bilingual instruction
- **Native American Language Resource Center Act** — supports the preservation and teaching of Native American languages

MSC has advocated for these bills at Virtual Language Advocacy Days (2024) and on Capitol Hill (2025, 2026) through the National Network for Early Language Learning (NNELL).

---

**Section: Get Involved**

- Follow MSC's advocacy work and NNELL updates
- Attend language advocacy events (NNELL Language Advocacy Days)
- Partner with MSC to bring language access resources to your organization
- Volunteer as a language advocate or educator

[Contact Us] [Partner With MSC]

---

### PARTNERSHIPS PAGE (rework)

URL: /partner/

**Hero:**
Headline: *Partner with MSC*
Subheadline: *We work with healthcare systems, universities, schools, and community organizations that share our commitment to equitable language access.*

**What Partnership Looks Like:**

- **Healthcare organizations:** Co-develop culturally competent Spanish training for staff; promote the Healthcare Spanish Initiative to pre-health students and employees
- **Universities and medical schools:** Integrate MSC's curriculum into pre-health or public health coursework; research partnerships
- **K-12 schools and districts:** Bring language access education and advocacy programming to students
- **Community organizations:** Language access resources, volunteer language education, bilingual service support

**CTA:** [Get In Touch] → /contact/

---

## PART 5: IMMEDIATE CLEANUP TASKS
*Fix these before any redesign work — they actively harm credibility*

### 🔴 Delete immediately:

1. **Demo blog posts** — Delete these posts entirely (they are WordPress theme demo content, publicly indexed):
   - "What are the easy dance form to learn for beginners?"
   - "Most essential UX design principle for new comers."

2. **Test text on About page** — Remove the text block reading: *"qsandbox support: test. This is another text :)"*

3. **Third-party images** — In the homepage "Why learn with us" section, icons 2 and 3 load from `themegrilldemos.com` (an external theme demo site). Upload local replacements to the WordPress media library and update the image sources.

4. **Broken stat counters** — The homepage counters display "0 k People Impacted" and "0 Years of Experience." Either populate with real numbers or remove the section. Do not leave zeros.

5. **Copyright year** — Footer reads "Copyright © 2023." Update to 2026 or use a dynamic PHP year.

6. **Duplicate team bios on About page** — The team is listed twice (once with headshots, once with an older text-only block below). Delete the second block.

### 🟡 Fix next:

7. **Navigation cleanup** — Remove Login, Register, Members, User, Account, Instructor Registration from primary nav dropdown. Keep them accessible only via Sign In button or user dashboard.

8. **Consolidate About pages** — "About MSC" parent and "About Us" child → one page at /about/

9. **Remove blog sidebar from About page** — The About page template includes a blog sidebar (Recent Posts, Recent Comments). Remove it from the About page template; it belongs only on blog/post pages.

10. **Update site tagline** — Change "501(c)3 Non-Profit Organization that Celebrates Spanish Slang and Culture" to "Language Access | 501(c)3 Nonprofit" everywhere it appears (site header, meta description, footer).

---

## PART 6: SEO & META UPDATES

**Homepage meta description:**
> Make Spanish Casual is a nonprofit advancing equitable language access through free, culturally authentic Spanish education — with a focus on healthcare settings where language barriers affect outcomes.

**About page meta description:**
> Learn about Make Spanish Casual, a student-led 501(c)3 nonprofit founded by Jake Li, whose research and advocacy work connects authentic language education to health equity.

**Healthcare Spanish page meta description:**
> Free training in culturally authentic medical Spanish for pre-health students, nursing students, and community health workers — designed for the clinical settings where communication failures cost lives.

**Site title:** Change to:
> Make Spanish Casual | Language Access Nonprofit

---

## PART 7: CONTENT TO PRESERVE (DO NOT DELETE)

- All existing courses and course content
- Resource center content (categories, uploaded materials)
- Existing member accounts and user data
- Donation page and payment integrations
- The blog posts: ACTFL 2023, ACTFL 2024, ACTFL 2025, Día de los Muertos
- All legitimate team headshots in the media library
- The MSC logo (both versions)

---

## PART 8: NOTES FOR CLAUDE CODE IMPLEMENTATION

1. **WordPress/Elementor context:** All page edits should be implementable through Elementor's visual editor or by editing the underlying HTML/CSS. Do not recommend a platform rebuild unless something is technically impossible in this stack.

2. **New pages:** The Programs, Healthcare Spanish Initiative, and Language Access Advocacy pages are net-new. They can be created as standard WordPress pages with Elementor templates matching the existing site design (updated per design direction in Part 1).

3. **Navigation:** Use WordPress's native menu editor (Appearance → Menus) to restructure nav. The "Sign In" button should remain separate from the primary menu and link to /login/.

4. **Stat counters:** If rebuilding the homepage stats section with real numbers, use an Elementor counter widget. Recommended real stat to include: "500+ hours of language acquisition research conducted by MSC's founder" if you want an org-specific stat rather than external statistics.

5. **Image references:** All images used in new pages should be uploaded to the WordPress media library. No external image hosting from theme demo sites.

6. **Color:** If updating brand colors in Elementor, set the new palette in Elementor → Site Settings → Global Colors so changes propagate site-wide.

7. **Blog cleanup:** Delete the two demo posts from WordPress admin → Posts. Do not just unpublish — delete entirely so they are not indexed.

8. **About page consolidation:** Set /about/ as the canonical URL. Redirect /about-msc/ to /about/. Update all internal links accordingly.

---

*End of Brief*
*Questions or clarifications: jake@makespanishcasual.org*
