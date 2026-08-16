/**
 * src/app/shell.tsx
 * Hono JSX HTML shell — thin orchestrator: <head>, design tokens link,
 * composes/mounts the per-screen partials from src/app/screens/*.ts, and
 * references the static CSS/JS assets served via wrangler's `assets` binding.
 * Served at GET /app* in src/index.ts.
 *
 * Design system: "In viaggio" — the open road.
 * Palette: asphalt #14151A · ink #F2F0EB · go #1B7A3D · stop #C1272D · amber #E8A33D · surface #1F2128
 * Type: Barlow Condensed (headers) · Public Sans (body IT) · Vazirmatn (all FA)
 */

import type { Context } from "hono";
import type { AppEnv } from "../types.js";
import { renderHomeScreen } from "./screens/home.js";
import { renderTopicsScreen } from "./screens/topics.js";
import { renderPendingScreen } from "./screens/pending.js";
import { renderExamScreen } from "./screens/exam.js";
import { renderResultsScreen } from "./screens/results.js";
import { renderTutorScreen } from "./screens/tutor.js";
import { renderVocabScreen } from "./screens/vocab.js";
import { renderStatsScreen } from "./screens/stats.js";
import { renderProfileScreen } from "./screens/profile.js";
import { renderAdminScreen, renderAdminUserModal, renderAdminSupportModal } from "./screens/admin.js";
import { renderSignsScreen } from "./screens/signs.js";
import { renderSupportScreen } from "./screens/support.js";
import {
  renderLoading,
  renderBottomNav,
  renderToast,
  renderVocabSheet,
  renderExamDateModal,
  renderGuideModal,
} from "./screens/shared.js";

export function serveApp(c: Context<{ Bindings: AppEnv }>) {
  c.header("Cache-Control", "no-cache, no-store, must-revalidate");
  c.header("Pragma", "no-cache");
  c.header("Expires", "0");
  const html = buildHtml();
  return c.html(html);
}

function buildScreens(): string {
  return [
    renderHomeScreen(),
    renderTopicsScreen(),
    renderPendingScreen(),
    renderExamScreen(),
    renderResultsScreen(),
    renderTutorScreen(),
    renderVocabScreen(),
    renderStatsScreen(),
    renderProfileScreen(),
    renderAdminScreen(),
    renderAdminUserModal(),
    renderAdminSupportModal(),
    renderSignsScreen(),
    renderSupportScreen(),
  ].join("\n");
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

  <!-- Design system — see public/css/app.css ("In viaggio") -->
  <link rel="stylesheet" href="/css/app.css" />
</head>
<body>
<div id="app-root">

${renderLoading()}

<!-- ── SCREENS ─────────────────────────────────────────────────────────────── -->
${buildScreens()}

${renderBottomNav()}

</div><!-- #app-root -->

${renderToast()}

${renderVocabSheet()}

${renderExamDateModal()}

${renderGuideModal()}

<!-- Error handler (separate tag so it survives parse errors in the main scripts) -->
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

<!-- ── Client JavaScript (static assets — see public/js/) ─────────────────────── -->
<script src="/js/navigation.js"></script>
<script src="/js/app.js"></script>
<script src="/js/exam.js"></script>
</body>
</html>`;
}
