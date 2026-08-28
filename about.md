---
layout: default
title: About
description: Background, technical experience, research publications, and engineering principles of John Tewolde — software engineer and robotics lead programmer based in Michigan.
---

<section class="section section-hero">
  <div class="container">
    <div class="about-grid">

      <!-- Left Sidebar: Dossier / Profile Information (Strictly Typographical) -->
      <aside class="about-sidebar">
        <div class="profile-dossier">
          <div class="dossier-heading">Profile Dossier</div>

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
              <span class="dossier-val">Software Engineer &amp; Roboticist</span>
            </div>
            <div class="dossier-item">
              <span class="dossier-key">Core Disciplines</span>
              <span class="dossier-val">Full-Stack, Robotics, Computer Vision, Physics Sim</span>
            </div>
            <div class="dossier-item">
              <span class="dossier-key">Specialization</span>
              <span class="dossier-val">Kinematics &amp; Distributed Systems</span>
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

      <!-- Right Column: Narrative, Timeline, Research, Technical Stack -->
      <div class="about-story">

        <!-- Narrative Intro -->
        <div>
          <div class="section-meta-header" style="margin-bottom: 1.5rem;">
            <div class="section-caption">Background &amp; Approach</div>
          </div>
          <h1 style="font-size: clamp(2rem, 3.8vw, 2.75rem); margin-bottom: 1.5rem;">
            Software engineering grounded in mathematical rigor, physical modeling, and craft.
          </h1>

          <div class="story-prose">
            <p>
              Software engineer, robotics lead programmer, and researcher based in Michigan. My work spans full-stack platforms, physics-based robot simulations, real-time 3D browser graphics, and on-device computer vision.
            </p>
            <p>
              My engineering focus centers on architectural simplicity, hardware-aware optimization, and building robust production systems with mathematical rigor.
            </p>
          </div>
        </div>

        <!-- Experience Timeline -->
        <div class="timeline-block">
          <h2 class="block-title">Shipped Work &amp; Engineering Experience</h2>
          
          <div class="timeline-items">

            <div class="timeline-row">
              <div class="timeline-year">2024 – Present</div>
              <div class="timeline-content">
                <h3>Founder &amp; Lead Engineer — ChaseUp</h3>
                <ul class="case-notes" style="margin: 0.5rem 0 0.75rem;">
                  <li>Architected multi-tenant SaaS platform on Next.js, Supabase, and PostgreSQL RLS.</li>
                  <li>Engineered 50-state statutory mechanics lien rules engine and retainage ledgers.</li>
                </ul>
                <div>
                  <a href="{{ '/work/chaseup/' | relative_url }}" class="btn-link" style="font-size: 0.85rem;">View ChaseUp Technical Deep Dive →</a>
                </div>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2023 – Present</div>
              <div class="timeline-content">
                <h3>Lead Programmer &amp; Simulation Architect — FRC Team 1506 (Metal Muscle)</h3>
                <ul class="case-notes" style="margin: 0.5rem 0 0.75rem;">
                  <li>Built 250 Hz (4ms) MapleSim dyn4j physics simulation to validate autonomous routines.</li>
                  <li>Integrated CTRE Phoenix 6 swerve odometry with dual Limelight AprilTag pose fusion.</li>
                  <li>Developed shoot-on-the-move ballistic targeting math compensating for robot momentum.</li>
                </ul>
                <div>
                  <a href="{{ '/work/frc-robot/' | relative_url }}" class="btn-link" style="font-size: 0.85rem;">View FRC 1506 Robot Architecture →</a>
                </div>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2023 – Present</div>
              <div class="timeline-content">
                <h3>Mobile &amp; ML Developer — Form Analyzer</h3>
                <ul class="case-notes" style="margin: 0.5rem 0 0.75rem;">
                  <li>Formulated rotation-invariant 3D Vector Triad Dot Product engine for joint angles.</li>
                  <li>Implemented asynchronous isBusy frame locking maintaining 60 FPS on-device.</li>
                  <li>Published research paper at IEEE ISEC 2026.</li>
                </ul>
                <div>
                  <a href="{{ '/work/form-analyzer/' | relative_url }}" class="btn-link" style="font-size: 0.85rem;">View Form Analyzer Case Study &amp; Math →</a>
                </div>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2025 – Present</div>
              <div class="timeline-content">
                <h3>Creator &amp; Full-Stack Architect — Water Wrapped</h3>
                <ul class="case-notes" style="margin: 0.5rem 0 0.75rem;">
                  <li>Deployed whitelabel civic open data platform on Cloudflare Workers edge network.</li>
                  <li>Built gesture-driven mobile tap-through story engine and EPA MCL validators.</li>
                </ul>
                <div>
                  <a href="{{ '/work/water-wrapped/' | relative_url }}" class="btn-link" style="font-size: 0.85rem;">View Water Wrapped Edge Architecture →</a>
                </div>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2024</div>
              <div class="timeline-content">
                <h3>Graphics &amp; Physics Developer — Neon Racer 3D</h3>
                <ul class="case-notes" style="margin: 0.5rem 0 0.75rem;">
                  <li>Engineered 60 FPS browser racing simulation with Three.js and Cannon-es physics.</li>
                  <li>Implemented AWD torque distribution, raycast suspension, and dual-spring camera tracking.</li>
                </ul>
                <div>
                  <a href="{{ '/work/neon-racer-3d/' | relative_url }}" class="btn-link" style="font-size: 0.85rem;">View Neon Racer 3D Graphics Breakdown →</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Published Research & Papers -->
        <div class="timeline-block" id="research">
          <h2 class="block-title">Published Research &amp; Scholarly Papers</h2>
          
          <div class="pub-list">

            <!-- Paper 1 -->
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
                <a href="{{ '/work/form-analyzer/' | relative_url }}" class="btn-link">View Case Study &amp; Formula →</a>
              </div>
            </div>

            <!-- Paper 2 -->
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
                <a href="{{ '/work/frc-robot/' | relative_url }}" class="btn-link">View Robot Case Study →</a>
              </div>
            </div>

            <!-- Paper 3 -->
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

            <!-- Paper 4 -->
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
        </div>

        <!-- Technical Stack & Toolchain -->
        <div class="timeline-block">
          <h2 class="block-title">Technical Stack &amp; Toolchain</h2>

          <div class="stack-grid">
            <div class="stack-box">
              <div class="stack-category">Core Languages</div>
              <div class="stack-pills">
                <span class="tech-tag">Java</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">JavaScript (ES6+)</span>
                <span class="tech-tag">Python</span>
                <span class="tech-tag">Dart</span>
                <span class="tech-tag">SQL</span>
                <span class="tech-tag">HTML5 / SCSS</span>
              </div>
            </div>

            <div class="stack-box">
              <div class="stack-category">Web &amp; Cloud Systems</div>
              <div class="stack-pills">
                <span class="tech-tag">Next.js (App Router)</span>
                <span class="tech-tag">React</span>
                <span class="tech-tag">Tailwind CSS</span>
                <span class="tech-tag">Supabase</span>
                <span class="tech-tag">PostgreSQL (RLS)</span>
                <span class="tech-tag">Cloudflare Workers</span>
                <span class="tech-tag">Node.js</span>
              </div>
            </div>

            <div class="stack-box">
              <div class="stack-category">Robotics &amp; Control Systems</div>
              <div class="stack-pills">
                <span class="tech-tag">WPILib</span>
                <span class="tech-tag">CTRE Phoenix 6</span>
                <span class="tech-tag">MapleSim (dyn4j)</span>
                <span class="tech-tag">PathPlanner</span>
                <span class="tech-tag">Limelight MegaTag2</span>
                <span class="tech-tag">Pigeon 2 IMU</span>
                <span class="tech-tag">Swerve Kinematics</span>
              </div>
            </div>

            <div class="stack-box">
              <div class="stack-category">3D Graphics &amp; Mathematics</div>
              <div class="stack-pills">
                <span class="tech-tag">Three.js</span>
                <span class="tech-tag">Cannon-es Physics</span>
                <span class="tech-tag">WebGL</span>
                <span class="tech-tag">GLSL Shaders</span>
                <span class="tech-tag">Vector Geometry</span>
                <span class="tech-tag">Vite</span>
              </div>
            </div>

            <div class="stack-box" style="grid-column: 1 / -1;">
              <div class="stack-category">Machine Learning, Vision &amp; Mobile</div>
              <div class="stack-pills">
                <span class="tech-tag">Flutter</span>
                <span class="tech-tag">Google ML Kit</span>
                <span class="tech-tag">MediaPipe Pose Estimation</span>
                <span class="tech-tag">TensorFlow Lite</span>
                <span class="tech-tag">Android NDK</span>
                <span class="tech-tag">Finite State Machines</span>
                <span class="tech-tag">Git / GitHub CI</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
