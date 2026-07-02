import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import CtaBand from '@/components/shared/CtaBand'
import Icon from '@/components/shared/Icons'
import { focusAreas, currentProjects, methods, publications } from '@/data/research'
import { blogPosts, formatPostDate } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Research & Innovation',
  description:
    'Student-led applied linguistics research: practical language input, AI-assisted language analysis, bilingual and neurodiverse communication, and health literacy.',
}

const statusColors: Record<string, string> = {
  Active: 'text-msc-teal bg-msc-teal-light',
  'In Analysis': 'text-msc-amber bg-msc-amber-light',
  Planning: 'text-gray-500 bg-gray-100',
}

export default function ResearchPage() {
  const researchPosts = blogPosts.slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow="Research & Innovation"
        title="Studying how people really communicate"
        description="MSC's student researchers investigate language input, communication access, and the tools that could improve both — then turn findings into free, practical resources."
        actions={[
          { label: 'Join as a Research Assistant', href: '/volunteer' },
          { label: 'Read Research Briefs', href: '/resources?category=research-summaries', variant: 'secondary' },
        ]}
      />

      {/* Focus areas */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Focus areas"
            title="What we study"
            description="Our work spans applied linguistics, health communication, and inclusive learning. Real-world, context-dependent language — including informal registers — is one thread within this broader picture."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area) => (
              <div key={area.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mb-5">
                  <Icon name={area.icon} className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-msc-charcoal mb-2">{area.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current projects */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Current projects"
            title="On the workbench right now"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {currentProjects.map((project) => (
              <div key={project.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <span className={`inline-block text-[11px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 mb-4 ${statusColors[project.status]}`}>
                  {project.status}
                </span>
                <h3 className="text-lg font-bold text-msc-charcoal mb-2.5 leading-snug">{project.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-50 rounded-full px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods + why it matters */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading align="left" eyebrow="How we work" title="Methods" />
              <div className="space-y-5">
                {methods.map((m) => (
                  <div key={m.title} className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center flex-shrink-0">
                      <Icon name="beaker" className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-msc-charcoal mb-1">{m.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading align="left" eyebrow="The point of it all" title="Why it matters" />
              <div className="bg-msc-teal rounded-2xl p-8 text-white">
                <ul className="space-y-4">
                  {[
                    'Language resources are usually built on assumptions. Research replaces assumptions with evidence about what learners and families actually encounter.',
                    'Bilingual and neurodiverse communicators are underrepresented in language research — our projects put them at the center.',
                    'Findings feed directly into our guides, tutoring methods, and tools, so the research never stops at a poster board.',
                    'Students learn to do rigorous, ethical research early — and carry that into healthcare, education, and science careers.',
                  ].map((item) => (
                    <li key={item.slice(0, 30)} className="flex items-start gap-3 text-sm leading-relaxed text-msc-teal-light">
                      <span className="text-msc-amber mt-0.5 flex-shrink-0">
                        <Icon name="check" className="w-4 h-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Output"
            title="Publications & presentations"
            description="Placeholder entries below — update src/data/research.ts as work is presented and published."
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {publications.map((pub) => (
              <div key={pub.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-msc-amber-light text-msc-amber flex items-center justify-center flex-shrink-0">
                  <Icon name="document-text" className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-msc-charcoal leading-snug mb-1">{pub.title}</h3>
                  <p className="text-sm text-gray-500">
                    {pub.type} · {pub.venue} · {pub.year}
                  </p>
                  {pub.note && <p className="text-xs text-gray-400 mt-1.5">{pub.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research-adjacent blog posts */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="From the blog"
            title="Research, explained simply"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {researchPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <p className="text-xs text-gray-400 mb-2">{formatPostDate(post.date)} · {post.readMinutes} min read</p>
                <h3 className="text-base font-bold text-msc-charcoal mb-2 group-hover:text-msc-teal transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <p className="text-center mt-10">
            <Link href="/blog" className="btn-secondary">Read the Blog</Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Curious? That's the only prerequisite."
        description="Join a study as a research assistant, propose your own question, or bring MSC research to your school's science fair."
        primary={{ label: 'Join the Research Team', href: '/volunteer' }}
        secondary={{ label: 'Ask About Collaboration', href: '/contact' }}
      />
    </>
  )
}
