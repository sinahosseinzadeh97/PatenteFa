/**
 * public/js/road.js
 * Original top-down road drawings for the lesson step kind "anatomy"
 * (src/content/lessons.ts → RoadScene). Each tappable part is a <g data-part>;
 * the step's names and explanations come from the lesson content, so this file
 * only draws. Classic script loaded before learn.js; exposes App.roadSceneSvg.
 *
 * The drawing is aria-hidden: learn.js renders every part as a real button too,
 * so keyboard and screen-reader users get the same content without the SVG.
 * Road scenes stay asphalt in both themes (design.md): they are drawings of roads.
 */
(function() {
  'use strict';

  function rect(x, y, w, h, cls, extra) {
    return '<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + (extra || '') + '/>';
  }
  function line(x1, y1, x2, y2, cls) {
    return '<line class="' + cls + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
  }
  function label(x, y, text, cls) {
    return '<text class="rd-label' + (cls ? ' ' + cls : '') + '" x="' + x + '" y="' + y + '">' + text + '</text>';
  }
  function car(x, y, w, h, cls, dir) {
    var nose = dir === 'left'
      ? 'M' + (x + 7) + ' ' + (y + 3) + ' L' + (x + 2) + ' ' + (y + h / 2) + ' L' + (x + 7) + ' ' + (y + h - 3) + 'Z'
      : dir === 'up'
        ? 'M' + (x + 3) + ' ' + (y + 7) + ' L' + (x + w / 2) + ' ' + (y + 2) + ' L' + (x + w - 3) + ' ' + (y + 7) + 'Z'
        : dir === 'down'
          ? 'M' + (x + 3) + ' ' + (y + h - 7) + ' L' + (x + w / 2) + ' ' + (y + h - 2) + ' L' + (x + w - 3) + ' ' + (y + h - 7) + 'Z'
          : 'M' + (x + w - 7) + ' ' + (y + 3) + ' L' + (x + w - 2) + ' ' + (y + h / 2) + ' L' + (x + w - 7) + ' ' + (y + h - 3) + 'Z';
    return '<g class="rd-car ' + (cls || '') + '">' + rect(x, y, w, h, 'rd-car-body', ' rx="4"') + '<path class="rd-car-nose" d="' + nose + '"/></g>';
  }
  function person(x, y, cls) {
    return '<g class="rd-person ' + (cls || '') + '"><circle cx="' + x + '" cy="' + y + '" r="4.2"/><rect x="' + (x - 3.4) + '" y="' + (y + 4) + '" width="6.8" height="9" rx="3"/></g>';
  }
  function zebra(x, y, w, h) {
    var out = '';
    for (var i = 0; i * 9 < h; i++) out += rect(x, y + i * 9 + 2, w, 5, 'rd-zebra');
    return out;
  }
  function hatch(points, x0, y0, x1, y1) {
    var id = 'h' + Math.round(x0) + Math.round(y0);
    var stripes = '';
    for (var s = x0 - (y1 - y0); s < x1; s += 8) stripes += line(s, y1, s + (y1 - y0), y0, 'rd-hatch');
    return '<clipPath id="' + id + '"><polygon points="' + points + '"/></clipPath>' +
      '<g clip-path="url(#' + id + ')">' + stripes + '</g><polygon class="rd-solid-edge" points="' + points + '"/>';
  }
  /** A tappable part: its shapes, then a transparent hit area and a ring (shown when selected) per box. */
  function part(id, inner, box) {
    var boxes = Array.isArray(box[0]) ? box : [box];
    return '<g class="rd-part" data-part="' + id + '" onclick="App.selectRoadPart(this)">' + inner +
      boxes.map(function(b) {
        return rect(b[0], b[1], b[2], b[3], 'rd-hit') + rect(b[0] - 2, b[1] - 2, b[2] + 4, b[3] + 4, 'rd-ring', ' rx="6"');
      }).join('') + '</g>';
  }

  var SCENES = {
    street: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-ground') +
        part('strada', rect(6, 192, 328, 22, 'rd-brace', ' rx="11"') + label(170, 207, '← strada →', 'rd-label-center'), [6, 192, 328, 22]) +
        part('marciapiede', rect(0, 0, 340, 32, 'rd-walk') + line(0, 32, 340, 32, 'rd-curb') + person(60, 10) + label(250, 20, 'marciapiede', 'rd-label-dark'), [0, 0, 340, 32]) +
        part('banchina', rect(0, 32, 340, 14, 'rd-gravel') + rect(0, 140, 340, 14, 'rd-gravel'), [[0, 33, 340, 12], [0, 141, 340, 12]]) +
        part('carreggiata', rect(0, 48, 340, 92, 'rd-asphalt') + line(0, 94, 340, 94, 'rd-dash') +
          car(206, 112, 40, 18, 'rd-car-other', 'left') + label(8, 134, 'carreggiata'), [0, 48, 340, 92]) +
        part('corsia', rect(0, 48, 340, 46, 'rd-clear') + car(60, 62, 40, 18, 'rd-car-you', 'right') + label(8, 60, 'corsia'), [0, 48, 340, 46]) +
        part('margine', line(0, 47, 340, 47, 'rd-line') + line(0, 141, 340, 141, 'rd-line') +
          rect(0, 43, 340, 8, 'rd-clear') + rect(0, 137, 340, 8, 'rd-clear'), [[0, 44, 340, 6], [0, 138, 340, 6]]) +
        part('ciclabile', rect(0, 154, 340, 28, 'rd-bike') + line(0, 154, 340, 154, 'rd-line') +
          '<g class="rd-bike-mark"><circle cx="150" cy="168" r="5"/><circle cx="166" cy="168" r="5"/><path d="M150 168 L157 161 L166 168 M157 161 L160 161"/></g>' +
          label(250, 172, 'pista ciclabile'), [0, 154, 340, 28]);
    } },

    lanes: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-ground') +
        rect(0, 14, 340, 46, 'rd-asphalt rd-faded') + line(0, 37, 340, 37, 'rd-dash') +
        rect(0, 60, 340, 12, 'rd-median') +
        part('sorpasso', rect(0, 72, 340, 38, 'rd-asphalt') + car(240, 82, 40, 18, 'rd-car-other', 'right') + label(8, 86, 'sorpasso'), [0, 72, 340, 38]) +
        part('marcia', rect(0, 110, 340, 38, 'rd-asphalt') + line(0, 110, 340, 110, 'rd-dash') + car(150, 120, 40, 18, 'rd-car-you', 'right') + label(8, 124, 'marcia'), [0, 110, 340, 38]) +
        part('accelerazione', '<path class="rd-band" d="M14 222 C16 192 30 160 64 160 L150 160"/><polygon class="rd-asphalt" points="150,150 178,150 150,170"/>' +
          line(40, 150, 150, 150, 'rd-dash') + car(70, 152, 34, 16, 'rd-car-other', 'right') + label(16, 190, 'accelerazione'), [[40, 150, 138, 20], [6, 170, 40, 50]]) +
        part('emergenza', rect(178, 150, 48, 20, 'rd-asphalt') + line(178, 150, 226, 150, 'rd-line') + label(180, 182, 'emergenza'), [178, 150, 48, 20]) +
        part('decelerazione', '<polygon class="rd-asphalt" points="226,150 254,150 254,170"/><path class="rd-band" d="M254 160 L276 160 C310 160 324 192 326 222"/>' +
          line(226, 150, 300, 150, 'rd-dash') + label(232, 196, 'decelerazione'), [[226, 150, 80, 20], [300, 170, 34, 50]]) +
        line(0, 72, 340, 72, 'rd-line');
    } },

    elements: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-ground') +
        rect(0, 0, 340, 28, 'rd-building') +
        rect(0, 28, 340, 26, 'rd-walk') + line(0, 54, 340, 54, 'rd-curb') +
        rect(0, 54, 340, 112, 'rd-asphalt') + line(0, 110, 40, 110, 'rd-dash') + line(120, 110, 150, 110, 'rd-dash') + line(240, 110, 340, 110, 'rd-dash') +
        rect(0, 166, 340, 26, 'rd-walk') + line(0, 166, 340, 166, 'rd-curb') +
        part('attraversamento', zebra(52, 56, 56, 108), [52, 56, 56, 108]) +
        part('salvagente', rect(46, 102, 68, 16, 'rd-refuge', ' rx="5"') + '<circle class="rd-beacon" cx="50" cy="110" r="3.4"/><circle class="rd-beacon" cx="110" cy="110" r="3.4"/>', [46, 102, 68, 16]) +
        part('isola', hatch('150,110 240,100 240,120', 150, 100, 240, 120), [150, 98, 90, 24]) +
        part('carrabile', rect(270, 28, 40, 26, 'rd-driveway') + rect(270, 0, 40, 28, 'rd-garage') +
          '<g class="rd-sign"><rect x="312" y="4" width="22" height="14" rx="2"/><path d="M316 11 H330"/></g>', [270, 0, 64, 54]) +
        car(150, 128, 40, 18, 'rd-car-other', 'right') + car(270, 72, 40, 18, 'rd-car-other', 'left') +
        label(178, 96, 'isola') + label(4, 100, 'salvagente');
    } },

    queue: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-ground') +
        rect(0, 70, 340, 74, 'rd-asphalt') + line(0, 107, 340, 107, 'rd-dash') +
        line(0, 70, 340, 70, 'rd-line') + line(0, 144, 340, 144, 'rd-line') +
        part('sbocco', rect(26, 144, 40, 76, 'rd-asphalt') + label(24, 214, 'strada laterale'), [26, 112, 40, 108]) +
        part('incrocio', rect(112, 0, 50, 70, 'rd-asphalt') + rect(112, 144, 50, 76, 'rd-asphalt') + rect(112, 70, 50, 74, 'rd-free'), [112, 0, 50, 220]) +
        part('attraversamento', zebra(196, 72, 22, 70), [196, 72, 22, 70]) +
        part('binari', line(272, 70, 272, 144, 'rd-rail') + line(284, 70, 284, 144, 'rd-rail') +
          line(272, 0, 272, 70, 'rd-rail rd-rail-out') + line(284, 0, 284, 70, 'rd-rail rd-rail-out') +
          line(272, 144, 272, 220, 'rd-rail rd-rail-out') + line(284, 144, 284, 220, 'rd-rail rd-rail-out'), [266, 70, 24, 74]) +
        car(72, 116, 34, 18, 'rd-car-you', 'left') + car(168, 116, 24, 18, 'rd-car-other', 'left') +
        car(224, 116, 34, 18, 'rd-car-other', 'left') + car(294, 116, 34, 18, 'rd-car-other', 'left') +
        part('distanza', car(4, 80, 30, 18, 'rd-car-other', 'right') + car(76, 80, 30, 18, 'rd-car-other', 'right') +
          line(38, 89, 72, 89, 'rd-arrow') + '<path class="rd-arrow-head" d="M38 89 l6 -4 v8z M72 89 l-6 -4 v8z"/>', [2, 78, 106, 22]) +
        label(122, 14, 'incrocio') + label(232, 66, 'strisce') + label(258, 14, 'tram');
    } },

    cyclist: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-ground') +
        rect(0, 30, 340, 122, 'rd-asphalt') + line(0, 30, 340, 30, 'rd-line') + line(0, 91, 340, 91, 'rd-dash') +
        rect(0, 152, 340, 30, 'rd-asphalt rd-faded') + line(0, 152, 340, 152, 'rd-line') +
        rect(0, 182, 340, 38, 'rd-walk') +
        part('specchietto', '<polygon class="rd-cone" points="200,104 40,70 40,140"/>' +
          '<g class="rd-person rd-cyclist"><circle cx="82" cy="108" r="4"/><rect x="74" y="112" width="16" height="4" rx="2"/></g>', [40, 70, 160, 70]) +
        part('montante', '<polygon class="rd-cone rd-cone-blind" points="250,98 336,36 300,36"/>' +
          '<g class="rd-person rd-cyclist"><circle cx="314" cy="48" r="4"/><rect x="306" y="52" width="16" height="4" rx="2"/></g>', [250, 34, 88, 66]) +
        car(200, 98, 50, 22, 'rd-car-you', 'right') +
        part('distanza', '<g class="rd-person rd-cyclist"><circle cx="226" cy="138" r="4"/><rect x="218" y="142" width="16" height="4" rx="2"/></g>' +
          line(225, 122, 225, 132, 'rd-arrow') + label(232, 130, '1,5 m'), [212, 120, 50, 30]) +
        part('sportello', car(60, 158, 50, 20, 'rd-car-parked', 'right') + '<rect class="rd-door" x="96" y="144" width="4" height="16" transform="rotate(-35 98 158)"/>', [56, 140, 58, 40]);
    } },

    crossing: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-ground') +
        rect(0, 18, 340, 36, 'rd-walk') + line(0, 54, 340, 54, 'rd-curb') +
        rect(0, 54, 340, 120, 'rd-asphalt') + line(0, 114, 140, 114, 'rd-dash') + line(206, 114, 340, 114, 'rd-dash') +
        rect(0, 174, 340, 30, 'rd-walk') + line(0, 174, 340, 174, 'rd-curb') +
        zebra(146, 56, 56, 116) +
        part('scivolo', rect(150, 40, 48, 14, 'rd-ramp') + '<path class="rd-ramp-mark" d="M160 47 h28"/>', [150, 38, 48, 16]) +
        part('parcheggiate', car(70, 150, 44, 20, 'rd-car-parked', 'right') + car(232, 150, 44, 20, 'rd-car-parked', 'right') + person(124, 152, 'rd-child'), [66, 146, 64, 28]) +
        part('fermo', person(174, 102), [164, 94, 20, 26]) +
        part('indietro', person(160, 70) + '<path class="rd-arrow" d="M168 66 q10 -6 14 4"/><path class="rd-arrow-head" d="M182 70 l-5 -1 l3 -4z"/>', [150, 58, 36, 26]) +
        part('anziano', person(188, 132, 'rd-elder') + line(194, 138, 197, 148, 'rd-cane'), [178, 122, 24, 30]) +
        car(20, 120, 40, 18, 'rd-car-you', 'right') + car(276, 76, 40, 18, 'rd-car-other', 'left');
    } },

    school: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-ground') +
        rect(0, 0, 340, 40, 'rd-walk') + line(0, 40, 340, 40, 'rd-curb') +
        rect(0, 40, 340, 120, 'rd-asphalt') + line(0, 100, 340, 100, 'rd-dash') +
        rect(140, 160, 140, 24, 'rd-asphalt') + rect(0, 184, 340, 36, 'rd-walk') + line(0, 160, 140, 160, 'rd-curb') + line(280, 160, 340, 160, 'rd-curb') +
        part('semaforo', '<g class="rd-light"><rect x="34" y="4" width="12" height="30" rx="3"/><circle cx="40" cy="11" r="3.2" class="rd-red"/><circle cx="40" cy="19" r="3.2"/><circle cx="40" cy="27" r="3.2"/></g>' +
          person(58, 22, 'rd-child') + person(70, 24, 'rd-child') + person(64, 30, 'rd-child'), [30, 2, 50, 38]) +
        part('scuolabus', '<g class="rd-bus"><rect x="150" y="146" width="110" height="30" rx="5"/><path d="M160 152 h80" /></g>', [148, 144, 114, 34]) +
        part('nascosti', person(268, 150, 'rd-child') + person(278, 156, 'rd-child'), [262, 140, 26, 30]) +
        part('corsa', person(120, 98, 'rd-child') + '<path class="rd-arrow" d="M124 112 q8 14 20 26"/><path class="rd-arrow-head" d="M144 138 l-6 -1 l3 -5z"/>', [110, 88, 40, 54]) +
        car(20, 112, 40, 18, 'rd-car-you', 'right') + label(176, 140, 'SCUOLABUS', 'rd-label-bus');
    } },

    // Chapter 2: a side view (crest and dip), a curve from above, and the approach to an unguarded level crossing.
    profile: { h: 220, draw: function() {
      var road = 'M0 160 L30 160 C60 160 70 100 90 100 C110 100 120 160 150 160 L190 160 C220 160 230 200 250 200 C270 200 280 160 310 160 L340 160';
      return rect(0, 0, 340, 220, 'rd-sky') +
        '<path class="rd-ground" d="' + road + ' L340 220 L0 220Z"/>' +
        part('dosso', '<path class="rd-profile" d="M30 160 C60 160 70 100 90 100 C110 100 120 160 150 160"/>' + label(78, 92, 'dosso'), [32, 94, 116, 66]) +
        part('nascosto', '<g transform="rotate(38 132 134)">' + rect(118, 124, 28, 12, 'rd-side-car', ' rx="4"') +
          '<circle class="rd-wheel" cx="124" cy="137" r="3.4"/><circle class="rd-wheel" cx="140" cy="137" r="3.4"/></g>', [114, 116, 36, 34]) +
        part('visuale', line(26, 147, 150, 53, 'rd-sight') + label(118, 56, 'visuale'), [24, 50, 128, 20]) +
        '<path class="rd-profile" d="M0 160 L30 160 M150 160 L190 160 M310 160 L340 160"/>' +
        part('cunetta', '<path class="rd-profile" d="M190 160 C220 160 230 200 250 200 C270 200 280 160 310 160"/>' + label(226, 150, 'cunetta'), [190, 142, 120, 62]) +
        part('acqua', '<ellipse class="rd-water" cx="250" cy="197" rx="26" ry="4.5"/>', [222, 190, 56, 14]) +
        rect(4, 140, 28, 12, 'rd-side-car rd-side-you', ' rx="4"') + '<circle class="rd-wheel" cx="10" cy="155" r="3.4"/><circle class="rd-wheel" cx="26" cy="155" r="3.4"/>';
    } },

    curve: { h: 220, draw: function() {
      var centre = 'M-10 176 C110 176 196 168 244 118 C282 78 294 44 294 -10';
      return rect(0, 0, 340, 220, 'rd-ground') +
        '<path class="rd-road-edge" d="' + centre + '"/><path class="rd-road" d="' + centre + '"/>' +
        '<path class="rd-centre" d="' + centre + '"/>' +
        // The rock sits on the line from your eyes to the oncoming car, so the sight line stops at it.
        part('visuale', '<circle class="rd-rock" cx="170" cy="100" r="22"/><circle class="rd-rock" cx="205" cy="72" r="16"/>' +
          line(62, 186, 152, 112, 'rd-sight') + label(118, 84, 'visuale'), [112, 54, 112, 70]) +
        part('margine', car(30, 184, 40, 16, 'rd-car-you', 'right') + line(30, 206, 110, 206, 'rd-arrow'), [26, 180, 90, 30]) +
        part('sorpasso', '<g transform="rotate(-24 150 160)">' + car(132, 150, 40, 16, 'rd-car-other', 'right') + '</g>' +
          '<path class="rd-x" d="M140 140 l20 20 M160 140 l-20 20"/>', [128, 134, 50, 42]) +
        part('fermata', '<g transform="rotate(-58 276 104)">' + car(258, 96, 36, 16, 'rd-car-parked', 'right') + '</g>' +
          '<path class="rd-x" d="M300 92 l16 16 M316 92 l-16 16"/>', [258, 82, 64, 44]) +
        '<g transform="rotate(180 276 24)">' + car(268, 6, 16, 36, 'rd-car-other', 'up') + '</g>';
    } },

    railway: { h: 210, draw: function() {
      // Road on top, every sign beside it on your right; you drive left to right in the lower lane.
      function bars(x, n) {
        var out = rect(x, 148, 12, 34, 'rd-panel', ' rx="1.5"');
        for (var i = 0; i < n; i++) out += line(x + 1, 162 + i * 8, x + 11, 154 + i * 8, 'rd-bar');
        return out;
      }
      return rect(0, 0, 340, 210, 'rd-ground') +
        rect(0, 40, 340, 70, 'rd-asphalt') + line(0, 75, 340, 75, 'rd-dash') +
        line(0, 40, 340, 40, 'rd-line') + line(0, 110, 340, 110, 'rd-line') +
        part('binari', line(300, 0, 300, 210, 'rd-rail') + line(312, 0, 312, 210, 'rd-rail') + label(256, 24, 'binari'), [294, 0, 24, 210]) +
        part('arresto', rect(282, 77, 5, 31, 'rd-zebra') + label(236, 98, 'arresto'), [276, 76, 16, 34]) +
        part('preavviso', '<polygon class="rd-tri" points="28,142 40,120 52,142"/>' + rect(36, 132, 8, 6, 'rd-tri-sym') + bars(34, 3) + label(24, 200, '150 m'), [22, 116, 36, 70]) +
        part('pannello2', bars(124, 2) + label(114, 200, '100 m'), [118, 144, 24, 42]) +
        part('pannello1', bars(204, 1) + label(196, 200, '50 m'), [198, 144, 24, 42]) +
        part('croce', '<g class="rd-cross"><path d="M262 122 l24 16 M286 122 l-24 16"/></g>' + label(256, 158, 'croce'), [258, 116, 32, 28]) +
        car(4, 84, 40, 18, 'rd-car-you', 'right');
    } },

    // Chapter 6: approaching a junction in the middle of three lanes, left to right. Lane lines are
    // dashed, then continuous for the last stretch (DPR art. 140 c.4); arrows left / straight / straight-right.
    approach: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-ground') +
        rect(0, 0, 286, 24, 'rd-walk') + line(0, 24, 286, 24, 'rd-curb') +
        rect(0, 188, 286, 32, 'rd-walk') + line(0, 188, 286, 188, 'rd-curb') +
        rect(0, 24, 340, 164, 'rd-asphalt') + rect(286, 0, 54, 220, 'rd-asphalt') +
        line(0, 27, 256, 27, 'rd-line') + line(0, 185, 256, 185, 'rd-line') +
        part('mezzeria', line(0, 65, 256, 65, 'rd-line'), [0, 60, 252, 10]) +
        part('tratteggio', line(0, 106, 120, 106, 'rd-dash') + line(0, 146, 120, 146, 'rd-dash'), [[0, 101, 120, 10], [0, 141, 120, 10]]) +
        part('continua', line(120, 106, 256, 106, 'rd-line') + line(120, 146, 256, 146, 'rd-line'), [[120, 101, 132, 10], [120, 141, 132, 10]]) +
        part('scritta', '<text class="rd-paint-text" x="112" y="92">TORINO</text>', [110, 80, 40, 16]) +
        part('frecce',
          '<path class="rd-paint" d="M174 92 H200 Q210 92 210 82"/><polygon class="rd-zebra" points="204,82 216,82 210,73"/>' +
          '<path class="rd-paint" d="M174 126 H206"/><polygon class="rd-zebra" points="206,120 216,126 206,132"/>' +
          '<path class="rd-paint" d="M174 166 H206 M188 166 Q196 166 196 172"/><polygon class="rd-zebra" points="206,160 216,166 206,172"/>' +
          '<polygon class="rd-zebra" points="190,172 202,172 196,181"/>',
          [[168, 72, 52, 28], [168, 114, 52, 26], [168, 152, 52, 31]]) +
        part('arresto', rect(256, 66, 5, 119, 'rd-zebra'), [252, 66, 12, 119]) +
        part('pedonale', zebra(266, 66, 18, 118), [264, 66, 22, 120]) +
        car(30, 117, 40, 18, 'rd-car-you', 'right') + car(220, 36, 40, 18, 'rd-car-other', 'left');
    } },
    // Chapter 17: a car stopped in its lane outside a built-up area, you drive left to right. Not to scale:
    // the triangle sits ≥ 50 m behind it in the same lane, the car behind sees it from ≥ 100 m (CdS art. 162).
    triangolo: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-ground') +
        rect(0, 56, 340, 108, 'rd-asphalt') + line(0, 58, 340, 58, 'rd-line') + line(0, 162, 340, 162, 'rd-line') +
        line(0, 110, 340, 110, 'rd-dash') + rect(0, 164, 340, 14, 'rd-gravel') +
        car(206, 70, 40, 18, 'rd-car-other', 'left') +
        part('veicolo', car(270, 128, 40, 18, 'rd-car-parked', 'right') + label(262, 124, 'veicolo fermo'), [266, 116, 70, 34]) +
        part('triangolo', '<polygon class="rd-tri" points="138,150 147,132 156,150"/>' + label(124, 128, 'triangolo'), [120, 118, 50, 36]) +
        part('distanza', rect(156, 186, 110, 18, 'rd-brace', ' rx="9"') + label(211, 199, '≥ 50 m', 'rd-label-center'), [156, 184, 110, 22]) +
        part('visibilita', car(4, 128, 40, 18, 'rd-car-you', 'right') + line(46, 141, 136, 141, 'rd-sight') + label(66, 156, '≥ 100 m'), [2, 124, 136, 38]) +
        part('giubbotto', person(318, 188, 'rd-child') + label(270, 214, 'giubbotto'), [264, 178, 72, 40]);
    } },
    // Chapter 17: a car with a trailer turning right into a side road. The trailer's wheels run on a tighter
    // curve than the car's, towards the kerb and the pedestrian standing there.
    rimorchio: { h: 230, draw: function() {
      return rect(0, 0, 340, 230, 'rd-ground') +
        rect(0, 36, 340, 96, 'rd-asphalt') + rect(196, 132, 96, 98, 'rd-asphalt') +
        line(0, 84, 340, 84, 'rd-dash') + line(244, 140, 244, 230, 'rd-dash') +
        rect(0, 132, 196, 98, 'rd-walk') + rect(292, 132, 48, 98, 'rd-walk') + rect(0, 0, 340, 36, 'rd-walk') +
        line(0, 132, 196, 132, 'rd-curb') + line(196, 132, 196, 230, 'rd-curb') + line(292, 132, 340, 132, 'rd-curb') + line(292, 132, 292, 230, 'rd-curb') +
        part('motrice', '<g transform="rotate(62 236 128)">' + car(216, 119, 40, 18, 'rd-car-you', 'right') + '</g>' + label(262, 112, 'motrice'), [214, 100, 62, 56]) +
        part('rimorchio', '<g transform="rotate(14 172 108)">' + rect(146, 98, 44, 20, 'rd-car-body', ' rx="2"') + '</g>' +
          line(190, 112, 214, 119, 'rd-line') + label(120, 94, 'rimorchio'), [118, 82, 100, 44]) +
        part('traiettoria', '<path class="rd-sight" fill="none" d="M10 110 C150 110 258 104 266 230"/>' +
          '<path class="rd-x" d="M10 122 C150 122 206 100 206 230"/>' + label(20, 104, 'motrice') + label(20, 146, 'rimorchio', 'rd-label-dark'), [6, 98, 70, 54]) +
        part('pedone', person(184, 140) + label(132, 176, 'pedone', 'rd-label-dark'), [128, 132, 66, 50]);
    } },
    // Chapter 19 (side views, not roads): the driver's seat facing right, belt over shoulder and pelvis,
    // the headrest level with the top of the head and close to it, the airbag drawn inflated in front.
    abitacolo: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-sky') + rect(0, 186, 340, 34, 'rd-asphalt') +
        '<path class="rd-cabin" d="M60 186 L60 34 L214 30 L300 118 L330 124 L330 186 Z"/>' +
        rect(258, 118, 72, 16, 'rd-dash-board', ' rx="4"') + line(244, 70, 262, 128, 'rd-column') +
        '<polygon class="rd-seat" points="96,176 112,72 140,72 132,176"/>' + rect(96, 158, 106, 20, 'rd-seat', ' rx="6"') +
        part('poggiatesta', rect(108, 40, 26, 30, 'rd-headrest', ' rx="7"') + label(70, 30, 'poggiatesta'), [104, 20, 72, 54]) +
        '<g class="rd-occupant"><circle cx="152" cy="54" r="15"/>' +
        '<polygon points="132,74 156,74 176,154 138,156"/><rect x="140" y="140" width="76" height="18" rx="8"/>' +
        '<rect x="204" y="146" width="16" height="44" rx="7"/><rect x="170" y="88" width="56" height="12" rx="6" transform="rotate(24 170 94)"/></g>' +
        part('cintura', line(136, 76, 172, 154, 'rd-belt') + line(140, 152, 198, 152, 'rd-belt') + label(140, 206, 'cintura'), [[130, 72, 48, 86], [134, 144, 68, 70]]) +
        part('airbag', '<ellipse class="rd-airbag" cx="226" cy="74" rx="22" ry="30"/>' + label(250, 52, 'airbag'), [200, 40, 96, 66]);
    } },
    // Chapter 19: a full-face helmet facing right, cut open so the foam liner under the shell shows.
    casco: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-sky') +
        part('calotta', '<path class="rd-shell" d="M86 150 C78 62 150 22 214 30 C264 38 292 84 288 140 L262 150 L254 182 L104 184 C92 176 88 164 86 150 Z"/>' +
          label(20, 132, 'calotta'), [16, 118, 70, 22]) +
        part('imbottitura', '<path class="rd-liner" d="M106 148 C102 78 156 46 208 52 C246 58 266 92 262 136 L238 146 L232 166 L124 166 C112 162 108 156 106 148 Z"/>' +
          '<path class="rd-pad" d="M124 144 C122 92 162 70 202 74 C230 78 244 100 242 132 L222 140 L218 152 L136 152 Z"/>' +
          label(168, 67, 'EPS', 'rd-label-dark'), [150, 52, 64, 22]) +
        part('visiera', '<path class="rd-visor" d="M248 78 C276 86 292 110 290 140 L258 146 C262 120 258 98 248 78 Z"/>' + label(286, 72, 'visiera'), [244, 60, 90, 90]) +
        part('aerazione', rect(158, 30, 16, 6, 'rd-vent', ' rx="2"') + rect(186, 30, 16, 6, 'rd-vent', ' rx="2"') + label(150, 18, "prese d'aria"), [144, 6, 100, 34]) +
        part('cinturino', '<path class="rd-strap" d="M150 184 C162 204 206 206 220 184"/>' + label(226, 208, 'cinturino'), [144, 180, 140, 34]);
    } },
    // Chapter 19: a rider standing, facing right. Only the helmet is required by law; the rest is
    // certified protective gear (EN 17092 garments, EN 13594 gloves, EN 13634 boots).
    motociclista: { h: 260, draw: function() {
      return rect(0, 0, 340, 260, 'rd-sky') + rect(0, 242, 340, 18, 'rd-asphalt') +
        part('casco', '<circle class="rd-shell" cx="170" cy="36" r="22"/><path class="rd-visor" d="M178 24 C192 28 194 46 186 52 L176 50 Z"/>' +
          label(60, 30, 'casco'), [[146, 12, 50, 48], [56, 18, 56, 18]]) +
        part('giacca', rect(148, 62, 46, 84, 'rd-jacket', ' rx="10"') + '<ellipse class="rd-armour" cx="170" cy="72" rx="13" ry="8"/>' +
          '<rect class="rd-jacket" x="186" y="66" width="14" height="62" rx="6" transform="rotate(-18 193 70)"/>' +
          '<ellipse class="rd-armour" cx="203" cy="100" rx="6" ry="9" transform="rotate(-18 203 100)"/>' + label(60, 96, 'giacca'), [[144, 58, 70, 92], [56, 84, 56, 18]]) +
        part('guanti', '<rect class="rd-glove" x="204" y="122" width="18" height="16" rx="5"/>' + label(232, 134, 'guanti'), [200, 116, 74, 26]) +
        '<rect class="rd-pants" x="150" y="144" width="19" height="76" rx="6"/><rect class="rd-pants" x="173" y="144" width="19" height="76" rx="6"/>' +
        part('stivali', '<path class="rd-boot" d="M148 206 L170 206 L170 242 L144 242 Z"/><path class="rd-boot" d="M172 206 L193 206 L194 230 L214 236 L214 242 L172 242 Z"/>' +
          label(232, 226, 'stivali'), [[140, 200, 80, 46], [228, 214, 54, 18]]);
    } },
    // Chapter 20: a made-up EU-format licence card (no real person; the name reads ESEMPIO).
    // Field numbers follow the EU model: 1–2 name, 4a issue, 4b expiry, 9 categories, 12 codes.
    patente: { h: 220, draw: function() {
      var t = function(x, y, s) { return label(x, y, s, 'rd-label-dark rd-card-text'); };
      return rect(0, 0, 340, 220, 'rd-sky') +
        rect(20, 18, 300, 184, 'rd-card', ' rx="12"') +
        rect(20, 18, 300, 30, 'rd-card-head', ' rx="12"') + rect(20, 36, 300, 12, 'rd-card-head') +
        rect(32, 24, 22, 18, 'rd-card-eu', ' rx="2"') + label(38, 37, 'I', 'rd-card-eu-text') +
        label(64, 37, 'PATENTE DI GUIDA · ESEMPIO', 'rd-label-dark rd-card-title') +
        part('foto', rect(34, 60, 70, 88, 'rd-card-photo', ' rx="4"') +
          '<circle class="rd-card-person" cx="69" cy="92" r="14"/><path class="rd-card-person" d="M45 146 C47 120 91 120 93 146 Z"/>', [34, 60, 70, 88]) +
        part('dati', t(116, 74, '1. ESEMPIO') + t(116, 90, '2. NOME FITTIZIO'), [112, 62, 196, 34]) +
        part('rilascio', t(116, 114, '4a. 01.03.2024'), [112, 102, 110, 18]) +
        part('scadenza', t(116, 134, '4b. 01.03.2034'), [112, 122, 110, 18]) +
        part('categorie', t(116, 160, '9. AM / B'), [112, 148, 110, 18]) +
        part('codici', t(116, 182, '12. 01 · 96'), [112, 170, 110, 18]);
    } },
    // Chapter 21 (side view): a tyre rolling right on a water film. At speed the water cannot drain through
    // the grooves, builds a wedge in front and lifts the tyre, so the contact patch shrinks.
    aquaplaning: { h: 220, draw: function() {
      return rect(0, 0, 340, 220, 'rd-sky') + rect(0, 176, 340, 44, 'rd-asphalt') +
        part('velo', rect(0, 166, 340, 10, 'rd-water') + label(8, 202, "velo d'acqua"), [[0, 164, 96, 44], [244, 164, 96, 14]]) +
        part('velocita', line(36, 34, 112, 34, 'rd-arrow') + '<polygon class="rd-arrow-head" points="112,28 124,34 112,40"/>' +
          label(40, 24, 'velocità'), [28, 14, 104, 30]) +
        '<circle class="rd-wheel" cx="150" cy="104" r="58"/><circle class="rd-rim" cx="150" cy="104" r="24"/>' +
        part('battistrada', '<circle class="rd-groove" cx="150" cy="104" r="52"/>' + label(214, 40, 'battistrada'), [[110, 44, 80, 22], [208, 28, 84, 20]]) +
        part('cuneo', '<polygon class="rd-water" points="176,158 244,166 176,166"/>' + label(226, 150, "cuneo d'acqua"), [[174, 140, 130, 28]]) +
        part('contatto', rect(126, 160, 22, 5, 'rd-contact') + label(58, 150, 'contatto'), [[54, 140, 96, 26]]);
    } },
    // Chapter 21: a long tunnel from above, traffic to the right. A queue keeps wide gaps; smoke ahead;
    // an emergency exit in the wall, an SOS niche with an extinguisher, a loudspeaker for instructions.
    galleria: { h: 230, draw: function() {
      return rect(0, 0, 340, 230, 'rd-ground') + rect(0, 56, 340, 118, 'rd-asphalt') +
        rect(0, 40, 340, 16, 'rd-wall') + rect(0, 174, 340, 16, 'rd-wall') + line(0, 115, 340, 115, 'rd-dash') +
        car(150, 78, 40, 18, 'rd-car-parked', 'right') +
        part('coda', car(10, 130, 40, 18, 'rd-car-you', 'right') + car(96, 130, 40, 18, 'rd-car-other', 'right') +
          car(182, 130, 40, 18, 'rd-car-other', 'right') + rect(52, 154, 42, 10, 'rd-brace', ' rx="5"') +
          rect(138, 154, 42, 10, 'rd-brace', ' rx="5"') + label(70, 196, 'distanza'), [[6, 126, 220, 40], [64, 186, 70, 14]]) +
        part('fumo', '<ellipse class="rd-smoke" cx="296" cy="96" rx="40" ry="26"/><ellipse class="rd-smoke" cx="306" cy="136" rx="32" ry="22"/>' +
          label(282, 120, 'fumo', 'rd-label-dark'), [256, 66, 84, 98]) +
        part('uscita', rect(118, 40, 26, 16, 'rd-exit', ' rx="2"') + label(104, 30, 'via di fuga'), [[98, 18, 76, 40]]) +
        part('nicchia', rect(236, 174, 24, 16, 'rd-niche', ' rx="2"') + rect(244, 177, 8, 10, 'rd-ext', ' rx="2"') +
          label(214, 212, 'SOS · estintore'), [[210, 172, 96, 46]]) +
        part('istruzioni', '<circle class="rd-speaker" cx="40" cy="48" r="6"/>' + label(10, 30, 'altoparlante'), [[6, 18, 76, 40]]);
    } },
    // Chapter 22: three resting positions from the side, a person drawn as a head and thick strokes (no injury
    // shown). Row 1 shock: lying flat, legs a little raised on a support. Row 2 chest injury, conscious: half-sitting
    // against a backrest. Row 3 unconscious after a crash: lying flat, not moved.
    posizioni: { h: 240, draw: function() {
      function figure(head, path) {
        return '<circle class="rd-head" cx="' + head[0] + '" cy="' + head[1] + '" r="9"/><polyline class="rd-limb" points="' + path + '"/>';
      }
      return rect(0, 0, 340, 240, 'rd-sky') +
        line(0, 66, 340, 66, 'rd-floor') + line(0, 146, 340, 146, 'rd-floor') + line(0, 226, 340, 226, 'rd-floor') +
        part('gambe', rect(200, 48, 36, 18, 'rd-support') + figure([40, 54], '54,58 140,58 232,47') +
          label(8, 16, 'disteso, gambe sollevate'), [[24, 28, 230, 40]]) +
        part('semiseduto', '<polygon class="rd-support" points="36,146 104,146 36,98"/>' + figure([56, 98], '64,110 100,138 152,132 204,140') +
          label(230, 100, 'semiseduto'), [[28, 84, 180, 64]]) +
        part('fermo', figure([40, 214], '54,216 236,216') +
          label(8, 176, 'disteso, senza muoverlo'), [[24, 188, 230, 38]]);
    } },
    // Chapter 23: one crash (bottom) and the road forking into three branches, one per kind of liability.
    // All three branches leave the same point: the same event can start any of them, or all three.
    conseguenze: { h: 240, draw: function() {
      return rect(0, 0, 340, 240, 'rd-ground') +
        '<path class="rd-band" d="M170 182 C170 130 56 130 52 44"/><path class="rd-band" d="M170 182 L170 44"/><path class="rd-band" d="M170 182 C170 130 284 130 288 44"/>' +
        part('incidente', rect(150, 182, 40, 58, 'rd-asphalt') + line(170, 186, 170, 240, 'rd-dash') +
          car(140, 196, 30, 16, 'rd-car-you', 'right') + car(172, 196, 30, 16, 'rd-car-other', 'left') + label(206, 228, 'sinistro'), [[136, 182, 76, 58]]) +
        part('civile', label(8, 22, 'civile') + label(8, 34, 'risarcimento'), [[4, 10, 96, 60]]) +
        part('penale', label(142, 22, 'penale') + label(142, 34, 'Codice Penale'), [[136, 10, 70, 60]]) +
        part('amministrativa', label(250, 22, 'amministrativa') + label(250, 34, 'Codice della strada'), [[240, 10, 98, 60]]);
    } },
    // Officer scenes: a four-arm junction seen from above, the officer in the middle facing the bottom
    // arm. Sides are named from the officer's point of view (his left is the screen's right).
    'agente-braccia': { h: 260, draw: function() {
      return officerJunction() + officer([[158, 130, 142, 130], [182, 130, 198, 130]]) + officerFlows({ fronte: 'ALT', spalle: 'ALT', sinistra: 'VIA', destra: 'VIA' });
    } },
    'agente-angolo': { h: 260, draw: function() {
      return officerJunction() + officer([[182, 130, 198, 130], [170, 138, 170, 156]]) + officerFlows({ fronte: '?', spalle: 'ALT', sinistra: 'VIA', destra: 'ALT' });
    } },
  };

  function officerJunction() {
    return rect(0, 0, 340, 260, 'rd-ground') + rect(0, 100, 340, 60, 'rd-asphalt') + rect(140, 0, 60, 260, 'rd-asphalt') +
      line(0, 130, 136, 130, 'rd-dash') + line(204, 130, 340, 130, 'rd-dash') + line(170, 0, 170, 96, 'rd-dash') + line(170, 164, 170, 260, 'rd-dash') +
      rect(170, 164, 30, 4, 'rd-zebra') + rect(140, 92, 30, 4, 'rd-zebra') + rect(204, 100, 4, 30, 'rd-zebra') + rect(132, 130, 4, 30, 'rd-zebra');
  }
  /** Seen from above, on a light spot so the arms never blend with lane lines: amber arms, shoulders, head, and a mark for the face (towards the bottom arm). */
  function officer(arms) {
    return '<g class="rd-officer"><circle class="rd-officer-spot" cx="170" cy="130" r="29"/>' +
      arms.map(function(a) { return line(a[0], a[1], a[2], a[3], 'rd-officer-arm'); }).join('') +
      '<ellipse cx="170" cy="130" rx="12" ry="7"/><circle cx="170" cy="130" r="6"/>' +
      '<polygon class="rd-officer-face" points="165,136 175,136 170,142"/></g>';
  }
  /** One approaching car per arm, each a tappable part, with its ALT / VIA status written beside it. */
  function officerFlows(status) {
    return part('fronte', car(176, 200, 18, 34, 'rd-car-other', 'up') + label(208, 222, 'di fronte · ' + status.fronte), [[172, 196, 26, 42], [204, 210, 96, 18]]) +
      part('spalle', car(146, 26, 18, 34, 'rd-car-other', 'down') + label(36, 46, 'alle spalle · ' + status.spalle), [[142, 22, 26, 42], [32, 34, 100, 18]]) +
      part('sinistra', car(270, 104, 34, 18, 'rd-car-other', 'left') + label(222, 88, 'a sinistra · ' + status.sinistra), [[266, 100, 42, 26], [218, 76, 110, 18]]) +
      part('destra', car(36, 138, 34, 18, 'rd-car-other', 'right') + label(24, 182, 'a destra · ' + status.destra), [[32, 134, 42, 26], [20, 170, 104, 18]]);
  }

  /** SVG markup for a scene, or '' for an unknown scene name. */
  App.roadSceneSvg = function(scene) {
    var s = SCENES[scene];
    if (!s) return '';
    return '<svg class="rd-scene" viewBox="0 0 340 ' + s.h + '" direction="ltr" aria-hidden="true" focusable="false">' + s.draw() + '</svg>';
  };
})();
