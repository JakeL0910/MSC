import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import ResourceHub from '@/components/features/ResourceHub'

export const metadata: Metadata = {
  title: 'Resource Hub',
  description:
    'Free multilingual resources: healthcare Spanish, English for healthcare, family communication guides, ESL materials, neurodiverse language support, and volunteer toolkits.',
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resource Hub"
        title="Free resources, built for real situations"
        description="Every guide, toolkit, and phrase set below is free to download, print, and share. Filter by category or search for what you need."
      />

      <section className="py-16 bg-msc-cream/50">
        <div className="container">
          <ResourceHub />
        </div>
      </section>

      <CtaBand
        title="Want to help build the next resource?"
        description="Volunteers write, translate, design, and review everything in this hub. Propose a resource through our Volunteer Resource Builder."
        primary={{ label: 'Contribute a Resource', href: '/volunteer#contribute' }}
        secondary={{ label: 'Request a Resource', href: '/contact' }}
      />
    </>
  )
}
