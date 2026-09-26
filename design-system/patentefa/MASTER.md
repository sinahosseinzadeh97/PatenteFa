# PatenteFa — Product Design System

> Global source of truth for the Persian Telegram Mini App. Page-specific files under `pages/` may override these rules only when a real product need requires it.

**Product:** Italian driving-theory study and exam practice  
**Primary context:** one-handed mobile use inside Telegram  
**Primary language:** Persian (RTL); Italian learning content is isolated LTR  
**Design dials:** variance 4/10 · motion 3/10 · density 6/10

## Product principles

1. The current learning task is always visually dominant.
2. One obvious primary action per screen; secondary actions stay quiet.
3. Progress, selection, correctness, and errors use text or icons as well as color.
4. Spacing and typography create hierarchy; cards are reserved for real groups.
5. Persian reads naturally in RTL. Every Italian sentence uses `dir="ltr"` and bidi isolation.
6. No decorative gradients, floating shapes, ambient motion, or emoji-based controls.
7. The interface should remain comfortable through long study sessions.

## Color tokens

| Role | Token | Value | Use |
|---|---|---:|---|
| App background | `--bg` | `#14151A` | Asphalt canvas |
| Primary surface | `--surface` | `#1D1F25` | Navigation, grouped content |
| Raised surface | `--surface-2` | `#252831` | Inputs, selected/raised areas |
| Strong border | `--border` | `#393D49` | Controls and grouped regions |
| Subtle border | `--border-subtle` | `#2B2E37` | Row separation |
| Primary text | `--ink` | `#F2F0EB` | Main Persian/Italian content |
| Secondary text | `--ink-muted` | `#B2B6C3` | Supporting labels; AA on dark surfaces |
| Correct / VERO | `--go` | `#23824A` | Correct answer and success only |
| Incorrect / FALSO | `--stop` | `#C83D43` | Wrong answer and destructive only |
| Focus / selected / premium | `--amber` | `#E8A33D` | Primary action and current state |

Color never carries meaning alone. Correct/wrong UI must include a check/cross icon and explicit text. Amber is the interaction accent; green and red are reserved for semantic outcomes.

## Typography

- Persian chrome and explanations: **Vazirmatn**, weights 400/500/600/700.
- Italian question/body content: **Public Sans**, weights 400/500/600/700.
- Compact Latin counters and route-like labels: **Barlow Condensed**, weights 600/700.
- Body: 16px minimum, line-height 1.65 Persian / 1.6 Italian.
- Italian question: `clamp(1.16rem, 4.8vw, 1.45rem)`, line-height 1.65.
- Supporting text: never below 12px; default 13–14px.

## Geometry and spacing

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
```

- Mobile page gutter: 16px; 20px from 430px upward.
- Minimum tap target: 44×44px; primary actions: 52px high.
- Cards use 12–16px radius, a 1px border, and no glow.
- Avoid nested cards. Flat rows with dividers are preferred for lists.
- Main content is capped at 720px; exam content at 680px; desktop remains a centered app preview rather than a stretched dashboard.

## Shared component contract

- **App shell:** safe-area aware; no horizontal overflow; bottom-nav clearance built into every root screen.
- **Top bar:** 52–60px, sticky when progress or navigation must remain visible. RTL back control sits on the right and points right.
- **Page title:** one `h1`, 24–28px Persian, concise supporting line when needed.
- **Buttons:** primary amber; secondary neutral outline; semantic green/red only for answer choices/outcomes; destructive red outline.
- **Bottom action dock:** sticky, opaque enough for readability, respects bottom safe area, never overlaps content.
- **Question counter/timer:** tabular Latin numerals, persistent in the exam header.
- **Answer choices:** at least 56px tall, strong labels, persistent selected state, check/cross plus semantic copy.
- **AI help:** progressive disclosure after the question; tabs separate translation, theory, and grammar/vocabulary.
- **Forms:** visible labels, 16px input text, inline help/error, correct keyboard hints.
- **Toast:** `role="status"`, short, above bottom navigation/action docks.
- **Empty/error/loading:** state title + clear next step; errors are announced with `role="alert"`.
- **Modal/sheet:** close control in the RTL-leading corner, focus-visible, safe-area padded, maximum 90dvh.

## Core learning flow

### Exam question

Header: exit · question counter · timer · bookmark, followed by the road progress strip. The Italian question and sign image come first. Audio and AI help are secondary utilities below the question. The answer dock remains reachable at the bottom.

Feedback must not move the question. Reserve feedback space in the dock; after a persisted answer show:

- selected answer;
- correct answer;
- explicit `درست` / `نادرست` text;
- next action.

### Results

Show score and pass/fail first, then correct/wrong/unanswered counts, then one recommended next action. The detailed question list is flat and scannable. Translation and explanation expand within the related row.

### Learning explanations

Use distinct, lightweight sections: Persian translation, answer/rule explanation, theory, grammar, vocabulary. Italian source remains visually primary and LTR. Long prose uses 65–75 characters per line on larger screens.

## Motion

- 150–240ms for controls, sheets, and screen transitions.
- Road marker moves only when an answer is recorded.
- Answer/result reveal may use one short semantic transition.
- No list-wide repeated entrance animation.
- `prefers-reduced-motion: reduce` removes transforms, smooth scrolling, and pulsing.

## Accessibility and responsive checks

- Visible `:focus-visible` ring on every interactive element.
- 4.5:1 contrast for body text; 3:1 for large text and control boundaries.
- No zoom suppression in the viewport meta tag.
- Safe areas include Telegram SDK insets and CSS `env()` fallbacks.
- Test 375, 390, 430, 768, and desktop widths.
- At every width: no horizontal scroll, clipped buttons, hidden question number, or content beneath fixed controls.
- Keyboard: logical focus order, Escape/back behavior where supported, no traps.
- Images have meaningful Persian alt text; status/error regions are announced.

## Anti-patterns

- Emoji used as control icons.
- Marketing-style gradients/glows or giant rounded cards.
- Tiny gray-on-gray labels.
- AI help placed above the question.
- Placeholder-only form labels.
- Six-item mobile bottom navigation.
- Color-only answer feedback.
- Automatic decorative motion or hover-only affordances.
- Long guides expanded by default.
