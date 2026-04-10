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
              <span class="form-error" id="nameError">Please enter your name.</span>
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" class="form-control" required placeholder="jane@example.com" autocomplete="email">
              <span class="form-error" id="emailError">Please enter a valid email address.</span>
            </div>
          </div>
          <div class="form-group">
            <label for="subject" class="form-label">Subject</label>
            <input type="text" id="subject" name="subject" class="form-control" placeholder="Project inquiry, collab, job offer...">
          </div>
          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea id="message" name="message" class="form-control" required placeholder="Tell me about your project, timeline, and budget..."></textarea>
            <span class="form-error" id="messageError">Please enter a message.</span>
          </div>
          <button type="submit" class="btn btn-primary magnetic-btn" id="submitBtn" style="width: 100%; margin-top: 0.5rem; font-size: 1.05rem">
            Send Message →
          </button>
        </form>
        <div class="form-success" id="formSuccess" role="status" aria-live="polite">
          <span class="form-success-icon">✓</span>
          <strong>Message sent!</strong> I'll get back to you within 24 hours.
        </div>
      </div>

    </div>
  </div>
</section>

<script>
  const form        = document.getElementById('contactForm');
  const btn         = document.getElementById('submitBtn');
  const successMsg  = document.getElementById('formSuccess');

  function showError(inputId, errorId) {
    document.getElementById(inputId).classList.add('invalid');
    document.getElementById(errorId).classList.add('visible');
  }
  function clearError(inputId, errorId) {
    document.getElementById(inputId).classList.remove('invalid');
    document.getElementById(errorId).classList.remove('visible');
  }

  // Live validation: clear error as soon as input is valid
  ['name', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      if (el.validity.valid) clearError(id, id + 'Error');
    });
  });

  if (form && btn) {
    form.addEventListener('submit', (e) => {
      let valid = true;

      const nameEl    = document.getElementById('name');
      const emailEl   = document.getElementById('email');
      const messageEl = document.getElementById('message');

      if (!nameEl.value.trim()) {
        showError('name', 'nameError'); valid = false;
      } else { clearError('name', 'nameError'); }

      if (!emailEl.validity.valid || !emailEl.value.trim()) {
        showError('email', 'emailError'); valid = false;
      } else { clearError('email', 'emailError'); }

      if (!messageEl.value.trim()) {
        showError('message', 'messageError'); valid = false;
      } else { clearError('message', 'messageError'); }

      if (!valid) { e.preventDefault(); return; }

      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Show success state after Formspree redirects back (or on JS submit)
      // For a full SPA experience without page reload, intercept and use fetch:
      e.preventDefault();
      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(res => {
        if (res.ok) {
          form.style.display = 'none';
          successMsg.classList.add('visible');
        } else {
          btn.textContent = 'Send Message →';
          btn.disabled = false;
          btn.textContent = 'Error — try again';
        }
      }).catch(() => {
        btn.textContent = 'Send Message →';
        btn.disabled = false;
      });
    });
  }
</script>
