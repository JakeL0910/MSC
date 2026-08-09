// ----------------------------------------------------------------------------
// BLOG / NEWS & STORIES
// Real posts migrated from makelanguagecasual.org (the org's WordPress site).
// Each entry generates a card on /blog and a full article at /blog/[slug].
// To publish a new post, add an object to the TOP of the array (newest first).
//
// Note: the original WordPress posts were photo-heavy. Photos are not included
// here yet — drop images in /public/blog/ and we can add an image field later.
// ----------------------------------------------------------------------------

export interface BlogSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogImage {
  src: string // path under /public, e.g. '/blog/<slug>/img-1.jpg'
  alt: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string // ISO date, e.g. '2025-12-17'
  category: string
  readMinutes: number
  excerpt: string
  body: BlogSection[]
  /** Real event photos (in /public/blog/<slug>/). First is used as the cover. */
  images?: BlogImage[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'jake-at-actfl-2025-new-orleans',
    title: 'MLC at ACTFL 2025 in New Orleans',
    date: '2025-12-17',
    category: 'News',
    readMinutes: 2,
    excerpt:
      'Jake returned to the ACTFL Convention for a third straight year, volunteering with NNELL.',
    images: [
      { src: '/blog/jake-at-actfl-2025-new-orleans/img-1.jpg', alt: 'Jake with the NNELL team at the ACTFL 2025 convention in New Orleans' },
      { src: '/blog/jake-at-actfl-2025-new-orleans/img-2.jpg', alt: 'Jake and fellow volunteers at ACTFL 2025' },
      { src: '/blog/jake-at-actfl-2025-new-orleans/img-3.jpg', alt: 'The National Network for Early Language Learning at ACTFL 2025' },
      { src: '/blog/jake-at-actfl-2025-new-orleans/img-4.jpg', alt: 'Jake with visitors at the ACTFL 2025 convention' },
      { src: '/blog/jake-at-actfl-2025-new-orleans/img-5.jpg', alt: 'Jake volunteering at ACTFL 2025 in New Orleans' },
    ],
    body: [
      {
        paragraphs: [
          'The ACTFL Convention is one of the largest gatherings in language education, bringing together more than 6,000 attendees for professional development that spans every language and level. It’s a place where the people who teach language come to learn from each other.',
          'This year marked Jake’s third consecutive year taking part, and this time he volunteered with NNELL, the National Network for Early Language Learning, supporting educators who bring language to younger learners.',
        ],
      },
      {
        paragraphs: [
          'Showing up in spaces like this keeps MLC’s work grounded: the more we learn from career educators, the better the free, approachable resources we build for students, families, and our own community. And yes, there was time for beignets at Café du Monde. Go Jake!',
        ],
      },
    ],
  },
  {
    slug: 'dia-de-los-muertos-community-celebration',
    title: 'Celebrating Día de los Muertos with Our Community',
    date: '2025-02-17',
    category: 'Community',
    readMinutes: 2,
    excerpt:
      'A community Día de los Muertos celebration with the Williams High School Spanish Club in Allen, Texas.',
    images: [
      { src: '/blog/dia-de-los-muertos-community-celebration/img-1.jpg', alt: 'Community members at MLC’s Día de los Muertos celebration at Celebration Park in Allen, Texas' },
      { src: '/blog/dia-de-los-muertos-community-celebration/img-2.jpg', alt: 'Families taking part in Día de los Muertos activities' },
      { src: '/blog/dia-de-los-muertos-community-celebration/img-3.jpg', alt: 'A coloring and games station at the Día de los Muertos celebration' },
      { src: '/blog/dia-de-los-muertos-community-celebration/img-4.jpg', alt: 'Attendees enjoying the Día de los Muertos community event' },
      { src: '/blog/dia-de-los-muertos-community-celebration/img-5.jpg', alt: 'Spanish-language games at the Día de los Muertos celebration' },
      { src: '/blog/dia-de-los-muertos-community-celebration/img-6.jpg', alt: 'MLC volunteers and the Williams High School Spanish Club at the event' },
    ],
    body: [
      {
        paragraphs: [
          'The MLC Project, in partnership with the Williams High School Spanish Club, organized a community celebration of Día de los Muertos on November 2nd at Celebration Park in Allen, Texas.',
          'The event was built around interactive activities that invited everyone to connect with Hispanic culture in a relaxed, welcoming way. Attendees colored decorative sheets, played Spanish-language games, and won candy prizes along the way.',
        ],
      },
      {
        paragraphs: [
          'Events like this are MLC at its most casual and its most joyful: culture and language shared out loud, in the community, with no pressure and plenty of fun. Thank you to everyone who came out, and to the Williams High School Spanish Club for making it happen with us.',
        ],
      },
    ],
  },
  {
    slug: 'jake-presents-at-actfl-2024-philadelphia',
    title: 'Presenting at ACTFL 2024 in Philadelphia',
    date: '2024-11-24',
    category: 'News',
    readMinutes: 2,
    excerpt:
      'At ACTFL in Philadelphia, Jake presented to 100+ educators on teaching real-world Spanish.',
    images: [
      { src: '/blog/jake-presents-at-actfl-2024-philadelphia/img-1.jpg', alt: 'Jake presenting to language educators at ACTFL 2024 in Philadelphia' },
      { src: '/blog/jake-presents-at-actfl-2024-philadelphia/img-2.jpg', alt: 'Jake speaking in his presentation room at ACTFL 2024' },
      { src: '/blog/jake-presents-at-actfl-2024-philadelphia/img-3.jpg', alt: 'Educators attending Jake’s ACTFL 2024 session' },
      { src: '/blog/jake-presents-at-actfl-2024-philadelphia/img-4.jpg', alt: 'Jake presenting on teaching real-world Spanish at ACTFL 2024' },
      { src: '/blog/jake-presents-at-actfl-2024-philadelphia/img-5.jpg', alt: 'Jake at the ACTFL 2024 convention in Philadelphia' },
      { src: '/blog/jake-presents-at-actfl-2024-philadelphia/img-6.jpg', alt: 'Jake’s presentation at ACTFL 2024' },
    ],
    body: [
      {
        paragraphs: [
          'Jake delivered a presentation at ACTFL 2024, the Annual Convention and World Languages Expo, held at the Pennsylvania Convention Center in Philadelphia from November 22–24.',
          'His 45-minute session reached more than 100 language educators from across the globe. The focus was the idea at the heart of The MLC Project: the everyday, informal Spanish people really speak (the slang and expressions textbooks tend to skip), and practical ways, including technology, to make it easier to teach and learn.',
        ],
      },
      {
        paragraphs: [
          'Presenting to a room of experienced educators pushed our thinking to be clearer and more useful. It’s a habit we’ve kept: learn from the community, then turn it into free, approachable resources for the students and families we serve.',
        ],
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Format an ISO date ('2025-12-17') as 'December 17, 2025' without timezone drift.
export function formatPostDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return iso
  const [, y, mo, day] = m.map(Number) as unknown as number[]
  return `${MONTHS[mo - 1]} ${day}, ${y}`
}
