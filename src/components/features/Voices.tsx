// Voices: real community stories. Renders a quote grid when stories exist,
// otherwise a warm "share your story" invitation (never fake quotes).
import Image from 'next/image'
import Link from 'next/link'
import { stories } from '@/data/stories'

const shareHref = '/share-story'

export default function Voices({ dark = false }: { dark?: boolean }) {
  if (stories.length === 0) {
    return (
      <div
        className={`rounded-3xl border p-8 md:p-10 text-center ${
          dark ? 'border-white/15 bg-white/10' : 'border-msc-teal/15 bg-msc-teal-light/40'
        }`}
      >
        <h3 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-msc-charcoal'}`}>
          Share your story
        </h3>
        <p className={`mx-auto mt-2 max-w-xl text-sm leading-relaxed ${dark ? 'text-white/80' : 'text-gray-600'}`}>
          Learned some Spanish with us, used a resource, or volunteered? We’d love to hear how it
          went, and to share it here.
        </p>
        <Link href={shareHref} className="btn-primary mt-6 inline-flex">Tell us your story</Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stories.map((s) => (
        <figure key={s.name + s.quote.slice(0, 16)} className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
          <blockquote className="flex-1 text-sm leading-relaxed text-gray-700">“{s.quote}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            {s.photo ? (
              <Image src={s.photo} alt={s.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
            ) : (
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-msc-teal-light text-sm font-bold text-msc-teal">
                {s.name.charAt(0)}
              </span>
            )}
            <span>
              <span className="block text-sm font-bold text-msc-charcoal">{s.name}</span>
              <span className="block text-xs text-gray-500">{s.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
      <div className="md:col-span-3 text-center">
        <Link href={shareHref} className="text-sm font-semibold text-msc-teal hover:underline">
          Share your story →
        </Link>
      </div>
    </div>
  )
}
