/* Draws the certificate sticker (a 1200 x 1200 image for LinkedIn / WhatsApp) on a <canvas>,
   using the same theme colours as the card on the page. Needs qr.js for the QR code. */
var AGFBadge = (function () {
  var SERIF = 'Georgia, "Times New Roman", serif';
  var SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  var MONO = 'ui-monospace, Consolas, "Courier New", monospace';
  var S = 1200;

  function pick(themes, code) {
    themes = themes || [];
    return themes.filter(function (t) { return t.code === code; })[0] || themes[0] ||
      { code: 'classic', dark: false, bg: ['#fff', '#fff'], ink: '#1b2233', accent: '#e2302c', title: '#24407f', band: ['#e2302c', '#e2302c'], bandInk: '#fff', frame: '#24407f' };
  }
  function cssGradient(stops, angle) {
    return stops.length > 1 ? 'linear-gradient(' + angle + ', ' + stops.join(', ') + ')' : stops[0];
  }
  function logoFile(theme) { return theme.dark ? 'assets/logo-white.png' : 'assets/logo.png'; }

  function grad(ctx, stops, x0, y0, x1, y1) {
    if (stops.length < 2) return stops[0];
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    stops.forEach(function (c, i) { g.addColorStop(i / (stops.length - 1), c); });
    return g;
  }
  // set the font, shrinking until the text fits; returns the width used
  function fit(ctx, text, maxW, size, min, weight, family) {
    for (;;) {
      ctx.font = weight + ' ' + size + 'px ' + family;
      var w = ctx.measureText(text).width;
      if (w <= maxW || size <= min) return w;
      size -= 2;
    }
  }
  function spacing(ctx, px) { if ('letterSpacing' in ctx) ctx.letterSpacing = px + 'px'; }
  // split into two balanced lines at a space
  function twoLines(ctx, text) {
    var words = text.split(/\s+/), best = [text], bestW = Infinity;
    for (var i = 1; i < words.length; i++) {
      var a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
      var w = Math.max(ctx.measureText(a).width, ctx.measureText(b).width);
      if (w < bestW) { bestW = w; best = [a, b]; }
    }
    return best;
  }

  function star(ctx, x, y, r) {
    ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
      ctx[i ? 'lineTo' : 'moveTo'](x + rr * Math.cos(a), y + rr * Math.sin(a));
    }
    ctx.closePath(); ctx.fill();
  }

  /* o = { rec, theme, orgName, url, verifiedLine, logo (a loaded <img> or null) } */
  function draw(canvas, o) {
    var t = o.theme, rec = o.rec, ctx = canvas.getContext('2d'), cx = S / 2;
    canvas.width = canvas.height = S;
    ctx.textBaseline = 'middle';

    // background and frame
    ctx.fillStyle = grad(ctx, t.bg, 0, 0, 0, S); ctx.fillRect(0, 0, S, S);
    ctx.strokeStyle = t.frame; ctx.lineWidth = 10; ctx.strokeRect(21, 21, S - 42, S - 42);
    ctx.globalAlpha = 0.7; ctx.strokeStyle = t.accent; ctx.lineWidth = 2; ctx.strokeRect(40, 40, S - 80, S - 80);
    ctx.globalAlpha = 1;

    // logo (or the organisation name if the logo file is missing)
    ctx.textAlign = 'center';
    if (o.logo && o.logo.naturalWidth) {
      var lh = 124, lw = lh * o.logo.naturalWidth / o.logo.naturalHeight;
      ctx.drawImage(o.logo, cx - lw / 2, 70, lw, lh);
    } else {
      ctx.fillStyle = t.accent; fit(ctx, o.orgName, 1000, 50, 30, 'bold', SERIF); ctx.fillText(o.orgName, cx, 132);
    }

    // programme strip
    ctx.fillStyle = grad(ctx, t.band, 26, 0, S - 26, 0); ctx.fillRect(26, 226, S - 52, 80);
    if (t.bandEdge) { ctx.fillStyle = t.bandEdge; ctx.fillRect(26, 214, S - 52, 6); ctx.fillRect(26, 312, S - 52, 6); }
    if (rec.program) {
      ctx.fillStyle = t.bandInk; fit(ctx, rec.program, 1040, 36, 20, 'italic bold', SANS); ctx.fillText(rec.program, cx, 267);
    }

    // title: "CERTIFICATE" + "OF RECOGNITION", or the whole title if it is worded differently
    var title = rec.certificateTitle || 'Certificate', tm = /^(.+?)\s+(of\s+.+)$/i.exec(title);
    ctx.fillStyle = t.title;
    spacing(ctx, 6);
    fit(ctx, (tm ? tm[1] : title).toUpperCase(), 1020, tm ? 100 : 76, 36, 'bold', SERIF);
    ctx.fillText((tm ? tm[1] : title).toUpperCase(), cx, tm ? 395 : 420);
    if (tm) {
      spacing(ctx, 9);
      fit(ctx, tm[2].toUpperCase(), 1000, 36, 22, 'bold', SERIF); ctx.fillText(tm[2].toUpperCase(), cx, 470);
    }
    spacing(ctx, 0);
    if (t.emblem === 'stars') {
      ctx.fillStyle = t.accent;
      [-56, 0, 56].forEach(function (dx) { star(ctx, cx + dx, tm ? 524 : 510, dx ? 15 : 19); });
    }

    // recipient (moved down a little when the theme has stars under the title)
    var YO = t.emblem ? 30 : 0;
    ctx.fillStyle = t.ink; ctx.globalAlpha = 0.85;
    ctx.font = '400 30px ' + SANS; ctx.fillText('is awarded to', cx, 548 + YO);
    ctx.globalAlpha = 1; ctx.fillStyle = t.accent;
    var y = 632 + YO, w = fit(ctx, rec.name, 1020, 82, 50, 'bold', SERIF);
    if (w > 1020 && /\s/.test(rec.name)) {
      var lines = twoLines(ctx, rec.name), widest = ctx.measureText(lines[0]).width > ctx.measureText(lines[1]).width ? lines[0] : lines[1];
      fit(ctx, widest, 1020, 56, 30, 'bold', SERIF);
      ctx.fillText(lines[0], cx, 606 + YO); ctx.fillText(lines[1], cx, 672 + YO); y = 672 + YO;
    } else {
      if (w > 1020) fit(ctx, rec.name, 1020, 48, 24, 'bold', SERIF);
      ctx.fillText(rec.name, cx, y);
    }
    if (rec.organization) {
      ctx.fillStyle = t.ink; fit(ctx, rec.organization, 1000, 34, 20, '600', SANS); ctx.fillText(rec.organization, cx, y + 72);
    }
    if (rec.level) {
      ctx.fillStyle = t.accent; fit(ctx, rec.level, 1000, 30, 20, 'bold', SANS); ctx.fillText(rec.level, cx, y + (rec.organization ? 128 : 78));
    }

    // divider
    ctx.globalAlpha = 0.45; ctx.strokeStyle = t.accent; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(90, 856); ctx.lineTo(S - 90, 856); ctx.stroke(); ctx.globalAlpha = 1;

    // QR code on a white tile, so it scans on every theme
    var qx = 90, qy = 892, qs = 232, m = null;
    try { m = AGFQR.matrix(o.url); } catch (e) { m = null; }
    if (m) {
      ctx.fillStyle = '#fff';
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(qx, qy, qs, qs, 14); ctx.fill(); } else ctx.fillRect(qx, qy, qs, qs);
      var n = m.length, cell = Math.floor((qs - 28) / n), off = Math.floor((qs - cell * n) / 2);
      ctx.fillStyle = '#000';
      for (var r = 0; r < n; r++) for (var c = 0; c < n; c++)
        if (m[r][c]) ctx.fillRect(qx + off + c * cell, qy + off + r * cell, cell, cell);
    }

    // verification block
    var tx = m ? 364 : 90, maxW = S - 90 - tx;
    ctx.textAlign = 'left';
    ctx.fillStyle = t.accent; ctx.beginPath(); ctx.arc(tx + 22, 918, 22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = t.bg[t.bg.length - 1]; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(tx + 11, 919); ctx.lineTo(tx + 19, 928); ctx.lineTo(tx + 34, 909); ctx.stroke();
    spacing(ctx, 2);
    fit(ctx, 'VERIFIED CREDENTIAL', maxW - 60, 38, 24, 'bold', SANS); ctx.fillText('VERIFIED CREDENTIAL', tx + 58, 919);
    spacing(ctx, 0);
    ctx.fillStyle = t.ink;
    fit(ctx, o.verifiedLine, maxW, 29, 18, '600', SANS); ctx.fillText(o.verifiedLine, tx, 975);
    ctx.globalAlpha = 0.75; ctx.font = '600 19px ' + SANS; spacing(ctx, 2);
    ctx.fillText('CERTIFICATE ID', tx, 1022); spacing(ctx, 0); ctx.globalAlpha = 1;
    fit(ctx, rec.id, maxW, 36, 22, 'bold', MONO); ctx.fillText(rec.id, tx, 1058);
    var short = o.url.replace(/^https?:\/\//, '');
    ctx.globalAlpha = 0.85;
    fit(ctx, 'Scan the QR or open ' + short, maxW, 22, 12, '400', SANS); ctx.fillText('Scan the QR or open ' + short, tx, 1104);
    ctx.globalAlpha = 1;
    return canvas;
  }

  return { pick: pick, cssGradient: cssGradient, logoFile: logoFile, draw: draw };
})();
