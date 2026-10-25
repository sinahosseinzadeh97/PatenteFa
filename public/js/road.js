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
  };

  /** SVG markup for a scene, or '' for an unknown scene name. */
  App.roadSceneSvg = function(scene) {
    var s = SCENES[scene];
    if (!s) return '';
    return '<svg class="rd-scene" viewBox="0 0 340 ' + s.h + '" direction="ltr" aria-hidden="true" focusable="false">' + s.draw() + '</svg>';
  };
})();
