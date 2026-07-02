import Link from 'next/link'
import NewsletterSignup from './NewsletterSignup'
import { site } from '@/data/site'

function TwitterIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const programLinks = [
  { label: 'Health Communication Resources', href: '/programs/health-communication-resources' },
  { label: 'ESL & Language Tutoring', href: '/programs/esl-tutoring' },
  { label: 'Inclusive Language Learning', href: '/programs/inclusive-language-learning' },
  { label: 'Youth Research & Innovation', href: '/programs/youth-research' },
  { label: 'All Programs', href: '/programs' },
]

const resourceLinks = [
  { label: 'Resource Hub', href: '/resources' },
  { label: 'Healthcare Phrase Library', href: '/phrase-library' },
  { label: 'MSC Learn', href: '/learn' },
  { label: 'Communication Scorecard', href: '/scorecard' },
  { label: 'Blog & Updates', href: '/blog' },
]

const orgLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Impact', href: '/impact' },
  { label: 'Research & Innovation', href: '/research' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Partner With Us', href: '/partners' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-msc-charcoal text-gray-300">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <span className="w-9 h-9 rounded-xl bg-msc-teal text-white flex items-center justify-center font-bold text-sm">
                {site.acronym}
              </span>
              <span className="text-xl font-bold text-white">{site.name}</span>
            </Link>
            <p className="text-sm text-gray-400 mb-1">Youth-led · {site.legalLine}</p>
            <p className="text-sm text-gray-400 leading-relaxed mt-3 max-w-sm">
              {site.mission}
            </p>
            <p className="text-sm text-msc-amber font-semibold mt-4 italic">
              Language is access.
            </p>

            {/* Social links — update URLs in src/data/site.ts */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: site.social.twitter, label: 'Twitter / X', Icon: TwitterIcon },
                { href: site.social.instagram, label: 'Instagram', Icon: InstagramIcon },
                { href: site.social.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
                { href: site.social.youtube, label: 'YouTube', Icon: YouTubeIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Programs</h3>
            <ul className="space-y-2.5">
              {programLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Organization</h3>
            <ul className="space-y-2.5">
              {orgLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/donate" className="text-sm text-msc-amber hover:text-amber-400 font-medium transition-colors">
                  Make a Donation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border border-gray-800 rounded-2xl px-6 py-5 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Stay updated</p>
              <p className="text-xs text-gray-400 mt-0.5">New resources, research, and volunteer opportunities — about once a month.</p>
            </div>
            <NewsletterSignup />
          </div>
        </div>

        {/* Educational disclaimer */}
        <p className="text-xs text-gray-500 leading-relaxed mb-6 max-w-3xl">
          MSC provides educational resources and communication support. We are not a medical
          provider and our materials are not medical advice or a substitute for professional
          interpretation, evaluation, or care.
        </p>

        <div className="border-t border-gray-800 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {site.name}. All rights reserved. {site.legalLine}.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <a href={`mailto:${site.email}`} className="hover:text-gray-300 transition-colors">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
