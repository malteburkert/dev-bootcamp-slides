import { createContext, useContext, type ReactNode } from 'react'

/*
 * Slide kit. Every component renders inside the responsive frame (designed at 1280x720).
 * Styling lives in deck.css and uses brand/tokens.css variables only.
 *
 * Step reveals: a slide entry in slides.tsx can be { node, steps: N }. Arrow keys then
 * advance the reveal before moving to the next slide. Components with a `stepped` prop
 * dim their items until the matching step; <Step at={n}> does the same for custom content.
 * In print mode everything renders fully revealed.
 */

export type SlideDef = ReactNode | { node: ReactNode; steps: number }

export const StepContext = createContext(Number.POSITIVE_INFINITY)

const useStep = () => useContext(StepContext)

export function Step({ at, block = false, children }: { at: number; block?: boolean; children: ReactNode }) {
  const step = useStep()
  const cls = step < at ? 'step step-dim' : 'step'
  return block ? <div className={cls}>{children}</div> : <span className={cls}>{children}</span>
}

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

/* full-screen claim, one accented word via <Accent> */
export function Statement({
  eyebrow,
  sub,
  children,
}: {
  eyebrow?: string
  sub?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="slide slide-center statement">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1 className="statement-h">{children}</h1>
      {sub && <p className="subtitle">{sub}</p>}
    </div>
  )
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="accent">{children}</span>
}

/* full-screen mono date beat */
export function BigDate({ eyebrow, date }: { eyebrow: string; date: string }) {
  return (
    <div className="slide slide-center bigdate">
      <div className="eyebrow">{eyebrow}</div>
      <div className="bigdate-d">{date}</div>
    </div>
  )
}

export function Bullets({ title, items, stepped = false }: { title: ReactNode; items: ReactNode[]; stepped?: boolean }) {
  const step = useStep()
  return (
    <Slide>
      <h1>{title}</h1>
      <ul>
        {items.map((item, i) => (
          <li key={i} className={stepped && i > step ? 'step step-dim' : 'step'}>
            {item}
          </li>
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

export type Stage = { num: string; title: string; badge?: string; tone?: 'teal' | 'purple' | 'amber' }

export function StageCards({
  eyebrow,
  title,
  stages,
  note,
  stepped = false,
}: {
  eyebrow?: string
  title: ReactNode
  stages: Stage[]
  note?: string
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <Slide>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <div className="stages">
        {stages.map((s, i) => (
          <div key={s.num} className={`stage-card step${stepped && i > step ? ' step-dim' : ''}`}>
            <span className="stage-num">{s.num}</span>
            <span className="stage-title">{s.title}</span>
            {s.badge && <span className={`chip chip-${s.tone ?? 'teal'}`}>{s.badge}</span>}
          </div>
        ))}
      </div>
      {note && <div className="source-note">{note}</div>}
    </Slide>
  )
}

/* circular three-stop loop diagram */
function Cycle({ stops, badge }: { stops: [string, string, string]; badge: string }) {
  return (
    <div className="cycle">
      <svg viewBox="0 0 200 200" className="cycle-svg" aria-hidden="true">
        <defs>
          <marker
            id="arr"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5.5"
            markerHeight="5.5"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
          <path d="M 112 31 A 70 70 0 0 1 169 112" markerEnd="url(#arr)" />
          <path d="M 154 145 A 70 70 0 0 1 46 145" markerEnd="url(#arr)" />
          <path d="M 31 112 A 70 70 0 0 1 88 31" markerEnd="url(#arr)" />
        </g>
      </svg>
      <span className="cycle-label cycle-top">{stops[0]}</span>
      <span className="cycle-label cycle-right">{stops[1]}</span>
      <span className="cycle-label cycle-left">{stops[2]}</span>
      <span className="chip chip-amber cycle-badge">{badge}</span>
    </div>
  )
}

export function LoopCompare({
  title,
  leftTitle,
  leftStops,
  leftBadge,
  leftPrompt,
  rightTitle,
  rightSteps,
  rightPrompt,
  footer,
  stepped = false,
}: {
  title: ReactNode
  leftTitle: string
  leftStops: [string, string, string]
  leftBadge: string
  leftPrompt: string
  rightTitle: string
  rightSteps: { num: string; title: string; dur: string }[]
  rightPrompt: string
  footer?: ReactNode
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <Slide>
      <h1>{title}</h1>
      <div className="loopcmp">
        <div className="loopcmp-col step">
          <h2>{leftTitle}</h2>
          <Cycle stops={leftStops} badge={leftBadge} />
          <div className="prompt-bar">{leftPrompt}</div>
        </div>
        <div className={`loopcmp-col step${stepped && step < 1 ? ' step-dim' : ''}`}>
          <h2>{rightTitle}</h2>
          <div className="loopcmp-steps">
            {rightSteps.map((s) => (
              <div key={s.num} className="loopcmp-step">
                <span className="stage-num">{s.num}</span>
                <span className="loopcmp-step-t">{s.title}</span>
                <span className="chip chip-teal">{s.dur}</span>
              </div>
            ))}
          </div>
          <div className="prompt-bar">{rightPrompt}</div>
        </div>
      </div>
      {footer && <p className={`loopcmp-footer step${stepped && step < 2 ? ' step-dim' : ''}`}>{footer}</p>}
    </Slide>
  )
}

/* grid of titled cards */
export function CardGrid({
  eyebrow,
  title,
  cards,
  stepped = false,
}: {
  eyebrow?: string
  title: ReactNode
  cards: { title: string; desc: string }[]
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <Slide>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <div className="cardgrid">
        {cards.map((c, i) => (
          <div key={c.title} className={`cardgrid-card step${stepped && i > step ? ' step-dim' : ''}`}>
            <span className="cardgrid-t">{c.title}</span>
            <span className="cardgrid-d">{c.desc}</span>
          </div>
        ))}
      </div>
    </Slide>
  )
}

export type Layer = {
  n: string
  title: string
  desc: string
  when: string
  tone: 'teal' | 'purple' | 'amber' | 'green'
}

/* stacked layers map, first entry at the bottom; steps reveal bottom-up */
export function Layers({
  eyebrow,
  title,
  layers,
  stepped = false,
}: {
  eyebrow?: string
  title: ReactNode
  layers: Layer[]
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <Slide>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <div className="layers">
        {layers
          .map((l, i) => ({ l, i }))
          .reverse()
          .map(({ l, i }) => (
            <div key={l.n} className={`layer layer-${l.tone} step${stepped && i > step ? ' step-dim' : ''}`}>
              <span className="layer-n">{l.n}</span>
              <span className="layer-body">
                <span className="layer-t">{l.title}</span>
                <span className="layer-d">{l.desc}</span>
              </span>
              <span className="chip chip-plain">{l.when}</span>
            </div>
          ))}
      </div>
    </Slide>
  )
}

/* big stacked numbers */
export function BigStats({
  eyebrow,
  title,
  stats,
  note,
  stepped = false,
}: {
  eyebrow?: string
  title?: ReactNode
  stats: { value: string; label: string; tone: 'amber' | 'teal' }[]
  note?: string
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <Slide center>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {title && <h1>{title}</h1>}
      <div className="bigstats">
        {stats.map((s, i) => (
          <div key={s.value} className={`bigstat step${stepped && i > step ? ' step-dim' : ''}`}>
            <span className={`bigstat-v bigstat-${s.tone}`}>{s.value}</span>
            <span className="bigstat-l">{s.label}</span>
          </div>
        ))}
      </div>
      {note && <div className="source-note">{note}</div>}
    </Slide>
  )
}

/* numbered list with optional hints; when stepped, the footer reveals last */
export function NumberedList({
  eyebrow,
  title,
  items,
  chips,
  footer,
  stepped = false,
}: {
  eyebrow?: string
  title: ReactNode
  items: { text: string; hint?: string }[]
  chips?: { label: string; tone: 'teal' | 'amber' }[]
  footer?: ReactNode
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <Slide>
      {chips && (
        <div className="exercise-header">
          {chips.map((c) => (
            <span key={c.label} className={`chip chip-${c.tone}`}>
              {c.label}
            </span>
          ))}
        </div>
      )}
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <div className="numlist">
        {items.map((it, i) => (
          <div key={i} className={`numlist-row step${stepped && i > step ? ' step-dim' : ''}`}>
            <span className="stage-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="numlist-body">
              <span className="numlist-t">{it.text}</span>
              {it.hint && <span className="numlist-h">{it.hint}</span>}
            </span>
          </div>
        ))}
      </div>
      {footer && (
        <p className={`numlist-footer step${stepped && step < items.length ? ' step-dim' : ''}`}>{footer}</p>
      )}
    </Slide>
  )
}

/* timed agenda, days side by side */
export function Agenda({
  title,
  days,
}: {
  title: ReactNode
  days: { kicker: string; heading: string; rows: { t: string; s: string; now?: boolean }[] }[]
}) {
  return (
    <Slide>
      <h1>{title}</h1>
      <div className="agenda">
        {days.map((d) => (
          <div key={d.kicker} className="agenda-day">
            <div className="eyebrow">{d.kicker}</div>
            <h2>{d.heading}</h2>
            <div className="agenda-rows">
              {d.rows.map((r) => (
                <div key={r.t + r.s} className={r.now ? 'agenda-row agenda-now' : 'agenda-row'}>
                  <span className="agenda-t">{r.t}</span>
                  <span className="agenda-s">{r.s}</span>
                  {r.now && <span className="chip chip-amber">now</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* host cards: photo, name, role tag, short bio, linkedin.
 * Photos resolve by slug from ./assets/hosts/<slug>.{jpg,jpeg,png}; missing ones fall back to initials. */
const hostPhotos = import.meta.glob('./assets/hosts/*.{jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const photoFor = (slug: string) => Object.entries(hostPhotos).find(([p]) => p.includes(`/${slug}.`))?.[1]

export function Hosts({
  eyebrow,
  people,
}: {
  eyebrow: string
  people: { slug: string; name: string; role: string; bio: string; linkedin?: string }[]
}) {
  return (
    <Slide>
      <div className="eyebrow">{eyebrow}</div>
      <div className="hosts">
        {people.map((p) => {
          const photo = photoFor(p.slug)
          return (
            <div key={p.slug} className="host">
              {photo ? (
                <img className="host-photo" src={photo} alt={p.name} />
              ) : (
                <span className="host-photo host-fallback">
                  {p.name
                    .split(' ')
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join('')}
                </span>
              )}
              <span className="host-name">{p.name}</span>
              <span className="host-role">{'// '}{p.role}</span>
              <span className="host-bio">{p.bio}</span>
              {p.linkedin && (
                <a
                  className="host-li"
                  href={`https://www.linkedin.com/in/${p.linkedin}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="host-li-badge">in</span>
                  {p.linkedin}
                </a>
              )}
            </div>
          )
        })}
      </div>
    </Slide>
  )
}

/* two highlighted output cards + logistics chips */
export function Outputs({
  title,
  cards,
  logistics,
  closing,
}: {
  title: ReactNode
  cards: { label: string; text: string; tone: 'teal' | 'purple' }[]
  logistics: string[]
  closing?: string
}) {
  return (
    <Slide>
      <h1>{title}</h1>
      <div className="outputs">
        {cards.map((c) => (
          <div key={c.label} className={`output output-${c.tone}`}>
            <span className="output-l">{c.label}</span>
            <span className="output-t">{c.text}</span>
          </div>
        ))}
      </div>
      <div className="logistics">
        {logistics.map((l) => (
          <span key={l} className="logistics-item">
            {l}
          </span>
        ))}
      </div>
      {closing && <p className="outputs-closing">{closing}</p>}
    </Slide>
  )
}

/* per-block exercise plan: eyebrow + title + optional subtitle, then a timed
 * agenda in one or two columns, with an optional footer note. Each row is a
 * time/label on the mono rail plus a session, with an optional chip. */
export type PlanRow = { t: string; s: ReactNode; chip?: string; tone?: 'teal' | 'amber' | 'plain' }
export type PlanColumn = { kicker: string; heading?: string; rows: PlanRow[] }

export function BlockPlan({
  eyebrow,
  title,
  subtitle,
  columns,
  footer,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  columns: PlanColumn[]
  footer?: ReactNode
}) {
  return (
    <Slide>
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="blockplan-h">{title}</h1>
      {subtitle && <p className="subtitle blockplan-sub">{subtitle}</p>}
      <div className="agenda blockplan">
        {columns.map((c) => (
          <div key={c.kicker} className="agenda-day">
            <div className="eyebrow eyebrow-purple">{c.kicker}</div>
            {c.heading && <h2>{c.heading}</h2>}
            <div className="agenda-rows">
              {c.rows.map((r, i) => (
                <div key={i} className="agenda-row">
                  <span className="agenda-t blockplan-t">{r.t}</span>
                  <span className="agenda-s">{r.s}</span>
                  {r.chip && <span className={`chip chip-${r.tone ?? 'plain'}`}>{r.chip}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {footer && <p className="blockplan-foot">{footer}</p>}
    </Slide>
  )
}
