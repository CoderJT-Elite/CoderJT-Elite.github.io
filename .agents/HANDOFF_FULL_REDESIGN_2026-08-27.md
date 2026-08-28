# Full Redesign Handoff — Portfolio Simplification

**Date:** August 27–28, 2026  
**Repository:** `CoderJT-Elite.github.io`  
**Live Site:** [coderjt-elite.github.io](https://coderjt-elite.github.io/)  
**Deployment Commit on `main`:** `93c26d8`

---

## 1. Executive Summary & Diagnosis

The user brief was concise and unambiguous:
> *"kill ai feel, redo completely, make simpler."*

### What Was Wrong (The AI Tell Diagnosis)
1. **Gimmick Overload:** The previous site simultaneously ran 5–6 stacked JavaScript and CSS visual effects:
   - Custom trailing cursor ring (`.custom-cursor`, `.cursor-follower`)
   - 3D mouse parallax tilt + dynamic radial glare calculations (`data-tilt`)
   - Magnetic button physics tracking cursor bounding boxes
   - 4 floating ambient blur gradient blobs (`radial-gradient` background animations)
   - Heavy frosted glassmorphism (`backdrop-filter: blur(20px)`, low-contrast white borders, semi-transparent panels)
   - Floating particle animation (`#particles-js` canvas)
2. **Generic, AI-Generated Copy:**
   - Empty superlative claims: *"Pioneering digital frontiers"*, *"Mastering the intersection of art and code"*, *"Architecting scalable ecosystems"*.
   - A fake JSON code block mimicking personal bio data (`{ name: "John", passion: "infinite" }`), which is one of the most recognizable cliché AI portfolio patterns.
   - Fake stats counters (`100% Satisfaction`, `100+ Commits`).
3. **Missing Authentic Evidence:**
   - Unrendered placeholder SVGs / mock code boxes instead of actual screenshots of real shipped products.
   - Dead and unreferenced assets (`style-test.css`, `soccer-ball.png`).
4. **Domain & Routing Confusion:**
   - `jt-website.me` was expired and parked. `CNAME` had been deleted in commit `e451bd6`, but site metadata still had lingering references to the domain.

---

## 2. Design System & Typography Decisions

### Palette
A calm, dark background with deep slate surfaces and a single cyan accent color:
- **Canvas Background:** `#090a0f` (deep neutral dark)
- **Primary Surface / Cards:** `#11141d` (subtle contrast card background)
- **Elevated Surface:** `#161b26` (interactive/active states)
- **Input Background:** `#0d0f17`
- **Borders:** `rgba(255, 255, 255, 0.08)` subtle, `rgba(255, 255, 255, 0.14)` default, `rgba(255, 255, 255, 0.25)` active
- **Primary Accent:** `#38bdf8` (electric cyan / sky 400)
- **Status Indicator:** `#10b981` (emerald green)
- **Text:** `#f8fafc` (primary), `#94a3b8` (secondary), `#64748b` (muted)

### Typography Pairing
- **Display Headings:** `Plus Jakarta Sans` (weights 600, 700, 800) — clean geometric personality without loud display quirks.
- **Body & Prose:** `Inter` (weights 400, 500, 600) — optimal readability for engineering copy.
- **Code & Metadata:** `JetBrains Mono` (weights 400, 500) — tabular numbers, dates, tech stack tags, and eyebrow badges.

### Interaction Model
- **Effect Budget:** Exactly **one** subtle interaction: a lightweight `IntersectionObserver` scroll-in reveal (`opacity` and `transform: translateY(16px)` with `prefers-reduced-motion` override).
- Removed all mousemove listeners, magnetic tracking, custom cursor canvas, and 3D tilt calculations.

---

## 3. Grounded Copy Pass (Before vs. After)

All copy across the portfolio was rewritten to state verifiable facts about John's engineering work, state competition entry, and competitive soccer background.

| Page | Before (AI Cliché) | After (Verifiable Reality) |
| :--- | :--- | :--- |
| **Home Hero** | *"Architecting next-generation digital experiences where visionary code meets unparalleled design."* | *"Software engineer & creative developer. I'm John Tewolde — an engineer based in Michigan. I design and build production-grade web applications, real-time 3D physics engines, and intelligent on-device computer vision tools."* |
| **Home Stats** | *"100% Satisfaction · 50+ Projects · 24/7 Innovation"* | *"3 Shipped Applications · Full-Stack + 3D Focus · Michigan, USA Base"* |
| **About Hero** | Fake JSON avatar object: `const dev = { name: "JT", superpowers: ["fullstack", "magic"] };` | Clean profile sidebar with Michigan location, focus areas, soccer background, and status indicator alongside authentic narrative bio. |
| **About Bio** | *"Passionate full-stack wizard solving world-class problems with cutting-edge AI synergy."* | *"My engineering work is driven by a simple goal: building software that solves concrete problems while maintaining high technical rigor... Outside of software development, I play competitive soccer. The spatial awareness, immediate tactical decisions, and disciplined daily training required on the pitch carry directly into how I approach software engineering."* |
| **Contact** | *"Let's build something impossible together. Teleport into my inbox."* | *"Get in touch. Whether you have an open software engineering role, a product build to discuss, or a technical question — feel free to reach out. I typically reply within 24 hours."* |

---

## 4. Real Product Imagery

Live, high-resolution screenshots were captured using Chrome DevTools Protocol from actual deployed applications and integrated directly into the layout:

1. `assets/img/chaseup-preview.png` (185 KB)
   - Real dashboard view of **ChaseUp** (`https://chaseupapp.tech`), showcasing accounts receivable tracking, retainage breakdown, and mechanics lien deadline calculations.
2. `assets/img/neon-racer-preview.png` (692 KB)
   - Real start screen and 3D vehicle canvas of **Neon Racer 3D** (`https://neon-racer-3d.vercel.app/`), showing the WebGL rendering pipeline, custom chassis model, and camera angles.
3. `assets/img/form-analyzer-preview.png` (640 KB)
   - Live mobile interface of **Form Analyzer** (`https://coderjt-elite.github.io/form_analyzer/`), illustrating on-device Google ML Kit pose detection for athletic posture coaching.

---

## 5. Companion Profile Sync

Updated companion GitHub profile README (`C:\OS\GitHub\CoderJT-Elite\README.md`):
- Removed decorative emoji banners and generic bullet points.
- Synced direct links to **ChaseUp**, **Neon Racer 3D**, and **Form Analyzer**.
- Synced verified technical focus areas and Michigan base.
- Pushed directly to `origin/main` in repo `CoderJT-Elite/CoderJT-Elite`.

---

## 6. Verification Results

- **Headless Chrome Visual Test:** Rendered all three pages (`/`, `/about`, `/contact`) at desktop (`1280x900`, `1280x1400`) and mobile (`390x844`).
- **Computed Styles Check:**
  - Button background verified: `rgb(56, 189, 248)` (`#38bdf8`)
  - Primary button text color verified: `rgb(4, 8, 16)`
  - Heading font verified: `Plus Jakarta Sans` / `Inter`
  - High contrast on dark canvas verified: `rgb(248, 250, 252)`
- **Responsive Layout:** Responsive hamburger menu on mobile, single-column reflow for project cards, profile sidebar, and contact form.
- **Git History:** Merged cleanly into `main` and pushed to `origin/main`.
