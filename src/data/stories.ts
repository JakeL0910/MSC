// ----------------------------------------------------------------------------
// VOICES / STORIES
// Real quotes from the community (learners, families, volunteers, educators).
//
// HONESTY: only add stories that are REAL and shared WITH PERMISSION. Do not
// invent quotes. Until this list has real entries, the Voices section shows a
// friendly "share your story" invitation instead of empty or fake content.
//
// To add a photo, drop it in /public/stories/ and set `photo: '/stories/x.jpg'`.
// ----------------------------------------------------------------------------

export interface Story {
  quote: string
  name: string
  role: string // e.g. 'Parent', 'Student volunteer', 'Educator'
  photo?: string
}

export const stories: Story[] = [
  // Add real, permissioned stories here. Example shape:
  // { quote: '…', name: 'First name', role: 'Parent', photo: '/stories/name.jpg' },
]
