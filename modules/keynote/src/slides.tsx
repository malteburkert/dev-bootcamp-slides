import {
  Accent,
  Agenda,
  BarChart,
  BigLoop,
  Boxes,
  Builders,
  Cover,
  Hosts,
  HouseRules,
  NumberedList,
  Pace,
  Phase,
  Pipeline,
  Pivot,
  QuestionMap,
  Quote,
  SplitPanels,
  StageCards,
  Statement,
  type SlideDef,
} from './kit'
import agenticConfQR from './assets/agentic-conf-qr.png'

/*
 * Opening keynote, Day 1, 09:30. Tereza presents.
 * Speaker notes and open TODOs: ../speaker-notes.md
 * Entries with { node, steps } reveal step by step on arrow keys.
 *
 * Arc: the shift (2-8) -> what speed reveals (9-12) -> the factory: a real
 * reference build, its four phases one by one, the whole-factory overview, and
 * the bridge to the workshop's four parts (13-23) -> proof + take home (24-25)
 * -> program + kickoff (26-30).
 */
export const slides: SlideDef[] = [
  /* 1 — cover */
  <Cover
    event="Opening keynote / Day 1"
    title={
      <>
        From AI experiments to the <Accent>AI factory</Accent>
      </>
    }
    subtitle="How teams deliver software with AI, and the foundations that carry it"
    presenters="Tereza Iofciu & Stefan Munz / Hamburg, June 16-17, 2026"
  />,

  /* 2 — the pace. Title is the question the talk answers; the chart shows the
   * cadence of releases (how often the ground moves), so dot height is only
   * label spacing. The "different, not better -> build a system" beat that used
   * to live in note/footer is now its own slide (3).
   * Re-check dots the week of the event; TODO in speaker-notes.md. */
  {
    node: (
      <Pace
        eyebrow="The pace"
        title="How do we work with AI when it keeps changing?"
        years={[
          { label: '2023', m: 0 },
          { label: '2024', m: 12 },
          { label: '2025', m: 24 },
          { label: '2026', m: 36 },
        ]}
        dots={[
          { name: 'GPT-4', m: 2, level: 0 },
          { name: 'Claude 2', m: 6, level: 1 },
          { name: 'Gemini 1.0', m: 11, level: 0 },
          { name: 'Claude 3', m: 14, level: 1 },
          { m: 15 } /* Llama 3 */,
          { name: 'GPT-4o', m: 16, level: 2 },
          { name: 'Claude 3.5', m: 17, level: 0 },
          { m: 18 } /* Mistral Large 2 */,
          { name: 'o1', m: 20, level: 1 },
          { m: 23, dx: -7 } /* DeepSeek V3 */,
          { name: 'Gemini 2.0', m: 23, level: 3 },
          { name: 'DeepSeek R1', m: 24, level: 0 },
          { m: 25 } /* Grok 3 */,
          { m: 25, dx: 7 } /* Claude 3.7 */,
          { name: 'GPT-4.5', m: 26, level: 2 },
          { m: 26, dx: 7 } /* Gemini 2.5 */,
          { m: 27 } /* Llama 4 */,
          { m: 27, dx: 7 } /* o3 */,
          { m: 28, dx: -7 } /* Qwen 3 */,
          { name: 'Claude 4', m: 28, level: 1 },
          { m: 30 } /* Grok 4 */,
          { m: 30, dx: 7 } /* Kimi K2 */,
          { name: 'GPT-5', m: 31, level: 3 },
          { name: 'Claude 4.5', m: 32, level: 0 },
          { m: 34, dx: -10 } /* Gemini 3 */,
          { m: 34 } /* GPT-5.1 */,
          { name: 'Opus 4.5', m: 34, level: 2, dx: 10 },
          { m: 35 } /* GPT-5.2 */,
          { m: 37 } /* Opus 4.6, early 2026 */,
          { m: 38 } /* Opus 4.7, spring 2026 */,
          { name: 'GPT-5.5', m: 39, level: 0 },
          { name: 'Opus 4.8', m: 40, level: 2 },
          { name: 'Fable 5', m: 41, level: 3 },
        ]}
        caption="Flagship model releases. Unlabeled dots are real releases, there was no room."
        chipsLabel="and the surface keeps moving:"
        chips={['tool use', 'long context', 'reasoning modes', 'prompt caching', 'subscription tiers']}
      />
    ),
    steps: 1,
  },

  /* 3 — newer is not better, it is different; the system is the answer.
   * Split out of slide 2's old note + footer per the reframed opener. */
  {
    node: (
      <Pivot
        eyebrow="When the model keeps changing"
        lead={
          <>
            Newer is not only better. It is <Accent>different</Accent>.
          </>
        }
        problemLabel="The catch"
        body="The same job, done another way. Swap a model into your pipeline and the side effects are yours to find. Keeping up is a job of its own, and hard-wiring your work to one model leaves it stale within a quarter."
        solutionLabel="The answer"
        solution={
          <>
            Build a <Accent>system around the models</Accent>: robust to the churn, able to prove a swap still delivers,
            built to gain from every release.
          </>
        }
      />
    ),
    steps: 1,
  },

  /* 4 — the online promise vs the practice (reframed adoption gap):
   * the cards are the hyped ladder, the footer is the easier-said-than-done reality. */
  {
    node: (
      <StageCards
        eyebrow="The promise"
        title="On social media, it looks easy."
        stepped
        stages={[
          { num: 'Stage 01', title: 'You write the code.' },
          { num: 'Stage 02', title: 'You write code with AI.', badge: '+30% productivity', tone: 'teal' },
          {
            num: 'Stage 03',
            title: 'AI writes code with you.',
            badge: '10x productivity',
            tone: 'amber',
            callout: 'The last step is a different way of working, not a faster autocomplete.',
          },
        ]}
        footer="In practice it is easier said than done. Most teams buy the license, capture the +30%, and stall there."
      />
    ),
    steps: 3,
  },

  /* 5 — the question the reasons answer; pairs with the boxes on the next slide. */
  <Statement eyebrow="Why we don't cross the gap">
    Why are we stuck in the <Accent>human-in-the-loop</Accent> space?
  </Statement>,

  /* 6 — the honest reasons, as boxes (3 on top, then 2; the last is accented).
   * Was a numbered list; the numbers are dropped per feedback. */
  {
    node: (
      <Boxes
        eyebrow="The honest reasons"
        title="Mindset, not tooling."
        cols={3}
        stepped
        boxes={[
          { title: 'We do not want to substitute ourselves.' },
          { title: 'We do not trust the output.' },
          {
            title: 'We like writing code.',
            text: 'We never liked reviewing it. The new job is mostly review and validation, and the human in the loop gets tired.',
          },
          {
            span: true,
            title: 'Some days it feels like being a click monkey.',
            text: 'Prompt, accept, prompt, accept. Nobody signed up for that.',
          },
          {
            span: true,
            tone: 'amber',
            title: 'The job description moved without asking us.',
            text: 'Software engineer now reads like manager of agents. A real shift, not a tooling update.',
          },
        ]}
      />
    ),
    steps: 4,
  },

  /* 7 — vibe coding */
  {
    node: (
      <BigLoop
        eyebrow="The loop in every demo"
        title="Vibe coding"
        speed="fast"
        stepped
        stops={[{ label: 'Prompt' }, { label: 'Generate' }, { label: 'Review' }]}
        prompt="$ Change the save button color to green"
        footer="Most of the easy-win noise runs on this loop. Great for demos and prototypes. It does not compound."
      />
    ),
    steps: 1,
  },

  /* 8 — agentic engineering as a linear pipeline; "our approach" adds the loops
   * (the generate+verify stage iterates) on the click. Deliberate contrast to
   * slide 6's vibe circle: a line that advances, not a circle that spins. */
  {
    node: (
      <Pipeline
        eyebrow="The pipeline that compounds"
        title="Agentic engineering"
        stepped
        stages={[
          { num: '01', label: 'Plan', dur: '20 min' },
          { num: '02', label: 'Generate + automated verification', dur: '20 min', highlight: true, loop: true },
          { num: '03', label: 'Final check', dur: '10 min' },
        ]}
        prompt="$ Let's plan the user registration flow"
        footer="Our approach: take the linear pipeline and add the loops. Generation and automated verification iterate until it is right, so each feature compounds instead of spinning. Slower per loop, faster per delivered feature."
      />
    ),
    steps: 1,
  },

  /* 9 — the bottleneck moved */
  <Statement
    eyebrow="The bottleneck moved"
    sub="But coding has never been just about generating code. The hard part just moved."
  >
    Code creation is <Accent>free</Accent>.
  </Statement>,

  /* 10 — speed stops hiding problems (boxes, was CardGrid) */
  {
    node: (
      <Boxes
        eyebrow="What speed makes visible"
        title="It doesn't create these problems. It just stops hiding them."
        cols={2}
        stepped
        boxes={[
          { title: 'Product decisions', text: 'What should we build, exactly? Vague answers used to hide behind slow delivery.' },
          { title: 'Validation', text: 'Is it right, is it good, who checks? Generated code ships at the speed of your checks.' },
          { title: 'Ownership', text: 'Who is accountable for what ships when nobody typed it?' },
          { title: 'Shared context', text: 'What does the team actually know together, and where does an agent read it?' },
        ]}
      />
    ),
    steps: 3,
  },

  /* 11 — the real shift (boxes, was a numbered list) */
  {
    node: (
      <Boxes
        eyebrow="Not who does whose job"
        title="Collaboration and responsibility, at speed."
        cols={3}
        stepped
        boxes={[
          { title: 'The factory emerges from how your team works, and wants to work.' },
          { title: 'Quality and pace become team properties, not personal setups.' },
          {
            tone: 'amber',
            title: 'And it will not stay in engineering.',
            text: 'Shadow IT is back: non-engineers vibe code prototypes and expect them in production. Your factory decides whether that is intake or conflict.',
          },
        ]}
      />
    ),
    steps: 2,
  },

  /* 12 — starting is simple, the team factory isn't */
  {
    node: (
      <SplitPanels
        title="Starting is simple. A team factory isn't."
        stepped
        panels={[
          {
            tone: 'green',
            kicker: 'The easy part',
            heading: 'Your own productivity.',
            items: [
              { t: 'You learn', d: 'A workshop, a trainer who has done it, the aha moment.' },
              { t: 'You try things out', d: 'Experiment freely, instant feedback, real dopamine.' },
              { t: 'You do more with AI', d: 'Your individual output climbs. It is addictive.' },
            ],
          },
          {
            tone: 'red',
            kicker: 'And then?',
            heading: 'Uncharted territory.',
            items: [
              { t: 'No industry standard', d: 'What works changes every month.' },
              { t: 'No handbook', d: 'Nobody wrote down how to do this.' },
              { t: 'No reference org', d: 'No "Spotify model" to copy.' },
              { t: 'No safe path', d: 'You are drawing the map yourself.' },
            ],
          },
        ]}
      />
    ),
    steps: 1,
  },

  /* 13 — maturity distribution as a bar chart (CTO bootcamp pre-survey, N=28,
   * counts 3/15/7/3/0 shown as %). Levels and the stats/punchline text dropped. */
  <BarChart
    eyebrow="CTO bootcamp, April 2026 · N=28"
    title="Where is your team on the maturity ladder?"
    bars={[
      { label: 'Not started', desc: 'Tab-completion or in-context editing only. The way of working has not changed.', value: 11 },
      { label: 'First teams all-in', desc: 'A few teams went all-in on agentic engineering, e.g. spec-driven development.', value: 54 },
      { label: 'Multiple teams rebuilt', desc: 'Day-to-day work is being rebuilt around agents. No longer an early-adopter thing.', value: 25 },
      { label: 'Most of IT uses it', desc: 'Engineers, PMs, testers, designers, devops. Almost nobody types code anymore.', value: 11 },
      { label: 'Beyond IT', desc: 'Marketing, sales, HR, finance build with agents too.', value: 0 },
    ]}
  />,

  /* 14 — NVIDIA's "buy more, save more"; the dealer punchline, then the
   * "#tokens is not the KPI" placard rises to cover the quote. */
  {
    node: (
      <Quote
        eyebrow="The token economy"
        quote={'"The more you buy, the more you save."'}
        attribution="Jensen Huang, CEO of NVIDIA"
        punchline="Don't take advice from your dealer."
        cover={
          <>
            <Accent>#tokens</Accent> is not the KPI
          </>
        }
        stepped
      />
    ),
    steps: 2,
  },

  /* 15 — we want AI that helps (boxes, was a numbered list) */
  {
    node: (
      <Boxes
        eyebrow="Better, not just faster"
        title="We want AI that helps."
        cols={2}
        stepped
        boxes={[
          { title: 'Fewer tokens that do more.', text: 'Context discipline is cost discipline. Focused context beats bigger bills.' },
          { title: 'Quality designed in, not inspected in.', text: 'Verification belongs to the system, not to a tired reviewer at 6 pm.' },
          {
            title: 'Correct the process, not the output.',
            text: 'Hand-fixing a bad diff teaches the system nothing. Fixing the rule, the skill or the check removes the whole class of mistake.',
          },
          { title: 'The factory is a product your team owns.', text: 'It improves with every delivery, and it is yours on Monday.' },
        ]}
      />
    ),
    steps: 3,
  },

  /* 16 — someone already built one; Agentic Conf badge + QR to the talk video */
  <Builders
    eyebrow="A real one already exists"
    title="Someone already built one."
    corner={{
      badge: 'Shown this year at Agentic Conf',
      qrSrc: agenticConfQR,
      url: 'youtu.be/b8ds_VX8kYY',
    }}
    people={[
      { slug: 'bjoern', name: 'Björn Rochel', role: 'Coach for agentic engineering. Ex-engineering lead, XING / New Work.' },
      { slug: 'benedikt', name: 'Benedikt Stemmildt', role: 'Founder, hackers & wizards. Ex-CIO BLUME2000, ex-Breuninger.' },
    ]}
    note={
      <>
        Björn and Bene spent three months building a real AI factory. It ships production software, and it
        still changes every week.
      </>
    }
    points={['3 months in', 'runs in production', 'changes weekly', 'a reference, not the answer']}
  />,

  /* 17 — factory phase 1: mindset */
  {
    node: (
      <Phase
        index={1}
        total={4}
        name="Mindset"
        tone="teal"
        title="Decide what you're optimizing for."
        build="the lens for all four parts"
        stepped
        aspects={[
          { q: 'Demo, or next year?', line: 'AI piles up tech debt faster. Build to maintain, not just to ship.' },
          { q: 'Where does AI cut corners?', line: 'Strong on the happy path. Weak on edge cases, observability, security.' },
        ]}
      />
    ),
    steps: 2,
  },

  /* 18 — factory phase 2: environment */
  {
    node: (
      <Phase
        index={2}
        total={4}
        name="Environment"
        tone="purple"
        title="Give the agent a place to work."
        build="Pod block 1, foundations (this morning)"
        stepped
        aspects={[
          { q: 'How much can it touch?', line: 'A sandboxed box: free inside the walls, blocked outside them.' },
          { q: 'What does it load, at what cost?', line: 'Context discipline is cost discipline. Focused beats bigger.' },
          { q: 'What are the reusable parts?', line: 'Skills compose. Sub-agents get fresh context and least privilege.' },
        ]}
      />
    ),
    steps: 3,
  },

  /* 19 — factory phase 3: process */
  {
    node: (
      <Phase
        index={3}
        total={4}
        name="Process"
        tone="amber"
        title="Turn the work into a pipeline."
        build="Pod block 2, pipeline (this afternoon)"
        stepped
        aspects={[
          { q: 'Where does a task get sharp?', line: 'A plan is cheap to fix. Bad code from a bad plan is not.' },
          { q: 'How small is a unit of work?', line: 'Smaller batches: faster detection, confident fixes.' },
          { q: 'Who checks the plan first?', line: 'Verify before executing. Converge until nothing critical is left.' },
          { q: 'What gives fast signal?', line: 'Tests, types, a real browser, inside the loop.' },
          { q: 'What stops being a guess?', line: "Encode, don't instruct. Hooks block what rules miss." },
          { q: 'What is still verified by a human?', line: "The judgment calls, with evidence and an independent review, not 'looks good'." },
        ]}
      />
    ),
    steps: 6,
  },

  /* 20 — factory phase 4: continuous improvement */
  {
    node: (
      <Phase
        index={4}
        total={4}
        name="Continuous improvement"
        tone="green"
        title="Make it better with every run."
        build="Pod block 3, evals & optimization (tomorrow morning)"
        stepped
        aspects={[
          { q: 'Does every bug improve it?', line: 'Turn each fix into a rule, a check, or a skill.' },
          { q: 'What is the right model for the task?', line: 'Match the model to the step, and re-check after every release. Measure a swap, then compare.' },
        ]}
      />
    ),
    steps: 2,
  },

  /* 21 — the whole factory overview (the payoff after the four phases) */
  <QuestionMap
    eyebrow="The whole factory"
    title="Putting it all together"
    phases={[
      { label: 'Mindset', tone: 'teal', items: ['Long-term thinking', "Know AI's limits"] },
      {
        label: 'Environment',
        tone: 'purple',
        items: ['Constrain environment', 'Context & cost', 'Skills & agents'],
      },
      {
        label: 'Process',
        tone: 'amber',
        items: [
          'Plan well',
          'Small increments',
          'Execution plans',
          'Fast feedback',
          'Determinism',
          'Trust but verify',
        ],
      },
      { label: 'Continuous improvement', tone: 'green', items: ['Learning system', 'Pipeline as product'] },
    ]}
    footer="Not a prompt. A product, with this many moving parts to keep answering."
  />,

  /* 22 — same questions, different answers (reworked from "no blueprint") */
  <Statement
    eyebrow="Why there is no blueprint"
    sub="Their answers fit their use cases and this month's models. Yours will differ, and they will keep moving as you mature and as the models change. So we hand you the questions, not a copy. You build the answers, and you keep re-answering."
  >
    Same questions. <Accent>Different answers.</Accent>
  </Statement>,

  /* 23 — the four parts of the two days (boxes, was Layers; Björn framing dropped) */
  {
    node: (
      <Boxes
        title="2 days to get started with the AI factory?"
        cols={2}
        stepped
        boxes={[
          { tone: 'teal', label: 'Today, morning', title: 'Part 1: Lay the foundations', text: 'Mindset + environment: skills, rules, hooks, context.' },
          { tone: 'purple', label: 'Today, afternoon', title: 'Part 2: Wire the pipeline', text: 'Process: planning, sub-agents, fast feedback, determinism.' },
          { tone: 'amber', label: 'Tomorrow, morning', title: 'Part 3: Run it as a product', text: 'Continuous improvement: evals, observability, learning loops.' },
          { tone: 'green', label: 'Tomorrow, afternoon', title: 'Part 4: Take it to the organization', text: 'Roles, teams, and your rollout.' },
        ]}
      />
    ),
    steps: 3,
  },

  /* 24 — what you take home (boxes; 3rd is the hycle/org beat, was the 90-day rollout) */
  {
    node: (
      <Boxes
        eyebrow="What you take home"
        title="You leave with a running factory."
        cols={3}
        stepped
        boxes={[
          { title: 'Foundations and a pipeline.', text: 'Built yourself, with your pod.' },
          { title: 'A way to measure it.', text: 'Tomorrow morning we ask: does your factory deliver? Data, not vibes.' },
          {
            tone: 'teal',
            title: 'What changes for the org.',
            text: 'When execution becomes instant, what happens to roles, teams, and process? That is the hycle session.',
          },
        ]}
        footer="Remember, this all started in November 2025. The goal is not a finished playbook, it is learning to adapt while the ground keeps moving."
      />
    ),
    steps: 3,
  },

  /* 25 — the two days, timed */
  <Agenda
    title="The two days"
    days={[
      {
        kicker: 'Day 1',
        heading: 'Lay the factory floor',
        rows: [
          { t: '09:30', s: 'Opening keynote', now: true },
          { t: '10:00', s: 'Pod kickoff' },
          { t: '11:00', s: 'Intro to the foundation' },
          { t: '11:30', s: 'Pod block 1, foundations' },
          { t: '13:00', s: 'Lunch' },
          { t: '14:00', s: 'Intro to the pipeline' },
          { t: '14:30', s: 'Pod block 2, pipeline' },
          { t: '16:30', s: 'Customer reports' },
          { t: '18:30', s: 'Dinner & networking' },
        ],
      },
      {
        kicker: 'Day 2',
        heading: 'Run the factory end to end',
        rows: [
          { t: '09:00', s: 'Retrospective for your AI factory' },
          { t: '09:30', s: 'Warm up' },
          { t: '10:00', s: 'Pod block 3, evals & optimization' },
          { t: '12:00', s: 'Cross-pod show & tell' },
          { t: '13:00', s: 'Lunch' },
          { t: '14:00', s: 'Hycle in action' },
          { t: '14:30', s: 'Pod block 4, cycle' },
          { t: '16:15', s: 'Reflect & commit' },
          { t: '17:00', s: 'Closing & group photo' },
        ],
      },
    ]}
  />,

  /* 26 — trainers (final list + remaining bios/photos from Tereza, see speaker-notes.md) */
  <Hosts
    eyebrow="Your trainers"
    people={[
      {
        slug: 'andreas',
        name: 'Andreas Stephan',
        role: 'hycle walkthrough',
        bio: 'Builds digital products in e-commerce and online media for 20+ years, with developer roots. Teaches AI-native product management with Claude Code at hackers & wizards; thinks about AI-native organizations at hycle.org.',
        linkedin: 'andreasstephan',
      },
      {
        slug: 'malte',
        name: 'Malte Burkert',
        role: 'Trainer',
        bio: 'Founder of WAPP GmbH, building production software with his team since 2012. Brings real engineering patterns and failure modes into the factory work.',
        linkedin: 'malte-burkert',
      },
      {
        slug: 'nermin',
        name: 'Nermin Čaluk',
        role: 'Trainer',
        bio: "9+ years as Director of Engineering: change management, org design, engineering-business alignment. Built XING's first cross-functional AI product team and its AI Community of Practice.",
        linkedin: 'caluk',
      },
      {
        slug: 'stefan',
        name: 'Stefan Munz',
        role: 'Trainer',
        bio: "Hosted Hamburg's first agentic coding meetup in 2025 and co-founded hackers & wizards with Benedikt in 2026. Full-time on making AI coding agents work in production.",
        linkedin: 'stefanmunz',
      },
      {
        slug: 'tereza',
        name: 'Tereza Iofciu',
        role: 'AI & agentic engineering coach',
        bio: '15+ years leading data and AI teams at neuefische, FREE NOW and New Work. Coaches data leaders through the shift to AI-driven engineering.',
        linkedin: 'tereza-iofciu',
      },
    ]}
  />,

  /* 27 — house rules, Chatham-House style (icon boxes + write-about-it banner) */
  <HouseRules
    eyebrow="House rules"
    title={
      <>
        <span className="accent-green">Chatham House</span> rule.
      </>
    }
    rules={[
      { icon: 'video-off', text: 'No video.' },
      { icon: 'mic-off', text: 'No audio recording.' },
      { icon: 'lock', text: 'What is said here, stays here.' },
    ]}
    banner={{
      label: 'Write about it:',
      text: "you are welcome to share publicly what the event was like, what you liked, and what you learned. Just keep other companies' details out of it, no names, no numbers, no sensitive specifics.",
    }}
  />,

  /* 28 — pod kickoff */
  <NumberedList
    chips={[
      { label: 'Pod kickoff', tone: 'teal' },
      { label: '10:00, 45 min', tone: 'amber' },
    ]}
    title="The reality check."
    items={[
      { text: 'Who are you?', hint: 'Name, company, role, team.' },
      { text: 'Where are you with agentic engineering, honestly?', hint: 'You personally, and your organization.' },
      { text: 'What have you tried? What worked, what failed?' },
      {
        text: 'What is being pushed in your org right now?',
        hint: 'Mandates from above, pilots from below, tools someone already bought. And where is delivery expected to be in six months?',
      },
      { text: 'Where are you blocked internally?', hint: 'Tooling, compliance, culture, budget, trust.' },
    ]}
    footer="Leave knowing the real problems at your table. They become your pod's working groups for the next two days."
  />,

]
