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
          <h1 style="font-size: clamp(2.2rem, 4vw, 3rem); margin-bottom: 2rem;">
            Software engineering grounded in mathematical rigor, physical modeling, and craft.
          </h1>

          <div class="story-prose">
            <p>
              I am a software engineer, robotics lead programmer, and researcher based in Michigan. My work spans full-stack web platforms, physics-based robot simulations, real-time 3D browser graphics, and on-device computer vision algorithms.
            </p>
            <p>
              My development philosophy is driven by a focus on how complex systems behave under the hood. I enjoy tackling challenges that require both clean architectural abstractions and direct mathematical execution—whether that means implementing statutory lien deadline algorithms in <a href="{{ '/work/chaseup/' | relative_url }}"><strong>ChaseUp</strong></a>, modeling vehicle wheel slip angles and torque vectors in <a href="{{ '/work/neon-racer-3d/' | relative_url }}"><strong>Neon Racer 3D</strong></a>, proving rotation-invariant 3D vector heuristics for on-device motion coaching in <a href="{{ '/work/form-analyzer/' | relative_url }}"><strong>Form Analyzer</strong></a>, or simulating swerve drive dynamics in <a href="{{ '/work/frc-robot/' | relative_url }}"><strong>FRC 1506</strong></a>.
            </p>
            <p>
              Across every project, my engineering principles center on architectural simplicity, rigorous edge-case testing, hardware-aware optimization, and building systems that remain robust and performant in production.
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
                <p>
                  Architected and shipped a specialized SaaS platform for commercial and residential trade subcontractors. Engineered automated invoice follow-up sequences, retainage withholding ledgers, and state-by-state statutory mechanics lien calculation engines using Next.js, Supabase, and PostgreSQL with Row Level Security.
                </p>
                <div style="margin-top: 0.5rem;">
                  <a href="{{ '/work/chaseup/' | relative_url }}" class="btn-link" style="font-size: 0.85rem;">View ChaseUp Technical Deep Dive →</a>
                </div>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2023 – Present</div>
              <div class="timeline-content">
                <h3>Lead Programmer &amp; Simulation Architect — FRC Team 1506 (Metal Muscle)</h3>
                <p>
                  Lead the programming subteam for FRC Team 1506. Spearheaded MapleSim rigid-body physics simulation (dyn4j engine) stepping simulated swerve physics at 4ms to decouple autonomous software testing from hardware availability. Integrated multi-camera Limelight MegaTag2 AprilTag vision fusion, CTRE Phoenix 6 swerve controls, and quadratic ballistic equations for shoot-on-the-move routines.
                </p>
                <div style="margin-top: 0.5rem;">
                  <a href="{{ '/work/frc-robot/' | relative_url }}" class="btn-link" style="font-size: 0.85rem;">View FRC 1506 Robot Architecture →</a>
                </div>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2023 – Present</div>
              <div class="timeline-content">
                <h3>Mobile &amp; ML Developer — Form Analyzer</h3>
                <p>
                  Developed an on-device computer vision mobile application using Flutter, Dart, and Google ML Kit for real-time biomechanical analysis. Designed rotation-invariant Vector Triad Dot Product algorithms to calculate joint angles with zero server latency. Published research at the 16th IEEE Integrated STEM Education Conference (ISEC 2026).
                </p>
                <div style="margin-top: 0.5rem;">
                  <a href="{{ '/work/form-analyzer/' | relative_url }}" class="btn-link" style="font-size: 0.85rem;">View Form Analyzer Case Study &amp; Math →</a>
                </div>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2025 – Present</div>
              <div class="timeline-content">
                <h3>Creator &amp; Full-Stack Architect — Water Wrapped</h3>
                <p>
                  Built a whitelabel interactive civic tech platform converting dense municipal Consumer Confidence Reports into mobile-first tap-through stories and searchable water quality tables. Deployed on Cloudflare Workers edge network with prerendered SEO routing and local/Supabase data backends.
                </p>
                <div style="margin-top: 0.5rem;">
                  <a href="{{ '/work/water-wrapped/' | relative_url }}" class="btn-link" style="font-size: 0.85rem;">View Water Wrapped Edge Architecture →</a>
                </div>
              </div>
            </div>

            <div class="timeline-row">
              <div class="timeline-year">2024</div>
              <div class="timeline-content">
                <h3>Graphics &amp; Physics Developer — Neon Racer 3D</h3>
                <p>
                  Engineered a standalone 3D browser racing simulation with Three.js and Cannon-es. Built custom rigid-body vehicle dynamics (AWD power distribution, drift mechanics, and suspension dampening) running at a consistent 60 FPS in modern web browsers without external game engines.
                </p>
                <div style="margin-top: 0.5rem;">
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
              <p class="pub-authors">Author: John Tewolde</p>
              <p class="pub-venue">16th IEEE Integrated STEM Education Conference (ISEC 2026)</p>
              <p class="pub-abstract">
                Addresses the democratization of exercise feedback using edge computing. Integrates Flutter with Google MediaPipe/ML Kit pose detection, developing a rotation-invariant 3D Vector Dot Product heuristic engine to solve joint angles via the Law of Cosines alongside an asynchronous frame lock (isBusy guard) for 30–60 FPS mobile performance.
              </p>
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
              <p class="pub-authors">Co-Author: John Tewolde</p>
              <p class="pub-venue">14th IEEE Integrated STEM Education Conference (ISEC 2024)</p>
              <p class="pub-abstract">
                Evaluated machine learning object detection and AprilTag coordinate localization on high-speed competitive robotics platforms, exploring coprocessor integration, optical latency optimization, and field-relative targeting math.
              </p>
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
              <p class="pub-authors">Author: John Tewolde</p>
              <p class="pub-venue">11th IEEE Integrated STEM Education Conference (ISEC 2021)</p>
              <p class="pub-abstract">
                Experimental study analyzing particulate and contaminant reduction across varied filtration media to evaluate low-cost, accessible water purification protocols for resource-constrained environments.
              </p>
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
              <p class="pub-authors">Author: John Tewolde</p>
              <p class="pub-venue">11th IEEE Integrated STEM Education Conference (ISEC 2021)</p>
              <p class="pub-abstract">
                Explored digital delivery architectures and interactive engagement tools to support cognitive stimulation and connection for elderly residents in assisted living facilities during periods of physical isolation.
              </p>
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
