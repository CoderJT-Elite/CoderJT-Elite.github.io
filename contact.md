---
layout: default
title: Contact
description: Get in touch with John Tewolde — open to freelance, full-time, and collaboration.
---

<section class="section">
  <div class="container">
    <div class="contact-grid">

      <div class="contact-info">
        <div class="reveal">
          <span class="section-label">// let's work</span>
          <h1><span class="gradient-text">Get in<br>touch.</span></h1>
        </div>
        <p class="reveal" style="transition-delay: 0.1s; margin-top: 1.5rem">
          Whether it's a freelance inquiry, a full-time role, or just a cool idea to bounce around — I'd love to hear from you. I reply within 24 hours.
        </p>

        <div class="contact-meta reveal" style="transition-delay: 0.2s">
          <div class="contact-meta-item glass-panel">
            <div class="contact-meta-icon">⏱</div>
            <div>
              <div class="contact-meta-label">Response Time</div>
              <div class="contact-meta-val">Within 24 hours</div>
            </div>
          </div>
          <a href="https://github.com/CoderJT-Elite" target="_blank" rel="noopener noreferrer" class="contact-meta-item glass-panel" style="text-decoration:none; transition: border-color 0.18s">
            <div class="contact-meta-icon">🐙</div>
            <div>
              <div class="contact-meta-label">GitHub</div>
              <div class="contact-meta-val">CoderJT-Elite ↗</div>
            </div>
          </a>
          <div class="contact-meta-item glass-panel">
            <div class="contact-meta-icon">📍</div>
            <div>
              <div class="contact-meta-label">Location</div>
              <div class="contact-meta-val">Michigan, USA</div>
            </div>
          </div>
          <div class="contact-meta-item glass-panel">
            <div class="contact-meta-icon">💼</div>
            <div>
              <div class="contact-meta-label">Status</div>
              <div class="contact-meta-val" style="color: var(--accent)">Open to Work</div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-panel glass-panel reveal" style="transition-delay: 0.15s">
        <form action="https://formspree.io/f/mqalwpwn" method="POST" id="contactForm" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input type="text" id="name" name="name" class="form-control" required placeholder="Jane Smith" autocomplete="name">
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" class="form-control" required placeholder="jane@example.com" autocomplete="email">
            </div>
          </div>
          <div class="form-group">
            <label for="subject" class="form-label">Subject</label>
            <input type="text" id="subject" name="subject" class="form-control" placeholder="Project inquiry, collab, job offer...">
          </div>
          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea id="message" name="message" class="form-control" required placeholder="Tell me about your project, timeline, and budget..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary magnetic-btn" id="submitBtn" style="width: 100%; margin-top: 0.5rem; font-size: 1.05rem">
            Send Message →
          </button>
        </form>
      </div>

    </div>
  </div>
</section>

<script>
  // Minimal form UX feedback
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('submitBtn');
  if (form && btn) {
    form.addEventListener('submit', () => {
      btn.textContent = 'Sending…';
      btn.disabled = true;
    });
  }
</script>
