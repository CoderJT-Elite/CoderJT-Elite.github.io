---
layout: default
title: About
description: John Tewolde — software engineer based in Michigan building full-stack web applications, 3D graphics simulations, and on-device ML tools.
---

<section class="section section-hero">
  <div class="container">
    <div class="about-layout">

      <!-- Left Sidebar: Profile Card -->
      <aside class="about-sidebar">
        <div class="profile-card reveal">
          <div class="profile-header">
            <h2 class="profile-name">John Tewolde</h2>
            <p class="profile-role">Software Engineer & Builder</p>
          </div>

          <div class="profile-meta-list">
            <div class="profile-meta-item">
              <span class="meta-label">Location</span>
              <span class="meta-value">Michigan, USA</span>
            </div>
            <div class="profile-meta-item">
              <span class="meta-label">Core Focus</span>
              <span class="meta-value">Full-Stack, 3D WebGL, Edge ML</span>
            </div>
            <div class="profile-meta-item">
              <span class="meta-label">Shipped Projects</span>
              <span class="meta-value">ChaseUp, Neon Racer, Form Analyzer</span>
            </div>
            <div class="profile-meta-item">
              <span class="meta-label">Athletics</span>
              <span class="meta-value">Competitive Soccer Player</span>
            </div>
            <div class="profile-meta-item">
              <span class="meta-label">Status</span>
              <span class="meta-value" style="color: var(--accent-emerald)">Open to Opportunities</span>
            </div>
          </div>

          <a href="{{ '/contact' | relative_url }}" class="btn btn-primary" style="width: 100%;">
            Get in Touch →
          </a>
        </div>
      </aside>

      <!-- Right Column: Story, Timeline, Skills -->
      <div class="about-main-content">
        <div class="reveal">
          <span class="section-tag">About Me</span>
          <h1>Building software with craft and speed.</h1>
        </div>

        <div class="about-prose reveal">
          <p>
            I'm <strong>John Tewolde</strong>, a software developer based in Michigan. I build practical full-stack applications, interactive 3D web experiences, and mobile tools powered by on-device computer vision.
          </p>
          <p>
            My engineering work is driven by a simple goal: building software that solves concrete problems while maintaining high technical rigor. Whether designing a relational database schema for construction retainage compliance in <strong>ChaseUp</strong>, tuning rigid-body suspension physics in <strong>Neon Racer 3D</strong>, or calculating real-time joint angles in <strong>Form Analyzer</strong>, I focus on performance, clarity, and clean user experience.
          </p>
          <p>
            Outside of software development, I play competitive soccer. The spatial awareness, immediate tactical decisions, and disciplined daily training required on the pitch carry directly into how I approach software engineering: diagnose problems quickly, communicate clearly, and iterate relentlessly until the execution is right.
          </p>
        </div>

        <!-- Experience / Timeline -->
        <div class="timeline-section reveal">
          <h2 class="timeline-heading">Shipped Work & Experience</h2>
          <div class="timeline-list">

            <div class="timeline-entry">
              <div class="timeline-date">2024 – Present</div>
              <h3 class="timeline-role">Founder & Lead Developer — ChaseUp</h3>
              <p class="timeline-body">
                Architected and launched a vertical SaaS product for construction subcontractors. Built automated invoice follow-up workflows, retainage tracking dashboards, and automated mechanics lien deadline calculation rules using Next.js, Supabase, and PostgreSQL.
              </p>
            </div>

            <div class="timeline-entry">
              <div class="timeline-date">2024</div>
              <h3 class="timeline-role">Graphics & Physics Developer — Neon Racer 3D</h3>
              <p class="timeline-body">
                Engineered a standalone 3D browser racing game with Three.js and Cannon-es. Built a custom rigid-body vehicle dynamics model (AWD power distribution, drift mechanics, and suspension dampening) running at a consistent 60 FPS in modern browsers.
              </p>
            </div>

            <div class="timeline-entry">
              <div class="timeline-date">2023 – Present</div>
              <h3 class="timeline-role">Mobile ML Developer — Form Analyzer</h3>
              <p class="timeline-body">
                Built a cross-platform Flutter application utilizing Google ML Kit pose detection for real-time exercise biomechanics feedback. Implemented on-device geometric analysis to verify joint angles without external cloud processing. Featured as a Michigan 4-H state competition athletic technology submission.
              </p>
            </div>

            <div class="timeline-entry">
              <div class="timeline-date">2023</div>
              <h3 class="timeline-role">Core Engineering Foundations</h3>
              <p class="timeline-body">
                Focused deeply on TypeScript, modern browser graphics standards, relational database architecture, and mobile development pipelines, building the foundation for end-to-end product delivery.
              </p>
            </div>

          </div>
        </div>

        <!-- Categorized Technical Skills -->
        <div class="skills-section reveal">
          <h2 class="timeline-heading">Technical Arsenal</h2>
          <div class="skills-grid">

            <div class="skill-category">
              <h3 class="category-title">Frontend & Web</h3>
              <div class="category-tags">
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">React</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">JavaScript (ES6+)</span>
                <span class="tech-tag">Tailwind CSS</span>
                <span class="tech-tag">HTML5 / SCSS</span>
              </div>
            </div>

            <div class="skill-category">
              <h3 class="category-title">Backend & Data</h3>
              <div class="category-tags">
                <span class="tech-tag">Supabase</span>
                <span class="tech-tag">PostgreSQL</span>
                <span class="tech-tag">Node.js</span>
                <span class="tech-tag">REST APIs</span>
                <span class="tech-tag">Authentication / RLS</span>
              </div>
            </div>

            <div class="skill-category">
              <h3 class="category-title">3D & Graphics</h3>
              <div class="category-tags">
                <span class="tech-tag">Three.js</span>
                <span class="tech-tag">Cannon-es</span>
                <span class="tech-tag">WebGL</span>
                <span class="tech-tag">GLSL Shaders</span>
                <span class="tech-tag">Vite</span>
              </div>
            </div>

            <div class="skill-category">
              <h3 class="category-title">Mobile & Applied ML</h3>
              <div class="category-tags">
                <span class="tech-tag">Flutter</span>
                <span class="tech-tag">Dart</span>
                <span class="tech-tag">Google ML Kit</span>
                <span class="tech-tag">Computer Vision</span>
                <span class="tech-tag">Git / GitHub</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>
