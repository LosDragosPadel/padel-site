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

/* ── Countdown to 1 November 2026 ── */
function initCountdown() {
  const target = new Date('2026-11-01T00:00:00').getTime();
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs'),
  };
  if (!els.days) return;

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      els.days.textContent = els.hours.textContent = els.mins.textContent = els.secs.textContent = '0';
      return;
    }
    els.days.textContent  = Math.floor(diff / 86400000);
    els.hours.textContent = Math.floor((diff % 86400000) / 3600000);
    els.mins.textContent  = Math.floor((diff % 3600000)  / 60000);
    els.secs.textContent  = Math.floor((diff % 60000)    / 1000);
  }
  tick();
  setInterval(tick, 1000);
}

/* ── Mobile nav — close on link click or outside tap ── */
function initMobileNav() {
  const chk = document.getElementById('nav-chk');
  if (!chk) return;
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => { chk.checked = false; });
  });
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
    // Wire to Formspree: uncomment and replace YOUR_ID
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
  initCountdown();
  initMobileNav();
  initFAQ();
  initActiveNav();
  initContactForm();
  initSmoothScroll();
  initNavScroll();
});
