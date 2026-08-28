---
layout: default
title: Home
description: John Tewolde — software engineer based in Michigan. Building full-stack web applications, real-time 3D physics simulations, and on-device computer vision systems.
---

<!-- Hero Section -->
<section class="section section-hero">
  <div class="container">
    <div class="hero-pretitle">
      <span>Software Engineer</span>
      <span>·</span>
      <span>Michigan, USA</span>
    </div>

    <h1 class="hero-heading">
      Building robust software, <em>real-time 3D graphics</em>, and practical machine learning tools.
    </h1>

    <p class="hero-lead">
      I'm John Tewolde. I design and build full-stack web platforms, browser-based physics engines, and privacy-first on-device computer vision applications with a focus on performance, mathematical rigor, and craftsmanship.
    </p>

    <div class="hero-actions">
      <a href="#selected-work" class="btn-primary">View Selected Work ↓</a>
      <a href="{{ '/about' | relative_url }}" class="btn-link">Read Background &amp; Story</a>
      <a href="{{ '/contact' | relative_url }}" class="btn-link">Get in Touch</a>
    </div>

    <div class="hero-ledger">
      <div class="ledger-item">
        <span class="ledger-label">Location</span>
        <span class="ledger-value">Michigan, United States</span>
      </div>
      <div class="ledger-item">
        <span class="ledger-label">Primary Stack</span>
        <span class="ledger-value">TypeScript, Next.js, Three.js, Flutter</span>
      </div>
      <div class="ledger-item">
        <span class="ledger-label">Availability</span>
        <span class="ledger-value">Engineering Roles &amp; Select Projects</span>
      </div>
    </div>
  </div>
</section>

<!-- Selected Work Section -->
<section class="section section-rule" id="selected-work">
  <div class="container">
    <div class="section-meta-header">
      <div class="section-caption">Selected Projects</div>
      <div class="section-num">01 — 03</div>
    </div>

    <h2 class="section-headline">Featured Engineering Work</h2>
    <p class="section-intro-text" style="margin-bottom: 3.5rem;">
      A selection of systems designed, architected, and shipped to production.
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

      <!-- Project 2: Neon Racer 3D -->
      <article class="case-study">
        <div class="case-media">
          <img src="{{ '/assets/img/neon-racer-preview.png' | relative_url }}" alt="Neon Racer 3D real-time browser game preview" loading="lazy" width="1280" height="800">
        </div>
        <div class="case-content">
          <div class="case-header">
            <div class="case-meta-line">
              <span class="case-index">02</span>
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
            An on-device biomechanical coaching application that tracks athletic posture and exercise repetitions in real time using computer vision without transmitting video to remote servers.
          </p>
          <ul class="case-notes">
            <li>Local pose landmark detection utilizing Google ML Kit to deliver instantaneous kinematic feedback with zero network latency.</li>
            <li>Real-time geometric vector math calculating knee angle, hip flexion, and spinal alignment to verify repetition quality.</li>
            <li>Asynchronous frame gating and confidence thresholding maintaining 30–60 FPS UI performance.</li>
          </ul>
          <div class="case-tech-list">
            <span class="tech-tag">Flutter</span>
            <span class="tech-tag">Dart</span>
            <span class="tech-tag">Google ML Kit</span>
            <span class="tech-tag">Computer Vision</span>
          </div>
          <div class="case-links">
            <a href="https://coderjt-elite.github.io/form_analyzer/" target="_blank" rel="noopener noreferrer" class="live-link">
              Project Details ↗
            </a>
          </div>
        </div>
      </article>

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
      Principles and architectural focus areas across the systems I build.
    </p>

    <div class="domains-grid">
      <div class="domain-card">
        <div class="domain-index">01 / Full-Stack Web Systems</div>
        <h3 class="domain-title">Application Architecture</h3>
        <p class="domain-desc">
          Building resilient web applications with Next.js, TypeScript, and relational databases. Prioritizing strict database schemas, robust authentication and access control, and predictable server-client state management.
        </p>
      </div>

      <div class="domain-card">
        <div class="domain-index">02 / Browser Graphics &amp; Math</div>
        <h3 class="domain-title">3D Graphics &amp; Physics</h3>
        <p class="domain-desc">
          Creating interactive 3D browser experiences using WebGL, Three.js, and rigid-body physics engines. Focused on smooth frame pacing, responsive camera mathematics, and minimal asset overhead.
        </p>
      </div>

      <div class="domain-card">
        <div class="domain-index">03 / Edge Intelligence</div>
        <h3 class="domain-title">On-Device Machine Learning</h3>
        <p class="domain-desc">
          Implementing privacy-first mobile vision pipelines with Flutter and Google ML Kit. Extracting kinematic and geometric data directly on the user's device without cloud processing latency or privacy risks.
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
          I'm open to full-time software engineering positions, technical contracts, and ambitious software builds.
        </p>
      </div>
      <div>
        <a href="{{ '/contact' | relative_url }}" class="btn-primary">Start a Conversation →</a>
      </div>
    </div>
  </div>
</section>
