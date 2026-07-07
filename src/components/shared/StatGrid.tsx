// Grid of headline stats. Data comes from src/data/site.ts (or pass your own).
// Tiles stagger in on scroll and the numbers count up.
import type { Stat } from '@/data/site'
import Reveal from '@/components/ui/Reveal'
import CountUp from '@/components/ui/CountUp'

export default function StatGrid({ items, dark = false }: { items: Stat[]; dark?: boolean }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.08}>
          <div
            className={`h-full rounded-2xl p-6 text-center transition-all duration-300 ${
              dark
                ? 'bg-white/10 hover:bg-white/15'
                : 'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1'
            }`}
          >
            <dd className={`text-3xl md:text-4xl font-bold mb-1.5 ${dark ? 'text-white' : 'text-msc-teal'}`}>
              <CountUp value={stat.value} />
            </dd>
            <dt className={`text-sm font-semibold ${dark ? 'text-msc-teal-light' : 'text-msc-charcoal'}`}>
              {stat.label}
            </dt>
            {stat.detail && (
              <p className={`text-xs mt-1.5 ${dark ? 'text-white/60' : 'text-gray-500'}`}>{stat.detail}</p>
            )}
          </div>
        </Reveal>
      ))}
    </dl>
  )
}
