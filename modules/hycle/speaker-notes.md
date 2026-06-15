# Speaker notes — The factory is the easy part

Day 2, 14:00. Andreas. 15 slides, ~23 minutes in a 25-minute slot.

How to use this file: the deck is the spine, the full script is in [talk-outline.md](talk-outline.md), and this is the per-slide version plus the ammunition to deploy when the room leans in or pushes back. `[beat]` = deliberate pause. Every quote and number below is verified; sources are at the bottom. Do not put a number on screen you cannot defend.

Two rules for this talk: slow down on the cold open and the bottleneck slide, and never read the script. The lines below are triggers, not a teleprompter.

---

## Slide 1 — Cover: "The factory is the easy part." (0:30)
- Let it sit. Do not explain the title yet. The whole talk explains it.
- One line of warmth, then go: "A day and a half ago you walked in here, and you built a factory."

## Slide 2 — "It works." (2:00) — the cold open
- The hook. Earn attention by contradicting the last day and a half.
- Callback (depends on the keynote keeping it): "On Day 1, Tereza told you starting is simple and the team factory is the uncharted part. She was right. I am here to answer where the uncharted part is."
- The provocation, said calmly, not aggressively: "On its own, the factory will not make your company better. It can make it worse."
- `[beat]` after "let me ruin your afternoon." Hold it. The pause is the hook.

## Slide 3 — "The bottleneck moved." (5:00) — the core idea
- This is the engine of the talk. Go slow. Reveal "Now" only after they have sat with "Then."
- The line: "For thirty years the constraint was execution. You just built the thing that removes it. So what is the constraint now?"
- Land the answer: "It moved upstream, to the decision. Intent: what is worth building. Agency: the ability to act on it."
- **Ammunition — Amdahl's law (for a technical room):** "You optimized one stage of the system. Amdahl's law says your total speedup is capped by the stage you did not touch. You sped up the build. The decision latency you left alone is now your ceiling." Engineers know this in their bones from code; here it is the org.
- **Ammunition — Theory of Constraints (Goldratt):** an hour saved at a non-bottleneck is a mirage; only the bottleneck moves the system. Speeding execution when the decision is the constraint is exactly that mirage.

## Slide 4 — Intent + Agency (part of the 5:00 above)
- Name the two words plainly. This is where "Handlungsfähigkeit" appears once: "The Germans have a word for the ability to act. Handlungsfähigkeit. Competence, authority, and information in the same place."
- The point: when execution was slow you never noticed these were the real bottleneck, because building always took longer anyway.

## Slide 5 — Drucker quote, the trap (~0:30)
- Read it, let it land, then reveal the turn: "There is nothing so useless as doing efficiently that which should not be done at all." `[beat]` "Two futures follow from here. Both bad."
- This is the emotional opener of the trap section. Do not rush past the quote to the reveal.

## Slide 6 — Faster waste / Rationalization (4:30)
- **Honesty first (pre-empt the smart objection):** "A faster factory means cheaper experiments, and that is real, that can make decisions better. But only if someone is allowed to act on the result. If the answer still waits nine days for approval, you built a faster way to produce things nobody acts on."
- **Callback to Drucker (slide 5):** you already said the line. Cash it in here: "That is the Drucker line made literal. You just made the useless thing fast."
- **Ammunition — the build trap (Melissa Perri):** name it. The build trap is measuring success by output shipped instead of outcomes delivered. "You took the build trap and bolted it to a faster engine."
- **Ammunition — Jevons paradox (Nadella, Jan 2025):** "Satya Nadella said it about compute: as AI gets more efficient, use skyrockets. Same for code. Cheaper to build means more built, not less to maintain. More surface, more debt, none of it closer to a customer who needed it."

## Slide 7 — Block, February 2026 (part of 4:30)
- The rationalization path, made real and recent. "Block cut about forty percent of staff, more than four thousand people, named AI as the reason. The stock went up. The market rewarded it."
- Be fair: "This is a real strategy. It pays in the short term. Plenty of companies are choosing it. But be honest about what it is: not innovation. A company deciding it is out of ideas, choosing to be cheaper while it waits to get disrupted."
- **Ammunition — Klarna, the limit of rationalization (deploy if the room thinks cost-cutting just works):** "Klarna did the same, cut to where their bot did the work of 700 agents. A year later the CEO said, and I quote, we went too far. Lower quality, not sustainable. They are rehiring humans. Cost-cutting has a floor, and it is quality."
- **Ammunition — Shopify (the mindset, if useful):** Lütke's 2025 memo made teams prove AI cannot do the job before approving any new hire. "That is the rationalization mindset as policy. It is coming whether you frame it or not."

## Slide 8 — "These are the same future." (part of 4:30)
- The logic fix: both futures are what happens when you leave the decision where it is. "The factory does not pick one for you. And it does not hand you the third path either, the one where it makes you better. That one you build. With structure, not tools."

## Slide 9 — "Three shifts. None of them technical." (divider, ~0:20)

## Slide 10 — What actually changes (6:00) — the densest slide, trim here if long
- **Shift 1, aim at decisions:** "Stop measuring how fast you build. Time your slowest decision. That number is your real cycle time now."
  - **Ammunition — Bezos 70% rule (2016 letter):** "Most decisions should be made with about 70% of the information you wish you had. Wait for 90% and you are slow." Pair with: "Speed of decision is a skill you can build, like you built the pipeline."
  - **Ammunition — disagree and commit (same letter):** the unlock for distributed decisions without endless consensus.
- **Shift 2, push agency down inside a frame:** competence, authority, information where the work happens, but not chaos.
  - **Ammunition — McChrystal, Team of Teams (the spine of this shift):** "shared consciousness and empowered execution. Neither suffices alone." Empowered execution is pushing agency down. Shared consciousness is the frame. His leader role: "eyes on, hands off." That is exactly what you are asking your managers to become.
- **Shift 3, the roles blur:** form intent in the morning, decide, ship by afternoon. Discovery is the job the agent cannot do (Marty Cagan's term, the human edge), and it is becoming the engineer's job.
  - The agency line: "You do not need permission to start. Stop outsourcing discovery to one PM. Agree, as a team, what you do the moment a decision is blocked."
- Land FINN as the proof on the next slide.

## Slide 11 — FINN / Stryz quote (part of 6:00)
- "This is not theory." Read the quote, then reveal the model.
- The model: micro teams, one PM and a few engineers, each owning one KPI, not a backlog. Three weeks in: sharper decisions, more ownership.
- Source on file: Andreas Stryz, CTO at FINN, LinkedIn 2026 (URL in the slide comment and sources below). Confirm exact wording against the post before the talk.

## Slide 12 — "What is yours, and what is not." (3:00)
- Agency first: "The team-level moves, you start Monday, without asking anyone. Prove it on one team with a number that moved."
- Then the wall: "Authority you cannot refactor from inside your team. That takes conversations with people not in this room."
  - **Ammunition — Conway's law (1967):** "Organizations are constrained to ship designs that copy their communication structure. So if you want to change what the factory builds, you cannot only change the code. You have to change the org that talks about it." This is why it is not a code problem.
- Close the slide on the frustration line: "The frustration when a good idea dies in an approval queue is not noise. It is data. It points at the structure that has to change." `[beat]`

## Slide 13 — hycle (1:00)
- Where this comes from. Lower the lecture: "These ideas have a name. hycle. Not a product, not a finished playbook. An open inquiry, written as hypotheses, because that is honestly where we are."
- The invite: "It lives at hycle.org. If these questions are live for you, and after a day and a half building factories they should be, come argue with us. You have done the work."

## Slide 14 — Three questions (part of 1:30 handoff)
- Do not make them answer out loud. These are the seed for Nermin. Read them slowly, leave silence after each.
- Tee up Nermin explicitly: "Nermin is about to make you map the human system around your factory: who can veto it, who can quietly slow it, who can kill it, who does not even know it exists yet."

## Slide 15 — "You built the factory." (close)
- "Now go change the organization that decides what it builds." `[beat]` "Nermin, over to you."
- Do not add anything after this. Let it land and hand off.

---

## Pushback playbook (Q&A and heckle insurance)

- **"Faster execution is still valuable even if decisions don't change — more experiments, cheaper learning."**
  Agree, then close the gap: cheaper experiments only improve decisions if someone is allowed to act on the result (Bezos: course-correcting is cheap only when you can actually course-correct). If the result still waits for approval, you sped up production, not the decision.
- **"Rationalization works, Block's stock went up."**
  Short term, yes, and be honest about that. Then Klarna: same 40% logic, "we went too far," quality collapsed, rehiring. Cost-cutting has a floor and it is quality. The stock rewards it until the disruption arrives.
- **"This is just product management / we have PMs for discovery."**
  The point is not adding PMs. When execution is instant, the team that has to wait for one PM to do discovery is the new bottleneck. Discovery becomes a team capability, not one person's job.
- **"Our org will never give engineers that authority."**
  Correct, and that is the honest hard part (Beat 5). You cannot refactor authority from inside the team. But you can prove it on one team, with a number, without anyone's permission, and that proof is the argument you take to the people who hold the authority.
- **"Isn't 'kill Scrum' reckless?"**
  FINN did not remove structure, they changed it: KPI ownership replaced backlog management. The frame (strategy, shared consciousness) is what keeps distributed authority from becoming chaos (McChrystal).

## Sources (verify before the talk)
- Drucker, "nothing so useless as doing efficiently that which should not be done at all" — widely attributed to Peter Drucker. https://www.goodreads.com/quotes/348436
- Bezos, 70% of information + "disagree and commit" — Amazon 2016 shareholder letter. https://www.aboutamazon.com/news/company-news/2016-letter-to-shareholders
- Nadella, Jevons paradox + AI — X, Jan 2025. https://x.com/satyanadella/status/1883753899255046301
- McChrystal, shared consciousness + empowered execution, "eyes on, hands off" — Team of Teams (2015). https://www.amazon.com/Team-Teams-Rules-Engagement-Complex/dp/1591847486
- Conway's law — Melvin Conway, "How Do Committees Invent?" (1967). https://en.wikipedia.org/wiki/Conway%27s_law
- Melissa Perri, the build trap (output vs outcome) — Escaping the Build Trap (2018). https://www.mindtheproduct.com/escaping-build-trap-melissa-perri/
- Block layoffs (~40%, 4,000+, AI cited, stock up) — CNN, Fortune, Feb 2026. https://www.cnn.com/2026/02/26/business/block-layoffs-ai-jack-dorsey
- Klarna reversal ("we went too far", lower quality, rehiring) — Entrepreneur, mlq.ai, 2025. https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396
- Shopify, prove-AI-can't-do-it before hiring — Lütke memo, April 2025. https://www.cnbc.com/2025/04/07/shopify-ceo-prove-ai-cant-do-jobs-before-asking-for-more-headcount.html
- FINN, Andreas Stryz on killing Scrum — LinkedIn, 2026. https://www.linkedin.com/posts/andreasstryz_engineeringleadership-ai-orgdesign-share-7455542713841565696-YLA1/
