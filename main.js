/* ============================================================
   LOS DRAGOS PADEL CLUB — main.js
   ============================================================ */

/* ── Scroll reveal ── */
function initReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── Mobile nav — close when a link is clicked or user taps outside ── */
function initMobileNav() {
  const chk = document.getElementById('nav-chk');
  if (!chk) return;

  // Close on any nav link click (covers anchor links AND page links)
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => { chk.checked = false; });
  });

  // Close on outside tap
  document.addEventListener('click', e => {
    if (chk.checked && !e.target.closest('#site-nav')) chk.checked = false;
  });
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
      if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });
}

/* ── Active nav link ── */
function initActiveNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('nav .nav-links a').forEach(a => {
    const href = a.getAttribute('href')?.replace(/\/$/, '');
    if (href && path.endsWith(href)) a.classList.add('active');
  });
}

/* ── Contact form ── */
function initContactForm() {
  const form = document.getElementById('interest-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('form-success');
    const btn = form.querySelector('button[type="submit"]');
    if (msg) msg.style.display = 'block';
    if (btn) { btn.textContent = 'Sent!'; btn.disabled = true; }
    // Uncomment and replace ID to wire up Formspree:
    // fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body:new FormData(form), headers:{Accept:'application/json'} });
    if (typeof gtag === 'function') gtag('event', 'form_submit', { event_category: 'Contact', event_label: 'Interest Form' });
  });
}

/* ── Smooth scroll with nav offset ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('site-nav')?.offsetHeight || 68;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
    });
  });
}

/* ── Nav shrink on scroll ── */
function initNavScroll() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('nav-scrolled', window.scrollY > 60), { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initMobileNav();
  initFAQ();
  initActiveNav();
  initContactForm();
  initSmoothScroll();
  initNavScroll();
});
