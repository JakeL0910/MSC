// ----------------------------------------------------------------------------
// RESOURCES
// Organized by audience: Students, Families, Educators. Each resource becomes a
// card on /resources and a detail page at /resources/[slug].
//
// HONESTY RULES:
//   • `status` is either 'Available' or 'Coming Soon'. Do NOT mark something
//     'Available' unless it can actually be used or downloaded today.
//   • Add `file: '/downloads/your-file.pdf'` ONLY when a real file exists in
//     /public/downloads. Without a file, the detail page shows a clear
//     "coming soon / request a copy" state.
//   • Every resource is educational — never clinical, diagnostic, or a
//     substitute for individualized professional guidance.
// ----------------------------------------------------------------------------

export type ResourceStatus = 'Available' | 'Coming Soon'

export interface ResourceCategory {
  id: 'students' | 'families' | 'educators'
  label: string
  description: string
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'students',
    label: 'For Students',
    description:
      'For neurodivergent and multilingual students: language access, self-advocacy, and conversational Spanish.',
  },
  {
    id: 'families',
    label: 'For Families',
    description:
      'Bilingual guides to support language and learning at home.',
  },
  {
    id: 'educators',
    label: 'For Educators',
    description:
      'Ideas for more inclusive, flexible language in the classroom.',
  },
]

// A section of real resource content, shown on the detail page and printable.
export interface ResourceSection {
  heading?: string
  paragraphs?: string[]
  items?: string[] // bullet list
  pairs?: { es: string; en: string; note?: string }[] // bilingual phrase rows
}

export interface Resource {
  slug: string
  title: string
  category: ResourceCategory['id']
  format: 'Guide' | 'Toolkit' | 'Phrase Cards' | 'Checklist' | 'Worksheet' | 'Summary'
  languages: string[]
  status: ResourceStatus
  description: string
  overview: string[] // short intro paragraphs shown on the detail page
  // Full, usable content. When present, the resource is readable on-page and
  // printable ("Print / Save as PDF"), so it counts as genuinely Available.
  content?: ResourceSection[]
  file?: string // path under /public — enables a file download (only if real)
  featured?: boolean
}

export const resources: Resource[] = [
  // ---------------------- FOR STUDENTS ----------------------------------
  {
    slug: 'language-and-self-advocacy-guide',
    title: 'Language & Self-Advocacy Guide',
    category: 'students',
    format: 'Guide',
    languages: ['English', 'Spanish (planned)'],
    status: 'Available',
    featured: true,
    description:
      'A plain-language guide to understanding your own language preferences and asking for what helps you use language and learn.',
    overview: [
      'Self-advocacy means telling people what helps you understand and take part. It’s about access, not about changing how you naturally use language. Read it here or print it to keep.',
    ],
    content: [
      {
        heading: 'Notice what helps you',
        paragraphs: [
          'People take in and share language in different ways, and all of them are valid. Before you can ask for what helps, it helps to notice it. Think about the times you understood something easily, and what was different about them.',
        ],
        items: [
          'Do you follow better when you can see it written, hear it, or both?',
          'Do you need a moment to think before you answer?',
          'Do examples, pictures, or step-by-step directions help?',
          'Is it easier one-on-one, or in a small group?',
        ],
      },
      {
        heading: 'Phrases you can use',
        paragraphs: ['You don’t need a long explanation. Short and clear works. Try:'],
        items: [
          '“Can you say that another way?”',
          '“I need a minute to think.”',
          '“Can you write that down for me?”',
          '“Can we slow down a little?”',
          '“Can you show me an example?”',
          '“I understand better when I can read it.”',
        ],
      },
      {
        heading: 'It’s okay to ask',
        paragraphs: [
          'Asking for what helps is a skill, not a weakness. You’re not asking anyone to lower the bar. You’re asking for the version of the information that lets you meet it. Most people are glad to help when you tell them how.',
        ],
      },
      {
        heading: 'Try it this week',
        items: [
          'Pick one phrase above and use it once, anywhere.',
          'Notice what happened. Did it help?',
          'Keep the phrases that work. Drop the ones that don’t.',
        ],
      },
    ],
  },
  {
    slug: 'everyday-conversational-spanish',
    title: 'Everyday Conversational Spanish',
    category: 'students',
    format: 'Phrase Cards',
    languages: ['Spanish', 'English'],
    status: 'Available',
    description:
      'Approachable, real-world Spanish phrases for everyday conversation.',
    overview: [
      'The everyday, practical Spanish people really speak. Read them here, or print the set to practice. Low-pressure and welcoming, for learning Spanish, keeping it in the family, or moving between languages.',
    ],
    content: [
      {
        heading: 'Saludos · Greetings',
        pairs: [
          { es: '¿Qué tal?', en: 'How’s it going?' },
          { es: '¿Cómo estás?', en: 'How are you?' },
          { es: 'Buenos días', en: 'Good morning' },
          { es: 'Buenas tardes', en: 'Good afternoon / evening' },
          { es: '¿Qué onda?', en: 'What’s up?', note: 'Very casual' },
        ],
      },
      {
        heading: 'Presentarse · Introducing yourself',
        pairs: [
          { es: 'Me llamo…', en: 'My name is…' },
          { es: 'Mucho gusto', en: 'Nice to meet you' },
          { es: '¿De dónde eres?', en: 'Where are you from?' },
          { es: 'Soy de…', en: 'I’m from…' },
        ],
      },
      {
        heading: 'Conversación · Small talk',
        pairs: [
          { es: '¿Y tú?', en: 'And you?' },
          { es: 'Todo bien', en: 'All good' },
          { es: 'Más o menos', en: 'So-so' },
          { es: 'Nos vemos', en: 'See you' },
          { es: 'Cuídate', en: 'Take care' },
        ],
      },
      {
        heading: 'Pedir ayuda · Asking for help or clarity',
        pairs: [
          { es: '¿Puedes repetir, por favor?', en: 'Can you repeat that, please?' },
          { es: 'Más despacio, por favor', en: 'Slower, please' },
          { es: 'No entendí', en: 'I didn’t understand' },
          { es: '¿Cómo se dice…?', en: 'How do you say…?' },
          { es: '¿Qué significa…?', en: 'What does … mean?' },
        ],
      },
      {
        heading: 'Cortesía · Being polite',
        pairs: [
          { es: 'Por favor', en: 'Please' },
          { es: 'Gracias', en: 'Thank you' },
          { es: 'De nada', en: 'You’re welcome' },
          { es: 'Con permiso', en: 'Excuse me', note: 'To pass by' },
          { es: 'Disculpa', en: 'Excuse me / Sorry', note: 'To get attention' },
          { es: 'Lo siento', en: 'I’m sorry' },
        ],
      },
    ],
  },
  {
    slug: 'flexible-ways-to-practice-language',
    title: 'Flexible Ways to Practice Language',
    category: 'students',
    format: 'Worksheet',
    languages: ['English'],
    status: 'Available',
    description:
      'Low-pressure activities for practicing language the way that works best for you: spoken, written, visual, or a mix.',
    overview: [
      'There’s no single right way to practice a language. Pick what fits your style and energy today. Five minutes counts.',
    ],
    content: [
      {
        heading: 'If you like to listen',
        items: [
          'Play a song in the language and read the lyrics along with it.',
          'Watch one short clip with subtitles on. Rewind one line you liked.',
          'Listen to a phrase, then say it out loud once.',
        ],
      },
      {
        heading: 'If you like to read or write',
        items: [
          'Label five things around you in the language on sticky notes.',
          'Write one sentence about your day.',
          'Text a friend one line in the language.',
        ],
      },
      {
        heading: 'If you like to talk',
        items: [
          'Say out loud what you’re doing as you do it (“I’m making coffee”).',
          'Practice one phrase from the phrase cards until it feels easy.',
          'Teach one word to someone else.',
        ],
      },
      {
        heading: 'If you like visuals',
        items: [
          'Draw a small picture and label it.',
          'Make a mini flashcard: word on one side, picture on the other.',
          'Sort ten words into groups that make sense to you.',
        ],
      },
      {
        heading: 'Remember',
        paragraphs: [
          'Practice doesn’t have to be long or perfect. Choose one activity, set a five-minute timer, and stop when it’s done. Small and steady beats big and rare.',
        ],
      },
    ],
  },

  // ---------------------- FOR FAMILIES ----------------------------------
  {
    slug: 'bilingual-family-language-guide',
    title: 'Bilingual Family Language Guide',
    category: 'families',
    format: 'Guide',
    languages: ['English', 'Spanish'],
    status: 'Coming Soon',
    featured: true,
    description:
      'A bilingual guide to supporting language and learning at home, with practical, everyday strategies.',
    overview: [
      'Practical, everyday ways for families to support language at home, in plain English and Spanish. Educational only, not an evaluation or professional advice.',
    ],
  },
  {
    slug: 'supporting-multilingual-learners-at-home',
    title: 'Supporting Multilingual Learners at Home',
    category: 'families',
    format: 'Toolkit',
    languages: ['English', 'Spanish'],
    status: 'Coming Soon',
    description:
      'Simple, affirming ideas for families raising bilingual and multilingual children. More than one language is a strength.',
    overview: [
      'Bilingualism is an asset. Welcoming, practical ideas, conversation starters, and everyday routines for families supporting more than one language at home.',
    ],
  },
  {
    slug: 'understanding-language-differences-family',
    title: 'Understanding Language Differences',
    category: 'families',
    format: 'Guide',
    languages: ['English', 'Spanish (planned)'],
    status: 'Coming Soon',
    description:
      'A plain-language introduction, for families, to how people process and use language differently, with respect and without deficit framing.',
    overview: [
      'A plain-language introduction, for families, to how people process and use language differently, with understanding and respect. Educational background, not a diagnostic tool.',
    ],
  },

  // ---------------------- FOR EDUCATORS ---------------------------------
  {
    slug: 'inclusive-language-in-the-classroom',
    title: 'Inclusive Language in the Classroom',
    category: 'educators',
    format: 'Guide',
    languages: ['English'],
    status: 'Coming Soon',
    featured: true,
    description:
      'Practical, flexible ideas educators can adapt to make classroom language more accessible for every kind of language user.',
    overview: [
      'Small changes that make classroom language far more accessible: more than one way to respond, more time, and plain language. Educational suggestions, not required accommodations.',
    ],
  },
  {
    slug: 'plain-language-classroom-materials',
    title: 'Plain-Language Classroom Materials',
    category: 'educators',
    format: 'Checklist',
    languages: ['English', 'Spanish'],
    status: 'Available',
    description:
      'A simple checklist for making handouts, forms, and announcements easier for every family and student to understand.',
    overview: [
      'A quick checklist for handouts, forms, and announcements. Run through it before you send. Especially useful for reaching multilingual families and students still building English.',
    ],
    content: [
      {
        heading: 'Words and sentences',
        items: [
          'Use everyday words. Swap “utilize” for “use,” “commence” for “start.”',
          'Keep most sentences short (aim for one idea per sentence).',
          'Spell out or explain abbreviations the first time.',
          'Write to the reader as “you.”',
        ],
      },
      {
        heading: 'Structure',
        items: [
          'Put the most important thing first.',
          'Use headings and bullet points, not big blocks of text.',
          'Make the next step obvious (what to do, by when).',
          'Bold key dates, actions, and deadlines.',
        ],
      },
      {
        heading: 'Access',
        items: [
          'Offer a Spanish version, or a clear note on how to request one.',
          'Use readable font sizes and good contrast.',
          'Add alt text to any images that carry information.',
          'Give more than one way to respond (form, email, call, in person).',
        ],
      },
      {
        heading: 'Before you send',
        items: [
          'Read it out loud. If you stumble, simplify.',
          'Ask: could a busy parent understand this in 30 seconds?',
          'Cut anything that isn’t needed.',
        ],
      },
    ],
  },
  {
    slug: 'bilingual-family-engagement-templates',
    title: 'Bilingual Family Engagement Templates',
    category: 'educators',
    format: 'Toolkit',
    languages: ['English', 'Spanish'],
    status: 'Coming Soon',
    description:
      'Reusable English–Spanish templates to help schools use language more clearly with multilingual families.',
    overview: [
      'Reusable bilingual templates that help schools use language common messages clearly in English and Spanish. Volunteer-produced, reviewed for clarity, and adaptable to your context.',
    ],
  },
]

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug)
}

export function getCategory(id: string): ResourceCategory | undefined {
  return resourceCategories.find((c) => c.id === id)
}
