---
layout: default
title: About
description: Background, experience, and engineering principles of John Tewolde — software engineer based in Michigan.
---

<section class="section section-hero">
  <div class="container">
    <div class="about-grid">

      <!-- Left Sidebar: Dossier / Profile Information -->
      <aside class="about-sidebar">
        <div class="profile-dossier">
          <div class="dossier-heading">Profile &amp; Details</div>

          <div class="dossier-list">
            <div class="dossier-item">
              <span class="dossier-key">Name</span>
              <span class="dossier-val">John Tewolde</span>
            </div>
            <div class="dossier-item">
              <span class="dossier-key">Base</span>
              <span class="dossier-val">Michigan, United States</span>
            </div>
            <div class="dossier-item">
              <span class="dossier-key">Role</span>
              <span class="dossier-val">Software Engineer</span>
            </div>
            <div class="dossier-item">
              <span class="dossier-key">Core Disciplines</span>
              <span class="dossier-val">Full-Stack, WebGL, Computer Vision</span>
            </div>
            <div class="dossier-item">
              <span class="dossier-key">Focus</span>
              <span class="dossier-val">Web Architecture &amp; 3D Graphics</span>
            </div>
            <div class="dossier-item">
              <span class="dossier-key">Status</span>
              <span class="dossier-val">Open to Roles &amp; Contracts</span>
            </div>
          </div>

          <a href="{{ '/contact' | relative_url }}" class="btn-primary" style="width: 100%; justify-content: center;">
            Contact John →
          </a>
        </div>
      </aside>

      <!-- Right Column: Narrative, Timeline, Technical Stack -->
      <div class="about-story">

        <div>
          <div class="section-meta-header" style="margin-bottom: 1.5rem;">
            <div class="section-caption">Background &amp; Approach</div>
          </div>
          <h1 style="font-size: clamp(2.2rem, 4vw, 3rem); margin-bottom: 2rem;">
            Software engineering grounded in craftsmanship, performance, and execution.
          </h1>

          <div class="story-prose">
            <p>
              I am a software engineer based in Michigan. I specialize in building complete full-stack web applications, real-time 3D interactive graphics simulations, and on-device computer vision systems.
            </p>
            <p>
              My path into software development is driven by a deep curiosity for how complex systems behave under the hood. I enjoy tackling problems that require both clean architectural thinking and direct mathematical implementation—whether that means implementing statutory lien deadline algorithms in <strong>ChaseUp</strong>, modeling vehicle wheel slip angles and torque vectors in <strong>Neon Racer 3D</strong>, or calculating real-time joint angles from camera feeds in <strong>Form Analyzer</strong>.
            </p>
            <p>
              My engineering philosophy centers on architectural simplicity, rigorous edge-case testing, and continuous optimization until systems are fast, reliable, and maintainable.
            </p>
          </div>
        </div>

        <!-- Experience Timeline -->
        <div class="timeline-block">
          <h2 class="block-title">Shipped Work &amp; Experience</h2>
          
          <div class="timeline-items">
            <div class="timeline-row">
              <div class="timeline-year">2024 – Present</div>
              <div class="timeline-content">
                <h3>Founder &amp; Lead Engineer — ChaseUp</h3>
                <p>
                  Architected and shipped a specialized SaaS platform for commercial and residential trade subcontractors. Built automated invoice follow-up workflows, retainage tracking dashboards, and state-specific statutory mechanics lien calculation engines using Next.js, Supabase, and PostgreSQL.
                </p>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2024</div>
              <div class="timeline-content">
                <h3>Graphics &amp; Physics Developer — Neon Racer 3D</h3>
                <p>
                  Engineered a standalone 3D browser racing game with Three.js and Cannon-es. Built custom rigid-body vehicle dynamics (AWD power distribution, drift mechanics, and suspension dampening) running at a consistent 60 FPS in modern web browsers without third-party game engine runtimes.
                </p>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2023 – Present</div>
              <div class="timeline-content">
                <h3>Mobile &amp; ML Developer — Form Analyzer</h3>
                <p>
                  Developed a cross-platform mobile application using Flutter and Google ML Kit for real-time exercise posture and biomechanical analysis. Implemented on-device geometric analysis to verify joint angles with zero server upload latency.
                </p>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2023</div>
              <div class="timeline-content">
                <h3>Engineering Foundations &amp; Exploration</h3>
                <p>
                  Built extensive foundational work across TypeScript, WebGL shaders, relational database modeling, and mobile application architectures, establishing an end-to-end technical foundation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Technical Stack & Toolchain -->
        <div class="timeline-block">
          <h2 class="block-title">Technical Stack &amp; Toolchain</h2>

          <div class="stack-grid">
            <div class="stack-box">
              <div class="stack-category">Frontend &amp; Application Layer</div>
              <div class="stack-pills">
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">React</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">JavaScript (ES6+)</span>
                <span class="tech-tag">Tailwind CSS</span>
                <span class="tech-tag">HTML5 / SCSS</span>
              </div>
            </div>

            <div class="stack-box">
              <div class="stack-category">Backend, Storage &amp; Auth</div>
              <div class="stack-pills">
                <span class="tech-tag">Supabase</span>
                <span class="tech-tag">PostgreSQL</span>
                <span class="tech-tag">Row Level Security</span>
                <span class="tech-tag">Node.js</span>
                <span class="tech-tag">REST APIs</span>
              </div>
            </div>

            <div class="stack-box">
              <div class="stack-category">3D Graphics &amp; Mathematics</div>
              <div class="stack-pills">
                <span class="tech-tag">Three.js</span>
                <span class="tech-tag">Cannon-es</span>
                <span class="tech-tag">WebGL</span>
                <span class="tech-tag">GLSL Shaders</span>
                <span class="tech-tag">Vite</span>
              </div>
            </div>

            <div class="stack-box">
              <div class="stack-category">Mobile &amp; Edge Vision</div>
              <div class="stack-pills">
                <span class="tech-tag">Flutter</span>
                <span class="tech-tag">Dart</span>
                <span class="tech-tag">Google ML Kit</span>
                <span class="tech-tag">Pose Estimation</span>
                <span class="tech-tag">Git / GitHub</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
