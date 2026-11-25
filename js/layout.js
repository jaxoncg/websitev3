/* LAYOUT: builds the shared header + footer on every page from config.js.
   Each page only needs <body data-page="home|portfolio|pricing|contact">
   and a <main id="main"> element. Edit nav links here. */
(function () {
  var C = window.SITE_CONFIG, B = C.business;
  var page = document.body.getAttribute('data-page') || '';
  var NAV = [['home','index.html','Home'],['portfolio','portfolio.html','Portfolio'],['pricing','pricing.html','Pricing'],['contact','contact.html','Contact']];
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };

  var logo = C.logo.src
    ? '<img src="' + esc(C.logo.src) + '" alt="' + esc(B.name) + '" width="' + C.logo.width + '" height="' + C.logo.height + '">'
    : '<span class="wordmark" title="Logo placeholder: set logo.src in js/config.js">Jaxon G<small>Photography</small></span>';

  var links = NAV.map(function (n) {
    return '<a href="' + n[1] + '"' + (n[0] === page ? ' aria-current="page"' : '') + '>' + n[2] + '</a>';
  }).join('');

  var header = '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="site-header"><a class="brand" href="index.html" aria-label="' + esc(B.name) + ', home">' + logo + '</a>' +
    '<nav id="nav" class="nav" aria-label="Main">' + links + '<a class="btn btn-red" href="contact.html">Book a session</a></nav>' +
    '<button class="sound-toggle" type="button" aria-pressed="false" data-sound-toggle>Sound off</button>' +
    '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button></header>';

  var socials = Object.keys(C.socials).filter(function (k) { return C.socials[k]; }).map(function (k) {
    return '<li><a href="' + esc(C.socials[k]) + '" rel="noopener" target="_blank">' + k + '<span class="sr"> (opens in a new tab)</span></a></li>';
  }).join('');

  var contact = '<li><a href="mailto:' + esc(B.email) + '">' + esc(B.email) + '</a></li>' +
    (B.phone ? '<li><a href="tel:' + esc(B.phone.replace(/[^\d+]/g, '')) + '">' + esc(B.phone) + '</a></li>' : '');

  var footer = '<footer class="site-footer"><div class="wrap"><div class="footer-grid">' +
    '<div><p class="display d-lg">' + esc(B.name) + '</p><p class="muted" style="margin-top:1rem">' + esc(B.tagline) + '</p></div>' +
    '<div><h2>Explore</h2><ul>' + NAV.map(function (n) { return '<li><a href="' + n[1] + '">' + n[2] + '</a></li>'; }).join('') + '</ul></div>' +
    '<div><h2>Contact</h2><ul>' + contact + '<li class="muted">' + esc(B.serviceArea) + '</li></ul></div>' +
    '<div><h2>Follow</h2><ul>' + (socials || '<li class="muted">Add links in js/config.js</li>') + '</ul></div>' +
    '</div><p class="footer-base">&copy; ' + new Date().getFullYear() + ' ' + esc(B.name) + '. All rights reserved.</p></div></footer>';

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  /* Structured data for search engines (no street address; service area comes from config) */
  var ld = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: B.name, url: B.domain, description: 'Sports, portrait, event, commercial, and wedding photography.' };
  if (!/REPLACE/.test(B.serviceArea)) ld.areaServed = B.serviceArea;
  var sameAs = Object.keys(C.socials).map(function (k) { return C.socials[k]; }).filter(Boolean);
  if (sameAs.length) ld.sameAs = sameAs;
  var ldEl = document.createElement('script'); ldEl.type = 'application/ld+json'; ldEl.textContent = JSON.stringify(ld); document.head.appendChild(ldEl);

  /* Mobile menu */
  var btn = document.querySelector('.menu-btn');
  function setMenu(open) {
    document.body.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Close' : 'Menu';
  }
  btn.addEventListener('click', function () { setMenu(!document.body.classList.contains('nav-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.getElementById('nav').addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  /* Setup reminders for the site owner (visible in the browser console only) */
  if (/REPLACE/.test(B.email)) console.warn('[config] Set business.email in js/config.js');
  if (/REPLACE/.test(B.serviceArea)) console.warn('[config] Set business.serviceArea in js/config.js');
})();
