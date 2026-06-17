# Reflect & Commit — deck design spec

**Session:** Day 2, 16:15–17:00 (bootcamp slot; deck covers ~15 min)
**Module:** `agenda` (TS/React deck, `modules/agenda/src/slides.tsx`)
**Format:** Presenter-led closing arc, no facilitated worksheet activity
**Date:** 2026-06-17

---

## Purpose

Close the two-day bootcamp with a concrete forward path. Participants leave with a mental model of where they are (individual, tuned building blocks), where they're going (a gate-guarded automated pipeline), and a phased plan to get there without trying to build everything at once.

The deck is not a recap. It names a failure mode (building the full factory too fast), shows the destination (the state machine from the blueprint), and reverse-engineers the path bottom-up in three phases.

---

## Narrative arc — "Mirror: start vs. finish"

The state machine from `software-factory-blueprint.html` (Plate 01, `stateDiagram-v2`) is the visual spine. It appears first in a stripped-down form (week 1), then grows one phase at a time, and closes at full complexity as the 6-8 week destination.

The three phases map directly to the two bootcamp days:
- **Phase 1** — Foundation day: tune building blocks in isolation
- **Phase 2** — Pipeline day: wire a real slice
- **Phase 3** — Factory retro day: add gates, measure, observe

---

## Slide-by-slide spec

### 01 — Cover
- Title: "Reflect & Commit"
- Eyebrow: `Day 2 / 16:15`
- No subtitle, no presenter line

### 02 — Two days in three moves
- Eyebrow: `what you built`
- Title: "Two days in three moves"
- Three items (can use `Bullets` or `NumberedList` component):
  1. **Foundation** — tools that hold context across sessions (CLAUDE.md, skills, hooks, rules)
  2. **Pipeline** — stations that hand off work without you (planner, refine, implement; deterministic gates)
  3. **Factory** — a loop that gets better on its own (observability, evals, learning loops)
- No re-teaching; just names the three layers they've touched.

### 03 — The minimal slice (week 1 diagram)
- Eyebrow: `week 1`
- Title: "Start here: one slice, you in the loop"
- Body: a simplified state diagram showing only:
  `PLANNED → SPEC_COMPILING → IMPLEMENTING → REVIEW → DONE`
  - REVIEW is human (amber node)
  - No gates, no BLOCKED_CLAR, no ESCALATED
- Caption below diagram: "One use case. Three acceptance criteria. You review it manually. That's it."
- Implementation note: custom `FactoryDiagram` component or inline SVG/mermaid embed; see implementation section below.

### 04 — Phase 1: tune the building blocks
- Eyebrow: `phase 1 / weeks 1-2`
- Title: "Tune the building blocks in isolation"
- Diagram: same minimal slice (unchanged from slide 03)
- Body bullets (right column or below diagram):
  - One skill that runs without you steering it
  - One hook that actually fires on the right event
  - A CLAUDE.md that cuts noise, not just adds rules
- Metric: "Can it complete a session without you redirecting it?"
- Note: this is about proving each part works alone before connecting anything

### 05 — Phase 2: wire the pipeline
- Eyebrow: `phase 2 / weeks 3-5`
- Title: "Pick one real slice. Wire the pipeline."
- Diagram: grows — add `TEST_AUTHORING`, `REFACTORING`, `RED_VERIFY`, `GREEN_VERIFY` nodes
  - Gates (cyan): RED_VERIFY, GREEN_VERIFY
  - Still has human REVIEW (amber)
- Body: "Take the pipeline from Day 1 and apply it to something you actually ship. The contract is the glue: planner writes it, implement reads it. Rename a heading and the next station breaks."
- Pick criteria for the slice: a real feature endpoint, a concrete acceptance test you can write, something a gate can actually verify

### 06 — Phase 3: add the gates
- Eyebrow: `phase 3 / weeks 6-8`
- Title: "Now the machine can stop itself"
- Diagram: grows further — add `REFACTOR_VERIFY`, `BLOCKED_CLAR`, `ESCALATED`
  - Human entry points (amber): BLOCKED_CLAR, ESCALATED
  - Additional gate (cyan): REFACTOR_VERIFY
- Body: "Gates are deterministic: a test run, `tsc`, a coverage number — never an agent's self-assessment. Observe the pipeline running first. Add a gate only when you know what it should catch."
- Emphasise: observe first, gate second

### 07 — The full factory
- Eyebrow: `6-8 weeks`
- Title: "This is where you could be"
- Diagram: complete state machine from the blueprint (all states, all transitions)
  - Source: `software-factory-blueprint.html` Plate 01, `stateDiagram-v2`
  - Full legend: automated station (steel), deterministic gate (cyan), human HITL (amber), DONE (green), FAILED (red)
- Subtitle below: "A Next.js full-stack pipeline. Spec-driven TDD. Autonomous agents do the work. Deterministic gates decide what advances."
- Let the diagram land without heavy annotation. One sentence is enough.

### 08 — The order matters
- Full-screen statement slide (`Statement` component)
- Three lines, read top to bottom:
  > "You cannot gate what you cannot observe."
  > "You cannot observe what you haven't wired."
  > "You cannot wire what you haven't tuned."
- No eyebrow, no sub. The three lines are the entire slide.
- Optional: stepped reveal (one line per arrow key)

### 09 — Week 1: the one thing
- Eyebrow: `before monday`
- Title: "The one thing"
- Single numbered list with one item: "Pick your use case. Write three acceptance criteria for it — today, not Monday."
- Below: two chips or notes:
  - chip teal: "not a whole feature"
  - chip amber: "something a gate can check"
- Footer: "That's what you bring to week 1. Everything else follows."

### 10 — Commit
- Title: "Before you leave this room"
- Three questions, displayed quietly (not chips, not bold headers — plain text, generous line spacing):
  1. What is the one use case I'm starting with?
  2. What building block do I tune first?
  3. What date does the first run happen?
- No prompt to share, write, or speak. Trainer reads them slowly with silence between each.
- Slide stays visible as the session ends and flows into Closing.

---

## Diagram implementation

The growing state machine across slides 03–07 is the main implementation challenge. Three options in priority order:

**Option 1 (recommended): Mermaid embed via `<script>` + React ref**
Render the mermaid `stateDiagram-v2` markup directly in a React component using `useEffect` to call `mermaid.render()`. Pass only the nodes/transitions relevant to each phase. Reuse the theme variables from `software-factory-blueprint.html` (dark panel bg, steel/cyan/amber/green/red stroke palette) adapted to fit on a slide canvas.

**Option 2: Static SVG per phase**
Hand-author four SVG files (minimal, +pipeline, +gates, full) placed in `src/assets/`. Simpler to build, harder to maintain if the diagram changes.

**Option 3: Simplified card representation**
Replace the state diagram with a linear row of `StageCard` components that grow across slides. Loses the visual fidelity of the state machine but avoids the mermaid dependency. Use only if mermaid embedding proves too complex.

The mermaid theme variables to port:
```
--steel:  #5b9dd9   /* automated station */
--cyan:   #38bdf8   /* deterministic gate */
--amber:  #f59e0b   /* human HITL */
--green:  #22c55e   /* DONE */
--red:    #ef4444   /* FAILED */
```

---

## Component usage map

| Slide | Component | Notes |
|-------|-----------|-------|
| 01 | `Cover` | Standard cover |
| 02 | `NumberedList` or `Bullets` | Three items, no stepping needed |
| 03–07 | `FactoryDiagram` (new) | Custom mermaid-backed component; takes `phase` prop (1–4) |
| 08 | `Statement` | Stepped reveal, 3 lines |
| 09 | `NumberedList` | Single item + footer |
| 10 | Custom `Slide` | Plain text, generous spacing, no existing component fits |

---

## Conflicts check

- **Foundation module**: this deck references the Day 1 work but does not re-explain skills, hooks, or rules. Slide 02 names them in one line each.
- **Pipeline module**: slide 05 references the "Day 1 pipeline contract" without re-explaining RPI or sub-agents. Participants already have the vocabulary.
- **Factory-retro module**: slide 06 uses "observe first, gate second" which complements the evals/optimization framing from Day 2 AM without duplicating it.
- **Hycle module**: no overlap. Hycle is Day 2 14:00–16:00; this deck opens at 16:15.
- **Agenda module existing slides**: the existing `slides.tsx` covers pod-block timelines (BlockPlan components). The Reflect & Commit slides are additive — append to the same `slides` array with no changes to existing entries.

---

## What this deck is not

- Not a recap of the two days (slide 02 names the layers in seconds, does not explain them)
- Not a worksheet or facilitated activity
- Not a vendor pitch or feature list
- No multipliers ("10x", "100x") without a named metric
- No em-dashes, decorative emoji, or filler ("leverage", "transform", "methodology")
