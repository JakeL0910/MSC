import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import StoryForm from '@/components/features/StoryForm'

export const metadata: Metadata = {
  title: 'Share Your Story',
  description:
    'Learned some Spanish with The MLC Project, used a resource, or volunteered? Tell us how it went. With your permission, we may share it to help others.',
}

export default function ShareStoryPage() {
  return (
    <>
      <PageHero
        illustration="story"
        eyebrow="Voices"
        title="Share your story"
        description="Learned some Spanish, used a resource, or volunteered with us? Tell us how it went. Real stories help other students, families, and educators know what to expect."
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <StoryForm />
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer to talk first?"
        description="You can always reach a real person on the team."
        primary={{ label: 'Contact Us', href: '/contact' }}
        secondary={{ label: 'Explore Resources', href: '/resources' }}
      />
    </>
  )
}
