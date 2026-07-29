// Grid of verified accomplishment highlights (no fabricated metrics). Data
// comes from src/data/site.ts (`highlights`) or can be passed directly.
// Tiles stagger in on scroll. Kept intentionally non-numeric until real,
// documented figures are available.
import type { Highlight } from '@/data/site'
import Reveal from '@/components/ui/Reveal'

export default function StatGrid({ items, dark = false }: { items: Highlight[]; dark?: boolean }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <Reveal key={item.label} delay={i * 0.08}>
          <li
            className={`h-full rounded-2xl p-6 transition-all duration-300 ${
              dark
                ? 'bg-white/10 hover:bg-white/15'
                : 'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1'
            }`}
          >
            <p className={`text-base font-bold leading-snug mb-1.5 ${dark ? 'text-white' : 'text-msc-teal'}`}>
              {item.label}
            </p>
            <p className={`text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
              {item.detail}
            </p>
          </li>
        </Reveal>
      ))}
    </ul>
  )
}
