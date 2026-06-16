import {
  Accent,
  CardGrid,
  Code,
  Cols,
  Cover,
  Layers,
  LoopCompare,
  NumberedList,
  Outputs,
  PodRunsheet,
  Section,
  StageCards,
  Statement,
  type SlideDef,
} from './kit'
import qrFactoryWorkshop from './assets/factory-workshop-qr.svg'

/*
 * Intro to the Pipeline (Day 1, 14:00-14:30) + Pod block 2 briefing.
 * Talk: RPI, planning, sub-agents, fast feedback, determinism.
 * Pod briefing: the planner -> refine -> implement spine on the sandbox.
 *
 * Step reveals: entries wrapped as { node, steps: N } advance N times before
 * moving to the next slide. In print (#/print) everything renders revealed.
 */
export const slides: SlideDef[] = [
  // ---- TALK ----
  <Cover
    title="Intro to the pipeline"
    subtitle="Research, plan, implement. The loop your factory runs on."
    presenters="Malte Burkert"
  />,

  <Statement eyebrow="The problem" sub="That is vibe coding. It feels fast and it is the slow path.">
    "Build me X." Then you spend an hour explaining what you <Accent>actually meant</Accent>.
  </Statement>,

  <Cols
    title="The shift"
    left={
      <>
        <h2>Prompt engineering</h2>
        <p>Craft the perfect sentence. Hope the result matches.</p>
      </>
    }
    right={
      <>
        <h2>Context engineering</h2>
        <p>Give the agent what it needs to check its own work.</p>
        <p className="muted">The agent is smart enough. The question is whether it has the right context.</p>
      </>
    }
  />,

  {
    node: (
      <StageCards
        eyebrow="The pattern"
        title="Research, plan, implement"
        stepped
        stages={[
          { num: 'R', title: 'Research the codebase', tone: 'teal' },
          { num: 'P', title: 'Write the plan', tone: 'purple' },
          { num: 'I', title: 'Implement on a branch', tone: 'amber' },
        ]}
        note="Same loop at every level: feature, story, task."
      />
    ),
    steps: 2,
  },

  <Statement eyebrow="Planning" sub="A plan is a durable artifact. Not a message in a chat.">
    The longer you invest in the plan, the longer the agent runs <Accent>unsupervised</Accent>.
  </Statement>,

  {
    node: (
      <LoopCompare
        title="Keep the agent on a leash"
        leftTitle="Loop of death"
        leftStops={['Prompt', 'Code', '"Not what I meant"']}
        leftBadge="vibe coding"
        leftPrompt="Wasted time. Wasted tokens."
        rightTitle="On a leash"
        rightSteps={[
          { num: '1', title: 'Ask for the plan, not the code', dur: 'gate' },
          { num: '2', title: 'Review, then implement and test', dur: 'green' },
          { num: '3', title: 'Commit. Ask what is next', dur: 'small' },
        ]}
        rightPrompt="You approve the plan, not every keystroke."
        footer="Stay in the loop at the cheap end, before any code exists."
        stepped
      />
    ),
    steps: 2,
  },

  <Statement eyebrow="Sub-agents" sub="Isolated context. Research without the bloat. Not magic, mechanics.">
    A sub-agent does the reading. You keep the <Accent>summary</Accent>.
  </Statement>,

  {
    node: (
      <StageCards
        eyebrow="The building block"
        title="Connect three skills with a Bean"
        stepped
        stages={[
          { num: '01', title: 'planner', badge: 'writes the plan', tone: 'teal' },
          { num: '02', title: 'refine', badge: 'researches, plans deeper', tone: 'purple' },
          { num: '03', title: 'implement', badge: 'writes the code', tone: 'amber' },
        ]}
        note="Each station hands off to the next. The Bean is the contract that connects them."
      />
    ),
    steps: 2,
  },

  <Code
    title="Rename a heading and the next station breaks"
    code={`
# one Bean, three stations append to it
## High-Level Plan      # planner writes this. no file paths.
## Refined Plan         # refine appends this. files, signatures, tests.
## Implementation Log   # implement appends this. branch, commits, SHAs.

# the next station parses by exact-match on the heading.
`}
  />,

  {
    node: (
      <CardGrid
        eyebrow="Determinism and feedback"
        title="What makes it reliable"
        stepped
        cards={[
          { title: 'Exact-match contracts', desc: 'The next station parses a literal heading. Breaks loud, not silent.' },
          { title: 'Validate, then run', desc: 'Missing input? Abort cleanly. No guessing, no fabrication.' },
          { title: 'Green before commit', desc: 'Tests gate every step. Two fix attempts, then stop and report.' },
          { title: 'Hooks and bounds', desc: 'Guardrails the agent cannot skip. Loops are bounded, escalation explicit.' },
        ]}
      />
    ),
    steps: 3,
  },

  <Statement
    eyebrow="For the architects worried about non-determinism"
    sub="Eventual consistency for AI: agree a contract, verify, repeat."
  >
    Stop fighting the randomness. Engineer <Accent>the loop</Accent> around it.
  </Statement>,

  {
    node: (
      <Layers
        eyebrow="Zoom out"
        title="Foundation, pipeline, factory"
        stepped
        layers={[
          { n: '01', title: 'Foundation', desc: 'Skills, hooks, rules', when: 'Block 1', tone: 'teal' },
          { n: '02', title: 'Pipeline', desc: 'RPI, sub-agents, contracts, feedback', when: 'now', tone: 'purple' },
          { n: '03', title: 'Factory', desc: 'Stations orchestrated end to end', when: 'Day 2', tone: 'amber' },
        ]}
      />
    ),
    steps: 2,
  },

  // ---- POD BRIEFING ----
  <Section
    kicker="Pod block 2 / 90 minutes"
    title="Wire your factory's pipeline"
    subtitle="Less typing. More delegating and reviewing."
  />,

  <Code
    title="What you'll wire, on the sandbox"
    code={`
# a small TypeScript calculator on Node. Beans CLI. Claude Code.

/planner   <idea>      ->  Bean with ## High-Level Plan
/refine    <bean-id>   ->  one read-only subagent, ## Refined Plan
/implement <bean-id>   ->  branch, commits, tests green
`}
  />,

  {
    node: (
      <NumberedList
        chips={[
          { label: 'Pod block 2', tone: 'teal' },
          { label: '90 min', tone: 'amber' },
        ]}
        eyebrow="Everyone wires the same pipeline"
        title="One goal, three starting points"
        stepped
        items={[
          {
            text: 'Level 1: run the supplied planner and refine, inspect the Bean.',
            hint: 'Start here if you have no skills of your own yet.',
          },
          {
            text: 'Level 2: drop in the planner you built this morning.',
            hint: 'Reuse your own work.',
          },
          {
            text: 'Level 3: harden refine with one read-only subagent and stricter checks.',
            hint: 'For pairs already ahead. Fallbacks are supplied.',
          },
        ]}
        footer="Same goal: a connected pipeline. The implement demo runs at the end."
      />
    ),
    steps: 3,
  },

  <PodRunsheet
    eyebrow="Pod block 2 / 90 min / 14:30-16:00"
    title="Your run sheet"
    qr={{
      src: qrFactoryWorkshop,
      caption: 'Clone the sandbox',
      url: 'github.com/hackersandwizards/dev-bootcamp-factory-workshop',
    }}
    items={[
      {
        num: '01',
        time: '14:30',
        eta: '15 min',
        title: 'Factory contract',
        desc: 'Inspect a Bean. See the hand-off contract before you build.',
      },
      {
        num: '02',
        time: '14:45',
        eta: '50 min',
        title: 'Wire your pipeline',
        desc: 'Pick your starting point, then build the connected spine.',
        levels: ['L1 run supplied', 'L2 replace planner', 'L3 harden refine'],
      },
      {
        num: '03',
        time: '15:35',
        eta: '15 min',
        title: 'Implement demo',
        desc: 'Trainer runs the supplied /implement on a refined Bean.',
      },
      {
        num: '04',
        time: '15:50',
        eta: '10 min',
        title: 'Reflect, pick presenter',
        desc: 'What a contract saved or broke. Decide who presents tomorrow.',
      },
    ]}
  />,

  <Outputs
    title="Before you leave the pod"
    cards={[
      { label: 'Reflect', text: 'Where did a contract boundary save you, or break you?', tone: 'teal' },
      { label: 'Commit', text: 'Pick who presents at tomorrow\'s cross-pod show and tell.', tone: 'purple' },
    ]}
    logistics={['Day 2, 12:00 / Cross-pod show and tell', 'Cover: use case, what worked, what broke']}
    closing="Decide the presenter today, so nobody scrambles tomorrow."
  />,
]
