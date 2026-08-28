/**
 * John Tewolde — Engineering Portfolio
 * Client-side interactive engine: Theme Switcher, Project Filtering,
 * BibTeX Citation Modal & Copy Utility, Toast Notifications, and Scroll Reveals.
 */

(function () {
  'use strict';

  /* ── 1. BibTeX Citations Database ───────────────────────────── */
  var BIBTEX_ENTRIES = {
    'tewolde2026machine': {
      title: 'A Machine Learning Approach to Exercise Form Analysis',
      bibtex: `@inproceedings{tewolde2026machine,
  author    = {Tewolde, John},
  title     = {A Machine Learning Approach to Exercise Form Analysis},
  booktitle = {Proceedings of the 16th IEEE Integrated STEM Education Conference (ISEC)},
  year      = {2026},
  pages     = {1--6},
  publisher = {IEEE},
  address   = {Princeton, NJ, USA}
}`
    },
    'tewolde2024computervision': {
      title: 'Use of Computer Vision and AI Techniques for Enhancing Performance at FIRST Robotics Competitions',
      bibtex: `@inproceedings{tewolde2024computervision,
  author    = {Tewolde, John},
  title     = {Use of Computer Vision and AI Techniques for Enhancing Performance at FIRST Robotics Competitions},
  booktitle = {Proceedings of the 14th IEEE Integrated STEM Education Conference (ISEC)},
  year      = {2024},
  pages     = {1--5},
  publisher = {IEEE},
  address   = {Princeton, NJ, USA}
}`
    },
    'tewolde2021filtered': {
      title: 'Filtered — Filtering Water Using a Variety of Efficient Filtration Methods',
      bibtex: `@inproceedings{tewolde2021filtered,
  author    = {Tewolde, John},
  title     = {Filtered --- Filtering Water Using a Variety of Efficient Filtration Methods},
  booktitle = {Proceedings of the 11th IEEE Integrated STEM Education Conference (ISEC)},
  year      = {2021},
  pages     = {1--4},
  publisher = {IEEE},
  address   = {Princeton, NJ, USA}
}`
    },
    'tewolde2021musicaloutreach': {
      title: 'Using Technology as a Means for Musical Outreach to Nursing Home Residents',
      bibtex: `@inproceedings{tewolde2021musicaloutreach,
  author    = {Tewolde, John},
  title     = {Using Technology as a Means for Musical Outreach to Nursing Home Residents},
  booktitle = {Proceedings of the 11th IEEE Integrated STEM Education Conference (ISEC)},
  year      = {2021},
  pages     = {1--4},
  publisher = {IEEE},
  address   = {Princeton, NJ, USA}
}`
    }
  };

  /* ── 2. Toast Notification System ───────────────────────────── */
  var toastTimeout = null;
  function showToast(message) {
    var toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'site-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  /* ── 3. Theme Management ────────────────────────────────────── */
  function initTheme() {
    var toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    function getActiveTheme() {
      return document.documentElement.getAttribute('data-theme') || 'light';
    }

    function updateToggleButton(theme) {
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to warm light theme' : 'Switch to obsidian dark theme');
      toggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      var iconContainer = toggleBtn.querySelector('.theme-icon');
      if (iconContainer) {
        if (theme === 'dark') {
          iconContainer.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
        } else {
          iconContainer.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
        }
      }
    }

    updateToggleButton(getActiveTheme());

    toggleBtn.addEventListener('click', function () {
      var current = getActiveTheme();
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateToggleButton(next);
      showToast(next === 'dark' ? 'Switched to Obsidian Dark theme' : 'Switched to Warm Parchment theme');
    });

    // Listen for system changes if user hasn't explicitly set preference
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
          var sysTheme = e.matches ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', sysTheme);
          updateToggleButton(sysTheme);
        }
      });
    } catch (err) {}
  }

  /* ── 4. Project Category Filtering ──────────────────────────── */
  function initProjectFiltering() {
    var filterContainer = document.getElementById('projectFilters');
    if (!filterContainer) return;

    var filterButtons = filterContainer.querySelectorAll('.filter-btn');
    var projects = document.querySelectorAll('.project-case-list .case-study');
    var activeFilter = 'all';

    function applyFilter(category) {
      activeFilter = category;
      var visibleCount = 0;

      filterButtons.forEach(function (btn) {
        var isMatch = btn.getAttribute('data-filter') === category;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      projects.forEach(function (card) {
        var cardCat = card.getAttribute('data-category') || '';
        var cats = cardCat.split(/\s+/);
        var shouldShow = (category === 'all') || (cats.indexOf(category) !== -1);

        if (shouldShow) {
          card.classList.remove('is-hidden');
          visibleCount++;
        } else {
          card.classList.add('is-hidden');
        }
      });

      var countNotice = document.getElementById('filterCountNotice');
      if (countNotice) {
        if (category === 'all') {
          countNotice.textContent = 'Showing all ' + visibleCount + ' projects';
        } else {
          var label = '';
          filterButtons.forEach(function (b) {
            if (b.getAttribute('data-filter') === category) label = b.textContent.trim();
          });
          countNotice.textContent = 'Filtered: ' + visibleCount + ' project' + (visibleCount === 1 ? '' : 's') + ' in ' + label;
        }
      }
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        applyFilter(cat);
      });
    });

    // Keyboard navigation for ARIA tablist
    filterContainer.addEventListener('keydown', function (e) {
      var buttons = Array.from(filterButtons);
      var index = buttons.indexOf(document.activeElement);
      if (index === -1) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        var nextIdx = (index + 1) % buttons.length;
        buttons[nextIdx].focus();
        buttons[nextIdx].click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        var prevIdx = (index - 1 + buttons.length) % buttons.length;
        buttons[prevIdx].focus();
        buttons[prevIdx].click();
      }
    });
  }

  /* ── 5. BibTeX Citation Modal & Copy ────────────────────────── */
  function initBibtexCitations() {
    var modal = document.getElementById('bibtexModal');
    var modalClose = document.getElementById('bibtexModalClose');
    var modalTitle = document.getElementById('bibtexModalTitle');
    var modalCode = document.getElementById('bibtexModalCode');
    var modalCopyBtn = document.getElementById('bibtexModalCopy');
    var modalDownloadBtn = document.getElementById('bibtexModalDownload');
    var activeBibtexKey = null;

    if (!modal) return;

    function openModal(key) {
      var entry = BIBTEX_ENTRIES[key];
      if (!entry) return;
      activeBibtexKey = key;

      if (modalTitle) modalTitle.textContent = entry.title;
      if (modalCode) modalCode.textContent = entry.bibtex;

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (modalCopyBtn) modalCopyBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      activeBibtexKey = null;
    }

    document.querySelectorAll('[data-bibtex-id]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var key = btn.getAttribute('data-bibtex-id');
        openModal(key);
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    if (modalCopyBtn) {
      modalCopyBtn.addEventListener('click', function () {
        if (!activeBibtexKey || !BIBTEX_ENTRIES[activeBibtexKey]) return;
        var text = BIBTEX_ENTRIES[activeBibtexKey].bibtex;
        navigator.clipboard.writeText(text).then(function () {
          showToast('BibTeX citation copied to clipboard!');
          var originalText = modalCopyBtn.innerHTML;
          modalCopyBtn.innerHTML = '<span>✓ Copied</span>';
          setTimeout(function () {
            modalCopyBtn.innerHTML = originalText;
          }, 2000);
        }).catch(function () {
          showToast('Failed to copy to clipboard. Please select text manually.');
        });
      });
    }

    if (modalDownloadBtn) {
      modalDownloadBtn.addEventListener('click', function () {
        if (!activeBibtexKey || !BIBTEX_ENTRIES[activeBibtexKey]) return;
        var entry = BIBTEX_ENTRIES[activeBibtexKey];
        var blob = new Blob([entry.bibtex], { type: 'application/x-bibtex' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = activeBibtexKey + '.bib';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Downloaded ' + activeBibtexKey + '.bib');
      });
    }
  }

  /* ── 6. Scroll Reveal Micro-Interactions ────────────────────── */
  function initScrollReveals() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var targets = document.querySelectorAll('.case-study, .pub-card, .domain-card, .timeline-row, .stack-box');
    if (!targets.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    targets.forEach(function (el) {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
  }

  /* ── 7. Initialize Everything on DOMContentLoaded ───────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initTheme();
      initProjectFiltering();
      initBibtexCitations();
      initScrollReveals();
    });
  } else {
    initTheme();
    initProjectFiltering();
    initBibtexCitations();
    initScrollReveals();
  }

})();
