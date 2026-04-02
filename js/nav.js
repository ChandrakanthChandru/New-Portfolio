/* ============================================================
   nav.js — inject shared nav + footer into every page
   ============================================================ */

const NAV_HTML = `
<div id="loader">
  <div class="loader-logo">CK</div>
  <div class="loader-bar"></div>
</div>

<nav id="navbar">
  <a href="../index.html" class="nav-logo">C<span>K</span></a>
  <ul class="nav-links">
    <li><a href="../index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="projects.html">Projects</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <div class="nav-actions">
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
      <i class="fas fa-sun"></i>
    </button>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-logo">CK</div>
  <nav class="footer-links">
    <a href="../index.html">Home</a>
    <a href="about.html">About</a>
    <a href="projects.html">Projects</a>
    <a href="contact.html">Contact</a>
  </nav>
  <p>Designed & Built by <span class="text-accent">Chandrakanth K</span> &copy; 2025</p>
</footer>`;

const NAV_HTML_ROOT = NAV_HTML
  .replace('href="../index.html"', 'href="index.html"')
  .replace('href="about.html"', 'href="pages/about.html"')
  .replace('href="projects.html"', 'href="pages/projects.html"')
  .replace('href="contact.html"', 'href="pages/contact.html"');

const FOOTER_HTML_ROOT = FOOTER_HTML
  .replace('href="../index.html"', 'href="index.html"')
  .replace('href="about.html"', 'href="pages/about.html"')
  .replace('href="projects.html"', 'href="pages/projects.html"')
  .replace('href="contact.html"', 'href="pages/contact.html"');

function injectShared(isRoot = false) {
  const navMount = document.getElementById('nav-mount');
  const footMount = document.getElementById('footer-mount');
  if (navMount) navMount.outerHTML = isRoot ? NAV_HTML_ROOT : NAV_HTML;
  if (footMount) footMount.outerHTML = isRoot ? FOOTER_HTML_ROOT : FOOTER_HTML;
}
