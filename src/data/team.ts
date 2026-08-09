// ----------------------------------------------------------------------------
// TEAM & FOUNDER
// Only include real people. Placeholder/invented team members have been
// removed. Add real volunteers and mentors here (with their consent) as the
// team is confirmed — see completion report for what's still needed.
// ----------------------------------------------------------------------------

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo?: string
  // Longer narrative used only in the Founder Story section.
  story?: string[]
}

export const founder: TeamMember = {
  name: 'Jake Li',
  role: 'Founder',
  bio: 'Jake started The MLC Project as a student and helps lead its work in accessible language.',
  story: [
    'It started with a simple observation: the Spanish people speak is different from the Spanish textbooks teach. Jake shared free, practical materials to close that gap, and a community grew around it.',
    'Later, work in language advocacy and language sample analysis (SALT annotation of Spanish–English caregiver–child speech) deepened his interest in how people use language across bilingual and neurodevelopmental contexts, motivating MLC’s expansion toward accessible language. This is personal background, not a service MLC provides.',
  ],
}

// Mentors/advisors: intentionally empty until real advisors consent to be
// listed. The About page shows a general "volunteer-driven, mentor-guided" note while
// this is empty — do not add invented names or credentials.
export const advisors: TeamMember[] = []
