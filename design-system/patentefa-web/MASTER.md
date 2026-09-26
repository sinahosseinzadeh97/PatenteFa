# PatenteFa Web — "Segnaletica" Design System

> Source of truth for the **public website** (`public/index.html`) at patentefarsi.online.
> The Telegram Mini App has its own separate system in `design-system/patentefa/MASTER.md`.
> These two are deliberately not merged: one is a marketing surface read once by a
> stranger, the other a study tool used daily by an authenticated learner. They share
> a brand (the amber) and a semantic vocabulary (go / stop), nothing else.

**Surface:** one page, no build step, no framework, no runtime dependency
**Primary language:** Persian (RTL) — served as the document's own markup, not a JS swap
**Secondary language:** English (LTR) — a real alternate, not the source of truth
**Audiences:** a Persian-speaking learner deciding whether to buy; secondarily an
engineering reader evaluating the work
**Design dials:** variance 4/10 · motion 3/10 · density 5/10

---

## The premise

Italian road signage is a system engineered for unambiguous comprehension under time
pressure — which is exactly the problem this page has, and exactly the problem the
exam behind it sets. So the page borrows signage **logic**, never signage decoration.

Every rule below traces back to one of five principles:

1. **High contrast on a printed ground.** Light, warm-white, near-black ink. Not a
   mood-lit dark canvas. (An education product's default should not be dark.)
2. **Meaning never rests on colour alone.** Shape + label + colour, together.
3. **Structure comes from rules, not shadow.** A 1px hairline is this system's entire
   idea of "a new topic starts here". Elevation is reserved for things that genuinely
   float: the sticky nav and the device frames. Two levels, no more.
4. **A closed palette where each colour already means something on a road.**
   Amber = attention/brand · red = prohibition/error · green = permitted/correct ·
   blue = information/action. A colour is never introduced for variety.
5. **Numerals are load-bearing** — limits, distances, counts — so they are always
   tabular and always in the reader's own numeral system (۷٬۱۳۹ / 7,139).

### Explicitly rejected

Gradient-faded headings · glassmorphism · aurora/ambient glows · emoji as icons ·
decorative 3D · cinematic curtain footers · magnetic hover · animation without a job ·
a card wrapped around every element on the page.

---

## Colour tokens

Light is the base. Dark redefines only the tokens, never the rules that use them.
Every value below is verified as text on its own ground.

| Role | Token | Light | Dark | Contrast |
|---|---|---|---|---|
| Page ground | `--paper` | `#FBFBF8` | `#101216` | — |
| Raised surface | `--surface` | `#FFFFFF` | `#171A20` | — |
| Recessed surface | `--sunken` | `#F3F3EF` | `#1D2027` | — |
| Hairline | `--line` | `#E4E4DD` | `#272B34` | — |
| Emphasised rule | `--line-2` | `#C8C8BF` | `#3A3F4C` | — |
| Primary text | `--ink` | `#16181D` | `#F1F0EC` | 15.9:1 |
| Secondary heading | `--ink-2` | `#3C4048` | `#C7CAD2` | 9.6:1 |
| Support text | `--ink-muted` | `#5D6068` | `#9AA0AE` | 5.9:1 / 7.2:1 |
| Brand fill | `--amber` | `#E8A33D` | `#E8A33D` | 8.3:1 w/ `--on-amber` |
| Amber as text | `--amber-ink` | `#7A4E06` | `#F0BA6B` | 7.0:1 |
| Action / link / focus | `--blue` | `#1B4FA0` | `#7FA9F0` | 7.5:1 |
| Correct, pass | `--go` | `#15803D` | `#4ADE80` | 4.7:1 |
| Wrong, prohibited | `--stop` | `#C1272D` | `#F87171` | 5.5:1 |

Tinted grounds `--amber-bg` `--blue-bg` `--go-bg` `--stop-bg` back their own signal only.

**Why amber stays the brand.** The app's primary buttons are amber. A visitor who
presses "درخواست دسترسی" on the site should meet the same button inside the product.
Blue carries *action semantics* (links, focus rings) where amber's warmth would fight
the ink; the two never compete for the same job.

---

## Typography

**Two families, two jobs.** Vazirmatn carries every Persian glyph; IBM Plex Sans every
Latin one. There is no third display face — the previous build used a condensed Latin
display that vanished the moment Persian was active, which is exactly how a
Persian-first product ends up with an English personality. Hierarchy here is weight,
size and rule-work, so it survives the language switch intact.

**Why Plex and not the usual neo-grotesque default.** Inter, Geist and their neighbours
are the convergent faces of the generated-UI look this redesign exists to get away
from. Plex earns its place on this page specifically: it was drawn as an
institutional/engineering face, which is the register of the *Codice della Strada*
text it mostly sets; its figures are strongly differentiated, and numerals are
load-bearing here (7,139 · €54 · 01–06); and its own Arabic sibling shares a skeleton
with Naskh, so pairing it with Vazirmatn is a structural relationship rather than a
coincidence.

| Token | Value |
|---|---|
| `--t-display` | `clamp(2rem, 1.28rem + 3.1vw, 3.35rem)` |
| `--t-h2` | `clamp(1.5rem, 1.18rem + 1.5vw, 2.15rem)` |
| `--t-h3` | `1.125rem` |
| `--t-body` | `1.0625rem` (17px) |
| `--t-sm` | `0.9375rem` (15px) |
| `--t-xs` | `0.8125rem` (13px) — **hard floor** |

**Persian:** body line-height `1.9`, headings `1.45–1.5`, `letter-spacing: 0` always.
**Latin:** body `1.65`, headings `1.08–1.35` with `-0.02em`.
`text-wrap: balance` on headings, `pretty` on paragraphs — the two languages break at
completely different points, so no hand-placed `<br>` can serve both. **There are no
`<br>`s in headings**, including the h1: a hard break balances at exactly one width in
exactly one language and strands a word on its own line everywhere else.

**Uppercase and letter-spacing are Latin devices.** Persian has no case, and tracking
severs its joined letterforms. The `.eyebrow` gains both under `html[lang="en"]` and
neither otherwise. Measure is capped at `--measure: 68ch`.

---

## Bidi

Persian prose here is full of Italian terms, Latin acronyms and figures. Every one is
isolated, or a stray `D1` reorders the sentence around it.

| Class | Use |
|---|---|
| `.lat` | Latin words inside Persian — `direction: ltr; unicode-bidi: isolate` + Inter |
| `.num` | Figures — isolated + `font-variant-numeric: tabular-nums` |
| `.it` | An Italian exam sentence, quoted as an official document |

`.it` reads as a document by **structure** — sunken ground, a 3px rule on its leading
edge, LTR-isolated — not by importing a typeface for a handful of strings. Because it
sets its own `direction: ltr`, its rule is always on the left in both page directions,
and its radius must stay flat on that same edge.

All layout uses logical properties (`padding-inline`, `inset-inline-*`,
`border-inline-start`) so RTL is the same code path, not a mirrored afterthought.

---

## Space, shape, elevation

Space: 4px base — `--s1`…`--s10` = 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
Sections use `--s9` desktop / `--s8` below 860px.

Radius: `--r-sm` 4 · `--r-md` 8 · `--r-lg` 12 · `--r-pill` 999. Nothing is a blob.

Elevation: `--lift-1` (nav, once scrolled) and `--lift-2` (menu panel, device frames).
Everything else is separated by `--line`. A card appears **only** where items are
genuinely parallel and independently scannable — features, plans, engineering notes.
Prose and sequences get rules instead.

---

## Components

| Component | Rule |
|---|---|
| Button | 48px min-height, pill, 1.5px border box. `.btn-primary` amber on ink; `.btn-secondary` transparent on a `--line-2` border. One primary per view. |
| Nav | Sticky, translucent, gains its rule + `--lift-1` only once it overlaps content. |
| Mobile menu | A native `<details>` disclosure — keyboard-operable and announced for free, and it still works with JS disabled. Closes on outside click, Escape, and item choice. |
| Language switch | Two real buttons with `aria-pressed`. 44px targets. Choice persisted; `?lang=en` also honoured. |
| Proof band | Rule-separated cells, not cards. Figures count up on arrival, in the reader's numeral system. |
| Device frame | Hairline plate + speaker bar. Restrained on purpose: it says "phone screen", it does not compete with its own contents. |
| Marks list | Circle + glyph (✓ / ✕) + label. Survives greyscale and colour-blindness. |
| Steps | A rule-separated `<ol>`: numeral · content · metadata tag. No cards. |
| Plan card | The recommended plan is marked by a 2px amber border **and** a text flag. |
| Callout | Tinted ground + icon + bold lead, for one genuinely important caveat per section. |

**Icons** are an inline SVG sprite: 24px grid, 1.75 stroke, round caps, one geometric
family, `currentColor`. Never emoji — emoji render in a different typeface on every
platform, ignore `currentColor`, and cannot carry a stroke weight.

---

## Motion

`IntersectionObserver` + a CSS transition. No animation library.

One effect with one job: mark that a section has arrived (`opacity` + 10px `translateY`,
450ms, staggered 60ms, fired once). The hidden state is armed by a `js` class the
script itself adds, so a browser that never runs it — or an observer that never fires —
shows everything normally. There is no failure mode where blocked JS leaves the page
at `opacity: 0`, and therefore no need for the safety timer the previous build required.

`prefers-reduced-motion: reduce` is honoured twice over: the script returns before
arming anything, and the media query force-shows regardless.

---

## Accessibility

- Every text/ground pair verified ≥4.5:1 (≥3:1 for large), in both themes. 13px floor.
- Focus is never removed: 2px `--blue` ring at 3px offset on `:focus-visible`.
- 44px minimum target for every control that reads as a button. (Inline text links take
  WCAG 2.5.8's inline exception but still carry vertical padding.)
- One `<h1>`; `<h2>`/`<h3>` nest without skipping. `<main>`, `<nav aria-label>`,
  `<header>`, `<footer>` landmarks. Skip link first in the tab order.
- Correct/incorrect never rests on hue: shape and label carry it.
- Images have `width`/`height` (no CLS) and language-aware `alt`.

---

## Performance

- Two font families, `display=swap`, preconnected.
- **Only** `fonts.googleapis.com` and `fonts.gstatic.com` may be fetched at runtime.
  Much of this audience browses from Iran where general CDNs are unreliable; the
  previous build pulled a ~1.3MB 3D runtime from unpkg and a scene from spline.design.
  A regression test enforces this.
- Hero image `fetchpriority="high"`; everything below the fold `loading="lazy"`.
- All CSS and JS inline in one document — no render-blocking subresource, no build step.

---

## Enforcement

`tests/landing-page.test.ts` guards the invariants that fail *silently*: the Telegram
deep-link redirect, the Persian-first document, translated-string pairing, image
dimensions and alt text, the allowed-origin list, and the no-emoji rule.
