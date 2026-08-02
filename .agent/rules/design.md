# PatenteFa — Design System Addendum ("In viaggio" — the open road)

> Read alongside strategy.md, architecture.md, features.md, build-plan.md in `.agent/rules/`. This file defines the visual/interaction identity for the whole app — apply it to every existing screen during this pass, not just new ones, so the whole app feels like one coherent product instead of a collection of screens.

## Why this exists

The app is functionally working but doesn't feel good to use yet. This is a deliberate design identity, not a generic "make it nicer" pass — every choice below is grounded in the actual subject matter (Italian road signage + a bilingual Italian/Persian identity), not a default template.

## Palette

- Background (asphalt): `#14151A`
- Ink / primary text: `#F2F0EB`
- Go / correct / VERO: `#1B7A3D` (autostrada green)
- Stop / wrong / FALSO: `#C1272D` (road-sign red)
- Accent (streaks, highlights, bookmark): `#E8A33D` (reflective road-paint amber)
- Muted surface (cards, inputs): `#1F2128`

Green-white-red carries double meaning here — it's both flags at once (Italy vertical, Iran horizontal), and it's also literally the palette of Italian road signage (red = danger/prohibition, green = direction/go). Lean into that; don't treat it as a one-time joke to explain and forget.

## Typography

- Latin/Italian display & headers: **Barlow** (condensed weight for headers reads like signage lettering without literally ripping a road-sign font)
- Latin/Italian body: **Public Sans** — high legibility for the actual exam statements; this is text someone needs to read correctly under a countdown timer
- Farsi (all Persian UI + translations): **Vazirmatn** — modern, well-hinted, wide weight range, pairs cleanly with the above without clashing
- Never fall back to a system-default sans for either script; both are free/open and easy to self-host or load from a CDN

## Bidi handling (a real bug, not just polish)

Persian is RTL, Italian is LTR, and they sit side by side constantly (question in Italian, translation in Farsi, on the same screen). Set `dir="rtl"` on the Farsi-primary shell, but wrap every embedded Italian string (question text, sign captions, topic names) in `dir="ltr"` / `unicode-bidi: isolate` so it never gets mangled mid-sentence. Test with a question that ends in punctuation — that's where bidi bugs usually show up first.

## The signature element: the road

Replace the flat progress bar in the exam runner with a horizontal dashed center-line strip (a road, not a generic progress bar) that a small marker travels along as the user answers each of the 30 questions, reaching a checkered finish at Q30. This is the one place to spend the "boldness budget" on — keep everything else around it quiet and disciplined instead of animating everywhere.

## Motion — orchestrated, not scattered

Pick these 3 moments and do them well; skip ambient/decorative motion everywhere else:

1. The road marker nudges forward on each answer — the core feedback loop, this is the one to get right.
2. Correct/wrong reveal on the results screen: a brief "sign flip," the statement flips like a road sign turning to reveal green (go/correct) or red (stop/wrong) — not a generic checkmark/x fade.
3. Screen-to-screen transitions slide horizontally (like moving forward on a route), not a generic fade/scale.

Respect `prefers-reduced-motion` — fall back to instant state changes when it's set.

## Copy voice

Plain, second person, active voice, no filler, in Farsi for all UI chrome:

- Results: "۲۷ از ۳۰ — قبول شدی" — not "امتیاز: ۲۷"
- Empty vocab list: invite action ("هنوز لغتی ذخیره نکردی — از یه سؤال شروع کن") — not a flat "چیزی نیست"
- Errors explain what happened and what to do next; never apologize, never stay vague

## New features to build in this pass (using the design language above from the start, not retrofitted after)

1. **Weak-topic focused practice** — pulls only from the 2-3 topics with the worst accuracy (see features.md §11). Entry point: a card on the dashboard, not buried in a menu.
2. **Road-sign flashcard mode** — flip-card practice for signage questions specifically (see features.md §11), reusing the spaced-repetition interval logic already defined for `vocab_items` in architecture.md.

## Scope of this pass

Apply the palette/type/motion/copy system to every existing screen — dashboard, exam runner, results, review, vocab, stats — not just the two new features. A half-restyled app feels worse than a consistent plain one.
