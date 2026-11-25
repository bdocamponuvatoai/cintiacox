# Validation

## November 25, 2026: gallery redesign

Checked with system Chrome driven by playwright-core, reduced motion on, against the dev server and a local production build.

- Every route (16, including the 404) at 1440 and 390 px, and the busiest routes at 320 and 768 px: no horizontal overflow, no photo rendered wider than its native pixels, no console errors or hydration warnings.
- 34 scripted behaviour checks pass: menu open, Escape (focus returns to the toggle), close on desktop resize and on navigation; portfolio search, type filter, price sort, empty state and clear; saved homes, header count and persistence across reload; contact presets from saved homes, a property, an area, and the move plan; validation, the exact `mailto:` href and copied text; planner URL presets, focus on the step heading, Back keeping answers, summary and tasks; language tabs; FAQ; the homepage index swapping its photo on focus.
- Eight backend tests pass. Server build and static preview export succeed; the export check verifies 28 HTML pages and 1,211 local link/asset references.
- Text colours meet WCAG AA (lowest: `--ink-3` on `--stone`, 4.93:1); input borders meet 3:1.
- Page weight on the production build, first load: home 1.2 MB (1440 px at 2×) and 1.4 MB (390 px at 3×); portfolio 0.94 MB and 1.2 MB. Photos are rendered by a client component so link prefetching does not download other pages' full-size photos.
- No email was sent and no appointment was booked during verification.

## November 24, 2026: first concept

- Next.js production server build and isolated static export completed with TypeScript checking.
- Eight backend tests pass: unconfigured delivery, origin enforcement, email/consent validation, honeypot rejection, body-size bound, rate limit, configured-recipient plain-text delivery, and provider failure.
- Desktop Chromium reviewed the homepage, destination photography, property cards, logo, and navigation.
- Narrow-layout QA used 390 px and 320 px iframe viewports (375/305 px document area after the browser scrollbar). Home, planner, and contact pages had no horizontal overflow in these checks. Mobile menu opened and closed correctly.
- Portfolio text filtering and recorded-price sorting returned the expected two Boca Raton properties in ascending order. Save, reload persistence, and removal were exercised.
- The relocation planner was exercised with Outside the U.S., Boca Raton, Portuguese, a budget, and timing. Those selections appeared correctly in the contact message.
- Contact form prepared a visible inquiry draft and copied it successfully. No emails or appointment bookings were sent during verification.
- Original Compass SVG syntax and card-button stacking were corrected after visual QA. Global animated scrolling was removed to keep focused controls predictable.
- Export checker verifies rendered H1 headings and all local href/src targets. No live MLS/IDX, actual email delivery, or public search indexing is claimed by this preview.

Browser checks cover representative journeys and widths, not every device or a formal accessibility certification. Before public launch, perform business-content and brokerage review and connect approved live services.
