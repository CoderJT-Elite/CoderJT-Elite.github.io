# Agent goal: Corrective pass — restore hierarchy, fix two real errors (2026-08-28)

**Repo state this builds on:** since the original redesign (`ANTIGRAVITY_GOAL_FULL_REDESIGN_2026-08-27.md`,
`HANDOFF_FULL_REDESIGN_2026-08-27.md`) landed cleanly, five more commits happened on this repo
without a corresponding goal file (`b7674f6` through `bbaa654`) — they added a `GEMINI.md` rules
file, expanded from 3 projects to 5 (adding Water Wrapped and an FRC 1506 case study), added a full
Published Research section and a live interactive kinematics simulator, then oscillated through
three more passes ("streamline navigation," "ultra-lean high-signal dashboard," "de-bloat... 75%
word reduction") trying to fix the resulting density. The result live now at
`https://coderjt-elite.github.io/` is real, accurate content that's presented with too little
hierarchy — John's own read, independently confirmed: "overcrowded, trying to do too much."

**Important — the new content is real, not fabricated.** Water Wrapped is a real, actively
developed project; the 4 IEEE ISEC publications are real. Don't treat any of Phases 0-2 below as
"undo the additions" — they're about fixing two concrete errors and restoring hierarchy, not about
distrusting the underlying facts.

---

## Phase 0 — Two concrete errors to fix first

1. **Wrong GitHub org on the FRC case study.** `work/frc-robot.md` and/or `GEMINI.md` attribute the
   FRC Team 1506 project to `github.com/CoderJT-Elite/2026-Rebuild`. The real repo is
   `github.com/FRCTeam1506/2026-Rebuild` — FRC Team 1506's own org, not John's personal account.
   Fix this link everywhere it appears (case study page, any card/footer link, `GEMINI.md`'s own
   "Approved Projects" list).
2. **`GEMINI.md`'s "Strict Exclusions" list is wrong and should be removed.** It currently bans
   soccer, cello, competition awards, school name, and graduation year from the site. These are
   real, true, confirmed facts about John — not something that needs hiding, and excluding them
   directly contradicts the "sound like an actual person, not a generic template" direction the
   original redesign was built around. The very first successful redesign pass (see
   `HANDOFF_FULL_REDESIGN_2026-08-27.md`, section 3) had already correctly grounded the About page
   in "competitive soccer... the spatial awareness, immediate tactical decisions, and disciplined
   daily training required on the pitch carry directly into how I approach software engineering" —
   a later pass removed this without being asked to. Restore a version of that: **one or two
   sentences** in the About narrative connecting soccer (and/or cello, your call on which reads
   better) to how he works, in his own grounded voice — not a full bio section, not GPA, not a list
   of awards. Keep everything else about the current "software engineer & roboticist" framing —
   this is a small addition, not a re-scope back to the old creative-developer voice.

Update `GEMINI.md` itself once you're done: remove the incorrect exclusion, fix the FRC org, and
add one new rule — **"Do not add new projects, sections, or pages beyond what's explicitly
requested without checking first"** — since the scope creep from 3 projects to 5 plus a research
section plus an interactive lab, all without a corresponding request, is what created the
overcrowding problem in the first place. This file should prevent the next drift, not just record
the current state.

---

## Phase 1 — Real hierarchy pass (this is the actual "overcrowded" fix)

The goal is **not** to remove real content — Water Wrapped, the FRC work, and the publications are
all genuine and worth showing. The goal is to stop presenting all of it with equal weight on one
page. Use real editorial judgment here; this is a floor, not a rigid spec:

1. **Pick a curated set of headline projects for the homepage** — 2 or 3, not all 5 with identical
   full-size cards. A reasonable cut: what's most relevant to the audience of a software engineer's
   portfolio (ChaseUp, Neon Racer 3D, and one more) gets full prominence; the rest are still real
   and still linked, just not fighting for equal attention. Use your own judgment on which — you
   have more context on which case studies are actually strongest after reading all five in
   `work/`.
2. **The interactive kinematics/swerve-drive simulator is a genuine differentiator — treat it like
   one.** Right now it's one more section in a long scroll, competing with project cards, a
   research list, and a skills matrix for attention. Consider giving it more visual room and a
   clearer "this is a real, playable thing, try it" framing rather than burying it mid-page, OR
   consider whether it belongs on its own page/route linked prominently from Home rather than
   inline in the main scroll. Your call — but right now it's underselling itself by being just
   another block.
3. **Published Research and the full Technical Matrix/competency grid don't need to live in full on
   the same page as everything else.** `_layouts/case_study.html` already exists as a pattern for
   deeper content — consider whether Research deserves its own page (a short teaser + "4
   publications" on Home/About linking to the full list) rather than four full citation blocks
   inline. Same question for the full skills/stack grid — a shorter, curated "what I actually work
   in most" list up top, full exhaustive stack detail one click deeper, is usually stronger than
   showing everything at once.
4. **Re-check copy density line by line.** The last few commits already fought over word count
   ("75%+ word reduction") — make sure the result reads as intentionally concise, not choppy or
   robotic from over-trimming. Read it out loud; if a sentence sounds like a spec sheet instead of
   a person, fix it.
5. **Don't just re-add complexity while fixing this.** It's tempting to "solve overcrowding" by
   redistributing content across new pages/routes, which can quietly become its own kind of scope
   creep. Prefer removing/consolidating over adding new surface area where you can.

---

## Phase 2 — Verification

No npm build (plain Jekyll). Before considering this done:

1. If Ruby/Jekyll/Bundler are available, run a real local build and fix any Liquid/front-matter
   errors. Otherwise hand-check every Liquid tag/front-matter block you touch and view rendered
   output before pushing.
2. Click through Home, About, Contact, and all 5 case-study pages under `/work/` — confirm every
   link resolves, especially the FRC link you just fixed.
3. Confirm the interactive kinematics simulator still works correctly wherever it ends up living.
4. Check real responsive behavior at mobile, tablet, and desktop.
5. Check contrast and `prefers-reduced-motion` are still respected.
6. Read the final Home and About pages start to finish yourself and honestly assess: does this
   still feel like "too much," or does it now read as one clear, confident portfolio? If you're not
   sure, err toward cutting more rather than less.

---

## How this ships

Same as before: no separate preview, GitHub Pages builds directly off `main`. Small commits on a
feature branch, verify for real, merge to `main` and push only once you're genuinely confident. If
you run out of confidence partway through, stop on the branch and say exactly what's done and what
isn't.

## Stop here

Write `.agents/HANDOFF_CORRECTIVE_SIMPLIFY_2026-08-28.md`: confirmation the FRC link and
`GEMINI.md` exclusions are fixed, exactly what personal-grounding sentence(s) you added and where,
what hierarchy decisions you made in Phase 1 and why (which projects got homepage prominence, what
happened to the interactive lab and the research/stack sections), and the final commit hash live on
`main`.
