/* Small self-contained QR code generator (byte mode, error-correction level M, versions 1-9).
   No external libraries. Used by admin.html and by the share sticker on index.html. */
var AGFQR = (function () {
  // [total codewords, EC codewords per block, number of blocks] for level M
  var VERS = [null, [26, 10, 1], [44, 16, 1], [70, 26, 1], [100, 18, 2], [134, 24, 2],
    [172, 16, 4], [196, 18, 4], [242, 22, 4], [292, 22, 5]];
  var ALIGN = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46]];

  function utf8(str) {
    var s = unescape(encodeURIComponent(str)), out = [];
    for (var i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
    return out;
  }
  function gfMul(x, y) {
    var z = 0;
    for (var i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11D); z ^= ((y >>> i) & 1) * x; }
    return z & 0xFF;
  }
  function rsDivisor(degree) {
    var res = [], i, j, root = 1;
    for (i = 0; i < degree - 1; i++) res.push(0);
    res.push(1);
    for (i = 0; i < degree; i++) {
      for (j = 0; j < res.length; j++) {
        res[j] = gfMul(res[j], root);
        if (j + 1 < res.length) res[j] ^= res[j + 1];
      }
      root = gfMul(root, 2);
    }
    return res;
  }
  function rsRemainder(data, divisor) {
    var res = divisor.map(function () { return 0; });
    data.forEach(function (b) {
      var factor = b ^ res.shift();
      res.push(0);
      divisor.forEach(function (c, i) { res[i] ^= gfMul(c, factor); });
    });
    return res;
  }

  function matrix(text) {
    var bytes = utf8(text), ver, dataLen;
    for (ver = 1; ver <= 9; ver++) {
      dataLen = VERS[ver][0] - VERS[ver][1] * VERS[ver][2];
      if (bytes.length <= dataLen - 2) break;
    }
    if (ver > 9) throw new Error('That web address is too long for the QR code (max about 180 characters).');

    // --- bit stream
    var bits = [];
    function put(val, len) { for (var i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); }
    put(4, 4); put(bytes.length, 8);
    bytes.forEach(function (b) { put(b, 8); });
    put(0, Math.min(4, dataLen * 8 - bits.length));
    while (bits.length % 8) bits.push(0);
    for (var pad = 0xEC; bits.length < dataLen * 8; pad ^= 0xEC ^ 0x11) put(pad, 8);
    var data = [];
    for (var i = 0; i < bits.length; i += 8) {
      var v = 0; for (var k = 0; k < 8; k++) v = (v << 1) | bits[i + k];
      data.push(v);
    }

    // --- error correction + interleave
    var total = VERS[ver][0], ecLen = VERS[ver][1], nb = VERS[ver][2];
    var numShort = nb - total % nb, shortData = Math.floor(total / nb) - ecLen;
    var div = rsDivisor(ecLen), blocks = [], eccs = [], pos = 0;
    for (var b = 0; b < nb; b++) {
      var len = shortData + (b < numShort ? 0 : 1);
      var d = data.slice(pos, pos + len); pos += len;
      blocks.push(d); eccs.push(rsRemainder(d, div));
    }
    var all = [];
    for (i = 0; i <= shortData; i++) blocks.forEach(function (d) { if (i < d.length) all.push(d[i]); });
    for (i = 0; i < ecLen; i++) eccs.forEach(function (e) { all.push(e[i]); });

    // --- function patterns
    var size = ver * 4 + 17, m = [], fn = [], x, y;
    for (y = 0; y < size; y++) { m.push(new Array(size).fill(false)); fn.push(new Array(size).fill(false)); }
    function setF(x, y, dark) { m[y][x] = !!dark; fn[y][x] = true; }
    for (i = 0; i < size; i++) { setF(6, i, i % 2 === 0); setF(i, 6, i % 2 === 0); }
    function finder(cx, cy) {
      for (var dy = -4; dy <= 4; dy++) for (var dx = -4; dx <= 4; dx++) {
        var dist = Math.max(Math.abs(dx), Math.abs(dy)), xx = cx + dx, yy = cy + dy;
        if (xx >= 0 && xx < size && yy >= 0 && yy < size) setF(xx, yy, dist !== 2 && dist !== 4);
      }
    }
    finder(3, 3); finder(size - 4, 3); finder(3, size - 4);
    var ap = ALIGN[ver], n = ap.length;
    for (i = 0; i < n; i++) for (var j = 0; j < n; j++) {
      if ((i === 0 && j === 0) || (i === 0 && j === n - 1) || (i === n - 1 && j === 0)) continue;
      for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++)
        setF(ap[i] + dx, ap[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }
    function drawFormat(mask) {
      var d = mask, rem = d;           // level M = 00
      for (var i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      var f = ((d << 10) | rem) ^ 0x5412;
      function bit(i) { return (f >>> i) & 1; }
      for (i = 0; i <= 5; i++) setF(8, i, bit(i));
      setF(8, 7, bit(6)); setF(8, 8, bit(7)); setF(7, 8, bit(8));
      for (i = 9; i < 15; i++) setF(14 - i, 8, bit(i));
      for (i = 0; i < 8; i++) setF(size - 1 - i, 8, bit(i));
      for (i = 8; i < 15; i++) setF(8, size - 15 + i, bit(i));
      setF(8, size - 8, 1);
    }
    drawFormat(0);
    if (ver >= 7) {
      var rem = ver;
      for (i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
      var vb = (ver << 12) | rem;
      for (i = 0; i < 18; i++) {
        var a = size - 11 + i % 3, bb = Math.floor(i / 3), on = (vb >>> i) & 1;
        setF(a, bb, on); setF(bb, a, on);
      }
    }

    // --- data placement (zig-zag)
    var idx = 0;
    for (var right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (var vert = 0; vert < size; vert++) for (j = 0; j < 2; j++) {
        x = right - j; y = ((right + 1) & 2) === 0 ? size - 1 - vert : vert;
        if (!fn[y][x] && idx < all.length * 8) {
          m[y][x] = ((all[idx >>> 3] >>> (7 - (idx & 7))) & 1) === 1; idx++;
        }
      }
    }

    // --- masking: try all 8, keep the lowest penalty
    function maskAt(k, x, y) {
      switch (k) {
        case 0: return (x + y) % 2 === 0;
        case 1: return y % 2 === 0;
        case 2: return x % 3 === 0;
        case 3: return (x + y) % 3 === 0;
        case 4: return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
        case 5: return (x * y) % 2 + (x * y) % 3 === 0;
        case 6: return ((x * y) % 2 + (x * y) % 3) % 2 === 0;
        default: return ((x + y) % 2 + (x * y) % 3) % 2 === 0;
      }
    }
    function applyMask(k) {
      for (var y = 0; y < size; y++) for (var x = 0; x < size; x++)
        if (!fn[y][x] && maskAt(k, x, y)) m[y][x] = !m[y][x];
    }
    function penalty() {
      var p = 0, x, y, dark = 0;
      function line(get) {
        var run = 1, s = '';
        for (var i = 0; i < size; i++) {
          s += get(i) ? '1' : '0';
          if (i > 0 && get(i) === get(i - 1)) { run++; if (run === 5) p += 3; else if (run > 5) p++; }
          else run = 1;
        }
        for (i = 0; i + 11 <= size; i++) {
          var seg = s.substr(i, 11);
          if (seg === '10111010000' || seg === '00001011101') p += 40;
        }
      }
      for (y = 0; y < size; y++) line(function (i) { return m[y][i]; });
      for (x = 0; x < size; x++) line(function (i) { return m[i][x]; });
      for (y = 0; y < size - 1; y++) for (x = 0; x < size - 1; x++) {
        var c = m[y][x];
        if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) p += 3;
      }
      for (y = 0; y < size; y++) for (x = 0; x < size; x++) if (m[y][x]) dark++;
      p += Math.floor(Math.abs(dark * 20 - size * size * 10) / (size * size)) * 10;
      return p;
    }
    var best = 0, bestP = Infinity;
    for (var k = 0; k < 8; k++) {
      applyMask(k); drawFormat(k);
      var pp = penalty();
      if (pp < bestP) { bestP = pp; best = k; }
      applyMask(k);
    }
    applyMask(best); drawFormat(best);
    return m;
  }

  /* SVG markup, with the 4-module quiet zone scanners need. */
  function svg(text) {
    var m = matrix(text), n = m.length, q = 4, d = '';
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++)
      if (m[y][x]) d += 'M' + (x + q) + ' ' + (y + q) + 'h1v1h-1z';
    var s = n + q * 2;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + s + ' ' + s + '" shape-rendering="crispEdges">' +
      '<rect width="' + s + '" height="' + s + '" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
  }

  /* Draw onto a <canvas> at roughly `px` pixels wide (always whole pixels per module). */
  function toCanvas(text, canvas, px) {
    var m = matrix(text), n = m.length, q = 4, cells = n + q * 2;
    var scale = Math.max(1, Math.floor((px || 1000) / cells));
    canvas.width = canvas.height = cells * scale;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++)
      if (m[y][x]) ctx.fillRect((x + q) * scale, (y + q) * scale, scale, scale);
    return canvas;
  }

  return { matrix: matrix, svg: svg, toCanvas: toCanvas };
})();
if (typeof module !== 'undefined') module.exports = AGFQR;
