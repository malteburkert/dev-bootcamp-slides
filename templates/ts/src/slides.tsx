import { Accent, Bullets, Code, Cols, Cover, Exercise, NumberedList, Section, Slide, Statement, type SlideDef } from './kit'

/*
 * The deck. One array entry per slide. Edit here, the runtime does the rest.
 *
 * Step reveals: wrap an entry as { node: <... stepped />, steps: N } and the arrow keys
 * reveal N times before moving on (dimmed items light up, like the example below).
 *
 * The kit has more components than this demo shows; see kit.tsx for all of them:
 * Cover, Section, Statement (+Accent), BigDate, Bullets, NumberedList, Cols, Code,
 * Exercise, StageCards, LoopCompare, CardGrid, Layers, BigStats, Agenda, Hosts, Outputs, Step.
 */
export const slides: SlideDef[] = [
  <Cover
    title="Deck template"
    subtitle="Subtitle or claim in one line"
    presenters="Presenter names"
  />,

  <Bullets
    title="What we cover"
    items={['First point, concrete and short', 'Second point', 'Third point']}
  />,

  <Section kicker="Part 1" title="A section divider" subtitle="One line on what this part delivers" />,

  <Statement eyebrow="A full-screen claim" sub="One supporting line underneath.">
    One big sentence with an <Accent>accent</Accent>.
  </Statement>,

  <Code
    title="A code slide"
    code={`
// code panels are dark, matching the factory deck
const factory = buildFactory({ skills, hooks, rules })
`}
  />,

  <Cols
    title="Two columns"
    left={<p>Left side: the setup</p>}
    right={
      <ul>
        <li>Compare</li>
        <li>Contrast</li>
      </ul>
    }
  />,

  {
    node: (
      <NumberedList
        eyebrow="Numbered list, revealed step by step"
        title="Steps with hints."
        stepped
        items={[
          { text: 'First step.', hint: 'An optional hint line below it.' },
          { text: 'Second step.', hint: 'Dimmed until you press the arrow key.' },
          { text: 'Third step.' },
        ]}
      />
    ),
    steps: 2,
  },

  <Exercise title="Try it yourself" duration="20 min">
    <ol>
      <li>Step one</li>
      <li>Step two</li>
      <li>Share one finding with your pod</li>
    </ol>
  </Exercise>,

  <Slide center>
    <h1>Thanks</h1>
    <p className="subtitle">Slides and materials: link goes here</p>
  </Slide>,
]
