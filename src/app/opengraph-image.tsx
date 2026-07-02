// Social preview (Open Graph) image, generated at build time.
// Shows up when the site is shared on social media / messaging apps.
import { ImageResponse } from 'next/og'
import { site } from '@/data/site'

export const runtime = 'edge'
export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #1A6B72 0%, #135459 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: '#E8A020',
              color: '#1C1C1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            MSC
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ fontSize: '58px', fontWeight: 700, lineHeight: 1.15, maxWidth: '950px' }}>
          Bridging language gaps in healthcare, education, and community life.
        </div>
        <div style={{ fontSize: '26px', marginTop: '36px', color: '#E8F4F5' }}>
          Youth-led · Free multilingual resources · Student research
        </div>
      </div>
    ),
    size
  )
}
