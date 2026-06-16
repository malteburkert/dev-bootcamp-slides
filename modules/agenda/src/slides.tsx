import { BlockPlan, Cover, type SlideDef } from './kit'

/*
 * Agenda module: exercise outlines for the three hands-on pod blocks.
 * One slide per block (Day 1 AM, Day 1 PM, Day 2 AM), each a timed plan.
 * Source of truth: ../dev-bootcamp-factory-workshop (block READMEs).
 *
 * Day 2 PM (Pod block 4 / cycle) is owned by Nermin and lives elsewhere, so
 * it is not covered here. Add a fourth BlockPlan when that block is set.
 */
export const slides: SlideDef[] = [
  <Cover
    title="Pod blocks at a glance"
    subtitle="What each hands-on block builds, and the timing per exercise."
  />,

  // ---- Day 1 AM ----
  <BlockPlan
    eyebrow="Day 1 / 11:30 / Pod block 1"
    title="Day 1 morning: foundations"
    subtitle="A menu, not a checklist. A 10 minute shared kickoff on the mechanism ladder, then split by experience. Nobody is expected to finish everything."
    columns={[
      {
        kicker: 'Track A / starter to intermediate',
        rows: [
          { t: '15 min', s: <><span className="ex-n">00</span>Pirate CLAUDE.md</> },
          { t: '25 min', s: <><span className="ex-n">01</span>Pirate Skill</> },
          { t: '35 min', s: <><span className="ex-n">04</span>Planning Skill</>, chip: 'converge', tone: 'teal' },
        ],
      },
      {
        kicker: 'Track B / advanced',
        rows: [
          { t: '20 min', s: <><span className="ex-n">02</span>Rules</> },
          { t: '30 min', s: <><span className="ex-n">03</span>Subagent</> },
          { t: '30 min', s: <><span className="ex-n">04</span>Planning Skill, made stricter</>, chip: 'converge', tone: 'teal' },
          { t: 'stretch', s: 'Hook guardrail, if you are fast', chip: 'optional', tone: 'plain' },
        ],
      },
    ]}
    footer="Convergence point: a planning Skill that writes a Bean with a High-Level Plan. The afternoon needs that artifact, however you produce it."
  />,

  // ---- Day 1 PM ----
  <BlockPlan
    eyebrow="Day 1 / 14:30 / Pod block 2"
    title="Day 1 afternoon: the pipeline"
    subtitle="One common factory spine: planner, refine, implement. Start from the supplied baseline and swap in your own work as it is ready."
    columns={[
      {
        kicker: 'Flow / the block',
        rows: [
          { t: '15 min', s: 'Explain the factory contract' },
          { t: '50-60 min', s: 'Build: pick one level (right)' },
          { t: '15-20 min', s: 'Implement demo: trainer runs /implement' },
          { t: '10 min', s: 'Debrief: what glued the factory together' },
        ],
      },
      {
        kicker: 'Build / pick one level',
        rows: [
          { t: 'L1', s: 'Run the supplied planner and refine, inspect the Bean' },
          { t: 'L2', s: 'Replace the planner with your morning Skill' },
          { t: 'L3', s: 'Harden refine: a read-only subagent and stricter checks' },
        ],
      },
    ]}
    footer="The contract is the glue: planner writes the High-Level Plan, refine adds the Refined Plan, implement reads it. Rename a heading and the next station breaks."
  />,

  // ---- Day 2 AM ----
  <BlockPlan
    eyebrow="Day 2 / 10:00 / Pod block 3"
    title="Day 2 morning: instrument your factory"
    subtitle="Three moves on the Day 1 calculator factory: see a run, test it, make the fix stick. Do them in order."
    columns={[
      {
        kicker: 'Timeline / two hours',
        rows: [
          { t: '0:00', s: 'Setup and framing' },
          { t: '0:10', s: <><span className="ex-n">01</span>See it</> },
          { t: '0:40', s: <><span className="ex-n">02</span>Test it</> },
          { t: '1:15', s: <><span className="ex-n">03</span>Make it stick</> },
          { t: '1:50', s: 'Reveal and show and tell prep' },
        ],
      },
      {
        kicker: 'The three moves',
        rows: [
          { t: '01', s: <><strong>See it.</strong> Observability: make one run inspectable</> },
          { t: '02', s: <><strong>Test it.</strong> Evals: validated on a good and a broken bean</> },
          { t: '03', s: <><strong>Make it stick.</strong> Learning loops: turn a failure into a guard</> },
        ],
      },
    ]}
    footer="You cannot eval what you cannot see, and you cannot close a loop you cannot eval. The order is the lesson."
  />,
]
