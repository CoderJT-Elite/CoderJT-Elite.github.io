# Handoff Report — Corrective Hierarchy & Simplification Pass

**Date:** August 28, 2026  
**Repository:** `CoderJT-Elite.github.io`  
**Live Site:** [coderjt-elite.github.io](https://coderjt-elite.github.io/)  
**Deployment Commit on `main`:** `424c695`  

---

## 1. Concrete Error Fixes (Phase 0)

### 1.1 FRC GitHub Organization Correction
- **Previous State:** Attributed FRC Team 1506's robot code to personal repo `github.com/CoderJT-Elite/2026-Rebuild`.
- **Corrected State:** Updated all references across the codebase to the authentic organization repository:  
  **`https://github.com/FRCTeam1506/2026-Rebuild`**
- **Files Modified:**
  - `work/frc-robot.md` (front-matter `github_url`)
  - `index.md` (project card link)
  - `GEMINI.md` (approved projects list)
  - `scripts/verify_portfolio.py` (verification regex & test suite)

### 1.2 `GEMINI.md` Rules & Boundaries Correction
- **Removed Incorrect Exclusions:** Stripped the bans on soccer, cello, athletics, and music that conflicted with presenting an authentic, grounded personal voice.
- **Retained Strict Privacy Rules:** Excluded GPA, test scores, high school names, graduation years, and photo headshots (the profile remains purely typographical).
- **Added Scope Constraint Rule:**
  > *"Do not add new projects, sections, or pages beyond what's explicitly requested without checking first."*
- **Personal Grounding Restored in `about.md`:**  
  Added the following grounded narrative sentences connecting competitive athletics and musical training to engineering craft:
  > *"Outside of software development, I play competitive soccer and cello. The spatial awareness, split-second tactical decisions, and disciplined daily training required on the pitch carry directly into how I approach control theory, kinematics, and robust systems architecture."*

---

## 2. Visual & Architectural Hierarchy (Phase 1)

### 2.1 Curated Homepage Projects (Headline 3 + Compact 2)
Rather than presenting all 5 projects with equal weight and a noisy multi-button filter bar, the homepage now features clear editorial hierarchy:
1. **Headline 01 — ChaseUp:** Full-stack SaaS, Next.js App Router, Supabase, PostgreSQL RLS, statutory rules engine (with live product dashboard preview).
2. **Headline 02 — FRC 1506 Robot Architecture:** Robotics control system, WPILib Java, 250 Hz MapleSim dyn4j physics simulation, AprilTag vision fusion (with dark technical badge banner).
3. **Headline 03 — Neon Racer 3D:** Three.js WebGL rendering, Cannon-es raycast vehicle dynamics, AWD torque distribution (with glowing 3D game preview).
4. **Additional Engineering Projects (Compact 2-Column Grid):**
   - **Form Analyzer:** Mobile & edge ML posture analysis using 3D Vector Triad Dot Product geometry (IEEE ISEC 2026).
   - **Water Wrapped:** Civic open data platform on Cloudflare Workers edge network.
   - *Both link directly to their deep-dive case studies at `/work/*` and live repositories/deployments.*

### 2.2 Interactive Kinematics & Geometry Laboratory
- Positioned as a dedicated, spotlighted engineering workbench immediately following the featured projects.
- Features dual-mode interactive canvas (WPILib swerve drive vector resolution and 3D joint angle triad dot product solver) with presets, sliders, and real-time telemetry tables.

### 2.3 Scholarly Research & Technical Stack Consolidation
- **Homepage:** Clean, high-signal list of 4 peer-reviewed IEEE publications with interactive BibTeX modal dialog and case study links.
- **De-duplication:** Removed the redundant 4-card matrix grid from the homepage. The Hero Ledger and project tags communicate John's primary stack immediately on Home, while the exhaustive categorized Technical Stack & Toolchain grid lives permanently on `/about`.

---

## 3. Verification Suite & Results (Phase 2)

- **Automated Verification (`scripts/verify_portfolio.py`):**
  - Word count budgets verified across all 8 pages (total site prose: 1,756 words, well within the 2,500 limit).
  - 0 forbidden patterns (GPA, test scores, high school names, graduation years, headshots).
  - All 5 case study disclosures closed by default.
  - All 5 approved projects, IEEE citations, and FRC links verified.
  - Complete sequential next/prev navigation chain verified across case studies.
- **Visual & Headless Chrome Testing:**
  - Validated responsive rendering at mobile (`390px`), tablet (`768px`), and desktop (`1280px`).
  - Validated typography flow, button sizing, theme switching (warm light & obsidian dark), and contrast.
