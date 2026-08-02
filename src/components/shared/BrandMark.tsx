// MSC logo mark — two overlapping speech bubbles (teal + coral) with a forward
// arrow. The bubbles read as conversation and exchange; the arrow as moving
// language forward and making it accessible. Brand teal + coral, no background
// tile, so it sits cleanly on any surface. Pure SVG: crisp at any size.
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
      {/* teal bubble (back) — carries the forward arrow */}
      <rect x="5" y="9" width="32" height="32" rx="10" fill="#1A6B72" />

      {/* coral speech bubble (front), with a tail — conversation */}
      <path
        d="M37 19 H49 A10 10 0 0 1 59 29 V37 A10 10 0 0 1 49 47 H44 L50 55 L38 47 H37 A10 10 0 0 1 27 37 V29 A10 10 0 0 1 37 19 Z"
        fill="#E05C4B"
      />

      {/* white forward arrow inside the teal bubble */}
      <path
        d="M13 15 L24 26 M24 26 H17 M24 26 V19"
        stroke="#FFFFFF"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
