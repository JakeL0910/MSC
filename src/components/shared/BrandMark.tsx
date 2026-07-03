// MSC logo mark — two overlapping speech bubbles (a conversation / a collective)
// on a rounded app-tile, in brand teal + amber. Pure SVG: crisp at any size.
//
// Usage:  <BrandMark className="w-9 h-9" />
// The same artwork is mirrored in src/app/icon.svg (the browser-tab favicon)
// and in the social preview at src/app/opengraph-image.tsx — if you change the
// design here, update those too.

export default function BrandMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MSC logo"
    >
      {/* rounded teal tile */}
      <rect width="64" height="64" rx="15" fill="#1A6B72" />

      {/* amber speech bubble (behind) */}
      <path
        d="M34 24 H44 A6 6 0 0 1 50 30 V36 A6 6 0 0 1 44 42 H42 L38 47 V42 H34 A6 6 0 0 1 28 36 V30 A6 6 0 0 1 34 24 Z"
        fill="#E8A020"
      />

      {/* white speech bubble (front), teal outline to separate from amber */}
      <path
        d="M18 14 H34 A6 6 0 0 1 40 20 V28 A6 6 0 0 1 34 34 H26 L21 39 V34 H18 A6 6 0 0 1 12 28 V20 A6 6 0 0 1 18 14 Z"
        fill="#FFFFFF"
        stroke="#1A6B72"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
