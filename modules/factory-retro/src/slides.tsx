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
  Ladder,
  Code,
  type SlideDef,
} from './kit'

/*
 * Retrospective for your AI Factory (Day 2, 09:00-09:30, Tereza).
 * Arc: collect on the keynote's two "tomorrow morning" slides, reframe the
 * factory as a team you retro, walk the three questions (see it / test it /
 * make it stick) from this-week to ideal, then hand into Pod block 3.
 * Style and kit are the keynote's. Slides 1 and 2 are reused verbatim from it.
 * Named examples (Cursor, Anthropic) and the postmortem are researched: see
 * research/harness-eval-practices.md. Verify post-cutoff figures before presenting.
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

  /* 3 — reframe: your factory is a team you retro */
  <Statement
    eyebrow="It's a retrospective"
    sub="The agents, the harness, you. Keep, change, act. But here the action item changes the system, so the same miss cannot come back."
  >
    Your factory is a <Accent>team</Accent>. Retro it.
  </Statement>,

  /* 4 — the three questions as one loop */
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
    footer="Treat your pipeline as a product."
  />,

  /* 5 — how the labs evaluate: a spectrum, Cursor to Anthropic */
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

  /* 6 — the cautionary tale: the harness moved, the model did not */
  <Statement
    eyebrow="Anthropic, 2026"
    sub="Six weeks chasing 'Claude got dumber.' A few quiet changes to the scaffolding caused it, not the model, and the eval suite was too narrow to see it. Watch the whole factory, not just the model."
  >
    The model never changed. The <Accent>harness</Accent> did.
  </Statement>,

  /* 7 — see it: trace the run, not just the result */
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

  /* 8 — see it: this week to ideal */
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
            text: 'The plan it followed and the log of what it changed. You already have this.',
            tone: 'teal',
          },
          {
            label: 'Ideal',
            title: 'Trace the path, not just the result',
            text: 'What it read, ran, and retried. Instrument the signal you need, not the tool you use.',
            tone: 'purple',
          },
        ]}
        footer="Start with what the factory already writes down."
      />
    ),
    steps: 2,
  },

  /* 9 — test it: name one constraint, define pass */
  <Statement
    eyebrow="Trust, but verify"
    sub="Cost, time, quality, or trust. You cannot maximize all four. Pick the one you are under, then write down the bar a change has to clear."
  >
    Name <Accent>one</Accent> constraint. Define what pass means.
  </Statement>,

  /* + two kinds of eval: a script decides, or a model judges (sets up 02 Part 1/2) */
  {
    node: (
      <Boxes
        eyebrow="Two kinds of check"
        title="A script decides, or a model judges."
        cols={2}
        stepped
        boxes={[
          {
            label: 'Deterministic',
            title: 'A check a script can run',
            text: 'Did it touch the right files? Are the headings there? Do the tests pass? Pass or fail, no model needed.',
            tone: 'teal',
          },
          {
            label: 'LLM as a judge',
            title: 'A model grades the output',
            text: 'Is the plan at the right altitude? Are the acceptance criteria real? For the quality no rule can measure. Grade with a different model than the one that wrote it, and validate the judge.',
            tone: 'purple',
          },
        ]}
        footer="Most of what matters is a cheap deterministic check. Reach for a judge only where judgment is the point."
      />
    ),
    steps: 2,
  },

  /* 10 — test it: this week to ideal */
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
            text: 'Plant a known mistake. Make sure a check catches it before the code lands. Pass or fail, nothing in between.',
            tone: 'teal',
          },
          {
            label: 'Ideal',
            title: 'Capability checks and regression checks',
            text: 'Hard new cases you push upward, plus known-good cases that must stay green.',
            tone: 'purple',
          },
        ]}
        footer="A 3 out of 5 hides the question. Pass or fail forces you to define good."
      />
    ),
    steps: 2,
  },

  /* 11 — the bridge: escapes become tests */
  <Statement
    eyebrow="The bridge to loops"
    sub="A defect that slips past once is tagged with the PR that introduced it, then planted as a fixture. It can never slip past again. Public benchmarks rot and leak; your own escapes do not."
  >
    Every escape becomes a <Accent>test</Accent>.
  </Statement>,

  /* 12 — the four rules everyone converges on (headline) */
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

  /* 13 — make it stick: the loop shape */
  <NumberedList
    eyebrow="Build a learning system"
    title="The loop that makes it stick."
    items={[
      { text: 'Signal', hint: 'a metric moved, a review caught something, a human had to step in' },
      { text: 'Diagnosis', hint: 'why it happened, and where in the factory' },
      { text: 'Change the system', hint: 'not the one artifact: the rule, the skill, the check' },
      { text: 'Verify it holds', hint: 're-measure against the baseline' },
      { text: 'The next agent inherits it', hint: 'the fix lives where the next run will read it' },
    ]}
  />,

  /* + 5 whys: the diagnosis technique, a callback to the postmortem (slide 6) */
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

  /* 14 — make it stick: this week to ideal */
  {
    node: (
      <Boxes
        eyebrow="Make it stick"
        title="Learning loops."
        cols={2}
        stepped
        boxes={[
          {
            label: 'This week',
            title: 'Codify one rule, write one card',
            text: 'Turn one merged-PR learning into a rule the next agent reads. State the metric, the baseline, the check-back date.',
            tone: 'teal',
          },
          {
            label: 'Ideal',
            title: 'The factory improves itself',
            text: 'Sessions get mined for repeated friction. Process changes get proposed, not just remembered.',
            tone: 'purple',
          },
        ]}
        footer="Land the change where the next run cannot miss it."
      />
    ),
    steps: 2,
  },

  /* 15 — the mirror invariant (headline) */
  <Statement
    eyebrow="The mirror invariant"
    sub="Path-scoped rules and review triggers point at the same files. The guardrail and its check move together, or the guardrail rots. A working agreement no one checks is just a wish."
  >
    The rule that guides the edit is the rule the <Accent>review checks</Accent>.
  </Statement>,

  /* + in practice: build it once by hand, then use a maintained tool (Logfire etc.) */
  <Boxes
    eyebrow="In practice"
    title="Build it once by hand. Then don't."
    cols={2}
    boxes={[
      {
        label: 'See it',
        title: 'Do not hand-roll tracing',
        text: 'OpenTelemetry-based platforms capture runs, tokens, and cost for you. Pydantic Logfire, and peers.',
        tone: 'teal',
      },
      {
        label: 'Test it',
        title: 'Do not hand-roll the harness',
        text: 'Eval frameworks run your cases and track them over time. pydantic-evals, Braintrust, Langfuse.',
        tone: 'purple',
      },
    ]}
    footer="Build the hook and the check by hand once, so you choose a tool instead of cargo-culting one. The principle outlives the vendor."
  />,

  /* 16 — crawl, walk, run */
  {
    node: (
      <Ladder
        eyebrow="Getting started, to ideal"
        title="You do not need run. You need crawl."
        rungs={[
          { n: 'Crawl', title: 'This week', desc: 'one trace, one metric, one check-back date' },
          { n: 'Walk', title: 'This quarter', desc: 'a gate on every run, rules codified, escapes become fixtures' },
          { n: 'Run', title: 'The ideal', desc: 'continuous monitoring and controlled experiments; the factory tunes itself' },
        ]}
        stats="Most teams never reach run and ship fine. Crawl, every month, beats a perfect run you never start."
        punchline="Find the rung just above where you are. Then climb one."
      />
    ),
    steps: 2,
  },

  /* 17 — the keystone: the change protocol, as a card */
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

  /* 18 — hand into the pod block */
  <CardGrid
    eyebrow="Pod block 3, next"
    title="What is quality for your factory?"
    cards={[
      { title: 'Pick a metric', desc: 'From a menu, or your own. Name the constraint it serves.' },
      { title: 'Measure it', desc: 'Instrument it on the pipeline you built. Capture the baseline.' },
      { title: 'Improve one thing', desc: 'Close one loop. One improvement end to end beats ten half-built.' },
    ]}
    footer="Two hours. You leave with a number you did not have this morning."
  />,
]
