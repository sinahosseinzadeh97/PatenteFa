# PatenteFa Web — "Scheda" Design System

> Source of truth for the **public website** (`public/index.html`) at patentefarsi.online.
> The Telegram Mini App has its own separate system in `design-system/patentefa/MASTER.md`.
> They share the logo (navy + traffic light, `public/img/brand/`) and a semantic vocabulary (go / stop), nothing else.

**Surface:** one page, no build step, no framework, no runtime dependency
**Primary language:** Persian (RTL), served as the document's own markup
**Secondary language:** English (LTR), a real alternate
**Audiences:** a Persian-speaking learner deciding whether to ask for access; secondarily
an engineering reader evaluating the work

Replaces "Segnaletica" (2026-09). Its tokens and accessibility rules were sound and are
kept. Its structure was not: every section was eyebrow → heading → card grid, with a
pulsing-dot pill badge, a two-tone headline, a count-up stat band and six
icon-in-a-tinted-square feature cards. Those are the convergent marks of a generated
landing page, and the owner read the page that way (2026-10-17).

---

## The premise

The page is an annotated exam sheet. The visitor answers one real statement from the
bank before reading a single claim, then the page takes that sentence apart the way a
teacher would: a **red pen** under what trips you up, an **amber highlighter** on the
phrase the answer hangs on. The product demonstrates itself instead of being described.

## Signature elements

| Element | Rule |
|---|---|
| Question card (hero) | A real bank statement (`segnali-pericolo/doppia-curva-destra/0`, VERO) with its real sign (`public/img/sign-doppia-curva-destra.png`, copy of sign 6) and the app's own Persian translation. Radios + `:has()`: works without JS, is a native radio group. Figure left, statement right, as on the ministerial screen. Answering grows the card downward only. |
| Paper stack | Two offset, rotated sheets behind the card. The only decorative depth on the page. |
| Red pen | `--pen`, a hand-drawn SVG stroke as a `data:` URI background. Used under one word per heading at most, and under glossed words in the specimen. |
| Specimen | The same Italian sentence set large in the display face, glossed with numbered footnotes (`counter(g, persian)` in Persian). |
| Exam form | Facts as a printed form (2px ink rules, labelled cells), split into what the product covers and what the exam asks. Not a stat band: no count-up. |
| Chat | Getting started is the bot's real conversation, quoted from `src/bot/commands.ts` without emoji. Change the bot text there and here together. |

## Explicitly rejected

Eyebrow labels above every heading · pill badges · two-tone headlines · count-up
numbers · icon tiles · uniform card grids · scroll-triggered fade-ins · glassmorphism ·
gradients · emoji as icons · the same skeleton for every section.

---

## Colour tokens

Light is the base; dark redefines tokens only. Contrast measured as text on `--paper`.

| Role | Token | Light | Dark |
|---|---|---|---|
| Page ground | `--paper` | `#F5F7FA` | `#0B1424` |
| Raised surface | `--surface` | `#FFFFFF` | `#111C30` |
| Recessed | `--sunken` | `#EAEEF4` | `#16233A` |
| Hairline / rule | `--line` / `--line-2` | `#DCE2EA` / `#B7C1CF` | `#22314B` / `#34476A` |
| Text | `--ink` / `--ink-2` / `--ink-muted` | `#0A0F1E` 17.8:1 / `#2E3A52` 10.6:1 / `#56617A` 5.8:1 | `#EEF2F8` / `#C5CEDD` / `#98A4BA` |
| Brand fill | `--brand` / `--on-brand` | `#0B2D52` / white (13.9:1) | `#8FB4EA` / `#0B1424` |
| Brand as text | `--brand-ink` | `#0B2D52` 13:1 | `#8FB4EA` |
| Highlighter | `--hl` | `#FFE27A` (the logo's amber light, behind ink only) | `#5C4A0E` |
| Action / focus | `--blue` | `#1B4FA0` 7.3:1 | `#8AB0F2` |
| Correct | `--go` | `#13703A` 5.7:1 | `#5BD68A` |
| Wrong / red pen | `--stop` | `#C1272D` 5.4:1 | `#F47C7C` |

The nav carries the logo (`<picture>` swaps `logo-dark.png` under dark mode).

The red pen's colour lives inside a `data:` URI, so it is defined twice (light and dark)
next to `--stop`. Change them together.

## Typography

| Family | Job |
|---|---|
| **Markazi Text** (500–700) | The voice. h1, h2, side headings, numerals in the form, prices, step numbers, the specimen. A Naskh book face by Borna Izadpanah, drawn for Persian, with a Latin companion, so one display face survives the language switch. |
| **Vazirmatn** | Persian body text. |
| **IBM Plex Sans** | Latin body text and every Italian exam sentence, which should look like an official screen, not a book. |

Persian: body line-height 1.9, headings 1.32–1.38, `letter-spacing: 0`. Latin headings
1.02–1.08. `text-wrap: balance` on headings, `pretty` on paragraphs; no `<br>` in headings.
Hierarchy comes from scale contrast (display ≈ 4.9rem against 1.0625rem body), not from
labels. 13px floor.

## Bidi

`.lat` isolates Latin runs inside Persian. `.fa-text` isolates Persian inside English
(the app's translation is shown in Persian in both languages). Italian sentences carry
`lang="it"` and an LTR box. A pure-Latin term on its own line inside RTL (glossary,
stack line) keeps `direction: inherit` so it aligns with its Persian neighbours.

## Layout

Each section has its own form: split hero; full-width specimen; sticky screen + steps;
staggered phones beside a sticky list; side heading + chat; included list + two fares;
colophon on a sunken ground. The side-heading split (`.split`, 4/7) is used where it
helps, not everywhere. Section rhythm `--section` = clamp(72px … 136px).

## Pricing

Approval is the only gate in the product (`src/index.ts`); both plans unlock everything.
The page shows one "included" list and two durations. It must not imply a plan adds
features unless the code gates them.

## Motion

One animation: the answer panel's 300ms arrival. No scroll reveals, no count-ups.
`prefers-reduced-motion` removes it.

## Accessibility

≥4.5:1 text in both themes · 2px `--blue` focus ring, never removed (radios ring their
label) · 44px targets · right/wrong carried by icon + words, never hue alone · one `h1` ·
skip link · images sized and described in both languages · `aria-live` on the answer
panel.

## Performance

Only `fonts.googleapis.com` / `fonts.gstatic.com` at runtime (much of the audience
browses from Iran). All CSS/JS inline. Below-the-fold images `loading="lazy"`.

## Enforcement

`tests/landing-page.test.ts`: Telegram redirect first, Persian-first markup, paired
translations, image dimensions + bilingual alt, allowed origins, no emoji.
