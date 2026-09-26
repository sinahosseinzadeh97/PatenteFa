# Admin Page Overrides

> **Project:** PatenteFa  
> **Page:** Private operator dashboard  
> These rules override `../MASTER.md` only for the authenticated admin surface.

## Product intent

- This is an operator tool, not a learning screen. Prefer fast scanning, exact numbers, and clear controls over spacious presentation.
- The admin markup is loaded only after the server confirms the Telegram user is an admin. Every data and mutation endpoint remains server-protected.
- Telemetry records semantic controls and normalized pointer position. Never record form values, support-message text, translated content, or keystrokes.

## Layout and density

- Keep the mobile-first 16px gutter, but allow the dashboard to expand to `1120px` on desktop.
- Use a compact KPI grid, then API breakdown, user management, and recent event stream.
- User records become cards on narrow screens and a denser multi-column grid on larger screens; do not require horizontal page scrolling.
- Use 8–16px internal spacing for dense data regions. Preserve 44px minimum interactive targets.

## Data presentation

- Always pair charts or bars with exact numbers and text labels.
- Show freshness explicitly (`همین الان`, relative time, or full timestamp in detail views).
- Membership status includes text: pending, active-unlimited, active-until-date, expired, or blocked. Color is supplementary.
- Click telemetry is rendered as `screen → control/action` with time and optional normalized position; raw JSON is not the primary UI.
- API usage shows calls, tokens, estimated cost, model, action, and timestamp where detail is available.

## Visual and interaction rules

- Retain the Master palette and Vazirmatn/Public Sans/Barlow typography. Do not introduce navy/grey replacement tokens.
- Motion is limited to sheet/modal state and short control feedback; live data does not auto-animate.
- Destructive access changes require a clear action label and confirmation.
- Search/filter state remains usable on mobile and uses server-side filtering.
- Loading, empty, forbidden, and stale states have explicit Persian copy and a recovery action where applicable.

## Responsive and accessibility checks

- Verify at 375, 768, 1024, and 1280px with no horizontal viewport overflow.
- Status, cost, and activity summaries remain understandable without color.
- Dialogs expose labelled headings, close controls, Escape behavior, and restore focus to their trigger.
- Tables/charts have a visible text or list equivalent; tooltips are never the only source of a value.
