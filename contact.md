---
layout: default
title: Contact
description: Get in touch with John Tewolde — open to software engineering roles, robotics controls projects, and technical collaborations.
---

<section class="section section-hero">
  <div class="container">
    <div class="contact-grid">

      <!-- Left Column: Direct Info & Context -->
      <div class="contact-meta-col">
        <div>
          <div class="section-meta-header" style="margin-bottom: 1rem;">
            <div class="section-caption">Inquiries &amp; Contact</div>
          </div>
          <h1 style="font-size: clamp(2rem, 3.5vw, 2.5rem); margin-bottom: 0.75rem;">
            Let's connect.
          </h1>
          <p class="contact-intro-lead">
            Open to software engineering roles, robotics control projects, and technical collaborations.
          </p>
        </div>

        <div class="channel-table">
          <div class="channel-row">
            <span class="channel-name">Email</span>
            <a href="mailto:jg.tewolde@gmail.com" class="channel-link">jg.tewolde@gmail.com ↗</a>
          </div>

          <div class="channel-row">
            <span class="channel-name">GitHub</span>
            <a href="https://github.com/CoderJT-Elite" target="_blank" rel="noopener noreferrer" class="channel-link">github.com/CoderJT-Elite ↗</a>
          </div>

          <div class="channel-row">
            <span class="channel-name">Location</span>
            <span>Michigan, USA (EST)</span>
          </div>

          <div class="channel-row">
            <span class="channel-name">Response</span>
            <span>Within 24 hours</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div class="form-box">
        <form action="https://formspree.io/f/mqalwpwn" method="POST" id="contactForm">
          <div class="form-split">
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input type="text" id="name" name="name" class="form-input" required placeholder="Alex Morgan" autocomplete="name">
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" class="form-input" required placeholder="alex@example.com" autocomplete="email">
            </div>
          </div>

          <div class="form-group">
            <label for="subject" class="form-label">Subject</label>
            <input type="text" id="subject" name="subject" class="form-input" required placeholder="Engineering role / project inquiry">
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea id="message" name="message" class="form-textarea" required placeholder="Project details, role scope, or timeline..."></textarea>
          </div>

          <button type="submit" class="btn-primary" id="submitBtn" style="width: 100%; justify-content: center; padding: 0.75rem 1.25rem;">
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
