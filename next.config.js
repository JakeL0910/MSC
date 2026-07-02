/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirects from pre-rebrand URLs so old links and bookmarks keep working.
  async redirects() {
    return [
      { source: '/partner', destination: '/partners', permanent: true },
      { source: '/courses', destination: '/learn', permanent: true },
      { source: '/downloads', destination: '/resources', permanent: true },
      { source: '/register', destination: '/volunteer', permanent: true },
      { source: '/login', destination: '/', permanent: true },
      { source: '/lessons', destination: '/resources', permanent: true },
      { source: '/activities', destination: '/resources', permanent: true },
      { source: '/games', destination: '/learn', permanent: true },
      { source: '/quizzes', destination: '/learn', permanent: true },
    ]
  },
}

module.exports = nextConfig
