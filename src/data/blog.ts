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
      'Bilingualism and neurodiversity are often treated as a complication. Research tells a more hopeful story — if support is designed inclusively.',
    body: [
      {
        paragraphs: [
          'Families raising bilingual children with developmental or language differences often receive outdated advice: “Stick to one language, it’s less confusing.” Current research broadly does not support this. Children with developmental differences can and do grow up bilingual, and their home language is part of their identity and family connection — not an obstacle to remove.',
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
        heading: 'Where our research fits',
        paragraphs: [
          'MSC’s student researchers study language input in bilingual and neurodiverse populations — including how everyday, context-dependent language (the practical way people actually speak) shows up in what children hear and learn. We turn what we find into visual vocabulary cards, family guides, and tutor training, so research doesn’t stay on a poster board.',
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
