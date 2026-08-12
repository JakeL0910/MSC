// Interior-page hero. Delegates to CinematicHero so EVERY page opens with the
// same dark, generative, editorial treatment that melts into the light content
// below — one change here keeps all interior pages uniform with the flagship
// pages. (The old light illustration hero is retired; `illustration` is accepted
// for call-site compatibility but no longer rendered — the signal field replaces
// it.)
import CinematicHero from './CinematicHero'
import { type IllustrationName } from './Illustration'

type Action = { label: string; href: string; variant?: 'primary' | 'secondary' }

export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  actions,
  illustration: _illustration,
}: {
  eyebrow?: string
  title: string
  titleAccent?: string
  description?: string
  actions?: Action[]
  illustration?: IllustrationName
}) {
  const fullTitle = titleAccent ? `${title} ${titleAccent}` : title
  const accent = titleAccent ? titleAccent.split(' ') : []
  const ghost = (eyebrow || 'MLC').toUpperCase().split(' ')[0]

  const mappedActions = actions?.map((a) => ({
    label: a.label,
    href: a.href,
    variant: (a.variant === 'secondary' ? 'outline-light' : 'light') as 'light' | 'outline-light',
  }))

  return (
    <CinematicHero
      eyebrow={eyebrow ?? 'The MLC Project'}
      title={fullTitle}
      accent={accent}
      description={description}
      actions={mappedActions}
      ghost={ghost}
      edgeLabel={eyebrow}
      footerLeft={eyebrow}
    />
  )
}
