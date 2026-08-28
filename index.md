---
layout: default
title: Home
description: John Tewolde — software engineer and creative builder developing full-stack SaaS platforms, real-time 3D web engines, and on-device ML applications.
---

<!-- Hero Section -->
<section class="section section-hero">
  <div class="container">
    <div class="reveal">
      <div class="badge-eyebrow">
        <span class="status-dot"></span>
        <span>Available for engineering roles & select projects</span>
      </div>
      <h1 class="hero-title">
        Software engineer <br class="hero-br">
        <span class="hero-title-subtle">& creative developer.</span>
      </h1>
      <p class="hero-description">
        I'm John Tewolde — an engineer based in Michigan. I design and build production-grade web applications, real-time 3D physics engines, and intelligent on-device computer vision tools.
      </p>
      <div class="hero-actions">
        <a href="#projects" class="btn btn-primary">View Featured Projects ↓</a>
        <a href="{{ '/about' | relative_url }}" class="btn btn-secondary">About Me</a>
        <a href="{{ '/contact' | relative_url }}" class="btn btn-secondary">Get in Touch</a>
      </div>

      <div class="quick-facts">
        <div class="fact-item">
          <span class="fact-value">3</span>
          <span class="fact-label">Shipped Applications</span>
        </div>
        <div class="fact-item">
          <span class="fact-value">Full-Stack + 3D</span>
          <span class="fact-label">Primary Technical Focus</span>
        </div>
        <div class="fact-item">
          <span class="fact-value">Michigan, USA</span>
          <span class="fact-label">Location & Base</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Featured Projects Section -->
<section class="section section-divider" id="projects">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-tag">Selected Work</span>
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-subtitle">
        Real software shipped to production — from vertical SaaS to browser physics engines and on-device pose estimation.
      </p>
    </div>

    <div class="projects-stack">

      <!-- Project 1: ChaseUp -->
      <article class="project-card reveal">
        <div class="project-media">
          <img src="{{ '/assets/img/chaseup-preview.png' | relative_url }}" alt="ChaseUp SaaS application dashboard interface" loading="lazy" width="1280" height="800">
        </div>
        <div class="project-details">
          <div>
            <div class="project-header-top">
              <span class="project-badge">SaaS Platform</span>
              <span class="project-year">2024 – Present</span>
            </div>
            <h3 class="project-title">ChaseUp</h3>
            <p class="project-summary">
              A specialized SaaS workflow tool built for trade subcontractors to manage invoice reminders, track retainage withholdings, and automate statutory mechanics lien deadline calculations.
            </p>
            <ul class="project-highlights">
              <li>Automated payment reminder schedules that cut manual receivables follow-up.</li>
              <li>State-by-state statutory mechanics lien and notice calculation engine.</li>
              <li>Full-stack architecture built with Next.js App Router, Supabase, and PostgreSQL.</li>
            </ul>
          </div>
          <div>
            <div class="project-tags">
              <span class="tech-tag">Next.js</span>
              <span class="tech-tag">TypeScript</span>
              <span class="tech-tag">Supabase</span>
              <span class="tech-tag">PostgreSQL</span>
              <span class="tech-tag">Tailwind CSS</span>
            </div>
            <div class="project-actions">
              <a href="https://chaseupapp.tech" target="_blank" rel="noopener noreferrer" class="project-link">
                Visit chaseupapp.tech ↗
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- Project 2: Neon Racer 3D -->
      <article class="project-card reveal">
        <div class="project-media">
          <img src="{{ '/assets/img/neon-racer-preview.png' | relative_url }}" alt="Neon Racer 3D browser racing game start screen" loading="lazy" width="1280" height="800">
        </div>
        <div class="project-details">
          <div>
            <div class="project-header-top">
              <span class="project-badge">Browser 3D Game</span>
              <span class="project-year">2024</span>
            </div>
            <h3 class="project-title">Neon Racer 3D</h3>
            <p class="project-summary">
              A real-time 3D racing simulation running natively in the browser without third-party game engines or plugins, featuring custom vehicle dynamics and arcade mechanics.
            </p>
            <ul class="project-highlights">
              <li>Integrated rigid-body physics with Cannon-es for suspension, tire grip, and drift calculations.</li>
              <li>Custom Three.js rendering pipeline with post-processing glow, dynamic chase cameras, and particle trails.</li>
              <li>Smooth 60 FPS performance maintained across mobile and desktop browsers.</li>
            </ul>
          </div>
          <div>
            <div class="project-tags">
              <span class="tech-tag">Three.js</span>
              <span class="tech-tag">Cannon-es</span>
              <span class="tech-tag">WebGL</span>
              <span class="tech-tag">JavaScript</span>
              <span class="tech-tag">Vite</span>
            </div>
            <div class="project-actions">
              <a href="https://neon-racer-3d.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
                Play Live at neon-racer-3d.vercel.app ↗
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- Project 3: Form Analyzer -->
      <article class="project-card reveal">
        <div class="project-media">
          <img src="{{ '/assets/img/form-analyzer-preview.png' | relative_url }}" alt="Form Analyzer biomechanical movement feedback application" loading="lazy" width="1280" height="800">
        </div>
        <div class="project-details">
          <div>
            <div class="project-header-top">
              <span class="project-badge">Mobile & Vision AI</span>
              <span class="project-year">2023 – Present</span>
            </div>
            <h3 class="project-title">Form Analyzer</h3>
            <p class="project-summary">
              An on-device biomechanical coaching application that tracks athletic posture and exercise repetitions in real time using computer vision.
            </p>
            <ul class="project-highlights">
              <li>Performs on-device pose estimation via Google ML Kit with zero video upload or cloud latency.</li>
              <li>Computes joint angle trigonometry in real time to assess squat depth, spine posture, and symmetry.</li>
              <li>Engineered as a Michigan 4-H state competition project in athletic technology.</li>
            </ul>
          </div>
          <div>
            <div class="project-tags">
              <span class="tech-tag">Flutter</span>
              <span class="tech-tag">Dart</span>
              <span class="tech-tag">Google ML Kit</span>
              <span class="tech-tag">Computer Vision</span>
            </div>
            <div class="project-actions">
              <a href="https://coderjt-elite.github.io/form_analyzer/" target="_blank" rel="noopener noreferrer" class="project-link">
                View Project Showcase ↗
              </a>
            </div>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- Core Focus / Capabilities Section -->
<section class="section section-divider">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-tag">Capabilities</span>
      <h2 class="section-title">Core Engineering Focus</h2>
      <p class="section-subtitle">
        Bridging high-performance application engineering with interactive 3D craft and applied machine learning.
      </p>
    </div>

    <div class="pillars-grid reveal">
      <div class="pillar-card">
        <div class="pillar-icon-box">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </div>
        <h3 class="pillar-title">Full-Stack Web Engineering</h3>
        <p class="pillar-desc">
          Building resilient web applications using Next.js, React, TypeScript, and relational databases. Strong emphasis on clear schema design, auth security, and fast initial page loads.
        </p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon-box">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <h3 class="pillar-title">3D Graphics & Physics</h3>
        <p class="pillar-desc">
          Creating hardware-accelerated 3D browser experiences using WebGL, Three.js, and physics engines like Cannon-es. Focused on smooth frame pacing, responsive camera math, and lightweight asset bundles.
        </p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon-box">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <h3 class="pillar-title">On-Device ML & Mobile</h3>
        <p class="pillar-desc">
          Implementing privacy-preserving edge ML pipelines using Flutter and Google ML Kit. Extracting real-time kinematic data from camera feeds without streaming raw video to external servers.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action Banner -->
<section class="section section-divider">
  <div class="container">
    <div class="cta-box reveal">
      <h2 class="cta-title">Looking for an engineer who builds end-to-end?</h2>
      <p class="cta-text">
        I'm actively seeking full-time software engineering roles, contract opportunities, and ambitious technical collaborations.
      </p>
      <div class="cta-actions">
        <a href="{{ '/contact' | relative_url }}" class="btn btn-primary">Start a Conversation →</a>
        <a href="https://github.com/CoderJT-Elite" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Explore GitHub</a>
      </div>
    </div>
  </div>
</section>
