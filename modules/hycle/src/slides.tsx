import {
  Accent,
  BigStats,
  Boxes,
  Cover,
  NumberedList,
  Quote,
  Section,
  Slide,
  SplitPanels,
  Statement,
  Step,
  type SlideDef,
} from './kit'

/*
 * hycle in action, Day 2, 14:00. Andreas presents.
 * A 25-minute message talk, theory only, no demo. Full outline and speaker
 * script: ../talk-outline.md. Entries with { node, steps } reveal on arrow keys.
 *
 * Arc: cold open (1-2) -> the bottleneck moved, intent + agency (3-4) -> the
 * trap, two futures + Block (5-7) -> what changes, three shifts + FINN (8-11)
 * -> what's yours vs what isn't (12) -> what this is, hycle (13) -> the three
 * questions + handoff to Nermin (14-15).
 */

/* a small forward chevron, reused between the two flows */
const Chevron = () => (
  <svg className="shift-arrow" viewBox="0 0 16 24" aria-hidden="true">
    <path
      d="M 4 5 L 12 12 L 4 19"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* the core observation as a diagram: the slow stage is drawn fat. Then, build
 * was the constraint (struck on reveal of Now); Now, the decision is. */
function BottleneckShift() {
  return (
    <Slide>
      <h1>The bottleneck moved.</h1>
      <div className="shift">
        <div className="shift-row">
          <span className="shift-when">Then</span>
          <span className="shift-node shift-node-fast">Decide</span>
          <Chevron />
          <span className="shift-node shift-node-slow">Build</span>
          <span className="shift-cap">For thirty years, building was the constraint.</span>
        </div>
        <Step at={1} block>
          <div className="shift-row">
            <span className="shift-when">Now</span>
            <span className="shift-node shift-node-slow">Decide</span>
            <Chevron />
            <span className="shift-node shift-node-fast shift-struck">Build</span>
            <span className="shift-cap">
              The decision is the constraint.{' '}
              <span className="shift-cap-key">Intent and agency.</span>
            </span>
          </div>
        </Step>
      </div>
    </Slide>
  )
}

export const slides: SlideDef[] = [
  /* 1 — cover */
  <Cover
    event="hycle in action / Day 2, 14:00"
    title={
      <>
        The factory is the <Accent>easy part</Accent>.
      </>
    }
    subtitle="You built a factory. Now change the organization that decides what it builds."
    presenters="Andreas Stephan"
  />,

  /* 2 — cold open. The hook: contradict the last day and a half. */
  <Statement
    eyebrow="A day and a half ago, you built a software factory"
    sub="And on its own, it will not make your company better. It can make it worse. For the next twenty minutes, let me convince you why, and what to change."
  >
    It works.
  </Statement>,

  /* 3 — the bottleneck moved (core diagram), reveal Now on click */
  { node: <BottleneckShift />, steps: 1 },

  /* 4 — the two things that sit upstream: intent + agency. Handlungsfähigkeit
   * appears once here, as the named concept (matches hycle.org). */
  <Boxes
    eyebrow="What sits upstream now"
    title="The constraint is the decision."
    cols={2}
    boxes={[
      {
        tone: 'teal',
        label: 'What to build',
        title: 'Intent',
        text: 'What the customer actually needs. The one thing an agent can never hand you.',
      },
      {
        tone: 'amber',
        label: 'The ability to act',
        title: 'Agency',
        text: 'Germans call it Handlungsfähigkeit: competence, authority, and information in the same place.',
      },
    ]}
    footer="When execution was slow, you never noticed these were the real bottleneck. Now building is instant, and the slow decision is exposed."
  />,

  /* 5 — the trap, opened with Drucker. Punchline reveals the turn into the two futures. */
  {
    node: (
      <Quote
        eyebrow="The trap"
        quote={<>There is nothing so useless as doing efficiently that which should not be done at all.</>}
        attribution="Peter Drucker"
        punchline="Two futures follow from here. Both bad."
        stepped
      />
    ),
    steps: 1,
  },

  /* 6 — the two futures, second revealed on click */
  {
    node: (
      <SplitPanels
        title="Speed up execution, leave the decision where it is."
        stepped
        panels={[
          {
            tone: 'red',
            kicker: 'Future one',
            heading: 'Faster waste',
            items: [
              { t: 'Build the wrong thing in a day', d: 'instead of in two weeks' },
              { t: 'The build trap on a faster engine', d: 'more code, none of it closer to a customer' },
              { t: 'The empty backlog is a smoke alarm', d: 'you build faster than you can decide' },
            ],
          },
          {
            tone: 'red',
            kicker: 'Future two',
            heading: 'Rationalization',
            items: [
              { t: 'Same output, fewer people', d: 'cut cost, hold output' },
              { t: 'The market rewards it', d: 'in the short term' },
              { t: 'Not innovation', d: 'cheaper while you wait to be disrupted' },
            ],
          },
        ]}
      />
    ),
    steps: 1,
  },

  /* 7 — Block, the rationalization path made real (verified: CNN, Fortune 2026) */
  <BigStats
    eyebrow="Rationalization, made real"
    title="Block, February 2026."
    stats={[
      { value: '40%', label: 'of staff cut', tone: 'amber' },
      { value: '4,000+', label: 'people', tone: 'amber' },
    ]}
    footer="AI named as the reason. The stock went up. A real strategy that pays in the short term. Just do not call it innovation."
    note="Sources: CNN, Fortune, 2026"
  />,

  /* 8 — the turn: the third path you have to build */
  <Statement
    eyebrow="Two futures, one non-choice"
    sub="Both are what happens when you leave the decision where it is. The third path, the one where the factory makes you better, you have to build. With structure, not tools."
  >
    These are the same future.
  </Statement>,

  /* 9 — what changes divider */
  <Section kicker="What actually changes" title="Three shifts. None of them technical." />,

  /* 10 — the three shifts, revealed one at a time */
  {
    node: (
      <NumberedList
        title="What actually changes"
        stepped
        items={[
          {
            text: 'Aim at decisions, not execution',
            hint: 'Stop measuring how fast you build. Time your slowest decision. That number is your real cycle time.',
          },
          {
            text: 'Push agency down, inside a frame',
            hint: 'Competence, authority, information where the work happens. The frame is strategy: what you will and will not do.',
          },
          {
            text: 'The roles blur',
            hint: 'Form intent, decide what matters, ship by afternoon. Discovery is the job an agent cannot do, and it is becoming yours.',
          },
        ]}
        footer="You do not need permission to start. Stop outsourcing discovery to one PM. Agree what you do the moment a decision is blocked."
      />
    ),
    steps: 3,
  },

  /* 11 — FINN: the restructure, already happened. Quote + reveal of the model.
   * Source: Andreas Stryz (CTO, FINN), LinkedIn, 2026
   * https://www.linkedin.com/posts/andreasstryz_engineeringleadership-ai-orgdesign-share-7455542713841565696-YLA1/ */
  {
    node: (
      <Quote
        eyebrow="This already happened"
        quote={<>Scrum was a buffer for when code was expensive. I killed it.</>}
        attribution="Andreas Stryz, CTO at FINN, 2026"
        punchline="Micro teams. One PM, a few engineers. Each owns one KPI, not a backlog."
        stepped
      />
    ),
    steps: 1,
  },

  /* 12 — what's yours vs what isn't: agency first, then the wall */
  <Boxes
    eyebrow="Why this is hard"
    title="What is yours, and what is not."
    cols={2}
    boxes={[
      {
        tone: 'green',
        label: 'Yours, on Monday',
        title: 'Your team',
        text: 'Build discovery in. Agree how you act when a decision is blocked. Prove it on one team, with a number that moved. Nobody upstairs has to approve that.',
      },
      {
        tone: 'amber',
        label: 'Not yours alone',
        title: 'Authority',
        text: 'You cannot refactor who is allowed to decide from inside your team. That takes uncomfortable conversations with people who are not in this room.',
      },
    ]}
    footer="The frustration when a good idea dies in an approval queue is not noise. It is data. It points at the structure that has to change."
  />,

  /* 13 — what this is: hycle, an open inquiry. The closing call to action. */
  <Statement
    eyebrow="Where this comes from"
    sub={
      <>
        An open inquiry into what happens when execution stops being the hard part. Written as hypotheses, not
        answers. Come argue with us at <Accent>hycle.org</Accent>.
      </>
    }
  >
    hycle
  </Statement>,

  /* 14 — the three questions for the pod block */
  <NumberedList
    eyebrow="Before Nermin, sit with three questions"
    title="For your own organization"
    items={[
      {
        text: 'A decision you cannot make today',
        hint: 'that you would need to make to use this factory fully.',
      },
      {
        text: 'Who holds the authority and the information you are missing',
        hint: 'and when did you last actually talk to them?',
      },
      {
        text: 'One structure to change first',
        hint: 'a role, a cadence, an approval. Which one?',
      },
    ]}
  />,

  /* 15 — close + handoff */
  <Statement sub="Now go change the organization that decides what it builds. Nermin, over to you.">
    You built the factory.
  </Statement>,
]
