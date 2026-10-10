/**
 * public/js/stopping.js
 * The stopping-distance explorer (lesson step kind "stopping", chapter 3):
 * a car approaching a hazard, a car behind a braking car, or a car before a
 * blind bend. Draws the distance before braking, the distance while braking
 * and the total to one scale, asks for a prediction before it shows any
 * comparison, then unlocks speed, reaction time and road surface.
 *
 * Classic script loaded before learn.js, wrapped in an IIFE; shares the
 * `state` and `App` globals. Every distance is looked up in the lesson
 * payload's `stopping.table` (src/lib/stopping.ts, tested); this file draws
 * those numbers and computes none of its own. Playback only interpolates
 * between them: constant speed while reacting, even deceleration while braking.
 *
 * Motion: with prefers-reduced-motion: reduce there is no playback; the
 * manual steps show the same four states without movement.
 */
(function() {
  'use strict';

  var W = 340;                 // viewBox width
  var START_X = W - 30;        // the car's front at 0 m; travel is right → left, like the text
  var END_X = 24;
  var ROW_H = 82;
  var TOP = 16;
  var SCALES = [20, 40, 60, 80, 100, 120, 160, 200, 240, 280];
  var UNKNOWN_PX = 34;         // the "?" beyond the dry braking distance — a symbol, not a length
  var SURFACE_FA = { dry: 'آسفالتِ خشک', wet: 'آسفالتِ خیس', snow: 'برف یا یخ' };
  var SURFACE_SHORT = { dry: 'خشک', wet: 'خیس', snow: 'برف/یخ' };
  var PHASES = 4;

  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  state.stopUi = {};     // per lesson step: { setting, phase, pred, picks, revealed, pick }
  state.stopRun = null;  // the step on screen: { key, index, content, raf, token, geo }

  function esc(v) { return App.escapeHtml(v == null ? '' : String(v)); }
  function fa(n) { return Number(n || 0).toLocaleString('fa-IR'); }
  function faDec(n) { return Number(n).toLocaleString('fa-IR', { maximumFractionDigits: 1 }); }
  function metres(n) { return fa(Math.round(n)); }
  function icon(id) { return '<svg class="ui-icon" aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function itSpan(text, cls) { return '<span class="' + (cls || 'it-text') + '" dir="ltr" lang="it">' + esc(text) + '</span>'; }
  function copy(s) { return { speed: s.speed, reaction: s.reaction, surface: s.surface }; }

  function run() { return state.stopRun; }
  function uiKey(index) { return state.lesson.lesson.id + ':' + index; }
  function ui(index, content) {
    var key = uiKey(index);
    if (!state.stopUi[key]) {
      state.stopUi[key] = { setting: copy(content.start), phase: 0, pred: 0, picks: [], revealed: [], pick: null };
    }
    return state.stopUi[key];
  }
  function model() { return state.lesson && state.lesson.stopping; }

  /** Look-up only: the model's estimate for one setting. */
  function estimate(s) {
    var table = model().table;
    for (var i = 0; i < table.length; i++) {
      var row = table[i];
      if (row.speed === s.speed && row.reaction === s.reaction && row.surface === s.surface) return row;
    }
    return null;
  }

  function predictionsDone(u, content) {
    return content.predictions.every(function(_, i) { return u.revealed[i]; });
  }
  function unlocked(u, content) {
    return predictionsDone(u, content) || (state.lesson && state.lesson.progress.state === 'completed');
  }

  // ── Scale and drawing ───────────────────────────────────────────────────────
  function scaleFor(maxM) {
    for (var i = 0; i < SCALES.length; i++) if (SCALES[i] >= maxM * 1.08 + 4) return SCALES[i];
    return Math.ceil((maxM * 1.1) / 40) * 40;
  }
  /** metres → x; one scale per drawing, so every bar's length is proportional to its number. */
  function geometry(scale) {
    var k = (START_X - END_X) / scale;
    return { scale: scale, k: k, x: function(m) { return START_X - m * k; } };
  }
  function reachM(e) {
    // Room for the "?" and the hazard sign when braking has no number.
    return e.brakingM === null ? e.totalMinM * 1.26 : e.totalM;
  }

  function defs(id) {
    return '<defs>' +
      '<pattern id="' + id + '-dash" width="11" height="14" patternUnits="userSpaceOnUse"><rect width="7" height="14" class="sx-dash-fill"/></pattern>' +
      '<pattern id="' + id + '-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
        '<rect width="6" height="6" class="sx-hatch-bg"/><rect width="2.6" height="6" class="sx-hatch-fill"/></pattern>' +
    '</defs>';
  }

  function bar(g, id, kind, m0, m1, y, extra) {
    var x0 = g.x(m0), x1 = g.x(m1);
    return '<rect class="sx-bar is-' + kind + '"' + (extra || '') + ' data-m0="' + m0 + '" data-m1="' + m1 + '" x="' + x1.toFixed(1) +
      '" y="' + y + '" width="' + Math.max(0, x0 - x1).toFixed(1) + '" height="14" fill="url(#' + id + '-' + (kind === 'reaction' ? 'dash' : 'hatch') + ')"/>';
  }

  function car(x, y, cls, rearAnchored) {
    // Front edge at x when rearAnchored is false; rear edge at x otherwise. Not to scale.
    var left = rearAnchored ? x - 26 : x;
    return '<g class="sx-car ' + cls + '" transform="translate(' + left.toFixed(1) + ' ' + y + ')">' +
      '<rect x="0" y="-8" width="26" height="16" rx="4"/><rect class="sx-car-glass" x="5" y="-6" width="5" height="12" rx="1.5"/></g>';
  }

  function hazard(x, y) {
    return '<g class="sx-hazard" transform="translate(' + x.toFixed(1) + ' ' + y + ')">' +
      '<polygon points="0,-11 10,7 -10,7"/><text y="5" text-anchor="middle">!</text></g>';
  }

  function bracket(g, m0, m1, y, label, cls) {
    var x0 = g.x(m0), x1 = g.x(m1);
    // Centred under the bracket, but kept inside the drawing (≈5.4 px per character at 12 px).
    var half = label.length * 2.7;
    var cx = Math.max(half + 4, Math.min(W - half - 4, (x0 + x1) / 2));
    return '<g class="sx-bracket ' + (cls || '') + '">' +
      '<path d="M' + x0.toFixed(1) + ' ' + (y - 5) + ' V' + y + ' H' + x1.toFixed(1) + ' V' + (y - 5) + '"/>' +
      '<text x="' + cx.toFixed(1) + '" y="' + (y + 12) + '" text-anchor="middle">' + esc(label) + '</text></g>';
  }

  function axis(g, y) {
    var q = g.scale / 4;
    var out = '<g class="sx-axis"><line x1="' + END_X + '" y1="' + y + '" x2="' + START_X + '" y2="' + y + '"/>';
    for (var i = 0; i <= 4; i++) {
      var x = g.x(q * i);
      out += '<line x1="' + x.toFixed(1) + '" y1="' + (y - 3) + '" x2="' + x.toFixed(1) + '" y2="' + (y + 3) + '"/>' +
        '<text x="' + x.toFixed(1) + '" y="' + (y + 15) + '" text-anchor="middle">' + fa(q * i) + (i === 0 ? ' متر' : '') + '</text>';
    }
    return out + '</g>';
  }

  /** One lane: the road, the distances, the car, and (optionally) the hazard and total. */
  function laneSvg(g, id, y0, e, opts) {
    var y = y0 + 22;
    var out = '<rect class="sx-road" x="0" y="' + (y0 + 14) + '" width="' + W + '" height="30"/>';
    if (opts.label) out += rtlText('sx-lane-label', W - 6, y0 + 9, opts.label);
    var stop = e.brakingM === null ? e.totalMinM : e.totalM;
    var showR = opts.phase >= 1, showB = opts.phase >= 2;
    out += bar(g, id, 'reaction', 0, e.reactionM, y, ' id="' + id + '-r"' + (showR ? '' : ' style="display:none"'));
    out += bar(g, id, 'braking', e.reactionM, stop, y, ' id="' + id + '-b"' + (showB ? '' : ' style="display:none"'));
    if (e.brakingM === null && showB) {
      var xu = g.x(stop);
      out += '<g class="sx-unknown"><rect x="' + (xu - UNKNOWN_PX).toFixed(1) + '" y="' + y + '" width="' + UNKNOWN_PX + '" height="14"/>' +
        '<text x="' + (xu - UNKNOWN_PX / 2).toFixed(1) + '" y="' + (y + 11) + '" text-anchor="middle">؟</text></g>';
    }
    if (opts.hazard) {
      var hx = e.brakingM === null ? g.x(stop) - UNKNOWN_PX - 14 : g.x(stop) - 13;
      out += hazard(hx, y0 + 29);
    }
    var at = opts.carAt === undefined ? [0, e.reactionM, stop, stop][opts.phase] : opts.carAt;
    // Off dry asphalt the car is at least this far on: drawn faded, never as a firm stop.
    var unsure = e.brakingM === null && at >= stop;
    out += '<g id="' + id + '-car">' + car(g.x(at), y0 + 29, 'is-you' + (unsure ? ' is-unsure' : ''), false) + '</g>';
    if (opts.total && opts.phase >= 3) {
      out += bracket(g, 0, stop, y0 + 58, (e.brakingM === null ? 'بیش از ' : 'حدود ') + metres(stop) + ' متر', 'is-total');
    }
    return out;
  }

  /**
   * Persian text placed by an edge: its right edge at x by default, its left
   * edge with leftEdge (SVG anchors follow the text's own direction).
   */
  function rtlText(cls, x, y, text, leftEdge) {
    return '<text' + (cls ? ' class="' + cls + '"' : '') + ' x="' + Number(x).toFixed(1) + '" y="' + y +
      '" direction="rtl" text-anchor="' + (leftEdge ? 'end' : 'start') + '">' + esc(text) + '</text>';
  }

  function svgOpen(id, height, label) {
    return '<svg class="sx-svg" id="' + id + '" viewBox="0 0 ' + W + ' ' + height + '" role="img" aria-label="' + esc(label) + '">' + defs(id);
  }

  /** Dims the road beyond what the driver can see; brackets and labels stay readable. */
  function sightOverlay(g, sight, height, rows) {
    var x = g.x(sight);
    var bands = '';
    for (var i = 0; i < rows; i++) bands += '<rect x="0" y="' + (TOP + ROW_H * i + 14) + '" width="' + x.toFixed(1) + '" height="30"/>';
    return '<g class="sx-sight">' + bands +
      '<line x1="' + x.toFixed(1) + '" y1="2" x2="' + x.toFixed(1) + '" y2="' + (height - 22) + '"/>' +
      rtlText('', x - 5, 11, 'پشتِ پیچ') + '</g>';
  }

  function summary(e) {
    var stop = e.brakingM === null ? 'بیش از ' + metres(e.totalMinM) : 'حدود ' + metres(e.totalM);
    return 'تصویرِ به‌مقیاس: قبل از ترمز حدود ' + metres(e.reactionM) + ' متر، حینِ ترمز ' +
      (e.brakingM === null ? 'بیش از ' + metres(e.brakingMinM) : 'حدود ' + metres(e.brakingM)) + ' متر، کل ' + stop + ' متر.';
  }

  /** The main picture for the current setting and phase. */
  function mainSvg(content, u) {
    var e = estimate(u.setting);
    var id = 'sxm';
    if (content.scene === 'following') {
      var gF = geometry(scaleFor(e.totalM));
      var h = TOP + ROW_H * 2 + 24;
      var leaderY = TOP, youY = TOP + ROW_H;
      var stopX = gF.x(e.totalM);
      var out = svgOpen(id, h, 'تصویرِ به‌مقیاس: کمترین فاصله حدود ' + metres(e.gapM) + ' متر؛ کل مسافتِ توقفِ تو حدود ' + metres(e.totalM) + ' متر.') +
        '<rect class="sx-road" x="0" y="' + (leaderY + 14) + '" width="' + W + '" height="30"/>' +
        rtlText('sx-lane-label', W - 6, leaderY + 9, 'خودروی جلو') +
        bar(gF, id, 'braking', e.gapM, e.totalM, leaderY + 22) +
        car(gF.x(e.gapM), leaderY + 29, 'is-leader', true) +
        '<rect class="sx-road" x="0" y="' + (youY + 14) + '" width="' + W + '" height="30"/>' +
        rtlText('sx-lane-label', W - 6, youY + 9, 'تو') +
        bar(gF, id, 'reaction', 0, e.reactionM, youY + 22) +
        bar(gF, id, 'braking', e.reactionM, e.totalM, youY + 22) +
        car(gF.x(0), youY + 29, 'is-you', false) +
        '<line class="sx-meet" x1="' + stopX.toFixed(1) + '" y1="' + (leaderY + 10) + '" x2="' + stopX.toFixed(1) + '" y2="' + (youY + 46) + '"/>' +
        rtlText('sx-meet-label', stopX + 4, leaderY + 60, 'هر دو این‌جا می‌ایستند', true) +
        bracket(gF, 0, e.gapM, youY + 58, 'کمترین فاصله: حدود ' + metres(e.gapM) + ' متر', 'is-gap') +
        axis(gF, h - 18) + '</svg>';
      return { html: out, geo: gF };
    }
    var g = geometry(scaleFor(Math.max(reachM(e), content.sight || 0)));
    var height = TOP + ROW_H + 24;
    var html = svgOpen(id, height, summary(e)) +
      laneSvg(g, id, TOP, e, { phase: u.phase, hazard: content.scene === 'hazard', total: true }) +
      (content.scene === 'sight' ? sightOverlay(g, content.sight, height, 1) : '') +
      axis(g, height - 18) + '</svg>';
    return { html: html, geo: g };
  }

  /** The line above the drawing: every assumption behind it. */
  function topLine(s, content) {
    var parts = [fa(s.speed) + ' کیلومتر بر ساعت', 'واکنش ' + faDec(s.reaction) + ' ثانیه'];
    parts.push(content.scene === 'following' ? 'هر دو خودرو با ترمزِ یکسان' : SURFACE_FA[s.surface]);
    return parts.join('، ');
  }

  /** What sets one compared row apart from the others (speed when nothing else does). */
  function diffLabel(rows, i, html) {
    var s = rows[i];
    var differs = function(k) { return rows.some(function(r) { return r[k] !== s[k]; }); };
    var parts = [];
    if (differs('speed') || (!differs('reaction') && !differs('surface'))) parts.push(fa(s.speed) + (html ? ' <bdi dir="ltr">km/h</bdi>' : ' کیلومتر بر ساعت'));
    if (differs('reaction')) parts.push('واکنش ' + faDec(s.reaction) + ' ثانیه');
    if (differs('surface')) parts.push(SURFACE_FA[s.surface]);
    return parts.join('، ');
  }

  /** The comparison a prediction reveals: its rows on one shared scale. */
  function compareSvg(content, prediction) {
    var rows = prediction.rows.map(estimate);
    var id = 'sxc';
    var following = content.scene === 'following';
    var max = Math.max.apply(null, rows.map(function(e) { return following ? e.gapM : reachM(e); }).concat(content.sight || 0));
    var g = geometry(scaleFor(max));
    var height = TOP + ROW_H * rows.length + 24;
    var out = svgOpen(id, height, 'مقایسه‌ی به‌مقیاس: ' + rows.map(function(e, i) {
      return diffLabel(prediction.rows, i, false) + '، ' + (following ? 'کمترین فاصله حدود ' + metres(e.gapM) : summary(e).replace('تصویرِ به‌مقیاس: ', ''));
    }).join(' | '));
    rows.forEach(function(e, i) {
      var y0 = TOP + ROW_H * i;
      var label = diffLabel(prediction.rows, i, false);
      if (following) {
        out += '<rect class="sx-road" x="0" y="' + (y0 + 14) + '" width="' + W + '" height="30"/>' +
          rtlText('sx-lane-label', W - 6, y0 + 9, label) +
          bar(g, id, 'reaction', 0, e.gapM, y0 + 22) + car(g.x(0), y0 + 29, 'is-you', false) +
          car(g.x(e.gapM), y0 + 29, 'is-leader', true) +
          bracket(g, 0, e.gapM, y0 + 58, 'حدود ' + metres(e.gapM) + ' متر', 'is-gap');
      } else {
        out += laneSvg(g, id + i, y0, e, { phase: 3, label: label, total: true, carAt: 0 });
      }
    });
    if (content.sight) out += sightOverlay(g, content.sight, height, rows.length);
    return out.replace(/url\(#sxc\d-/g, 'url(#sxc-') + axis(g, height - 18) + '</svg>';
  }

  // ── Readout, stepper, controls ──────────────────────────────────────────────
  function readoutHtml(content, u) {
    var e = estimate(u.setting);
    var unknown = e.brakingM === null;
    function row(kind, fa_, it, value, note, on) {
      return '<li class="sx-read' + (on ? ' is-on' : '') + '"><span class="sx-swatch is-' + kind + '" aria-hidden="true"></span>' +
        '<span class="sx-read-copy"><span class="sx-read-name">' + esc(fa_) + '</span>' + itSpan(it, 'sx-read-it') +
        (note ? '<small>' + esc(note) + '</small>' : '') + '</span><b class="sx-read-value">' + esc(value) + '</b></li>';
    }
    if (content.scene === 'following') {
      return row('reaction', 'کمترین فاصله', 'distanza minima', 'حدود ' + metres(e.gapM) + ' متر', 'وقتی هر دو یکسان ترمز کنید: همان مسافتِ واکنشِ تو', false) +
        row('total', 'اگر جلویی ناگهان بایستد', 'spazio di arresto', 'حدود ' + metres(e.totalM) + ' متر', 'مثلاً با تصادف: کل مسافتِ توقفِ تو', false);
    }
    var p = u.phase;
    var out = row('reaction', 'قبل از ترمز', 'spazio di reazione', 'حدود ' + metres(e.reactionM) + ' متر', faDec(u.setting.reaction) + ' ثانیه با همان سرعت', p === 1) +
      row('braking', 'حینِ ترمز', 'spazio di frenatura', (unknown ? 'بیش از ' + metres(e.brakingMinM) : 'حدود ' + metres(e.brakingM)) + ' متر',
        unknown ? SURFACE_FA[u.setting.surface] + ': بلندتر از خشک؛ عددِ قابل‌اعتمادی نیست' : 'از اولین فشارِ ترمز تا ایستادن', p === 2) +
      row('total', 'کل مسافتِ توقف', 'spazio di arresto', (unknown ? 'بیش از ' + metres(e.totalMinM) : 'حدود ' + metres(e.totalM)) + ' متر', 'قبل از ترمز + حینِ ترمز', p === 3);
    if (content.scene === 'sight') {
      var fits = !unknown && e.totalM <= content.sight;
      out += '<li class="sx-read sx-sight-verdict ' + (fits ? 'is-fits' : 'is-over') + '">' + icon(fits ? 'i-check' : 'i-alert') +
        '<span>' + (fits ? 'در ' + fa(content.sight) + ' متری که می‌بینی می‌ایستی (تخمین).' : 'از ' + fa(content.sight) + ' متری که می‌بینی بیشتر است: پیش از مانعِ پشتِ پیچ نمی‌ایستی.') + '</span></li>';
    }
    return out;
  }

  function phaseText(content, u) {
    var e = estimate(u.setting);
    var unknown = e.brakingM === null;
    if (u.phase === 0) return 'خطر را می‌بینی. هنوز با ' + fa(u.setting.speed) + ' کیلومتر بر ساعت می‌رانی.';
    if (u.phase === 1) return 'زمانِ واکنش (' + faDec(u.setting.reaction) + ' ثانیه): هنوز ترمز نکرده‌ای و حدود ' + metres(e.reactionM) + ' متر با همان سرعت جلو می‌روی.';
    if (u.phase === 2) {
      return unknown
        ? 'حینِ ترمز روی ' + SURFACE_FA[u.setting.surface] + ': بیشتر از ' + metres(e.brakingMinM) + ' متر (عددِ آسفالتِ خشک). چقدر بیشتر را با اطمینان نمی‌دانیم.'
        : 'حینِ ترمز: از اولین فشارِ ترمز تا ایستادن، حدود ' + metres(e.brakingM) + ' متر.';
    }
    var text = unknown
      ? 'کل مسافتِ توقف: بیش از ' + metres(e.totalMinM) + ' متر.'
      : 'کل مسافتِ توقف: حدود ' + metres(e.totalM) + ' متر. خطر باید دست‌کم این‌قدر جلوتر دیده شود تا جلویش بایستی.';
    if (content.scene === 'sight') {
      text += !unknown && e.totalM <= content.sight ? ' این در ' + fa(content.sight) + ' متری که می‌بینی جا می‌شود.' : ' این از ' + fa(content.sight) + ' متری که می‌بینی بیشتر است.';
    }
    return text;
  }

  function stepperHtml(content, u) {
    if (content.scene === 'following') return '';
    var e = estimate(u.setting);
    var canPlay = !reduceMotion.matches && e.brakingM !== null;
    return '<div class="sx-stepper-bar">' +
        '<button type="button" class="icon-button" onclick="App.stopStep(-1)"' + (u.phase > 0 ? '' : ' disabled') + ' aria-label="قدمِ قبلی">' + icon('i-chevron-right') + '</button>' +
        '<span class="sx-stepper-count">قدم ' + fa(u.phase + 1) + ' از ' + fa(PHASES) + '</span>' +
        '<button type="button" class="icon-button" onclick="App.stopStep(1)"' + (u.phase < PHASES - 1 ? '' : ' disabled') + ' aria-label="قدمِ بعدی">' + icon('i-chevron-left') + '</button>' +
      '</div>' +
      '<div class="sx-stepper-actions">' +
        (canPlay ? '<button type="button" class="btn btn-secondary btn-sm" id="sx-play" onclick="App.stopPlay()">' + icon('i-route') + '<span>پخشِ حرکت</span></button>' : '') +
        '<button type="button" class="btn btn-quiet btn-sm" onclick="App.stopReset()">' + icon('i-review') + '<span>از نو</span></button>' +
      '</div>' +
      '<p class="sx-current" id="sx-current" aria-live="polite">' + esc(phaseText(content, u)) + '</p>' +
      (!reduceMotion.matches && e.brakingM === null ? '<p class="sx-small">پخشِ حرکت فقط برای آسفالتِ خشک است، چون فقط برای آن عدد داریم.</p>' : '');
  }

  function controlsHtml(content, u, index) {
    if (!unlocked(u, content)) {
      return '<p class="sx-locked">' + icon('i-lock') + '<span>بعد از پیش‌بینی، خودت ' +
        content.controls.map(function(c) { return { speed: 'سرعت', reaction: 'زمانِ واکنش', surface: 'سطحِ جاده' }[c]; }).join('، ') +
        ' را عوض می‌کنی.</span></p>';
    }
    var m = model();
    var name = 'sx-' + index;
    var out = '<h3 class="sx-controls-title" id="sx-controls-title" tabindex="-1">حالا خودت امتحان کن</h3>';
    if (content.controls.indexOf('speed') !== -1) {
      var i = m.speeds.indexOf(u.setting.speed);
      out += '<div class="sx-ctl"><span class="sx-ctl-label" id="' + name + '-speed">سرعت</span>' +
        '<div class="sx-speed" role="group" aria-labelledby="' + name + '-speed">' +
          '<button type="button" class="sx-speed-btn" onclick="App.stopSpeed(-1)"' + (i > 0 ? '' : ' disabled') + ' aria-label="۱۰ کیلومتر بر ساعت کمتر">−</button>' +
          '<output class="sx-speed-value" id="sx-speed-value" aria-live="polite">' + fa(u.setting.speed) + ' <bdi dir="ltr">km/h</bdi></output>' +
          '<button type="button" class="sx-speed-btn" onclick="App.stopSpeed(1)"' + (i < m.speeds.length - 1 ? '' : ' disabled') + ' aria-label="۱۰ کیلومتر بر ساعت بیشتر">+</button>' +
        '</div></div>';
    }
    function radios(kind, legend, values, labelOf) {
      return '<fieldset class="sx-ctl sx-seg"><legend class="sx-ctl-label">' + legend + '</legend><div class="sx-seg-row">' +
        values.map(function(v) {
          return '<label class="sx-seg-opt"><input type="radio" name="' + name + '-' + kind + '" value="' + v + '"' +
            (String(u.setting[kind]) === String(v) ? ' checked' : '') + ' onchange="App.stopSet(\'' + kind + '\', this.value)"><span>' + labelOf(v) + '</span></label>';
        }).join('') + '</div></fieldset>';
    }
    if (content.controls.indexOf('reaction') !== -1) out += radios('reaction', 'زمانِ واکنش (ثانیه)', m.reactions, faDec);
    if (content.controls.indexOf('surface') !== -1) out += radios('surface', 'سطحِ جاده', ['dry', 'wet', 'snow'], function(v) { return SURFACE_SHORT[v]; });
    return out;
  }

  function assumptionsHtml() {
    var m = model();
    var decel = m.friction * m.gravity;
    return '<details class="sx-assume"><summary>' + icon('i-help') + '<span>فرض‌های این تخمین و منبعشان</span></summary><ul>' +
      '<li>سرعت به متر بر ثانیه: <bdi dir="ltr">km/h ÷ 3.6</bdi>. مسافتِ واکنش = سرعت × زمانِ واکنش.</li>' +
      '<li>زمانِ واکنشِ ۱ ثانیه همان مبنای عددهای بانک سؤال است («در یک ثانیه با ۵۰ km/h حدود ۱۴ متر»). ۲٫۵ ثانیه زمانِ واکنشِ ۹۰ درصدِ رانندگان در برابرِ خطرِ غیرمنتظره است (WHO 2008، به نقل از Comune di Firenze).</li>' +
      '<li>ترمز روی آسفالتِ خشک: <bdi dir="ltr">v² / (2 · μ · g)</bdi> با μ = ' + faDec(m.friction) + ' و g = ' + faDec(m.gravity) +
        '؛ یعنی کاهشِ سرعتِ یکنواختِ حدود ' + faDec(decel) + ' متر بر مجذورِ ثانیه. با ۱ ثانیه واکنش، نتیجه تا یک متر با عددهای WHO/OECD می‌خواند (۲۷، ۳۶ و ۵۸ متر با ۵۰، ۶۰ و ۸۰ km/h).</li>' +
      '<li>برای آسفالتِ خیس، برف و یخ عددی نمی‌گذاریم: منابع با هم نمی‌خوانند. فقط می‌گوییم ترمز از آسفالتِ خشک بلندتر است، همان چیزی که بانک سؤال می‌گوید.</li>' +
      '<li>تصویر به مقیاس است: طولِ هر نوار با عددش متناسب است. شکلِ خودرو و تابلو به مقیاس نیستند.</li>' +
      '<li>این‌ها تخمینِ آموزشی‌اند: فاصله‌ای قانونی نیستند، پیش‌بینیِ دقیقِ یک خودروی واقعی نیستند و تضمینِ ایمنی هم نیستند.</li>' +
    '</ul></details>';
  }

  // ── Predictions ─────────────────────────────────────────────────────────────
  function ratioCell(a, b, unknownAfter) {
    if (unknownAfter) return 'بیشتر';
    if (!a) return '—';
    return '×' + faDec(b / a);
  }

  function compareTable(content, prediction) {
    var rows = prediction.rows.map(estimate);
    var heads = prediction.rows.map(function(_, i) { return '<th scope="col">' + diffLabel(prediction.rows, i, true) + '</th>'; }).join('');
    var two = rows.length === 2;
    function line(name, it, values, ratio) {
      return '<tr><th scope="row">' + esc(name) + ' ' + itSpan(it, 'sx-read-it') + '</th>' + values.map(function(v) { return '<td>' + esc(v) + '</td>'; }).join('') +
        (two && content.scene !== 'sight' ? '<td class="sx-ratio">' + esc(ratio) + '</td>' : '') + '</tr>';
    }
    var body;
    if (content.scene === 'following') {
      body = line('کمترین فاصله', 'distanza minima', rows.map(function(e) { return metres(e.gapM); }), ratioCell(rows[0].gapM, rows[1] && rows[1].gapM));
    } else {
      var value = function(n, unknown) { return (unknown ? 'بیش از ' : '') + metres(n); };
      body = line('قبل از ترمز', 'spazio di reazione', rows.map(function(e) { return value(e.reactionM, false); }), two ? ratioCell(rows[0].reactionM, rows[1].reactionM) : '') +
        line('حینِ ترمز', 'spazio di frenatura', rows.map(function(e) { return value(e.brakingMinM, e.brakingM === null); }), two ? ratioCell(rows[0].brakingMinM, rows[1].brakingMinM, rows[1].brakingM === null) : '') +
        line('کل', 'spazio di arresto', rows.map(function(e) { return value(e.totalMinM, e.brakingM === null); }), two ? ratioCell(rows[0].totalMinM, rows[1].totalMinM, rows[1].brakingM === null) : '');
      if (content.scene === 'sight') {
        body += '<tr><th scope="row">در ' + fa(content.sight) + ' متر می‌ایستی؟</th>' + rows.map(function(e) {
          return '<td>' + (e.totalM !== null && e.totalM <= content.sight ? 'بله' : 'نه') + '</td>';
        }).join('') + '</tr>';
      }
    }
    return '<div class="sx-table-wrap"><table class="sx-table"><thead><tr><th scope="col" class="sx-unit">به متر</th>' + heads + (two && content.scene !== 'sight' ? '<th scope="col">نسبت</th>' : '') +
      '</tr></thead><tbody>' + body + '</tbody></table></div>';
  }

  function predictHtml(content, u, index) {
    var total = content.predictions.length;
    var p = content.predictions[u.pred];
    var kicker = '<p class="sx-predict-kicker">' + icon('i-target') + 'پیش‌بینی ' + fa(u.pred + 1) + ' از ' + fa(total) + '</p>';
    if (!u.revealed[u.pred]) {
      var name = 'sx-pred-' + index + '-' + u.pred;
      return kicker + '<fieldset class="sx-options"><legend class="sx-question">' + esc(p.question) + '</legend>' +
        p.options.map(function(o, i) {
          return '<label class="sx-option"><input type="radio" name="' + name + '" value="' + i + '"' + (u.pick === i ? ' checked' : '') +
            ' onchange="App.stopPick(' + i + ')"><span>' + esc(o.text) + '</span></label>';
        }).join('') + '</fieldset>' +
        '<button type="button" class="btn btn-primary btn-full" id="sx-check" onclick="App.stopCheck()"' + (u.pick === null ? ' disabled' : '') + '>' +
          '<span>ثبتِ پیش‌بینی و دیدنِ نتیجه</span></button>';
    }
    var right = u.picks[u.pred] === p.answer;
    var verdict = right
      ? '<p class="sx-verdict is-right" id="sx-verdict" tabindex="-1">' + icon('i-check') + '<span>پیش‌بینی‌ات درست بود: «' + esc(p.options[p.answer].text) + '»</span></p>'
      : '<p class="sx-verdict is-wrong" id="sx-verdict" tabindex="-1">' + icon('i-x') + '<span>پیش‌بینی‌ات «' + esc(p.options[u.picks[u.pred]].text) +
        '» بود؛ مدل چیزِ دیگری نشان می‌دهد: «' + esc(p.options[p.answer].text) + '»</span></p>';
    var last = u.pred === total - 1;
    return kicker + '<p class="sx-question">' + esc(p.question) + '</p>' + verdict +
      '<figure class="sx-compare">' + compareSvg(content, p) + '<figcaption class="sx-small">همه‌ی ردیف‌ها با یک مقیاس کشیده شده‌اند؛ عددها تخمینِ آموزشی‌اند.</figcaption></figure>' +
      compareTable(content, p) +
      '<p class="sx-explain">' + esc(p.explain) + '</p>' +
      (last
        ? '<button type="button" class="btn btn-secondary btn-full" onclick="App.stopTryIt()">' + icon('i-route') + '<span>حالا خودت امتحان کن</span></button>'
        : '<button type="button" class="btn btn-primary btn-full" onclick="App.stopNextPrediction()"><span>پیش‌بینیِ بعدی</span>' + icon('i-chevron-left') + '</button>');
  }

  // ── Step HTML (called by learn.js) ──────────────────────────────────────────
  App.stoppingStepHtml = function(content, index) {
    if (!model()) {
      return '<h2 class="lesson-step-title" tabindex="-1" data-step-heading>' + esc(content.title) + '</h2>' +
        '<p class="practice-status is-error" role="alert">این تمرین بارگذاری نشد. درس را دوباره باز کن.</p>';
    }
    var u = ui(index, content);
    return '<h2 class="lesson-step-title" tabindex="-1" data-step-heading>' + esc(content.title) + '</h2>' +
      '<p class="lesson-text">' + esc(content.body) + '</p>' +
      '<section class="sx" aria-label="کاوشگرِ مسافتِ توقف">' +
        '<p class="sx-setting" id="sx-setting">' + esc(topLine(u.setting, content)) + '</p>' +
        '<figure class="sx-figure" id="sx-figure"></figure>' +
        '<p class="sx-small sx-estimate">' + icon('i-alert') + '<span>تخمینِ آموزشی با فرض‌های پایینِ همین بخش؛ فاصله‌ی قانونی یا تضمینِ ایمنی نیست.</span></p>' +
        '<ul class="sx-readout" id="sx-readout"></ul>' +
        '<div class="sx-stepper" id="sx-stepper"' + (content.scene === 'following' ? ' hidden' : '') + '></div>' +
        '<div class="sx-controls" id="sx-controls"></div>' +
        assumptionsHtml() +
      '</section>' +
      '<section class="sx-predict" id="sx-predict" aria-label="پیش‌بینی"></section>' +
      '<p class="lesson-takeaway" id="sx-takeaway"' + (predictionsDone(u, content) ? '' : ' hidden') + '>' + icon('i-sparkles') + '<span>' + esc(content.takeaway) + '</span></p>' +
      (content.rule ? '<p class="lesson-rule">مبنا: <bdi dir="ltr">' + esc(content.rule) + '</bdi></p>' : '');
  };

  /** After learn.js has put the step HTML in the DOM. */
  App.mountStopping = function(content, index) {
    stopAnim();
    state.stopRun = { key: uiKey(index), index: index, content: content, raf: 0, token: null, geo: null };
    if (!model()) return;
    renderMain();
    renderPredict();
    renderControls();
  };

  /** True when "Next" may leave this step: every prediction has been revealed. */
  App.stoppingDone = function(index) {
    var key = uiKey(index);
    var u = state.stopUi[key];
    var content = state.lesson && state.lesson.lesson.steps[index];
    return !!(u && content && predictionsDone(u, content));
  };

  App.leaveStopping = function() {
    stopAnim();
    state.stopRun = null;
  };

  function current() {
    var r = run();
    return r ? { r: r, u: ui(r.index, r.content), content: r.content } : null;
  }

  function renderMain() {
    var c = current();
    if (!c) return;
    var figure = document.getElementById('sx-figure');
    if (!figure) return;
    var drawn = mainSvg(c.content, c.u);
    figure.innerHTML = drawn.html;
    c.r.geo = drawn.geo;
    document.getElementById('sx-readout').innerHTML = readoutHtml(c.content, c.u);
    var stepper = document.getElementById('sx-stepper');
    if (stepper && c.content.scene !== 'following') stepper.innerHTML = stepperHtml(c.content, c.u);
    var setting = document.getElementById('sx-setting');
    if (setting) setting.textContent = topLine(c.u.setting, c.content);
  }

  function renderControls() {
    var c = current();
    var box = document.getElementById('sx-controls');
    if (c && box) box.innerHTML = controlsHtml(c.content, c.u, c.r.index);
  }

  function renderPredict() {
    var c = current();
    var box = document.getElementById('sx-predict');
    if (c && box) box.innerHTML = predictHtml(c.content, c.u, c.r.index);
  }

  // ── Actions ────────────────────────────────────────────────────────────────
  App.stopStep = function(delta) {
    var c = current();
    if (!c) return;
    stopAnim();
    c.u.phase = Math.max(0, Math.min(PHASES - 1, c.u.phase + delta));
    renderMain();
  };

  App.stopReset = function() {
    var c = current();
    if (!c) return;
    stopAnim();
    c.u.phase = 0;
    if (unlocked(c.u, c.content)) c.u.setting = copy(c.content.start);
    renderMain();
    renderControls();
  };

  App.stopSpeed = function(direction) {
    var c = current();
    if (!c || !unlocked(c.u, c.content)) return;
    var speeds = model().speeds;
    var i = speeds.indexOf(c.u.setting.speed) + direction;
    if (i < 0 || i >= speeds.length) return;
    stopAnim();
    c.u.setting.speed = speeds[i];
    c.u.phase = PHASES - 1;
    renderMain();
    // Only the value and the ends change, so focus stays on the button that was pressed.
    var value = document.getElementById('sx-speed-value');
    if (value) value.innerHTML = fa(c.u.setting.speed) + ' <bdi dir="ltr">km/h</bdi>';
    var buttons = document.querySelectorAll('.sx-speed-btn');
    if (buttons.length === 2) {
      buttons[0].disabled = i === 0;
      buttons[1].disabled = i === speeds.length - 1;
    }
  };

  App.stopSet = function(kind, value) {
    var c = current();
    if (!c || !unlocked(c.u, c.content)) return;
    stopAnim();
    c.u.setting[kind] = kind === 'reaction' ? Number(value) : value;
    c.u.phase = PHASES - 1;
    renderMain();
  };

  App.stopPick = function(i) {
    var c = current();
    if (!c || c.u.revealed[c.u.pred]) return;
    c.u.pick = i;
    var check = document.getElementById('sx-check');
    if (check) check.disabled = false;
  };

  App.stopCheck = function() {
    var c = current();
    if (!c || c.u.pick === null || c.u.revealed[c.u.pred]) return;
    c.u.picks[c.u.pred] = c.u.pick;
    c.u.revealed[c.u.pred] = true;
    c.u.pick = null;
    renderPredict();
    if (predictionsDone(c.u, c.content)) {
      renderControls();
      var takeaway = document.getElementById('sx-takeaway');
      if (takeaway) takeaway.hidden = false;
      if (typeof App.refreshLessonDock === 'function') App.refreshLessonDock();
    }
    var verdict = document.getElementById('sx-verdict');
    if (verdict) verdict.focus({ preventScroll: false });
  };

  App.stopNextPrediction = function() {
    var c = current();
    if (!c || c.u.pred >= c.content.predictions.length - 1) return;
    c.u.pred += 1;
    renderPredict();
    var box = document.getElementById('sx-predict');
    if (box) box.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    var first = box && box.querySelector('input');
    if (first) first.focus({ preventScroll: true });
  };

  App.stopTryIt = function() {
    var figure = document.getElementById('sx-figure');
    if (figure) figure.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    var title = document.getElementById('sx-controls-title');
    if (title) title.focus({ preventScroll: true });
  };

  // ── Playback ───────────────────────────────────────────────────────────────
  function stopAnim() {
    var r = run();
    if (!r) return;
    if (r.raf) cancelAnimationFrame(r.raf);
    r.raf = 0;
    r.token = null;
  }

  App.stopPlay = function() {
    var c = current();
    if (!c || reduceMotion.matches) return;
    var e = estimate(c.u.setting);
    if (e.brakingM === null) return;
    stopAnim();
    c.u.phase = 0;
    renderMain();
    var r = c.r;
    var token = {};
    r.token = token;
    var g = r.geo;
    var carEl = document.getElementById('sxm-car');
    var rBar = document.getElementById('sxm-r');
    var bBar = document.getElementById('sxm-b');
    var text = document.getElementById('sx-current');
    var play = document.getElementById('sx-play');
    if (play) {
      play.innerHTML = icon('i-x') + '<span>توقف</span>';
      play.onclick = function() { stopAnim(); renderMain(); };
    }
    var reactS = c.u.setting.reaction, brakeS = e.brakingS;
    var started = null;
    var shownPhase = 0;
    function setBar(el, m0, m1) {
      el.style.display = m1 > m0 ? '' : 'none';
      el.setAttribute('x', g.x(m1).toFixed(1));
      el.setAttribute('width', Math.max(0, g.x(m0) - g.x(m1)).toFixed(1));
    }
    function frame(now) {
      if (r.token !== token) return;
      if (started === null) started = now;
      var t = (now - started) / 1000;
      var pos;
      if (t < reactS) {
        pos = e.reactionM * (t / reactS);
      } else {
        var k = Math.min(1, (t - reactS) / brakeS);
        pos = e.reactionM + e.brakingM * (1 - (1 - k) * (1 - k));
      }
      carEl.setAttribute('transform', 'translate(' + (g.x(pos) - g.x(0)).toFixed(1) + ' 0)');
      setBar(rBar, 0, Math.min(pos, e.reactionM));
      setBar(bBar, e.reactionM, Math.max(e.reactionM, pos));
      var phase = t < reactS ? 1 : 2;
      if (phase !== shownPhase && text) {
        shownPhase = phase;
        c.u.phase = phase;
        text.textContent = phaseText(c.content, c.u);
      }
      if (t < reactS + brakeS) {
        r.raf = requestAnimationFrame(frame);
      } else {
        r.raf = 0;
        r.token = null;
        c.u.phase = PHASES - 1;
        renderMain();
      }
    }
    r.raf = requestAnimationFrame(frame);
  };
})();
