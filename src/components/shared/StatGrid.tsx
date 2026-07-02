// Grid of headline stats. Data comes from src/data/site.ts (or pass your own).
import type { Stat } from '@/data/site'

export default function StatGrid({ items, dark = false }: { items: Stat[]; dark?: boolean }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-2xl p-6 text-center ${
            dark ? 'bg-white/10' : 'bg-white border border-gray-100 shadow-sm'
          }`}
        >
          <dd className={`text-3xl md:text-4xl font-bold mb-1.5 ${dark ? 'text-white' : 'text-msc-teal'}`}>
            {stat.value}
          </dd>
          <dt className={`text-sm font-semibold ${dark ? 'text-msc-teal-light' : 'text-msc-charcoal'}`}>
            {stat.label}
          </dt>
          {stat.detail && (
            <p className={`text-xs mt-1.5 ${dark ? 'text-white/60' : 'text-gray-500'}`}>{stat.detail}</p>
          )}
        </div>
      ))}
    </dl>
  )
}
