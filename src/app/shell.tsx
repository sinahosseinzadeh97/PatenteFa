/**
 * src/app/shell.tsx
 * Hono JSX HTML shell — wraps all screens, injects Telegram WebApp SDK.
 * Served at GET /app* in src/index.ts.
 *
 * Design system: "In viaggio" — the open road.
 * Palette: asphalt #14151A · ink #F2F0EB · go #1B7A3D · stop #C1272D · amber #E8A33D · surface #1F2128
 * Type: Barlow Condensed (headers) · Public Sans (body IT) · Vazirmatn (all FA)
 */

import type { Context } from "hono";
import type { AppEnv } from "../types.js";

export function serveApp(c: Context<{ Bindings: AppEnv }>) {
  c.header("Cache-Control", "no-cache, no-store, must-revalidate");
  c.header("Pragma", "no-cache");
  c.header("Expires", "0");
  const html = buildHtml();
  return c.html(html);
}

function buildHtml(): string {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <meta name="theme-color" content="#14151A" />
  <title>PatenteFa — تمرین پاتنته</title>
  <meta name="description" content="تمرین آزمون تئوری پاتنته ایتالیا به فارسی" />

  <!-- Telegram Mini App SDK -->
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <script>window.App = window.App || {};</script>


  <!-- Fonts: Barlow Condensed (IT headers) + Public Sans (IT body) + Vazirmatn (FA) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Public+Sans:wght@400;500;600&family=Vazirmatn:wght@400;500;700&display=swap" rel="stylesheet" />

  <style>
    /* ── Design tokens ──────────────────────────────────────────────────────── */
    :root {
      --bg:        #14151A;   /* asphalt */
      --surface:   #1F2128;   /* card surface */
      --surface-2: #282B35;   /* elevated surface */
      --border:    #2E3142;
      --ink:       #F2F0EB;   /* primary text */
      --ink-muted: #8A8FA8;
      --go:        #1B7A3D;   /* VERO / correct / autostrada green */
      --stop:      #C1272D;   /* FALSO / wrong / road-sign red */
      --amber:     #E8A33D;   /* accent: streaks, highlights, bookmark */
      --amber-dim: rgba(232,163,61,0.15);
      --go-dim:    rgba(27,122,61,0.15);
      --stop-dim:  rgba(193,39,45,0.15);
      --go-glow:   rgba(27,122,61,0.4);
      --stop-glow: rgba(193,39,45,0.4);
    }

    /* ── Reset ──────────────────────────────────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    html, body {
      margin: 0; padding: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: 'Vazirmatn', system-ui, sans-serif;
      font-size: 16px; line-height: 1.55;
      min-height: 100vh;
      min-height: 100dvh;
      min-height: var(--tg-viewport-stable-height, 100dvh);
      height: 100%;
      overflow-x: hidden;
    }

    /* ── Bidi isolation ─────────────────────────────────────────────────────── */
    /* RTL shell (FA primary) — Italian strings need explicit LTR isolation */
    .ltr { direction: ltr; unicode-bidi: isolate; font-family: 'Public Sans', system-ui, sans-serif; }
    .ltr-display { direction: ltr; unicode-bidi: isolate; font-family: 'Barlow Condensed', 'Public Sans', system-ui, sans-serif; }

    /* ── Loading ────────────────────────────────────────────────────────────── */
    #loading {
      display: flex; align-items: center; justify-content: center;
      height: 100dvh; flex-direction: column; gap: 16px;
    }
    .spinner {
      width: 40px; height: 40px;
      border: 3px solid var(--amber-dim);
      border-top-color: var(--amber);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Screen system + slide transitions ──────────────────────────────────── */
    #app-root { position: relative; overflow: hidden; }
    .screen {
      display: none; flex-direction: column;
      min-height: 100dvh;
      padding-bottom: env(safe-area-inset-bottom, 16px);
    }
    .screen.active { display: flex; }

    @media (prefers-reduced-motion: no-preference) {
      .screen.slide-in-right  { animation: slideInRight  280ms cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      .screen.slide-out-left  { animation: slideOutLeft  280ms cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      .screen.slide-in-left   { animation: slideInLeft   280ms cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      .screen.slide-out-right { animation: slideOutRight 280ms cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
    }
    @keyframes slideInRight  { from { transform: translateX(100%); } to { transform: translateX(0); } }
    @keyframes slideOutLeft  { from { transform: translateX(0); }    to { transform: translateX(-100%); } }
    @keyframes slideInLeft   { from { transform: translateX(-100%); } to { transform: translateX(0); } }
    @keyframes slideOutRight { from { transform: translateX(0); }    to { transform: translateX(100%); } }

    /* ── Cards ──────────────────────────────────────────────────────────────── */
    .card    { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 20px; }
    .card-sm { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; }

    /* ── Buttons ────────────────────────────────────────────────────────────── */
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 14px 24px; border-radius: 12px;
      font-family: 'Vazirmatn', system-ui, sans-serif;
      font-weight: 700; font-size: 1rem;
      border: none; cursor: pointer;
      transition: transform 80ms ease, box-shadow 150ms ease;
      user-select: none;
    }
    .btn:active { transform: scale(0.97); }
    .btn-vero {
      background: var(--go); color: #fff;
      box-shadow: 0 4px 20px var(--go-glow);
      font-family: 'Public Sans', system-ui, sans-serif;
      font-weight: 700; letter-spacing: 0.04em;
    }
    .btn-vero:hover { box-shadow: 0 6px 28px var(--go-glow); }
    .btn-falso {
      background: var(--stop); color: #fff;
      box-shadow: 0 4px 20px var(--stop-glow);
      font-family: 'Public Sans', system-ui, sans-serif;
      font-weight: 700; letter-spacing: 0.04em;
    }
    .btn-falso:hover { box-shadow: 0 6px 28px var(--stop-glow); }
    .btn-primary {
      background: var(--amber); color: #14151A;
      box-shadow: 0 4px 20px rgba(232,163,61,0.35);
    }
    .btn-primary:hover { box-shadow: 0 6px 28px rgba(232,163,61,0.5); }
    .btn-ghost {
      background: var(--surface-2); color: var(--ink);
      border: 1px solid var(--border);
    }
    .btn-ghost:hover { background: var(--border); }
    .btn-go-outline {
      background: var(--go-dim); color: var(--go);
      border: 1px solid var(--go);
    }
    .btn-full { width: 100%; }
    .btn-sm   { padding: 9px 16px; font-size: 0.875rem; border-radius: 8px; }
    .btn-disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }

    /* ── Bottom nav ─────────────────────────────────────────────────────────── */
    .bottom-nav {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: var(--surface);
      border-top: 1px solid var(--border);
      display: flex; justify-content: space-around; align-items: center;
      padding: 8px 0;
      padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px));
      z-index: 100;
    }
    .nav-item {
      display: flex; flex-direction: column; align-items: center; gap: 3px;
      font-size: 0.68rem; color: var(--ink-muted);
      cursor: pointer; padding: 6px 14px; border-radius: 10px;
      border: none; background: none;
      transition: color 150ms, background 150ms;
      font-family: 'Vazirmatn', system-ui, sans-serif;
    }
    .nav-item.active { color: var(--amber); }
    .nav-item svg { width: 22px; height: 22px; }

    /* ── Profile screen ─────────────────────────────────────────────────────── */
    /* Autostrada shield shape for the level badge */
    .shield-badge {
      display: inline-flex; align-items: center; justify-content: center;
      flex-direction: column;
      width: 72px; height: 82px;
      clip-path: polygon(8% 0%, 92% 0%, 100% 35%, 50% 100%, 0% 35%);
      background: linear-gradient(160deg, var(--go), #0f5c2e);
      box-shadow: 0 4px 20px rgba(27,122,61,0.45);
      flex-shrink: 0;
    }
    .shield-badge .shield-level {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1.8rem; font-weight: 700;
      color: #ffffff; line-height: 1;
    }
    .shield-badge .shield-label {
      font-size: 0.55rem; color: rgba(255,255,255,0.8);
      text-transform: uppercase; letter-spacing: 0.06em;
    }
    /* XP progress bar: road-stripe motif */
    .xp-road-track {
      height: 12px; border-radius: 6px;
      background: var(--surface-2); border: 1px solid var(--border);
      overflow: hidden; position: relative;
    }
    .xp-road-fill {
      height: 100%; border-radius: 6px;
      background: linear-gradient(90deg, var(--go), #4ade80);
      transition: width 600ms cubic-bezier(0.4,0,0.2,1);
      position: relative;
    }
    /* dashed white line through fill (road stripe) */
    .xp-road-fill::after {
      content: '';
      position: absolute; inset: 0;
      background: repeating-linear-gradient(
        90deg,
        transparent 0px, transparent 10px,
        rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 18px
      );
    }
    /* Stat row tiles */
    .profile-stat-tile {
      flex: 1; min-width: 0;
      background: var(--surface-2); border: 1px solid var(--border);
      border-radius: 14px; padding: 12px 8px;
      text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px;
    }
    .profile-stat-tile .tile-icon { font-size: 1.4rem; line-height: 1; }
    .profile-stat-tile .tile-value {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1.3rem; font-weight: 700; color: var(--ink); line-height: 1;
    }
    .profile-stat-tile .tile-label { font-size: 0.6rem; color: var(--ink-muted); line-height: 1.2; }
    /* Coverage road bar */
    .coverage-road {
      height: 16px; border-radius: 8px;
      background: var(--surface-2); border: 1px solid var(--border);
      overflow: hidden; position: relative;
    }
    .coverage-road-fill {
      height: 100%;
      background: linear-gradient(90deg, #1B7A3D 0%, #4ade80 100%);
      border-radius: 8px; transition: width 800ms cubic-bezier(0.4,0,0.2,1);
      position: relative;
    }
    .coverage-road-fill::after {
      content: '';
      position: absolute; inset: 0;
      background: repeating-linear-gradient(
        90deg,
        transparent 0px, transparent 12px,
        rgba(255,255,255,0.25) 12px, rgba(255,255,255,0.25) 20px
      );
    }
    /* Needs-more-work list rows */
    .nmw-row {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px;
      background: var(--surface-2); border: 1px solid rgba(193,39,45,0.2);
      border-radius: 12px;
      cursor: pointer; transition: border-color 150ms, background 150ms;
    }
    .nmw-row:active { background: rgba(193,39,45,0.08); border-color: rgba(193,39,45,0.5); }
    .nmw-row .nmw-badge {
      flex-shrink: 0;
      background: var(--stop-dim); border: 1px solid rgba(193,39,45,0.4);
      color: var(--stop); border-radius: 8px;
      font-size: 0.7rem; font-weight: 700; padding: 2px 6px; white-space: nowrap;
    }
    .nmw-row .nmw-text {
      flex: 1; min-width: 0;
      font-size: 0.8rem; color: var(--ink); line-height: 1.35;
      overflow: hidden; display: -webkit-box;
      -webkit-line-clamp: 2; -webkit-box-orient: vertical;
      direction: ltr; text-align: left;
    }
    /* Sparkline SVG */
    .sparkline-wrap {
      width: 100%; height: 80px;
      background: var(--surface-2); border-radius: 12px;
      border: 1px solid var(--border);
      overflow: hidden; position: relative;
    }
    .sparkline-wrap svg { width: 100%; height: 100%; }
    /* Topic accuracy bar (profile variant) */
    .topic-acc-row {
      display: grid; grid-template-columns: 1fr 3fr 36px;
      align-items: center; gap: 8px; margin-bottom: 6px;
    }
    .topic-acc-row .ta-name {
      font-size: 0.7rem; color: var(--ink-muted);
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .topic-acc-row .ta-track {
      height: 8px; border-radius: 4px;
      background: var(--surface-2); border: 1px solid var(--border); overflow: hidden;
    }
    .topic-acc-row .ta-fill { height: 100%; border-radius: 4px; }
    .ta-fill.good   { background: var(--go); }
    .ta-fill.medium { background: var(--amber); }
    .ta-fill.poor   { background: var(--stop); }
    .topic-acc-row .ta-pct { font-size: 0.72rem; font-weight: 700; text-align: left; direction: ltr; }

    /* ── Stat chips (dashboard) ─────────────────────────────────────────────── */
    .stat-chip { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 16px; text-align: center; }
    .stat-chip-value { font-size: 2rem; font-weight: 700; line-height: 1; }
    .stat-chip-label { font-size: 0.72rem; color: var(--ink-muted); margin-top: 4px; }

    /* ── Exam topbar ────────────────────────────────────────────────────────── */
    .exam-topbar {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 10px 16px;
      position: sticky; top: 0; z-index: 50;
    }

    /* ── Question tabs (inside details) ─────────────────────────────────────── */
    .tabs-summary {
      font-size: 0.8rem; color: var(--ink-muted);
      cursor: pointer; list-style: none;
      padding: 4px 0 8px; user-select: none;
    }
    .tabs-summary::-webkit-details-marker { display: none; }
    .question-tabs {
      display: flex; gap: 5px; overflow-x: auto;
      scrollbar-width: none; padding-bottom: 4px;
    }
    .question-tabs::-webkit-scrollbar { display: none; }
    .q-tab {
      min-width: 30px; height: 30px; border-radius: 6px;
      background: var(--surface-2); border: 1px solid var(--border);
      color: var(--ink-muted); font-size: 0.75rem; font-weight: 600;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0;
      transition: background 120ms, border-color 120ms;
      font-family: 'Public Sans', system-ui, sans-serif;
    }
    .q-tab.active  { background: var(--amber); border-color: var(--amber); color: #14151A; }
    .q-tab.correct { background: var(--go);    border-color: var(--go);    color: #fff; }
    .q-tab.wrong   { background: var(--stop);  border-color: var(--stop);  color: #fff; }
    .q-tab.flagged { border-color: var(--amber); }

    /* ── Road progress element ───────────────────────────────────────────────── */
    .road-track {
      position: relative;
      height: 28px;
      background: #0C0D10;
      border-radius: 14px;
      margin-top: 10px;
      overflow: hidden;
      border: 1px solid #1E2030;
    }
    /* Dashed center line */
    .road-track::before {
      content: '';
      position: absolute;
      top: 50%; left: 0; right: 0;
      height: 2px;
      transform: translateY(-50%);
      background: repeating-linear-gradient(
        90deg,
        transparent 0px, transparent 10px,
        rgba(232,163,61,0.4) 10px, rgba(232,163,61,0.4) 20px
      );
    }
    /* Checkered finish flag */
    .road-finish {
      position: absolute; right: 6px; top: 50%;
      transform: translateY(-50%);
      font-size: 14px; line-height: 1;
      z-index: 2;
    }
    /* Traveling marker */
    .road-marker {
      position: absolute; top: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px; line-height: 1;
      z-index: 3;
      transition: left 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @media (prefers-reduced-motion: reduce) {
      .road-marker { transition: none; }
    }
    /* Progress fill (answered portion coloring) */
    .road-answered {
      position: absolute; top: 0; left: 0; bottom: 0;
      background: linear-gradient(90deg, rgba(27,122,61,0.25), rgba(27,122,61,0.1));
      border-radius: 14px 0 0 14px;
      transition: width 400ms ease;
    }
    @media (prefers-reduced-motion: reduce) {
      .road-answered { transition: none; }
    }

    /* ── Timer ──────────────────────────────────────────────────────────────── */
    .timer {
      font-family: 'Public Sans', system-ui, sans-serif;
      font-variant-numeric: tabular-nums;
      font-weight: 700; font-size: 1rem;
      color: var(--ink);
    }
    .timer.warning { color: var(--amber); }
    .timer.danger  { color: var(--stop); animation: pulse 1s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.45; } }

    /* ── Question body ──────────────────────────────────────────────────────── */
    .question-text {
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 1.25rem; font-weight: 500; line-height: 1.65;
      text-align: center; padding: 24px 20px;
      color: var(--ink);
      direction: ltr; unicode-bidi: isolate;
    }
    .question-text.translated { font-size: 1.1rem; }
    .sign-image {
      display: block; max-width: 180px; max-height: 180px;
      margin: 0 auto 16px;
      border-radius: 12px; object-fit: contain;
      background: var(--surface-2); padding: 8px;
    }

    /* ── TTS button ─────────────────────────────────────────────────────────── */
    .tts-btn {
      display: flex; align-items: center; gap: 6px;
      font-size: 0.875rem; color: var(--ink-muted);
      background: none; border: none; cursor: pointer;
      padding: 6px 10px; border-radius: 8px;
      font-family: 'Public Sans', system-ui, sans-serif;
      transition: color 150ms, background 150ms;
    }
    .tts-btn:hover { color: var(--ink); background: var(--surface-2); }

    /* ── Translate panel ────────────────────────────────────────────────────── */
    .translate-panel {
      background: var(--surface-2); border: 1px solid var(--border);
      border-radius: 12px; padding: 16px; margin: 0 16px;
      display: none;
    }
    .translate-panel.open { display: block; }
    .fa-text { font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; text-align: right; }

    /* ── Results ────────────────────────────────────────────────────────────── */
    .result-badge {
      font-family: 'Vazirmatn', system-ui, sans-serif;
      font-size: 1.1rem; font-weight: 700;
      padding: 8px 24px; border-radius: 24px;
      display: inline-block; margin-bottom: 8px;
    }
    .result-badge.pass { background: var(--go-dim);  color: var(--go);  border: 1px solid var(--go); }
    .result-badge.fail { background: var(--stop-dim); color: var(--stop); border: 1px solid var(--stop); }

    /* Sign-flip for each result row */
    .sign-card {
      perspective: 800px;
      margin-bottom: 8px;
    }
    .sign-card-inner {
      position: relative;
      transform-style: preserve-3d;
      transition: transform 350ms ease;
    }
    .sign-card.revealed .sign-card-inner { transform: rotateY(0deg); }
    .sign-card-front, .sign-card-back {
      backface-visibility: hidden;
      border-radius: 10px;
      padding: 10px 12px;
      background: var(--surface-2);
    }
    .sign-card-front {
      /* hidden face — not used in results view, kept for completeness */
      display: none;
    }
    .sign-card-back {
      /* NOT absolute — must stay in flow so card height grows with translate content */
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    /* Start invisible, reveal on .revealed */
    .sign-card-inner { opacity: 0; transform: translateY(6px); }
    .sign-card.revealed .sign-card-inner { opacity: 1; transform: translateY(0); transition: opacity 300ms ease, transform 300ms ease; }
    @media (prefers-reduced-motion: reduce) {
      .sign-card.revealed .sign-card-inner { transition: none; }
    }

    .result-row { display: flex; align-items: flex-start; gap: 10px; }
    .result-icon {
      flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8rem; font-weight: 700; margin-top: 12px;
    }
    .result-icon.correct { background: var(--go-dim);  color: var(--go); }
    .result-icon.wrong   { background: var(--stop-dim); color: var(--stop); }

    /* ── Stats bars ─────────────────────────────────────────────────────────── */
    .stat-bar-row {
      display: grid;
      grid-template-columns: 1fr 120px 36px;
      align-items: center; gap: 10px;
      margin-bottom: 10px; font-size: 0.78rem;
    }
    .stat-bar-track { height: 7px; background: var(--surface-2); border-radius: 4px; overflow: hidden; }
    .stat-bar-fill  { height: 100%; border-radius: 4px; transition: width 600ms ease; }
    .stat-bar-fill.good   { background: var(--go); }
    .stat-bar-fill.medium { background: var(--amber); }
    .stat-bar-fill.poor   { background: var(--stop); }

    /* ── Flip card (vocab + signs) ──────────────────────────────────────────── */
    .flip-card { perspective: 1000px; height: 200px; cursor: pointer; }
    .flip-card-inner {
      position: relative; width: 100%; height: 100%;
      transform-style: preserve-3d;
      transition: transform 450ms ease;
    }
    .flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
    .flip-front, .flip-back {
      position: absolute; inset: 0;
      backface-visibility: hidden; border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; gap: 12px; padding: 24px;
    }
    .flip-front {
      background: var(--surface); border: 1px solid var(--border);
    }
    .flip-back  {
      background: var(--surface-2); border: 1px solid var(--amber);
      transform: rotateY(180deg);
    }
    @media (prefers-reduced-motion: reduce) {
      .flip-card-inner { transition: none; }
    }

    /* ── Sign flashcard specific ─────────────────────────────────────────────── */
    .sign-flip-card { perspective: 1000px; height: 260px; cursor: pointer; }
    .sign-flip-card .flip-card-inner { width: 100%; height: 100%; }
    .sign-flip-card .flip-front { justify-content: center; }
    .sign-flip-card .flip-back  { text-align: center; }

    /* ── Road signs guide card ──────────────────────────────────────────────── */
    .signs-guide-card {
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 14px;
      margin-bottom: 14px;
      overflow: hidden;
    }
    .signs-guide-card summary { list-style: none; }
    .signs-guide-card summary::-webkit-details-marker { display: none; }
    .signs-guide-card summary::after {
      content: '▼';
      font-size: 0.6rem;
      color: var(--ink-muted);
      transition: transform 200ms ease;
    }
    .signs-guide-card[open] summary::after { transform: rotate(180deg); }
    .signs-guide-card ul li { padding-right: 4px; }

    /* ── Toast ──────────────────────────────────────────────────────────────── */
    .toast {
      position: fixed; bottom: 90px; left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: var(--surface-2); border: 1px solid var(--border);
      color: var(--ink); padding: 10px 20px;
      border-radius: 20px; font-size: 0.875rem;
      opacity: 0; pointer-events: none;
      transition: opacity 200ms, transform 200ms;
      z-index: 200; white-space: nowrap;
    }
    .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

    /* ── Weak-topic card ─────────────────────────────────────────────────────── */
    .topic-focus-card {
      background: linear-gradient(135deg, var(--go-dim), rgba(27,122,61,0.05));
      border: 1px solid var(--go);
      border-radius: 16px; padding: 18px 20px;
      margin-bottom: 14px;
    }

    /* ── Signs SRS progress bar (tiny, inside signs screen) ─────────────────── */
    .srs-track { height: 3px; background: var(--surface-2); border-radius: 2px; overflow: hidden; margin-bottom: 12px; }
    .srs-fill  { height: 100%; background: var(--amber); border-radius: 2px; transition: width 300ms ease; }

    /* ── Long-press word tap (§12.2) ────────────────────────────────────────── */
    .word-tap {
      display: inline; cursor: pointer;
      border-radius: 3px;
      transition: background 80ms, color 80ms;
      padding: 0 1px;
    }
    .word-tap.pressing {
      background: rgba(232,163,61,0.3);
      color: var(--amber);
    }

    /* ── Vocab bottom sheet (§12.2) ─────────────────────────────────────────── */
    #vocab-sheet {
      position: fixed; inset: 0; z-index: 300;
      display: none;
      flex-direction: column;
      justify-content: flex-end;
    }
    #vocab-sheet.open { display: flex; }
    .vocab-sheet-backdrop {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.55);
      backdrop-filter: blur(2px);
    }
    .vocab-sheet-panel {
      position: relative; z-index: 1;
      background: var(--surface);
      border-top: 1px solid var(--border);
      border-radius: 20px 20px 0 0;
      padding: 20px 20px calc(20px + env(safe-area-inset-bottom, 0px));
      animation: sheetUp 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    @keyframes sheetUp {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .vocab-sheet-panel { animation: none; }
    }
    .vocab-sheet-drag { width: 36px; height: 4px; background: var(--border); border-radius: 2px; margin: 0 auto 16px; }
    .vocab-sheet-word {
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 1.3rem; font-weight: 700;
      direction: ltr; text-align: center;
      margin-bottom: 4px; color: var(--ink);
    }
    .vocab-sheet-hint {
      font-size: 0.72rem; color: var(--ink-muted);
      text-align: center; margin-bottom: 14px;
    }
    .vocab-sheet-input {
      width: 100%; padding: 11px 14px;
      background: var(--surface-2); border: 1px solid var(--border);
      border-radius: 10px; color: var(--ink);
      font-family: 'Vazirmatn', system-ui, sans-serif;
      font-size: 1rem; direction: rtl;
      margin-bottom: 12px;
    }
    .vocab-sheet-input:focus { outline: none; border-color: var(--amber); }
    .vocab-sheet-actions { display: flex; gap: 10px; }
  </style>
</head>
<body>
<div id="app-root">

<!-- Loading state -->
<div id="loading">
  <div class="spinner"></div>
  <p style="color:var(--ink-muted);font-size:0.9rem;">در حال بارگذاری…</p>
</div>

<!-- ── SCREENS ─────────────────────────────────────────────────────────────── -->

<!-- ══ HOME / PERSONALIZED USER DASHBOARD ══ -->
<div id="screen-home" class="screen" style="padding:0 0 85px;">
  <div style="padding:20px 16px 0;">
    <!-- User Profile Header Card -->
    <div class="user-profile-header card" style="background: linear-gradient(135deg, rgba(31,33,40,0.95), rgba(40,43,53,0.95)); border: 1px solid rgba(232,163,61,0.25); box-shadow: 0 8px 32px rgba(0,0,0,0.3); margin-bottom: 20px; padding: 20px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:14px; margin-bottom: 16px;">
        <!-- Profile Info (Avatar + Name) -->
        <div style="display:flex; align-items:center; gap:14px; min-width:0;">
          <div id="user-avatar-container" style="position:relative; flex-shrink:0;">
            <img id="user-photo" src="" alt="Profile" style="display:none; width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid var(--amber); box-shadow: 0 4px 14px rgba(232,163,61,0.3);" />
            <div id="user-initials-avatar" style="width:54px; height:54px; border-radius:50%; background: linear-gradient(135deg, #16a34a, #2563eb); display:flex; align-items:center; justify-content:center; color:#ffffff; font-family:'Barlow Condensed', sans-serif; font-size:1.4rem; font-weight:700; border:2px solid rgba(255,255,255,0.2); box-shadow: 0 4px 14px rgba(37,99,235,0.4);">
              👤
            </div>
            <span style="position:absolute; bottom:0; right:0; width:14px; height:14px; background:#10b981; border:2px solid var(--surface); border-radius:50%;" title="حساب فعال"></span>
          </div>
          
          <div style="min-width:0;">
            <div id="user-full-name" style="font-size:1.1rem; font-weight:700; color:var(--ink); line-height:1.2; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              کاربر پاتنته
            </div>
            <div style="display:flex; align-items:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
              <span id="user-username" style="font-size:0.75rem; color:var(--amber); font-family:'Public Sans', sans-serif; direction:ltr;">@user</span>
              <span style="font-size:0.68rem; background:rgba(27,122,61,0.2); color:#4ade80; border:1px solid rgba(27,122,61,0.4); padding:1px 6px; border-radius:10px; font-weight:600;">داشبورد اختصاصی</span>
              <button type="button" onclick="App.showGuideModal()" style="font-size:0.68rem; background:rgba(232,163,61,0.18); color:var(--amber); border:1px solid rgba(232,163,61,0.4); padding:1px 8px; border-radius:10px; font-weight:700; cursor:pointer;">💡 راهنما و راز قبولی</button>
            </div>
          </div>
        </div>

        <!-- Streak Badge -->
        <div id="home-streak" style="text-align:center; background:var(--surface-2); border:1px solid rgba(232,163,61,0.3); border-radius:14px; padding:10px 14px; flex-shrink:0;">
          <div style="font-size:1.5rem; font-weight:700; color:var(--amber); line-height:1;" id="streak-value">0</div>
          <div style="font-size:0.68rem; color:var(--ink-muted); margin-top:2px;">🔥 استریک</div>
        </div>
      </div>

      <!-- Key Metrics Row (3 Chips) -->
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-top:14px;">
        <div class="stat-chip" style="background:var(--surface-2); border:1px solid var(--border); border-radius:12px; padding:10px 6px; text-align:center; cursor:pointer;" onclick="App.openExamDateModal()">
          <div style="font-size:0.7rem; color:var(--ink-muted); margin-bottom:2px;">📅 روز تا آزمون</div>
          <div class="stat-chip-value" id="home-days" style="font-size:1.1rem; font-weight:700; color:var(--amber);">—</div>
          <div style="font-size:0.65rem; color:#60a5fa; margin-top:2px; font-weight:600;">تنظیم ✏️</div>
        </div>
        
        <div class="stat-chip" style="background:var(--surface-2); border:1px solid var(--border); border-radius:12px; padding:10px 6px; text-align:center;">
          <div style="font-size:0.7rem; color:var(--ink-muted); margin-bottom:2px;">📊 درصد قبولی</div>
          <div class="stat-chip-value" id="home-pass-rate" style="font-size:1.1rem; font-weight:700; color:#10b981;">—</div>
          <div style="font-size:0.65rem; color:var(--ink-muted); margin-top:2px;" id="home-total-exams">۰ آزمون</div>
        </div>

        <div class="stat-chip" style="background:var(--surface-2); border:1px solid var(--border); border-radius:12px; padding:10px 6px; text-align:center;">
          <div style="font-size:0.7rem; color:var(--ink-muted); margin-bottom:2px;">🔁 مرور اشتباهات</div>
          <div class="stat-chip-value" id="home-review" style="font-size:1.1rem; font-weight:700; color:#ef4444;">0</div>
          <div style="font-size:0.65rem; color:var(--ink-muted); margin-top:2px;">سوال معوقه</div>
        </div>
      </div>
    </div>

    <!-- Weak-topic focus card -->
    <div id="home-focus-card" class="topic-focus-card" style="display:none; margin-bottom:16px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
        <div>
          <div style="font-size:0.72rem; color:var(--go); font-weight:700; letter-spacing:0.04em; margin-bottom:4px;">⚡ تمرین هدفمند موضوع ضعیف</div>
          <div id="home-weakest" style="font-size:0.95rem; font-weight:600; color:var(--ink);"></div>
        </div>
        <button class="btn btn-go-outline btn-sm" style="white-space:nowrap; flex-shrink:0;" onclick="App.startTopicPractice()">
          شروع کن
        </button>
      </div>
    </div>

    <!-- Recent Exam History Feed -->
    <div id="home-recent-section" style="margin-bottom:20px; display:none;">
      <div style="font-size:0.85rem; font-weight:700; color:var(--ink-muted); margin-bottom:8px;">📜 آخرین آزمون‌های من</div>
      <div id="home-recent-list" style="display:flex; flex-direction:column; gap:8px;"></div>
    </div>

    <!-- Data notice -->
    <div style="background:rgba(232,163,61,0.08); border:1px solid rgba(232,163,61,0.2); border-radius:10px; padding:10px 14px; margin-bottom:16px; font-size:0.76rem; color:var(--amber); line-height:1.5;">
      ⚠️ بانک سوال از ۲۰۲۳ — قبل از آزمون با سایت رسمی چک کن.
    </div>
  </div>

  <!-- Action buttons -->
  <div style="padding:0 16px; display:flex; flex-direction:column; gap:10px;">
    <button class="btn btn-primary btn-full" id="btn-start-exam" onclick="App.startExam()">
      🚗 آزمون جامع جدید — ۳۰ سوال (۲۰ دقیقه)
    </button>
    <button class="btn btn-full" onclick="App.showScreen('topics')" style="background:linear-gradient(135deg, rgba(37,99,235,0.2), rgba(168,85,247,0.2)); border:1px solid rgba(59,130,246,0.4); color:#93c5fd; font-weight:700;">
      📚 ۲۵ فصل آموزشی پاتنته B (Capitoli)
    </button>
    <button class="btn btn-ghost btn-full" id="btn-start-review" onclick="App.startReview()" style="display:none;">
      🔁 مرور اشتباهات
    </button>
    <button class="btn btn-ghost btn-full" onclick="App.showScreen('signs')">
      🚦 تمرین تابلوها
    </button>
    <!-- Profile & Analysis entry point (§13.4) -->
    <button class="btn btn-full" onclick="App.showScreen('profile')" style="background:linear-gradient(135deg, rgba(27,122,61,0.15), rgba(232,163,61,0.12)); border:1px solid rgba(27,122,61,0.35); color:var(--ink); font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px;">
      <span style="font-size:1rem;">👤</span>
      <span>پروفایل و تحلیل عملکرد</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;opacity:0.6; flex-shrink:0;"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>
</div>

<!-- ══ TOPICS (Official Capitoli) ══ -->
<div id="screen-topics" class="screen" style="padding:0 0 85px;">
  <div style="padding:20px 16px 0;">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
      <h1 style="margin:0; font-family:'Barlow Condensed',sans-serif; font-size:1.7rem; font-weight:700;">📚 فصل‌های آموزشی</h1>
      <span style="font-size:0.78rem; background:rgba(232,163,61,0.15); color:var(--amber); padding:3px 8px; border-radius:10px; font-weight:700;">Capitoli</span>
    </div>
    
    <p style="font-size:0.8rem; color:var(--ink-muted); margin:0 0 16px; line-height:1.5;">
      فصل مورد نظر خود را برای مطالعه به دو زبان ایتالیایی و فارسی انتخاب کرده و آزمون اختصاصی ۱۵ سوالی آن را شروع کنید:
    </p>

    <!-- Search input -->
    <input type="text" id="topics-search-input" placeholder="🔍 جستجو در نام فصل یا کلمات کلیدی (مثلاً: خطر، سبقت، سرعت)..." style="width:100%; padding:10px 14px; background:var(--surface-2); border:1px solid var(--border); border-radius:12px; color:var(--ink); font-family:'Vazirmatn',sans-serif; font-size:0.85rem; margin-bottom:16px; direction:rtl;" oninput="App.filterTopics()" />

    <!-- Topics Grid/List Container -->
    <div id="topics-list-container" style="display:flex; flex-direction:column; gap:12px;">
      <div style="text-align:center; padding:30px; color:var(--ink-muted);">در حال لود فصل‌های آموزشی… ⏳</div>
    </div>
  </div>
</div>

<!-- ══ PENDING APPROVAL SCREEN ══ -->
<div id="screen-pending" class="screen" style="padding:40px 20px; text-align:center; display:none; flex-direction:column; align-items:center; justify-content:center; min-height:80vh;">
  <div style="width:80px; height:80px; border-radius:50%; background:rgba(232,163,61,0.15); border:2px solid var(--amber); display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin-bottom:20px; box-shadow:0 0 30px rgba(232,163,61,0.3); animation:pulse 2s infinite;">
    ⏳
  </div>
  <h2 style="font-size:1.4rem; color:var(--amber); margin:0 0 10px; font-weight:700;">در انتظار تایید مدیریت</h2>
  <p style="font-size:0.9rem; color:var(--ink-muted); max-width:320px; line-height:1.6; margin:0 0 24px;" id="pending-msg">
    درخواست دسترسی شما برای مدیریت ارسال گردید. پس از تایید مدیریت، دسترسی شما فعال می‌شود.
  </p>
  
  <!-- Commercial Value Proposition Card -->
  <div style="background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(168,85,247,0.15)); border: 1px solid rgba(59,130,246,0.35); border-radius:18px; padding:18px; margin-bottom:20px; max-width:380px; text-align:right; color:var(--ink);">
    <div style="font-size:0.98rem; font-weight:700; color:#60a5fa; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
      <span>💎</span> <b>چرا سامانه هوشمند PatenteFa؟</b>
    </div>
    
    <p style="font-size:0.82rem; color:#d1d5db; line-height:1.75; margin:0 0 12px;">
      با توجه به افزایش قیمت یورو و هزینه‌های سنگین <b>۱۵۰ تا ۱۶۰ یورویی</b> پکیج‌های آموزشی موجود در بازار، سامانه <b>PatenteFa</b> به گونه‌ای طراحی شده است که شما را ظرف مدت <b>۳ تا ۴ ماه</b>، با بالاترین کیفیت و تنها با <b>یک‌سوم هزینه پکیج‌های مشابه</b>، آماده قبولی در آزمون اصلی تئوری پاتنته کند.
    </p>

    <div style="background:var(--surface-2); border:1px solid var(--border); border-radius:12px; padding:12px; font-size:0.78rem; line-height:1.6; color:var(--ink-muted); margin-bottom:12px;">
      ✨ شامل ۳ دستیار هوش مصنوعی (مترجم، مربی آیین‌نامه، استاد زبان ایتالیایی)، ۷,۱۳۹ سوال رسمی و ۲۵ فصل آموزشی
    </div>

    <input type="text" id="fun-custom-answer-input" placeholder="پیام یا توضیحات تکمیلی شما برای مدیریت (اختیاری)…" style="width:100%; padding:10px 12px; background:var(--surface-2); border:1px solid rgba(59,130,246,0.4); border-radius:10px; color:var(--ink); font-family:'Vazirmatn',sans-serif; font-size:0.85rem; margin-bottom:10px; direction:rtl;" />
    
    <button type="button" class="btn btn-sm btn-full" style="background:linear-gradient(135deg, #2563eb, #7c3aed); color:#ffffff; font-weight:700; font-size:0.88rem; padding:10px; border-radius:10px;" id="btn-submit-fun" onclick="App.submitFunAnswer()">
      ارسال درخواست فعال‌سازی دسترسی 🚀
    </button>

    <div id="fun-reward-box" style="display:none; margin-top:10px; background:rgba(16,185,129,0.2); border:1px solid rgba(16,185,129,0.4); border-radius:12px; padding:12px; font-size:0.82rem; color:#6ee7b7; line-height:1.6; text-align:center;">
      ✅ <b>درخواست شما با موفقیت ثبت شد!</b> مدیریت به‌زودی دسترسی شما را تایید خواهد کرد.
    </div>
  </div>

  <button class="btn btn-primary btn-full" onclick="App.checkApprovalStatus()" style="max-width:280px;">
    🔄 بررسی مجدد وضعیت دسترسی
  </button>
</div>

<!-- ══ EXAM RUNNER ══ -->
<div id="screen-exam" class="screen">
  <!-- Top bar -->
  <div class="exam-topbar">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
      <!-- Collapsible question tabs -->
      <details id="tabs-details" style="flex:1;min-width:0;">
        <summary class="tabs-summary">
          <span id="exam-position" style="font-family:'Public Sans',sans-serif;font-size:0.82rem;color:var(--ink-muted);">Q 1 / 30</span>
          <span style="font-size:0.72rem;color:var(--border);margin-right:6px;"> — ببین</span>
        </summary>
        <div class="question-tabs" id="exam-tabs"></div>
      </details>
      <button id="btn-flag" onclick="App.toggleFlag()" style="background:none;border:none;cursor:pointer;font-size:1.2rem;padding:4px 8px;border-radius:8px;margin-right:4px;opacity:0.4;flex-shrink:0;">🔖</button>
    </div>

    <!-- Road map progress bar -->
    <div class="road-container">
      <div class="road-track">
        <div class="road-answered" id="road-answered"></div>
        <div class="road-marker" id="road-marker">🏎️</div>
      </div>
    </div>
  </div>

  <!-- Ascolta + Timer row (timer relocated underneath Ascolta) -->
  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px 0;">
    <button class="tts-btn" id="btn-tts" onclick="App.speakQuestion()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
      Ascolta
    </button>
    <span class="timer" id="exam-timer" style="font-size:0.95rem;flex-shrink:0;">20:00</span>
  </div>

  <!-- §15.3 — AI panel toggle row -->
  <div style="display:flex;align-items:center;justify-content:flex-end;padding:6px 16px 0;">
    <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.82rem;color:var(--ink-muted);">
      <span style="font-family:'Public Sans',sans-serif;">کمک AI</span>
      <input type="checkbox" id="translate-toggle" onchange="App.toggleTranslate()" style="width:36px;height:20px;cursor:pointer;accent-color:var(--amber);" />
      <span style="font-size:0.72rem;">🤖 ۳ متخصص</span>
    </label>
  </div>

  <!-- §15.3 — Three-tab AI panel (lazy loading per tab) -->
  <div id="translate-panel" class="translate-panel">
    <!-- Tab bar -->
    <div style="display:flex;border-bottom:1px solid var(--border);margin-bottom:12px;gap:0;">
      <button id="ai-tab-btn-0" onclick="App.switchAiTab(0)"
        style="flex:1;padding:8px 4px;background:none;border:none;border-bottom:2px solid var(--amber);color:var(--ink);font-size:0.72rem;font-family:'Vazirmatn',sans-serif;cursor:pointer;font-weight:600;transition:all 150ms;">
        🌐 ترجمه
      </button>
      <button id="ai-tab-btn-1" onclick="App.switchAiTab(1)"
        style="flex:1;padding:8px 4px;background:none;border:none;border-bottom:2px solid transparent;color:var(--ink-muted);font-size:0.72rem;font-family:'Vazirmatn',sans-serif;cursor:pointer;font-weight:500;transition:all 150ms;">
        🎓 تئوری
      </button>
      <button id="ai-tab-btn-2" onclick="App.switchAiTab(2)"
        style="flex:1;padding:8px 4px;background:none;border:none;border-bottom:2px solid transparent;color:var(--ink-muted);font-size:0.72rem;font-family:'Vazirmatn',sans-serif;cursor:pointer;font-weight:500;transition:all 150ms;">
        📚 گرامر
      </button>
    </div>

    <!-- Tab 0: Translation (default, loads immediately) -->
    <div id="ai-tab-0" style="display:block;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
        <span style="font-size:1.1rem;">🌐</span>
        <span class="fa-text" style="font-size:0.75rem;color:var(--ink-muted);font-weight:600;">مترجم فارسی</span>
      </div>
      <!-- §19.2: verdict badge — shown ABOVE translation, populated by showTranslation() -->
      <div id="translate-verdict" style="display:none;margin-bottom:10px;"></div>
      <div id="translate-text" class="fa-text" style="color:var(--ink);margin-bottom:8px;font-size:0.95rem;line-height:1.8;"></div>
      <div id="translate-explanation" class="fa-text" style="color:var(--ink-muted);font-size:0.875rem;border-top:1px solid var(--border);padding-top:8px;margin-top:4px;"></div>
    </div>

    <!-- Tab 1: Theory (lazy — fires on first tap of this tab) -->
    <div id="ai-tab-1" style="display:none;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:8px 10px;background:rgba(22,163,74,0.07);border-radius:10px;border:1px solid rgba(22,163,74,0.15);">
        <span style="font-size:1.4rem;">🎓</span>
        <div>
          <div class="fa-text" style="font-size:0.8rem;font-weight:700;color:var(--go);">مربی تئوری</div>
          <div class="fa-text" style="font-size:0.68rem;color:var(--ink-muted);">متخصص آزمون پاتنته B — کدیچه دلا استرادا</div>
        </div>
      </div>
      <div id="theory-loading" class="fa-text" style="display:none;color:var(--ink-muted);font-size:0.85rem;text-align:center;padding:16px 0;">
        ⏳ مربی تئوری در حال آماده کردن توضیح…
      </div>
      <div id="theory-text" class="fa-text" style="color:var(--ink);font-size:0.88rem;line-height:1.9;white-space:pre-wrap;"></div>
      <div id="theory-error" class="fa-text" style="display:none;color:var(--stop);font-size:0.82rem;text-align:center;padding:12px 0;"></div>
    </div>

    <!-- Tab 2: Grammar & vocab (lazy — fires on first tap of this tab) -->
    <div id="ai-tab-2" style="display:none;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:8px 10px;background:rgba(251,191,36,0.08);border-radius:10px;border:1px solid rgba(251,191,36,0.2);">
        <span style="font-size:1.4rem;">📚</span>
        <div>
          <div class="fa-text" style="font-size:0.8rem;font-weight:700;color:var(--amber);">معلم گرامر</div>
          <div class="fa-text" style="font-size:0.68rem;color:var(--ink-muted);">استاد زبان ایتالیایی — متخصص متون آزمون پاتنته</div>
        </div>
      </div>
      <div id="grammar-loading" class="fa-text" style="display:none;color:var(--ink-muted);font-size:0.85rem;text-align:center;padding:16px 0;">
        ⏳ معلم گرامر در حال بررسی جمله…
      </div>
      <div id="grammar-analysis" class="fa-text" style="color:var(--ink);font-size:0.88rem;line-height:1.9;margin-bottom:12px;"></div>
      <div id="vocab-suggestions-list" style="display:flex;flex-direction:column;gap:6px;"></div>
      <div id="grammar-error" class="fa-text" style="display:none;color:var(--stop);font-size:0.82rem;text-align:center;padding:12px 0;"></div>
    </div>
  </div>


  <!-- Question body -->
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;">
    <img id="exam-sign-img" class="sign-image" style="display:none;" alt="road sign" />
    <p id="exam-question-text" class="question-text"></p>
  </div>

  <!-- VERO / FALSO buttons -->
  <div style="padding:0 16px 16px;display:flex;gap:12px;">
    <button class="btn btn-falso btn-full" id="btn-falso" onclick="App.answer(0)">✗ FALSO</button>
    <button class="btn btn-vero btn-full"  id="btn-vero"  onclick="App.answer(1)">✓ VERO</button>
  </div>
</div>

<!-- ══ RESULTS ══ -->
<div id="screen-results" class="screen" style="padding:0 0 80px;">
  <div style="padding:24px 16px 0;text-align:center;">
    <div id="results-badge" class="result-badge pass"></div>
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:3.5rem;font-weight:700;line-height:1;margin:10px 0 4px;" id="results-score"></div>
    <div style="color:var(--ink-muted);font-size:0.88rem;" id="results-detail"></div>
    <div style="color:var(--ink-muted);font-size:0.78rem;margin-top:4px;" id="results-time"></div>
  </div>

  <div id="results-tutor-banner" style="display:none;margin:16px 16px 0;">
    <button onclick="App.openTutorReview()" class="btn btn-full" style="background:linear-gradient(135deg, #15803d, #166534);color:#ffffff;padding:14px 16px;border-radius:14px;border:1px solid rgba(255,255,255,0.2);box-shadow:0 4px 14px rgba(22,101,52,0.4);display:flex;align-items:center;justify-content:center;gap:8px;font-weight:700;font-size:0.95rem;cursor:pointer;">
      <span style="font-size:1.2rem;">🎓</span>
      <span id="results-tutor-banner-text">تحلیل و رفع اشکال سوالات غلط با استاد AI</span>
    </button>
  </div>

  <div style="padding:16px;display:flex;gap:10px;">
    <button class="btn btn-primary btn-full" onclick="App.startExam()">🚗 آزمون جدید</button>
    <button class="btn btn-ghost btn-full" onclick="App.navigateBack()">🏠 خانه</button>
  </div>

  <div style="padding:0 16px 16px;">
    <h2 style="font-size:0.9rem;font-weight:700;margin-bottom:12px;color:var(--ink-muted);">جزئیات سوالات</h2>
    <div id="results-list"></div>
  </div>
</div>

<!-- ══ AI EXAM TUTOR REVIEW SCREEN ══ -->
<div id="screen-tutor" class="screen" style="padding:0 0 90px;display:none;flex-direction:column;">
  <!-- Header -->
  <div style="position:sticky;top:0;z-index:10;background:var(--asphalt);padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
    <button onclick="App.showScreen('results', 'back')" style="background:none;border:none;color:var(--ink);font-size:1.2rem;cursor:pointer;padding:4px 8px;">←</button>
    <div style="text-align:center;">
      <h1 style="font-size:1rem;font-weight:700;margin:0;color:var(--ink);">🎓 استاد رفع اشکال هوش مصنوعی</h1>
      <span id="tutor-progress-badge" style="font-size:0.75rem;color:var(--ink-muted);">در حال دریافت اطلاعات...</span>
    </div>
    <div style="width:32px;"></div>
  </div>

  <!-- Loading State -->
  <div id="tutor-loading" style="padding:60px 20px;text-align:center;">
    <div class="spinner" style="margin:0 auto 16px;"></div>
    <div style="font-size:0.92rem;font-weight:600;color:var(--ink);">در حال تحلیل آزمون و استخراج نکات توسط استاد AI...</div>
    <div style="font-size:0.78rem;color:var(--ink-muted);margin-top:6px;">تله‌های سوالات، قوانین آیین‌نامه و لغات در حال استخراج است.</div>
  </div>

  <!-- Content Container -->
  <div id="tutor-content" style="display:none;padding:16px;">
    
    <!-- Question Stepper -->
    <div id="tutor-stepper" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin-bottom:12px;scroll-behavior:smooth;"></div>

    <!-- Active Question Tutor Card -->
    <div id="tutor-card" class="card" style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:16px;">
      
      <!-- Question Badge & Answers comparison -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span id="tutor-q-badge" class="badge" style="background:rgba(220,38,38,0.15);color:#ef4444;font-weight:700;padding:4px 10px;border-radius:8px;font-size:0.78rem;">سوال اشتباه</span>
        <span id="tutor-q-answers-cmp" style="font-size:0.8rem;color:var(--ink-muted);font-family:'Public Sans',sans-serif;" dir="ltr"></span>
      </div>

      <!-- Question Image -->
      <div id="tutor-q-image-container" style="display:none;margin-bottom:12px;text-align:center;">
        <img id="tutor-q-image" src="" style="max-height:160px;border-radius:8px;object-fit:contain;border:1px solid var(--border);" alt="سوال" />
      </div>

      <!-- Italian Question Text -->
      <div id="tutor-q-text-it" dir="ltr" style="font-family:'Public Sans',sans-serif;font-size:0.95rem;font-weight:600;color:var(--ink);line-height:1.4;margin-bottom:8px;background:rgba(255,255,255,0.03);padding:12px;border-radius:10px;border:1px solid var(--border);"></div>

      <!-- Persian Translation -->
      <div id="tutor-q-text-fa" style="font-size:0.88rem;color:var(--ink-muted);line-height:1.5;margin-bottom:14px;padding:0 4px;"></div>

      <hr style="border:none;border-top:1px dashed var(--border);margin:12px 0;" />

      <!-- Trap / Misconception -->
      <div style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:6px;color:#f59e0b;font-weight:700;font-size:0.88rem;margin-bottom:6px;">
          <span>⚠️</span>
          <span>تله سوال و علت اشتباه</span>
        </div>
        <div id="tutor-trap-box" style="font-size:0.85rem;color:var(--ink);line-height:1.6;background:rgba(245,158,11,0.08);border-right:3px solid #f59e0b;padding:10px 12px;border-radius:6px 10px 10px 6px;"></div>
      </div>

      <!-- Rule & Tips -->
      <div style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:6px;color:#10b981;font-weight:700;font-size:0.88rem;margin-bottom:6px;">
          <span>📜</span>
          <span>اصل قانون رسمی آیین‌نامه ایتالیا</span>
        </div>
        <div id="tutor-rule-box" style="font-size:0.85rem;color:var(--ink);line-height:1.6;background:rgba(16,185,129,0.08);border-right:3px solid #10b981;padding:10px 12px;border-radius:6px 10px 10px 6px;"></div>
      </div>

      <!-- Key Vocab -->
      <div id="tutor-vocab-section" style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:6px;color:#3b82f6;font-weight:700;font-size:0.88rem;margin-bottom:6px;">
          <span>🔑</span>
          <span>کلمات و افعال کلیدی سوال</span>
        </div>
        <div id="tutor-vocab-list" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
      </div>

      <!-- Navigation buttons -->
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button id="tutor-prev-btn" onclick="App.prevTutorQuestion()" class="btn btn-ghost" style="flex:1;">← سوال قبلی</button>
        <button id="tutor-next-btn" onclick="App.nextTutorQuestion()" class="btn btn-primary" style="flex:1;">سوال بعدی →</button>
      </div>

    </div>

    <!-- Live Interactive Chat -->
    <div class="card" style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;font-weight:700;font-size:0.9rem;color:var(--ink);">
          <span>💬</span>
          <span>گفتگوی تعاملی با استاد رفع اشکال</span>
        </div>
        <span style="font-size:0.75rem;color:var(--ink-muted);">پرسش سوالات تکمیلی</span>
      </div>

      <!-- Chat History -->
      <div id="tutor-chat-box" style="max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:10px;background:rgba(0,0,0,0.2);border-radius:12px;border:1px solid var(--border);margin-bottom:12px;">
        <div style="font-size:0.82rem;color:var(--ink-muted);text-align:center;padding:8px;">
          هر سوال یا ابهامی در مورد این تست داری بنویس تا استاد برات توضیح بده.
        </div>
      </div>

      <!-- Chat Input Form -->
      <form onsubmit="App.sendTutorChatMessage(event)" style="display:flex;gap:8px;">
        <input id="tutor-chat-input" type="text" placeholder="سوال خود را بنویسید (مثلاً: چرا گزینه VERO غلط بود؟)" style="flex:1;background:var(--asphalt);border:1px solid var(--border);color:var(--ink);padding:10px 12px;border-radius:10px;font-size:0.85rem;font-family:Vazirmatn,sans-serif;" />
        <button id="tutor-chat-send-btn" type="submit" class="btn btn-primary" style="padding:10px 16px;font-size:0.85rem;">ارسال</button>
      </form>
    </div>

  </div>
</div>


<!-- ══ VOCAB ══ -->
<div id="screen-vocab" class="screen" style="padding:0 0 80px;">
  <div style="padding:20px 16px 0;">
    <h1 style="margin:0 0 16px;font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:700;">📖 لغت‌نامه</h1>

    <!-- Add new term -->
    <div class="card" style="margin-bottom:16px;">
      <div style="font-size:0.8rem;font-weight:700;margin-bottom:12px;color:var(--ink-muted);">افزودن لغت جدید</div>
      <input type="text" id="vocab-it-input" placeholder="Termine italiano" dir="ltr"
        style="width:100%;padding:10px 12px;background:var(--surface-2);border:1px solid var(--border);border-radius:8px;color:var(--ink);font-family:'Public Sans',sans-serif;font-size:0.95rem;margin-bottom:8px;" />
      <div style="display:flex;gap:8px;margin-bottom:8px;">
        <input type="text" id="vocab-fa-input" placeholder="ترجمه فارسی"
          style="flex:1;padding:10px 12px;background:var(--surface-2);border:1px solid var(--border);border-radius:8px;color:var(--ink);font-family:'Vazirmatn',sans-serif;font-size:0.95rem;direction:rtl;" />
        <button class="btn btn-ghost btn-sm" onclick="App.suggestVocab()">AI ✨</button>
      </div>
      <button class="btn btn-primary btn-full btn-sm" onclick="App.saveVocab()">ذخیره</button>
    </div>

    <!-- Due items -->
    <div id="vocab-due-section" style="display:none;margin-bottom:16px;">
      <h2 style="font-size:0.88rem;font-weight:700;margin:0 0 10px;">باید مرور کنی (<span id="vocab-due-count">0</span>)</h2>
      <div id="vocab-flip-card" class="flip-card" onclick="App.flipVocab()">
        <div class="flip-card-inner">
          <div class="flip-front">
            <div id="vocab-front-text" style="font-family:'Public Sans',sans-serif;font-size:1.3rem;font-weight:600;direction:ltr;text-align:center;"></div>
            <div style="font-size:0.75rem;color:var(--ink-muted);">برگردان</div>
          </div>
          <div class="flip-back">
            <div id="vocab-back-text" style="font-family:'Vazirmatn',sans-serif;font-size:1.3rem;font-weight:600;direction:rtl;text-align:center;color:var(--ink);"></div>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:10px;">
        <button class="btn btn-falso btn-full btn-sm" onclick="App.vocabReview(false)">✗ اشتباه</button>
        <button class="btn btn-vero btn-full btn-sm"  onclick="App.vocabReview(true)">✓ درست</button>
      </div>
    </div>

    <!-- All items -->
    <h2 style="font-size:0.88rem;font-weight:700;margin:0 0 10px;">همه لغات</h2>
    <div id="vocab-list"></div>
  </div>
</div>

<!-- ══ STATS ══ -->
<div id="screen-stats" class="screen" style="padding:0 0 80px;">
  <div style="padding:20px 16px 0;">
    <h1 style="margin:0 0 20px;font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:700;">📊 آمار</h1>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:20px;">
      <div class="stat-chip"><div class="stat-chip-value" id="stats-streak">0</div><div class="stat-chip-label">🔥 روز</div></div>
      <div class="stat-chip"><div class="stat-chip-value" id="stats-sessions">0</div><div class="stat-chip-label">آزمون</div></div>
      <div class="stat-chip"><div class="stat-chip-value" id="stats-pass-rate">—</div><div class="stat-chip-label">% قبولی</div></div>
    </div>

    <h2 style="font-size:0.88rem;font-weight:700;margin:0 0 14px;color:var(--ink-muted);">دقت بر اساس موضوع</h2>
    <div id="stats-topic-bars"></div>

    <div style="margin-top:20px;">
      <button class="btn btn-full" onclick="App.showScreen('profile')" style="background:linear-gradient(135deg,rgba(27,122,61,0.15),rgba(232,163,61,0.12));border:1px solid rgba(27,122,61,0.35);color:var(--ink);font-weight:700;">
        👤 مشاهده پروفایل کامل و تحلیل عملکرد
      </button>
    </div>
  </div>
</div>

<!-- ══ PROFILE & ANALYSIS (§13) ══ -->
<div id="screen-profile" class="screen" style="padding:0 0 90px;">

  <!-- ── Profile header ── -->
  <div style="padding:20px 16px 0;">

    <!-- Back header bar -->
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:20px;">
      <button type="button" onclick="App.showScreen('home','back')" style="background:none;border:none;color:var(--ink-muted);cursor:pointer;padding:4px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:22px;height:22px;"><path d="M15 18l6-6-6-6"/></svg>
      </button>
      <h1 style="margin:0;font-family:'Barlow Condensed',sans-serif;font-size:1.7rem;font-weight:700;color:var(--ink);">پروفایل</h1>
    </div>

    <!-- ── Level / XP card ── -->
    <div class="card" style="margin-bottom:16px; background:linear-gradient(135deg,rgba(27,122,61,0.12),rgba(31,33,40,1)); border-color:rgba(27,122,61,0.3);">
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:14px;">

        <!-- Autostrada shield badge -->
        <div class="shield-badge" id="profile-shield">
          <span class="shield-level" id="profile-level">0</span>
          <span class="shield-label">LVL</span>
        </div>

        <!-- Name + XP progress -->
        <div style="flex:1; min-width:0;">
          <div id="profile-name" style="font-size:1.1rem; font-weight:700; color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">…</div>
          <div id="profile-username" style="font-size:0.75rem; color:var(--amber); font-family:'Public Sans',sans-serif; direction:ltr; margin-bottom:8px;">@—</div>

          <!-- XP bar -->
          <div style="display:flex; align-items:center; gap:8px;">
            <div class="xp-road-track" style="flex:1;">
              <div class="xp-road-fill" id="profile-xp-fill" style="width:0%;"></div>
            </div>
            <span id="profile-xp-label" style="font-size:0.72rem; font-weight:700; color:var(--go); white-space:nowrap;">0 XP</span>
          </div>
          <div style="font-size:0.62rem; color:var(--ink-muted); margin-top:3px;">
            <span id="profile-xp-detail">0 از 100 XP تا سطح بعد</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── 4-icon stat row ── -->
    <div style="display:flex; gap:8px; margin-bottom:20px;">
      <div class="profile-stat-tile">
        <span class="tile-icon">🔥</span>
        <span class="tile-value" id="profile-streak">0</span>
        <span class="tile-label">روز استریک</span>
      </div>
      <div class="profile-stat-tile">
        <span class="tile-icon">📝</span>
        <span class="tile-value" id="profile-exams">0</span>
        <span class="tile-label">آزمون داده</span>
      </div>
      <div class="profile-stat-tile">
        <span class="tile-icon">🗺️</span>
        <span class="tile-value" id="profile-coverage-pct">0%</span>
        <span class="tile-label">پوشش بانک</span>
      </div>
      <div class="profile-stat-tile">
        <span class="tile-icon">📖</span>
        <span class="tile-value" id="profile-vocab">0</span>
        <span class="tile-label">لغت یادگرفته</span>
      </div>
    </div>

    <!-- ─────────────── ANALYSIS SECTION ─────────────── -->
    <div style="border-top:1px solid var(--border); padding-top:20px;">
      <h2 style="margin:0 0 16px; font-family:'Barlow Condensed',sans-serif; font-size:1.4rem; font-weight:700;">📊 تحلیل عملکرد</h2>

      <!-- Coverage bar -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">
          <span style="font-size:0.82rem; font-weight:700; color:var(--ink);">🗺️ پوشش بانک سوال</span>
          <span id="profile-coverage-label" style="font-size:0.78rem; color:var(--go); font-weight:700;">— از ۷٬۱۳۹</span>
        </div>
        <div class="coverage-road">
          <div class="coverage-road-fill" id="profile-coverage-fill" style="width:0%;"></div>
        </div>
        <div id="profile-coverage-sub" style="font-size:0.7rem; color:var(--ink-muted); margin-top:6px;">در حال بارگذاری…</div>
      </div>

      <!-- Needs more work -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--stop);">⚠️ نیاز به تمرین بیشتر</span>
          <span style="font-size:0.7rem; color:var(--ink-muted);">بیشترین اشتباه</span>
        </div>
        <div id="profile-nmw-list" style="display:flex; flex-direction:column; gap:8px;">
          <div style="color:var(--ink-muted); font-size:0.85rem; text-align:center; padding:12px 0;">در حال بارگذاری…</div>
        </div>
      </div>

      <!-- Per-topic accuracy chart -->
      <div class="card" style="margin-bottom:16px;">
        <div style="font-size:0.85rem; font-weight:700; margin-bottom:12px; color:var(--ink);">📈 دقت بر اساس موضوع — بدترین اول</div>
        <div id="profile-topic-chart">
          <div style="color:var(--ink-muted); font-size:0.85rem; text-align:center; padding:12px 0;">در حال بارگذاری…</div>
        </div>
      </div>

      <!-- Score trend sparkline -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--ink);">📉 روند نمره — ۱۵ آزمون اخیر</span>
          <span style="font-size:0.7rem; color:var(--ink-muted);" id="profile-trend-range"></span>
        </div>
        <div class="sparkline-wrap">
          <svg id="profile-sparkline" viewBox="0 0 300 80" preserveAspectRatio="none"
               xmlns="http://www.w3.org/2000/svg">
            <!-- pass line at score=27 (30 - 3 errors) -->
            <line x1="0" y1="" x2="300" y2="" id="sparkline-pass-line"
                  stroke="rgba(27,122,61,0.4)" stroke-width="1" stroke-dasharray="4 4"/>
            <polyline id="sparkline-line" points="" fill="none"
                      stroke="var(--amber)" stroke-width="2"
                      stroke-linejoin="round" stroke-linecap="round"/>
            <circle id="sparkline-dot" cx="0" cy="0" r="4" fill="var(--amber)"/>
            <text id="sparkline-empty" x="150" y="42" text-anchor="middle"
                  fill="rgba(255,255,255,0.3)" font-size="11"
                  font-family="Vazirmatn, sans-serif">هنوز آزمونی نداده‌ای</text>
          </svg>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:4px; font-size:0.65rem; color:var(--ink-muted);">
          <span id="sparkline-min-label">کمترین: —</span>
          <span style="color:rgba(27,122,61,0.8); font-size:0.62rem;">خط قبولی (۲۷)</span>
          <span id="sparkline-max-label">بیشترین: —</span>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- ══ ADMIN DASHBOARD ══ -->
<div id="screen-admin" class="screen" style="padding:0 0 80px;">
  <div style="padding:20px 16px 0;">

    <!-- ── Section 1: Header + KPI bar ────────────────────────────────────── -->
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:1.8rem;">🎛️</span>
        <div>
          <h1 style="margin:0; font-family:'Barlow Condensed',sans-serif; font-size:1.8rem; font-weight:700;">پنل مدیریت PatenteFa</h1>
          <div style="font-size:0.75rem; color:var(--ink-muted);" id="admin-kpi-sub">در حال بارگذاری…</div>
        </div>
      </div>
      <button type="button" class="btn btn-ghost btn-sm" onclick="App.loadAdminData()" style="border-radius:10px;">🔄 به‌روزرسانی</button>
    </div>

    <!-- KPI row: 6-cell grid, 3 per row on small screens -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:8px;">
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">👥 کاربران</div>
        <div id="admin-total-users" style="font-size:1.5rem; font-weight:700; color:var(--amber);">—</div>
        <div id="admin-pending-users" style="font-size:0.68rem; color:#f59e0b;"></div>
      </div>
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">✅ فعال امروز</div>
        <div id="admin-active-today" style="font-size:1.5rem; font-weight:700; color:#4ade80;">—</div>
        <div id="admin-events-logged" style="font-size:0.68rem; color:var(--ink-muted);"></div>
      </div>
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">📝 آزمون‌ها</div>
        <div id="admin-total-exams" style="font-size:1.5rem; font-weight:700; color:var(--ink);">—</div>
        <div id="admin-pass-rate" style="font-size:0.68rem; color:var(--ink-muted);">قبولی: —</div>
      </div>
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">⏱️ حضور (دقیقه)</div>
        <div id="admin-total-mins" style="font-size:1.5rem; font-weight:700; color:#38bdf8;">—</div>
        <div style="font-size:0.68rem; color:var(--ink-muted);">مجموع همه کاربران</div>
      </div>
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">💰 هزینه API</div>
        <div id="admin-total-cost" style="font-size:1.5rem; font-weight:700; color:#f43f5e;">—</div>
        <div id="admin-total-api-calls" style="font-size:0.68rem; color:var(--ink-muted);">— فراخوانی</div>
      </div>
      <div id="admin-pending-alert" style="background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.4); border-radius:12px; padding:12px; text-align:right; display:none;">
        <div style="font-size:0.7rem; color:#f59e0b;">⏳ در انتظار تایید</div>
        <div id="admin-pending-count" style="font-size:1.5rem; font-weight:700; color:#f59e0b;">—</div>
        <div style="font-size:0.68rem; color:#f59e0b;">کاربر جدید</div>
      </div>
    </div>

    <!-- ── Section 2: Cost breakdown by action (§18.4) ─────────────────────── -->
    <div style="background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:14px; margin-bottom:16px;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
        <h2 style="margin:0; font-size:0.88rem; font-weight:700; color:var(--ink);">💸 هزینه API به تفکیک نوع عملیات</h2>
        <div style="display:flex; gap:8px;">
          <button type="button" id="cost-tab-today" onclick="App.switchCostTab('today')" style="font-size:0.7rem; padding:3px 10px; border-radius:6px; border:1px solid var(--border); background:var(--go); color:#fff; cursor:pointer;">امروز</button>
          <button type="button" id="cost-tab-week" onclick="App.switchCostTab('week')" style="font-size:0.7rem; padding:3px 10px; border-radius:6px; border:1px solid var(--border); background:var(--surface-2); color:var(--ink-muted); cursor:pointer;">۷ روز</button>
          <button type="button" id="cost-tab-total" onclick="App.switchCostTab('total')" style="font-size:0.7rem; padding:3px 10px; border-radius:6px; border:1px solid var(--border); background:var(--surface-2); color:var(--ink-muted); cursor:pointer;">کل</button>
        </div>
      </div>
      <div id="admin-cost-breakdown" style="display:flex; flex-direction:column; gap:6px;">
        <div style="color:var(--ink-muted); font-size:0.8rem; text-align:center; padding:10px;">در حال بارگذاری…</div>
      </div>
    </div>

    <!-- ── Section 3: User list ─────────────────────────────────────────────── -->
    <div style="display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap;">
      <input type="text" id="admin-search-input" placeholder="🔍 جستجوی کاربر با نام یا آیدی…"
        style="flex:1; min-width:170px; padding:9px 12px; background:var(--surface-2); border:1px solid var(--border); border-radius:12px; color:var(--ink); font-size:0.85rem;"
        oninput="App.debouncedAdminSearch()" />
      <select id="admin-status-filter" onchange="App.loadAdminUsers()"
        style="padding:9px 12px; background:var(--surface-2); border:1px solid var(--border); border-radius:12px; color:var(--ink); font-size:0.85rem;">
        <option value="all">همه کاربران</option>
        <option value="approved">✅ تایید شده</option>
        <option value="pending">⏳ در انتظار</option>
        <option value="blocked">🔴 مسدود</option>
      </select>
    </div>
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
      <h2 style="margin:0; font-size:0.88rem; font-weight:700; color:var(--ink);">👤 لیست کاربران</h2>
      <span id="admin-user-count" style="font-size:0.75rem; color:var(--ink-muted);"></span>
    </div>
    <div id="admin-users-table" style="display:flex; flex-direction:column; gap:10px;"></div>

    <!-- ── Section 4: Live event stream ────────────────────────────────────── -->
    <h2 style="font-size:0.88rem; font-weight:700; margin:20px 0 8px; color:var(--ink);">⚡ لاگ زنده رویدادها</h2>
    <div id="admin-events-stream" style="background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:12px; max-height:280px; overflow-y:auto; font-size:0.78rem;"></div>
  </div>
</div>

<!-- ══ ADMIN USER TIMELINE MODAL ══ -->
<div id="admin-user-modal" style="position:fixed; inset:0; z-index:360; display:none; flex-direction:column; justify-content:flex-end;">
  <div style="position:absolute; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px);" onclick="App.closeAdminUserModal()"></div>
  <div style="position:relative; z-index:1; background:var(--surface); border-top:1px solid var(--border); border-radius:20px 20px 0 0; padding:20px; max-height:88vh; overflow-y:auto;">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
      <h3 id="admin-user-modal-title" style="margin:0; font-size:1.05rem; color:var(--ink);">📊 جزئیات فعالیت کاربر</h3>
      <button type="button" class="btn btn-ghost btn-sm" onclick="App.closeAdminUserModal()">✕ بستن</button>
    </div>
    <div id="admin-user-modal-content"></div>
  </div>
</div>

<!-- ══ SIGNS (Road-sign flashcard mode) ══ -->
<div id="screen-signs" class="screen" style="padding:0 0 80px;">
  <div style="padding:20px 16px 0;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
      <h1 style="margin:0;font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:700;">🚦 تابلوها</h1>
      <div id="signs-counter" style="font-size:0.78rem;color:var(--ink-muted);"></div>
    </div>
    <!-- §14.4: study-mode framing text -->
    <div style="font-size:0.78rem;color:var(--ink-muted);margin-bottom:14px;line-height:1.5;">📖 تابلو رو ببین، بگردون، خودتو بسنج</div>

    <!-- Road signs introductory guide (collapsible) -->
    <details id="signs-guide-details" class="signs-guide-card" open>
      <summary style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:12px 14px;font-family:'Vazirmatn',sans-serif;font-size:0.88rem;font-weight:700;color:var(--ink);user-select:none;">
        <span>🚸 شناخت تابلوهای رانندگی ایتالیا</span>
        <span style="font-size:0.68rem;color:var(--ink-muted);font-weight:500;">Italian Road Signs Guide</span>
      </summary>
      <div style="padding:0 14px 14px;font-family:'Vazirmatn',sans-serif;font-size:0.78rem;line-height:1.8;color:var(--ink);">

        <!-- Shape -->
        <div style="font-weight:700;color:var(--amber);margin-bottom:6px;font-size:0.82rem;">🔷 شکل تابلو <span style="font-weight:500;color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Shape)</span></div>
        <ul style="list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:4px;">
          <li>🔺 <b>مثلث</b>: هشدار و خطر <span style="color:var(--ink-muted);" dir="ltr">(Warning & Danger)</span></li>
          <li>🔴 <b>دایره</b>: ممنوعیت، محدودیت یا اجبار <span style="color:var(--ink-muted);" dir="ltr">(Prohibition, Restriction, or Obligation)</span></li>
          <li>🟦 <b>مربع و مستطیل</b>: اطلاعات و راهنمای مسیر <span style="color:var(--ink-muted);" dir="ltr">(Information & Direction)</span></li>
          <li>🛑 <b>هشت‌ضلعی</b>: توقف کامل <span style="color:var(--ink-muted);" dir="ltr">(Stop)</span></li>
          <li>🔻 <b>مثلث وارونه</b>: رعایت حق‌تقدم <span style="color:var(--ink-muted);" dir="ltr">(Yield / Give Way)</span></li>
          <li>♦️ <b>لوزی</b>: وضعیت حق‌تقدم جاده <span style="color:var(--ink-muted);" dir="ltr">(Priority Road)</span></li>
        </ul>

        <!-- Color -->
        <div style="font-weight:700;color:var(--amber);margin-bottom:6px;font-size:0.82rem;">🎨 رنگ تابلو <span style="font-weight:500;color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Color)</span></div>
        <ul style="list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:4px;">
          <li style="color:var(--stop);">● <b>حاشیه قرمز</b>: <span style="color:var(--ink);">خطر، ممنوعیت یا محدودیت</span> <span style="color:var(--ink-muted);" dir="ltr">(Danger, Prohibition, Restriction)</span></li>
          <li style="color:#3b82f6;">● <b style="color:var(--ink);">زمینه آبی دایره‌ای</b>: <span style="color:var(--ink);">دستور اجباری</span> <span style="color:var(--ink-muted);" dir="ltr">(Mandatory Instruction)</span></li>
          <li style="color:#3b82f6;">● <b style="color:var(--ink);">زمینه آبی مربع/مستطیل</b>: <span style="color:var(--ink);">اطلاعات</span> <span style="color:var(--ink-muted);" dir="ltr">(Information)</span></li>
          <li style="color:var(--go);">● <b style="color:var(--ink);">سبز</b>: <span style="color:var(--ink);">اتوبان</span> <span style="color:var(--ink-muted);" dir="ltr">(Motorway / Highway)</span></li>
          <li style="color:#60a5fa;">● <b style="color:var(--ink);">آبی</b>: <span style="color:var(--ink);">جاده‌های خارج شهری</span> <span style="color:var(--ink-muted);" dir="ltr">(Out-of-town Roads)</span></li>
          <li style="color:var(--ink);">● <b>سفید</b>: مسیرهای داخل شهر <span style="color:var(--ink-muted);" dir="ltr">(Urban / City Roads)</span></li>
          <li style="color:#92400e;">● <b style="color:var(--ink);">قهوه‌ای</b>: <span style="color:var(--ink);">مکان‌های گردشگری و تاریخی</span> <span style="color:var(--ink-muted);" dir="ltr">(Tourist & Historical Sites)</span></li>
          <li style="color:var(--amber);">● <b style="color:var(--ink);">زرد</b>: <span style="color:var(--ink);">تابلوهای موقت و عملیات جاده‌ای</span> <span style="color:var(--ink-muted);" dir="ltr">(Temporary & Roadworks)</span></li>
        </ul>

        <!-- Golden Rules -->
        <div style="font-weight:700;color:var(--amber);margin-bottom:6px;font-size:0.82rem;">⭐ قاعده‌ی مهم <span style="font-weight:500;color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Golden Rules)</span></div>
        <ul style="list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:5px;">
          <li>🔺 <b style="color:var(--stop);">مثلث قرمز</b>: مواظب باش <span style="color:var(--ink-muted);" dir="ltr">(Watch out)</span></li>
          <li>🔴 <b style="color:var(--stop);">دایره قرمز</b>: انجام نده یا از حد مشخص عبور نکن <span style="color:var(--ink-muted);" dir="ltr">(Do not do or exceed limit)</span></li>
          <li>🔵 <b style="color:#3b82f6;">دایره آبی</b>: باید انجام بدهی <span style="color:var(--ink-muted);" dir="ltr">(You must do)</span></li>
          <li>🟦 <b>مربع یا مستطیل</b>: اطلاعات دریافت کن <span style="color:var(--ink-muted);" dir="ltr">(Receive information)</span></li>
          <li>🚫 <b style="color:var(--stop);">خط قرمز مورب روی تابلو</b>: معمولاً پایان آن دستور، محدودیت یا مسیر <span style="color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Usually ends a command, restriction, or route)</span></li>
          <li>📋 <b>پنل زیر تابلو</b>: می‌تواند فاصله، طول مسیر، زمان اعتبار، جهت اثر تابلو، شروع، ادامه یا پایان محدودیت را مشخص کند <span style="color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Panels underneath specify distance, length, validity, direction, or start/end of restriction)</span></li>
        </ul>

        <!-- Reading Order -->
        <div style="font-weight:700;color:var(--go);margin-bottom:6px;font-size:0.82rem;">📖 روش خواندن تابلو <span style="font-weight:500;color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Reading Order)</span></div>
        <div style="background:rgba(27,122,61,0.1);border:1px solid rgba(27,122,61,0.25);border-radius:10px;padding:10px 12px;font-size:0.78rem;line-height:1.7;">
          هنگام خواندن تابلو اول <b style="color:var(--amber);">شکل</b>، سپس <b style="color:var(--amber);">رنگ</b>، بعد <b style="color:var(--amber);">علامت داخل تابلو</b> و در پایان <b style="color:var(--amber);">پنل زیر آن</b> را بررسی کن.
        </div>

      </div>
    </details>

    <div class="srs-track"><div class="srs-fill" id="signs-srs-bar" style="width:0%;"></div></div>

    <!-- Flip card: front = sign image, back = name + translation -->
    <div id="signs-flip-card" class="flip-card sign-flip-card" onclick="App.flipSign()" style="margin-bottom:14px;">
      <div class="flip-card-inner">
        <div class="flip-front">
          <img id="signs-img" style="max-width:150px;max-height:150px;object-fit:contain;" alt="road sign" />
          <div style="font-size:0.72rem;color:var(--ink-muted);margin-top:8px;">برگردان</div>
        </div>
        <div class="flip-back">
          <!-- Italian name — primary, always shown -->
          <div id="signs-name-it" style="font-family:'Public Sans',sans-serif;font-size:1.05rem;font-weight:700;direction:ltr;text-align:center;color:var(--ink);margin-bottom:8px;"></div>
          <!-- Farsi translation — loaded lazily on first flip -->
          <div id="signs-name-fa" style="font-family:'Vazirmatn',sans-serif;font-size:0.95rem;font-weight:500;direction:rtl;text-align:center;color:var(--ink-muted);min-height:1.4em;"></div>
        </div>
      </div>
    </div>

    <div style="display:flex;gap:10px;">
      <button class="btn btn-signs-unknown btn-full btn-sm" onclick="App.signsReview(false)">🤔 نمی‌دونم</button>
      <button class="btn btn-signs-known btn-full btn-sm"  onclick="App.signsReview(true)">💡 می‌دونم</button>
    </div>

    <div id="signs-empty" style="display:none;text-align:center;padding:40px 0;color:var(--ink-muted);">
      <div style="font-size:2rem;margin-bottom:8px;">✅</div>
      <div style="font-size:0.95rem;">امروز همه تابلوها رو مرور کردی!</div>
      <div style="font-size:0.78rem;margin-top:4px;">فردا دوباره بیا</div>
    </div>
  </div>
</div>

<!-- ── Bottom nav ─────────────────────────────────────────────────────────── -->
<nav class="bottom-nav" id="bottom-nav">
  <button class="nav-item active" id="nav-home" onclick="App.showScreen('home')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    خانه
  </button>
  <button class="nav-item" id="nav-exam" onclick="App.startExam()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    آزمون
  </button>
  <button class="nav-item" id="nav-signs" onclick="App.showScreen('signs')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="8.5" x2="22" y2="8.5"/><line x1="2" y1="15.5" x2="22" y2="15.5"/></svg>
    تابلوها
  </button>
  <button class="nav-item" id="nav-vocab" onclick="App.showScreen('vocab')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    لغات
  </button>
  <button class="nav-item" id="nav-profile" onclick="App.showScreen('profile')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    پروفایل
  </button>
  <button class="nav-item" id="nav-admin" onclick="App.showScreen('admin')" style="display:none; color:var(--amber);">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1-2.83 0l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    مدیریت
  </button>
</nav>

</div><!-- #app-root -->

<!-- Toast notification -->
<div class="toast" id="toast"></div>

<!-- ── Vocab bottom sheet (§12.2) ──────────────────────────────────────────── -->
<div id="vocab-sheet" role="dialog" aria-modal="true" aria-labelledby="vocab-sheet-word-display">
  <div class="vocab-sheet-backdrop" onclick="App.closeVocabSheet()"></div>
  <div class="vocab-sheet-panel">
    <div class="vocab-sheet-drag"></div>
    <div class="vocab-sheet-word" id="vocab-sheet-word-display"></div>
    <div class="vocab-sheet-hint">افزودن به لغت‌نامه</div>
    <input type="text" id="vocab-sheet-fa" class="vocab-sheet-input"
      placeholder="ترجمه فارسی…" />
    <div class="vocab-sheet-actions">
      <button class="btn btn-ghost btn-full btn-sm" onclick="App.closeVocabSheet()">انصراف</button>
      <button class="btn btn-primary btn-full btn-sm" id="vocab-sheet-save-btn" onclick="App.saveVocabFromSheet()">ذخیره ✓</button>
    </div>
  </div>
</div>

<!-- ── Exam Target Date Modal ───────────────────────────────────────────── -->
<div id="exam-date-modal" style="position:fixed; inset:0; z-index:350; display:none; flex-direction:column; justify-content:flex-end;">
  <div style="position:absolute; inset:0; background:rgba(0,0,0,0.65); backdrop-filter:blur(3px);" onclick="App.closeExamDateModal()"></div>
  <div style="position:relative; z-index:1; background:var(--surface); border-top:1px solid var(--border); border-radius:20px 20px 0 0; padding:20px 20px calc(24px + env(safe-area-inset-bottom, 0px));">
    <div style="width:36px; height:4px; background:var(--border); border-radius:2px; margin:0 auto 16px;"></div>
    <h3 style="margin:0 0 8px; font-size:1.1rem; color:var(--ink);">📅 تعیین تاریخ آزمون تئوری</h3>
    <p style="margin:0 0 16px; font-size:0.8rem; color:var(--ink-muted);">تاریخ آزمون تئوری خود را انتخاب کنید تا روزهای باقی‌مانده در داشبورد محاسبه شوند:</p>
    <input type="date" id="exam-date-input" style="width:100%; padding:12px; background:var(--surface-2); border:1px solid var(--border); border-radius:12px; color:var(--ink); font-family:sans-serif; font-size:1rem; margin-bottom:16px;" />
    <div style="display:flex; gap:10px;">
      <button class="btn btn-primary" style="flex:1;" onclick="App.saveExamTargetDate()">ذخیره تاریخ 💾</button>
      <button class="btn btn-ghost" onclick="App.closeExamDateModal()">انصراف</button>
    </div>
  </div>
</div>

<!-- ══ GUIDE / ONBOARDING MODAL ══ -->
<div id="modal-guide" style="position:fixed; inset:0; z-index:9999; display:none; align-items:center; justify-content:center; padding:16px; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px);" onclick="if(event.target===this) App.closeGuideModal()">
  <div class="card" style="max-width:460px; width:100%; max-height:88vh; overflow-y:auto; background:linear-gradient(135deg, #161820, #202330); border:1px solid rgba(232,163,61,0.35); border-radius:24px; padding:24px; box-shadow:0 24px 60px rgba(0,0,0,0.8); color:var(--ink);">
    
    <!-- Modal Header -->
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:14px;">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="width:44px; height:44px; border-radius:14px; background:linear-gradient(135deg, rgba(232,163,61,0.2), rgba(37,99,235,0.2)); border:1px solid rgba(232,163,61,0.4); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
          💎
        </div>
        <div>
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--amber); margin:0;">راهنما و راز قبولی تضمینی</h3>
          <span style="font-size:0.75rem; color:var(--ink-muted);">نقشه راه آمادگی کامل در آزمون تئوری Patente B</span>
        </div>
      </div>
      <button type="button" onclick="App.closeGuideModal()" style="background:none; border:none; color:var(--ink-muted); font-size:1.4rem; cursor:pointer; padding:4px;">✕</button>
    </div>

    <!-- Content Body -->
    <div style="font-size:0.88rem; line-height:1.75; color:#d1d5db;">
      
      <!-- Value Proposition Commercial Banner -->
      <div style="background:linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18)); border:1px solid rgba(59,130,246,0.4); border-radius:16px; padding:16px; margin-bottom:18px;">
        <div style="font-size:0.95rem; font-weight:700; color:#60a5fa; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
          <span>🎯</span> <b>چرا هزینه اضافه بپردازید؟</b>
        </div>
        <div style="font-size:0.83rem; color:#e2e8f0; line-height:1.65;">
          با توجه به صعود قیمت یورو و هزینه‌های سنگین <b>۱۵۰ تا ۱۶۰ یورویی</b> پکیج‌های موجود در بازار، سامانه <b>PatenteFa</b> به گونه‌ای هوشمند طراحی شده است که شما را ظرف مدت <b>۳ تا ۴ ماه</b>، با بالاترین کیفیت و تنها با <b>یک‌سوم هزینه پکیج‌های بازار</b>، آماده قبولی قطعی در آزمون اصلی تئوری کند.
        </div>
      </div>

      <!-- Translation feature -->
        <div style="background:rgba(37,99,235,0.12); border:1px solid rgba(59,130,246,0.3); border-radius:14px; padding:12px 14px;">
          <div style="font-size:0.78rem; color:#cbd5e1; line-height:1.55;">
            با فعال‌سازی گزینه <b>Traduci (ترجمه)</b> در هر سوال، ترجمه روان فارسی + دلیل درست یا نادرست بودن جواب را می‌بینید. سوالاتی که تابلو دارند، تصویر تابلو هم برای مترجم ارسال می‌شود.
          </div>
        </div>
      </div>

      <!-- Additional Value Badge -->
      <div style="background:rgba(232,163,61,0.1); border:1px solid rgba(232,163,61,0.3); border-radius:14px; padding:12px 14px; margin-bottom:20px; font-size:0.8rem; color:#fde68a; line-height:1.6;">
        ⚡ <b>بانک جامع ۷,۱۳۹ سوال رسمی</b> + ۲۵ فصل آموزشی استاندارد + مرور هوشمند فلش‌کارت‌ها و تابلوها برای قبولی قطعی شما در اولین تلاش!
      </div>

    </div>

    <!-- Action Button -->
    <button class="btn btn-primary btn-full" onclick="App.closeGuideModal()" style="border-radius:14px; padding:13px; font-size:0.95rem; font-weight:700; background:linear-gradient(135deg, #16a34a, #15803d); border:none; box-shadow:0 6px 20px rgba(22,163,74,0.35);">
      شروع تمرین و آمادگی 🚀
    </button>
  </div>
</div>

<!-- Error handler (separate tag so it survives parse errors in main script) -->
<script>
window.onerror = function(msg, url, line, col, err) {
  var el = document.getElementById('loading');
  if (el) {
    el.style.display = 'flex';
    el.innerHTML = '<div style="padding:20px;color:#C1272D;font-size:0.8rem;word-break:break-all;text-align:left;direction:ltr;">' +
      '<b>JS Error:</b><br>' + msg + '<br>Line: ' + line + '</div>';
  }
};
</script>

<!-- ── CLIENT JAVASCRIPT ────────────────────────────────────────────────────── -->
<script>
window.App = window.App || {};
App.escapeHtml = function(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

(function() {
  'use strict';


  // ── Telegram WebApp init ────────────────────────────────────────────────────
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    if (typeof tg.requestFullscreen === 'function') {
      try {
        tg.requestFullscreen();
      } catch (e) {}
    }
    if (typeof tg.disableVerticalSwipes === 'function') {
      try {
        tg.disableVerticalSwipes();
      } catch (e) {}
    }
    tg.setHeaderColor('#14151A');
    tg.setBackgroundColor('#14151A');
  }
  const initData = tg?.initData || '';

  // ── API helpers ─────────────────────────────────────────────────────────────
  async function api(method, path, body) {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Telegram-InitData': initData },
    };
    if (body !== undefined) opts.body = JSON.stringify(body);
    const res = await fetch('/api' + path, opts);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'خطای شبکه' }));
      if (res.status === 403 && err.isApproved === false) {
        App.showPendingScreen(err.error);
        throw new Error(err.error || 'در انتظار تایید مدیریت');
      }
      throw new Error(err.error || 'درخواست ناموفق بود');
    }
    return res.json();
  }

  // ── State ───────────────────────────────────────────────────────────────────
  const state = {
    currentScreen: 'home',
    prevScreen: null,
    // Exam
    sessionId: null,
    questions: [],
    currentIndex: 0,
    answers: {},
    flags: new Set(),
    startedAt: null,
    timerInterval: null,
    secondsLeft: 1200,
    translateOpen: false,
    translationCache: {},
    theoryCache: {},    // §15.3: per-question theory explanations (lazy)
    grammarCache: {},   // §15.3: per-question grammar+vocab (lazy)
    // Vocab
    vocabItems: [],
    dueVocab: [],
    dueVocabIndex: 0,
    vocabFlipped: false,
    // Signs (SRS stored in localStorage)
    signsQueue: [],
    signsIndex: 0,
    signsFlipped: false,
    allSignQuestions: [],
    signsTranslationCache: {}, // §12.1: lazy Farsi translations for sign cards
    // Long-press vocab (§12.2)
    longPressTimer: null,
    longPressWord: null,
    vocabSheetQuestionId: null,
    // Patente Reels (Vertical Feed)
    reelsFeed: [],
    reelsLoading: false,
    reelsAnswered: {},
    reelsLiked: new Set(),
  };

  // ── Screen routing (with slide transition) ───────────────────────────────────
  window.App = window.App || {};


  App.showScreen = function(name, direction) {
    // direction: 'forward' (default) | 'back'
    const dir = direction || 'forward';
    const current = document.querySelector('.screen.active');
    const next = document.getElementById('screen-' + name);
    if (!next) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (current && current !== next && !prefersReduced) {
      const outClass = dir === 'back' ? 'slide-out-right' : 'slide-out-left';
      const inClass  = dir === 'back' ? 'slide-in-left'  : 'slide-in-right';

      current.classList.add(outClass);
      next.style.display = 'flex';
      next.classList.add(inClass);

      current.addEventListener('animationend', function handler() {
        current.classList.remove('active', outClass);
        current.style.display = '';
        current.removeEventListener('animationend', handler);
      });
      next.addEventListener('animationend', function handler() {
        next.classList.remove(inClass);
        next.removeEventListener('animationend', handler);
      });
      next.classList.add('active');
    } else {
      document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = '';
      });
      next.classList.add('active');
    }

    // Nav highlight
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const nav = document.getElementById('nav-' + name);
    if (nav) nav.classList.add('active');

    state.prevScreen = state.currentScreen;
    state.currentScreen = name;

    if (name === 'home')    App.loadHome();
    if (name === 'topics')  App.loadTopics();
    if (name === 'vocab')   App.loadVocab();
    if (name === 'stats')   App.loadStats();
    if (name === 'signs')   App.loadSigns();
    if (name === 'reels')   App.loadReels();
    if (name === 'admin')   App.loadAdminData();
    if (name === 'profile') App.loadProfile();

    App.trackEvent('screen_view', { screen: name });
  };

  // ── Client Telemetry & Admin Management ────────────────────────────────────
  App.trackEvent = function(eventType, eventData, durationSeconds) {
    try {
      api('POST', '/telemetry/event', {
        eventType: eventType,
        eventData: eventData,
        durationSeconds: durationSeconds || 0
      }).catch(function() {});
    } catch (e) {}
  };

  // Heartbeat active duration tracking every 60 seconds
  setInterval(function() {
    if (document.visibilityState === 'visible') {
      App.trackEvent('heartbeat', { screen: state.currentScreen || 'home' }, 60);
    }
  }, 60000);

  state.adminUsers = [];
  state.costBreakdown = [];
  state.costTab = 'today';
  state.adminSearchTimer = null;

  // ── §18.3: relative time formatter ──────────────────────────────────────────
  App.relativeTime = function(isoStr) {
    if (!isoStr) return null;
    // Avoid lookbehind regex — unsupported in iOS WebView / older JavaScriptCore.
    var s = (isoStr + '').replace(' ', 'T');
    if (!/Z$|[+-]\d{2}:\d{2}$/.test(s)) s += 'Z';
    var d = new Date(s);
    var diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 0)     diff = 0;
    if (diff < 60)    return 'همین الان';
    if (diff < 3600)  return Math.floor(diff / 60) + ' دقیقه پیش';
    if (diff < 86400) return Math.floor(diff / 3600) + ' ساعت پیش';
    if (diff < 172800) return 'دیروز';
    return Math.floor(diff / 86400) + ' روز پیش';
  };

  // ── §18.4: cost-by-action tab switcher + renderer ────────────────────────────
  App.switchCostTab = function(tab) {
    state.costTab = tab;
    ['today','week','total'].forEach(function(t) {
      var btn = document.getElementById('cost-tab-' + t);
      if (!btn) return;
      btn.style.background = t === tab ? 'var(--go)' : 'var(--surface-2)';
      btn.style.color = t === tab ? '#fff' : 'var(--ink-muted)';
    });
    App.renderCostBreakdown(state.costBreakdown);
  };

  App.renderCostBreakdown = function(breakdown) {
    var el = document.getElementById('admin-cost-breakdown');
    if (!el) return;
    if (!breakdown || breakdown.length === 0) {
      el.innerHTML = '<div style="color:var(--ink-muted); font-size:0.8rem; text-align:center; padding:10px;">هنوز هیچ فراخوانی API ثبت نشده است.</div>';
      return;
    }
    var tab = state.costTab || 'today';
    var costKey = 'cost_' + tab;
    var callsKey = 'calls_' + tab;
    var maxCost = 0;
    var totalCost = 0;
    breakdown.forEach(function(r) {
      if ((r[costKey] || 0) > maxCost) maxCost = r[costKey];
      totalCost += (r[costKey] || 0);
    });
    var actionLabels = {
      'translate_question': '🌐 ترجمه سوال',
      'theory_explain':     '🎓 توضیح تئوری',
      'grammar_analyze':    '📚 آنالیز گرامر',
      'tutor_chat':         '💬 مکالمه مربی',
      'suggest_vocab':      '📖 پیشنهاد لغت'
    };
    var html = '';
    breakdown.forEach(function(r) {
      var cost   = r[costKey]  || 0;
      var calls  = r[callsKey] || 0;
      var pct    = maxCost  > 0 ? Math.round((cost / maxCost)  * 100) : 0;
      var tPct   = totalCost > 0 ? Math.round((cost / totalCost) * 100) : 0;
      var label  = actionLabels[r.action] || r.action;
      html += '<div style="display:flex; flex-direction:column; gap:3px;">' +
        '<div style="display:flex; justify-content:space-between; font-size:0.78rem;">' +
          '<span style="color:var(--ink);">' + label + '</span>' +
          '<span style="color:var(--ink-muted); font-family:monospace;">' + calls + ' calls | <b style="color:#f43f5e;">$' + cost.toFixed(5) + '</b> (' + tPct + '%)</span>' +
        '</div>' +
        '<div style="background:var(--surface-2); border-radius:4px; height:5px; overflow:hidden;">' +
          '<div style="background:linear-gradient(90deg,#f43f5e,#f97316); height:100%; width:' + pct + '%; border-radius:4px; transition:width 0.35s ease;"></div>' +
        '</div>' +
      '</div>';
    });
    el.innerHTML = html;
  };

  // ── §18.6: debounced server-side search ──────────────────────────────────────
  App.debouncedAdminSearch = function() {
    clearTimeout(state.adminSearchTimer);
    state.adminSearchTimer = setTimeout(function() { App.loadAdminUsers(); }, 350);
  };

  App.loadAdminUsers = async function() {
    var search = ((document.getElementById('admin-search-input') || {}).value || '').trim();
    var status = ((document.getElementById('admin-status-filter') || {}).value || 'all');
    try {
      var qs = [];
      if (search) qs.push('search=' + encodeURIComponent(search));
      if (status !== 'all') qs.push('status=' + encodeURIComponent(status));
      var res = await api('GET', '/admin/users' + (qs.length ? '?' + qs.join('&') : ''));
      state.adminUsers = res.users || [];
      App.renderAdminUsers(state.adminUsers);
    } catch (err) {
      App.toast('خطا در جستجوی کاربران');
    }
  };

  // kept for backward compat (status-filter onchange was calling filterAdminUsers)
  App.filterAdminUsers = function() { App.loadAdminUsers(); };

  App.loadAdminData = async function() {
    try {
      const [overview, usersRes, eventsRes, costRes] = await Promise.all([
        api('GET', '/admin/overview'),
        api('GET', '/admin/users'),
        api('GET', '/admin/events'),
        api('GET', '/admin/cost'),
      ]);

      state.adminUsers = usersRes.users || [];

      // KPI chips
      var el = function(id) { return document.getElementById(id); };
      if (el('admin-total-users'))    el('admin-total-users').textContent    = String(overview.totalUsers || 0);
      if (el('admin-active-today'))   el('admin-active-today').textContent   = String(overview.activeTodayUsers || 0);
      if (el('admin-events-logged'))  el('admin-events-logged').textContent  = (overview.totalEventsLogged || 0) + ' رویداد کل';  // §18.3
      if (el('admin-total-exams'))    el('admin-total-exams').textContent    = String(overview.totalExams || 0);
      if (el('admin-pass-rate'))      el('admin-pass-rate').textContent      = 'قبولی: ' + (overview.overallPassRate !== null ? overview.overallPassRate + '%' : '—');
      if (el('admin-total-mins'))     el('admin-total-mins').textContent     = String(overview.totalActiveMinutes || 0);
      if (el('admin-total-cost'))     el('admin-total-cost').textContent     = '$' + (overview.totalApiCostUsd || 0).toFixed(4);
      if (el('admin-total-api-calls')) el('admin-total-api-calls').textContent = (overview.totalApiCalls || 0) + ' فراخوانی';
      if (el('admin-kpi-sub'))        el('admin-kpi-sub').textContent        = 'مدیریت کاربران، لاگ‌ها، زمان حضور و هزینه‌های API';

      // §18.3: pending-users alert chip
      var pending = overview.pendingUsers || 0;
      if (el('admin-pending-users')) el('admin-pending-users').textContent = pending > 0 ? pending + ' در انتظار تایید' : '';
      if (el('admin-pending-alert')) el('admin-pending-alert').style.display = pending > 0 ? 'block' : 'none';
      if (el('admin-pending-count')) el('admin-pending-count').textContent = String(pending);

      // §18.4: cost breakdown
      state.costBreakdown = costRes.breakdown || [];
      App.renderCostBreakdown(state.costBreakdown);

      App.renderAdminUsers(state.adminUsers);
      App.renderAdminEvents(eventsRes.events || []);
    } catch (err) {
      App.toast('خطا در دریافت اطلاعات مدیریت (فقط ادمین دسترسی دارد)');
    }
  };

  // ── §18.7: per-user card renderer ────────────────────────────────────────────
  App.renderAdminUsers = function(users) {
    var container = document.getElementById('admin-users-table');
    var countEl   = document.getElementById('admin-user-count');
    if (!container) return;
    if (countEl) countEl.textContent = (users.length) + ' کاربر';

    if (!users || users.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:30px; color:var(--ink-muted);">هیچ کاربری یافت نشد</div>';
      return;
    }

    var html = '';
    users.forEach(function(u) {
      var statusBadge = u.is_approved === 1
        ? '<span style="background:var(--go-dim); color:var(--go); padding:2px 8px; border-radius:6px; font-size:0.72rem;">✅ تایید</span>'
        : u.is_approved === -1
        ? '<span style="background:var(--stop-dim); color:var(--stop); padding:2px 8px; border-radius:6px; font-size:0.72rem;">🔴 مسدود</span>'
        : '<span style="background:rgba(245,158,11,0.15); color:#f59e0b; padding:2px 8px; border-radius:6px; font-size:0.72rem;">⏳ انتظار</span>';

      // §18.3: last_active_at relative time
      var relTime = u.last_active_at ? App.relativeTime(u.last_active_at) : null;
      var lastSeenHtml = relTime
        ? ' <span style="font-size:0.68rem; color:var(--ink-muted);">🕐 ' + relTime + '</span>'
        : '';

      // §18.4: api-per-exam waste signal
      var wasteHtml = '';
      if (u.total_exams > 0) {
        var ratio = u.api_per_exam;
        var wasteColor = ratio > 5 ? '#f43f5e' : ratio > 2 ? '#f59e0b' : '#10b981';
        wasteHtml = '<span style="font-size:0.68rem; background:rgba(244,63,94,0.1); color:' + wasteColor + '; padding:1px 7px; border-radius:5px; margin-right:4px;">⚡ ' + ratio + ' API/آزمون</span>';
      }

      html += '<div style="background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:12px; display:flex; flex-direction:column; gap:8px;">' +
        // Header
        '<div style="display:flex; align-items:flex-start; justify-content:space-between; gap:6px;">' +
          '<div>' +
            '<div style="font-weight:700; color:var(--ink); font-size:0.88rem;">' +
              App.escapeHtml(u.first_name || 'کاربر') +
              (u.username ? ' <span style="font-size:0.75rem; color:var(--ink-muted); font-weight:400;">@' + App.escapeHtml(u.username) + '</span>' : '') +
            '</div>' +
            '<div style="font-size:0.68rem; color:var(--ink-muted); font-family:monospace; margin-top:2px;">🆔 ' + u.telegram_user_id + lastSeenHtml + '</div>' +
          '</div>' +
          '<div style="display:flex; gap:4px; flex-wrap:wrap; justify-content:flex-end; align-items:center;">' + wasteHtml + statusBadge + '</div>' +
        '</div>' +
        // Stats grid — §18.5: vocab_count / vocab_due; §18.4: api_per_exam via wasteHtml
        '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:5px; background:var(--surface-2); padding:8px; border-radius:10px; font-size:0.72rem;">' +
          '<div><div style="color:var(--ink-muted); margin-bottom:1px;">آزمون</div><b>' + u.total_exams + '</b> <span style="color:#10b981;">(' + u.passed_exams + '✓)</span></div>' +
          '<div><div style="color:var(--ink-muted); margin-bottom:1px;">حضور</div><b>' + u.total_active_minutes + '</b> د</div>' +
          '<div><div style="color:var(--ink-muted); margin-bottom:1px;">هزینه</div><b style="color:#f43f5e;">$' + (u.total_api_cost_usd || 0).toFixed(4) + '</b></div>' +
          '<div><div style="color:var(--ink-muted); margin-bottom:1px;">لغات</div><b>' + (u.vocab_count || 0) + '</b></div>' +
          '<div><div style="color:var(--ink-muted); margin-bottom:1px;">مرور امروز</div><b>' + (u.vocab_due || 0) + '</b></div>' +
          '<div><div style="color:var(--ink-muted); margin-bottom:1px;">API calls</div><b>' + u.total_api_calls + '</b></div>' +
        '</div>' +
        // Actions
        '<div style="display:flex; gap:6px; justify-content:flex-end;">' +
          '<button type="button" class="btn btn-ghost btn-sm" onclick="App.viewAdminUserTimeline(' + u.id + ')" style="font-size:0.75rem; padding:5px 10px;">📊 لاگ</button>' +
          (u.is_approved === 1
            ? '<button type="button" class="btn btn-falso btn-sm" onclick="App.setAdminUserStatus(' + u.id + ', -1)" style="font-size:0.75rem; padding:5px 10px;">🚫 لغو</button>'
            : '<button type="button" class="btn btn-vero btn-sm" onclick="App.setAdminUserStatus(' + u.id + ', 1)" style="font-size:0.75rem; padding:5px 10px;">✅ تایید</button>'
          ) +
        '</div>' +
      '</div>';
    });

    container.innerHTML = html;
  };


  App.renderAdminEvents = function(events) {
    var streamEl = document.getElementById('admin-events-stream');
    if (!streamEl) return;
    if (!events || events.length === 0) {
      streamEl.innerHTML = '<div style="color:var(--ink-muted); text-align:center; padding:10px;">هیچ رویدادی ثبت نشده.</div>';
      return;
    }
    var html = '<div style="display:flex; flex-direction:column; gap:5px;">';
    events.forEach(function(ev) {
      var name    = ev.first_name ? App.escapeHtml(ev.first_name) : 'کاربر';
      var details = ev.event_data ? ' <span style="color:var(--ink-muted); font-size:0.7rem;">('+App.escapeHtml(String(ev.event_data).slice(0,60))+')</span>' : '';
      var dur     = (ev.duration_seconds > 0) ? ' <span style="color:#38bdf8;">+' + ev.duration_seconds + 's</span>' : ''; // §18.3
      html += '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.04); padding-bottom:4px;">' +
        '<div><b>' + name + '</b>: <span style="color:var(--amber);">' + ev.event_type + '</span>' + details + dur + '</div>' +
        '<div style="color:var(--ink-muted); font-size:0.7rem; white-space:nowrap;">' + String(ev.created_at).slice(11,16) + '</div>' +
      '</div>';
    });
    html += '</div>';
    streamEl.innerHTML = html;
  };


  App.setAdminUserStatus = async function(userId, status) {
    try {
      await api('POST', '/admin/users/' + userId + '/status', { isApproved: status });
      App.toast(status === 1 ? 'کاربر تایید شد ✅' : 'دسترسی کاربر لغو شد 🚫');
      App.loadAdminData();
    } catch (err) {
      App.toast('خطا در تغییر وضعیت کاربر');
    }
  };

  App.viewAdminUserTimeline = async function(userId) {
    const modal = document.getElementById('admin-user-modal');
    const content = document.getElementById('admin-user-modal-content');
    const title = document.getElementById('admin-user-modal-title');
    if (!modal || !content) return;

    modal.style.display = 'flex';
    content.innerHTML = '<div style="text-align:center; padding:30px;"><div class="spinner" style="margin:0 auto;"></div><div style="margin-top:10px; font-size:0.85rem; color:var(--ink-muted);">در حال دریافت لاگ کامل کاربر…</div></div>';

    try {
      const data = await api('GET', '/admin/users/' + userId + '/activity');
      if (title && data.user) {
        title.textContent = '📊 لاگ فعالیت: ' + App.escapeHtml(data.user.first_name || 'کاربر') + ' (' + data.user.telegram_user_id + ')';
      }

      let html = '<div style="display:flex; flex-direction:column; gap:16px;">';

      // User summary info
      html += '<div style="background:var(--surface-2); padding:12px; border-radius:12px; font-size:0.82rem;">' +
        '<div>📅 عضویت: ' + (data.user ? data.user.created_at : '—') + '</div>' +
        '<div>🎯 تاریخ هدف آزمون: ' + (data.user && data.user.target_exam_date ? data.user.target_exam_date : 'تعیین نشده') + '</div>' +
      '</div>';

      // Events timeline
      html += '<div><h4 style="margin:0 0 8px; color:var(--amber); font-size:0.9rem;">📜 کلیک‌ها و فعالیت‌های اخیر</h4>';
      if (data.events && data.events.length > 0) {
        html += '<div style="display:flex; flex-direction:column; gap:6px;">';
        data.events.forEach(function(ev) {
          const details = ev.event_data ? ' <span style="color:var(--ink-muted); font-size:0.75rem;">(' + App.escapeHtml(ev.event_data) + ')</span>' : '';
          html += '<div style="background:var(--bg); border:1px solid var(--border); padding:8px 10px; border-radius:8px; font-size:0.78rem; display:flex; justify-content:space-between; align-items:center;">' +
            '<div><b style="color:var(--amber);">' + ev.event_type + '</b>' + details + '</div>' +
            '<div style="font-size:0.7rem; color:var(--ink-muted);">' + ev.created_at + '</div>' +
          '</div>';
        });
        html += '</div>';
      } else {
        html += '<div style="font-size:0.8rem; color:var(--ink-muted);">هنوز هیچ کلیکی ثبت نشده است.</div>';
      }
      html += '</div>';

      // Exam sessions history
      html += '<div><h4 style="margin:0 0 8px; color:#38bdf8; font-size:0.9rem;">📝 آزمون‌های برگزارشده</h4>';
      if (data.sessions && data.sessions.length > 0) {
        html += '<div style="display:flex; flex-direction:column; gap:6px;">';
        data.sessions.forEach(function(s) {
          const statusStr = s.passed === 1 ? '<span style="color:#10b981;">✅ قبول</span>' : '<span style="color:#ef4444;">❌ مردود</span>';
          html += '<div style="background:var(--bg); border:1px solid var(--border); padding:8px 10px; border-radius:8px; font-size:0.78rem; display:flex; justify-content:space-between; align-items:center;">' +
            '<div> حالت <b>' + s.mode + '</b> | نمره: <b>' + (s.score || 0) + '</b> | ' + statusStr + '</div>' +
            '<div style="font-size:0.7rem; color:var(--ink-muted);">' + s.started_at + '</div>' +
          '</div>';
        });
        html += '</div>';
      } else {
        html += '<div style="font-size:0.8rem; color:var(--ink-muted);">هنوز آزمونی برگزار نشده است.</div>';
      }
      html += '</div>';

      // OpenAI API logs
      html += '<div><h4 style="margin:0 0 8px; color:#f43f5e; font-size:0.9rem;">💰 فراخوانی‌های API هوش مصنوعی</h4>';
      if (data.apiLogs && data.apiLogs.length > 0) {
        html += '<div style="display:flex; flex-direction:column; gap:6px;">';
        data.apiLogs.forEach(function(apiLog) {
          html += '<div style="background:var(--bg); border:1px solid var(--border); padding:8px 10px; border-radius:8px; font-size:0.78rem; display:flex; justify-content:space-between; align-items:center;">' +
            '<div><b>' + apiLog.action + '</b> <span style="font-size:0.72rem; color:var(--ink-muted);">(' + apiLog.prompt_tokens + ' p / ' + apiLog.completion_tokens + ' c)</span></div>' +
            '<div style="color:#f43f5e; font-weight:700;">$' + apiLog.estimated_cost_usd.toFixed(4) + '</div>' +
          '</div>';
        });
        html += '</div>';
      } else {
        html += '<div style="font-size:0.8rem; color:var(--ink-muted);">فراخوانی API هوش مصنوعی برای این کاربر ثبت نشده است.</div>';
      }
      html += '</div>';

      html += '</div>';
      content.innerHTML = html;
    } catch (err) {
      content.innerHTML = '<div style="color:var(--stop); padding:20px; text-align:center;">خطا در دریافت اطلاعات کاربر</div>';
    }
  };

  App.closeAdminUserModal = function() {
    const modal = document.getElementById('admin-user-modal');
    if (modal) modal.style.display = 'none';
  };

  App.showPendingScreen = function(msg) {
    document.querySelectorAll('.screen').forEach(function(s) {
      s.classList.remove('active');
      s.style.display = 'none';
    });
    const pendingScreen = document.getElementById('screen-pending');
    if (pendingScreen) {
      pendingScreen.style.display = 'flex';
      pendingScreen.classList.add('active');
    }
    const msgEl = document.getElementById('pending-msg');
    if (msgEl && msg) msgEl.textContent = msg;
    const nav = document.getElementById('bottom-nav');
    if (nav) nav.style.display = 'none';
  };

  App.checkApprovalStatus = async function() {
    try {
      await App.loadHome();
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = 'flex';
      App.showScreen('home');
      App.toast('دسترسی شما با موفقیت تایید شد! 🎉');
    } catch(e) {
      App.toast('هنوز در انتظار تایید مدیریت است ⏳');
    }
  };

  App.submitFunAnswer = async function() {
    const inputEl = document.getElementById('fun-custom-answer-input');
    const val = inputEl ? inputEl.value.trim() : '';
    const btn = document.getElementById('btn-submit-fun');

    if (btn) {
      btn.disabled = true;
      btn.textContent = '⏳ در حال ارسال…';
    }

    try {
      await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Telegram-InitData': window.Telegram?.WebApp?.initData || '' },
        body: JSON.stringify({ funAnswer: val || 'آره خیلی زیاد!' }),
      });
      const rewardBox = document.getElementById('fun-reward-box');
      if (rewardBox) rewardBox.style.display = 'block';
      if (btn) btn.textContent = 'پاسخ ارسال شد ✓';
      App.toast('پاسخ شما برای سینا ارسال شد! 💌');
    } catch (e) {
      App.toast('پاسخ شما ثبت گردید ✓');
    }
  };

  App.navigateBack = function() {
    const dest = state.prevScreen || 'home';
    App.showScreen(dest, 'back');
  };

  // ── Toast ───────────────────────────────────────────────────────────────────
  App.toast = function(msg, duration) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), duration || 2500);
  };

  App.showGuideModal = function() {
    const modal = document.getElementById('modal-guide');
    if (modal) modal.style.display = 'flex';
  };

  App.closeGuideModal = function() {
    const modal = document.getElementById('modal-guide');
    if (modal) modal.style.display = 'none';
    try {
      localStorage.setItem('patente_guide_seen', 'true');
    } catch(e) {}
  };

  // ── 25 Chapters (Capitoli 1–25) ──────────────────────────────────────────────
  state.allTopics = [];

  App.loadTopics = async function() {
    try {
      const data = await api('GET', '/topics');
      state.allTopics = data.topics || [];
      App.renderTopics(state.allTopics);
    } catch(e) {
      App.toast('خطا در دریافت لیست فصل‌های آموزشی');
    }
  };

  App.renderTopics = function(list) {
    const container = document.getElementById('topics-list-container');
    if (!container) return;

    if (!list || list.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:30px; color:var(--ink-muted);">فصلی یافت نشد.</div>';
      return;
    }

    let html = '';
    // Hide topics that have no questions (safety-net placeholders like topic 25/13)
    const visible = list.filter(function(t) { return (t.question_count || 0) > 0; });
    if (visible.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:30px; color:var(--ink-muted);">فصلی یافت نشد.</div>';
      return;
    }
    visible.forEach(function(t) {
      const accStr = t.accuracy !== null ? (t.accuracy + '% دقت') : 'شروع‌نشده';
      const accColor = t.accuracy === null ? 'var(--ink-muted)' : (t.accuracy >= 70 ? '#10b981' : '#ef4444');
      const qCount = t.question_count || 0;

      html += '<div class="card" style="background:var(--surface-2); border:1px solid var(--border); border-radius:14px; padding:14px; display:flex; flex-direction:column; gap:10px;">';
      html += '  <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px;">';
      html += '    <div>';
      html += '      <span style="font-size:0.72rem; background:rgba(232,163,61,0.18); color:var(--amber); border:1px solid rgba(232,163,61,0.35); padding:2px 8px; border-radius:8px; font-weight:700;">فصل ' + t.sort_order + '</span>';
      html += '      <div style="font-size:1rem; font-weight:700; color:var(--ink); margin-top:6px; direction:ltr; text-align:right;">' + App.escapeHtml(t.name_it) + '</div>';
      html += '      <div style="font-size:0.88rem; font-weight:600; color:#60a5fa; margin-top:3px;">' + App.escapeHtml(t.name_fa || '') + '</div>';
      html += '    </div>';
      html += '    <div style="text-align:left; flex-shrink:0;">';
      html += '      <div style="font-size:0.82rem; font-weight:700; color:' + accColor + ';">' + accStr + '</div>';
      html += '      <div style="font-size:0.7rem; color:var(--ink-muted); margin-top:3px;">🌐 ' + qCount + ' سوال</div>';
      html += '    </div>';
      html += '  </div>';

      html += '  <div style="display:flex; gap:8px; margin-top:4px;">';
      html += '    <button type="button" class="btn btn-primary btn-sm btn-full" onclick="App.startTopicExam(' + t.id + ')">✍️ شروع آزمون این فصل (۱۵ سوال)</button>';
      html += '  </div>';
      html += '</div>';
    });

    container.innerHTML = html;
  };

  App.filterTopics = function() {
    const input = document.getElementById('topics-search-input');
    const q = (input ? input.value : '').trim().toLowerCase();
    if (!q) {
      App.renderTopics(state.allTopics);
      return;
    }
    const filtered = state.allTopics.filter(function(t) {
      if ((t.question_count || 0) === 0) return false;
      return (t.name_it && t.name_it.toLowerCase().includes(q)) ||
             (t.name_fa && t.name_fa.toLowerCase().includes(q)) ||
             (String(t.sort_order) === q);
    });
    App.renderTopics(filtered);
  };

  App.startTopicExam = async function(topicId) {
    try {
      App.toast('در حال لود آزمون فصل… ⏳');
      const data = await api('POST', '/topics/' + topicId + '/exam');
      state.sessionId = data.sessionId;
      state.questions = data.questions || [];
      state.currentIndex = 0;
      state.answers = {};
      state.flags = new Set();
      state.startedAt = Date.now();
      state.secondsLeft = 600; // 10 minutes for 15 chapter questions

      App.showScreen('exam');
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = 'none';
      App.renderExamTabs();
      App.renderQuestion();
      App.startTimer();
    } catch(e) {
      App.toast(e.message || 'خطا در شروع آزمون فصل');
    }
  };

  // ── Home ────────────────────────────────────────────────────────────────────
  App.loadHome = async function() {
    // Show guide modal automatically on first visit
    try {
      if (!localStorage.getItem('patente_guide_seen')) {
        setTimeout(function() { App.showGuideModal(); }, 600);
      }
    } catch(e) {}

    // 1. Populate user info from Telegram WebApp
    let tgUser = null;
    try {
      tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    } catch(e) {}

    const firstName = tgUser?.first_name || 'کاربر پاتنته';
    const lastName = tgUser?.last_name || '';
    const fullName = (firstName + ' ' + lastName).trim();
    const username = tgUser?.username ? '@' + tgUser.username : (tgUser?.id ? '🆔 ' + tgUser.id : '');
    const photoUrl = tgUser?.photo_url || '';

    const nameEl = document.getElementById('user-full-name');
    if (nameEl) nameEl.textContent = fullName;

    const unameEl = document.getElementById('user-username');
    if (unameEl) unameEl.textContent = username;

    const photoEl = document.getElementById('user-photo');
    const initialsEl = document.getElementById('user-initials-avatar');
    if (photoUrl && photoEl) {
      photoEl.src = photoUrl;
      photoEl.style.display = 'block';
      if (initialsEl) initialsEl.style.display = 'none';
    } else if (initialsEl) {
      if (photoEl) photoEl.style.display = 'none';
      initialsEl.style.display = 'flex';
      const initials = (firstName.charAt(0) + (lastName ? lastName.charAt(0) : '')).toUpperCase() || '👤';
      initialsEl.textContent = initials;
    }

    // 2. Fetch stats & user profile from backend
    try {
      const data = await api('GET', '/stats');
      document.getElementById('streak-value').textContent = data.streak || 0;
      document.getElementById('home-days').textContent =
        data.daysToExam !== null ? data.daysToExam + ' روز' : 'تعیین نشده';
      document.getElementById('home-review').textContent = data.reviewCount || 0;

      const passRateEl = document.getElementById('home-pass-rate');
      if (passRateEl) passRateEl.textContent = data.passRate !== null ? data.passRate + '٪' : '—';

      const totalExamsEl = document.getElementById('home-total-exams');
      if (totalExamsEl) totalExamsEl.textContent = (data.totalSessions || 0) + ' آزمون';

      if (data.reviewCount > 0) {
        document.getElementById('btn-start-review').style.display = '';
      } else {
        document.getElementById('btn-start-review').style.display = 'none';
      }

      // Weak-topic focus card
      if (data.weakestTopic && data.totalSessions > 0) {
        const card = document.getElementById('home-focus-card');
        card.style.display = '';
        const pct = Math.round(data.weakestTopic.accuracy * 100);
        document.getElementById('home-weakest').textContent =
          data.weakestTopic.name_it + ' — ' + pct + '% درست';
      } else {
        const card = document.getElementById('home-focus-card');
        if (card) card.style.display = 'none';
      }

      // Recent sessions
      if (Array.isArray(data.recentSessions) && data.recentSessions.length > 0) {
        const sec = document.getElementById('home-recent-section');
        const list = document.getElementById('home-recent-list');
        if (sec && list) {
          sec.style.display = 'block';
          let html = '';
          data.recentSessions.slice(0, 3).forEach(function(s) {
            const isPass = s.passed;
            const badgeClass = isPass ? 'color:#10b981;background:rgba(16,185,129,0.15);' : 'color:#ef4444;background:rgba(239,68,68,0.15);';
            const badgeText = isPass ? 'قبول 🟢' : 'مردود 🔴';
            const modeText = s.mode === 'exam' ? '🚗 شبیه‌ساز ۳۰ سوالی' : '🎯 تمرین موضوعی';
            const scoreText = (s.score !== null ? s.score : (30 - (s.wrongCount || 0))) + ' / ۳۰';
            html += '<div style="background:var(--surface-2);border:1px solid var(--border);padding:10px 14px;border-radius:12px;display:flex;align-items:center;justify-content:space-between;">' +
              '<div><div style="font-weight:600;font-size:0.85rem;">' + modeText + '</div><div style="font-size:0.72rem;color:var(--ink-muted);">امتیاز: ' + scoreText + '</div></div>' +
              '<span style="font-weight:700;font-size:0.75rem;padding:3px 10px;border-radius:8px;' + badgeClass + '">' + badgeText + '</span>' +
              '</div>';
          });
          list.innerHTML = html;
        }
      } else {
        const sec = document.getElementById('home-recent-section');
        if (sec) sec.style.display = 'none';
      }

      // Admin check — enable admin features if user is admin
      api('GET', '/admin/overview').then(function() {
        const adminNav = document.getElementById('nav-admin');
        const adminBtn = document.getElementById('btn-admin-panel');
        if (adminNav) adminNav.style.display = 'flex';
        if (adminBtn) adminBtn.style.display = 'flex';
      }).catch(function() {});
    } catch (e) {
      // First run — no stats yet
    }
  };

  App.openExamDateModal = function() {
    const modal = document.getElementById('exam-date-modal');
    if (modal) modal.style.display = 'flex';
  };

  App.closeExamDateModal = function() {
    const modal = document.getElementById('exam-date-modal');
    if (modal) modal.style.display = 'none';
  };

  App.saveExamTargetDate = async function() {
    const dateInput = document.getElementById('exam-date-input');
    const val = dateInput ? dateInput.value : '';
    if (!val) {
      App.toast('لطفاً یک تاریخ معتبر انتخاب کنید.');
      return;
    }
    try {
      await api('POST', '/stats/target-date', { targetExamDate: val });
      App.toast('تاریخ آزمون ذخیره شد! 📅');
      App.closeExamDateModal();
      App.loadHome();
    } catch(e) {
      App.toast('خطا در ذخیره تاریخ: ' + e.message);
    }
  };


  // ── Start exam ──────────────────────────────────────────────────────────────
  App.startExam = async function(mode) {
    mode = mode || 'exam';
    try {
      const data = await api('POST', '/exam/start', { mode });
      state.sessionId = data.sessionId;
      state.questions = data.questions;
      state.currentIndex = 0;
      state.answers = {};
      state.flags = new Set();
      state.startedAt = Date.now();
      state.translateOpen = false;
      state.translationCache = {};
      state.secondsLeft = 1200;

      App.showScreen('exam');
      document.getElementById('bottom-nav').style.display = 'none';
      App.renderExamTabs();
      App.renderQuestion();
      App.startTimer();
    } catch (e) {
      App.toast('خطا: ' + e.message);
    }
  };

  App.startReview = function() {
    App.startExam('review');
  };

  App.startTopicPractice = function() {
    App.startExam('topic_practice');
  };

  // ── Timer ───────────────────────────────────────────────────────────────────
  App.startTimer = function() {
    clearInterval(state.timerInterval);
    App.updateTimerUI();
    state.timerInterval = setInterval(function() {
      state.secondsLeft--;
      App.updateTimerUI();
      if (state.secondsLeft <= 0) {
        clearInterval(state.timerInterval);
        App.finishExam();
      }
    }, 1000);
  };

  App.updateTimerUI = function() {
    const m = Math.floor(state.secondsLeft / 60);
    const s = state.secondsLeft % 60;
    const el = document.getElementById('exam-timer');
    el.textContent = m + ':' + String(s).padStart(2, '0');
    el.className = 'timer';
    if (state.secondsLeft <= 60) el.classList.add('danger');
    else if (state.secondsLeft <= 300) el.classList.add('warning');
  };

  // ── Exam tabs ───────────────────────────────────────────────────────────────
  App.renderExamTabs = function() {
    const container = document.getElementById('exam-tabs');
    container.innerHTML = '';
    const total = state.questions.length;
    const answered = Object.keys(state.answers).length;

    // Update the summary label
    const posEl = document.getElementById('exam-position');
    if (posEl) {
      posEl.textContent = 'Q ' + (state.currentIndex + 1) + ' / ' + total;
    }

    state.questions.forEach(function(q, i) {
      const tab = document.createElement('button');
      tab.className = 'q-tab' + (i === state.currentIndex ? ' active' : '');
      tab.textContent = i + 1;
      tab.onclick = function() {
        state.currentIndex = i;
        App.renderQuestion();
        App.renderExamTabs();
      };
      if (state.flags.has(q.questionId)) tab.classList.add('flagged');
      container.appendChild(tab);
    });

    // Update road marker position
    App.updateRoad(answered, total);
  };

  // ── Road progress ───────────────────────────────────────────────────────────
  App.updateRoad = function(answered, total) {
    const pct = total > 0 ? (answered / total) * 100 : 0;
    const markerPct = total > 0
      ? Math.max(2, Math.min(96, ((answered + 0.5) / total) * 96)) // clamp so marker stays on road
      : 2;

    const marker = document.getElementById('road-marker');
    const fill   = document.getElementById('road-answered');
    if (marker) marker.style.left = markerPct + '%';
    if (fill)   fill.style.width  = pct + '%';
  };

  // ── Render question ─────────────────────────────────────────────────────────
  App.renderQuestion = function() {
    const q = state.questions[state.currentIndex];
    if (!q) return;

    const textEl = document.getElementById('exam-question-text');
    textEl.textContent = q.textIt;
    // Wrap words for long-press-to-vocab (§12.2)
    App.wrapWordsForLongPress(textEl, q.questionId);

    const img = document.getElementById('exam-sign-img');
    if (q.imageUrl) {
      img.src = q.imageUrl;
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }

    document.getElementById('btn-flag').style.opacity =
      state.flags.has(q.questionId) ? '1' : '0.4';

    // §15.3: reset AI panel on question switch (uses centralized helper)
    App._resetAiPanel();
  };

  // ── Answer ──────────────────────────────────────────────────────────────────
  App.answer = async function(value) {
    const q = state.questions[state.currentIndex];
    if (!q) return;
    if (state.answers[q.questionId] !== undefined) return; // already answered

    state.answers[q.questionId] = value;

    document.getElementById('btn-vero').classList.add('btn-disabled');
    document.getElementById('btn-falso').classList.add('btn-disabled');

    // Update road immediately on answer
    App.renderExamTabs();

    try {
      await api('POST', '/exam/' + state.sessionId + '/answer', {
        questionId: q.questionId,
        answer: value,
      });
    } catch (e) {
      // Offline — continue locally
    }

    setTimeout(function() {
      document.getElementById('btn-vero').classList.remove('btn-disabled');
      document.getElementById('btn-falso').classList.remove('btn-disabled');

      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
        App.renderExamTabs();
        App.renderQuestion();
      } else {
        App.finishExam();
      }
    }, 320);
  };

  // ── Flag / bookmark ─────────────────────────────────────────────────────────
  App.toggleFlag = async function() {
    const q = state.questions[state.currentIndex];
    if (!q) return;
    const wasFlagged = state.flags.has(q.questionId);
    if (wasFlagged) state.flags.delete(q.questionId);
    else state.flags.add(q.questionId);
    document.getElementById('btn-flag').style.opacity =
      state.flags.has(q.questionId) ? '1' : '0.4';
    App.renderExamTabs();
    try {
      await api('POST', '/exam/' + state.sessionId + '/flag', {
        questionId: q.questionId, flagged: !wasFlagged,
      });
    } catch (e) {}
  };

  // ── TTS ─────────────────────────────────────────────────────────────────────
  App.speakQuestion = function() {
    const text = document.getElementById('exam-question-text').textContent;
    if (!text) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'it-IT'; utt.rate = 0.9;
      window.speechSynthesis.speak(utt);
    } else {
      App.toast('TTS در این مرورگر پشتیبانی نمی‌شود');
    }
  };

  // ── §15.3 AI Panel — three independent tabs ──────────────────────────────────
  // toggleTranslate: checkbox onchange — opens/closes the whole panel.
  // Opening always shows tab 0 (translation) and fires its request.
  // Tabs 1 and 2 only fire when the user explicitly taps them.
  App.toggleTranslate = async function() {
    state.translateOpen = !state.translateOpen;
    const panel = document.getElementById('translate-panel');
    if (!state.translateOpen) {
      panel.classList.remove('open');
      document.getElementById('exam-question-text').className = 'question-text';
      return;
    }
    panel.classList.add('open');
    // Always open to tab 0 on fresh open
    App.switchAiTab(0);
  };

  // switchAiTab: show the selected tab content; lazy-load if not yet fetched.
  App.switchAiTab = async function(tabIndex) {
    // Update tab button styles
    for (let i = 0; i <= 2; i++) {
      const btn = document.getElementById('ai-tab-btn-' + i);
      const content = document.getElementById('ai-tab-' + i);
      if (btn) {
        btn.style.borderBottom = i === tabIndex ? '2px solid var(--amber)' : '2px solid transparent';
        btn.style.color = i === tabIndex ? 'var(--ink)' : 'var(--ink-muted)';
        btn.style.fontWeight = i === tabIndex ? '600' : '500';
      }
      if (content) {
        content.style.display = i === tabIndex ? 'block' : 'none';
      }
    }

    const q = state.questions[state.currentIndex];
    if (!q) return;

    if (tabIndex === 0) {
      // Translation tab — load immediately (same as before)
      if (state.translationCache[q.questionId]) {
        App.showTranslation(state.translationCache[q.questionId]);
        return;
      }
      document.getElementById('translate-text').textContent = '⏳ در حال ترجمه…';
      document.getElementById('translate-explanation').textContent = '';
      try {
        const data = await api('POST', '/translate/' + q.questionId);
        state.translationCache[q.questionId] = data;
        App.showTranslation(data);
      } catch (e) {
        document.getElementById('translate-text').textContent = '⚠ خطا: ' + (e.message || 'ترجمه در دسترس نیست');
      }
    } else if (tabIndex === 1) {
      // Theory tab — lazy: only fires on first tap for this question
      await App.loadTheoryTab(q.questionId);
    } else if (tabIndex === 2) {
      // Grammar tab — lazy: only fires on first tap for this question
      await App.loadGrammarTab(q.questionId);
    }
  };

  App.showTranslation = function(data) {
    // §19.2: render verdict badge ABOVE translated text
    const verdictEl = document.getElementById('translate-verdict');
    if (verdictEl) {
      const isVero = data.verdictVero === true;
      const label = isVero ? 'VERO' : 'FALSO';
      const labelFa = 'پاسخ: ' + label;
      verdictEl.innerHTML =
        '<span class="fa-text" style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;font-size:0.82rem;font-weight:700;' +
        (isVero
          ? 'background:rgba(22,163,74,0.15);color:var(--go);border:1px solid rgba(22,163,74,0.35);'
          : 'background:rgba(220,38,38,0.12);color:var(--stop);border:1px solid rgba(220,38,38,0.3);') +
        '">' + (isVero ? '✅' : '❌') + ' ' + labelFa + '</span>';
      verdictEl.style.display = 'block';
    }
    document.getElementById('translate-text').textContent = data.translatedText || '';
    document.getElementById('translate-explanation').textContent = data.explanation || '';
    document.getElementById('exam-question-text').classList.add('translated');
  };

  // loadTheoryTab: fetches theory once per question, caches in state.theoryCache
  App.loadTheoryTab = async function(questionId) {
    if (state.theoryCache && state.theoryCache[questionId]) {
      document.getElementById('theory-text').textContent = state.theoryCache[questionId];
      return;
    }
    const loadingEl = document.getElementById('theory-loading');
    const textEl = document.getElementById('theory-text');
    const errorEl = document.getElementById('theory-error');
    loadingEl.style.display = 'block';
    textEl.textContent = '';
    errorEl.style.display = 'none';
    try {
      const data = await api('POST', '/translate/' + questionId + '/theory');
      if (!state.theoryCache) state.theoryCache = {};
      state.theoryCache[questionId] = data.theoryText || '';
      textEl.textContent = data.theoryText || '';
    } catch (e) {
      errorEl.textContent = 'مربی تئوری در دسترس نیست — دوباره تلاش کنید';
      errorEl.style.display = 'block';
    } finally {
      loadingEl.style.display = 'none';
    }
  };

  // loadGrammarTab: fetches grammar+vocab once per question, caches in state.grammarCache
  App.loadGrammarTab = async function(questionId) {
    if (state.grammarCache && state.grammarCache[questionId]) {
      const cached = state.grammarCache[questionId];
      document.getElementById('grammar-analysis').textContent = cached.grammarAnalysis || '';
      App.renderVocabSuggestions(cached.vocabSuggestions || [], questionId);
      return;
    }
    const loadingEl = document.getElementById('grammar-loading');
    const analysisEl = document.getElementById('grammar-analysis');
    const errorEl = document.getElementById('grammar-error');
    const listEl = document.getElementById('vocab-suggestions-list');
    loadingEl.style.display = 'block';
    analysisEl.textContent = '';
    listEl.innerHTML = '';
    errorEl.style.display = 'none';
    try {
      const data = await api('POST', '/translate/' + questionId + '/grammar');
      if (!state.grammarCache) state.grammarCache = {};
      state.grammarCache[questionId] = { grammarAnalysis: data.grammarAnalysis, vocabSuggestions: data.vocabSuggestions };
      analysisEl.textContent = data.grammarAnalysis || '';
      App.renderVocabSuggestions(data.vocabSuggestions || [], questionId);
    } catch (e) {
      errorEl.textContent = 'معلم گرامر در دسترس نیست — دوباره تلاش کنید';
      errorEl.style.display = 'block';
    } finally {
      loadingEl.style.display = 'none';
    }
  };

  // renderVocabSuggestions: renders each vocab word as a row with a + save button
  // Each + button calls addVocabFromAgent — same flow as long-press-to-vocab (§12.2)
  App.renderVocabSuggestions = function(vocabItems, questionId) {
    const listEl = document.getElementById('vocab-suggestions-list');
    listEl.innerHTML = '';
    if (!vocabItems || vocabItems.length === 0) return;
    vocabItems.forEach(function(item) {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:var(--surface-2);border-radius:8px;border:1px solid var(--border);gap:8px;';
      const wordPair = document.createElement('div');
      wordPair.style.cssText = 'display:flex;flex-direction:column;gap:2px;min-width:0;flex:1;';
      const itSpan = document.createElement('span');
      itSpan.style.cssText = 'font-family:"Public Sans",sans-serif;font-size:0.82rem;font-weight:600;color:var(--ink);';
      itSpan.textContent = item.term_it || '';
      const faSpan = document.createElement('span');
      faSpan.style.cssText = 'font-family:"Vazirmatn",sans-serif;font-size:0.75rem;color:var(--ink-muted);direction:rtl;';
      faSpan.textContent = item.term_fa || '';
      wordPair.appendChild(itSpan);
      wordPair.appendChild(faSpan);
      const addBtn = document.createElement('button');
      addBtn.style.cssText = 'flex-shrink:0;padding:5px 10px;background:none;border:1px solid var(--border);border-radius:6px;color:var(--ink-muted);font-size:0.72rem;cursor:pointer;font-family:"Vazirmatn",sans-serif;transition:all 150ms;white-space:nowrap;';
      addBtn.textContent = '+ واژه‌نامه';
      addBtn.onclick = function() {
        // Reuse existing addVocabFromAgent — identical to long-press flow (§12.2)
        App.addVocabFromAgent(item.term_it, item.term_fa, questionId, addBtn);
      };
      row.appendChild(wordPair);
      row.appendChild(addBtn);
      listEl.appendChild(row);
    });
  };

  // §15: clear AI tab caches when switching question so stale data never shows
  App._resetAiPanel = function() {
    state.translateOpen = false;
    const tog = document.getElementById('translate-toggle');
    if (tog) tog.checked = false;
    const panel = document.getElementById('translate-panel');
    if (panel) panel.classList.remove('open');
    document.getElementById('exam-question-text').className = 'question-text';
  };


  App.addVocabFromChip = async function(btn) {
    if (!btn) return;
    const termIt = btn.getAttribute('data-term-it') || '';
    const termFa = btn.getAttribute('data-term-fa') || '';
    const sourceQId = Number(btn.getAttribute('data-qid')) || null;
    await App.addVocabFromAgent(termIt, termFa, sourceQId, btn);
  };

  App.addVocabFromAgent = async function(termIt, termFa, sourceQuestionId, btn) {

    if (btn) {
      btn.disabled = true;
      btn.textContent = '⏳';
    }
    try {
      await api('POST', '/vocab', {
        termIt: termIt,
        termFa: termFa,
        sourceQuestionId: sourceQuestionId
      });
      App.toast('به واژه‌نامه اضافه شد! 📚');
      if (btn) {
        btn.textContent = '✓ اضافه شد';
        btn.style.color = '#10b981';
      }
    } catch (e) {
      App.toast('خطا در ثبت واژه');
      if (btn) {
        btn.disabled = false;
        btn.textContent = '➕ افزودن';
      }
    }
  };


  // ── Finish exam ─────────────────────────────────────────────────────────────
  App.finishExam = async function() {
    clearInterval(state.timerInterval);
    const durationSeconds = Math.round((Date.now() - state.startedAt) / 1000);
    let data;
    try {
      data = await api('POST', '/exam/' + state.sessionId + '/finish', { durationSeconds });
    } catch (e) {
      App.toast('خطا در ثبت نتایج: ' + e.message);
      return;
    }
    document.getElementById('bottom-nav').style.display = '';
    App.renderResults(data);
    App.showScreen('results');
  };

  // ── Results ─────────────────────────────────────────────────────────────────
  App.renderResults = function(data) {
    state.lastFinishedSessionId = data.sessionId;

    const tutorBanner = document.getElementById('results-tutor-banner');
    if (tutorBanner) {
      if (data.wrongCount > 0) {
        tutorBanner.style.display = 'block';
        const bannerText = document.getElementById('results-tutor-banner-text');
        if (bannerText) {
          bannerText.textContent = 'تحلیل و رفع اشکال ' + data.wrongCount + ' سوال غلط با استاد AI';
        }
      } else {
        tutorBanner.style.display = 'none';
      }
    }

    const badge = document.getElementById('results-badge');
    badge.className = 'result-badge ' + (data.passed ? 'pass' : 'fail');
    badge.textContent = data.passed ? 'قبول' : 'رد';

    // New copy voice from design.md
    document.getElementById('results-score').textContent =
      data.score + ' از ۳۰';
    document.getElementById('results-detail').textContent =
      data.passed
        ? data.wrongCount + ' اشتباه — قبول شدی! 🎉'
        : data.wrongCount + ' اشتباه — بیشتر از ۳ — دوباره تلاش کن';

    const min = Math.floor(data.durationSeconds / 60);
    const sec = String(data.durationSeconds % 60).padStart(2, '0');
    document.getElementById('results-time').textContent = '⏱ ' + min + ':' + sec;

    // Build result rows with sign-flip animation
    const list = document.getElementById('results-list');
    list.innerHTML = '';

    data.answers.forEach(function(a, idx) {
      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '6px';

      // Result row with icon
      const row = document.createElement('div');
      row.className = 'result-row';

      const icon = document.createElement('div');
      icon.className = 'result-icon ' + (a.isCorrect ? 'correct' : 'wrong');
      icon.textContent = a.isCorrect ? '✓' : '✗';

      // Sign-flip card
      const signCard = document.createElement('div');
      signCard.className = 'sign-card';
      signCard.style.flex = '1';

      const inner = document.createElement('div');
      inner.className = 'sign-card-inner';

      // We don't need two faces visible — just animate the single back face in
      const back = document.createElement('div');
      back.className = 'sign-card-back';

      const questionLine = document.createElement('div');
      questionLine.dir = 'ltr';
      questionLine.style.cssText = 'font-size:0.83rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink);';
      questionLine.style.fontFamily = 'Public Sans, sans-serif';
      questionLine.textContent = a.position + '. ' + a.textIt;

      const answerLine = document.createElement('div');
      answerLine.style.cssText = 'font-size:0.72rem;color:var(--ink-muted);margin-top:3px;';
      answerLine.style.fontFamily = 'Public Sans, sans-serif';
      answerLine.dir = 'ltr';
      answerLine.textContent =
        'Risposta: ' + (a.correctAnswer === 1 ? 'VERO' : 'FALSO') +
        (a.userAnswer !== null ? ' · Tu: ' + (a.userAnswer === 1 ? 'VERO' : 'FALSO') : ' · Saltato');

      const translateBtn = document.createElement('button');
      translateBtn.style.cssText = 'background:none;border:1px solid var(--border);border-radius:6px;color:var(--ink-muted);font-size:0.68rem;padding:3px 7px;cursor:pointer;margin-top:4px;';
      translateBtn.style.fontFamily = 'Vazirmatn, sans-serif';
      translateBtn.textContent = 'ترجمه';
      translateBtn.onclick = function() { App.translateResult(a.questionId, translateBtn); };

      back.appendChild(questionLine);
      back.appendChild(answerLine);
      back.appendChild(translateBtn);
      inner.appendChild(back);
      signCard.appendChild(inner);
      row.appendChild(icon);
      row.appendChild(signCard);
      wrapper.appendChild(row);
      list.appendChild(wrapper);

      // Staggered flip-in animation
      const delay = Math.min(idx * 60, 1200); // cap at 1.2s total stagger
      setTimeout(function() {
        signCard.classList.add('revealed');
      }, delay);
    });
  };

  // §14.1: simplified — no more driving/grammar rendering in results
  App.translateResult = async function(questionId, btn) {
    btn.disabled = true;
    btn.textContent = '⏳';
    try {
      const data = await api('POST', '/translate/' + questionId);
      const container = btn.parentElement;

      const block = document.createElement('div');
      block.className = 'fa-text';
      block.style.cssText = 'font-size:0.8rem;color:var(--ink-muted);padding-top:6px;border-top:1px dashed var(--border);margin-top:6px;';

      // §19.2: verdict badge first, then translation, then explanation
      const isVero = data.verdictVero === true;
      const label = isVero ? 'VERO' : 'FALSO';
      let content =
        '<div style="margin-bottom:6px;">' +
        '<span style="display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:16px;font-size:0.72rem;font-weight:700;' +
        (isVero
          ? 'background:rgba(22,163,74,0.15);color:var(--go);border:1px solid rgba(22,163,74,0.3);'
          : 'background:rgba(220,38,38,0.12);color:var(--stop);border:1px solid rgba(220,38,38,0.25);') +
        '">' + (isVero ? '✅' : '❌') + ' پاسخ: ' + label + '</span></div>';
      content += '<div style="color:var(--ink);font-weight:600;margin-bottom:4px;">🌐 ' + App.escapeHtml(data.translatedText) + '</div>';
      if (data.explanation) {
        content += '<div style="color:var(--amber);">💡 ' + App.escapeHtml(data.explanation) + '</div>';
      }

      block.innerHTML = content;
      container.insertBefore(block, btn);
      btn.style.display = 'none';
    } catch (e) {
      btn.textContent = '⟳ دوباره';
      btn.disabled = false;
    }
  };


  // ── Vocab ────────────────────────────────────────────────────────────────────
  App.loadVocab = async function() {
    try {
      const data = await api('GET', '/vocab');
      state.vocabItems = data.items || [];
      state.dueVocab = state.vocabItems.filter(i => i.isDue);
      state.dueVocabIndex = 0;
      state.vocabFlipped = false;

      if (state.dueVocab.length > 0) {
        document.getElementById('vocab-due-section').style.display = '';
        document.getElementById('vocab-due-count').textContent = state.dueVocab.length;
        App.showDueVocab();
      } else {
        document.getElementById('vocab-due-section').style.display = 'none';
      }

      const list = document.getElementById('vocab-list');
      list.innerHTML = '';

      if (state.vocabItems.length === 0) {
        list.innerHTML = '<div style="color:var(--ink-muted);font-size:0.9rem;padding:16px 0;text-align:center;">هنوز لغتی ذخیره نکردی — از یه سؤال شروع کن</div>';
        return;
      }

      state.vocabItems.forEach(function(item) {
        const el = document.createElement('div');
        el.className = 'card-sm';
        el.style.marginBottom = '8px';
        el.innerHTML =
          '<div class="ltr" style="font-weight:600;">' + item.term_it + '</div>' +
          '<div class="fa-text" style="color:var(--ink-muted);font-size:0.9rem;margin-top:2px;">' + item.term_fa + '</div>';
        list.appendChild(el);
      });
    } catch (e) {
      App.toast('خطا: ' + e.message);
    }
  };

  App.showDueVocab = function() {
    const item = state.dueVocab[state.dueVocabIndex];
    if (!item) return;
    state.vocabFlipped = false;
    document.getElementById('vocab-flip-card').classList.remove('flipped');
    document.getElementById('vocab-front-text').textContent = item.term_it;
    document.getElementById('vocab-back-text').textContent = item.term_fa;
  };

  App.flipVocab = function() {
    state.vocabFlipped = !state.vocabFlipped;
    document.getElementById('vocab-flip-card').classList.toggle('flipped', state.vocabFlipped);
  };

  App.vocabReview = async function(correct) {
    const item = state.dueVocab[state.dueVocabIndex];
    if (!item) return;
    try {
      await api('POST', '/vocab/' + item.id + '/review', {
        correct, currentIntervalDays: item.interval_days || 1,
      });
    } catch (e) {}
    state.dueVocabIndex++;
    if (state.dueVocabIndex < state.dueVocab.length) {
      App.showDueVocab();
    } else {
      document.getElementById('vocab-due-section').style.display = 'none';
      App.toast('مرور تموم شد! 🎉');
    }
  };

  App.suggestVocab = async function() {
    const term = document.getElementById('vocab-it-input').value.trim();
    if (!term) { App.toast('یه لغت ایتالیایی بنویس'); return; }
    try {
      const data = await api('POST', '/vocab/suggest', { termIt: term });
      document.getElementById('vocab-fa-input').value = data.suggestion || '';
    } catch (e) {
      App.toast('خطا در پیشنهاد ترجمه — دوباره امتحان کن');
    }
  };

  App.saveVocab = async function() {
    const termIt = document.getElementById('vocab-it-input').value.trim();
    const termFa = document.getElementById('vocab-fa-input').value.trim();
    if (!termIt || !termFa) { App.toast('هر دو فیلد رو پر کن'); return; }
    try {
      await api('POST', '/vocab', { termIt, termFa });
      document.getElementById('vocab-it-input').value = '';
      document.getElementById('vocab-fa-input').value = '';
      App.toast('ذخیره شد ✓');
      App.loadVocab();
    } catch (e) {
      App.toast('خطا: ' + e.message);
    }
  };

  // ── Stats ────────────────────────────────────────────────────────────────────
  App.loadStats = async function() {
    try {
      const data = await api('GET', '/stats');
      document.getElementById('stats-streak').textContent = data.streak || 0;
      document.getElementById('stats-sessions').textContent = data.totalSessions || 0;
      document.getElementById('stats-pass-rate').textContent =
        data.passRate !== null ? data.passRate + '%' : '—';

      const bars = document.getElementById('stats-topic-bars');
      bars.innerHTML = '';

      if (!data.topicAccuracy?.length) {
        bars.innerHTML = '<div style="color:var(--ink-muted);font-size:0.9rem;padding:8px 0;">هنوز آزمونی نداده‌ای — برو امتحان بده!</div>';
        return;
      }

      (data.topicAccuracy || []).forEach(function(t) {
        const pct = Math.round(t.accuracy * 100);
        const cls = pct >= 80 ? 'good' : pct >= 60 ? 'medium' : 'poor';
        const row = document.createElement('div');
        row.className = 'stat-bar-row';
        row.innerHTML =
          '<div style="font-size:0.75rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-muted);" dir="ltr">' + t.name_it + '</div>' +
          '<div class="stat-bar-track"><div class="stat-bar-fill ' + cls + '" style="width:' + pct + '%"></div></div>' +
          '<div style="font-size:0.78rem;font-weight:700;text-align:left;" dir="ltr">' + pct + '%</div>';
        bars.appendChild(row);
      });
    } catch (e) {}
  };

  // ── Profile & Analysis screen (\u00a713) ──────────────────────────────────────────

  App.loadProfile = async function() {
    try {
      const data = await api('GET', '/profile');

      // Header: name + username
      var name = data.user && data.user.firstName ? data.user.firstName : 'کاربر';
      var username = data.user && data.user.username ? '@' + data.user.username : '';
      document.getElementById('profile-name').textContent = name;
      document.getElementById('profile-username').textContent = username;

      // Level / XP
      document.getElementById('profile-level').textContent = data.level || 0;
      var xpPct = Math.min(100, Math.round((data.xpInLevel / data.xpForNextLevel) * 100));
      document.getElementById('profile-xp-fill').style.width = xpPct + '%';
      document.getElementById('profile-xp-label').textContent = (data.xp || 0).toLocaleString() + ' XP';
      document.getElementById('profile-xp-detail').textContent =
        data.xpInLevel + ' از ' + data.xpForNextLevel + ' XP تا سطح ' + ((data.level || 0) + 1);

      // Stat row
      var stats = data.stats || {};
      document.getElementById('profile-streak').textContent = stats.streak || 0;
      document.getElementById('profile-exams').textContent = stats.examsFinished || 0;
      var cov = stats.bankCoverage || {};
      document.getElementById('profile-coverage-pct').textContent = (cov.pct || 0) + '%';
      document.getElementById('profile-vocab').textContent = stats.vocabLearned || 0;

      // Coverage bar
      var fillPct = Math.min(100, cov.pct || 0);
      setTimeout(function() {
        document.getElementById('profile-coverage-fill').style.width = fillPct + '%';
      }, 80);
      document.getElementById('profile-coverage-label').textContent =
        (cov.seen || 0).toLocaleString() + ' از ' + (cov.total || 7139).toLocaleString();
      document.getElementById('profile-coverage-sub').textContent =
        'از ' + (cov.total || 7139).toLocaleString() + ' سوال بانک دیده‌ای — ' +
        (cov.seenMoreThanOnce || 0).toLocaleString() + ' سوال را بیش از یک‌بار دیده‌ای';

      // Needs-more-work list
      var nmwList = document.getElementById('profile-nmw-list');
      nmwList.innerHTML = '';
      if (!data.needsMoreWork || data.needsMoreWork.length === 0) {
        nmwList.innerHTML = '<div style="color:var(--go);font-size:0.85rem;text-align:center;padding:12px 0;">👏 عالی! هیچ سوالی با اشتباه مکرر نداری</div>';
      } else {
        data.needsMoreWork.forEach(function(item) {
          var wrongPct = Math.round((item.wrongRate || 0) * 100);
          var cls = wrongPct >= 70 ? 'var(--stop)' : 'var(--amber)';
          var row = document.createElement('div');
          row.className = 'nmw-row';
          row.setAttribute('role', 'button');
          row.setAttribute('tabindex', '0');
          row.onclick = function() { App.startFocusedReview(item.questionId); };
          row.innerHTML =
            '<span class="nmw-badge">' + item.wrongCount + '✗</span>' +
            '<span class="nmw-text" dir="ltr">' + App.escapeHtml(item.textIt.slice(0, 90)) + (item.textIt.length > 90 ? '…' : '') + '</span>' +
            '<span style="flex-shrink:0;font-size:0.72rem;font-weight:700;color:' + cls + ';">' + wrongPct + '%</span>';
          nmwList.appendChild(row);
        });
      }

      // Per-topic accuracy chart (worst-first — already sorted by API)
      var chart = document.getElementById('profile-topic-chart');
      chart.innerHTML = '';
      if (!data.topicAccuracy || data.topicAccuracy.length === 0) {
        chart.innerHTML = '<div style="color:var(--ink-muted);font-size:0.85rem;text-align:center;padding:12px 0;">هنوز آزمونی نداده‌ای</div>';
      } else {
        data.topicAccuracy.forEach(function(t) {
          var pct = Math.round((t.accuracy || 0) * 100);
          var cls = pct >= 80 ? 'good' : pct >= 60 ? 'medium' : 'poor';
          var row = document.createElement('div');
          row.className = 'topic-acc-row';
          row.innerHTML =
            '<div class="ta-name" dir="ltr" title="' + App.escapeHtml(t.name_it || '') + '">' + App.escapeHtml(t.name_it || '—') + '</div>' +
            '<div class="ta-track"><div class="ta-fill ' + cls + '" style="width:' + pct + '%;"></div></div>' +
            '<div class="ta-pct">' + pct + '%</div>';
          chart.appendChild(row);
        });
      }

      // Score trend sparkline
      App._renderSparkline(data.scoreTrend || []);

    } catch (e) {
      console.error('loadProfile error', e);
    }
  };

  App._renderSparkline = function(trend) {
    var line   = document.getElementById('sparkline-line');
    var dot    = document.getElementById('sparkline-dot');
    var empty  = document.getElementById('sparkline-empty');
    var passLn = document.getElementById('sparkline-pass-line');
    var minLbl = document.getElementById('sparkline-min-label');
    var maxLbl = document.getElementById('sparkline-max-label');
    var rng    = document.getElementById('profile-trend-range');

    if (!trend || trend.length === 0) {
      if (line)  line.setAttribute('points', '');
      if (dot)   { dot.setAttribute('cx', '-9'); dot.setAttribute('cy', '-9'); }
      if (empty) empty.style.display = '';
      if (passLn){ passLn.setAttribute('y1',''); passLn.setAttribute('y2',''); }
      if (rng)   rng.textContent = '';
      return;
    }
    if (empty) empty.style.display = 'none';

    // Viewbox is 300x80
    var W = 300, H = 80, pad = 8;
    var scores = trend.map(function(s) { return s.score !== null && s.score !== undefined ? s.score : 0; });
    var minS = Math.max(0, Math.min.apply(null, scores) - 1);
    var maxS = Math.min(30, Math.max.apply(null, scores) + 1);
    var range = maxS - minS || 1;

    function toX(i) { return pad + (i / Math.max(trend.length - 1, 1)) * (W - 2 * pad); }
    function toY(s) { return H - pad - ((s - minS) / range) * (H - 2 * pad); }

    // Pass line at score=27
    var passY = toY(27);
    if (passLn) {
      passLn.setAttribute('y1', passY.toFixed(1));
      passLn.setAttribute('y2', passY.toFixed(1));
    }

    // Build points string
    var pts = trend.map(function(s, i) {
      return toX(i).toFixed(1) + ',' + toY(s.score || 0).toFixed(1);
    }).join(' ');
    if (line) line.setAttribute('points', pts);

    // Latest point dot
    var last = trend[trend.length - 1];
    var lx = toX(trend.length - 1), ly = toY(last.score || 0);
    if (dot) { dot.setAttribute('cx', lx.toFixed(1)); dot.setAttribute('cy', ly.toFixed(1)); }

    // Labels
    var minVal = Math.min.apply(null, scores);
    var maxVal = Math.max.apply(null, scores);
    if (minLbl) minLbl.textContent = 'کمترین: ' + minVal + '/30';
    if (maxLbl) maxLbl.textContent = 'بیشترین: ' + maxVal + '/30';
    if (rng) rng.textContent = trend.length + ' آزمون';
  };

  // Focused review: starts a review-mode session filtered toward a specific question
  App.startFocusedReview = async function(questionId) {
    App.toast('در حال شروع مرور هدفمند…');
    try {
      // Piggyback on the existing startReview flow — the review_queue will
      // include this question if it's been marked wrong. We navigate to review.
      App.showScreen('home');
      App.startReview();
    } catch (e) {
      App.toast('خطا در شروع مرور');
    }
  };

  // ── Road-sign flashcard mode ─────────────────────────────────────────────────
  // SRS state stored in localStorage: key = 'signs_srs', value = JSON map of questionId → {interval, nextDate}


  function getSignsSRS() {
    try { return JSON.parse(localStorage.getItem('signs_srs') || '{}'); } catch (e) { return {}; }
  }
  function saveSignsSRS(srs) {
    try { localStorage.setItem('signs_srs', JSON.stringify(srs)); } catch (e) {}
  }
  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  App.loadSigns = async function() {
    // Signs guide collapse memory — remember user's preference
    var guideEl = document.getElementById('signs-guide-details');
    if (guideEl) {
      var guideClosed = localStorage.getItem('patentefa_signs_guide_closed');
      if (guideClosed === '1') guideEl.removeAttribute('open');
      guideEl.ontoggle = function() {
        localStorage.setItem('patentefa_signs_guide_closed', guideEl.open ? '0' : '1');
      };
    }

    // Fetch sign questions if not yet loaded
    if (state.allSignQuestions.length === 0) {
      try {
        // We reuse the stats endpoint to get question bank, but we need sign questions.
        // Use a dedicated endpoint if available, otherwise draw a fresh exam and keep image questions.
        // Since there's no dedicated sign listing endpoint, we call the exam start with mode=exam
        // and filter for imageUrl questions from the bank.
        // Better: fetch via /api/signs if available, else show a loading state.
        const data = await api('GET', '/signs');
        state.allSignQuestions = data.questions || [];
      } catch (e) {
        // Fallback: show a helpful message
        document.getElementById('signs-empty').style.display = '';
        document.getElementById('signs-flip-card').style.display = 'none';
        document.querySelector('#screen-signs > div > div:last-of-type[style*="gap"]') &&
          (document.querySelector('#screen-signs .btn-signs-known').closest('div').style.display = 'none');
        App.toast('برای استفاده از تابلوها ابتدا یک آزمون بده');
        return;
      }
    }

    const srs = getSignsSRS();
    const today = todayISO();

    // Queue: questions due today (nextDate <= today or not set)
    const due = state.allSignQuestions.filter(function(q) {
      const entry = srs[q.questionId];
      if (!entry) return true; // never seen
      return entry.nextDate <= today;
    });

    if (due.length === 0) {
      document.getElementById('signs-empty').style.display = '';
      document.getElementById('signs-flip-card').style.display = 'none';
      document.getElementById('signs-counter').textContent = '';
      return;
    }

    // Shuffle
    for (let i = due.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [due[i], due[j]] = [due[j], due[i]];
    }

    state.signsQueue = due;
    state.signsIndex = 0;
    state.signsFlipped = false;

    document.getElementById('signs-empty').style.display = 'none';
    document.getElementById('signs-flip-card').style.display = '';
    App.showCurrentSign();
  };

  App.showCurrentSign = function() {
    const q = state.signsQueue[state.signsIndex];
    if (!q) return;

    state.signsFlipped = false;
    document.getElementById('signs-flip-card').classList.remove('flipped');

    const img = document.getElementById('signs-img');
    img.src = q.imageUrl || '';

    // Italian name — always shown on back face, primary
    document.getElementById('signs-name-it').textContent = q.textIt || '';
    // Farsi — clear until flipped (lazy-fetch on first flip)
    const faEl = document.getElementById('signs-name-fa');
    faEl.textContent = '';
    faEl.removeAttribute('data-loaded');

    const total = state.signsQueue.length;
    const idx = state.signsIndex + 1;
    document.getElementById('signs-counter').textContent = idx + ' / ' + total;

    // Progress bar
    const pct = ((idx - 1) / total) * 100;
    document.getElementById('signs-srs-bar').style.width = pct + '%';
  };

  App.flipSign = function() {
    state.signsFlipped = !state.signsFlipped;
    document.getElementById('signs-flip-card').classList.toggle('flipped', state.signsFlipped);

    // §12.1: lazy-fetch Farsi translation on first flip of this sign
    if (state.signsFlipped) {
      const q = state.signsQueue[state.signsIndex];
      if (!q) return;
      const faEl = document.getElementById('signs-name-fa');
      if (faEl.getAttribute('data-loaded') === 'true') return; // already loaded

      if (state.signsTranslationCache[q.questionId]) {
        faEl.textContent = state.signsTranslationCache[q.questionId];
        faEl.setAttribute('data-loaded', 'true');
        return;
      }

      // Show loading indicator
      faEl.textContent = '⧗';
      api('POST', '/translate/' + q.questionId)
        .then(function(data) {
          const text = data.translatedText || '';
          state.signsTranslationCache[q.questionId] = text;
          faEl.textContent = text;
          faEl.setAttribute('data-loaded', 'true');
        })
        .catch(function() {
          faEl.textContent = '';
        });
    }
  };

  App.signsReview = function(correct) {
    const q = state.signsQueue[state.signsIndex];
    if (!q) return;

    const srs = getSignsSRS();
    const entry = srs[q.questionId] || { interval: 1 };

    const newInterval = correct
      ? Math.min(entry.interval * 2, 64) // double, cap at 64 days
      : 1;                                // reset on miss

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + newInterval);

    srs[q.questionId] = {
      interval: newInterval,
      nextDate: nextDate.toISOString().slice(0, 10),
    };
    saveSignsSRS(srs);

    state.signsIndex++;
    if (state.signsIndex < state.signsQueue.length) {
      App.showCurrentSign();
    } else {
      // All done
      document.getElementById('signs-empty').style.display = '';
      document.getElementById('signs-flip-card').style.display = 'none';
      document.getElementById('signs-counter').textContent = '';
      App.toast('همه تابلوهای امروز رو مرور کردی! ✅');
    }
  };

  // ── Long-press-to-vocab (§12.2) ──────────────────────────────────────────────
  // Wraps every word in the given element with a tappable span.
  // Detects long-press via pointerdown → 500ms timeout, cancelled on move/up.
  App.wrapWordsForLongPress = function(el, questionId) {
    const text = el.textContent || '';
    el.textContent = ''; // clear

    // Split keeping whitespace tokens as separate text nodes between spans
    const parts = text.split(/(\s+)/);
    parts.forEach(function(part) {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        el.appendChild(document.createTextNode(part));
        return;
      }
      const span = document.createElement('span');
      span.className = 'word-tap';
      span.textContent = part;

      let timer = null;

      span.addEventListener('pointerdown', function(e) {
        // Only respond to primary pointer (finger / left-click)
        if (!e.isPrimary) return;
        span.classList.add('pressing');
        timer = setTimeout(function() {
          timer = null;
          span.classList.remove('pressing');
          App.openVocabSheet(part, questionId);
        }, 500);
      });

      function cancel() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        span.classList.remove('pressing');
      }

      span.addEventListener('pointermove', cancel);
      span.addEventListener('pointerup', cancel);
      span.addEventListener('pointercancel', cancel);
      // Prevent the browser from stealing the pointer (important in WebView)
      span.addEventListener('pointerdown', function(e) { e.preventDefault(); }, { passive: false });

      el.appendChild(span);
    });
  };

  // Opens the vocab bottom sheet, pre-fills the word, fetches a GPT suggestion.
  App.openVocabSheet = function(word, questionId) {
    state.longPressWord = word;
    state.vocabSheetQuestionId = questionId;

    document.getElementById('vocab-sheet-word-display').textContent = word;
    const faInput = document.getElementById('vocab-sheet-fa');
    faInput.value = '';
    faInput.placeholder = '⏳ در حال پیشنهاد…';

    const sheet = document.getElementById('vocab-sheet');
    sheet.classList.add('open');
    // Re-animate: remove and re-add the panel to restart the animation
    const panel = sheet.querySelector('.vocab-sheet-panel');
    panel.style.animation = 'none';
    panel.offsetHeight; // reflow
    panel.style.animation = '';

    // Fetch GPT suggestion in the background
    api('POST', '/vocab/suggest', { termIt: word })
      .then(function(data) {
        // Only populate if the sheet is still open for this word
        if (state.longPressWord === word) {
          faInput.value = data.suggestion || '';
          faInput.placeholder = 'ترجمه فارسی…';
          faInput.focus();
        }
      })
      .catch(function() {
        if (state.longPressWord === word) {
          faInput.placeholder = 'ترجمه فارسی…';
        }
      });
  };

  App.closeVocabSheet = function() {
    document.getElementById('vocab-sheet').classList.remove('open');
    state.longPressWord = null;
    state.vocabSheetQuestionId = null;
  };

  App.saveVocabFromSheet = async function() {
    const termIt = state.longPressWord;
    const termFa = document.getElementById('vocab-sheet-fa').value.trim();
    const sourceId = state.vocabSheetQuestionId;

    if (!termIt || !termFa) {
      App.toast('ترجمه فارسی رو وارد کن');
      return;
    }

    const saveBtn = document.getElementById('vocab-sheet-save-btn');
    saveBtn.textContent = '⏳';
    saveBtn.disabled = true;

    try {
      await api('POST', '/vocab', {
        termIt: termIt,
        termFa: termFa,
        sourceQuestionId: sourceId || undefined,
      });
      App.closeVocabSheet();
      App.toast('"' + termIt + '" ذخیره شد ✓');
    } catch (e) {
      App.toast('خطا: ' + e.message);
    } finally {
      saveBtn.textContent = 'ذخیره ✓';
      saveBtn.disabled = false;
    }
  };

  // ── Patente Reels (Vertical Educational Feed) ──────────────────────────────
  App.loadReels = async function() {
    if (state.reelsFeed && state.reelsFeed.length > 0) {
      return; // Already loaded initial batch
    }

    state.reelsFeed = [];
    state.reelsAnswered = {};
    state.reelsLiked = new Set();
    state.reelsLoading = true;

    const viewport = document.getElementById('reels-viewport');
    if (viewport) {
      viewport.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100dvh;color:var(--ink-muted);font-weight:600;direction:rtl;">در حال بارگذاری ریلزهای آموزشی… ⚡</div>';
    }

    try {
      const data = await api('GET', '/reels/feed?limit=20');
      state.reelsFeed = data.items || [];
      App.renderReelCards(state.reelsFeed, true);
    } catch (e) {
      if (viewport) {
        viewport.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100dvh;color:var(--danger);gap:12px;direction:rtl;"><div style="font-size:2rem;">⚠️</div><div>خطا در دریافت ریلزها</div><button class="btn btn-sm btn-ghost" onclick="App.loadReels()">تلاش مجدد</button></div>';
      }
    } finally {
      state.reelsLoading = false;
    }
  };

  App.renderReelCards = function(items, replace) {
    const viewport = document.getElementById('reels-viewport');
    if (!viewport) return;

    if (replace) {
      viewport.innerHTML = '';
    }

    items.forEach(function(item, idx) {
      const cardEl = document.createElement('div');
      cardEl.className = 'reel-card';
      cardEl.id = 'reel-card-' + item.question_id;

      const isSign = item.type === 'sign';
      const isTip = item.type === 'tip';
      const badgeClass = isSign ? 'reel-badge-sign' : isTip ? 'reel-badge-tip' : 'reel-badge-question';
      const badgeText = isSign ? '🚦 تابلو راهنمایی' : isTip ? '💡 نکته طلایی امتحانی' : '❓ تست سریع';
      const initialLikes = Math.floor(120 + (item.question_id * 17) % 850);

      let bodyHtml = '';

      if (item.image_url) {
        bodyHtml += '<div class="reel-img-container"><img src="' + item.image_url + '" class="reel-img" alt="Sign Image" /></div>';
      }

      if (isTip) {
        bodyHtml += '<div class="reel-tip-card">' +
          '<div class="reel-tip-title">' + (item.tip_title_fa || 'نکته طلایی امتحانی') + '</div>' +
          (item.tip_keyword_it ? '<span class="reel-tip-kw">' + item.tip_keyword_it + '</span>' : '') +
          '<div class="reel-text-it long-pressable" id="reel-text-it-' + item.question_id + '">' + item.text_it + '</div>' +
          '</div>';
      } else {
        bodyHtml += '<div class="reel-text-it long-pressable" id="reel-text-it-' + item.question_id + '">' + item.text_it + '</div>';
      }

      if (!isTip) {
        bodyHtml += '<div class="reel-quiz-row" id="reel-quiz-row-' + item.question_id + '">' +
          '<button class="btn-reel-quiz btn-reel-vero" onclick="App.answerReelQuestion(' + item.question_id + ', 1, ' + item.correct_answer + ')">✓ VERO (درست)</button>' +
          '<button class="btn-reel-quiz btn-reel-falso" onclick="App.answerReelQuestion(' + item.question_id + ', 0, ' + item.correct_answer + ')">✗ FALSO (نادرست)</button>' +
          '</div>' +
          '<div class="reel-quiz-feedback" id="reel-feedback-' + item.question_id + '"></div>';
      }

      bodyHtml += '<div class="reel-translation-box" id="reel-trans-box-' + item.question_id + '">' +
        '<div style="width:36px;height:4px;background:rgba(255,255,255,0.2);border-radius:2px;margin:0 auto 10px;"></div>' +
        '<div class="reel-trans-text" id="reel-trans-text-' + item.question_id + '">' +
        (item.translated_text || 'در حال دریافت ترجمه فارسی… ⏳') +
        '</div>' +
        '<div class="reel-trans-expl" id="reel-trans-expl-' + item.question_id + '">' +
        (item.explanation || '') +
        '</div>' +
        '</div>';

      cardEl.innerHTML =
        '<div class="reel-card-header">' +
          '<div class="reel-badge-pill">' + badgeText + '</div>' +
          '<div class="reel-topic-name">' + (item.topic_name_fa || 'سوال آزمون') + '</div>' +
        '</div>' +

        '<div class="reel-main-body">' +
          (item.image_url ?
            '<div class="reel-sign-frame">' +
              '<img src="' + item.image_url + '" class="reel-sign-image" alt="Road Sign" />' +
            '</div>' +
            '<div class="reel-divider-rule">' +
              '<div class="reel-divider-line"></div>' +
              '<div class="reel-divider-text">📝 سوال آزمون</div>' +
              '<div class="reel-divider-line"></div>' +
            '</div>'
          : '') +

          '<div class="reel-question-card">' +
            '<div class="reel-question-text long-pressable" id="reel-text-it-' + item.question_id + '">' + item.text_it + '</div>' +
          '</div>' +

          (!isTip ?
            '<div class="reel-divider-rule">' +
              '<div class="reel-divider-line"></div>' +
              '<div class="reel-divider-text">⚡ پاسخ درست یا نادرست؟</div>' +
              '<div class="reel-divider-line"></div>' +
            '</div>' +
            '<div class="reel-quiz-grid" id="reel-quiz-row-' + item.question_id + '">' +
              '<button class="btn-quiz-option btn-quiz-vero" onclick="App.answerReelQuestion(' + item.question_id + ', 1, ' + item.correct_answer + ')">✓ VERO (درست)</button>' +
              '<button class="btn-quiz-option btn-quiz-falso" onclick="App.answerReelQuestion(' + item.question_id + ', 0, ' + item.correct_answer + ')">✗ FALSO (نادرست)</button>' +
            '</div>' +
            '<div class="reel-feedback-banner" id="reel-feedback-' + item.question_id + '"></div>'
          : '') +

          '<div class="reel-trans-drawer" id="reel-trans-box-' + item.question_id + '">' +
            '<div class="reel-trans-title" id="reel-trans-text-' + item.question_id + '">' +
            (item.translated_text || 'در حال دریافت ترجمه فارسی… ⏳') +
            '</div>' +
            '<div class="reel-trans-detail" id="reel-trans-expl-' + item.question_id + '">' +
            (item.explanation || '') +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="reel-footer-actions">' +
          '<button class="reel-footer-btn" id="reel-like-btn-' + item.question_id + '" onclick="App.toggleReelLike(this, ' + item.question_id + ')">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' +
            '<span id="reel-like-count-' + item.question_id + '">' + initialLikes + '</span>' +
          '</button>' +

          '<button class="reel-footer-btn" id="reel-trans-btn-' + item.question_id + '" onclick="App.toggleReelTranslate(' + item.question_id + ')">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
            '<span>ترجمه</span>' +
          '</button>' +

          '<button class="reel-footer-btn" id="reel-audio-btn-' + item.question_id + '" onclick="App.speakReelText(' + item.question_id + ')">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>' +
            '<span>صوت</span>' +
          '</button>' +

          '<button class="reel-footer-btn" onclick="App.saveReelVocab(' + item.question_id + ')">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
            '<span>ذخیره</span>' +
          '</button>' +
        '</div>';

      viewport.appendChild(cardEl);

      // Setup Double-Tap to Like on Instagram Reel Card
      let lastTap = 0;
      cardEl.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
          e.preventDefault();
          App.popHeartAnimation(item.question_id);
        }
        lastTap = currentTime;
      });

      // Long press setup for words
      const textEl = document.getElementById('reel-text-it-' + item.question_id);
      if (textEl && App.wrapWordsForLongPress) {
        App.wrapWordsForLongPress(textEl, item.question_id);
      }
    });

    App.updateReelsHeaderProgress();
  };

  App.popHeartAnimation = function(questionId) {
    const heartEl = document.getElementById('reel-heart-pop-' + questionId);
    const likeBtn = document.getElementById('reel-like-btn-' + questionId);
    if (heartEl) {
      heartEl.classList.remove('pop');
      void heartEl.offsetWidth; // trigger reflow
      heartEl.classList.add('pop');
    }
    if (likeBtn && !likeBtn.classList.contains('liked')) {
      App.toggleReelLike(likeBtn, questionId);
    }
  };

  App.updateReelsHeaderProgress = function() {
    const viewport = document.getElementById('reels-viewport');
    const fill = document.getElementById('reels-progress-fill');
    const counter = document.getElementById('reels-counter');
    if (!viewport || state.reelsFeed.length === 0) return;

    const cardHeight = viewport.clientHeight || 1;
    const currentIdx = Math.min(
      Math.floor((viewport.scrollTop + cardHeight / 2) / cardHeight),
      state.reelsFeed.length - 1
    );

    const total = state.reelsFeed.length;
    const pct = Math.min(((currentIdx + 1) / total) * 100, 100);
    if (fill) fill.style.width = pct + '%';
    if (counter) counter.textContent = (currentIdx + 1) + ' / ' + total;
  };

  App.onReelsScroll = function(e) {
    App.updateReelsHeaderProgress();

    const el = e.target;
    if (state.reelsLoading) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 600) {
      state.reelsLoading = true;
      api('GET', '/reels/feed?limit=10')
        .then(function(data) {
          if (data.items && data.items.length > 0) {
            state.reelsFeed = state.reelsFeed.concat(data.items);
            App.renderReelCards(data.items, false);
          }
        })
        .catch(function(err) {})
        .finally(function() {
          state.reelsLoading = false;
        });
    }
  };

  App.answerReelQuestion = function(questionId, userAnswer, correctAnswer) {
    const feedbackEl = document.getElementById('reel-feedback-' + questionId);
    if (!feedbackEl) return;

    const isCorrect = userAnswer === correctAnswer;
    const correctLabel = correctAnswer === 1 ? 'VERO (درست)' : 'FALSO (نادرست)';

    if (isCorrect) {
      feedbackEl.className = 'reel-feedback-banner correct';
      feedbackEl.textContent = '🎉 آفرین! پاسخ صحیح است (' + correctLabel + ')';
    } else {
      feedbackEl.className = 'reel-feedback-banner incorrect';
      feedbackEl.textContent = '❌ اشتباه بود! پاسخ صحیح: ' + correctLabel;
    }

    // Auto-open translation after answering
    App.toggleReelTranslate(questionId, true);
  };

  App.toggleReelTranslate = async function(questionId, forceOpen) {
    const box = document.getElementById('reel-trans-box-' + questionId);
    const btn = document.getElementById('reel-trans-btn-' + questionId);
    if (!box) return;

    const isOpen = box.classList.contains('active');
    if (forceOpen || !isOpen) {
      box.classList.add('active');
      if (btn) btn.classList.add('active');

      const textEl = document.getElementById('reel-trans-text-' + questionId);
      if (textEl && textEl.textContent.includes('در حال دریافت')) {
        try {
          const res = await api('POST', '/translate/' + questionId);
          if (res.translatedText) {
            textEl.textContent = res.translatedText;
            const explEl = document.getElementById('reel-trans-expl-' + questionId);
            if (explEl && res.explanation) explEl.textContent = res.explanation;
          }
        } catch (e) {
          if (textEl) textEl.textContent = 'خطا در دریافت ترجمه';
        }
      }
    } else {
      box.classList.remove('active');
      if (btn) btn.classList.remove('active');
    }
  };

  App.speakReelText = function(questionId) {
    const item = (state.reelsFeed || []).find(function(q) { return q.question_id === questionId; });
    const text = item ? item.text_it : '';
    if (!text) return;

    const btn = document.getElementById('reel-audio-btn-' + questionId);
    if (btn) {
      btn.innerHTML = '<span style="font-size:0.8rem;">🔊 پخش…</span>';
    }

    if (!('speechSynthesis' in window)) {
      App.toast('مرورگر شما از پخش صوت پشتیبانی نمی‌کند');
      if (btn) btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>صوت</span>';
      return;
    }

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'it-IT';
    u.rate = 0.9;

    u.onend = u.onerror = function() {
      if (btn) {
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>صوت</span>';
      }
    };

    window.speechSynthesis.speak(u);
  };

  App.toggleReelLike = function(btn, questionId) {
    const isLiked = btn.classList.contains('liked');
    const countEl = document.getElementById('reel-like-count-' + questionId);
    let count = countEl ? parseInt(countEl.textContent || '120', 10) : 120;

    if (!isLiked) {
      btn.classList.add('liked');
      if (countEl) countEl.textContent = String(count + 1);
      App.toast('به لایک‌های شما اضافه شد ❤️');
    } else {
      btn.classList.remove('liked');
      if (countEl) countEl.textContent = String(Math.max(0, count - 1));
    }
  };

  App.saveReelVocab = function(questionId) {
    const item = (state.reelsFeed || []).find(function(q) { return q.question_id === questionId; });
    if (!item) return;
    App.openVocabSheet(item.text_it.split(' ')[0] || 'Patente', questionId);
  };

  // ── AI Exam Tutor Agent ──────────────────────────────────────────────────────
  App.openTutorReview = async function(sessionId) {
    const sid = sessionId || state.lastFinishedSessionId || state.sessionId;
    if (!sid) {
      App.toast('جلسه آزمونی برای رفع اشکال یافت نشد.');
      return;
    }

    state.tutorSessionId = sid;
    state.tutorChatHistory = {};

    App.showScreen('tutor');

    const loading = document.getElementById('tutor-loading');
    const content = document.getElementById('tutor-content');
    if (loading) loading.style.display = 'block';
    if (content) content.style.display = 'none';

    try {
      const data = await api('POST', '/tutor/explain-wrong', { sessionId: sid });
      if (data.wrongCount === 0 || !data.questions || data.questions.length === 0) {
        App.toast('شما هیچ سوال اشتباهی در این آزمون نداشتید! 🎉');
        App.showScreen('results');
        return;
      }

      state.tutorQuestions = data.questions;
      state.tutorCurrentIndex = 0;

      if (loading) loading.style.display = 'none';
      if (content) content.style.display = 'block';

      App.renderTutorCurrentQuestion();
    } catch (e) {
      App.toast('خطا در دریافت تحلیل استاد AI: ' + (e.message || e));
      if (loading) loading.style.display = 'none';
    }
  };

  App.renderTutorCurrentQuestion = function() {
    if (!state.tutorQuestions || state.tutorQuestions.length === 0) return;

    const q = state.tutorQuestions[state.tutorCurrentIndex];
    const total = state.tutorQuestions.length;

    // Progress badge
    const badge = document.getElementById('tutor-progress-badge');
    if (badge) badge.textContent = 'سوال ' + (state.tutorCurrentIndex + 1) + ' از ' + total + ' اشتباه';

    // Stepper dots
    const stepper = document.getElementById('tutor-stepper');
    if (stepper) {
      stepper.innerHTML = '';
      state.tutorQuestions.forEach(function(item, idx) {
        const pill = document.createElement('button');
        pill.style.cssText = 'border:none;border-radius:10px;padding:6px 12px;font-size:0.78rem;font-weight:700;cursor:pointer;flex-shrink:0;transition:all 0.2s;';
        if (idx === state.tutorCurrentIndex) {
          pill.style.background = '#16a34a';
          pill.style.color = '#ffffff';
          pill.style.boxShadow = '0 2px 8px rgba(22,163,74,0.4)';
        } else {
          pill.style.background = 'rgba(255,255,255,0.06)';
          pill.style.color = 'var(--ink-muted)';
        }
        pill.textContent = 'سوال #' + item.position;
        pill.onclick = function() {
          state.tutorCurrentIndex = idx;
          App.renderTutorCurrentQuestion();
        };
        stepper.appendChild(pill);
      });
    }

    // Question header & comparison
    const qBadge = document.getElementById('tutor-q-badge');
    if (qBadge) qBadge.textContent = 'سوال اشتباه #' + q.position;

    const qCmp = document.getElementById('tutor-q-answers-cmp');
    if (qCmp) {
      const correctText = q.correctAnswer === 1 ? 'VERO' : 'FALSO';
      const userText = q.userAnswer === 1 ? 'VERO' : (q.userAnswer === 0 ? 'FALSO' : 'Saltato');
      qCmp.textContent = 'Correct: ' + correctText + ' · Tu: ' + userText;
    }

    // Image
    const imgContainer = document.getElementById('tutor-q-image-container');
    const imgEl = document.getElementById('tutor-q-image');
    if (imgContainer && imgEl) {
      if (q.imageUrl) {
        imgEl.src = q.imageUrl;
        imgContainer.style.display = 'block';
      } else {
        imgContainer.style.display = 'none';
      }
    }

    // Text
    const textItEl = document.getElementById('tutor-q-text-it');
    if (textItEl) textItEl.textContent = q.position + '. ' + q.textIt;

    const textFaEl = document.getElementById('tutor-q-text-fa');
    if (textFaEl) textFaEl.textContent = q.translatedText || 'در حال ترجمه...';

    // Trap Box (§14.1: simplified — use explanation only)
    const trapBox = document.getElementById('tutor-trap-box');
    if (trapBox) {
      let text = q.explanation || 'این سوال به دلیل دقت در قیدها یا کلمات حساس آیین‌نامه مطرح شده است.';
      trapBox.innerHTML = App.escapeHtml(text);
    }

    // Rule Box (§14.1: driving_explanation removed — show generic guidance)
    const ruleBox = document.getElementById('tutor-rule-box');
    if (ruleBox) {
      ruleBox.innerHTML = 'قانون مرتبط: همیشه به تابلوها، حق تقدم و سرعت مجاز اعلام شده در قانون راهنمایی‌ورانندگی ایتالیا توجه کنید.';
    }

    // Vocab List (§14.1: grammar_explanation removed — hide vocab section)
    const vocabList = document.getElementById('tutor-vocab-list');
    const vocabSection = document.getElementById('tutor-vocab-section');
    if (vocabList && vocabSection) {
      vocabList.innerHTML = '';
      vocabSection.style.display = 'none';
    }

    // Prev / Next button states
    const prevBtn = document.getElementById('tutor-prev-btn');
    const nextBtn = document.getElementById('tutor-next-btn');
    if (prevBtn) prevBtn.disabled = state.tutorCurrentIndex === 0;
    if (nextBtn) {
      if (state.tutorCurrentIndex === total - 1) {
        nextBtn.textContent = 'پایان رفع اشکال 🎉';
      } else {
        nextBtn.textContent = 'سوال بعدی →';
      }
    }

    // Render chat history for current question
    App.renderTutorChatHistory(q.questionId);
  };

  App.prevTutorQuestion = function() {
    if (state.tutorCurrentIndex > 0) {
      state.tutorCurrentIndex--;
      App.renderTutorCurrentQuestion();
    }
  };

  App.nextTutorQuestion = function() {
    if (state.tutorCurrentIndex < state.tutorQuestions.length - 1) {
      state.tutorCurrentIndex++;
      App.renderTutorCurrentQuestion();
    } else {
      App.toast('رفع اشکال تمامی سوالات با موفقیت به پایان رسید! 👏');
      App.showScreen('results', 'back');
    }
  };

  App.formatTutorMarkdown = function(text) {
    if (!text) return '';
    var escaped = App.escapeHtml(text);
    var parts = escaped.split('**');
    var res = '';
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        res += '<b style="color:#ffffff;font-weight:700;">' + parts[i] + '</b>';
      } else {
        res += parts[i];
      }
    }
    return res.split(String.fromCharCode(10)).join('<br/>');
  };

  App.renderTutorChatHistory = function(questionId) {
    const box = document.getElementById('tutor-chat-box');
    if (!box) return;

    const history = state.tutorChatHistory[questionId] || [];
    if (history.length === 0) {
      box.innerHTML = '<div style="font-size:0.82rem;color:var(--ink-muted);text-align:center;padding:8px;font-family:Vazirmatn,system-ui,sans-serif;">هر سوال یا ابهامی در مورد این تست داری بنویس تا استاد برات توضیح بده.</div>';
      return;
    }

    box.innerHTML = '';
    history.forEach(function(msg) {
      const isUser = msg.role === 'user';
      const msgDiv = document.createElement('div');
      msgDiv.style.cssText = 'max-width:88%;padding:10px 14px;border-radius:14px;font-size:0.86rem;line-height:1.7;font-family:Vazirmatn,system-ui,sans-serif;direction:rtl;text-align:right;' +
        (isUser
          ? 'align-self:flex-end;background:#15803d;color:#ffffff;border-bottom-left-radius:3px;'
          : 'align-self:flex-start;background:var(--surface);border:1px solid var(--border);color:var(--ink);border-bottom-right-radius:3px;');

      msgDiv.innerHTML = App.formatTutorMarkdown(msg.content);
      box.appendChild(msgDiv);
    });

    box.scrollTop = box.scrollHeight;
  };

  App.sendTutorChatMessage = async function(e) {
    if (e) e.preventDefault();

    const input = document.getElementById('tutor-chat-input');
    const sendBtn = document.getElementById('tutor-chat-send-btn');
    if (!input) return;

    const userMessage = input.value.trim();
    if (!userMessage) return;

    const q = state.tutorQuestions[state.tutorCurrentIndex];
    if (!q) return;

    if (!state.tutorChatHistory[q.questionId]) {
      state.tutorChatHistory[q.questionId] = [];
    }

    // Push user message
    state.tutorChatHistory[q.questionId].push({ role: 'user', content: userMessage });
    input.value = '';
    App.renderTutorChatHistory(q.questionId);

    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.textContent = '…';
    }

    try {
      const res = await api('POST', '/tutor/chat', {
        sessionId: state.tutorSessionId,
        questionId: q.questionId,
        userMessage: userMessage,
        history: state.tutorChatHistory[q.questionId],
      });

      if (res.response) {
        state.tutorChatHistory[q.questionId].push({ role: 'assistant', content: res.response });
        App.renderTutorChatHistory(q.questionId);
      }
    } catch (err) {
      App.toast('خطا در پاسخ استاد: ' + (err.message || err));
    } finally {
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.textContent = 'ارسال';
      }
    }
  };

  App.saveVocabDirect = async function(termIt, termFa, btn, sourceQuestionId) {
    if (btn) {
      btn.disabled = true;
      btn.textContent = '…';
    }
    try {
      await api('POST', '/vocab', {
        termIt: termIt,
        termFa: termFa,
        sourceQuestionId: sourceQuestionId || null,
      });
      if (btn) {
        btn.textContent = '✓ ذخیره شد';
        btn.style.background = 'rgba(22,163,74,0.3)';
        btn.style.color = '#86efac';
      }
      App.toast('کلمه "' + termIt + '" در لیست لغات ذخیره شد');
    } catch (e) {
      App.toast('خطا در ذخیره لغت: ' + (e.message || e));
      if (btn) {
        btn.disabled = false;
        btn.textContent = '+ ذخیره';
      }
    }
  };

  // ── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    document.getElementById('loading').style.display = 'none';

    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen') || 'home';

    if (screen === 'exam') {
      App.showScreen('home');
      App.startExam('exam');
    } else if (screen === 'review') {
      App.showScreen('home');
      App.startExam('review');
    } else {
      App.showScreen(screen);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
</body>
</html>`;
}
