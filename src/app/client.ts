/**
 * src/app/client.ts
 * Intentionally empty — client-side JS lives in public/js/*.js, served as
 * static assets via wrangler's `assets` binding (see wrangler.jsonc) and
 * loaded from src/app/shell.tsx with plain <script src> tags (no bundler,
 * no ES modules: multiple classic scripts share one global lexical scope,
 * which is how public/js/app.js and public/js/exam.js share `state`/`api`).
 * This file exists only as a stable TS entry point for the src/app dir.
 */
export {};
