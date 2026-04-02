/* ============================================================
   CHANDRAKANTH K — Portfolio JS
   ============================================================ */

/* ── Loader ─────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    // Reduced from 1800ms → 300ms for instant page feel
    setTimeout(() => loader.classList.add('hide'), 300);
  }
});

/* ── Navbar ─────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  navbar.classList.toggle('menu-open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
    navbar.classList.remove('menu-open');
  });
});

/* ── Active nav link on scroll ───────────────────── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionH = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (!navLink) return;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionH) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

/* ── Dark / Light Mode ───────────────────────────── */
const themeBtn = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.add('light');
  if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
}

themeBtn?.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

/* ── AOS (Animate On Scroll) — custom lightweight ── */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.aosDelay || 0;
        setTimeout(() => el.classList.add('aos-animate'), parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ── Skill Bars animation ────────────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill[data-width]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        setTimeout(() => {
          bar.style.width = bar.dataset.width;
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => observer.observe(b));
}

/* ── Typed text effect ───────────────────────────── */
function typedText(el, texts, speed = 90, pause = 1800) {
  if (!el) return;
  let tIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = texts[tIdx];
    if (!deleting) {
      el.textContent = current.slice(0, cIdx++);
      if (cIdx > current.length) {
        deleting = true;
        setTimeout(type, pause);
        return;
      }
    } else {
      el.textContent = current.slice(0, cIdx--);
      if (cIdx < 0) {
        deleting = false;
        tIdx = (tIdx + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? speed / 2 : speed);
  }
  type();
}

/* ── Contact Form Validation ─────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'fname', errId: 'fnameErr', msg: 'Please enter your name.' },
      { id: 'femail', errId: 'femailErr', msg: 'Please enter a valid email.', isEmail: true },
      { id: 'fmessage', errId: 'fmessageErr', msg: 'Please enter a message.' }
    ];

    fields.forEach(({ id, errId, msg, isEmail }) => {
      const input = document.getElementById(id);
      const err = document.getElementById(errId);
      if (!input || !err) return;
      const val = input.value.trim();
      const invalid = !val || (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
      input.classList.toggle('error', invalid);
      err.classList.toggle('show', invalid);
      err.textContent = msg;
      if (invalid) valid = false;
    });

    if (!valid) return;

    // Simulate success
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      document.getElementById('formSuccess')?.classList.add('show');
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        document.getElementById('formSuccess')?.classList.remove('show');
      }, 4000);
    }, 1600);
  });

  // Clear errors on input
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      document.getElementById(el.id + 'Err')?.classList.remove('show');
    });
  });
}

/* ── Counter animation ───────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); }
    else el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ── Init all ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initSkillBars();
  initContactForm();
  initCounters();
  typedText(
    document.getElementById('typedRole'),
    ['Web Designer', 'Web Developer', 'Java Developer', 'UI/UX Enthusiast'],
    85
  );
});
/* ── Page Transition: Instant exit on link click ── */
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  // Only apply to internal .html page links (not anchors, not external)
  if (
    href &&
    !href.startsWith('#') &&
    !href.startsWith('http') &&
    !href.startsWith('mailto') &&
    !href.startsWith('tel') &&
    (href.endsWith('.html') || href.includes('.html'))
  ) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.15s ease';
      setTimeout(() => { window.location.href = href; }, 150);
    });
  }
});

// Fade in on arrival
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.2s ease';
    document.body.style.opacity = '1';
  });
});
