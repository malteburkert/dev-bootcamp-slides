import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import mermaid from 'mermaid'

/* ---- FactoryDiagram ---- */

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'base',
  themeVariables: {
    // Dark panel — hex values must stay in sync with the blueprint.
    // CSS variables cannot be used here; mermaid does not resolve them.
    darkMode: true,
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '13px',
    primaryColor: '#16212f',
    primaryTextColor: '#dbe4f0',
    primaryBorderColor: '#5b9dd9',
    lineColor: '#5c6b80',
    textColor: '#c3cdda',
    secondaryColor: '#16212f',
    tertiaryColor: '#101722',
    transitionLabelColor: '#c3cdda',
  },
})

const DIAGRAM: Record<1 | 2 | 3 | 4, string> = {
  1: `stateDiagram-v2
  direction TB
  [*] --> PLANNED
  PLANNED --> SPEC_COMPILING
  SPEC_COMPILING --> IMPLEMENTING
  IMPLEMENTING --> REVIEW: ready
  REVIEW --> IMPLEMENTING: changes
  REVIEW --> DONE: approved
  DONE --> [*]

  classDef hitl fill:#3a2a08,stroke:#f59e0b,color:#fde7b3;
  classDef good fill:#0c2e18,stroke:#22c55e,color:#bdf3cf;
  class REVIEW hitl
  class DONE good`,

  2: `stateDiagram-v2
  direction TB
  [*] --> PLANNED
  PLANNED --> SPEC_COMPILING
  SPEC_COMPILING --> TEST_AUTHORING
  TEST_AUTHORING --> RED_VERIFY: run new tests
  RED_VERIFY --> TEST_AUTHORING: wrong-reason fail
  RED_VERIFY --> IMPLEMENTING: true RED
  IMPLEMENTING --> GREEN_VERIFY: run suite
  GREEN_VERIFY --> IMPLEMENTING: fail
  GREEN_VERIFY --> REFACTORING: all green
  REFACTORING --> REVIEW
  REVIEW --> IMPLEMENTING: changes
  REVIEW --> DONE: approved
  DONE --> [*]

  classDef auto fill:#16212f,stroke:#5b9dd9,color:#dbe4f0;
  classDef gate fill:#0b2733,stroke:#38bdf8,color:#bfeefc;
  classDef hitl fill:#3a2a08,stroke:#f59e0b,color:#fde7b3;
  classDef good fill:#0c2e18,stroke:#22c55e,color:#bdf3cf;
  class SPEC_COMPILING,TEST_AUTHORING,IMPLEMENTING,REFACTORING auto
  class RED_VERIFY,GREEN_VERIFY gate
  class REVIEW hitl
  class DONE good`,

  3: `stateDiagram-v2
  direction TB
  [*] --> PLANNED
  PLANNED --> SPEC_COMPILING
  SPEC_COMPILING --> TEST_AUTHORING
  SPEC_COMPILING --> BLOCKED_CLAR: ambiguity
  TEST_AUTHORING --> RED_VERIFY: run new tests
  RED_VERIFY --> TEST_AUTHORING: wrong-reason fail
  RED_VERIFY --> IMPLEMENTING: true RED
  IMPLEMENTING --> GREEN_VERIFY: run suite
  GREEN_VERIFY --> IMPLEMENTING: fail
  GREEN_VERIFY --> ESCALATED: budget=0
  GREEN_VERIFY --> REFACTORING: all green
  REFACTORING --> REFACTOR_VERIFY
  REFACTOR_VERIFY --> REFACTORING: regressed
  REFACTOR_VERIFY --> REVIEW: pass
  REVIEW --> IMPLEMENTING: changes
  REVIEW --> DONE: approved
  REVIEW --> BLOCKED_CLAR: spec gap
  BLOCKED_CLAR --> SPEC_COMPILING: answer
  ESCALATED --> IMPLEMENTING: fix
  DONE --> [*]

  classDef auto fill:#16212f,stroke:#5b9dd9,color:#dbe4f0;
  classDef gate fill:#0b2733,stroke:#38bdf8,color:#bfeefc;
  classDef hitl fill:#3a2a08,stroke:#f59e0b,color:#fde7b3;
  classDef good fill:#0c2e18,stroke:#22c55e,color:#bdf3cf;
  class SPEC_COMPILING,TEST_AUTHORING,IMPLEMENTING,REFACTORING auto
  class RED_VERIFY,GREEN_VERIFY,REFACTOR_VERIFY gate
  class BLOCKED_CLAR,ESCALATED hitl
  class DONE good`,

  4: `stateDiagram-v2
  direction TB
  [*] --> PLANNED
  PLANNED --> READY: deps DONE
  READY --> SPEC_COMPILING
  SPEC_COMPILING --> CONTRACT_READY: tsc on contract OK
  SPEC_COMPILING --> BLOCKED_CLAR: ambiguity
  CONTRACT_READY --> TEST_AUTHORING
  TEST_AUTHORING --> RED_VERIFY: run new tests
  RED_VERIFY --> TEST_AUTHORING: passes / wrong-reason fail
  RED_VERIFY --> IMPLEMENTING: true RED
  IMPLEMENTING --> GREEN_VERIFY: run suite · tests locked
  GREEN_VERIFY --> IMPLEMENTING: fail · budget--
  GREEN_VERIFY --> ESCALATED: budget = 0
  GREEN_VERIFY --> REFACTORING: all green
  REFACTORING --> REFACTOR_VERIFY
  REFACTOR_VERIFY --> REFACTORING: regressed
  REFACTOR_VERIFY --> REVIEW: green + coverage + lint + mutation
  REVIEW --> INTEGRATING: approved
  REVIEW --> IMPLEMENTING: changes requested
  REVIEW --> BLOCKED_CLAR: spec gap
  INTEGRATING --> DONE: merged · full suite green
  INTEGRATING --> ESCALATED: integration break
  BLOCKED_CLAR --> SPEC_COMPILING: answer
  ESCALATED --> IMPLEMENTING: human fix / guidance
  ESCALATED --> FAILED: abandoned
  DONE --> [*]

  classDef auto fill:#16212f,stroke:#5b9dd9,color:#dbe4f0;
  classDef gate fill:#0b2733,stroke:#38bdf8,color:#bfeefc;
  classDef hitl fill:#3a2a08,stroke:#f59e0b,color:#fde7b3;
  classDef good fill:#0c2e18,stroke:#22c55e,color:#bdf3cf;
  classDef bad  fill:#3a1414,stroke:#ef4444,color:#f9c8c8;
  class SPEC_COMPILING,TEST_AUTHORING,IMPLEMENTING,REFACTORING,INTEGRATING auto
  class RED_VERIFY,GREEN_VERIFY,REFACTOR_VERIFY gate
  class BLOCKED_CLAR,ESCALATED hitl
  class DONE good
  class FAILED bad`,
}

let _diagramCounter = 0

const _svgCache = new Map<number, string>()
const _cacheReady = Promise.all(
  ([1, 2, 3, 4] as const).map(async (phase) => {
    const { svg } = await mermaid.render(`fd-init-p${phase}`, DIAGRAM[phase])
    _svgCache.set(phase, svg)
  }),
)

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

export function FactoryDiagram({ phase }: { phase: 1 | 2 | 3 | 4 }) {
  const [svg, setSvg] = useState(() => _svgCache.get(phase) ?? '')

  useEffect(() => {
    if (_svgCache.has(phase)) {
      setSvg(_svgCache.get(phase)!)
      return
    }
    _cacheReady.then(() => setSvg(_svgCache.get(phase) ?? ''))
  }, [phase])

  return (
    <div className="factory-diagram-wrap">
      <div className="factory-diagram" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  )
}

export function FactorySlide({
  eyebrow,
  title,
  phase,
  children,
}: {
  eyebrow: string
  title: ReactNode
  phase: 1 | 2 | 3 | 4
  children: ReactNode
}) {
  return (
    <Slide>
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <div className="factory-cols">
        <div>{children}</div>
        <FactoryDiagram phase={phase} />
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
