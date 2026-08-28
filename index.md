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
      I'm John Tewolde. I architect full-stack web platforms, simulate rigid-body robot dynamics, deploy on-device computer vision pipelines, and build software systems with mathematical rigor and craftsmanship.
    </p>

    <div class="hero-actions">
      <a href="#selected-work" class="btn-primary">View Selected Work ↓</a>
      <a href="{{ '/about' | relative_url }}" class="btn-link">Read Background &amp; Approach</a>
      <a href="{{ '/contact' | relative_url }}" class="btn-link">Get in Touch</a>
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

<!-- Selected Work Section -->
<section class="section section-rule" id="selected-work">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Selected Projects</div>
      <div class="section-num">01 — 05</div>
    </div>

    <h2 class="section-headline">Featured Engineering Work</h2>
    <p class="section-intro-text" style="margin-bottom: 3.5rem;">
      A selection of software platforms, robotics control systems, and simulations architected and shipped to production.
    </p>

    <div class="project-case-list">

      <!-- Project 1: ChaseUp -->
      <article class="case-study">
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
          <p class="case-summary">
            A dedicated invoicing and compliance platform engineered for trade subcontractors to manage receivables, automate reminder sequences, track retainage withholdings, and calculate statutory mechanics lien deadlines.
          </p>
          <ul class="case-notes">
            <li>State-by-state statutory rules engine calculating preliminary notice and mechanics lien filing deadlines based on project milestone dates.</li>
            <li>Automated multi-tier notification pipelines reducing manual receivables follow-up for trade contractors.</li>
            <li>Full-stack architecture built on Next.js App Router, Supabase authentication, and PostgreSQL with Row Level Security.</li>
          </ul>
          <div class="case-tech-list">
            <span class="tech-tag">Next.js</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Supabase</span>
            <span class="tech-tag">PostgreSQL</span>
            <span class="tech-tag">Tailwind CSS</span>
          </div>
          <div class="case-links">
            <a href="https://chaseupapp.tech" target="_blank" rel="noopener noreferrer" class="live-link">
              Visit Live Platform ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Project 2: FRC 1506 Autonomous Robot & Simulation Architecture -->
      <article class="case-study">
        <div class="case-media" style="padding: 2.5rem 2rem; background: #18181b; color: #f4f3ed; display: flex; flex-direction: column; justify-content: space-between; min-height: 280px;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem;">
              FRC Team 1506 Metal Muscle · Robotics
            </div>
            <h4 style="font-family: var(--font-serif); font-size: 1.5rem; color: #ffffff; font-weight: 500; line-height: 1.25; margin-bottom: 1rem;">
              Physics-Based Simulation &amp; Swerve Odometry
            </h4>
            <p style="font-size: 0.88rem; color: #d4d4d8; line-height: 1.6;">
              Decoupling autonomous routine development from physical robot hardware via dyn4j rigid-body dynamics, CTRE Phoenix 6 swerve drive, and dual Limelight AprilTag vision fusion.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.7rem; background: rgba(255,255,255,0.1); color: #e4e4e7; padding: 0.2rem 0.5rem; border-radius: 3px;">MapleSim (dyn4j)</span>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; background: rgba(255,255,255,0.1); color: #e4e4e7; padding: 0.2rem 0.5rem; border-radius: 3px;">WPILib Java</span>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; background: rgba(255,255,255,0.1); color: #e4e4e7; padding: 0.2rem 0.5rem; border-radius: 3px;">Limelight Vision</span>
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
          <p class="case-summary">
            Autonomous control system and desktop physics simulation infrastructure for FIRST Robotics Competition Team 1506 (Metal Muscle), enabling rapid autonomous prototyping, multi-camera pose estimation, and ballistic targeting.
          </p>
          <ul class="case-notes">
            <li>Spearheaded MapleSim rigid-body simulation (dyn4j engine) stepping swerve physics at 4ms, simulating mass, wheel slip, and wall collisions.</li>
            <li>Integrated field pose localization fusing dual Limelight AprilTag vision with Pigeon 2 IMU sensor feeds for centimeter-accurate field awareness.</li>
            <li>Implemented projectile trajectory mathematics and quadratic regression equations for real-time turret velocity and shoot-on-the-move (SOTM) macros.</li>
          </ul>
          <div class="case-tech-list">
            <span class="tech-tag">Java 17</span>
            <span class="tech-tag">WPILib</span>
            <span class="tech-tag">CTRE Phoenix 6</span>
            <span class="tech-tag">MapleSim</span>
            <span class="tech-tag">PathPlanner</span>
            <span class="tech-tag">Limelight MegaTag2</span>
          </div>
          <div class="case-links">
            <a href="https://github.com/CoderJT-Elite/2026-Rebuild" target="_blank" rel="noopener noreferrer" class="live-link">
              View Robot Codebase ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Project 3: Form Analyzer -->
      <article class="case-study">
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
          <p class="case-summary">
            An on-device biomechanical coaching application that tracks athletic posture and exercise repetitions in real time using computer vision without transmitting video to remote servers. Published at IEEE ISEC 2026.
          </p>
          <ul class="case-notes">
            <li>Vector Triad Dot Product analysis constructing 3D joint vectors to solve interior joint angles via rotation-invariant Law of Cosines heuristics.</li>
            <li>Asynchronous inference gating and landmark confidence thresholding maintaining 30–60 FPS UI performance with zero cloud latency.</li>
            <li>Real-time coaching finite state machine (FSM) tracking eccentric and concentric movement phases with instant Text-to-Speech corrective feedback.</li>
          </ul>
          <div class="case-tech-list">
            <span class="tech-tag">Flutter</span>
            <span class="tech-tag">Dart</span>
            <span class="tech-tag">Google ML Kit</span>
            <span class="tech-tag">3D Vector Geometry</span>
            <span class="tech-tag">Android NDK</span>
          </div>
          <div class="case-links">
            <a href="https://coderjt-elite.github.io/form_analyzer/" target="_blank" rel="noopener noreferrer" class="live-link">
              Project Details &amp; Research ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Project 4: Neon Racer 3D -->
      <article class="case-study">
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
          <p class="case-summary">
            A real-time 3D racing simulation running natively in the browser without third-party game engines or external runtimes, featuring custom vehicle dynamics and arcade mechanics.
          </p>
          <ul class="case-notes">
            <li>Custom rigid-body physics integration via Cannon-es simulating all-wheel-drive torque distribution, tire friction curves, suspension damping, and drift angles.</li>
            <li>Optimized Three.js rendering pipeline with dynamic chase cameras, custom particle systems, and lightweight asset loading.</li>
            <li>Maintains a stable 60 frames per second across modern mobile and desktop browsers with low memory footprint.</li>
          </ul>
          <div class="case-tech-list">
            <span class="tech-tag">Three.js</span>
            <span class="tech-tag">Cannon-es</span>
            <span class="tech-tag">WebGL</span>
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">Vite</span>
          </div>
          <div class="case-links">
            <a href="https://neon-racer-3d.vercel.app/" target="_blank" rel="noopener noreferrer" class="live-link">
              Play in Browser ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Project 5: Water Wrapped -->
      <article class="case-study">
        <div class="case-media" style="padding: 2.5rem 2rem; background: #0f172a; color: #f8fafc; display: flex; flex-direction: column; justify-content: space-between; min-height: 280px;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem;">
              Civic Tech &amp; Environmental Data
            </div>
            <h4 style="font-family: var(--font-serif); font-size: 1.5rem; color: #ffffff; font-weight: 500; line-height: 1.25; margin-bottom: 1rem;">
              Water Wrapped: Interactive CCR Reports
            </h4>
            <p style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
              Transforming complex municipal drinking water Consumer Confidence Reports into engaging, tap-through stories and validated searchable chemistry tables.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.7rem; background: rgba(56, 189, 248, 0.15); color: #7dd3fc; padding: 0.2rem 0.5rem; border-radius: 3px;">React + Vite</span>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; background: rgba(56, 189, 248, 0.15); color: #7dd3fc; padding: 0.2rem 0.5rem; border-radius: 3px;">Cloudflare Workers</span>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; background: rgba(56, 189, 248, 0.15); color: #7dd3fc; padding: 0.2rem 0.5rem; border-radius: 3px;">Supabase</span>
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
          <p class="case-summary">
            A whitelabel interactive platform engineered to turn legally mandated municipal drinking water Consumer Confidence Reports (CCRs) into accessible mobile stories and searchable open data for residents.
          </p>
          <ul class="case-notes">
            <li>Dual presentation architecture featuring an Instagram/Spotify Wrapped style tap-through narrative alongside a full searchable data table.</li>
            <li>Whitelabel multi-utility routing deployed on Cloudflare Workers edge network with prerendered SEO shells and data schema validation gates.</li>
            <li>Zero-dependency local data mode with Supabase PostgreSQL synchronization for real-time analytics.</li>
          </ul>
          <div class="case-tech-list">
            <span class="tech-tag">React</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Vite</span>
            <span class="tech-tag">Cloudflare Workers</span>
            <span class="tech-tag">Supabase</span>
          </div>
          <div class="case-links">
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
<section class="section section-rule">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Scholarly Research</div>
      <div class="section-num">IEEE Publications</div>
    </div>

    <h2 class="section-headline">Selected Research &amp; Publications</h2>
    <p class="section-intro-text" style="margin-bottom: 3rem;">
      Peer-reviewed conference papers and technical research across computer vision, robotics, and applied systems.
    </p>

    <div class="pub-list">
      <div class="pub-card">
        <div class="pub-meta-line">
          <span class="pub-badge">IEEE Publication</span>
          <span class="pub-year">2026 · Princeton, NJ</span>
        </div>
        <h3 class="pub-title">A Machine Learning Approach to Exercise Form Analysis</h3>
        <p class="pub-authors">Author: John Tewolde</p>
        <p class="pub-venue">16th IEEE Integrated STEM Education Conference (ISEC 2026)</p>
        <p class="pub-abstract">
          Investigated the democratization of biomechanical feedback through edge-computing. Developed a rotation-invariant 3D Vector Dot Product engine utilizing Google MediaPipe/ML Kit pose landmarks, Android NDK performance gating, and Finite State Machine heuristics to detect exercise phases with real-time corrective voice feedback.
        </p>
      </div>

      <div class="pub-card">
        <div class="pub-meta-line">
          <span class="pub-badge">IEEE Publication</span>
          <span class="pub-year">2024 · Princeton, NJ</span>
        </div>
        <h3 class="pub-title">Use of Computer Vision and AI Techniques for Enhancing Performance at FIRST Robotics Competitions</h3>
        <p class="pub-authors">Co-Author: John Tewolde</p>
        <p class="pub-venue">14th IEEE Integrated STEM Education Conference (ISEC 2024)</p>
        <p class="pub-abstract">
          Analyzed the implementation of real-time machine learning object detection and AprilTag pose estimation pipelines on embedded coprocessors to improve autonomous robot localization and scoring accuracy in high-speed competitive environments.
        </p>
      </div>

      <div class="pub-card">
        <div class="pub-meta-line">
          <span class="pub-badge">IEEE Publication</span>
          <span class="pub-year">2021 · Princeton, NJ</span>
        </div>
        <h3 class="pub-title">Filtered — Filtering Water Using a Variety of Efficient Filtration Methods</h3>
        <p class="pub-authors">Author: John Tewolde</p>
        <p class="pub-venue">11th IEEE Integrated STEM Education Conference (ISEC 2021)</p>
        <p class="pub-abstract">
          Experimental study analyzing particulate and contaminant reduction across varied filtration media to evaluate low-cost, accessible water purification protocols for resource-constrained environments.
        </p>
      </div>

      <div class="pub-card">
        <div class="pub-meta-line">
          <span class="pub-badge">IEEE Publication</span>
          <span class="pub-year">2021 · Princeton, NJ</span>
        </div>
        <h3 class="pub-title">Using Technology as a Means for Musical Outreach to Nursing Home Residents</h3>
        <p class="pub-authors">Author: John Tewolde</p>
        <p class="pub-venue">11th IEEE Integrated STEM Education Conference (ISEC 2021)</p>
        <p class="pub-abstract">
          Explored digital delivery architectures and interactive engagement tools to support cognitive stimulation and connection for elderly residents in assisted living facilities during periods of physical isolation.
        </p>
      </div>
    </div>

    <div style="margin-top: 2rem;">
      <a href="{{ '/about' | relative_url }}#research" class="btn-link">View All Research on About Page →</a>
    </div>
  </div>
</section>

<!-- Domains of Practice / Technical Focus -->
<section class="section section-rule">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Core Competencies</div>
      <div class="section-num">Technical Focus</div>
    </div>

    <h2 class="section-headline">Areas of Engineering Practice</h2>
    <p class="section-intro-text" style="margin-bottom: 3rem;">
      Architectural principles and technical specializations across the software and hardware systems I engineer.
    </p>

    <div class="domains-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
      <div class="domain-card">
        <div class="domain-index">01 / Full-Stack Web Platforms</div>
        <h3 class="domain-title">Application Architecture</h3>
        <p class="domain-desc">
          Building production-grade web systems with Next.js, React, TypeScript, and relational databases. Prioritizing strict PostgreSQL schema design, Row Level Security, and edge routing.
        </p>
      </div>

      <div class="domain-card">
        <div class="domain-index">02 / Autonomous Systems &amp; Controls</div>
        <h3 class="domain-title">Robotics &amp; Control Theory</h3>
        <p class="domain-desc">
          Developing FRC swerve drivetrain kinematics, multi-camera AprilTag pose localization, and command-based autonomous state machines using WPILib, CTRE Phoenix 6, and MapleSim.
        </p>
      </div>

      <div class="domain-card">
        <div class="domain-index">03 / Browser Graphics &amp; Math</div>
        <h3 class="domain-title">3D Graphics &amp; Physics</h3>
        <p class="domain-desc">
          Creating interactive 3D browser simulations using WebGL, Three.js, and Cannon-es rigid-body physics. Focused on 60 FPS frame pacing, torque vectors, and responsive camera mathematics.
        </p>
      </div>

      <div class="domain-card">
        <div class="domain-index">04 / Edge Intelligence</div>
        <h3 class="domain-title">On-Device Computer Vision</h3>
        <p class="domain-desc">
          Implementing privacy-first mobile vision pipelines with Flutter, Dart, Google ML Kit, and Android NDK. Extracting 3D geometric heuristics directly on-device without cloud latency.
        </p>
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
          I'm open to software engineering positions, robotics control consulting, and ambitious software builds.
        </p>
      </div>
      <div>
        <a href="{{ '/contact' | relative_url }}" class="btn-primary">Start a Conversation →</a>
      </div>
    </div>
  </div>
</section>
