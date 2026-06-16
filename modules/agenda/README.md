# Agenda & glue

One small deck for everything organizational: day agenda overviews and the framing slides for sessions that need no deck of their own. Sessions covered:

| Day, time | Session | Owner | What it needs |
|-----------|---------|-------|---------------|
| Day 1, 16:30-17:30 | Customer reports | Stefan + 2 customer guests | Host intro slide; collect guest decks in `guest-decks/` |
| Day 2, 12:00-13:00 | Cross-pod show & tell | TBD | One framing slide: order, timebox per pod, what to show. Each pod confirmed its presenter on Day 1, see [FACILITATION.md](../../FACILITATION.md) |
| Day 2, 16:15-17:00 | Reflect & Commit | Facilitated | Worksheet + 90-day rollout template in `exercises/` |
| Day 2, 17:00-17:30 | Closing & Group Photo | All trainers | 2-3 slides: thanks, where the materials live |

Purely facilitated sessions stay slide-free; this module only carries what genuinely needs a screen.

## Materials

- Deck (`src/slides.tsx`, TS, theme via the shared kit): the pod-block exercise overview is built (cover plus one timeline slide per hands-on block: Day 1 AM, Day 1 PM, Day 2 AM), with per-exercise timings sourced from the `dev-bootcamp-factory-workshop` block READMEs. The `BlockPlan` component lives in `src/kit.tsx`. Framing slides for the organizational sessions above (customer reports intro, show & tell, closing) still to add to the same deck. Day 2 PM (Pod block 4 / cycle) is Nermin's and lives elsewhere.
- `exercises/`: reflection worksheet and the 90-day rollout template (the event page promises participants take it home).
- `guest-decks/`: final PDFs from the customer-report guests, so participants get them with the rest.
