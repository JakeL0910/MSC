'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const programs = [
  { label: 'Healthcare Spanish Initiative', href: '/programs/healthcare-spanish' },
  { label: 'Community Learning Platform', href: '/programs/community' },
  { label: 'Language Access Advocacy', href: '/programs/advocacy' },
]

const learn = [
  { label: 'Courses', href: '/courses' },
  { label: 'Resource Center', href: '/resources' },
  { label: 'Free Registration', href: '/register' },
]

const about = [
  { label: 'About MSC', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

function NavDropdown({
  label,
  items,
  open,
  onToggle,
  onClose,
  isActive,
}: {
  label: string
  items: { label: string; href: string }[]
  open: boolean
  onToggle: () => void
  onClose: () => void
  isActive: boolean
}) {
  return (
    <div className="relative px-1">
      <button
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
          isActive
            ? 'text-msc-teal bg-msc-teal-light'
            : 'text-gray-700 hover:text-msc-teal hover:bg-msc-teal-light'
        }`}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={onClose}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-msc-teal-light hover:text-msc-teal font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Close on click outside nav
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null)
    setMobileOpen(false)
  }, [pathname])

  const toggle = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name))

  const isSection = (prefix: string) =>
    prefix === '/' ? pathname === '/' : pathname.startsWith(prefix)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className="text-xl font-bold text-msc-teal group-hover:text-msc-teal-dark transition-colors">
              Make Spanish Casual
            </span>
            <span className="text-xs text-gray-500 font-medium">Language Access | 501(c)3 Nonprofit</span>
          </Link>

          {/* Desktop Nav */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                pathname === '/'
                  ? 'text-msc-teal bg-msc-teal-light'
                  : 'text-gray-700 hover:text-msc-teal hover:bg-msc-teal-light'
              }`}
            >
              Home
            </Link>

            <NavDropdown
              label="Programs"
              items={programs}
              open={openDropdown === 'Programs'}
              onToggle={() => toggle('Programs')}
              onClose={() => setOpenDropdown(null)}
              isActive={isSection('/programs')}
            />

            <NavDropdown
              label="Learn"
              items={learn}
              open={openDropdown === 'Learn'}
              onToggle={() => toggle('Learn')}
              onClose={() => setOpenDropdown(null)}
              isActive={isSection('/courses') || isSection('/resources')}
            />

            <NavDropdown
              label="About"
              items={about}
              open={openDropdown === 'About'}
              onToggle={() => toggle('About')}
              onClose={() => setOpenDropdown(null)}
              isActive={isSection('/about') || isSection('/blog') || isSection('/contact')}
            />

            <Link
              href="/partner"
              aria-current={isSection('/partner') ? 'page' : undefined}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                isSection('/partner')
                  ? 'text-msc-teal bg-msc-teal-light'
                  : 'text-gray-700 hover:text-msc-teal hover:bg-msc-teal-light'
              }`}
            >
              Partner
            </Link>

            {/* Donate — amber button to stand out */}
            <Link
              href="/donate"
              className="ml-1 px-4 py-2 rounded-xl text-sm font-semibold bg-msc-amber text-msc-charcoal hover:bg-amber-400 hover:-translate-y-0.5 transition-all duration-200"
            >
              Donate
            </Link>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-msc-teal transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-msc-amber text-msc-charcoal hover:bg-amber-400 hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-3 px-4">
          <Link
            href="/"
            className="block py-2.5 text-sm font-medium text-gray-700 border-b border-gray-50"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {[
            { label: 'Programs', items: programs },
            { label: 'Learn', items: learn },
            { label: 'About', items: about },
          ].map(({ label, items }) => (
            <div key={label} className="border-b border-gray-50">
              <button
                className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-gray-700"
                onClick={() => setMobileExpanded(mobileExpanded === label ? null : label)}
                aria-expanded={mobileExpanded === label}
              >
                {label}
                <svg
                  className={`w-4 h-4 transition-transform ${mobileExpanded === label ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === label && (
                <div className="pb-2 pl-3">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-sm text-gray-600 hover:text-msc-teal transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/partner"
            className="block py-2.5 text-sm font-medium text-gray-700 border-b border-gray-50"
            onClick={() => setMobileOpen(false)}
          >
            Partner
          </Link>
          <Link
            href="/donate"
            className="block py-2.5 text-sm font-semibold text-msc-amber border-b border-gray-50"
            onClick={() => setMobileOpen(false)}
          >
            Donate
          </Link>

          <div className="flex gap-3 pt-3">
            <Link
              href="/login"
              className="flex-1 text-center py-2.5 text-sm font-medium border border-gray-200 rounded-xl text-gray-700 hover:border-msc-teal hover:text-msc-teal transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="flex-1 text-center py-2.5 text-sm font-semibold rounded-xl bg-msc-amber text-msc-charcoal"
              onClick={() => setMobileOpen(false)}
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
