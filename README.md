# Developer Bootcamp Hamburg, slides & materials

Slides and exercise materials for the alphalist Agentic Engineering DEV Bootcamp, June 16-17, 2026, Jufa Hotel Hamburg. Built by hackers & wizards.

## Quick start

Needs [Bun](https://bun.sh) (`curl -fsSL https://bun.sh/install | bash`).

```bash
bun install
bun run --cwd modules/keynote dev     # work on the keynote
bun run --cwd templates/slidev dev    # see the Slidev template deck
bun run --cwd templates/ts dev        # see the TS template deck
```

## Repo map

| Path | What lives there |
|------|------------------|
| `modules/` | One folder per topic (keynote, foundation, pipeline, factory-retro, hycle, agenda): `module.json` with the agenda sessions it covers, deck, exercises |
| `brand/` | Design tokens, fonts, h&w logos, the shared Slidev theme |
| `templates/` | Deck starters: `slidev/` and `ts/` (Vite + React) |
| `scripts/` | Scaffolding, site build, PDF export |
| `site/` | Generated output, gitignored |

## Add a deck to a module

```bash
bun run new foundation slidev
bun install
```

Each module picks its own format. Pick Slidev to write markdown fast. Pick TS when the deck needs bespoke visuals and an agent does most of the editing. Both read the shared style from `brand/`, so the decks look like one event.

## Share a deck

Present from the dev server, share the live link, or hand out files per deck:

- TS decks are live on GitHub Pages, each at its own subpath, redeployed on every push to `main`. The keynote: **https://hackersandwizards.github.io/dev-bootcamp-slides/keynote/** (append `#/print` to see every slide at once). The [site root](https://hackersandwizards.github.io/dev-bootcamp-slides/) lists all deployed decks.
- Slidev decks export to PDF with `bun run --cwd modules/<slug> export` (one-time setup: `bun add -d playwright-chromium && bun pm trust playwright-chromium`).
- TS decks print to PDF from the browser: open the deck with `#/print` appended to the URL and print.

A combined site or PDF bundle for participants comes later, after the content exists.

## Pod materials

[FACILITATION.md](FACILITATION.md) defines the facilitator role and the format every exercise follows: goal, timeboxed steps, expected outcome, reflection prompts. Read it before building pod activities.

## Style

One source of truth: [brand/tokens.css](brand/tokens.css). Use the variables, never raw hex values in decks. Rationale and usage notes: [brand/README.md](brand/README.md).
