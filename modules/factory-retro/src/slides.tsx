import {
  Cover,
  Statement,
  Accent,
  BigLoop,
  Boxes,
  Layers,
  CardGrid,
  BigStats,
  NumberedList,
  Code,
  Figure,
  type SlideDef,
} from './kit'
import qrspi from './assets/qrspi.png'

/*
 * Retrospective for your AI Factory (Day 2, 09:00-09:30, Tereza).
 * Widened arc (see research/2026-06-17-widen-design.md): open on the keynote's two
 * "tomorrow morning" slides, ground the retro in agile, widen the factory to the whole
 * lifecycle (QRSPI + a real dev workflow), show the loop and the discipline that makes it
 * halt, then walk see-it / define-right / post-mortem, and close on the human meta layer.
 * Reframed away from "the factory optimizes itself": be aware of a flaw first, then improve,
 * by hand before automation. Sources + verify flags: research/2026-06-17-widen-design.md.
 */

export const slides: SlideDef[] = [
  /* 0 — cover */
  <Cover
    title="Retrospective for your AI Factory"
    subtitle="A retro for the factory you built yesterday: what happened, did it get better, did it stick."
    presenters="Tereza Iofciu"
  />,

  /* 1 — reused from the keynote: is the climb worth it (the unpaid promise) */
  {
    node: (
      <BigStats
        eyebrow="Is the climb worth it?"
        stepped
        stats={[
          { value: '+30%', label: 'with a license alone', tone: 'amber' },
          { value: '3-10x', label: 'with a factory around it', tone: 'teal' },
        ]}
        footer="Nobody shows you how these are measured. A single number called quality oversimplifies, and it means something different in every organization. Tomorrow morning you define what it means in yours."
      />
    ),
    steps: 2,
  },

  /* 1b — what a retro is, from agile; pose the success question into the next slide */
  <Boxes
    eyebrow="Borrowed from agile"
    title="First, what is a retro?"
    cols={2}
    boxes={[
      {
        label: 'In Scrum',
        title: 'Look back, then improve',
        text: 'A retrospective reviews the last sprint to decide what to keep, change, and act on. The sprint succeeds when every issue is closed.',
        tone: 'teal',
      },
      {
        label: 'With agents',
        title: 'You manage the team now',
        text: 'A developer runs a team of agents. Same practice, pointed at the factory. But what counts as a good run is still up for debate.',
        tone: 'purple',
      },
    ]}
    footer="In Scrum the finish line is given. For a factory of agents, you define it first."
  />,

  /* 2 — reused from the keynote: the evaluation question, by constraint */
  <CardGrid
    eyebrow="Evaluating the factory"
    title="Did this change make things better or worse?"
    cards={[
      { title: 'If cost is the constraint', desc: 'Better means fewer tokens for the same result. Cheaper models per step, less context bloat.' },
      { title: 'If time is the constraint', desc: 'Better means faster per delivered feature. Less wall-clock, less waiting on the loop.' },
      { title: 'If quality is the constraint', desc: 'Better means fewer escaped defects and a lower change-failure rate. Correctness over speed.' },
      { title: 'If trust is the constraint', desc: 'Better means more confidence per change: reviewable evidence, not a green checkmark.' },
    ]}
    footer="You cannot maximize all four at once. Name the constraint you are under, then measure against it. That is tomorrow morning: data, not vibes."
  />,

  /* 3 — reframe: your factory is a team you retro (tightened to the twist only) */
  <Statement
    eyebrow="The twist"
    sub="A team retro produces action items for people. Here the action item changes the system itself, so the same miss cannot come back."
  >
    Your factory is a <Accent>team</Accent>. Retro it.
  </Statement>,

  /* 4 — the whole lifecycle: QRSPI image, credited to Lavaee */
  <Figure
    eyebrow="The whole lifecycle"
    title="The factory is bigger than the code step."
    src={qrspi}
    alt="QRSPI stages: alignment is Questions, Research, Design, Structure, Plan; execution is Work tree, Implement, PR review"
    footer="Most failures happen before code. Eventually you want observability and eval at every agent in the loop."
    credit="Alex Lavaee, alexlavaee.me/blog/from-rpi-to-qrspi"
  />,

  /* 5 — how we want the system to run (a real workflow, scripts stripped) */
  <Code
    title="How we want the system to run."
    code={`# Start work: feature branch, mark the issue in progress

# Develop (TDD loop)
#   1. failing test  2. make it pass  3. refactor  4. commit with the issue file

# Verify: a sub-agent checks it actually works

# Open the PR
git push -u origin <branch>
gh pr create --title "..." --body "..."

# Review (parallel sub-agents): post findings, fix the critical ones, wait for a human

# After merge: back to main, delete the branch, mark the issue done`}
  />,

  /* 6 — the three questions as one loop, asked at every stage */
  <BigLoop
    eyebrow="Three questions, one loop"
    title="A retro asks three things."
    stops={[
      { label: 'What happened?' },
      { label: 'Did it get better?' },
      { label: 'Did it stick?' },
    ]}
    badge="your factory"
    badgeTone="teal"
    prompt="Observability. Evals. Learning loops."
    footer="Ask them at every stage, not just the code step."
  />,

  /* 7 — the loop has two layers: inner agent, outer control plane */
  {
    node: (
      <BigLoop
        eyebrow="Two loops, not one"
        title="The agent loops. You wrap it."
        stops={[{ label: 'read' }, { label: 'call a tool' }, { label: 'observe' }]}
        badge="the agent"
        badgeTone="teal"
        prompt="Inner loop: the agent. Outer loop: stage, artifact, review, budget."
        footer="Let the model run inside the loop. Do not let it be the loop."
        stepped
      />
    ),
    steps: 1,
  },

  /* 8 — loops, the production version: the ambition vs receipts gap */
  {
    node: (
      <BigStats
        eyebrow="Loops, the production version"
        stats={[
          { value: '17%', label: 'of orgs have shipped agents', tone: 'teal' },
          { value: '40%', label: 'of agent projects cancelled by 2027', tone: 'amber' },
        ]}
        footer="The romantic version: write loops, a thousand agents build your company. The production version: write loops, and most of your job is making them halt. Gartner blames inadequate risk controls."
        note="Gartner, 2026 Hype Cycle for Agentic AI"
        stepped
      />
    ),
    steps: 2,
  },

  /* 8b — make it halt: the three hard stops as config */
  <Code
    title="Make it halt. Three hard stops."
    code={`// the outer loop's stopping conditions
maxIterations:    8,
noProgressAfter:  2,        // consecutive steps with no new artifact
budgetCeilingUsd: 5.00,     // hard stop, no exceptions

// no-progress detection is "iterating too many times without converging",
// caught by the system instead of by you watching.`}
  />,

  /* 9 — how the labs evaluate: a spectrum, Cursor to Anthropic */
  <Boxes
    eyebrow="Two labs, one spectrum"
    title="Monitor, or experiment."
    cols={2}
    boxes={[
      {
        label: 'Cursor / watch production',
        title: 'Online signals',
        text: 'Keep Rate and accept rate from real sessions. Every prompt and harness change gets A/B tested against the live one.',
        tone: 'teal',
      },
      {
        label: 'Anthropic / run experiments',
        title: 'Offline evals',
        text: 'Capability and regression suites. A broad per-model eval gates every change before it ships.',
        tone: 'purple',
      },
    ]}
    footer="Production signals and a test suite. You need both ends."
  />,

  /* 10 — the cautionary tale: the harness moved, the model did not */
  <Statement
    eyebrow="Anthropic, 2026"
    sub="Six weeks chasing 'Claude got dumber.' A few quiet changes to the scaffolding caused it, not the model, and the eval suite was too narrow to see it. Watch the whole factory, not just the model."
  >
    The model never changed. The <Accent>harness</Accent> did.
  </Statement>,

  /* 11 — see it: trace the run, not just the result */
  {
    node: (
      <Layers
        eyebrow="Data, not vibes"
        title="Trace the run, not just the result."
        stepped
        layers={[
          { title: 'Artifacts', desc: 'the diff, the commits, the tests, the change log', when: 'most stop here', tone: 'teal' },
          { title: 'Execution', desc: 'the ordered tool calls: read, write, run, commit', when: 'the process', tone: 'purple' },
          { title: 'Conversation', desc: 'the transcript, the tokens spent', when: 'the why', tone: 'amber' },
        ]}
      />
    ),
    steps: 2,
  },

  /* 11b — the questions a trace lets you ask */
  <Statement
    eyebrow="Now you can ask"
    sub="How many loops did it take? Is it converging, or thrashing? And the one that matters most: what does a good run even look like here?"
  >
    A trace turns <Accent>vibes</Accent> into questions you can answer.
  </Statement>,

  /* 12 — see it: this week to ideal (your own stack) */
  {
    node: (
      <Boxes
        eyebrow="See it"
        title="Observability."
        cols={2}
        stepped
        boxes={[
          {
            label: 'This week',
            title: 'Read the record each task leaves',
            text: 'The plan it followed and the log of what it changed. Start with metrics you already track: lead time, change-failure rate, the DORA four.',
            tone: 'teal',
          },
          {
            label: 'Ideal',
            title: 'Trace every step, on your own stack',
            text: 'What it read, ran, and retried. Point the observability you already run at your agents: Prometheus and Grafana, or a purpose-built tracer.',
            tone: 'purple',
          },
        ]}
        footer="Track with the tools you already own. Do not adopt a toy."
      />
    ),
    steps: 2,
  },

  /* 13 — define right: code your expectations (rules + Definition of Done) */
  <Code
    title="Code your expectations."
    code={`# "Working" = these hold:
1. never commit straight to main; always a feature branch
2. never merge your own PR; a human reviews first
3. tests before implementation
4. smoke-test before the PR
5. keep the issue checklist current

# Every issue carries a Definition of Done.
# You cannot mark it complete with unchecked items.

# "Not working" = any one of these broke.`}
  />,

  /* 14 — test it: this week to ideal (scripts decide, a model judges the rest) */
  {
    node: (
      <Boxes
        eyebrow="Test it"
        title="Evals."
        cols={2}
        stepped
        boxes={[
          {
            label: 'This week',
            title: 'One seeded defect, one gate',
            text: 'Plant a known mistake. A check catches it before code lands. Most checks are a script: did it touch the right files, are the headings there, do the tests pass.',
            tone: 'teal',
          },
          {
            label: 'Ideal',
            title: 'Scripts decide, a model judges the rest',
            text: 'A script for what rules can measure. A different model as judge for the quality they cannot, validated against human labels.',
            tone: 'purple',
          },
        ]}
        footer="A 3 out of 5 hides the question. Pass or fail forces you to define good."
      />
    ),
    steps: 2,
  },

  /* 15 — the bridge: escapes become tests */
  <Statement
    eyebrow="The bridge to loops"
    sub="A defect that slips past once is tagged with the PR that introduced it, then planted as a fixture. It can never slip past again. Public benchmarks rot and leak; your own escapes do not."
  >
    Every escape becomes a <Accent>test</Accent>.
  </Statement>,

  /* 16 — the four rules everyone converges on (headline) */
  {
    node: (
      <Boxes
        eyebrow="What everyone keeps landing on"
        title="The same four rules, everywhere."
        cols={2}
        stepped
        boxes={[
          { label: 'Rule 1', title: 'Failure cases and clean cases', text: 'Plant known defects, and include fixtures with none. Catch misses without crying wolf.', tone: 'teal' },
          { label: 'Rule 2', title: 'The judge is not the generator', text: 'Grade with a different model, or validate your judge against human labels.', tone: 'purple' },
          { label: 'Rule 3', title: 'Trends over absolutes', text: 'Gate on regressions and deltas, not a single green number.', tone: 'amber' },
          { label: 'Rule 4', title: 'Variance is a signal', text: 'Run it 3 to 5 times. The agent that passes once often fails on rerun. High spread means underspecified.', tone: 'green' },
        ]}
        footer="Anthropic's eval taxonomy, Husain and Shankar's field playbook, and two internal factories all keep landing here. Convergence is not coincidence. It is the shape of the problem."
      />
    ),
    steps: 4,
  },

  /* 17 — make it stick: run the post-mortem to the system */
  <NumberedList
    eyebrow="When behaviour diverges"
    title="Run the post-mortem to the system."
    items={[
      { text: 'Signal', hint: 'a rule broke, a metric moved, a human had to step in' },
      { text: 'Diagnose', hint: 'why it happened, and where in the factory' },
      { text: 'Change the system', hint: 'not the one artifact: the rule, the skill, the check' },
      { text: 'Verify it holds', hint: 're-measure against the baseline' },
      { text: 'The next agent inherits it', hint: 'the fix lives where the next run will read it' },
    ]}
  />,

  /* 17b — 5 whys: the diagnosis technique, a callback to the postmortem (slide 10) */
  <NumberedList
    eyebrow="Diagnosis, done right"
    title="Ask why until you hit the system."
    items={[
      { text: '"Claude got dumber"', hint: 'the symptom everyone argued for six weeks' },
      { text: 'Why? Outputs regressed on our own tasks', hint: 'measured, not felt' },
      { text: 'Why? A few tool definitions had changed', hint: 'in the harness, not the model' },
      { text: 'Why? A scaffolding change shipped unreviewed', hint: 'nothing gated it' },
      { text: 'Why? The evals watched the model, not the factory', hint: 'the root cause' },
    ]}
    footer="Stop at why one and you blame the model. Keep going and you fix the system. Five whys turns a postmortem into a change."
  />,

  /* 18 — make it stick: improve by hand first, automate last */
  {
    node: (
      <Boxes
        eyebrow="Make it stick"
        title="Improve by hand first."
        cols={2}
        stepped
        boxes={[
          {
            label: 'First, by hand',
            title: 'Fix it, then codify it',
            text: 'Turn one merged-PR learning into a rule the next agent reads. Reviews post findings; a rework pass fixes them; a repeated escape becomes a hook.',
            tone: 'teal',
          },
          {
            label: 'Only then, automate',
            title: 'Wire the proven check into the loop',
            text: 'Once a check earns its keep by hand, make it a hook or a gate. Automation is the last step, not the first.',
            tone: 'purple',
          },
        ]}
        footer="Land the change where the next run cannot miss it."
      />
    ),
    steps: 2,
  },

  /* 19 — the mirror invariant, made concrete: the enforcing hooks */
  <Code
    title="A working agreement no one checks is just a wish."
    code={`# expectations, enforced by hooks

PreToolUse hook    validates every branch name; a bad name is blocked.
PostToolUse hook   validates the Definition of Done; an issue with
                   unchecked items cannot be marked complete.

# the rule that guides the edit is the rule the system checks.`}
  />,

  /* 20 — tooling at a glance: map tools to pillars, use your own stack */
  <Boxes
    eyebrow="Tooling at a glance"
    title="Build it once by hand. Then choose a tool."
    cols={2}
    boxes={[
      {
        label: 'See it',
        title: 'Tracing and metrics',
        text: 'OpenTelemetry as the wire format. Logfire or Langfuse purpose-built, or point Prometheus and Grafana, which you already run, at your agents.',
        tone: 'teal',
      },
      {
        label: 'Test it',
        title: 'Eval harnesses',
        text: 'pydantic-evals, Braintrust, Langfuse run your cases and track them over time.',
        tone: 'purple',
      },
    ]}
    footer="Build the hook and the check by hand once, so you choose a tool instead of cargo-culting one. The principle outlives the vendor."
  />,

  /* 21 — where to start: the basic loop on the workflow you already have */
  <NumberedList
    eyebrow="Where to start"
    title="Start with the basic steps of your workflow."
    items={[
      { text: 'Observe', hint: 'trace one real run and see what actually happened' },
      { text: 'Improve', hint: 'fix the one thing that broke, by hand' },
      { text: 'Expand', hint: 'add the next stage, the next check' },
      { text: 'Iterate', hint: 'run it again and let the small loop compound' },
    ]}
    footer="A small loop on the workflow you already have. Start there."
  />,

  /* 22 — the meta layer stays human: who decides what to automate */
  <Statement
    eyebrow="Who tunes the factory?"
    sub="Stage by stage you hand more to agents. The meta layer, where you decide what to measure, what good means, and what to automate, stays yours. The Day 1 cases kept the human heavily in that loop. Alignment up front means the final review is a spot-check, not a slog."
  >
    Automation is the <Accent>last</Accent> step, not the first.
  </Statement>,

  /* 23 — the keystone: the change protocol, as a card */
  <Code
    title="How we'll know it worked."
    code={`# How we'll know it worked

Metric:       first-pass success (builds and tests, no human fix)
Baseline:     6 of 10 changes, today
The change:   add a plan check before code lands
Check-back:   re-measure after 10 changes, by 2026-07-15
Revert if:    it blocks a good change more than 1 in 10

# State all five, or the change fails review.`}
  />,

  /* 24 — hand into the pod block */
  <CardGrid
    eyebrow="Pod block 3, next"
    title="What is quality for your factory?"
    cards={[
      { title: 'Pick a metric', desc: 'From a menu, or your own. Name the constraint it serves.' },
      { title: 'Measure it', desc: 'Instrument it on the pipeline you built. Capture the baseline.' },
      { title: 'Improve one thing', desc: 'Close one loop. One improvement end to end beats ten half-built.' },
    ]}
    footer="The sandbox taught you the moves. Now run them on your factory. Two hours, and you leave with a number you did not have this morning."
  />,

  /* 25 — tools you can use today */
  <Boxes
    eyebrow="Start today"
    title="Three tools you can open now."
    cols={3}
    boxes={[
      {
        label: 'The standard',
        title: 'OpenTelemetry',
        text: 'opentelemetry.io. Vendor-neutral traces and metrics. The format the rest can read.',
        tone: 'teal',
      },
      {
        label: 'Purpose-built',
        title: 'Pydantic Logfire',
        text: 'pydantic.dev/logfire. Tracing made for LLM apps and agents: runs, tokens, and cost.',
        tone: 'purple',
      },
      {
        label: 'Your own stack',
        title: 'Grafana',
        text: 'grafana.com. AI observability for agents, on the Prometheus and Grafana you already run.',
        tone: 'amber',
      },
    ]}
    footer="One standard, one purpose-built tool, one you already own. Pick one and trace a single run this week."
  />,
]
