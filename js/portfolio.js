/* PORTFOLIO: renders the grid from SITE_CONFIG.portfolio and runs the lightbox.
   Keys: Left/Right = previous/next, Home/End = first/last, Esc = close.
   Touch: swipe left/right. */
(function () {
  var P = window.SITE_CONFIG.portfolio, photo = window.JG.photo, esc = window.JG.esc;
  var grid = document.getElementById('grid');

  grid.innerHTML = P.map(function (p, i) {
    return '<li class="tile tile-' + p.shape + '"><button type="button" data-i="' + i + '" aria-label="View larger: ' + esc(p.alt) + '">' +
      photo(p.id) + '<span class="cap">' + esc(p.category) + '</span></button></li>';
  }).join('');

  var dlg = document.createElement('dialog');
  dlg.className = 'lb';
  dlg.setAttribute('aria-label', 'Photo viewer');
  dlg.innerHTML =
    '<div class="lb-bar"><p class="lb-count" aria-hidden="true"></p><button class="btn btn-line" type="button" data-act="close">Close</button></div>' +
    '<div class="lb-stage"><div class="lb-img"></div></div>' +
    '<div class="lb-foot"><button class="btn btn-line" type="button" data-act="prev">Previous<span class="sr"> photo</span></button>' +
    '<p class="lb-cap" aria-live="polite"></p>' +
    '<button class="btn btn-line" type="button" data-act="next">Next<span class="sr"> photo</span></button></div>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector('.lb-img'), cap = dlg.querySelector('.lb-cap'), count = dlg.querySelector('.lb-count'), cur = 0;

  function show(i) {
    cur = (i + P.length) % P.length;
    var p = P[cur];
    img.innerHTML = photo(p.id, true);
    cap.innerHTML = '<strong>' + esc(p.category) + '</strong>' + esc(p.alt);
    count.textContent = (cur + 1) + ' / ' + P.length;
    [cur - 1, cur + 1].forEach(function (n) {           // warm the cache for neighbours
      var q = P[(n + P.length) % P.length]; if (q.src) new Image().src = q.src;
    });
  }
  function open(i) {
    show(i);
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    document.body.classList.add('lb-open');
  }
  function close() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }

  grid.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-i]'); if (b) open(+b.getAttribute('data-i'));
  });
  dlg.addEventListener('click', function (e) {
    var a = e.target.closest('[data-act]');
    if (a) { var k = a.getAttribute('data-act'); if (k === 'close') close(); else show(cur + (k === 'next' ? 1 : -1)); }
    else if (e.target === dlg) close();                  // click on empty backdrop
  });
  dlg.addEventListener('close', function () { document.body.classList.remove('lb-open'); });
  dlg.addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'ArrowRight') show(cur + 1);
    else if (k === 'ArrowLeft') show(cur - 1);
    else if (k === 'Home') show(0);
    else if (k === 'End') show(P.length - 1);
    else return;
    e.preventDefault();
  });

  /* Swipe */
  var sx = 0, sy = 0;
  dlg.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; });
  dlg.addEventListener('pointerup', function (e) {
    var dx = e.clientX - sx, dy = e.clientY - sy;
    if (e.pointerType === 'touch' && Math.abs(dx) > 50 && Math.abs(dy) < 60) show(cur + (dx < 0 ? 1 : -1));
  });
})();
