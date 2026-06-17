# Reflect & Commit — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 10 slides for the "Reflect & Commit" closing session to the existing `agenda` TS deck, including a `FactoryDiagram` component that renders a growing mermaid state machine across four phases.

**Architecture:** Mermaid is installed as an ES module dependency. A `FactoryDiagram` React component renders one of four `stateDiagram-v2` definitions (minimal → +pipeline → +gates → full blueprint) into a dark panel via mermaid's async `render()` API. A `FactorySlide` layout component wraps a text column left and the diagram right. Ten slides are appended to the existing `slides` array in `slides.tsx`.

**Tech Stack:** Bun workspaces, React 19, Vite 6, TypeScript 5.7, mermaid ^10

## Global Constraints

- Bun only — no npm or pnpm commands
- No `package-lock.json`; lock file is `bun.lock`
- Colors come exclusively from `brand/tokens.css` CSS variables — no hardcoded hex values in component files or CSS, except inside the mermaid theme object (which needs hex values; document each one)
- Slide headings: sentence case
- No em-dashes, no decorative emoji, no filler words in participant-facing copy
- Do not commit or push

---

## File map

| File | Action | What changes |
|------|--------|-------------|
| `modules/agenda/package.json` | Modify | Add `mermaid` to `dependencies` |
| `modules/agenda/src/kit.tsx` | Modify | Add `FactoryDiagram`, `FactorySlide` exports; add mermaid import and initialization |
| `modules/agenda/src/deck.css` | Modify | Add `.factory-diagram-wrap`, `.factory-diagram`, `.factory-cols`, `.statement-line`, `.commit-questions` |
| `modules/agenda/src/slides.tsx` | Modify | Append slides 01–10 to the existing `slides` array |

---

## Task 1: Install mermaid

**Files:**
- Modify: `modules/agenda/package.json`

- [ ] **Step 1: Install mermaid**

```bash
bun add mermaid@^10 --cwd modules/agenda
```

- [ ] **Step 2: Verify package.json has mermaid**

Open `modules/agenda/package.json` and confirm `"mermaid"` appears under `"dependencies"`.

Expected:
```json
"dependencies": {
  "mermaid": "^10.x.x",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

- [ ] **Step 3: Verify dev server still starts**

```bash
bun run --cwd modules/agenda dev
```

Expected: Vite starts without errors. Stop with Ctrl-C.

---

## Task 2: FactoryDiagram component + CSS

**Files:**
- Modify: `modules/agenda/src/kit.tsx`
- Modify: `modules/agenda/src/deck.css`

### CSS additions

- [ ] **Step 1: Add factory diagram and commit CSS to deck.css**

Append this block to the end of `modules/agenda/src/deck.css`:

```css
/* factory diagram (Reflect & Commit slides) */
.factory-cols {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 40px;
  align-items: center;
  margin-top: 4px;
  flex: 1;
}

.factory-diagram-wrap {
  background: var(--code-bg);
  border-radius: var(--radius);
  padding: 20px 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.factory-diagram {
  width: 100%;
}

.factory-diagram svg {
  width: 100%;
  height: auto;
  max-height: 420px;
}

/* slide 08 — order matters */
.statement-line {
  font-family: var(--font-display);
  font-size: 38px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 18px;
  letter-spacing: -0.015em;
}

/* slide 10 — commit questions */
.commit-questions {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
}

.commit-q {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 500;
  color: var(--muted);
  margin: 0;
  padding-left: 22px;
  border-left: 4px solid var(--primary);
  line-height: 1.35;
}
```

### Component additions

- [ ] **Step 2: Add mermaid import and diagram definitions to kit.tsx**

First, update the existing React import in `modules/agenda/src/kit.tsx`. The current line is:

```tsx
import { createContext, useContext, type ReactNode } from 'react'
```

Replace it with:

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
```

Then add the mermaid import on the next line:

```tsx
import mermaid from 'mermaid'
```

Then add this block immediately after all the existing imports (before the `export type SlideDef` line):

```tsx
/* ---- FactoryDiagram ---- */

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'base',
  themeVariables: {
    // Dark panel — these hex values must stay in sync with the blueprint.
    // Do not replace with CSS variables; mermaid does not resolve them.
    darkMode: true,
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '13px',
    primaryColor: '#16212f',       // auto station bg
    primaryTextColor: '#dbe4f0',
    primaryBorderColor: '#5b9dd9', // steel — automated station stroke
    lineColor: '#5c6b80',
    textColor: '#c3cdda',
    secondaryColor: '#16212f',
    tertiaryColor: '#101722',
    transitionLabelColor: '#c3cdda',
  },
})

// Four diagram phases. Classdefs are repeated in each definition so each
// is self-contained (mermaid processes each render call independently).
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
```

- [ ] **Step 3: Add FactoryDiagram and FactorySlide components to kit.tsx**

Add this block at the end of `modules/agenda/src/kit.tsx` (after the last existing export):

```tsx
export function FactoryDiagram({ phase }: { phase: 1 | 2 | 3 | 4 }) {
  const [svg, setSvg] = useState('')

  useEffect(() => {
    const id = `fd-p${phase}-${++_diagramCounter}`
    mermaid.render(id, DIAGRAM[phase]).then(({ svg: s }) => setSvg(s))
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
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
bun run --cwd modules/agenda typecheck
```

Expected: no errors.

- [ ] **Step 5: Smoke-test the diagram in the dev server**

```bash
bun run --cwd modules/agenda dev
```

Open the dev server URL. Navigate to the existing slides — they should be unchanged. Stop with Ctrl-C.

---

## Task 3: Add Reflect & Commit slides to slides.tsx

**Files:**
- Modify: `modules/agenda/src/slides.tsx`

The new slides are appended after the existing three `BlockPlan` slides. The existing slides array must not be modified.

- [ ] **Step 1: Update the import line in slides.tsx**

The current import line is:
```tsx
import { BlockPlan, Cover, type SlideDef } from './kit'
```

Replace it with:
```tsx
import { BlockPlan, Cover, FactoryDiagram, FactorySlide, NumberedList, Slide, Step, type SlideDef } from './kit'
```

- [ ] **Step 2: Append the ten Reflect & Commit slides**

The file `modules/agenda/src/slides.tsx` ends with:

```tsx
    footer="You cannot eval what you cannot see, and you cannot close a loop you cannot eval. The order is the lesson.",
  />,
]
```

Replace only the final `]` (the very last character of the file) with:

```tsx
  // ---- Reflect & Commit (Day 2, 16:15) ----

  // 01 — Cover
  <Cover
    title="Reflect & Commit"
    event="Day 2 / 16:15 / alphalist Developer Bootcamp"
  />,

  // 02 — Two days in three moves
  <NumberedList
    eyebrow="what you built"
    title="Two days in three moves"
    items={[
      {
        text: 'Foundation',
        hint: 'Tools that hold context across sessions: CLAUDE.md, skills, hooks, rules.',
      },
      {
        text: 'Pipeline',
        hint: 'Stations that hand off work without you: planner, refine, implement, deterministic gates.',
      },
      {
        text: 'Factory',
        hint: 'A loop that gets better on its own: observability, evals, learning loops.',
      },
    ]}
  />,

  // 03 — Minimal slice (week 1)
  <FactorySlide eyebrow="week 1" title="Start here: one slice, you in the loop" phase={1}>
    <p>One use case. Three acceptance criteria. You review it manually.</p>
    <p style={{ color: 'var(--muted)', fontSize: '19px', marginTop: '16px' }}>
      No gates yet. No automated stations. Just a slice you can run end to end and judge yourself.
    </p>
  </FactorySlide>,

  // 04 — Phase 1: tune the building blocks
  <FactorySlide eyebrow="phase 1 / weeks 1-2" title="Tune the building blocks in isolation" phase={1}>
    <ul>
      <li>One skill that runs without you steering it</li>
      <li>One hook that actually fires on the right event</li>
      <li>A CLAUDE.md that cuts noise, not just adds rules</li>
    </ul>
    <p style={{ color: 'var(--muted)', fontSize: '18px', marginTop: '16px' }}>
      Metric: can it complete a session without you redirecting it?
    </p>
  </FactorySlide>,

  // 05 — Phase 2: wire the pipeline
  <FactorySlide eyebrow="phase 2 / weeks 3-5" title="Pick one real slice. Wire the pipeline." phase={2}>
    <p>Apply the Day 1 pipeline contract to something you actually ship.</p>
    <ul style={{ marginTop: '12px', fontSize: '19px' }}>
      <li>A real feature endpoint</li>
      <li>An acceptance test a gate can run</li>
      <li>The contract as the glue: rename a heading and the next station breaks</li>
    </ul>
  </FactorySlide>,

  // 06 — Phase 3: add the gates
  <FactorySlide eyebrow="phase 3 / weeks 6-8" title="Now the machine can stop itself" phase={3}>
    <p>
      Gates are deterministic: a test run, <code>tsc</code>, a coverage number. Never an agent's
      self-assessment.
    </p>
    <p style={{ color: 'var(--muted)', fontSize: '19px', marginTop: '14px' }}>
      Observe the pipeline running first. Add a gate only when you know what it should catch.
    </p>
  </FactorySlide>,

  // 07 — The full factory
  <FactorySlide eyebrow="6-8 weeks" title="This is where you could be" phase={4}>
    <p>
      A Next.js full-stack pipeline. Spec-driven TDD. Autonomous agents do the work. Deterministic
      gates decide what advances.
    </p>
    <p style={{ color: 'var(--muted)', fontSize: '18px', marginTop: '14px' }}>
      Every forward transition is guarded by a machine verdict. Warm states (amber) are the only
      points a human is pulled in.
    </p>
  </FactorySlide>,

  // 08 — The order matters (stepped, 2 arrow presses)
  {
    node: (
      <Slide>
        <p className="statement-line">
          <Step at={0}>You cannot gate what you cannot observe.</Step>
        </p>
        <p className="statement-line">
          <Step at={1}>You cannot observe what you have not wired.</Step>
        </p>
        <p className="statement-line">
          <Step at={2}>You cannot wire what you have not tuned.</Step>
        </p>
      </Slide>
    ),
    steps: 2,
  },

  // 09 — Week 1: the one thing
  <NumberedList
    eyebrow="before monday"
    title="The one thing"
    items={[
      {
        text: 'Pick your use case. Write three acceptance criteria for it — today, not Monday.',
      },
    ]}
    chips={[
      { label: 'not a whole feature', tone: 'teal' },
      { label: 'something a gate can check', tone: 'amber' },
    ]}
    footer="That's what you bring to week 1. Everything else follows."
  />,

  // 10 — Commit (silent, individual)
  <Slide>
    <h1>Before you leave this room</h1>
    <div className="commit-questions">
      <p className="commit-q">What is the one use case I am starting with?</p>
      <p className="commit-q">What building block do I tune first?</p>
      <p className="commit-q">What date does the first run happen?</p>
    </div>
  </Slide>,
]
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
bun run --cwd modules/agenda typecheck
```

Expected: no errors.

- [ ] **Step 4: Check all 10 slides render in the dev server**

```bash
bun run --cwd modules/agenda dev
```

Open the dev server URL. Navigate through all slides (arrow keys):
- Slides 1-4: existing pod-block timeline slides — must be unchanged
- Slide 5: "Reflect & Commit" cover
- Slide 6: "Two days in three moves" — three numbered items
- Slide 7: "Start here: one slice, you in the loop" — phase 1 diagram (5 nodes, dark panel right)
- Slide 8: same diagram, "Tune the building blocks in isolation"
- Slide 9: "Pick one real slice." — phase 2 diagram (more nodes, gates cyan)
- Slide 10: "Now the machine can stop itself" — phase 3 diagram (adds amber HITL nodes)
- Slide 11: "This is where you could be" — full blueprint diagram
- Slide 12: "You cannot gate..." — first line visible; press arrow to reveal second, then third
- Slide 13: "The one thing" — chips at top, numbered item, footer
- Slide 14: "Before you leave this room" — three quiet commit questions

Confirm: diagrams render (dark panel with SVG), no TypeScript errors in the console, existing slides 1-4 are pixel-identical to before.
