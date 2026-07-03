// ----------------------------------------------------------------------------
// TEAM & ADVISORS — placeholders for the About page.
// TODO: replace names, roles, and bios with your real team. To add photos,
// drop images in /public/team/ and set `photo: '/team/name.jpg'`.
// ----------------------------------------------------------------------------

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo?: string
}

export const team: TeamMember[] = [
  {
    name: 'Jake Li',
    role: 'Founder & Executive Director',
    bio: 'Jake founded MSC as a high school student after seeing how language barriers shape families’ access to healthcare and education. He leads MSC’s programs and community outreach.',
  },
  {
    name: 'Jada Li', // TODO: replace placeholder
    role: 'Director of Programs',
    bio: 'Coordinates tutoring matches, volunteer training, and community workshops. Passionate about making language learning feel welcoming for every learner.',
  },
  {
    name: 'Jordan Stafford', // TODO: replace placeholder
    role: 'Director of Resources',
    bio: 'Leads the creation and review of MSC’s multilingual guides and toolkits, keeping every resource accurate, plain-language, and free.',
  },
  {
    name: 'Devin Carroll', // TODO: replace placeholder
    role: 'Outreach & Partnerships Lead',
    bio: 'Builds MSC’s relationships with schools, libraries, and clinics — and makes sure resources reach the families who need them.',
  },
]

export const advisors: TeamMember[] = [
  {
    name: 'Coming Soon!', // TODO: replace placeholder
    role: 'Speech-Language Pathologist',
    bio: 'Advises on inclusive language learning materials for bilingual and neurodiverse communicators.',
  },
  {
    name: 'Coming Soon!', // TODO: replace placeholder
    role: 'Educator / ESL Specialist',
    bio: 'Guides tutor training and curriculum so volunteer sessions reflect best practices in language teaching.',
  },
  {
    name: 'Coming Soon!', // TODO: replace placeholder
    role: 'Physician',
    bio: 'Reviews health communication resources for accuracy and helps MSC stay clearly within its educational, non-clinical role.',
  },
]
