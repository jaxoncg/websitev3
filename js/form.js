/* CONTACT FORM: validation + submission.
   - If SITE_CONFIG.form.formspreeId is set, the form POSTs to Formspree and shows
     success ONLY after Formspree confirms delivery.
   - If it is empty, the form opens the visitor's email app (mailto) and says so. */
(function () {
  var C = window.SITE_CONFIG, B = C.business, esc = window.JG.esc;
  var f = document.getElementById('inquiry'), statusEl = document.getElementById('status'), box = document.getElementById('form-box'), send = document.getElementById('send');
  var q = new URLSearchParams(location.search), el = f.elements;

  /* Service choices + prefill from ?service= and ?package= */
  el.service.insertAdjacentHTML('beforeend', C.services.map(function (s) { return '<option value="' + esc(s.title) + '">' + esc(s.title) + ' photography</option>'; }).join('') + '<option value="Not sure yet">Not sure yet</option>');
  C.services.forEach(function (s) { if (s.id === q.get('service')) el.service.value = s.title; });
  if (q.get('package')) {
    el.package.value = q.get('package').slice(0, 80);
    var pn = document.getElementById('pkg-note'); pn.textContent = 'Package of interest: ' + el.package.value; pn.hidden = false;
  }
  var d = new Date(); el.date.min = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);

  /* Site-owner reminders (they disappear once config is filled in) */
  var notes = [];
  if (!C.form.formspreeId) notes.push('This form currently opens the visitor\'s email app. Add a Formspree form ID in js/config.js (form.formspreeId) to receive inquiries directly.');
  if (/REPLACE/.test(B.email)) notes.push('Add your real email in js/config.js (business.email).');
  if (notes.length) document.getElementById('setup-note').innerHTML = '<p class="notice"><strong>Setup note for the site owner:</strong> ' + notes.join(' ') + '</p>';

  /* Direct contact column */
  var socials = Object.keys(C.socials).filter(function (k) { return C.socials[k]; }).map(function (k) { return '<li><a href="' + esc(C.socials[k]) + '" target="_blank" rel="noopener">' + k + '<span class="sr"> (opens in a new tab)</span></a></li>'; }).join('');
  document.getElementById('direct').innerHTML = '<h2 id="direct-title" class="display d-lg">Prefer to email?</h2><ul>' +
    '<li><a class="big" href="mailto:' + esc(B.email) + '">' + esc(B.email) + '</a></li>' +
    (B.phone ? '<li><a href="tel:' + esc(B.phone.replace(/[^\d+]/g, '')) + '">' + esc(B.phone) + '</a></li>' : '') +
    (/REPLACE/.test(B.serviceArea) ? '' : '<li class="muted">Serving ' + esc(B.serviceArea) + '</li>') + socials + '</ul>';

  function err(name, msg) {
    var inp = el[name], out = document.getElementById('e-' + name);
    out.textContent = msg || ''; if (msg) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid');
    return msg ? inp : null;
  }
  function validate() {
    var v = function (n) { return el[n].value.trim(); }, bad = [];
    bad.push(err('name', v('name').length < 2 ? 'Enter your name.' : ''));
    bad.push(err('email', !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email')) ? 'Enter a valid email address, like name@example.com.' : ''));
    bad.push(err('phone', v('phone') && v('phone').replace(/\D/g, '').length < 7 ? 'Enter a phone number with at least 7 digits, or leave it blank.' : ''));
    bad.push(err('service', !v('service') ? 'Choose a service.' : ''));
    bad.push(err('date', v('date') && v('date') < el.date.min ? 'Choose today or a future date.' : ''));
    return bad.filter(Boolean)[0] || null;
  }
  function say(html, isErr) { statusEl.className = 'status' + (isErr ? ' error' : ''); statusEl.innerHTML = html; }
  function lines(dt) {
    return ['Name: ' + dt.name, 'Email: ' + dt.email, 'Phone: ' + (dt.phone || 'n/a'), 'Service: ' + dt.service, dt.package ? 'Package: ' + dt.package : '',
      'Preferred date: ' + (dt.date || 'flexible'), 'Location: ' + (dt.location || 'n/a'), '', dt.details || ''].filter(function (l, i) { return l !== '' || i === 7; }).join('\n');
  }
  var mailLink = '<a href="mailto:' + esc(B.email) + '">' + esc(B.email) + '</a>';

  f.addEventListener('submit', async function (e) {
    e.preventDefault(); say('', false);
    var bad = validate();
    if (bad) { say('Please fix the highlighted fields and try again.', true); bad.focus(); return; }
    if (el._gotcha.value) return;                               // spam trap
    var dt = {}; ['name', 'email', 'phone', 'service', 'date', 'location', 'details', 'package'].forEach(function (k) { dt[k] = el[k].value.trim(); });

    if (!C.form.formspreeId) {                                  // mailto fallback
      var href = 'mailto:' + B.email + '?subject=' + encodeURIComponent('Booking inquiry: ' + dt.service) + '&body=' + encodeURIComponent(lines(dt));
      say('Your email app should open with your inquiry filled in. <strong>Nothing has been sent until you press Send there.</strong> If nothing opened, <a href="' + href + '">use this link</a> or email ' + mailLink + '.', false);
      location.href = href; return;
    }
    send.disabled = true; send.textContent = 'Sending...';
    try {
      var r = await fetch('https://formspree.io/f/' + encodeURIComponent(C.form.formspreeId), { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
      if (!r.ok) { var j = {}; try { j = await r.json(); } catch (x) {} throw new Error((j.errors || []).map(function (i) { return i.message; }).join(' ')); }
      box.innerHTML = '<div class="thanks"><h2 class="display d-lg" tabindex="-1" id="thanks-h">Inquiry received</h2><p>Thanks, ' + esc(dt.name) + '. The form service confirmed delivery. I\'ll reply to ' + esc(dt.email) + ' with availability and next steps.</p><button class="btn btn-line" type="button" onclick="location.href=\'contact.html\'">Send another inquiry</button></div>';
      document.getElementById('thanks-h').focus();
    } catch (x) {
      say('Your inquiry was not sent. ' + (x.message ? esc(x.message) + ' ' : '') + 'Please try again, or email ' + mailLink + ' directly.', true);
      send.disabled = false; send.textContent = 'Send inquiry';
    }
  });
})();
