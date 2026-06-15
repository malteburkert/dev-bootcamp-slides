# Day 1 Factory Workshop - facilitation brief

Brief for facilitating Day 1 of the factory workshop (repo: `dev-bootcamp-factory-workshop`, a separate repo from the slides). Audience: engineering managers, staff/principal engineers, tech leads; ~50 people across five pods. Day 1 AM is a menu of mechanisms; Day 1 PM is the factory spine (planner -> refine -> implement). This note is what you need to know to help people during the exercises.

## The framing: a controlled experiment

The calculator sandbox is a **controlled environment**, and that is the whole point. Participants build factory *tools* - skills, subagents, rules, and the planner/refine/implement stations - and the calculator is the test fixture that lets them assess whether those tools actually work.

It is deliberately tiny, fully tested, with known-correct behavior, so the **variable under test is the tool, not the app**. That makes it scientific: a controlled, repeatable, observable setup where you can isolate cause and effect. If the planner -> refine -> implement pipeline produces a correct change that builds and passes the calculator's tests, the tools work; if it does not, you can see exactly which station failed. The calculator is the guinea pig. The real deliverable is the reusable tooling participants take back to their own codebases.

Say this out loud to the room: "You are not here to build the calculator. You are building tools you will point at your own repo next week. We use the calculator because it is small enough to watch one work-item travel through every station and verify it actually worked."

## The shape of Day 1

- **AM - mechanism menu:** CLAUDE.md (always-on context), Skill (on-demand workflow), Rule (glob-scoped), Subagent (isolated delegated context), Hook (deterministic tool-event guardrail). Two tracks: A (starter/intermediate), B (advanced). The menu is deliberately overfull - tell people "you are not expected to finish everything." The planning skill (exercise 04) is the convergence point but nobody needs to finish it.
- **PM - factory spine:** planner -> refine -> implement, glued by exact headings.

## How the afternoon actually works (the part people get confused by)

- All afternoon work happens in ONE shared `sandbox/` directory, NOT in per-exercise folders. This is the opposite of the morning, where each exercise had its own `exercise/` folder.
- Skills go in `sandbox/.claude/skills/`. The `day-1-pm/0X/solution/` folders are reference answers only - read them, do not run from them.
- Copy supplied skills into the sandbox to expose the slash commands:
  `cp -R supplied/planner/.claude/. sandbox/.claude/` (and the same for `refine` and `implement`).
- The contract (the exact text is load-bearing):
  - `/planner` writes the literal heading `## High-Level Plan`
  - `/refine` reads `## High-Level Plan`, writes `## Refined Plan`
  - `/implement` reads `## Refined Plan` -> branch, commits, `## Implementation Log`
- Why one shared folder: the stations share state (the beans and the source code). The planner writes a bean that refine must read and implement must build. The shared sandbox IS the factory floor, which is why it cannot be split into separate folders.

## Facilitation gotchas (what bites live)

1. The beans command is `beans version`, not `beans --version` (the flag form errors).
2. The sandbox shares the PARENT repo's git (there is no `sandbox/.git`). `/implement` refuses to run unless the working tree is clean and you are on `main`. By the afternoon your tree is dirty (added skills, created beans), so before the demo run `git stash -u` (or commit) and `git checkout main`. Build artifacts (`node_modules/`, `dist/`) are gitignored, so the build itself will not dirty the tree - only your skill and bean changes will.
3. The two seeded demo beans are in GERMAN (kept as-is for the Hamburg room): `sandbox-exercise-olqc` (Klammer / parentheses) and `sandbox-vzwt` (Kommazahlen / decimals). There is no language setting in beans - content is whatever was written into the file. Participants' own `/planner` beans come out in whatever language they prompt in (English if they prompt in English). Useful contrast to point out: the language lives in the content, not in a setting.
4. The sandbox ships two demo-ready beans so you do not need to build one for the demo: `sandbox-vzwt` has `## High-Level Plan` only -> demo `/refine` on it; `sandbox-exercise-olqc` has both `## High-Level Plan` and `## Refined Plan` -> demo `/implement` on it.
5. The planner has a hard APPROACH GATE: it presents 2-3 approaches and STOPS until you pick one. It will not create the bean until you choose - even if you tell it to work autonomously. If "no new bean appeared," it is waiting at the gate; give it your choice (e.g. `A`).
6. Exercise 02 (Rules) relies on glob-scoped `.claude/rules/*.md` files, which is a Cursor-style pattern. Verify it actually auto-activates in your Claude Code version BEFORE teaching it. If it does not trigger, teach the concept (scoped/conditional context) and fall back to a nested CLAUDE.md.
7. Level 2 use case should be a SMALL CALCULATOR FEATURE (exponentiation `^`, modulo `%`, unary minus, `sqrt()`/`abs()`, a `pi` constant, variables) - NOT a separate app. `/refine` and `/implement` are bolted to `sandbox/src`; a from-scratch app has nothing for them to explore or build against, and it blows the time box. Avoid parentheses and decimals - already taken by the seeded beans.

## Teaching beats / talking points

1. Best question to ask the room: "What happens if someone renames the heading?" Answer: the next station cannot find its input and the chain breaks. That question IS the contract lesson - durable artifacts plus exact contracts beat one giant prompt that remembers everything.
2. The subagent that `/refine` spins up is the callback to the morning subagent exercise - name it when it happens.
3. The real takeaway is the planner/refine station participants build; it goes home to their own codebase. The calculator is just the controlled test rig.
4. The factory works because each station has an input, an output, a stable artifact, a boundary, and a hand-off - not because one huge prompt remembers everything.

## Pre-flight checklist

- Build the sandbox (it ships unbuilt): `cd sandbox && npm install && npm run build && npm test` (expect all green).
- Tools needed: Claude Code, beans CLI (v0.4.2 installed), jq, Node >= 20, npm, git.
- Rehearse the `/implement` demo from a clean tree on `main` (see gotcha 2).
- Test exercise 02 (Rules) yourself (see gotcha 6).

## Open questions / watch

- Confirm the exercise 02 glob-scoped Rules mechanism works in the room's Claude Code version.
- Minor doc inconsistency: `sandbox/CLAUDE.md` mentions a `beans update --body-append` flag that does not exist; the supplied skills use the correct fetch + concatenate + `--body-file` pattern. Only bites if someone hand-writes a beans call.
