# Progress

Jobs per module, who owns them, where they stand. Update the status column as materials land. Owners with a question mark are unconfirmed in the agenda.

Status values: `todo`, `in progress`, `review`, `done`.

## Modules

| Module | Agenda sessions covered | Job | Owner | Status |
|--------|------------------------|-----|-------|--------|
| `keynote` | Opening Keynote: From AI Experiments to the AI Factory (Day 1, 09:30) + Pod Kickoff: introduction rounds & the AI developer reality check (Day 1, 10:00) | Keynote deck, closing with the pod kickoff instructions | Tereza + Stefan | in progress (30-slide draft, feedback round 2 applied: opener reframed to the question "How do we work with AI when it keeps changing?", on-chart prices and the wink dot removed, the different-not-better / build-a-system beat split into its own slide 3, and slides 4-5 reframed (the online promise vs the easier-said-than-done practice; "stuck as the human in the loop", conclusion footer dropped); round 1 had the pace-timeline opener, split animated loops, token-economy beat, kickoff working groups; deck local-only on purpose; slide-2 y-axis decided as label spacing (cadence chart, not performance); next: deepen the factory description from Björn's + Fabian's material, then commit. Details: modules/keynote/README.md) |
| `foundation` | Intro to the Foundation - skills, hooks and rules (Day 1, 11:00) + Pod Block 1 - Foundations: build your factory's foundation (Day 1, 11:30) | Talk deck + pod exercises | Talk: Stefan? Exercises: TBD | todo |
| `pipeline` | Intro to the Pipeline — RPI, planning, sub-agents, fast feedback, determinism (Day 1, 14:00) + Pod block 2 — Pipeline: wire your factory's pipeline (Day 1, 14:30) | Talk deck + pod exercises | Talk: Malte. Exercises: TBD | in progress (TS deck drafted: 12 talk slides + 3 pod-briefing slides; exercises live in sibling repo dev-bootcamp-factory-workshop) |
| `factory-retro` | Retrospective for your AI Factory (Day 2, 09:00) + Pod block 3 - Evals & optimization (Day 2, 10:00) | Talk deck + eval exercises | Tereza | todo |
| `hycle` | Live walkthrough: hycle in action (Day 2, 14:00) + Pod block 4 - cycle (Day 2, 14:30) | Message talk deck (theory, no demo) | Talk: Andreas. Pod: Nermin & Stefan | in progress (TS deck built, 15 slides in `src/slides.tsx`, mirrors the keynote kit; full speaker script in `talk-outline.md`. Pod Block 4 exercises are Nermin's, not part of this module. Open (Andreas's court): confirm FINN quote wording, customer-reports check with Stefan, Tereza heads-up on keynote slides 8+11. Slot is a message talk, not a walkthrough — agenda title needs updating) |
| `agenda` | Customer reports (Day 1, 16:30), Cross-pod show & tell (Day 2, 12:00), Reflect & Commit (Day 2, 16:15), Closing & Group Photo (Day 2, 17:00) | Glue deck (intros, framing, closing), reflection worksheet, 90-day rollout template, collect guest decks | Stefan (customer reports), rest TBD | in progress (TS deck started in `modules/agenda`: exercise-overview built, cover + 3 pod-block timeline slides for Day 1 AM, Day 1 PM, Day 2 AM, timings from `dev-bootcamp-factory-workshop`. Glue/framing slides, reflection worksheet, 90-day rollout, guest decks still todo) |

## Open questions against the agenda

- Day 2, 09:30-10:00 (between the retro talk and Pod block 3) is a warm up slot. Add it to the Notion agenda so the times read cleanly.
- Owners marked `?` or TBD need names: foundation talk, pipeline talk, pod exercise materials, show & tell host, reflect & commit.
- Each pod confirms a Day 2 show & tell presenter by the end of Day 1 (rule in FACILITATION.md); the agenda deck needs a slide saying so.

## Repo

| Job | Owner | Status |
|-----|-------|--------|
| Repo scaffold: brand tokens, theme, deck templates, module spaces | Tereza | done |
| Facilitation guide (FACILITATION.md) | Tereza | done |
| Push scaffold so the team can start | Tereza | done |
| Combined site / PDF bundle for participants, after the content exists | TBD | later |
