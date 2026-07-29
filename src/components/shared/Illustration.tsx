// On-brand hero illustrations — self-contained inline SVG (no external assets),
// abstract and warm rather than literal photos of people. Decorative by default
// (aria-hidden). Used in page heroes via PageHero's `illustration` prop.
//
// Palette: teal #1A6B72 / light #E8F4F5, amber #E8A020 / light #FEF3D0,
// coral #E05C4B / light #FDECEA, cream #F8F6F1, charcoal #1C1C1E.

export type IllustrationName =
  | 'conversation'
  | 'community'
  | 'learning'
  | 'events'
  | 'multilingual'
  | 'advocacy'
  | 'resources'
  | 'story'
  | 'contact'
  | 'plan'

function Bubble({ x, y, w, h, fill, tail = 'left' }: { x: number; y: number; w: number; h: number; fill: string; tail?: 'left' | 'right' }) {
  const r = 14
  const ty = y + h
  const tx = tail === 'left' ? x + 22 : x + w - 22
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} />
      <path d={tail === 'left' ? `M${tx} ${ty - 6} l-4 16 l18 -12 Z` : `M${tx} ${ty - 6} l4 16 l-18 -12 Z`} fill={fill} />
    </g>
  )
}

function Scene({ name }: { name: IllustrationName }) {
  switch (name) {
    case 'conversation':
      return (
        <>
          <Bubble x={40} y={70} w={150} h={92} fill="#1A6B72" tail="left" />
          <Bubble x={210} y={140} w={150} h={84} fill="#E8A020" tail="right" />
          {[76, 104, 132].map((cx) => <circle key={cx} cx={cx} cy={116} r={9} fill="white" opacity="0.9" />)}
          {[250, 280, 310].map((cx) => <circle key={cx} cx={cx} cy={182} r={9} fill="#1C1C1E" opacity="0.8" />)}
          <circle cx={330} cy={70} r={10} fill="#E05C4B" />
          <circle cx={60} cy={210} r={7} fill="#E8A020" />
        </>
      )
    case 'community':
      return (
        <>
          <circle cx={200} cy={150} r={70} fill="#E8F4F5" />
          {[[200, 60], [300, 130], [270, 240], [130, 240], [100, 130]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy - 14} r={16} fill={['#1A6B72', '#E8A020', '#E05C4B', '#2f8f88', '#E8A020'][i]} />
              <path d={`M${cx - 22} ${cy + 30} a22 22 0 0 1 44 0 Z`} fill={['#1A6B72', '#E8A020', '#E05C4B', '#2f8f88', '#E8A020'][i]} opacity="0.85" />
              <line x1={200} y1={150} x2={cx} y2={cy} stroke="#1A6B72" strokeWidth={2} opacity="0.25" />
            </g>
          ))}
          <circle cx={200} cy={150} r={22} fill="#1A6B72" />
          <path d="M188 150 l8 8 l16 -16" stroke="white" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )
    case 'learning':
      return (
        <>
          <rect x={80} y={90} width="200" height="150" rx="16" fill="#1A6B72" />
          <rect x={104} y={70} width="200" height="150" rx="16" fill="white" stroke="#E8F4F5" strokeWidth="2" />
          <rect x={124} y={98} width="120" height="12" rx="6" fill="#1A6B72" opacity="0.85" />
          <rect x={124} y={122} width="160" height="9" rx="4.5" fill="#5f7377" opacity="0.4" />
          <rect x={124} y={140} width="140" height="9" rx="4.5" fill="#5f7377" opacity="0.4" />
          <rect x={124} y={158} width="150" height="9" rx="4.5" fill="#5f7377" opacity="0.4" />
          <path d="M300 70 l6 14 l14 6 l-14 6 l-6 14 l-6 -14 l-14 -6 l14 -6 Z" fill="#E8A020" />
        </>
      )
    case 'events':
      return (
        <>
          <rect x={90} y={80} width="220" height="180" rx="18" fill="white" stroke="#E8F4F5" strokeWidth="2" />
          <rect x={90} y={80} width="220" height="46" rx="18" fill="#1A6B72" />
          <rect x={90} y={108} width="220" height="18" fill="#1A6B72" />
          <circle cx={140} cy={72} r={8} fill="#135459" /><circle cx={260} cy={72} r={8} fill="#135459" />
          {Array.from({ length: 3 }).flatMap((_, r) =>
            Array.from({ length: 5 }).map((__, c) => {
              const hot = r === 1 && c === 2
              return <rect key={`${r}-${c}`} x={112 + c * 38} y={144 + r * 36} width="26" height="24" rx="6" fill={hot ? '#E8A020' : '#E8F4F5'} />
            }),
          )}
        </>
      )
    case 'multilingual':
      return (
        <>
          <Bubble x={44} y={80} w={150} h={90} fill="#1A6B72" tail="left" />
          <Bubble x={206} y={150} w={150} h={90} fill="#E8A020" tail="right" />
          <text x={119} y={135} textAnchor="middle" fontSize="34" fontWeight="700" fill="white">Hi</text>
          <text x={281} y={205} textAnchor="middle" fontSize="30" fontWeight="700" fill="#1C1C1E">Hola</text>
          <circle cx={360} cy={90} r={9} fill="#E05C4B" />
        </>
      )
    case 'advocacy':
      return (
        <>
          <path d="M70 150 l90 -34 v100 l-90 -34 Z" fill="#1A6B72" />
          <rect x={54} y={132} width="20" height="56" rx="6" fill="#135459" />
          <path d="M160 116 l60 -22 v148 l-60 -22 Z" fill="#E8A020" />
          {[250, 285, 320].map((x, i) => (
            <g key={x}>
              <path d={`M${x} ${120 - i * 6} q 16 -10 32 0`} stroke="#E05C4B" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d={`M${x} ${150} q 16 -10 32 0`} stroke="#1A6B72" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" />
            </g>
          ))}
        </>
      )
    case 'resources':
      return (
        <>
          <rect x={78} y={72} width="150" height="196" rx="14" fill="#E05C4B" opacity="0.9" transform="rotate(-8 153 170)" />
          <rect x={110} y={66} width="150" height="196" rx="14" fill="#E8A020" transform="rotate(-2 185 164)" />
          <rect x={140} y={70} width="150" height="196" rx="14" fill="white" stroke="#E8F4F5" strokeWidth="2" />
          <rect x={162} y={96} width="106" height="11" rx="5.5" fill="#1A6B72" />
          {[122, 142, 162, 182].map((y) => <rect key={y} x={162} y={y} width="96" height="8" rx="4" fill="#5f7377" opacity="0.4" />)}
          <rect x={162} y={214} width="60" height="22" rx="11" fill="#E8F4F5" />
        </>
      )
    case 'story':
      return (
        <>
          <path d="M60 90 h130 a14 14 0 0 1 14 14 v150 h-130 a14 14 0 0 1 -14 -14 Z" fill="#1A6B72" />
          <path d="M340 90 h-130 a14 14 0 0 0 -14 14 v150 h130 a14 14 0 0 0 14 -14 Z" fill="#135459" />
          <rect x={200} y={90} width="4" height="164" fill="#0f4a4f" />
          {[118, 138, 158, 178].map((y) => <rect key={`l${y}`} x={80} y={y} width="100" height="7" rx="3.5" fill="white" opacity="0.5" />)}
          {[118, 138, 158, 178].map((y) => <rect key={`r${y}`} x={222} y={y} width="100" height="7" rx="3.5" fill="white" opacity="0.35" />)}
          <text x={72} y={128} fontSize="60" fontWeight="700" fill="#E8A020" opacity="0.9">“</text>
        </>
      )
    case 'contact':
      return (
        <>
          <rect x={80} y={104} width="240" height="150" rx="16" fill="white" stroke="#E8F4F5" strokeWidth="2" />
          <path d="M80 120 l120 84 l120 -84" fill="none" stroke="#1A6B72" strokeWidth="4" strokeLinejoin="round" />
          <circle cx={300} cy={96} r={26} fill="#E8A020" />
          <path d="M289 96 h22 M300 85 v22" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </>
      )
    case 'plan':
      return (
        <>
          <rect x={110} y={64} width="180" height="220" rx="16" fill="white" stroke="#E8F4F5" strokeWidth="2" />
          <rect x={150} y={52} width="100" height="26" rx="13" fill="#1A6B72" />
          {[104, 140, 176, 212].map((y, i) => (
            <g key={y}>
              <rect x={134} y={y} width="20" height="20" rx="6" fill={i < 2 ? '#1A6B72' : '#E8F4F5'} />
              {i < 2 && <path d={`M138 ${y + 10} l4 4 l8 -9`} stroke="white" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
              <rect x={166} y={y + 5} width="96" height="10" rx="5" fill="#5f7377" opacity="0.4" />
            </g>
          ))}
        </>
      )
  }
}

export default function Illustration({
  name,
  className = '',
}: {
  name: IllustrationName
  className?: string
}) {
  return (
    <svg viewBox="0 0 400 340" className={className} role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {/* soft framed backdrop for cohesion */}
      <rect x="10" y="18" width="380" height="304" rx="28" fill="#F8F6F1" />
      <circle cx="60" cy="60" r="40" fill="#E8F4F5" opacity="0.8" />
      <circle cx="350" cy="300" r="46" fill="#FEF3D0" opacity="0.7" />
      <Scene name={name} />
    </svg>
  )
}
