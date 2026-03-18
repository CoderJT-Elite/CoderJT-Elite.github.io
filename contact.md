---
layout: default
title: Contact
description: Start a collaboration with John Tewolde.
---

<section class="section">
  <div class="container">
    <div class="contact-grid">
      
      <div class="reveal">
        <h1 class="hero-title" style="font-size: clamp(3rem, 6vw, 5rem); margin-bottom: 1.5rem;">
          <span class="gradient-text">Connect</span><br>with me
        </h1>
        <p class="hero-desc" style="margin-bottom: 3rem; max-width: 400px;">
          Whether it's a freelance inquiry, a full-time role, or just a cool idea to bounce around — drop a line. 
        </p>

        <div class="glass-panel" style="padding: 2rem; border-radius: var(--r-md); margin-bottom: 2rem;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-pure)">Response Time</h3>
          <p style="color: var(--text-mutated)">Usually within 24-48 business hours.</p>
        </div>
      </div>

      <div class="glass-panel reveal" style="padding: 3rem; border-radius: var(--r-md); transition-delay: 150ms;">
        <form action="https://formspree.io/f/mqalwpwn" method="POST">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" class="form-control" required placeholder="Jane Smith" autocomplete="name">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" class="form-control" required placeholder="jane@example.com" autocomplete="email">
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" class="form-control" required placeholder="Tell me about your project..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary magnetic-btn" style="width: 100%; margin-top: 1rem;">
            Send Electronically →
          </button>
        </form>
      </div>

    </div>
  </div>
</section>
