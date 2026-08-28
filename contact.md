---
layout: default
title: Contact
description: Get in touch with John Tewolde — open to full-time engineering roles, freelance builds, and technical collaborations.
---

<section class="section section-hero">
  <div class="container">
    <div class="contact-layout">

      <!-- Left Column: Direct Info -->
      <div class="contact-info-col">
        <div class="reveal">
          <span class="section-tag">Let's Connect</span>
          <h1>Get in touch.</h1>
          <p class="contact-intro">
            Whether you have an open software engineering role, a product build to discuss, or a technical question — feel free to reach out. I typically reply within 24 hours.
          </p>
        </div>

        <div class="contact-card-list reveal">
          <div class="contact-channel-card">
            <div class="channel-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <div class="channel-label">Response Time</div>
              <div class="channel-value">Within 24 hours</div>
            </div>
          </div>

          <a href="https://github.com/CoderJT-Elite" target="_blank" rel="noopener noreferrer" class="contact-channel-card">
            <div class="channel-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <div>
              <div class="channel-label">GitHub</div>
              <div class="channel-value">github.com/CoderJT-Elite ↗</div>
            </div>
          </a>

          <div class="contact-channel-card">
            <div class="channel-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <div class="channel-label">Location</div>
              <div class="channel-value">Michigan, USA</div>
            </div>
          </div>

          <div class="contact-channel-card">
            <div class="channel-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div>
              <div class="channel-label">Current Status</div>
              <div class="channel-value" style="color: var(--accent-emerald)">Open to Opportunities</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Contact Form -->
      <div class="form-panel-card reveal">
        <form action="https://formspree.io/f/mqalwpwn" method="POST" id="contactForm">
          <div class="form-row">
            <div class="form-group">
              <label for="name" class="form-label">Your Name</label>
              <input type="text" id="name" name="name" class="form-input" required placeholder="Alex Morgan" autocomplete="name">
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Your Email</label>
              <input type="email" id="email" name="email" class="form-input" required placeholder="alex@example.com" autocomplete="email">
            </div>
          </div>

          <div class="form-group">
            <label for="subject" class="form-label">Subject</label>
            <input type="text" id="subject" name="subject" class="form-input" required placeholder="Engineering role / project inquiry...">
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea id="message" name="message" class="form-textarea" required placeholder="Tell me about the project, role, or timeline..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary" id="submitBtn" style="width: 100%; padding: 0.9rem 1.5rem;">
            Send Message →
          </button>
        </form>
      </div>

    </div>
  </div>
</section>

<script>
  (function () {
    var form = document.getElementById('contactForm');
    var btn = document.getElementById('submitBtn');
    if (form && btn) {
      form.addEventListener('submit', function () {
        btn.textContent = 'Sending Message…';
        btn.disabled = true;
      });
    }
  })();
</script>
