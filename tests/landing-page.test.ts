/**
 * tests/landing-page.test.ts
 *
 * The public landing page (public/index.html) is one hand-authored file with no
 * build step, so nothing else can catch a regression in it. These guard the
 * invariants that break the page *silently* — the ones where the markup still
 * parses, the page still renders, and a user simply gets the wrong thing:
 *
 *   · a Telegram deep link landing on the marketing page instead of the app,
 *   · a Persian reader served an English document on first paint,
 *   · a string that vanishes when the language is switched,
 *   · layout shift from an image with no reserved box.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../public/index.html", import.meta.url), "utf8");

test("Telegram deep links reach the app before anything else runs", () => {
  const redirect = html.indexOf("tgWebApp");
  assert.notEqual(redirect, -1, "the tgWebApp redirect must exist");
  assert.match(
    html.slice(redirect - 200, redirect + 200),
    /location\.replace\('\/app'\+location\.search\+location\.hash\)/,
    "the redirect must preserve the query string and hash — Telegram's initData lives in them"
  );

  // Old bot buttons point at the bare host. Every byte parsed before this
  // redirect is a frame of the wrong page inside the Telegram WebView, so no
  // other script may be registered ahead of it.
  const firstScript = html.indexOf("<script");
  assert.ok(
    firstScript < redirect && redirect < html.indexOf("</script>"),
    "the redirect must live in the document's first <script>"
  );
});

test("the document is served Persian-first, with no JS needed to get there", () => {
  assert.match(html, /<html lang="fa" dir="rtl">/);

  // A Persian body rendered from data-* attributes would mean a paint of empty
  // or English content first. The Persian text has to be the markup itself.
  const heroH1 = html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1] ?? "";
  assert.match(heroH1, /[؀-ۿ]/, "the h1 must ship Persian text, not an English default");
});

test("every translated string can survive a language switch in both directions", () => {
  // setLang() swaps by attribute. An element carrying only one side loses its
  // text the moment the reader toggles — an empty heading, not an error.
  //
  // Attribute values here contain markup (<b>, <i>), so the scan has to respect
  // quoting: a naive [^>]* stops at the first > *inside* an attribute value and
  // reports the rest of the tag's attributes as missing.
  const TAG = /<[a-zA-Z][a-zA-Z0-9-]*(?:\s+[a-zA-Z-]+(?:="[^"]*"|='[^']*'|=[^\s>]+)?)*\s*\/?>/g;
  const tags = (html.match(TAG) ?? []).filter(
    (t) => t.includes("data-en=") || t.includes("data-fa=")
  );
  assert.ok(tags.length > 50, "expected the page to carry translated strings");

  const unpaired = tags.filter((t) => t.includes("data-en=") !== t.includes("data-fa="));
  assert.deepEqual(unpaired, [], "each element must carry both data-en and data-fa");
});

test("every image reserves its box and describes itself", () => {
  const imgs = html.match(/<img\b[^>]*>/g) ?? [];
  assert.ok(imgs.length > 0, "the page must actually show the product");

  for (const img of imgs) {
    assert.match(img, /\bwidth="\d+"/, `missing width (CLS): ${img}`);
    assert.match(img, /\bheight="\d+"/, `missing height (CLS): ${img}`);
    assert.match(img, /\balt="[^"]+"/, `missing alt text: ${img}`);
    assert.match(img, /\bdata-alt-en="[^"]+"/, `missing English alt text: ${img}`);
  }
});

test("the page loads nothing from an origin the audience cannot reach", () => {
  // Much of this audience browses from Iran, where general-purpose CDNs are
  // unreliable. The previous build pulled a ~1.3MB 3D runtime from unpkg and a
  // scene from spline.design; both are gone and must not come back.
  //
  // Only subresources count — an <a href> or a canonical URL is a navigation
  // the reader chooses, not a byte the page needs in order to render.
  const subresources = [
    ...html.matchAll(/<script\b[^>]*\bsrc="(https?:\/\/[^/"]+)/g),
    ...html.matchAll(/<link\b[^>]*\brel="(?:stylesheet|preconnect|preload|modulepreload)"[^>]*\bhref="(https?:\/\/[^/"]+)/g),
    ...html.matchAll(/<img\b[^>]*\bsrc="(https?:\/\/[^/"]+)/g),
    ...html.matchAll(/\burl\(\s*["']?(https?:\/\/[^/"')]+)/g),
    ...html.matchAll(/\bimport\(\s*["'](https?:\/\/[^/"']+)/g),
  ].map((m) => m[1]);

  assert.deepEqual(
    [...new Set(subresources)].sort(),
    ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    "only the font origins may be fetched at runtime"
  );
});

test("icons are drawable shapes, not emoji", () => {
  // Emoji render in a different typeface on every platform, ignore
  // currentColor, and cannot carry the icon set's stroke weight.
  const body = html.slice(html.indexOf("<body>"));
  const emoji = body.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu) ?? [];
  assert.deepEqual([...new Set(emoji)], [], "use the SVG sprite instead of emoji");
});
