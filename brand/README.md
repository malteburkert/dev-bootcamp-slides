# Brand

One look across every deck, whatever the format. Decks consume this folder, they never define their own colors or fonts.

## Where the tokens come from

| Token group | Source |
|-------------|--------|
| Teal `#1a7285`, ink `#1d2739`, teal tint | h&w colors, used in the trainer base and the factory deck |
| Off-white `#f7f7f5`, warm grays `#9a9a94` / `#5a5a56` | alphalist website palette |
| Purple `#9333ea`, amber `#f59e0b`, code-panel colors | "The AI Software Factory" deck (Björn's keynote at this event) |

## Fonts

- **Space Grotesk** for headings. Display font of the factory deck, so the bootcamp decks match the keynote on stage.
- **Inter** for body text. Both alphalist and h&w already use it.
- **JetBrains Mono** for code, labels, eyebrows. The alphalist site uses it too.

Loaded from Google Fonts via [fonts.css](fonts.css). TS decks add the same `<link>` in their `index.html`.

## Logos

| File | Use |
|------|-----|
| `logos/hw-logo.svg` | Watermark, bottom right of every slide. Both templates ship it; leave it in place. |
| `logos/hw-type-logo-long.png` | Wordmark for cover slides and handouts. |

There is no alphalist logo file in this repo. Name the event in text ("alphalist Developer Bootcamp, Hamburg") instead of placing their logo.

## How decks consume this

- **Slidev**: the `hw-bootcamp` theme (`brand/slidev-theme/`) imports tokens and fonts and styles all built-in layouts. Decks set `theme: hw-bootcamp` and inherit everything.
- **TS**: `src/main.tsx` imports `brand/tokens.css`; the deck kit (`src/kit.tsx`, `src/deck.css`) styles components with the variables.

Change a color once in [tokens.css](tokens.css) and every deck follows on the next build.
