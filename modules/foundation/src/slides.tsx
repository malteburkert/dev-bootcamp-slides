import {
  Accent,
  Bullets,
  Cover,
  Layers,
  NumberedList,
  Section,
  Slide,
  Statement,
  type SlideDef,
} from './kit'
import wallaceFactory from '../assets/wallace-factory.gif'
import agentLoop from '../assets/agent-loop.png'
import markdownCalm from '../assets/markdown-right-time-calm.png'
import markdownPunch from '../assets/markdown-right-time-punch.png'
import agentContext from '../assets/agent-context.png'

function ArtSlide({ src, alt, fit = 'cover' }: { src: string; alt: string; fit?: 'cover' | 'contain' }) {
  return (
    <div className={`art-slide art-${fit}`}>
      <img src={src} alt={alt} />
    </div>
  )
}

function DemoSlide() {
  return (
    <Slide>
      <h1>Demo: LLM vs. Agent</h1>
      <div className="demo-card">
        <div className="eyebrow">Pure LLM</div>
        <div className="prompt-line">Once upon a time ...</div>
        <div className="demo-links">
          <a href="https://gpt-oss.com/" target="_blank" rel="noreferrer">
            Open gpt-oss.com
          </a>
        </div>
      </div>
      <div className="curious-link">
        For the curious:{' '}
        <a href="https://www.0xkato.xyz/how-llms-actually-work/" target="_blank" rel="noreferrer">
          How LLMs Actually Work
        </a>
      </div>
    </Slide>
  )
}

function PiExcursusSlide() {
  return (
    <Slide>
      <div className="eyebrow">Excursus</div>
      <h1>Pi: An Agent You Can Understand</h1>
      <p className="subtitle">
        A small agent harness is useful because the moving parts are visible: system prompt, tools, loop, context.
      </p>
      <div className="pi-links">
        <a className="pi-link-primary" href="https://pi.dev/" target="_blank" rel="noreferrer">
          Open pi.dev
        </a>
        <a
          href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/system-prompt.ts#L106-L110"
          target="_blank"
          rel="noreferrer"
        >
          System prompt example
        </a>
      </div>
      <p className="pi-note">
        The point is not to switch tools. The point is to see that an agent is inspectable software.
      </p>
    </Slide>
  )
}

function DelegationSlide() {
  return (
    <Slide>
      <h1>Delegation Changes</h1>
      <div className="comparison-table">
        <div className="comparison-head">Human delegation</div>
        <div className="comparison-head">Agent delegation</div>
        <div>What do I need?</div>
        <div>What exactly should be done?</div>
        <div>By when?</div>
        <div>Which context is allowed?</div>
        <div>Who owns it?</div>
        <div>Which tools may be used?</div>
        <div>How do we review it?</div>
        <div>Which artifact proves the work?</div>
        <div />
        <div>How should the agent verify it?</div>
      </div>
    </Slide>
  )
}

function ContextEngineeringSlide() {
  return (
    <Slide>
      <h1>Context Engineering</h1>
      <pre className="code-panel flow-code">
        <code>{`big ambiguous goal
  -> small focused task
  -> explicit context
  -> bounded tool use
  -> durable artifact
  -> next focused task`}</code>
      </pre>
      <p className="subtitle">The factory is what happens when context becomes a scarce engineering resource.</p>
    </Slide>
  )
}

function FactorySlide() {
  return (
    <Slide>
      <h1>From Assistant To Factory</h1>
      <div className="factory-line">
        <div>idea</div>
        <span>-&gt;</span>
        <div>planning artifact</div>
        <span>-&gt;</span>
        <div>refined plan</div>
        <span>-&gt;</span>
        <div>implementation</div>
        <span>-&gt;</span>
        <div>review / eval</div>
      </div>
      <p className="subtitle">A factory is focused agents connected by written contracts.</p>
    </Slide>
  )
}

function ExercisePlanSlide() {
  return (
    <Slide>
      <div className="exercise-plan-header">
        <div>
          <div className="eyebrow">Pod block 1 / 90 min</div>
          <h1>Build Your Factory Foundations</h1>
        </div>
        <span className="chip chip-amber">You will not finish everything</span>
      </div>

      <div className="track-grid">
        <div className="track-card">
          <div className="track-kicker">Starter / Intermediate</div>
          <h2>Learn the mechanisms</h2>
          <div className="track-steps">
            <div>
              <span className="track-time">15 min</span>
              <strong>00 Pirate CLAUDE.md</strong>
              <span>Always-on project context.</span>
            </div>
            <div>
              <span className="track-time">25 min</span>
              <strong>01 Pirate Skill</strong>
              <span>On-demand workflow and activation description.</span>
            </div>
            <div>
              <span className="track-time">30-35 min</span>
              <strong>04 Planning Skill</strong>
              <span>Skill that writes a durable planning artifact.</span>
            </div>
          </div>
        </div>

        <div className="track-card track-card-advanced">
          <div className="track-kicker">Advanced</div>
          <h2>Build stricter ingredients</h2>
          <div className="track-steps">
            <div>
              <span className="track-time">20 min</span>
              <strong>02 Rules</strong>
              <span>Behavior scoped by file glob.</span>
            </div>
            <div>
              <span className="track-time">30 min</span>
              <strong>03 Subagent</strong>
              <span>Read-heavy exploration in isolated context.</span>
            </div>
            <div>
              <span className="track-time">30 min</span>
              <strong>04 Planning Skill upgrade</strong>
              <span>Harder gates, stricter schema, clearer handoff.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="exercise-footer-grid">
        <div>
          <strong>Convergence point</strong>
          <span>Skill -&gt; durable artifact -&gt; next station</span>
        </div>
        <div>
          <strong>Fallback</strong>
          <span>Afternoon can use supplied planner or seeded Bean.</span>
        </div>
        <div>
          <strong>Working mode</strong>
          <span>Groups of 2-3. Nobody works alone.</span>
        </div>
        <div>
          <strong>Success condition</strong>
          <span>Understand when the mechanism loads and what artifact it creates.</span>
        </div>
      </div>
    </Slide>
  )
}

export const slides: SlideDef[] = [
  <Cover
    title="Agentic Foundations"
    subtitle="Context, delegation, and the control surfaces of an AI factory"
    presenters="Stefan Munz"
  />,

  {
    node: (
      <Statement
        eyebrow="Foundation"
        sub={
          <>
            Coding agents are tools. To use them fully, we need to understand how they work.
          </>
        }
      >
        Agentic engineering is not <Accent>better prompting</Accent>.
      </Statement>
    ),
    steps: 0,
  },

  <Slide center>
    <div className="gif-stage">
      <img src={wallaceFactory} alt="Wallace and Gromit breakfast machine" />
    </div>
    <p className="subtitle center-text">The interesting part is not one clever move. It is the sequence.</p>
  </Slide>,

  <DemoSlide />,

  <ArtSlide src={agentLoop} alt="Agent diagram with LLM, preprocessing, processing, postprocessing, tools, and loops" fit="contain" />,

  <PiExcursusSlide />,

  <Layers
    eyebrow="Control surfaces"
    title="Where We Shape Agent Behavior"
    layers={[
      {
        n: '01',
        title: 'CLAUDE.md',
        desc: 'Project norms and persistent context.',
        when: 'always-on',
        tone: 'teal',
      },
      {
        n: '02',
        title: 'Skill',
        desc: 'Reusable workflow activated by task match.',
        when: 'on demand',
        tone: 'purple',
      },
      {
        n: '03',
        title: 'Rule',
        desc: 'Scoped convention for a file or folder.',
        when: 'file glob',
        tone: 'amber',
      },
      {
        n: '04',
        title: 'Subagent',
        desc: 'Isolated exploration without polluting the main context.',
        when: 'delegated',
        tone: 'green',
      },
      {
        n: '05',
        title: 'Hook',
        desc: 'Deterministic guardrail on tool events.',
        when: 'tool event',
        tone: 'teal',
      },
      {
        n: '06',
        title: 'Artifact',
        desc: 'Written state that the next station can trust.',
        when: 'handoff',
        tone: 'purple',
      },
    ]}
  />,

  <ArtSlide src={markdownCalm} alt="Everything is just markdown at the right time" fit="contain" />,

  <ArtSlide src={markdownPunch} alt="Markdown gives the agent a punch in the right direction" fit="contain" />,

  <ArtSlide src={agentContext} alt="Human and agent attention span over time and context" fit="contain" />,

  <Bullets
    title="Context Is Not Storage"
    items={[
      'large context windows still bury important details',
      'old conversation turns create stale assumptions',
      'broad tasks spend attention on exploration',
      'one agent doing everything carries too much baggage',
    ]}
  />,

  <ContextEngineeringSlide />,

  <FactorySlide />,

  <DelegationSlide />,

  <ExercisePlanSlide />,

  <Section kicker="Backup" title="How LLMs Actually Work" subtitle="For deeper reading after the workshop" />,

  <Bullets
    title="Further Reading"
    items={[
      <>
        <strong>How LLMs Actually Work</strong>, 0xkato, June 1, 2026
      </>,
      <a href="https://www.0xkato.xyz/how-llms-actually-work/" target="_blank" rel="noreferrer">
        www.0xkato.xyz/how-llms-actually-work
      </a>,
      'tokenization, embeddings, attention, multi-head attention, next-token prediction',
      'why long context is not perfect attention',
    ]}
  />,

  <NumberedList
    eyebrow="Backup"
    title="One Sentence Per Mechanism"
    items={[
      { text: 'CLAUDE.md', hint: 'what the project always wants the agent to remember' },
      { text: 'Skill', hint: 'a reusable workflow with an activation description' },
      { text: 'Rule', hint: 'behavior scoped to files or folders' },
      { text: 'Subagent', hint: 'read-heavy work without polluting the main context' },
      { text: 'Hook', hint: 'deterministic command on tool events' },
      { text: 'Artifact', hint: 'written state that the next station can trust' },
    ]}
  />,
]
