# Codebase & Design Audit: CoderJT Personal Portfolio
**Date:** 2026-08-27 / 2026-08-28  
**Repository:** `CoderJT-Elite.github.io`  
**Target:** Kill AI template feel, completely redesign, simplify visual system, ground copy in verifiable facts, integrate real product imagery.

---

## 1. Confirmed AI-Template & Gimmick Tells

### 1.1 Gradient Text on Every Headline
- **Locations:** `assets/css/style.scss:335-345` (`.gradient-text`), `index.md:14` ("next web."), `index.md:143` ("remarkable."), `about.md:55` ("user-centricity"), `contact.md:14` ("Get in touch.").
- **Diagnosis:** A 3-color animated gradient shimmer (`#f0f0f5` to `#00e5b0` to `#7c3aed`) on display titles is the quintessential AI template signature. It distracts from real content and degrades readability.
- **Fix:** Eliminate `.gradient-text` entirely. Use crisp, high-contrast typographic hierarchy with deliberate font weight, tracking, and selective accent color.

### 1.2 Universal Glassmorphism Overload
- **Locations:** `style.scss:174-185` (`.glass-panel`), applied to every project card, feature card, avatar box, stat card, tech grid, contact form, meta items, and footer.
- **Diagnosis:** Translucent `rgba(18, 18, 28, 0.6)` panels with `backdrop-filter: blur(26px) saturate(160%)`, glowing borders, and inset box shadows on every single surface. When everything is glass, nothing has depth or structural purpose.
- **Fix:** Replace glassmorphism with solid, clean, purpose-driven surfaces: subtle, crisp borders, refined background contrast, and clear spatial hierarchy.

### 1.3 The JSON-Object "About Me" Avatar Gimmick
- **Locations:** `about.md:13-29`, `style.scss:783-796`.
- **Diagnosis:** A `{ name: "John Tewolde", role: "Creative Dev", ... }` fake JSON code block inside a purple/pink radial gradient card. This is one of the most widespread AI developer portfolio clichés.
- **Fix:** Replace with an honest, well-designed profile hero or structured bio layout highlighting real craftsmanship, focus areas, and personal context.

### 1.4 Inflated / Fake Stats
- **Locations:** `index.md:34` ("∞ Iterations Shipped"), `about.md:45-46` ("∞ Commits Pushed"), stat inconsistency ("3+" on Home vs "3" on About).
- **Diagnosis:** Infinity symbols standing in for real metrics read as padding and artificial hype.
- **Fix:** Remove infinity symbols entirely. Present honest, clean stats (e.g. 3 shipped products, Michigan base, full-stack & 3D focus) or structure the hero without inflated numbers.

### 1.5 Effect Stacking (5+ Simultaneous Interactive Gimmicks)
- **Locations:** `_layouts/default.html:94-230`, `style.scss:93-128, 129-172`.
- **Stacked Effects Found:**
  1. Custom cursor dot + lagging ring with hover expansion (`.cursor-dot`, `.cursor-outline`)
  2. 3D mouse-tracked card tilt with injected radial glare (`.tilt-card`, `.glare`)
  3. Magnetic button translation on mousemove (`.magnetic-btn`)
  4. 3 animated floating ambient blur blobs in the background (`.blob-1`, `.blob-2`, `.blob-3`)
  5. Scroll-reveal on all headers, cards, and buttons (`.reveal`, `.reveal-fast`)
- **Diagnosis:** When all pointer and ambient animations run simultaneously, the page feels noisy, sluggish, and templated.
- **Fix:** Strip out custom cursor, 3D tilt + glare overlay, magnetic button physics, and ambient moving blobs. Retain only subtle, smooth CSS hover transitions and clean, lightweight scroll-in transitions with full `prefers-reduced-motion` compliance.

### 1.6 Generic Marketing-Speak & Buzzword Copy
- **Locations:** Hero descriptions, expertise blocks, about bio, timeline.
- **Examples:** "Building the next web", "Engineering user-centricity", "Let's build something remarkable", "interfaces that are not just beautiful — they're fast, accessible, and alive", "optimized from the first commit".
- **Diagnosis:** Generic LLM-generated phrasing with no specific voice or substance.
- **Fix:** Ground all copy in concrete facts about John's actual builds: ChaseUp (construction invoice/retainage/lien automation), Neon Racer 3D (custom 3D vehicle physics with Cannon-es and Three.js), and Form Analyzer (on-device pose coaching using ML Kit).

### 1.7 Pseudo-Code Section Labels
- **Locations:** `index.md:45, 115`, `about.md:54, 100`, `contact.md:13` (`// selected works`, `// what I do`, `// about me`, `// tools & technologies`, `// let's work`).
- **Diagnosis:** Slashing `//` before headings is a stereotypical template affectation.
- **Fix:** Use clean, professional typographic overlines or plain section headers.

### 1.8 Default AI Typography (Outfit)
- **Locations:** `default.html:16`, `style.scss:87, 214, 259, 354, 453, 652, 699, 807, 869, 897, 998`.
- **Diagnosis:** Outfit has become an ubiquitous AI site builder default.
- **Fix:** Choose a distinctive, deliberate typography pairing suited for a modern software engineer and creative technologist (e.g. Plus Jakarta Sans for headings, Inter for body, JetBrains Mono for metadata/code).

### 1.9 Forced Dark Mode & Generic Neon-Teal Palette
- **Locations:** `default.html:2` (`data-theme="dark"`), `style.scss:12-20` (`--accent: #00e5b0`, `--secondary: #7c3aed`, `--tertiary: #e8197a`).
- **Diagnosis:** Neon cyberpunk colors with glow shadows over near-black (`#06060a`) background create a cliché "crypto/AI landing page" look.
- **Fix:** Implement a refined, modern dark aesthetic with rich neutral slates, warm zinc tones, subtle borders, and a precise, intentional accent color with high contrast ratios (WCAG AA/AAA compliant).

### 1.10 Zero Real Product Imagery
- **Locations:** `assets/img/` was completely empty. Project cards used CSS gradient hacks (`.card-banner-chaseup`, `.card-banner-neon`, `.card-banner-form` with fake `$` and `▶` text glyphs).
- **Diagnosis:** Projects looked like placeholders rather than real, working software.
- **Fix:** High-resolution screenshots captured directly from the live deployments (`chaseup-preview.png`, `neon-racer-preview.png`, `form-analyzer-preview.png`) and integrated into project showcases.

---

## 2. Codebase, Dead Files & Deployment Audit

### 2.1 Dead & Vestigial Files
- `style-test.css`: Unreferenced 237-line legacy stylesheet from an earlier prototype. Safe to delete.
- `soccer-ball.png`: 2.4 KB unreferenced image file only used in `style-test.css`. Safe to delete.
- `theme: jekyll-theme-cayman` in `_config.yml`: Vestigial theme import (`@import "{{ site.theme }}";` in `style.scss`) that forces CSS overrides (`.page-header { display: none !important; }`). Safe to remove from `_config.yml` and `style.scss`.

### 2.2 Domain & Routing Status
- **Custom Domain:** `jt-website.me` is currently parked / expired.
- **CNAME File:** John intentionally deleted `CNAME` in commit `e451bd6a0b4215880e42d9cbb440ccbc06b09eb3` on August 14, 2026.
- **Active GitHub Pages URL:** `https://coderjt-elite.github.io/` (Status: 200 OK).
- **Project URL Check:**
  - `https://chaseupapp.tech` -> 200 OK (Live ChaseUp SaaS app)
  - `https://neon-racer-3d.vercel.app/` -> 200 OK (Live Three.js game)
  - `https://coderjt-elite.github.io/form_analyzer/` -> 200 OK (Live Form Analyzer web showcase)
  - `https://jt-website.me/form_analyzer/` -> 404 Not Found (due to domain change)
- **Action:** Update Form Analyzer link in project card and footer to `https://coderjt-elite.github.io/form_analyzer/` or relative path `/form_analyzer/`.

### 2.3 Profile README (Companion Repo)
- `C:\OS\GitHub\CoderJT-Elite\README.md` contains emoji headers (`👋`, `🚀`, `🧠`, `🛠️`, `📌`, `💬`) and boilerplate bullets. Will be rewritten to match John's authentic, grounded voice.

---

## 3. Redesign Strategy & Direction

1. **Visual Language:** Calm, precise, editorial tech aesthetic. Clean dark slate background (`#0b0c10` / `#12141c`), crisp 1px borders (`rgba(255,255,255,0.08)`), refined emerald/cyan accent (`#0ea5e9` / `#10b981` or rich electric sapphire/emerald), clear hierarchy without neon glow spam.
2. **Typography:** Modern, structured grotesque typography (`Plus Jakarta Sans` for headings, `Inter` for body, `JetBrains Mono` for metadata/code).
3. **Interactions:** Subtle, high-performance CSS interactions (smooth link hovers, clean card lift, crisp focus rings, observer-based fade-in). No custom cursor lag, no heavy 3D tilt calculations on mousemove.
4. **Content & Copy:** Authentic, human storytelling grounded in his three flagship projects, full-stack capabilities, and Michigan/soccer background.
5. **Project Imagery:** Real captured screenshots displayed in clean browser-frame or framed cards with direct links.
