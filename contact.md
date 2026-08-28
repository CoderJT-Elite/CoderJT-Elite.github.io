---
layout: default
title: Contact
description: Get in touch with John Tewolde — open to full-time engineering roles, technical contract work, and ambitious collaborations.
---

<section class="section section-hero">
  <div class="container">
    <div class="contact-grid">

      <!-- Left Column: Direct Info & Context -->
      <div class="contact-meta-col">
        <div>
          <div class="section-meta-header" style="margin-bottom: 1.5rem;">
            <div class="section-caption">Inquiries &amp; Correspondence</div>
          </div>
          <h1 style="font-size: clamp(2.2rem, 4vw, 3rem); margin-bottom: 1.25rem;">
            Let's start a conversation.
          </h1>
          <p class="contact-intro-lead">
            Whether you have an open engineering role, a technical architecture question, or an ambitious software build you'd like to discuss, feel free to send a message.
          </p>
        </div>

        <div class="channel-table">
          <div class="channel-row">
            <span class="channel-name">Direct Email</span>
            <a href="mailto:jg.tewolde@gmail.com" class="channel-link">
              jg.tewolde@gmail.com ↗
            </a>
          </div>

          <div class="channel-row">
            <span class="channel-name">GitHub</span>
            <a href="https://github.com/CoderJT-Elite" target="_blank" rel="noopener noreferrer" class="channel-link">
              github.com/CoderJT-Elite ↗
            </a>
          </div>

          <div class="channel-row">
            <span class="channel-name">Location</span>
            <span>Michigan, United States (EST)</span>
          </div>

          <div class="channel-row">
            <span class="channel-name">Response</span>
            <span>Typically within 24 hours</span>
          </div>

          <div class="channel-row">
            <span class="channel-name">Interests</span>
            <span>Full-Stack, Robotics Controls, Physics Sim, Edge ML</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Clean Editorial Form -->
      <div class="form-box">
        <form action="https://formspree.io/f/mqalwpwn" method="POST" id="contactForm">
          <div class="form-split">
            <div class="form-group">
              <label for="name" class="form-label">Your Name</label>
              <input type="text" id="name" name="name" class="form-input" required placeholder="Alex Morgan" autocomplete="name">
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input type="email" id="email" name="email" class="form-input" required placeholder="alex@example.com" autocomplete="email">
            </div>
          </div>

          <div class="form-group">
            <label for="subject" class="form-label">Subject / Purpose</label>
            <input type="text" id="subject" name="subject" class="form-input" required placeholder="Engineering role / project inquiry...">
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea id="message" name="message" class="form-textarea" required placeholder="Tell me about the role, project requirements, or timeline..."></textarea>
          </div>

          <button type="submit" class="btn-primary" id="submitBtn" style="width: 100%; justify-content: center; padding: 0.85rem 1.5rem; font-size: 0.95rem;">
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
