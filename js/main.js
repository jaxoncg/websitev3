/* MAIN: renders config-driven sections, reveals, parallax, page wipe, sound.
   Photos are looked up by id from SITE_CONFIG.portfolio. */
(function () {
  var C = window.SITE_CONFIG;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var byId = {}; C.portfolio.forEach(function (p) { byId[p.id] = p; });

  /* Photo markup: real <img> (optional WebP via p.webp) or a labeled placeholder */
  function photo(id, eager) {
    var p = byId[id]; if (!p) return '';
    if (!p.src) return '<div class="ph" role="img" aria-label="Placeholder ' + esc(p.category) + ' photo">Replace me:<br>' + esc(p.category) + ' photo<br><span>edit js/config.js</span></div>';
    var img = '<img src="' + esc(p.src) + '" alt="' + esc(p.alt) + '" width="' + p.w + '" height="' + p.h + '" loading="' + (eager ? 'eager' : 'lazy') + '" decoding="async">';
    return p.webp ? '<picture><source srcset="' + esc(p.webp) + '" type="image/webp">' + img + '</picture>' : img;
  }

  window.JG = { photo: photo, esc: esc }; // shared with portfolio.js

  /* Services rows */
  var svc = $('#services');
  if (svc) svc.innerHTML = C.services.map(function (s) {
    return '<article class="svc"><div class="frame reveal-img">' + photo(s.image) + '</div><div class="svc-text"><h3 class="display d-lg">' + esc(s.title) + '</h3><p>' + esc(s.blurb) + '</p>' +
      '<a class="btn btn-line" href="contact.html?service=' + s.id + '">Inquire about ' + esc(s.title.toLowerCase()) + '<span class="sr"> photography</span></a></div></article>';
  }).join('');

  /* Pricing preview: lowest package per service; suggested prices get a tag */
  var pp = $('#pricing-preview');
  if (pp) pp.innerHTML = C.services.map(function (s) {
    var list = C.pricing[s.id] || [], low = list.reduce(function (a, b) { return b.price < a.price ? b : a; });
    return '<a class="pp-row" href="pricing.html#' + s.id + '"><span class="pp-name display d-lg">' + esc(s.title) +
      (low.confirmed ? '' : '<span class="tag">Suggested pricing</span>') + '</span><span class="pp-price"><small>' +
      (list.length > 1 || low.from ? 'from' : '') + '</small>$' + low.price + '</span></a>';
  }).join('');

  /* Fill photo slots */
  $$('[data-photo]').forEach(function (el) { el.innerHTML = photo(el.getAttribute('data-photo'), el.hasAttribute('data-eager')); });

  /* Reveals: clip-path image reveal on scroll */
  var reveals = $$('.reveal-img');
  if (reduce || !('IntersectionObserver' in window)) reveals.forEach(function (r) { r.classList.add('is-in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    reveals.forEach(function (r) { io.observe(r); });
  }

  /* Hero parallax (subtle, off with reduced motion) */
  var heroMedia = $('.hero-media');
  if (heroMedia && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { heroMedia.style.setProperty('--py', (-Math.min(window.scrollY, 800) * 0.12) + 'px'); ticking = false; });
    }, { passive: true });
  }

  /* Page-leave wipe on internal navigation */
  var wipe = document.createElement('div'); wipe.className = 'wipe'; wipe.setAttribute('aria-hidden', 'true'); document.body.appendChild(wipe);
  window.addEventListener('pageshow', function () { document.body.classList.remove('leaving'); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.protocol !== location.protocol || a.host !== location.host || a.hasAttribute('download')) return;
    if (a.pathname === location.pathname && a.hash) return;
    e.preventDefault(); document.body.classList.add('leaving');
    setTimeout(function () { location.href = a.href; }, 380);
  });

  /* Sound: off by default, tiny synthesized clicks (no audio files) */
  var on = false, ctx, tgl = $('[data-sound-toggle]');
  try { on = localStorage.getItem('jg-sound') === '1'; } catch (e) {}
  function beep(f, d, t) {
    if (!on) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(), g = ctx.createGain(), n = ctx.currentTime;
      o.type = t || 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(0.03, n); g.gain.exponentialRampToValueAtTime(0.0001, n + d);
      o.connect(g); g.connect(ctx.destination); o.start(n); o.stop(n + d);
    } catch (e) {}
  }
  function paint() { tgl.setAttribute('aria-pressed', on); tgl.textContent = on ? 'Sound on' : 'Sound off'; }
  if (tgl) {
    paint();
    tgl.addEventListener('click', function () {
      on = !on; try { localStorage.setItem('jg-sound', on ? '1' : '0'); } catch (e) {}
      paint(); beep(1400, 0.05);
    });
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.btn')) { beep(1800, 0.03); setTimeout(function () { beep(900, 0.05); }, 45); }
    else if (e.target.closest('.nav a')) beep(1100, 0.03, 'sine');
  });
})();
