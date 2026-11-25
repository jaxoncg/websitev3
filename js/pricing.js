/* PRICING PAGE: renders every package from SITE_CONFIG.pricing (edit js/config.js) */
(function () {
  var C = window.SITE_CONFIG, esc = window.JG.esc, anySuggested = false;

  function pkg(s, p) {
    if (!p.confirmed) anySuggested = true;
    var href = 'contact.html?service=' + s.id + '&package=' + encodeURIComponent(p.name);
    return '<article class="pkg"><div><h3 class="display d-md">' + esc(p.name) + '</h3><p class="pkg-time">' + esc(p.time) + '</p><p>' + esc(p.desc) + '</p></div>' +
      '<ul class="pkg-inc">' + p.inc.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
      '<div class="pkg-buy"><p class="pkg-price">' + (p.from ? '<small>from</small>' : '') + '$' + p.price + '</p>' +
      (p.confirmed ? '' : '<span class="tag">Suggested pricing</span>') +
      '<a class="btn btn-red" href="' + href + '">Inquire<span class="sr"> about the ' + esc(p.name) + ' ' + esc(s.title.toLowerCase()) + ' package</span></a></div></article>';
  }

  document.getElementById('packages').innerHTML = C.services.map(function (s, i) {
    return '<section class="section price-svc' + (i % 2 ? ' light' : '') + '" id="' + s.id + '" aria-labelledby="h-' + s.id + '"><div class="wrap">' +
      '<div class="svc-title"><h2 id="h-' + s.id + '" class="display d-xl">' + esc(s.title) + '</h2><p class="muted" style="margin-top:1rem">' + esc(s.blurb) + '</p></div>' +
      '<div>' + (C.pricing[s.id] || []).map(function (p) { return pkg(s, p); }).join('') + '</div></div></section>';
  }).join('');

  document.getElementById('jump').innerHTML = C.services.map(function (s) { return '<a href="#' + s.id + '">' + esc(s.title) + '</a>'; }).join('');

  if (anySuggested) document.getElementById('pricing-note').innerHTML =
    '<p class="notice">Packages tagged "Suggested pricing" show estimated rates. Your final quote is confirmed when you inquire.</p>';
})();
