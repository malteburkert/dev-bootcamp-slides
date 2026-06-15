# Keynote

Covers two agenda sessions on Day 1:

| Time | Session | Owner |
|------|---------|-------|
| 09:30-10:00 | Opening Keynote: From AI Experiments to the AI Factory | Tereza + Stefan |
| 10:00-10:45 | Pod Kickoff: introduction rounds & the AI developer reality check | Facilitated groups |

Tereza presents; "Tereza + Stefan" means the deck is co-created. The closing slides carry the pod kickoff instructions, so the handover into pods needs no second deck.

## Goal and core message

Set the ambition level: not an intro to AI coding tools, but how teams deliver software with AI, and the foundations that enable the AI Factory. What every participant should believe at 10:00:

- The keynote is the north star to the AI factory, and the factory is a product.
- The factory emerges from how the team works and wants to collaborate. It is a team effort, never a personal setup.
- The goal is not more tokens: fewer tokens, higher quality, AI that helps instead of overhead that produces more tired humans in the loop.

Audience focus: the stuck experimenter (has the tools, had the aha moment, plateaued at +30%, no system). Tone: energizing invitation. Day 2 gets exactly one explicit seed: "does your factory deliver? Data, not vibes."

## The arc (30 slides)

1. **Act 1, the shift** (1-8): cover; the pace, reframed as the opening question "How do we work with AI when it keeps changing?" (model-release timeline incl. 2026 dots, read as the cadence of releases, not price); its answer on its own slide, "Newer is not better, it is different" plus build a system around the models (the swap-side-effects beat, split out of the pace slide); the online promise vs the practice (+30% vs 10x, easier said than done); "Mindset, not tooling" (stuck as the human in the loop); vibe coding and agentic engineering as two big animated loops; "Code creation is free."
2. **Act 2, what speed reveals** (9-12), built on Tereza's talk abstract: "It doesn't create these problems. It just stops hiding them."; collaboration and responsibility at speed + shadow IT; "Starting is simple. A team factory isn't." (easy part vs uncharted territory, from Fabian's deck); the maturity ladder L0-L4 with industry numbers (90% use AI ~2h/day, DORA 2025; half daily while 46% distrust, Stack Overflow 2025; above L1 public data runs out) and the reframe: maturity = where you are, the org asks where delivery will be in six months (returns as kickoff Q4).
3. **Act 3, the factory: a real reference build, its four phases, the whole overview, the bridge to the workshop** (13-23): token-economy beat (Jensen Huang quote); better not just faster; "Someone already built one." (Björn + Bene photos: a real factory, 3 months, runs in production, still changing weekly, a reference not the answer); then the factory built up one phase at a time, each framed as questions and tagged with where you build it in the two days, drawn from Björn's deck: Mindset (16), Environment (17), Process (18), Continuous improvement (19); the whole-factory overview as payoff, all 13 aspects ("Thirteen parts. One system.", 20); "Same questions. Different answers." (the reworked no-blueprint beat: answers depend on your maturity and the market's AI level, 21); the evaluation question "Did this change make things better or worse?" (Björn's question, with the cost/time/quality/trust nuance, seeding Day 2, 22); the bridge "Four phases become four parts." (23) mapping Björn's phases onto the bootcamp's four parts (foundations / pipeline / run-as-product / org), the answer to how his structure relates to the two days.
4. **Act 4, proof, program and handover** (24-30): impact range with the metrics-opacity caveat, take home, timed agenda with "now" marker, trainers, Chatham rules, pod kickoff reality check (five questions; Q4 carries the six-months delivery framing; the table's problems become the pod's working groups), "One headline. One open question." + logistics.

## State (2026-06-15)

Draft complete and verified after feedback round 2 (30 slides). Round 2 reworked the opener: slide 2's title is now the question "How do we work with AI when it keeps changing?", the on-chart price labels and the "this morning, probably" wink dot are gone (the timeline reads as cadence, not cost), and the "different, not just better -> build a system" beat that used to live in the slide's note/footer is now its own slide 3 (the new `Pivot` component, a problem that resolves into its solution on a click). Round 1 had replaced the turning-point date opener with the model-pace timeline, split the loop-compare slide into two animated loop slides, and added the token-economy, shadow-IT, process-over-output, metrics-caveat and kickoff-groups beats. Co-brand chrome (alphalist header + wave, Hamburg footer), step reveals with entrance animations, responsive stage, soft-shadow style, trainers slide final (all five with photos, bios, LinkedIn). The deck is intentionally NOT committed; commit when the content is ready. Decided (round 2): slide 2's dot height stays pure label spacing (the chart is about cadence, not performance); a benchmark y-axis can be revisited later. Next: pull more of Fabian's slides and deepen the factory description from Björn's deck (the keynote is the only session that defines the two-day goal), plus the open TODOs at the top of [speaker-notes.md](speaker-notes.md) (pace-chart re-check, quote comfort, sixth-trainer decision, kickoff-groups alignment with FACILITATION.md, pod/materials logistics, agenda re-check).

## Materials

- Deck: TS format, `bun run --cwd modules/keynote dev`. Slides in `src/slides.tsx`, components in `src/kit.tsx`, host photos in `src/assets/hosts/<slug>.jpg`.
- [speaker-notes.md](speaker-notes.md): per-slide presenter notes, build-up list, open TODOs.
- `research/` (gitignored): Fabian's CTO keynote (full text + 35 screenshots), notes on Björn's 80-page factory deck, source pointers.
- Content sources: the factory narrative in `/Users/tereza/repos/hw/software-factory-slides` (keep terminology consistent) and the bootcamp framing on the event page.
