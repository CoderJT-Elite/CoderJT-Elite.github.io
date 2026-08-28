---
layout: default
title: Home
description: John Tewolde — software engineer and robotics programmer based in Michigan. Full-stack platforms, physics simulations, and on-device computer vision.
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
      Software platforms, <em>physics simulations</em>, and autonomous systems.
    </h1>

    <p class="hero-lead">
      Architecting full-stack web applications, 250 Hz rigid-body simulations, and zero-latency on-device vision pipelines with mathematical rigor.
    </p>

    <div class="hero-actions">
      <a href="#selected-work" class="btn-primary">View Projects ↓</a>
      <a href="#interactive-lab" class="btn-secondary">Interactive Lab ⚡</a>
      <a href="{{ '/about' | relative_url }}" class="btn-link">About</a>
      <a href="{{ '/contact' | relative_url }}" class="btn-link">Contact</a>
    </div>

    <div class="hero-ledger">
      <div class="ledger-item">
        <span class="ledger-label">Location</span>
        <span class="ledger-value">Michigan, USA</span>
      </div>
      <div class="ledger-item">
        <span class="ledger-label">Stack</span>
        <span class="ledger-value">TypeScript, Java, Next.js, WPILib, Flutter</span>
      </div>
      <div class="ledger-item">
        <span class="ledger-label">Focus</span>
        <span class="ledger-value">Full-Stack, Robotics &amp; Vision</span>
      </div>
    </div>
  </div>
</section>

<!-- Interactive Engineering Laboratory -->
<section class="section section-rule" id="interactive-lab">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Interactive Lab</div>
      <div class="section-num">Kinematics &amp; Geometry</div>
    </div>

    <div class="lab-explainer-banner" id="labExplainerSwerve" style="display: none;"></div>
    <div class="lab-explainer-banner" id="labExplainerTriad" style="display: none;"></div>

    <div class="lab-widget">
      <div class="lab-tab-bar" role="tablist" aria-label="Visualizer Mode Selection">
        <button class="lab-tab active" id="tabSwerve" role="tab" aria-selected="true" aria-controls="labWorkspace">
          <span class="lab-tab-num">01</span> Swerve Kinematics (WPILib)
        </button>
        <button class="lab-tab" id="tabTriad" role="tab" aria-selected="false" aria-controls="labWorkspace">
          <span class="lab-tab-num">02</span> 3D Vector Triad (IEEE 2026)
        </button>
      </div>

      <div class="lab-workspace" id="labWorkspace">
        <div class="lab-canvas-container">
          <canvas id="kinematicsCanvas" width="560" height="380" aria-label="Interactive kinematics vector canvas visualizer"></canvas>
          <div class="canvas-hint">Drag points / adjust controls in real time</div>
        </div>

        <div class="lab-panel">
          <!-- Swerve Controls -->
          <div id="swerveControlsSection">
            <div class="panel-section-title">Chassis Velocity Inputs</div>
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
                <label for="sliderVx" class="slider-label"><span>Translation Vx</span><span class="slider-val-unit">m/s</span></label>
                <input type="range" id="sliderVx" min="-4.5" max="4.5" step="0.1" value="0">
              </div>
              <div class="slider-row">
                <label for="sliderVy" class="slider-label"><span>Translation Vy</span><span class="slider-val-unit">m/s</span></label>
                <input type="range" id="sliderVy" min="-4.5" max="4.5" step="0.1" value="2.5">
              </div>
              <div class="slider-row">
                <label for="sliderOmega" class="slider-label"><span>Angular &omega;</span><span class="slider-val-unit">rad/s</span></label>
                <input type="range" id="sliderOmega" min="-6.0" max="6.0" step="0.1" value="1.2">
              </div>
            </div>

            <div class="telemetry-box" id="swerveTelemetry"></div>
          </div>

          <!-- Triad Controls -->
          <div id="triadControlsSection" style="display: none;">
            <div class="panel-section-title">Joint Vector Triad</div>
            <div class="preset-pill-group" style="margin-bottom: 1rem;">
              <span class="preset-label">Presets:</span>
              <button class="preset-btn" data-triad-preset="standing">Standing (180°)</button>
              <button class="preset-btn" data-triad-preset="optimal">Squat (90°)</button>
              <button class="preset-btn" data-triad-preset="deep">Deep (70°)</button>
              <button class="preset-btn" data-triad-preset="quarter">Incline (135°)</button>
            </div>
            <div class="telemetry-box" id="triadTelemetry"></div>
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
      </div>

      <div class="filter-wrapper">
        <div class="filter-tablist" id="projectFilters" role="tablist" aria-label="Filter projects">
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
              <span>SaaS Platform</span>
              <span>·</span>
              <span class="badge-kpi">&lt; 50ms Latency</span>
            </div>
            <h3 class="case-title">ChaseUp</h3>
          </div>
          <p class="case-summary-one-line">
            Full-stack mechanics lien compliance and receivables engine built with Next.js App Router, Supabase, and PostgreSQL Row Level Security.
          </p>
          <div class="case-tech-list">
            <span class="tech-tag">Next.js</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Supabase</span>
            <span class="tech-tag">PostgreSQL (RLS)</span>
            <span class="tech-tag">Tailwind</span>
          </div>
          <div class="case-links">
            <a href="{{ '/work/chaseup/' | relative_url }}" class="btn-primary">Case Study →</a>
            <a href="https://chaseupapp.tech" target="_blank" rel="noopener noreferrer" class="live-link">Live App ↗</a>
          </div>
        </div>
      </article>

      <!-- Project 2: FRC 1506 Robot Architecture -->
      <article class="case-study exec-card" data-category="robotics">
        <div class="case-media case-media-banner-dark">
          <div class="media-badge-tag">FRC Team 1506 · Robotics</div>
          <div class="media-badge-title">Physics Sim &amp; Swerve Odometry</div>
          <div class="media-badge-chips">
            <span class="tech-tag">MapleSim (dyn4j)</span>
            <span class="tech-tag">WPILib Java</span>
          </div>
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">02</span>
              <span>/</span>
              <span>Robotics &amp; Simulation</span>
              <span>·</span>
              <span class="badge-kpi">250 Hz Physics Loop</span>
            </div>
            <h3 class="case-title">FRC 1506 Robot Architecture</h3>
          </div>
          <p class="case-summary-one-line">
            WPILib Java autonomous control architecture with 4ms desktop rigid-body physics simulation, swerve odometry, and AprilTag vision fusion.
          </p>
          <div class="case-tech-list">
            <span class="tech-tag">Java 17</span>
            <span class="tech-tag">WPILib</span>
            <span class="tech-tag">CTRE Phoenix 6</span>
            <span class="tech-tag">MapleSim</span>
            <span class="tech-tag">PathPlanner</span>
          </div>
          <div class="case-links">
            <a href="{{ '/work/frc-robot/' | relative_url }}" class="btn-primary">Case Study →</a>
            <a href="https://github.com/CoderJT-Elite/2026-Rebuild" target="_blank" rel="noopener noreferrer" class="live-link">GitHub ↗</a>
          </div>
        </div>
      </article>

      <!-- Project 3: Form Analyzer -->
      <article class="case-study exec-card" data-category="vision">
        <div class="case-media">
          <img src="{{ '/assets/img/form-analyzer-preview.png' | relative_url }}" alt="Form Analyzer biomechanical feedback interface" loading="lazy" width="1280" height="800">
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">03</span>
              <span>/</span>
              <span>Mobile &amp; Edge Vision</span>
              <span>·</span>
              <span class="badge-kpi">60 FPS On-Device</span>
            </div>
            <h3 class="case-title">Form Analyzer</h3>
          </div>
          <p class="case-summary-one-line">
            On-device Flutter biomechanical posture analyzer using Google ML Kit and rotation-invariant 3D Vector Triad Dot Product geometry (IEEE ISEC 2026).
          </p>
          <div class="case-tech-list">
            <span class="tech-tag">Flutter</span>
            <span class="tech-tag">Dart</span>
            <span class="tech-tag">Google ML Kit</span>
            <span class="tech-tag">3D Geometry</span>
          </div>
          <div class="case-links">
            <a href="{{ '/work/form-analyzer/' | relative_url }}" class="btn-primary">Case Study →</a>
            <a href="https://coderjt-elite.github.io/form_analyzer/" target="_blank" rel="noopener noreferrer" class="live-link">Project Site ↗</a>
          </div>
        </div>
      </article>

      <!-- Project 4: Neon Racer 3D -->
      <article class="case-study exec-card" data-category="3d">
        <div class="case-media">
          <img src="{{ '/assets/img/neon-racer-preview.png' | relative_url }}" alt="Neon Racer 3D game preview" loading="lazy" width="1280" height="800">
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">04</span>
              <span>/</span>
              <span>3D Graphics &amp; Physics</span>
              <span>·</span>
              <span class="badge-kpi">60 FPS / &lt; 3MB Bundle</span>
            </div>
            <h3 class="case-title">Neon Racer 3D</h3>
          </div>
          <p class="case-summary-one-line">
            Browser-native 3D racing simulation engineered with Three.js, Cannon-es raycast vehicle dynamics, AWD torque distribution, and WebGL.
          </p>
          <div class="case-tech-list">
            <span class="tech-tag">Three.js</span>
            <span class="tech-tag">Cannon-es</span>
            <span class="tech-tag">WebGL</span>
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">Vite</span>
          </div>
          <div class="case-links">
            <a href="{{ '/work/neon-racer-3d/' | relative_url }}" class="btn-primary">Case Study →</a>
            <a href="https://neon-racer-3d.vercel.app/" target="_blank" rel="noopener noreferrer" class="live-link">Play Demo ↗</a>
          </div>
        </div>
      </article>

      <!-- Project 5: Water Wrapped -->
      <article class="case-study exec-card" data-category="web">
        <div class="case-media case-media-banner-blue">
          <div class="media-badge-tag">Civic Tech · Open Data</div>
          <div class="media-badge-title">Interactive CCR Water Reports</div>
          <div class="media-badge-chips">
            <span class="tech-tag">React + Vite</span>
            <span class="tech-tag">Cloudflare Workers</span>
          </div>
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">05</span>
              <span>/</span>
              <span>Edge Web &amp; Open Data</span>
              <span>·</span>
              <span class="badge-kpi">&lt; 45ms Edge TTFB</span>
            </div>
            <h3 class="case-title">Water Wrapped</h3>
          </div>
          <p class="case-summary-one-line">
            Civic open data platform converting municipal drinking water quality reports into interactive mobile stories and accessible chemistry grids.
          </p>
          <div class="case-tech-list">
            <span class="tech-tag">React</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Cloudflare Workers</span>
            <span class="tech-tag">Supabase</span>
          </div>
          <div class="case-links">
            <a href="{{ '/work/water-wrapped/' | relative_url }}" class="btn-primary">Case Study →</a>
            <a href="https://github.com/JoshuaTewolde/WaterWrapped" target="_blank" rel="noopener noreferrer" class="live-link">GitHub ↗</a>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- Selected Research -->
<section class="section section-rule" id="research">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Scholarly Research</div>
      <div class="section-num">IEEE Publications</div>
    </div>

    <h2 class="section-headline">Peer-Reviewed Publications</h2>

    <div class="pub-compact-list">
      <div class="pub-compact-item">
        <div class="pub-compact-main">
          <span class="pub-venue">IEEE ISEC 2026</span>
          <span class="pub-compact-title">A Machine Learning Approach to Exercise Form Analysis</span>
          <span class="pub-compact-author">Author: John Tewolde</span>
        </div>
        <div class="pub-compact-actions">
          <button type="button" class="btn-cite" data-bibtex-id="tewolde2026machine">BibTeX</button>
          <a href="{{ '/work/form-analyzer/' | relative_url }}" class="btn-link">Case Study →</a>
        </div>
      </div>

      <div class="pub-compact-item">
        <div class="pub-compact-main">
          <span class="pub-venue">IEEE ISEC 2024</span>
          <span class="pub-compact-title">Use of Computer Vision and AI Techniques for Enhancing Performance at FIRST Robotics Competitions</span>
          <span class="pub-compact-author">Co-Author: John Tewolde</span>
        </div>
        <div class="pub-compact-actions">
          <button type="button" class="btn-cite" data-bibtex-id="tewolde2024computervision">BibTeX</button>
          <a href="{{ '/work/frc-robot/' | relative_url }}" class="btn-link">Case Study →</a>
        </div>
      </div>

      <div class="pub-compact-item">
        <div class="pub-compact-main">
          <span class="pub-venue">IEEE ISEC 2021</span>
          <span class="pub-compact-title">Filtered — Filtering Water Using a Variety of Efficient Filtration Methods</span>
          <span class="pub-compact-author">Author: John Tewolde</span>
        </div>
        <div class="pub-compact-actions">
          <button type="button" class="btn-cite" data-bibtex-id="tewolde2021filtered">BibTeX</button>
        </div>
      </div>

      <div class="pub-compact-item">
        <div class="pub-compact-main">
          <span class="pub-venue">IEEE ISEC 2021</span>
          <span class="pub-compact-title">Using Technology as a Means for Musical Outreach to Nursing Home Residents</span>
          <span class="pub-compact-author">Author: John Tewolde</span>
        </div>
        <div class="pub-compact-actions">
          <button type="button" class="btn-cite" data-bibtex-id="tewolde2021musicaloutreach">BibTeX</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Core Competencies Matrix -->
<section class="section section-rule" id="competencies">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Core Competencies</div>
      <div class="section-num">Technical Matrix</div>
    </div>

    <div class="matrix-grid">
      <div class="matrix-card">
        <h3 class="matrix-title">Full-Stack &amp; Cloud</h3>
        <p class="matrix-sub">Next.js, TypeScript, Supabase, PostgreSQL RLS, Cloudflare Workers, Tailwind</p>
      </div>

      <div class="matrix-card">
        <h3 class="matrix-title">Robotics &amp; Controls</h3>
        <p class="matrix-sub">WPILib, Java 17, CTRE Phoenix 6, MapleSim dyn4j, Limelight MegaTag2, PathPlanner</p>
      </div>

      <div class="matrix-card">
        <h3 class="matrix-title">3D Graphics &amp; Physics</h3>
        <p class="matrix-sub">Three.js, Cannon-es, WebGL, GLSL Shaders, Rigid-Body Vehicle Dynamics, Vite</p>
      </div>

      <div class="matrix-card">
        <h3 class="matrix-title">Edge Vision &amp; ML</h3>
        <p class="matrix-sub">Flutter, Dart, Google ML Kit, 3D Vector Geometry, Android NDK, On-Device Inference</p>
      </div>
    </div>
  </div>
</section>

<!-- Contact Note Banner -->
<section class="section section-rule">
  <div class="container">
    <div class="note-banner">
      <div>
        <h2 class="note-headline">Interested in collaborating or discussing an engineering role?</h2>
        <p class="note-text">Open to software engineering roles, robotics control systems, and ambitious builds.</p>
      </div>
      <div>
        <a href="{{ '/contact' | relative_url }}" class="btn-primary">Get in Touch →</a>
      </div>
    </div>
  </div>
</section>
