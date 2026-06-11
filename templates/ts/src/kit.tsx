import type { ReactNode } from 'react'

/*
 * Slide kit. Every component renders inside a 1280x720 frame.
 * Styling lives in deck.css and uses brand/tokens.css variables only.
 */

const EVENT = 'alphalist Developer Bootcamp / Hamburg / June 16-17, 2026'

export function Slide({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return <div className={center ? 'slide slide-center' : 'slide'}>{children}</div>
}

export function Cover({
  title,
  subtitle,
  presenters,
  event = EVENT,
}: {
  title: ReactNode
  subtitle?: ReactNode
  presenters?: string
  event?: string
}) {
  return (
    <div className="slide slide-center cover">
      <div className="cover-bar" />
      <div className="eyebrow">{event}</div>
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {presenters && <p className="presenters">{presenters}</p>}
    </div>
  )
}

export function Section({ kicker, title, subtitle }: { kicker?: string; title: ReactNode; subtitle?: ReactNode }) {
  return (
    <div className="slide slide-center section">
      {kicker && <div className="eyebrow eyebrow-purple">{kicker}</div>}
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      <div className="section-bar" />
    </div>
  )
}

export function Bullets({ title, items }: { title: ReactNode; items: ReactNode[] }) {
  return (
    <Slide>
      <h1>{title}</h1>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Slide>
  )
}

export function Cols({ title, left, right }: { title?: ReactNode; left: ReactNode; right: ReactNode }) {
  return (
    <Slide>
      {title && <h1>{title}</h1>}
      <div className="cols">
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </Slide>
  )
}

export function Code({ title, code }: { title?: ReactNode; code: string }) {
  return (
    <Slide>
      {title && <h1>{title}</h1>}
      <pre className="code-panel">
        <code>{code.trim()}</code>
      </pre>
    </Slide>
  )
}

export function Exercise({
  title,
  duration,
  children,
}: {
  title: ReactNode
  duration?: string
  children: ReactNode
}) {
  return (
    <Slide>
      <div className="exercise-header">
        <span className="chip chip-teal">Exercise</span>
        {duration && <span className="chip chip-amber">{duration}</span>}
      </div>
      <h1>{title}</h1>
      {children}
    </Slide>
  )
}
