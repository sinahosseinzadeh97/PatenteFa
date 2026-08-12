/**
 * scripts/motion.entry.js
 * Bundle entry for the landing page's animation runtime.
 *
 * public/ is served as static assets with no build step, so motion's unbundled
 * ESM tree cannot be imported directly. This entry is bundled into
 * public/js/vendor/motion.js by `npm run vendor:motion`; that output is
 * committed, so `wrangler deploy` never needs a build.
 *
 * Self-hosted rather than CDN-loaded on purpose: a large share of the audience
 * browses from Iran, where public JS CDNs are unreliable.
 *
 * Export only what public/index.html actually calls — esbuild tree-shakes the rest.
 */
export { animate, inView, stagger, scroll } from "motion";
