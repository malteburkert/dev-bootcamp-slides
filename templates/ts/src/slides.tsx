import type { ReactNode } from 'react'
import { Bullets, Code, Cols, Cover, Exercise, Section, Slide } from './kit'

/*
 * The deck. One array entry per slide. Edit here, the runtime does the rest.
 */
export const slides: ReactNode[] = [
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
