# CLAUDE.md

Slides and exercise materials for the alphalist Agentic Engineering DEV Bootcamp in Hamburg, June 16-17, 2026 (Jufa Hotel, 50 participants, five pods of ten). hackers & wizards runs the program. Audience: engineering managers, staff/principal engineers, tech leads. Peer language, not vendor language.

## Source of truth

- Agenda: Notion page "Agenda Developer Bootcamp Hamburg" (https://app.notion.com/p/Agenda-Developer-Bootcamp-Hamburg-3422eb77454b80708474ce8200175ff6). The website lags behind it.
- Module READMEs and `PROGRESS.md` carry the agenda rows (time, session, owner) each module covers. Session titles are VERBATIM agenda names, including their punctuation; never normalize them. When the agenda shifts, update both.

## Module map

One module per topic; a module usually covers an intro talk plus its pod block.

| Module | Agenda sessions covered |
|--------|------------------------|
| `keynote` | Opening Keynote: From AI Experiments to the AI Factory (Day 1, 09:30, Tereza + Stefan) + Pod Kickoff (Day 1, 10:00). Kickoff instructions are the keynote's closing slides. |
| `foundation` | Intro to the Foundation - skills, hooks and rules (Day 1, 11:00, Stefan?) + Pod Block 1 - Foundations (Day 1, 11:30) |
| `pipeline` | Intro to the Pipeline — RPI, planning, sub-agents, fast feedback, determinism (Day 1, 14:00, Malte?) + Pod block 2 — Pipeline (Day 1, 14:30) |
| `factory-retro` | Retrospective for your AI Factory (Day 2, 09:00, Tereza) + Pod block 3 - Evals & optimization (Day 2, 10:00) |
| `hycle` | Live walkthrough: hycle in action (Day 2, 14:00, Andreas) + Pod block 4 - cycle (Day 2, 14:30, Nermin & Stefan) |
| `agenda` | The glue: Customer reports (Day 1, 16:30), Cross-pod show & tell (Day 2, 12:00), Reflect & Commit (Day 2, 16:15), Closing & Group Photo (Day 2, 17:00) |

Purely facilitated sessions get no deck.

## Formats

Every module chooses one of two deck formats. The choice belongs to whoever builds the module.

- **Slidev**: markdown deck, theme `hw-bootcamp` from `brand/slidev-theme/`. Fast to write by hand. Start: `npm run new -- <slug> slidev`.
- **TS (Vite + React)**: components in `src/slides.tsx` using the kit in `src/kit.tsx`. For bespoke visuals; assume agents do the editing. Start: `npm run new -- <slug> ts`.

Both must keep the same look. The contract: import colors, fonts, spacing from `brand/tokens.css`; keep the h&w logo watermark every deck ships with; never hardcode hex values in slides.

## Commands

| Command | Effect |
|---------|--------|
| `npm run new -- <slug> <slidev\|ts>` | Copy a template into `modules/<slug>` |
| `npm run dev -w modules/<slug>` | Dev server for one deck (also works for `templates/slidev` and `templates/ts`) |
| `npm run export -w modules/<slug>` | PDF of a Slidev deck (one-time setup: `npm i -D playwright-chromium`) |

TS decks print to PDF from the browser via the `#/print` route. There is no combined site or PDF pipeline yet; that comes after the content exists.

## Style rules

- Colors and fonts come from `brand/tokens.css`. Headings: Space Grotesk. Body: Inter. Code and labels: JetBrains Mono. Background is the warm off-white `--bg`, not pure white.
- Token sources: h&w teal/ink from the trainer base and factory deck, warm grays and off-white from the alphalist site, purple/amber accents from the factory deck. Details in `brand/README.md`.
- Slide headings use sentence case ("Build your factory's foundation", not "Build Your Factory's Foundation").
- Participant-facing copy is plain ASCII punctuation: no em-dashes, no arrows, no bullet dots, no decorative emoji. Write short sentences, concrete claims, active voice. Banned filler: "leverage", "best practices", "transform", "methodology", "approach", bare multipliers like "10x" without a named metric.
- "Vibe coding" is always the anti-pattern, never the recommendation. "Agentic engineering" is the term of art; keep it.

## Content sources in sibling repos

- `/Users/tereza/repos/hw/software-factory-slides`: Björn's "The AI Software Factory" deck (Next.js, 48 slides, en + de). Canonical factory narrative, the 21 ingredients, and the evals/learning-loop material. Mine it for the keynote and `d2-01`/`d2-02` content; keep terminology consistent with it.
- `/Users/tereza/repos/hw/agentic-engineering-trainer-base`: trainer handbook, 23 curriculum units with core cards, and the h&w voice skill (`.claude/skills/voice/`). Check decks against the relevant core cards.

## Tracking

`PROGRESS.md` tracks deliverables, owners and status per module. Update it whenever a module's materials change state.

`FACILITATION.md` defines how pod blocks run and the format every exercise README follows (goal, timeboxed steps, expected outcome, reflection prompts). Read it before building pod materials. It also fixes the rule that every pod confirms a Day 2 show & tell presenter by the end of Day 1.

## Repo conventions

- `dist/` and `node_modules/` stay out of git.
- Module assets live in the module (`public/` for Slidev, `src/assets/` for TS). Shared brand assets live in `brand/logos/` only.
- Exercises live in `modules/<slug>/exercises/`, one folder per exercise with a README and starter files.
- Do not commit or push unless asked.
