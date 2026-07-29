/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirects so old links and bookmarks keep working after the redesign.
  async redirects() {
    return [
      // --- Pre-rebrand / legacy paths ---
      { source: '/partner', destination: '/partners', permanent: true },
      { source: '/register', destination: '/volunteer', permanent: true },
      { source: '/login', destination: '/', permanent: true },
      { source: '/courses', destination: '/resources', permanent: true },
      { source: '/lessons', destination: '/resources', permanent: true },
      { source: '/activities', destination: '/resources', permanent: true },
      { source: '/downloads', destination: '/resources', permanent: true },
      { source: '/games', destination: '/resources', permanent: true },
      { source: '/quizzes', destination: '/resources', permanent: true },

      // --- Removed tool pages (healthcare-era; content off-mission) ---
      { source: '/phrase-library', destination: '/resources', permanent: true },
      { source: '/learn', destination: '/resources', permanent: true },
      { source: '/scorecard', destination: '/resources', permanent: true },
      // Outdated brand-kit page (references the former name/direction).
      { source: '/brand', destination: '/about', permanent: true },

      // --- Renamed / merged "What We Do" (program) URLs ---
      // Language Education now absorbs conversational Spanish + community events.
      { source: '/programs/language-and-communication-education', destination: '/programs/language-education', permanent: true },
      { source: '/programs/conversational-spanish', destination: '/programs/language-education', permanent: true },
      { source: '/programs/community-education-and-webinars', destination: '/programs/language-education', permanent: true },
      { source: '/programs/health-communication-resources', destination: '/programs/language-education', permanent: true },
      { source: '/programs/esl-tutoring', destination: '/programs/language-education', permanent: true },
      { source: '/programs/bilingual-healthcare-project', destination: '/programs/language-education', permanent: true },
      { source: '/programs/inclusive-language-learning', destination: '/programs/neurodivergent-and-student-resources', permanent: true },
      { source: '/programs/community-translation', destination: '/programs/family-and-educator-resources', permanent: true },
      { source: '/programs/creative-language-projects', destination: '/programs/youth-advocacy-and-volunteering', permanent: true },

      // --- Renamed resource URLs ("communication" -> "language") ---
      { source: '/resources/communication-and-self-advocacy-guide', destination: '/resources/language-and-self-advocacy-guide', permanent: true },
      { source: '/resources/bilingual-family-communication-guide', destination: '/resources/bilingual-family-language-guide', permanent: true },
      { source: '/resources/understanding-communication-differences-family', destination: '/resources/understanding-language-differences-family', permanent: true },
      { source: '/resources/inclusive-communication-in-the-classroom', destination: '/resources/inclusive-language-in-the-classroom', permanent: true },
    ]
  },
}

module.exports = nextConfig
