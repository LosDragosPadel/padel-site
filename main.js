/* ============================================================
   LOS DRAGOS PADEL CLUB — main.js
   Shared behaviour across all pages.
   ============================================================ */

/* ── Scroll reveal ── */
function initReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target); // fire once
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── FAQ accordion ── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });
}

/* ── Active nav link (highlights current page) ── */
function initActiveNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('nav .nav-links a').forEach(a => {
    const href = a.getAttribute('href')?.replace(/\/$/, '');
    if (href && path.endsWith(href)) a.classList.add('active');
  });
}

/* ── Contact / interest form ── */
function initContactForm() {
  const form = document.getElementById('interest-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('form-success');
    const btn = form.querySelector('button[type="submit"]');
    if (msg) { msg.style.display = 'block'; }
    if (btn) { btn.textContent = 'Sent!'; btn.disabled = true; }

    // ── When you add a backend / Netlify Forms / Formspree, wire it here ──
    // Example with Formspree:
    // fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST', body: new FormData(form),
    //   headers: { Accept: 'application/json' }
    // });

    // ── Google Analytics event (fires once GA is added) ──
    if (typeof gtag === 'function') {
      gtag('event', 'form_submit', { event_category: 'Contact', event_label: 'Interest Form' });
    }
  });
}

/* ── Google Analytics placeholder ──
   When ready:
   1. Create a GA4 property at analytics.google.com
   2. Copy your Measurement ID (format: G-XXXXXXXXXX)
   3. Replace 'G-XXXXXXXXXX' in the <head> snippet in each HTML file
   4. Remove the comment blocks below — gtag() calls will start working.
   ── */

/* ── Init everything on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initFAQ();
  initActiveNav();
  initContactForm();
});
