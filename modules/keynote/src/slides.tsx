import {
  Accent,
  Agenda,
  BigLoop,
  BigStats,
  Builders,
  CardGrid,
  Cover,
  Hosts,
  Ladder,
  Layers,
  NumberedList,
  Outputs,
  Pace,
  Phase,
  Pivot,
  QuestionMap,
  Quote,
  SplitPanels,
  StageCards,
  Statement,
  type SlideDef,
} from './kit'

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
    presenters="Tereza Iofciu / Hamburg, June 16-17, 2026"
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
            Newer is not better. It is <Accent>different</Accent>.
          </>
        }
        body="The same job, done another way. Swap a model into your pipeline and the side effects are yours to find. Keeping up is a job of its own, and hard-wiring your work to one model leaves it stale within a quarter."
        solution={
          <>
            So you build a <Accent>system around the models</Accent>: robust to the churn, able to prove a swap still
            delivers, built to gain from every release.
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
        eyebrow="The online promise"
        title="Online, it looks easy."
        stepped
        stages={[
          { num: 'Stage 01', title: 'You write the code.' },
          { num: 'Stage 02', title: 'You write code with AI.', badge: '+30% productivity', tone: 'teal' },
          { num: 'Stage 03', title: 'AI writes code with you.', badge: '10x productivity', tone: 'amber' },
        ]}
        footer="In practice it is easier said than done. Most teams buy the license, capture the +30%, and stall there. The last step is a different way of working, not a faster autocomplete."
      />
    ),
    steps: 3,
  },

  /* 5 — why we stall: stuck as the human in the loop (mindset, not tooling).
   * Footer conclusion dropped for now per feedback round 2. */
  {
    node: (
      <NumberedList
        eyebrow="Stuck as the human in the loop"
        title="Mindset, not tooling."
        stepped
        items={[
          { text: 'We do not want to substitute ourselves.' },
          { text: 'We do not trust the output.' },
          {
            text: 'We like writing code. We never liked reviewing it.',
            hint: 'This new job is mostly review and validation, and the human in the loop gets tired.',
          },
          {
            text: 'Some days it feels like being a click monkey.',
            hint: 'Prompt, accept, prompt, accept. Nobody signed up for that.',
          },
          {
            text: 'The job description moved without asking us.',
            hint: 'Software engineer now reads like manager of agents. That is a real shift, not a tooling update.',
          },
        ]}
      />
    ),
    steps: 4,
  },

  /* 6 — vibe coding */
  {
    node: (
      <BigLoop
        eyebrow="The loop in every demo"
        title="Vibe coding"
        speed="fast"
        stepped
        stops={[{ label: 'Prompt' }, { label: 'Generate' }, { label: 'Review' }]}
        badge="3-5 min per loop"
        prompt="$ Change the save button color to green"
        footer="Most of the easy-win noise runs on this loop. Great for demos and prototypes. It does not compound."
      />
    ),
    steps: 1,
  },

  /* 7 — agentic engineering */
  {
    node: (
      <BigLoop
        eyebrow="The loop that compounds"
        title="Agentic engineering"
        speed="steady"
        badgeTone="teal"
        stepped
        stops={[
          { label: 'Plan', dur: '20 min' },
          { label: 'Generate + automated verification', dur: '20 min' },
          { label: 'Final check', dur: '10 min' },
        ]}
        badge="50 min per feature"
        prompt="$ Let's plan the user registration flow"
        footer="Slower per loop, faster per delivered feature. This is the first piece of a system."
      />
    ),
    steps: 1,
  },

  /* 8 — the bottleneck moved */
  <Statement eyebrow="The bottleneck moved" sub="Implementation stopped being the hardest part. The hard part moved.">
    Code creation is <Accent>free</Accent>.
  </Statement>,

  /* 9 — speed stops hiding problems */
  {
    node: (
      <CardGrid
        eyebrow="What speed makes visible"
        title="It doesn't create these problems. It just stops hiding them."
        stepped
        cards={[
          { title: 'Product decisions', desc: 'What should we build, exactly? Vague answers used to hide behind slow delivery.' },
          { title: 'Validation', desc: 'Is it right, is it good, who checks? Generated code ships at the speed of your checks.' },
          { title: 'Ownership', desc: 'Who is accountable for what ships when nobody typed it?' },
          { title: 'Shared context', desc: 'What does the team actually know together, and where does an agent read it?' },
        ]}
      />
    ),
    steps: 3,
  },

  /* 10 — the real shift */
  {
    node: (
      <NumberedList
        eyebrow="Not who does whose job"
        title="Collaboration and responsibility, at speed."
        stepped
        items={[
          { text: 'The factory emerges from how your team works, and wants to work.' },
          { text: 'Quality and pace become team properties, not personal setups.' },
          {
            text: 'And it will not stay in engineering.',
            hint: 'Shadow IT is back: non-engineers vibe code prototypes and expect them in production. Your factory decides whether that is intake or conflict.',
          },
        ]}
      />
    ),
    steps: 2,
  },

  /* 11 — starting is simple, the team factory isn't */
  {
    node: (
      <SplitPanels
        title="Starting is simple. A team factory isn't."
        stepped
        panels={[
          {
            tone: 'green',
            kicker: 'The easy part',
            heading: 'A workshop and a click.',
            items: [
              { t: 'Workshop', d: 'With a trainer who has done it.' },
              { t: 'The aha moment', d: '"Wait, it actually wrote that?"' },
              { t: 'Hooked', d: 'AI coding is addictive.' },
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

  /* 12 — maturity ladder + industry numbers.
   * Sources: DORA State of AI-assisted Software Development 2025 (n≈5,000);
   * Stack Overflow Developer Survey 2025. Re-verify before the event. */
  {
    node: (
      <Ladder
        eyebrow="The maturity ladder"
        title="Where is your team, honestly?"
        rungs={[
          { n: 'L0', title: 'Not started', desc: 'Tab completion and a chat on the side. The way of working unchanged.' },
          { n: 'L1', title: 'First devs all-in', desc: 'A few people work agent-first, spec-driven. Personal setups, not team practice.' },
          { n: 'L2', title: 'The team rebuilt', desc: 'Day-to-day work redesigned around agents. No longer an early-adopter thing.' },
          { n: 'L3', title: 'Most of engineering', desc: 'Engineers, PMs, testers, designers. Almost nobody types code anymore.' },
          { n: 'L4', title: 'Beyond engineering', desc: 'Marketing, sales, HR and finance build with agents too.' },
        ]}
        stats="Industry, mid-2026: 90% of developers use AI, about two hours a day (DORA 2025). Half of professionals use it daily, while 46% distrust the output (Stack Overflow 2025). Above L1, the public numbers run out."
        punchline="Maturity asks where you are. Your org is asking where delivery will be in six months. Same ladder, different question: hold it for the kickoff."
      />
    ),
    steps: 2,
  },

  /* 13 — the token economy */
  {
    node: (
      <Quote
        eyebrow="The token economy"
        quote={'"The more you buy, the more you save."'}
        attribution="Jensen Huang, CEO of NVIDIA"
        punchline="Don't take advice from your drug dealer."
        stepped
      />
    ),
    steps: 1,
  },

  /* 14 — why build a system */
  {
    node: (
      <NumberedList
        eyebrow="Better, not just faster"
        title="AI that helps, instead of overhead."
        stepped
        items={[
          { text: 'Fewer tokens that do more.', hint: 'Context discipline is cost discipline. Focused context beats bigger bills.' },
          {
            text: 'Quality designed in, not inspected in.',
            hint: 'Verification belongs to the system, not to a tired reviewer at 6 pm.',
          },
          {
            text: 'Correct the process, not the output.',
            hint: 'Hand-fixing a bad diff teaches the system nothing. Fixing the rule, the skill or the check removes the whole class of mistake.',
          },
          { text: 'The factory is a product your team owns.', hint: 'It improves with every delivery, and it is yours on Monday.' },
        ]}
      />
    ),
    steps: 3,
  },

  /* 15 — someone already built one (Björn + Bene reference factory) */
  <Builders
    eyebrow="A real one already exists"
    title="Someone already built one."
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

  /* 16 — factory phase 1: mindset */
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

  /* 17 — factory phase 2: environment */
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

  /* 18 — factory phase 3: process */
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
          { q: 'How much verifies before a human?', line: "Independent reviews plus evidence, not 'looks good'." },
        ]}
      />
    ),
    steps: 6,
  },

  /* 19 — factory phase 4: continuous improvement */
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
          { q: 'Still good after a model swap?', line: 'Treat the pipeline like a dependency: measure, then compare.' },
        ]}
      />
    ),
    steps: 2,
  },

  /* 20 — the whole factory overview (the payoff after the four phases) */
  <QuestionMap
    eyebrow="The whole factory"
    title="Thirteen parts. One system."
    lead="You just saw them one phase at a time. Together, this is what Björn and Bene run."
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

  /* 21 — same questions, different answers (reworked from "no blueprint") */
  <Statement
    eyebrow="Why there is no blueprint"
    sub="Their answers fit their use cases and this month's models. Yours will differ, and they will keep moving as you mature and as the models change. So we hand you the questions, not a copy. You build the answers, and you keep re-answering."
  >
    Same questions. <Accent>Different answers.</Accent>
  </Statement>,

  /* 22 — the evaluation question (Björn's, with the "depends on the constraint" nuance) */
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

  /* 23 — the bridge: Björn's phases become the bootcamp's four parts */
  {
    node: (
      <Layers
        eyebrow="Björn's factory, your two days"
        title="Four phases become four parts."
        stepped
        layers={[
          {
            title: 'Part 1: Lay the foundations',
            desc: 'his mindset + environment: skills, rules, hooks, context',
            when: 'today, morning',
            tone: 'teal',
          },
          {
            title: 'Part 2: Wire the pipeline',
            desc: 'his process: planning, sub-agents, fast feedback, determinism',
            when: 'today, afternoon',
            tone: 'purple',
          },
          {
            title: 'Part 3: Run it as a product',
            desc: 'his continuous improvement: evals, observability, learning loops',
            when: 'tomorrow, morning',
            tone: 'amber',
          },
          {
            title: 'Part 4: Take it to the organization',
            desc: 'beyond his engineering pipeline: roles, teams, your 90-day rollout',
            when: 'tomorrow, afternoon',
            tone: 'green',
          },
        ]}
      />
    ),
    steps: 3,
  },

  /* 24 — impact range */
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

  /* 25 — what you take home */
  {
    node: (
      <NumberedList
        eyebrow="What you take home"
        title="You leave with a running factory."
        stepped
        items={[
          { text: 'Foundations and a pipeline you built yourself, with your pod.' },
          { text: 'A way to measure it.', hint: 'Tomorrow morning we ask: does your factory deliver? Data, not vibes.' },
          { text: 'A 90-day rollout for your team.', hint: 'Filled in tomorrow afternoon, yours to run on Monday.' },
        ]}
        footer="You are early. Most of the curve is still ahead."
      />
    ),
    steps: 3,
  },

  /* 26 — the two days, timed */
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
          { t: '14:00', s: 'Live walkthrough: hycle in action' },
          { t: '14:30', s: 'Pod block 4, cycle' },
          { t: '16:15', s: 'Reflect & commit' },
          { t: '17:00', s: 'Closing & group photo' },
        ],
      },
    ]}
  />,

  /* 27 — trainers (final list + remaining bios/photos from Tereza, see speaker-notes.md) */
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

  /* 28 — house rules */
  <NumberedList
    eyebrow="House rules"
    title="What is said here, stays here."
    items={[
      { text: 'No video.' },
      { text: 'No audio recording.' },
      { text: 'Chatham House rule.', hint: 'Share the learnings, not the names.' },
    ]}
    footer="Write about what you learned, publicly and gladly. Keep other companies' details out of it: no names, no numbers, no specifics."
  />,

  /* 29 — pod kickoff */
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

  /* 30 — kickoff output + handover */
  <Outputs
    title="One headline. One open question."
    cards={[
      {
        label: 'One headline',
        text: 'A sentence your whole pod agrees on. Concrete and specific, not a platitude.',
        tone: 'teal',
      },
      {
        label: 'One open question',
        text: 'The one nobody in your pod can answer. It goes on the wall and stays with us for two days.',
        tone: 'purple',
      },
    ]}
    logistics={['Pods + rooms: posted at registration', 'Materials: links + PDFs after each session']}
    closing="See you back here at 11:00."
  />,
]
