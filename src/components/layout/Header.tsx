'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site } from '@/data/site'
import BrandMark from '@/components/shared/BrandMark'

// ---------------------------------------------------------------------------
// NAVIGATION STRUCTURE — edit these arrays to change the menus.
// ---------------------------------------------------------------------------
const aboutMenu = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Impact', href: '/impact' },
  { label: 'Blog & Updates', href: '/blog' },
]

const resourcesMenu = [
  { label: 'Resource Hub', href: '/resources' },
  { label: 'Healthcare Phrase Library', href: '/phrase-library' },
  { label: 'MSC Learn (Flashcards)', href: '/learn' },
  { label: 'Communication Scorecard', href: '/scorecard' },
]

const involvedMenu = [
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Partner With Us', href: '/partners' },
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
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
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

  // Close menus on route change
  useEffect(() => {
    setOpenDropdown(null)
    setMobileOpen(false)
  }, [pathname])

  const toggle = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name))

  const isSection = (prefixes: string[]) =>
    prefixes.some((p) => (p === '/' ? pathname === '/' : pathname.startsWith(p)))

  const plainLink = (href: string, label: string) => (
    <Link
      href={href}
      aria-current={isSection([href]) ? 'page' : undefined}
      className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
        isSection([href])
          ? 'text-msc-teal bg-msc-teal-light'
          : 'text-gray-700 hover:text-msc-teal hover:bg-msc-teal-light'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <BrandMark className="w-9 h-9 transition-transform group-hover:scale-105" />
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold text-msc-charcoal group-hover:text-msc-teal transition-colors">
                Multilingual Support Collective
              </span>
              <span className="text-[11px] text-gray-500 font-medium">
                Youth-led · {site.legalLine}
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-0.5" aria-label="Primary navigation">
            <NavDropdown
              label="About"
              items={aboutMenu}
              open={openDropdown === 'About'}
              onToggle={() => toggle('About')}
              onClose={() => setOpenDropdown(null)}
              isActive={isSection(['/about', '/impact', '/blog'])}
            />

            {plainLink('/programs', 'Programs')}

            <NavDropdown
              label="Resources"
              items={resourcesMenu}
              open={openDropdown === 'Resources'}
              onToggle={() => toggle('Resources')}
              onClose={() => setOpenDropdown(null)}
              isActive={isSection(['/resources', '/phrase-library', '/learn', '/scorecard'])}
            />

            <NavDropdown
              label="Get Involved"
              items={involvedMenu}
              open={openDropdown === 'Get Involved'}
              onToggle={() => toggle('Get Involved')}
              onClose={() => setOpenDropdown(null)}
              isActive={isSection(['/volunteer', '/partners', '/contact'])}
            />
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/volunteer"
              className="px-4 py-2 rounded-xl text-sm font-semibold border-2 border-msc-teal text-msc-teal hover:bg-msc-teal hover:text-white transition-all duration-200"
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-msc-amber text-msc-charcoal hover:bg-amber-400 hover:-translate-y-0.5 transition-all duration-200"
            >
              Donate
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
        <div className="lg:hidden bg-white border-t border-gray-100 py-3 px-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link
            href="/programs"
            className="block py-2.5 text-sm font-medium text-gray-700 border-b border-gray-50"
            onClick={() => setMobileOpen(false)}
          >
            Programs
          </Link>

          {[
            { label: 'About', items: aboutMenu },
            { label: 'Resources', items: resourcesMenu },
            { label: 'Get Involved', items: involvedMenu },
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

          <div className="flex gap-3 pt-3">
            <Link
              href="/volunteer"
              className="flex-1 text-center py-2.5 text-sm font-semibold border-2 border-msc-teal rounded-xl text-msc-teal"
              onClick={() => setMobileOpen(false)}
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="flex-1 text-center py-2.5 text-sm font-semibold rounded-xl bg-msc-amber text-msc-charcoal"
              onClick={() => setMobileOpen(false)}
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
