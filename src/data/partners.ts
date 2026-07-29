// ----------------------------------------------------------------------------
// PARTNERS DATA — partnership types and illustrative ways to collaborate for
// the /partners page.
//
// The collaborations below are ILLUSTRATIONS of what MSC offers — not claims of
// specific past partnerships. Add real, named collaborations here only once
// they exist and the partner has agreed to be named.
// ----------------------------------------------------------------------------

export interface PartnerType {
  audience: string
  icon: string
  headline: string
  weProvide: string[]
}

export const partnerTypes: PartnerType[] = [
  {
    audience: 'Schools & Districts',
    icon: 'academic-cap',
    headline: 'Support your multilingual and neurodivergent students and families',
    weProvide: [
      'Free, plain-language resources on language access and self-advocacy',
      'Bilingual family guides and conversational Spanish materials',
      'Student events and webinars on inclusive learning and language',
      'Plain-language rewrites of family-facing flyers and announcements',
    ],
  },
  {
    audience: 'Libraries & Community Centers',
    icon: 'book-open',
    headline: 'Bring accessible language programs to your community space',
    weProvide: [
      'Conversational Spanish and language-access events',
      'Family-friendly workshops on supporting learners at home',
      'Free resource displays for your patrons',
      'Bilingual event flyers and program materials',
    ],
  },
  {
    audience: 'Nonprofits & Community Organizations',
    icon: 'users',
    headline: 'Reach every family your mission serves',
    weProvide: [
      'Volunteer translation and plain-language rewrites of outreach materials',
      'Bilingual (English–Spanish) versions of key documents',
      'Co-hosted community events and webinars',
      'Cross-promotion of accessible-language programming',
    ],
  },
]

export interface ExampleCollaboration {
  title: string
  partner: string
  description: string
}

// Illustrative offerings only — NOT claims of specific past partnerships.
export const exampleCollaborations: ExampleCollaboration[] = [
  {
    title: 'Bilingual Family Night',
    partner: 'For example, with a local school',
    description:
      'MSC volunteers could run a bilingual station at a school family night, walking families through free resources in English and Spanish.',
  },
  {
    title: 'Conversational Spanish Meetup',
    partner: 'For example, with a public library',
    description:
      'A relaxed, drop-in conversational Spanish session in a community space, open to learners at any level.',
  },
  {
    title: 'Inclusive Language Workshop',
    partner: 'For example, with a community organization',
    description:
      'A practical, hands-on session on making everyday language and materials more accessible and welcoming for everyone.',
  },
]
