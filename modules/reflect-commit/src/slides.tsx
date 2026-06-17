import { Cover, FactorySlide, NumberedList, Slide, Step, type SlideDef } from './kit'

export const slides: SlideDef[] = [
  // 01 — Cover
  <Cover
    title="Reflect & Commit"
    event="Day 2 / 16:15 / alphalist Developer Bootcamp"
  />,

  // 02 — Two days in three moves
  <NumberedList
    eyebrow="what you built"
    title="Two days in three moves"
    items={[
      {
        text: 'Foundation',
        hint: 'Tools that hold context across sessions: CLAUDE.md, skills, hooks, rules.',
      },
      {
        text: 'Pipeline',
        hint: 'Stations that hand off work without you: planner, refine, implement, deterministic gates.',
      },
      {
        text: 'Factory',
        hint: 'A loop that gets better on its own: observability, evals, learning loops.',
      },
    ]}
  />,

  // 03 — Minimal slice (week 1)
  <FactorySlide eyebrow="week 1" title="Start here: one slice, you in the loop" phase={1}>
    <p>One use case. Three acceptance criteria. You review it manually.</p>
    <p style={{ color: 'var(--muted)', fontSize: '19px', marginTop: '16px' }}>
      No gates yet. No automated stations. Just a slice you can run end to end and judge yourself.
    </p>
  </FactorySlide>,

  // 04 — Phase 1: tune the building blocks
  <FactorySlide eyebrow="phase 1 / weeks 1-2" title="Tune the building blocks in isolation" phase={1}>
    <ul>
      <li>One skill that runs without you steering it</li>
      <li>One hook that actually fires on the right event</li>
      <li>A CLAUDE.md that cuts noise, not just adds rules</li>
    </ul>
    <p style={{ color: 'var(--muted)', fontSize: '18px', marginTop: '16px' }}>
      Metric: can it complete a session without you redirecting it?
    </p>
  </FactorySlide>,

  // 05 — Phase 2: wire the pipeline
  <FactorySlide eyebrow="phase 2 / weeks 3-5" title="Pick one real slice. Wire the pipeline." phase={2}>
    <p>Apply the Day 1 pipeline contract to something you actually ship.</p>
    <ul style={{ marginTop: '12px', fontSize: '19px' }}>
      <li>A real feature endpoint</li>
      <li>An acceptance test a gate can run</li>
      <li>The contract as the glue: rename a heading and the next station breaks</li>
    </ul>
  </FactorySlide>,

  // 06 — Phase 3: add the gates
  <FactorySlide eyebrow="phase 3 / weeks 6-8" title="Now the machine can stop itself" phase={3}>
    <p>
      Gates are deterministic: a test run, <code>tsc</code>, a coverage number. Never an agent's
      self-assessment.
    </p>
    <p style={{ color: 'var(--muted)', fontSize: '19px', marginTop: '14px' }}>
      Observe the pipeline running first. Add a gate only when you know what it should catch.
    </p>
  </FactorySlide>,

  // 07 — The full factory
  <FactorySlide eyebrow="6-8 weeks" title="This is where you could be" phase={4}>
    <p>
      A Next.js full-stack pipeline. Spec-driven TDD. Autonomous agents do the work. Deterministic
      gates decide what advances.
    </p>
    <p style={{ color: 'var(--muted)', fontSize: '18px', marginTop: '14px' }}>
      Every forward transition is guarded by a machine verdict. Warm states are the only points a
      human is pulled in.
    </p>
  </FactorySlide>,

  // 08 — The order matters (stepped reveal, 2 arrow presses)
  {
    node: (
      <Slide>
        <p className="statement-line">
          <Step at={0}>You cannot gate what you cannot observe.</Step>
        </p>
        <p className="statement-line">
          <Step at={1}>You cannot observe what you have not wired.</Step>
        </p>
        <p className="statement-line">
          <Step at={2}>You cannot wire what you have not tuned.</Step>
        </p>
      </Slide>
    ),
    steps: 2,
  },

  // 09 — Week 1: the one thing
  <NumberedList
    eyebrow="before monday"
    title="The one thing"
    items={[
      {
        text: 'Pick your use case. Write three acceptance criteria for it — today, not Monday.',
      },
    ]}
    chips={[
      { label: 'not a whole feature', tone: 'teal' },
      { label: 'something a gate can check', tone: 'amber' },
    ]}
    footer="That's what you bring to week 1. Everything else follows."
  />,

  // 10 — Commit (silent, individual)
  <Slide>
    <h1>Before you leave this room</h1>
    <div className="commit-questions">
      <p className="commit-q">What is the one use case I am starting with?</p>
      <p className="commit-q">What building block do I tune first?</p>
      <p className="commit-q">What date does the first run happen?</p>
    </div>
  </Slide>,
]
