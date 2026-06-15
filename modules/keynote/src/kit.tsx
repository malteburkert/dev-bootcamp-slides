import { createContext, useContext, useId, type CSSProperties, type ReactNode } from 'react'

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

/* a problem statement that resolves into its solution on a click */
export function Pivot({
  eyebrow,
  lead,
  body,
  solution,
  stepped = true,
}: {
  eyebrow?: string
  lead: ReactNode
  body?: ReactNode
  solution: ReactNode
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <div className="slide slide-center statement">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1 className="statement-h">{lead}</h1>
      {body && <p className="subtitle pivot-body">{body}</p>}
      <p className={`pivot-solution step${stepped && step < 1 ? ' step-dim' : ''}`}>{solution}</p>
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

/* full-screen quote with a step-revealed rejoinder */
export function Quote({
  eyebrow,
  quote,
  attribution,
  punchline,
  stepped = false,
}: {
  eyebrow?: string
  quote: ReactNode
  attribution: string
  punchline?: ReactNode
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <div className="slide slide-center">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <blockquote className="quote-q">{quote}</blockquote>
      <div className="quote-a">{attribution}</div>
      {punchline && <p className={`quote-p step${stepped && step < 1 ? ' step-dim' : ''}`}>{punchline}</p>}
    </div>
  )
}

/*
 * Model-pace timeline. Dots are flagship releases on a monthly axis (m = months
 * since Jan of the first year); named dots carry a stem + label at one of four
 * stagger levels, unnamed dots are small ticks. Prices render under the axis.
 * On entry the dots cascade in chronologically (screen only, static in print).
 */
export type PaceDot = {
  name?: string
  m: number
  level?: 0 | 1 | 2 | 3
  price?: string
  dx?: number
  wink?: boolean
}

const paceX = (m: number, dx = 0) => 24 + m * 23.5 + dx
const PACE_LEVEL_Y = [176, 140, 104, 68]

export function Pace({
  eyebrow,
  title,
  years,
  dots,
  caption,
  chipsLabel,
  chips,
  note,
  footer,
}: {
  eyebrow?: string
  title: ReactNode
  years: { label: string; m: number }[]
  dots: PaceDot[]
  caption: string
  chipsLabel: string
  chips: string[]
  note?: ReactNode
  footer?: ReactNode
}) {
  return (
    <Slide>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <div>
        <svg viewBox="0 0 1088 280" className="pace-svg" aria-hidden="true">
          <line x1={16} y1={220} x2={1046} y2={220} className="pace-axis" />
          <path d="M 1046 214 L 1058 220 L 1046 226 z" className="pace-axis-head" />
          {years.map((y) => (
            <g key={y.label}>
              <line x1={paceX(y.m)} y1={214} x2={paceX(y.m)} y2={226} className="pace-axis" />
              <text x={paceX(y.m) + 8} y={268} className="pace-year">
                {y.label}
              </text>
            </g>
          ))}
          {dots.map((d, i) => {
            const x = paceX(d.m, d.dx)
            if (!d.name || d.level === undefined)
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={220}
                  r={3.5}
                  className="pace-dot pace-minor"
                  style={{ '--i': i } as CSSProperties}
                />
              )
            const top = PACE_LEVEL_Y[d.level]
            return (
              <g key={i} className={`pace-dot${d.wink ? ' pace-wink' : ''}`} style={{ '--i': i } as CSSProperties}>
                <line x1={x} y1={213} x2={x} y2={top} className="pace-stem" />
                <circle cx={x} cy={220} r={4.5} className="pace-mark" />
                <text x={d.wink ? x + 6 : x} y={top - 9} textAnchor={d.wink ? 'end' : 'middle'} className="pace-name">
                  {d.name}
                </text>
                {d.price && (
                  <text x={x} y={248} textAnchor="middle" className="pace-price">
                    {d.price}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
        <div className="pace-caption">{caption}</div>
      </div>
      <Step at={1} block>
        <div className="pace-chips">
          <span className="pace-chips-label">{chipsLabel}</span>
          {chips.map((c) => (
            <span key={c} className="chip chip-plain">
              {c}
            </span>
          ))}
        </div>
      </Step>
      {note && (
        <Step at={2} block>
          <p className="pace-note">{note}</p>
        </Step>
      )}
      {footer && (
        <Step at={note ? 3 : 2} block>
          <p className="pace-footer">{footer}</p>
        </Step>
      )}
    </Slide>
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
  footer,
  stepped = false,
}: {
  eyebrow?: string
  title: ReactNode
  stages: Stage[]
  note?: string
  footer?: ReactNode
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
      {footer && (
        <p className={`numlist-footer step${stepped && step < stages.length ? ' step-dim' : ''}`}>{footer}</p>
      )}
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

/*
 * One big centered loop: three stops (top, right, left) with optional duration
 * chips, a badge in the middle, marching teal dashes along the arrows.
 * speed 'fast' spins frantic (the vibe loop), 'steady' flows calm.
 */
export function BigLoop({
  eyebrow,
  title,
  stops,
  badge,
  badgeTone = 'amber',
  prompt,
  footer,
  speed = 'steady',
  stepped = false,
}: {
  eyebrow?: string
  title: ReactNode
  stops: { label: string; dur?: string }[]
  badge: string
  badgeTone?: 'amber' | 'teal'
  prompt: string
  footer?: ReactNode
  speed?: 'fast' | 'steady'
  stepped?: boolean
}) {
  const step = useStep()
  const id = useId()
  const pos = ['top', 'right', 'left']
  return (
    <Slide center>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <div className={`bigloop bigloop-${speed}`}>
        <svg viewBox="0 0 200 200" className="bigloop-svg" aria-hidden="true">
          <defs>
            <marker
              id={id}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>
          <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
            <path d="M 112 31 A 70 70 0 0 1 169 112" markerEnd={`url(#${id})`} />
            <path d="M 154 145 A 70 70 0 0 1 46 145" markerEnd={`url(#${id})`} />
            <path d="M 31 112 A 70 70 0 0 1 88 31" markerEnd={`url(#${id})`} />
          </g>
          <g fill="none" className="bigloop-flow" strokeLinecap="round">
            <path d="M 112 31 A 70 70 0 0 1 169 112" />
            <path d="M 154 145 A 70 70 0 0 1 46 145" />
            <path d="M 31 112 A 70 70 0 0 1 88 31" />
          </g>
        </svg>
        {stops.map((s, i) => (
          <span key={s.label} className={`bigloop-stop bigloop-${pos[i]}`}>
            <span className="bigloop-stop-t">{s.label}</span>
            {s.dur && <span className="chip chip-plain">{s.dur}</span>}
          </span>
        ))}
        <span className={`chip chip-${badgeTone} bigloop-badge`}>{badge}</span>
      </div>
      <div className="prompt-bar bigloop-prompt">{prompt}</div>
      {footer && <p className={`bigloop-footer step${stepped && step < 1 ? ' step-dim' : ''}`}>{footer}</p>}
    </Slide>
  )
}

/* grid of titled cards */
export function CardGrid({
  eyebrow,
  title,
  cards,
  footer,
  stepped = false,
}: {
  eyebrow?: string
  title: ReactNode
  cards: { title: string; desc: string }[]
  footer?: ReactNode
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
      {footer && <p className="cardgrid-footer">{footer}</p>}
    </Slide>
  )
}

export type Layer = {
  title: string
  desc: string
  when: string
  tone: 'teal' | 'purple' | 'amber' | 'green'
}

/* layer map in reading order: first entry on top, steps reveal top-down */
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
        {layers.map((l, i) => (
          <div key={l.title} className={`layer layer-${l.tone} step${stepped && i > step ? ' step-dim' : ''}`}>
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

/* big stacked numbers; when stepped, the footer caveat reveals last */
export function BigStats({
  eyebrow,
  title,
  stats,
  note,
  footer,
  stepped = false,
}: {
  eyebrow?: string
  title?: ReactNode
  stats: { value: string; label: string; tone: 'amber' | 'teal' }[]
  note?: string
  footer?: ReactNode
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
      {footer && (
        <p className={`bigstats-footer step${stepped && step < stats.length ? ' step-dim' : ''}`}>{footer}</p>
      )}
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

export type SplitPanel = {
  tone: 'green' | 'red'
  kicker: string
  heading: string
  items: { t: string; d: string }[]
}

/* two tinted panels, the second one revealed on click (easy part vs uncharted) */
export function SplitPanels({
  title,
  panels,
  stepped = false,
}: {
  title: ReactNode
  panels: [SplitPanel, SplitPanel]
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <Slide>
      <h1>{title}</h1>
      <div className="split">
        {panels.map((p, i) => (
          <div
            key={p.kicker}
            className={`split-panel split-${p.tone} step${stepped && i > step ? ' step-dim' : ''}`}
          >
            <div className="split-kicker">{p.kicker}</div>
            <div className="split-heading">{p.heading}</div>
            <div className="split-items">
              {p.items.map((it) => (
                <div key={it.t} className="split-item">
                  <span className="split-item-t">{it.t}</span>
                  <span className="split-item-d">{it.d}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* maturity ladder with an industry-stats reveal and a punchline reveal */
export function Ladder({
  eyebrow,
  title,
  rungs,
  stats,
  punchline,
}: {
  eyebrow?: string
  title: ReactNode
  rungs: { n: string; title: string; desc: string }[]
  stats?: ReactNode
  punchline?: ReactNode
}) {
  return (
    <Slide>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <div className="ladder">
        {rungs.map((r) => (
          <div key={r.n} className="ladder-row">
            <span className="ladder-n">{r.n}</span>
            <span className="ladder-body">
              <span className="ladder-t">{r.title}</span>
              <span className="ladder-d">{r.desc}</span>
            </span>
          </div>
        ))}
      </div>
      {stats && (
        <Step at={1} block>
          <p className="ladder-stats">{stats}</p>
        </Step>
      )}
      {punchline && (
        <Step at={2} block>
          <p className="ladder-note">{punchline}</p>
        </Step>
      )}
    </Slide>
  )
}

/* builder credit: two portraits + framing + short proof points (reference factory) */
import bjoernPhoto from './assets/builders/bjoern.jpg'
import benediktPhoto from './assets/builders/benedikt.jpg'

const builderPhotos: Record<string, string> = { bjoern: bjoernPhoto, benedikt: benediktPhoto }

export function Builders({
  eyebrow,
  title,
  people,
  note,
  points,
}: {
  eyebrow?: string
  title: ReactNode
  people: { slug: string; name: string; role: string }[]
  note?: ReactNode
  points?: string[]
}) {
  return (
    <Slide>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      <div className="builders">
        <div className="builders-people">
          {people.map((p) => (
            <div key={p.slug} className="builder">
              {builderPhotos[p.slug] ? (
                <img className="builder-photo" src={builderPhotos[p.slug]} alt={p.name} />
              ) : (
                <span className="builder-photo builder-fallback">
                  {p.name
                    .split(' ')
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join('')}
                </span>
              )}
              <span className="builder-name">{p.name}</span>
              <span className="builder-role">{p.role}</span>
            </div>
          ))}
        </div>
        <div className="builders-body">
          {note && <p className="builders-note">{note}</p>}
          {points && (
            <div className="builders-points">
              {points.map((pt) => (
                <span key={pt} className="builders-point">
                  {pt}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Slide>
  )
}

export type QuestionPhase = {
  label: string
  tone: 'teal' | 'purple' | 'amber' | 'green'
  items: string[]
}

/* the factory as a set of questions: 4 phase rows of aspect pills, cascading by phase */
export function QuestionMap({
  eyebrow,
  title,
  lead,
  phases,
  footer,
  stepped = false,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  phases: QuestionPhase[]
  footer?: ReactNode
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <Slide>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      {lead && <p className="qmap-lead">{lead}</p>}
      <div className="qmap">
        {phases.map((ph, i) => (
          <div key={ph.label} className={`qmap-row step${stepped && i > step ? ' step-dim' : ''}`}>
            <span className={`qmap-phase qmap-${ph.tone}`}>{ph.label}</span>
            <span className="qmap-items">
              {ph.items.map((it) => (
                <span key={it} className={`chip qmap-chip qmap-chip-${ph.tone}`}>
                  {it}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
      {footer && <p className="qmap-footer">{footer}</p>}
    </Slide>
  )
}

export type Aspect = { q: string; line: string }

/* one factory phase: its aspects as questions, plus where in the two days you build it */
export function Phase({
  index,
  total,
  name,
  title,
  tone,
  build,
  aspects,
  stepped = false,
}: {
  index: number
  total: number
  name: string
  title: ReactNode
  tone: 'teal' | 'purple' | 'amber' | 'green'
  build: string
  aspects: Aspect[]
  stepped?: boolean
}) {
  const step = useStep()
  return (
    <Slide>
      <div className={`eyebrow${tone === 'teal' ? '' : ` eyebrow-${tone}`}`}>
        The factory · {index} of {total} · {name}
      </div>
      <h1>{title}</h1>
      <div className="aspects">
        {aspects.map((a, i) => (
          <div key={a.q} className={`aspect aspect-${tone} step${stepped && i > step ? ' step-dim' : ''}`}>
            <span className="aspect-q">{a.q}</span>
            <span className="aspect-line">{a.line}</span>
          </div>
        ))}
      </div>
      <p className="phase-build">
        <span className="phase-build-label">you build this in</span>
        {build}
      </p>
    </Slide>
  )
}
