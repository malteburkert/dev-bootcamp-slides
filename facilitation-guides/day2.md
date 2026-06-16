Brief for running the Day 2 AM pod block (Pod block 3, 10:00-12:00). The exercise content lives
in the workshop repo (`day-2-am/01-observability`, `02-evals`, `03-learning-loops`, each with a
participant README); this is everything else you need to run it. Audience: engineering managers,
staff/principal engineers, tech leads; pods of ten, five pods.

## The framing (say this first)

The factory the room built on Day 1 is now the thing **under evaluation**. Three moves, in order:

1. **See it** - observability (make a run inspectable)
2. **Test it** - evals (write a check that says pass/fail)
3. **Make it stick** - learning loops (wire a check in so it runs automatically)

The order is not arbitrary: **you cannot eval what you cannot see, and you cannot close a loop
you cannot eval.** This maps 1:1 onto the three pillars of the Day 2 talk that precedes the block.

Say the controlled-rig line out loud, like Day 1: *"The calculator is a controlled rig for
learning three moves in two hours. The real deliverable is the tooling you point at your own
factory on Monday."* The closing "Taking it home" section in the README makes that explicit -
land it.

## Shape and timeline (120 min)

| Time | Segment |
| --- | --- |
| 0:00-0:10 | Setup + framing (recap the three pillars, reset baseline, pod names a presenter) |
| 0:10-0:40 | 01 - See it (observability) |
| 0:40-1:15 | 02 - Test it (evals) |
| 1:15-1:50 | 03 - Make it stick (loops) |
| 1:50-2:00 | Grown-up reveal + show & tell prep |

Three builds in ~110 working minutes is ambitious. Every exercise has a **floor** (use the
delivered thing, inspect, reflect) and a **stretch** (build more yourself) - that split is your
main pressure valve. Pairs/trios build in parallel; the pod consolidates **one** story for the
12:00 cross-pod show & tell.

## Setup (first 10 min)

Everyone resets to the supplied baseline so nobody is gated on unfinished Day-1 work. From the
repo root:

```bash
cd sandbox
cp -R ../supplied/planner/.claude/.   .claude/
cp -R ../supplied/refine/.claude/.    .claude/
cp -R ../supplied/implement/.claude/. .claude/
npm install && npm run build && npm test
```

Pods who finished Day 1 may use their own skills/beans instead. The sandbox ships an
implement-ready bean `sandbox-exercise-olqc`.

## The three exercises - what pods do, and the point

### 01 - See it (observability)
- **Do:** run a station with no record and watch it scroll away; install the delivered trace
  hook; run again; compare. It writes one line per run to `runs/trace.jsonl`.
- **Delivered:** a working `Stop` hook (`01-observability/hook/`). Pods install it, they do not
  build it.
- **Point:** feel the difference observability makes. The bean keeps the plan; everything else
  (tools, tokens, what it tried) is gone unless you capture it.
- **The seeded bean has no run to inspect yet** - it is implement-*ready*, not implemented. So
  01 opens by running `/implement sandbox-exercise-olqc` to produce a run (this also warms up the
  pipeline), then inspecting it.

### 02 - Test it (evals)
- **Do:** write a couple of evals on the **bean** (the factory's output), validated against a
  good bean and a broken bean. Part 1 is a deterministic check (`eval-kit/check.sh`, pre-seeded,
  pods add a line or two). Part 2 is a plain-English judge.
- **Delivered:** `check.sh` + the good/broken bean pair. Pods write the checks, not the runner.
- **Point:** an eval you have not validated is a vibe. A useful eval **passes the good bean and
  fails the broken one**; a failing eval is a real gap, not a broken eval.
- **Judge:** keep it independent - run it as a subagent (its own context), on a different model
  if the pod has one.

### 03 - Make it stick (learning loops)
- **Do:** red-team the factory, find one escape, then **wire a check in so it runs automatically**
  (a hook / rule / station self-check) - that is the `02 -> 03` bridge. Codify the lesson.
- **Delivered:** the red-team scenario list (`03-learning-loops/starter/red-team-inputs.md`).
- **Point:** a failure found once can never silently recur; an eval becomes part of the process.
  Cheap deterministic checks gate every run; the LLM-judge runs offline (that is the reveal).

## Gotchas that bite live

1. **The 01 hook needs a session RESTART to register.** Settings load at startup, so after a pod
   copies the hook in, they must exit and re-run `claude` or they will see nothing in
   `runs/trace.jsonl`. This is the single most likely "it doesn't work" moment.
2. **The trace file dirties the git tree.** `runs/trace.jsonl` is not gitignored, so once the
   hook is writing, `/implement` (used in 03 and the warm-up) aborts on "working tree not clean."
   If a pod installed the hook and then can't `/implement`, that is why - `git stash -u` (or add
   `runs/` to `.gitignore`) fixes it.
3. **02 evaluates the BEAN, not the calculator.** The natural drift is "does the calculator give
   the right answer." Redirect: we are checking whether the factory's *output* (the plan/bean) is
   trustworthy - headings present, no leaked file paths, no hallucinated paths, real acceptance
   criteria.
4. **The supplied skills are hardened - hard to break.** In 03, pods who red-team the *supplied*
   factory will struggle to find an escape. Tell them to red-team their **own** Day-1 skills, or
   run the same bad input through both and compare. The gap is the point.
5. **The sandbox shares the parent repo's git** (no `sandbox/.git`) - carries over from Day 1, so
   `/implement` needs a clean tree on `main`.
6. **`beans version`, not `beans --version`** (the flag form errors).
7. **The seeded beans are German** (`sandbox-exercise-olqc` = Klammer/parentheses, `sandbox-vzwt`
   = Kommazahlen/decimals). Fine for the room, just know it.

## Talking points (what to say)

- The ordering: *you cannot eval what you cannot see, and you cannot close a loop you cannot eval.*
- 01: feel the difference - the same run, but now it leaves a record.
- 02: *an eval you have not validated is a vibe.* A failing eval is a gap you just found, not a
  broken eval. The calculator is the rig; the tooling is the takeaway.
- 03: escapes become permanent checks. Ask: *prompt vs rule vs hook vs script vs human - which
  mechanism, and why?* (the recurring Day-1 question, now answered with evidence).
- Reveal: this is what you just built, at industrial scale - then the honest closer: even the
  grown-up version leaves the prompt fix to a human; the loop is evidence-driven, not auto-magic.
- Close: each person names **one** move to put on their real factory first, and commits to it -
  that hands into the Day 2 "Reflect & Commit" session.

## The grown-up reveal (closing, ~8 min)

Show a mature production eval framework as "what you just built, at scale":
- your one run record -> a three-layer trace model + a JSONL run store + comparison reports
- your handful of evals -> an evaluator registry + a calibrated LLM-judge + confidence intervals
- your one codified line -> a growing regression suite + an automated codify step

Then the honest note: even the grown-up version leaves the actual prompt fix to a human.
**Do not name the framework** - keep it generic ("a production eval framework"). This is the
talk's four-rules landing; do not let it steal the show & tell's thunder.

## Pre-flight (before the room)

- Build the sandbox: `cd sandbox && npm install && npm run build && npm test` (all green).
- Copy the supplied skills into the sandbox (setup block above).
- **02:** `cp -R ../day-2-am/02-evals/eval-kit .` then `bash eval-kit/check.sh eval-kit/beans/good-bean.md`
  (all PASS) and `... broken-bean.md` (altitude FAILs). Confirm you can read the output.
- **01:** install the hook, **restart `claude`**, run a station, confirm `runs/trace.jsonl` gets a
  line. Do this once yourself so you can unstick pods fast (gotcha 1).
- Know the reveal cold (~8 min) and the naming constraint.

## If a pod is stuck or fast

- **Floor** each exercise: inspect with the delivered thing, reflect, move on.
- **Stretch** for fast pods: 01 add a field to the hook (e.g. token/cost from the run's
  transcript); 02 add a judge on a different model and the agent-draft-then-curate step; 03 wire
  the guard as a real hook rather than just a list entry.
- **Shortest 03 loop** if time is gone: the guard can just be "add the check that catches it to
  your 02 eval set" - that still closes the loop.
