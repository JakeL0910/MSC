// ----------------------------------------------------------------------------
// BLOG POSTS
// Each entry generates a card on /blog and a full article at /blog/[slug].
// To publish a new post, add an object to the top of the array.
// ----------------------------------------------------------------------------

export interface BlogSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string // ISO date, e.g. '2026-06-15'
  category: string
  readMinutes: number
  excerpt: string
  body: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-language-access-matters-in-healthcare',
    title: 'Why Language Access Matters in Healthcare',
    date: '2026-06-18',
    category: 'Health Communication',
    readMinutes: 5,
    excerpt:
      'When patients can’t fully understand their care, outcomes suffer. Here’s why language access is a health issue — and what communities can do about it.',
    body: [
      {
        paragraphs: [
          'Imagine being handed a consent form you can only half read, or trying to describe chest pain in a language you started learning two years ago. For millions of families, this isn’t a thought experiment — it’s what a normal doctor’s visit feels like.',
          'Research consistently links language barriers to worse healthcare experiences: more missed appointments, more medication errors, less preventive care, and lower patient satisfaction. None of this is about intelligence or effort. It’s about access.',
        ],
      },
      {
        heading: 'The gap between rights and reality',
        paragraphs: [
          'Patients in the U.S. have a legal right to language assistance in many healthcare settings. In practice, interpreters aren’t always available, written materials often exist only in English, and family members — sometimes children — end up interpreting complex medical information on the spot.',
          'Even when interpretation is available, the paperwork around care — insurance letters, discharge instructions, pharmacy labels — is written at reading levels far above what most people, in any language, comfortably process.',
        ],
      },
      {
        heading: 'What communities can actually do',
        paragraphs: [
          'Systemic change takes policy and investment. But communities aren’t powerless in the meantime. Plain-language guides help families prepare questions before visits. Bilingual phrase resources reduce the fear of being misunderstood. And teaching people the vocabulary of their own care — words like copay, referral, dosage — builds confidence that carries into every appointment.',
          'That’s the space MSC works in: not replacing professional interpretation, but making sure families walk into healthcare settings with more understanding and more confidence than they walked in with last time.',
        ],
      },
    ],
  },
  {
    slug: 'bilingual-families-medical-communication',
    title: 'How Bilingual Families Navigate Medical Communication',
    date: '2026-05-28',
    category: 'Community',
    readMinutes: 6,
    excerpt:
      'Behind every appointment is a family strategy: who interprets, who takes notes, who asks the hard questions. A look at the invisible work bilingual families do.',
    body: [
      {
        paragraphs: [
          'In many bilingual households, healthcare is a team sport. One person books the appointment. Another comes along to interpret. Someone else calls the insurance company afterward. This invisible coordination is so normal that families rarely name it — but it’s real work, and it often falls on young people.',
        ],
      },
      {
        heading: 'The child interpreter problem',
        paragraphs: [
          'Children of immigrant families frequently interpret for their parents — at school, at the bank, and at the doctor’s office. For routine matters this can be manageable. For medical conversations, it puts children in an impossible position: translating diagnoses they don’t understand, or softening news they shouldn’t have to deliver.',
          'Professional interpretation exists precisely for these moments, and families have the right to request it. One of the most useful phrases any family can learn, in both languages, is simply: “We would like an interpreter, please.”',
        ],
      },
      {
        heading: 'Preparation is power',
        paragraphs: [
          'Families who prepare before a visit consistently report better experiences. That preparation can be simple: writing down symptoms and dates beforehand, listing current medications, and preparing two or three questions in advance.',
          'Our Family Language Toolkit and Healthcare Phrase Library were built for exactly this — turning appointment anxiety into a checklist a family can actually complete together the night before.',
        ],
      },
    ],
  },
  {
    slug: 'what-health-literacy-means-for-students',
    title: 'What Health Literacy Means for Students',
    date: '2026-05-05',
    category: 'Education',
    readMinutes: 4,
    excerpt:
      'Health literacy isn’t just for patients — it’s a life skill schools rarely teach. Here’s why students should learn the language of their own health.',
    body: [
      {
        paragraphs: [
          'Most students graduate high school able to analyze a novel but unable to read a prescription label with confidence. Health literacy — the ability to find, understand, and use health information — is one of the most practical skills a young person can build, and one of the least taught.',
        ],
      },
      {
        heading: 'Why it matters early',
        paragraphs: [
          'Young people schedule their own appointments for the first time in college. They fill their first prescriptions, decode their first insurance cards, and answer intake questions alone. Students from multilingual families often take on these tasks even earlier — for their parents and grandparents, not just themselves.',
          'Basic health vocabulary — generic vs. brand, in-network, side effects, follow-up — is learnable in an afternoon. The confidence it creates lasts much longer.',
        ],
      },
      {
        heading: 'A student-to-student approach',
        paragraphs: [
          'At MSC, students create health communication resources for their own communities. There’s a reason this works: students know which words confused their own families, and they explain things the way a friend would. Health literacy taught peer-to-peer doesn’t feel like a lecture — it feels like being let in on something useful.',
        ],
      },
    ],
  },
  {
    slug: 'language-learning-and-neurodiverse-communication',
    title: 'Language Learning and Neurodiverse Communication',
    date: '2026-04-12',
    category: 'Inclusive Learning',
    readMinutes: 6,
    excerpt:
      'Bilingualism and neurodiversity are often treated as a complication. With the right support, the picture is more hopeful.',
    body: [
      {
        paragraphs: [
          'Families raising bilingual children with developmental or language differences often receive outdated advice: “Stick to one language, it’s less confusing.” Experts broadly do not support this. Children with developmental differences can and do grow up bilingual, and their home language is part of their identity and family connection — not an obstacle to remove.',
        ],
      },
      {
        heading: 'What inclusive language support looks like',
        paragraphs: [
          'Inclusive learning is mostly good design: predictable routines, visual supports paired with words, extra processing time, and materials that teach language in real contexts rather than abstract drills.',
          'It also means valuing all communication — spoken words, gestures, pictures, and devices. Progress is measured in connection, not just vocabulary counts.',
        ],
      },
      {
        heading: 'How MSC supports these families',
        paragraphs: [
          'MSC builds visual vocabulary cards, family guides, and tutor training around inclusive, practical communication — materials designed for real households, not abstract drills.',
          'As always: our materials support families and educators, and are never a substitute for evaluation by speech-language professionals.',
        ],
      },
    ],
  },
  {
    slug: 'how-youth-volunteers-support-esl-learners',
    title: 'How Youth Volunteers Can Support ESL Learners',
    date: '2026-03-20',
    category: 'Volunteering',
    readMinutes: 5,
    excerpt:
      'You don’t need a teaching degree to make a real difference for an English learner. You need patience, consistency, and a little training.',
    body: [
      {
        paragraphs: [
          'One of the most common questions we get from students is: “I want to help, but I’m not a teacher — can I really tutor someone?” The answer is yes. Conversation practice with a patient, consistent partner is one of the most valuable things an English learner can get, and it’s something a trained student volunteer can absolutely provide.',
        ],
      },
      {
        heading: 'What actually helps',
        paragraphs: [
          'Effective volunteer tutoring isn’t about grammar lectures. It’s about creating a low-pressure space to practice: rehearsing a phone call, roleplaying a job interview, reading a school flyer together, or just having a conversation where mistakes are safe.',
          'Consistency beats intensity. A learner who meets the same tutor thirty minutes a week for a semester builds more confidence than one who attends a single three-hour workshop.',
        ],
      },
      {
        heading: 'How MSC prepares volunteers',
        paragraphs: [
          'Every MSC tutor completes our training toolkit: session structure, first-session checklists, and the basics of culturally responsive teaching — including what not to do, like correcting every error or treating a learner’s accent as a problem to fix.',
          'If that sounds like something you’d be good at, our volunteer application takes about five minutes. Learners are waiting.',
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // ORGANIZATION HISTORY — real events carried over from the original
  // makespanishcasual.org site and rewritten for the MSC brand. Update photos
  // by adding an image gallery to these posts later if desired.
  // --------------------------------------------------------------------------
  {
    slug: 'actfl-2025-new-orleans',
    title: 'MSC at ACTFL 2025 in New Orleans',
    date: '2025-12-17',
    category: 'Updates',
    readMinutes: 3,
    excerpt:
      'Our founder returned to the ACTFL Convention for a third straight year — this time volunteering with the early language learning community and bringing MSC’s language-access mission to a global stage.',
    body: [
      {
        paragraphs: [
          'This December, MSC founder Jake Li attended the ACTFL Convention in New Orleans — his third consecutive year at the largest annual gathering of language educators in the country. The convention brings together more than 6,000 attendees and offers professional development spanning the entire language profession, for educators of every language and level.',
        ],
      },
      {
        heading: 'Volunteering with early language learning',
        paragraphs: [
          'This year Jake volunteered with NNELL, the National Network for Early Language Learning — an organization dedicated to language education for young learners. It was a fitting place for MSC to show up: our work has grown from Spanish learning into a broader mission around language access, health communication, and inclusive learning, and early language education sits right at that intersection.',
          'Between sessions, the team connected with educators from across the country — swapping ideas about how to make language learning more practical, more cultural, and more accessible, and closing out one evening with beignets at Café du Monde.',
        ],
      },
      {
        heading: 'Why we keep coming back',
        paragraphs: [
          'Showing up at a professional convention as a youth-led organization matters. It’s where we learn from career educators, test our ideas against the field, and remind ourselves that the resources we build for families are part of a much larger conversation about language and access.',
        ],
      },
    ],
  },
  {
    slug: 'dia-de-los-muertos-community-celebration',
    title: 'Celebrating Día de los Muertos with Our Community',
    date: '2024-11-02',
    category: 'Community',
    readMinutes: 3,
    excerpt:
      'MSC teamed up with the Williams High School Spanish Club to bring Día de los Muertos to Celebration Park in Allen, Texas — with games, coloring, candy, and a lot of cultural pride.',
    body: [
      {
        paragraphs: [
          'On November 2nd, MSC partnered with the Williams High School Spanish Club to celebrate Día de los Muertos at Celebration Park in Allen, Texas. Families stopped by our booth throughout the day for coloring sheets, Spanish games, and candy prizes — a warm, low-pressure way to share a meaningful cultural tradition.',
        ],
      },
      {
        heading: 'Language is culture',
        paragraphs: [
          'Día de los Muertos is a celebration of memory and family, and it’s inseparable from the language and culture behind it. Events like this are exactly why MSC exists: language access isn’t only about clinics and forms, it’s about belonging — making space for communities to see their culture reflected and celebrated in public.',
          'For our student volunteers, it was also a reminder of how much community events can do. A coloring sheet and a friendly conversation open a door that no flyer ever could.',
        ],
      },
      {
        heading: 'Partner with us on the next one',
        paragraphs: [
          'Community celebrations like this happen because a school, a park, and a group of volunteers decide to make them happen. If your school or organization wants to co-host a cultural or language-access event, we’d love to hear from you.',
        ],
      },
    ],
  },
  {
    slug: 'actfl-2024-philadelphia-presentation',
    title: 'Presenting at ACTFL 2024: Teaching Language with AI',
    date: '2024-11-24',
    category: 'Updates',
    readMinutes: 3,
    excerpt:
      'At ACTFL 2024 in Philadelphia, our founder presented to more than 100 language educators on using AI and technology to teach real-world Spanish — an early chapter in the research that shapes MSC today.',
    body: [
      {
        paragraphs: [
          'At ACTFL 2024 — the Annual Convention and World Languages Expo, held November 22–24 at the Pennsylvania Convention Center in Philadelphia — MSC founder Jake Li delivered a 45-minute presentation to more than 100 language educators from around the world. The session explored how AI and technology can help teach the practical, real-world Spanish that learners actually encounter, including the informal, context-dependent expressions textbooks leave out.',
        ],
      },
      {
        heading: 'From a talk to a mission',
        paragraphs: [
          'That presentation captures where MSC began: a curiosity about the gap between textbook language and the language people really speak. Studying that gap — and how tools like AI can help analyze it — grew into the student-led research program we run today, now spanning language input, bilingual and neurodiverse communication, and health literacy.',
          'Slang and informal speech were the entry point, but the real subject was always bigger: how people communicate, and how we make that communication more accessible.',
        ],
      },
      {
        heading: 'Sharing what we learn',
        paragraphs: [
          'Presenting to a room of career educators pushed our work to be clearer and more rigorous. It’s a habit we’ve kept — our research still gets presented publicly, and what we learn flows straight back into the free resources we build for families and communities.',
        ],
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
