// MSC logo mark — a friendly speech bubble with a tilde (~) inside. The tilde
// nods to Spanish (the ñ) and to "casual"; the bubble to conversation and
// communication access. Brand teal tile + amber tilde. Pure SVG: crisp at any
// size.
//
// Usage:  <BrandMark className="w-9 h-9" />
// The same artwork is mirrored in src/app/icon.svg (the browser-tab favicon).
// If you change the design here, update that file too.

export default function BrandMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Make Spanish Casual logo"
    >
      {/* rounded teal tile */}
      <rect width="64" height="64" rx="16" fill="#1A6B72" />

      {/* white speech bubble with a tail */}
      <path
        d="M16 14 H48 A8 8 0 0 1 56 22 V36 A8 8 0 0 1 48 44 H28 L19 52 V44 H16 A8 8 0 0 1 8 36 V22 A8 8 0 0 1 16 14 Z"
        fill="#FFFFFF"
      />

      {/* amber tilde inside the bubble */}
      <path
        d="M19 31 C 23 24, 29 24, 32 29 C 35 34, 41 34, 45 27"
        stroke="#E8A020"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
