---
layout: default
title: Home
description: John Tewolde — software engineer and robotics lead programmer based in Michigan. Building full-stack platforms, physics-based simulations, on-device computer vision, and autonomous control systems.
---

<!-- Hero Section -->
<section class="section section-hero">
  <div class="container">
    <div class="hero-pretitle">
      <span>Software Engineer &amp; Roboticist</span>
      <span>·</span>
      <span>Michigan, USA</span>
    </div>

    <h1 class="hero-heading">
      Building robust software, <em>physics-based simulations</em>, and autonomous systems.
    </h1>

    <p class="hero-lead">
      Software engineer and robotics lead programmer. Architecting full-stack platforms, rigid-body physics simulations, and privacy-first on-device vision pipelines with mathematical rigor.
    </p>

    <div class="hero-actions">
      <a href="#selected-work" class="btn-primary">View Selected Work ↓</a>
      <a href="#interactive-lab" class="btn-secondary">Explore Interactive Lab ⚡</a>
      <a href="{{ '/about' | relative_url }}" class="btn-link">Background &amp; Principles</a>
      <a href="{{ '/contact' | relative_url }}" class="btn-link">Get in Touch</a>
    </div>

    <!-- Quick Section Jump Bar -->
    <div class="quick-jump-bar" aria-label="Page section quick navigation">
      <span class="quick-jump-label">Quick Jump:</span>
      <div class="quick-jump-pills">
        <a href="#selected-work" class="jump-pill">
          <span class="jump-pill-num">01</span> Featured Work (5)
        </a>
        <a href="#interactive-lab" class="jump-pill">
          <span class="jump-pill-num">02</span> Interactive Lab ⚡
        </a>
        <a href="#research" class="jump-pill">
          <span class="jump-pill-num">03</span> IEEE Research (4)
        </a>
        <a href="#competencies" class="jump-pill">
          <span class="jump-pill-num">04</span> Core Competencies
        </a>
      </div>
    </div>

    <div class="hero-ledger">
      <div class="ledger-item">
        <span class="ledger-label">Location</span>
        <span class="ledger-value">Michigan, United States</span>
      </div>
      <div class="ledger-item">
        <span class="ledger-label">Primary Stack</span>
        <span class="ledger-value">TypeScript, Java, Next.js, WPILib, Flutter</span>
      </div>
      <div class="ledger-item">
        <span class="ledger-label">Core Focus</span>
        <span class="ledger-value">Full-Stack, Robotics &amp; Vision</span>
      </div>
    </div>
  </div>
</section>

<!-- Interactive Engineering Laboratory / Visualizer -->
<section class="section section-rule" id="interactive-lab">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Interactive Engineering Lab</div>
      <div class="section-num">Kinematics &amp; Geometry</div>
    </div>

    <h2 class="section-headline">Interactive Kinematics &amp; Vector Mathematics</h2>
    <p class="section-intro-text" style="margin-bottom: 1.25rem;">
      Real-time mathematical visualizers for swerve drive vector resolution and 3D Vector Triad angle computation.
    </p>

    <!-- Lab Plain-English Explainer Banners -->
    <div class="lab-explainer-banner" id="labExplainerSwerve">
      <span class="explainer-tag">Swerve Kinematics</span>
      <p class="explainer-text">
        Translates chassis velocity vectors $(V_x, V_y, \omega)$ into independent wheel steering angles and motor speeds in real time.
      </p>
    </div>

    <div class="lab-explainer-banner" id="labExplainerTriad" style="display: none;">
      <span class="explainer-tag">Vector Triad</span>
      <p class="explainer-text">
        Computes 3D joint angles using landmark dot products $(\vec{u} \cdot \vec{v})$ on-device with zero server latency.
      </p>
    </div>

    <!-- Lab Widget Container -->
    <div class="lab-widget">
      <!-- Mode Tabs -->
      <div class="lab-tab-bar" role="tablist" aria-label="Visualizer Mode Selection">
        <button class="lab-tab active" id="tabSwerve" role="tab" aria-selected="true" aria-controls="labWorkspace">
          <span class="lab-tab-num">01</span> Swerve Drive Kinematics (WPILib)
        </button>
        <button class="lab-tab" id="tabTriad" role="tab" aria-selected="false" aria-controls="labWorkspace">
          <span class="lab-tab-num">02</span> 3D Vector Triad Geometry (IEEE 2026)
        </button>
      </div>

      <!-- Main Workspace -->
      <div class="lab-workspace" id="labWorkspace">
        <!-- Canvas Stage -->
        <div class="lab-canvas-container">
          <canvas id="kinematicsCanvas" width="560" height="380" aria-label="Interactive kinematics vector canvas visualizer"></canvas>
          <div class="canvas-hint">Drag points / adjust controls to simulate vectors in real time</div>
        </div>

        <!-- Controls & Telemetry Panel -->
        <div class="lab-panel">
          
          <!-- Swerve Controls Subpanel -->
          <div id="swerveControlsSection">
            <div class="panel-section-title">Chassis Velocity Vector Inputs</div>

            <!-- Motion Presets -->
            <div class="preset-pill-group">
              <span class="preset-label">Presets:</span>
              <button class="preset-btn active" data-swerve-preset="forward">Forward</button>
              <button class="preset-btn" data-swerve-preset="strafe">Strafe</button>
              <button class="preset-btn" data-swerve-preset="rotate">Spin</button>
              <button class="preset-btn" data-swerve-preset="orbit">Orbit</button>
              <button class="preset-btn" data-swerve-preset="diagonal">Drift</button>
            </div>

            <div class="slider-group">
              <div class="slider-row">
                <label for="sliderVx" class="slider-label"><span>Translation Vx (Lateral)</span><span class="slider-val-unit">m/s</span></label>
                <input type="range" id="sliderVx" min="-4.5" max="4.5" step="0.1" value="0">
              </div>

              <div class="slider-row">
                <label for="sliderVy" class="slider-label"><span>Translation Vy (Forward)</span><span class="slider-val-unit">m/s</span></label>
                <input type="range" id="sliderVy" min="-4.5" max="4.5" step="0.1" value="2.5">
              </div>

              <div class="slider-row">
                <label for="sliderOmega" class="slider-label"><span>Angular Velocity &omega; (Yaw)</span><span class="slider-val-unit">rad/s</span></label>
                <input type="range" id="sliderOmega" min="-6.0" max="6.0" step="0.1" value="1.2">
              </div>
            </div>

            <!-- Live Swerve Telemetry -->
            <div class="telemetry-box" id="swerveTelemetry">
              <!-- Dynamically populated by kinematics-widget.js -->
            </div>
          </div>

          <!-- Triad Controls Subpanel -->
          <div id="triadControlsSection" style="display: none;">
            <div class="panel-section-title">Joint Vector Triad (Interactive Drag)</div>
            <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
              Drag joint nodes or select presets to evaluate real-time Law of Cosines calculations:
            </p>

            <!-- Triad Presets -->
            <div class="preset-pill-group" style="margin-bottom: 1.25rem;">
              <span class="preset-label">Presets:</span>
              <button class="preset-btn" data-triad-preset="standing">Standing (180°)</button>
              <button class="preset-btn" data-triad-preset="optimal">Squat (90°) <span class="badge-sub">Optimal</span></button>
              <button class="preset-btn" data-triad-preset="deep">Deep Flexion (70°)</button>
              <button class="preset-btn" data-triad-preset="quarter">Incline (135°)</button>
            </div>

            <!-- Live Triad Telemetry -->
            <div class="telemetry-box" id="triadTelemetry">
              <!-- Dynamically populated by kinematics-widget.js -->
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<!-- Selected Work Section -->
<section class="section section-rule" id="selected-work">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Selected Projects</div>
      <div class="section-num">01 — 05</div>
    </div>

    <div class="work-header-row">
      <div>
        <h2 class="section-headline">Featured Engineering Work</h2>
        <p class="section-intro-text">
          Production software platforms, robotics control systems, and physics simulations.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="filter-wrapper">
        <div class="filter-tablist" id="projectFilters" role="tablist" aria-label="Filter projects by engineering domain">
          <button class="filter-btn active" data-filter="all" role="tab" aria-selected="true">All (5)</button>
          <button class="filter-btn" data-filter="web" role="tab" aria-selected="false">Web &amp; Systems</button>
          <button class="filter-btn" data-filter="robotics" role="tab" aria-selected="false">Robotics &amp; Controls</button>
          <button class="filter-btn" data-filter="3d" role="tab" aria-selected="false">3D &amp; Physics</button>
          <button class="filter-btn" data-filter="vision" role="tab" aria-selected="false">Edge Vision</button>
        </div>
      </div>
    </div>

    <div class="filter-status-row">
      <span class="filter-count-notice" id="filterCountNotice" aria-live="polite">Showing all 5 projects</span>
    </div>

    <div class="project-case-list">

      <!-- Project 1: ChaseUp -->
      <article class="case-study exec-card" data-category="web">
        <div class="case-media">
          <img src="{{ '/assets/img/chaseup-preview.png' | relative_url }}" alt="ChaseUp application dashboard interface" loading="lazy" width="1280" height="800">
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">01</span>
              <span>/</span>
              <span>Web Application &amp; SaaS</span>
              <span>·</span>
              <span>2024 – Present</span>
            </div>
            <h3 class="case-title">ChaseUp</h3>
          </div>

          <!-- 3-Part Executive Card: Problem → Architecture → Impact -->
          <div class="exec-breakdown">
            <div class="exec-row">
              <span class="exec-label exec-label-problem">Problem</span>
              <p class="exec-text">Subcontractors regularly forfeit lien rights on overdue receivables due to missed statutory deadlines.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-arch">Solution</span>
              <p class="exec-text">Next.js App Router and Supabase platform with PostgreSQL Row Level Security and deterministic rules engine.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-impact">Key Metric</span>
              <div class="exec-metric-highlight">
                <strong>Sub-50ms query latency</strong> across isolated multi-tenant RLS tables with automated retainage tracking.
              </div>
            </div>
          </div>

          <div class="case-tech-list">
            <span class="tech-tag">Next.js</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Supabase</span>
            <span class="tech-tag">PostgreSQL (RLS)</span>
            <span class="tech-tag">Tailwind CSS</span>
          </div>

          <div class="case-links">
            <a href="{{ '/work/chaseup/' | relative_url }}" class="btn-primary">
              Read Case Study &amp; Architecture →
            </a>
            <a href="https://chaseupapp.tech" target="_blank" rel="noopener noreferrer" class="live-link">
              Visit Live Platform ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Project 2: FRC 1506 Autonomous Robot & Simulation Architecture -->
      <article class="case-study exec-card" data-category="robotics">
        <div class="case-media" style="padding: 2rem 1.75rem; background: #18181b; color: #f4f3ed; display: flex; flex-direction: column; justify-content: space-between; min-height: 260px;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem;">
              FRC Team 1506 Metal Muscle · Robotics
            </div>
            <h4 style="font-family: var(--font-serif); font-size: 1.4rem; color: #ffffff; font-weight: 500; line-height: 1.25; margin-bottom: 0.75rem;">
              Physics-Based Simulation &amp; Swerve Odometry
            </h4>
            <p style="font-size: 0.85rem; color: #d4d4d8; line-height: 1.55;">
              Decoupling autonomous routine development from physical robot hardware via dyn4j rigid-body dynamics, CTRE Phoenix 6 swerve drive, and dual Limelight AprilTag vision fusion.
            </p>
          </div>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 1.25rem;">
            <span style="font-family: var(--font-mono); font-size: 0.68rem; background: rgba(255,255,255,0.1); color: #e4e4e7; padding: 0.18rem 0.45rem; border-radius: 3px;">MapleSim (dyn4j)</span>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; background: rgba(255,255,255,0.1); color: #e4e4e7; padding: 0.18rem 0.45rem; border-radius: 3px;">WPILib Java</span>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; background: rgba(255,255,255,0.1); color: #e4e4e7; padding: 0.18rem 0.45rem; border-radius: 3px;">Limelight Vision</span>
          </div>
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">02</span>
              <span>/</span>
              <span>Robotics &amp; Physics Simulation</span>
              <span>·</span>
              <span>2023 – Present</span>
            </div>
            <h3 class="case-title">FRC 1506 Robot Architecture</h3>
          </div>

          <!-- 3-Part Executive Card: Problem → Architecture → Impact -->
          <div class="exec-breakdown">
            <div class="exec-row">
              <span class="exec-label exec-label-problem">Problem</span>
              <p class="exec-text">Hardware contention during build seasons limits physical track testing for swerve autonomous routines.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-arch">Solution</span>
              <p class="exec-text">MapleSim 250 Hz physics simulation (dyn4j) fusing CTRE swerve kinematics with dual Limelight vision in an EKF.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-impact">Key Metric</span>
              <div class="exec-metric-highlight">
                <strong>250 Hz (4ms) physics loop</strong> validating 8 autonomous routines prior to physical chassis delivery.
              </div>
            </div>
          </div>

          <div class="case-tech-list">
            <span class="tech-tag">Java 17</span>
            <span class="tech-tag">WPILib</span>
            <span class="tech-tag">CTRE Phoenix 6</span>
            <span class="tech-tag">MapleSim</span>
            <span class="tech-tag">PathPlanner</span>
            <span class="tech-tag">Limelight MegaTag2</span>
          </div>

          <div class="case-links">
            <a href="{{ '/work/frc-robot/' | relative_url }}" class="btn-primary">
              Read Robot Case Study →
            </a>
            <a href="https://github.com/CoderJT-Elite/2026-Rebuild" target="_blank" rel="noopener noreferrer" class="live-link">
              View Robot Codebase ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Project 3: Form Analyzer -->
      <article class="case-study exec-card" data-category="vision">
        <div class="case-media">
          <img src="{{ '/assets/img/form-analyzer-preview.png' | relative_url }}" alt="Form Analyzer biomechanical feedback application interface" loading="lazy" width="1280" height="800">
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">03</span>
              <span>/</span>
              <span>Mobile &amp; Computer Vision</span>
              <span>·</span>
              <span>2023 – Present</span>
            </div>
            <h3 class="case-title">Form Analyzer</h3>
          </div>

          <!-- 3-Part Executive Card: Problem → Architecture → Impact -->
          <div class="exec-breakdown">
            <div class="exec-row">
              <span class="exec-label exec-label-problem">Problem</span>
              <p class="exec-text">Cloud-hosted coaching apps introduce 200–800ms latency and expose sensitive workout video streams.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-arch">Solution</span>
              <p class="exec-text">On-device Flutter pipeline with Google ML Kit pose detection and 3D Vector Triad Dot Product geometry.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-impact">Key Metric</span>
              <div class="exec-metric-highlight">
                <strong>30–60 FPS on-device execution</strong> with zero server latency (Published at IEEE ISEC 2026).
              </div>
            </div>
          </div>

          <div class="case-tech-list">
            <span class="tech-tag">Flutter</span>
            <span class="tech-tag">Dart</span>
            <span class="tech-tag">Google ML Kit</span>
            <span class="tech-tag">3D Vector Geometry</span>
            <span class="tech-tag">Android NDK</span>
          </div>

          <div class="case-links">
            <a href="{{ '/work/form-analyzer/' | relative_url }}" class="btn-primary">
              Read Research Case Study →
            </a>
            <a href="https://coderjt-elite.github.io/form_analyzer/" target="_blank" rel="noopener noreferrer" class="live-link">
              Project Details &amp; Research ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Project 4: Neon Racer 3D -->
      <article class="case-study exec-card" data-category="3d">
        <div class="case-media">
          <img src="{{ '/assets/img/neon-racer-preview.png' | relative_url }}" alt="Neon Racer 3D real-time browser game preview" loading="lazy" width="1280" height="800">
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">04</span>
              <span>/</span>
              <span>3D Graphics &amp; Physics</span>
              <span>·</span>
              <span>2024</span>
            </div>
            <h3 class="case-title">Neon Racer 3D</h3>
          </div>

          <!-- 3-Part Executive Card: Problem → Architecture → Impact -->
          <div class="exec-breakdown">
            <div class="exec-row">
              <span class="exec-label exec-label-problem">Problem</span>
              <p class="exec-text">Heavyweight web 3D engines impose 50MB–150MB downloads, sluggish startup times, and GC frame drops.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-arch">Solution</span>
              <p class="exec-text">Custom Three.js WebGL renderer paired with Cannon-es raycast vehicle dynamics and AWD torque distribution.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-impact">Key Metric</span>
              <div class="exec-metric-highlight">
                <strong>Stable 60 FPS in-browser</strong> with an ultra-lightweight &lt; 3MB gzip bundle footprint.
              </div>
            </div>
          </div>

          <div class="case-tech-list">
            <span class="tech-tag">Three.js</span>
            <span class="tech-tag">Cannon-es</span>
            <span class="tech-tag">WebGL</span>
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">Vite</span>
          </div>

          <div class="case-links">
            <a href="{{ '/work/neon-racer-3d/' | relative_url }}" class="btn-primary">
              Read Graphics Case Study →
            </a>
            <a href="https://neon-racer-3d.vercel.app/" target="_blank" rel="noopener noreferrer" class="live-link">
              Play in Browser ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Project 5: Water Wrapped -->
      <article class="case-study exec-card" data-category="web">
        <div class="case-media" style="padding: 2rem 1.75rem; background: #0f172a; color: #f8fafc; display: flex; flex-direction: column; justify-content: space-between; min-height: 260px;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem;">
              Civic Tech &amp; Environmental Data
            </div>
            <h4 style="font-family: var(--font-serif); font-size: 1.4rem; color: #ffffff; font-weight: 500; line-height: 1.25; margin-bottom: 0.75rem;">
              Water Wrapped: Interactive CCR Reports
            </h4>
            <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.55;">
              Transforming complex municipal drinking water Consumer Confidence Reports into engaging, tap-through stories and validated searchable chemistry tables.
            </p>
          </div>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 1.25rem;">
            <span style="font-family: var(--font-mono); font-size: 0.68rem; background: rgba(56, 189, 248, 0.15); color: #7dd3fc; padding: 0.18rem 0.45rem; border-radius: 3px;">React + Vite</span>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; background: rgba(56, 189, 248, 0.15); color: #7dd3fc; padding: 0.18rem 0.45rem; border-radius: 3px;">Cloudflare Workers</span>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; background: rgba(56, 189, 248, 0.15); color: #7dd3fc; padding: 0.18rem 0.45rem; border-radius: 3px;">Supabase</span>
          </div>
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">05</span>
              <span>/</span>
              <span>Full-Stack Web &amp; Open Data</span>
              <span>·</span>
              <span>2025 – Present</span>
            </div>
            <h3 class="case-title">Water Wrapped</h3>
          </div>

          <!-- 3-Part Executive Card: Problem → Architecture → Impact -->
          <div class="exec-breakdown">
            <div class="exec-row">
              <span class="exec-label exec-label-problem">Problem</span>
              <p class="exec-text">Municipal Consumer Confidence Reports are dense 20-page PDFs with under 10% resident engagement.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-arch">Solution</span>
              <p class="exec-text">Multi-utility edge routing on Cloudflare Workers with tap-through stories and EPA MCL chemistry validators.</p>
            </div>
            <div class="exec-row">
              <span class="exec-label exec-label-impact">Key Metric</span>
              <div class="exec-metric-highlight">
                <strong>Sub-45ms global edge TTFB</strong> across 300+ edge points with WCAG 2.1 AA accessible open data.
              </div>
            </div>
          </div>

          <div class="case-tech-list">
            <span class="tech-tag">React</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Vite</span>
            <span class="tech-tag">Cloudflare Workers</span>
            <span class="tech-tag">Supabase</span>
          </div>

          <div class="case-links">
            <a href="{{ '/work/water-wrapped/' | relative_url }}" class="btn-primary">
              Read Edge Architecture Case Study →
            </a>
            <a href="https://github.com/JoshuaTewolde/WaterWrapped" target="_blank" rel="noopener noreferrer" class="live-link">
              View Repository ↗
            </a>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- Selected Research & Publications -->
<section class="section section-rule" id="research">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Scholarly Research</div>
      <div class="section-num">IEEE Publications</div>
    </div>

    <h2 class="section-headline">Selected Research &amp; Publications</h2>
    <p class="section-intro-text" style="margin-bottom: 2rem;">
      Peer-reviewed conference papers across computer vision, robotics, and applied systems.
    </p>

    <div class="pub-list">
      <!-- Pub 1: Form Analysis -->
      <div class="pub-card">
        <div class="pub-meta-line">
          <span class="pub-badge">IEEE Publication</span>
          <span class="pub-year">2026 · Princeton, NJ</span>
        </div>
        <h3 class="pub-title">A Machine Learning Approach to Exercise Form Analysis</h3>
        <p class="pub-authors">Author: John Tewolde · 16th IEEE Integrated STEM Education Conference (ISEC 2026)</p>
        
        <div class="pub-contribution-box">
          <span class="pub-contrib-label">Key Contribution</span>
          <p class="pub-contrib-text">
            Engineered rotation-invariant 3D Vector Triad Dot Product engine and asynchronous inference gating for zero-latency mobile coaching.
          </p>
        </div>

        <div class="pub-actions">
          <button type="button" class="btn-cite" data-bibtex-id="tewolde2026machine">
            Cite (BibTeX)
          </button>
          <a href="{{ '/work/form-analyzer/' | relative_url }}" class="btn-link">Read Technical Case Study →</a>
        </div>
      </div>

      <!-- Pub 2: Robotics Vision -->
      <div class="pub-card">
        <div class="pub-meta-line">
          <span class="pub-badge">IEEE Publication</span>
          <span class="pub-year">2024 · Princeton, NJ</span>
        </div>
        <h3 class="pub-title">Use of Computer Vision and AI Techniques for Enhancing Performance at FIRST Robotics Competitions</h3>
        <p class="pub-authors">Co-Author: John Tewolde · 14th IEEE Integrated STEM Education Conference (ISEC 2024)</p>
        
        <div class="pub-contribution-box">
          <span class="pub-contrib-label">Key Contribution</span>
          <p class="pub-contrib-text">
            Evaluated embedded machine learning object detection and AprilTag localization on coprocessors for autonomous field-relative targeting.
          </p>
        </div>

        <div class="pub-actions">
          <button type="button" class="btn-cite" data-bibtex-id="tewolde2024computervision">
            Cite (BibTeX)
          </button>
          <a href="{{ '/work/frc-robot/' | relative_url }}" class="btn-link">Read Robot Case Study →</a>
        </div>
      </div>

      <!-- Pub 3: Water Filtration -->
      <div class="pub-card">
        <div class="pub-meta-line">
          <span class="pub-badge">IEEE Publication</span>
          <span class="pub-year">2021 · Princeton, NJ</span>
        </div>
        <h3 class="pub-title">Filtered — Filtering Water Using a Variety of Efficient Filtration Methods</h3>
        <p class="pub-authors">Author: John Tewolde · 11th IEEE Integrated STEM Education Conference (ISEC 2021)</p>
        
        <div class="pub-contribution-box">
          <span class="pub-contrib-label">Key Contribution</span>
          <p class="pub-contrib-text">
            Experimental analysis of contaminant reduction across accessible filtration media for low-cost purification protocols.
          </p>
        </div>

        <div class="pub-actions">
          <button type="button" class="btn-cite" data-bibtex-id="tewolde2021filtered">
            Cite (BibTeX)
          </button>
        </div>
      </div>

      <!-- Pub 4: Musical Outreach -->
      <div class="pub-card">
        <div class="pub-meta-line">
          <span class="pub-badge">IEEE Publication</span>
          <span class="pub-year">2021 · Princeton, NJ</span>
        </div>
        <h3 class="pub-title">Using Technology as a Means for Musical Outreach to Nursing Home Residents</h3>
        <p class="pub-authors">Author: John Tewolde · 11th IEEE Integrated STEM Education Conference (ISEC 2021)</p>
        
        <div class="pub-contribution-box">
          <span class="pub-contrib-label">Key Contribution</span>
          <p class="pub-contrib-text">
            Explored digital delivery architectures to support cognitive stimulation for elderly assisted living residents during isolation.
          </p>
        </div>

        <div class="pub-actions">
          <button type="button" class="btn-cite" data-bibtex-id="tewolde2021musicaloutreach">
            Cite (BibTeX)
          </button>
        </div>
      </div>
    </div>

    <div style="margin-top: 2rem;">
      <a href="{{ '/about' | relative_url }}#research" class="btn-link">View All Research Details on About Page →</a>
    </div>
  </div>
</section>

<!-- Domains of Practice / Technical Focus -->
<section class="section section-rule" id="competencies">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Core Competencies</div>
      <div class="section-num">Technical Focus</div>
    </div>

    <h2 class="section-headline">Areas of Engineering Practice</h2>
    <p class="section-intro-text" style="margin-bottom: 2rem;">
      Architectural specializations and core technical competencies.
    </p>

    <div class="domains-grid">
      <div class="domain-card">
        <div class="domain-index">01 / Full-Stack Platforms</div>
        <h3 class="domain-title">Application Architecture</h3>
        <p class="domain-desc">
          Multi-tenant Next.js/Supabase architectures, strict PostgreSQL RLS data isolation, and edge routing.
        </p>
        <div class="domain-tech-chips">
          <span class="tech-tag">Next.js</span>
          <span class="tech-tag">TypeScript</span>
          <span class="tech-tag">Supabase</span>
          <span class="tech-tag">PostgreSQL (RLS)</span>
          <span class="tech-tag">Tailwind</span>
        </div>
      </div>

      <div class="domain-card">
        <div class="domain-index">02 / Autonomous Systems</div>
        <h3 class="domain-title">Robotics &amp; Control Theory</h3>
        <p class="domain-desc">
          Swerve kinematics, multi-camera AprilTag pose localization, and 250 Hz rigid-body physics simulations.
        </p>
        <div class="domain-tech-chips">
          <span class="tech-tag">WPILib</span>
          <span class="tech-tag">CTRE Phoenix 6</span>
          <span class="tech-tag">MapleSim (dyn4j)</span>
          <span class="tech-tag">PathPlanner</span>
          <span class="tech-tag">Java 17</span>
        </div>
      </div>

      <div class="domain-card">
        <div class="domain-index">03 / Browser Graphics</div>
        <h3 class="domain-title">3D Graphics &amp; Physics</h3>
        <p class="domain-desc">
          Real-time 60 FPS WebGL rendering, Cannon-es vehicle dynamics, and responsive camera mathematics.
        </p>
        <div class="domain-tech-chips">
          <span class="tech-tag">Three.js</span>
          <span class="tech-tag">Cannon-es</span>
          <span class="tech-tag">WebGL</span>
          <span class="tech-tag">GLSL</span>
          <span class="tech-tag">Vite</span>
        </div>
      </div>

      <div class="domain-card">
        <div class="domain-index">04 / Edge Intelligence</div>
        <h3 class="domain-title">On-Device Computer Vision</h3>
        <p class="domain-desc">
          Privacy-first mobile vision pipelines with rotation-invariant 3D vector geometry and async frame gating.
        </p>
        <div class="domain-tech-chips">
          <span class="tech-tag">Flutter</span>
          <span class="tech-tag">Dart</span>
          <span class="tech-tag">Google ML Kit</span>
          <span class="tech-tag">Android NDK</span>
          <span class="tech-tag">3D Geometry</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Direct Contact Note Banner -->
<section class="section section-rule">
  <div class="container">
    <div class="note-banner">
      <div>
        <h2 class="note-headline">Interested in collaborating or discussing an engineering role?</h2>
        <p class="note-text">
          Open to software engineering roles, robotics control projects, and ambitious builds.
        </p>
      </div>
      <div>
        <a href="{{ '/contact' | relative_url }}" class="btn-primary">Start a Conversation →</a>
      </div>
    </div>
  </div>
</section>
