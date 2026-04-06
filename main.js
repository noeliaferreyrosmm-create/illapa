// ============================================
// ILLAPA INSTITUTE FOR CLIMATE ACTION
// main.js — STEAM League Europe 2026
// Colegio San Agustín · Chiclayo, Peru
// ============================================

// NAV TOGGLE (mobile)
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// NAVBAR SCROLL STYLE
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.12)';
  } else {
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.08)';
  }
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 75;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    let display;
    if (target >= 100000) {
      display = prefix + current.toLocaleString() + suffix;
    } else {
      display = prefix + current + suffix;
    }

    el.textContent = display;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Trigger counters when hero is in view
const counters = document.querySelectorAll('.counter-number[data-target]');
let countersTriggered = false;

const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersTriggered) {
    countersTriggered = true;
    counters.forEach(c => animateCounter(c));
  }
}, { threshold: 0.3 });

const heroCounters = document.querySelector('.hero-counters');
if (heroCounters) counterObserver.observe(heroCounters);

// SCROLL REVEAL
const revealTargets = document.querySelectorAll(
  '.stat-card, .tech-block, .steam-item-row, .sdg-c, .team-card, .int-card, .lib-ref, .impact-box, .drone-row, .vr-s, .proc-step, .pt-node, .st-node, .ce-item'
);

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => revealObserver.observe(el));

// ACTIVE NAV LINK
const sections = document.querySelectorAll('section[id], div[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'white';
          link.style.background = 'rgba(255,255,255,0.08)';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => activeObserver.observe(s));

console.log('⚡ ILLAPA Institute for Climate Action — Chiclayo, Peru');
