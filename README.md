# Cintia Cox · Real estate in Boca Raton and the Palm Beaches

A complete Next.js App Router real estate website and private design preview for Cintia Cox at Compass. The experience focuses on Boca Raton and the Palm Beaches, with a practical journey for domestic and international buyers.

## Run locally

Requirements: Node.js 22.14+ or 24 LTS, npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open the local URL printed by Next.js. Credentials are not needed to browse, save property references, build a move plan, or prepare an inquiry draft.

## Build and serve

```bash
npm run test
npm run build
npm run check
npm start
```

`npm run build` produces two outputs: the full server application in `.next/` and a standalone design preview in `out/`. The preview build is isolated in `.preview-build/` so it does not remove the server route handlers from the source or overwrite the production server build.

- `npm run build:server` — build only the full Next.js server.
- `npm start` — serve the full server on port 3000.
- `npm run build:preview` — export the static preview with inquiry draft mode.
- `npm run preview` — serve the included static `out/` export locally.
- `npm run test` — backend unit tests with mocked delivery; no real emails.
- `npm run check` — verify exported page headings and local links/assets.

- `node scripts/make-variants.mjs` — regenerate the 960px photo copies after adding or replacing a photo.

## Repository and CI

The repository holds source, lockfile, assets, tests, configuration examples, and documentation. Generated output (`.next/`, `out/`, `.preview-build/`), dependencies, and every `.env*` file except `.env.example` are ignored.

GitHub Actions (`.github/workflows/ci.yml`) runs on every push to `main` and every pull request: `npm ci`, backend tests, the full build (server and static preview, with type checking), the export check, and an audit of production dependencies. Dependabot (`.github/dependabot.yml`) proposes npm updates weekly and GitHub Actions updates monthly. Node.js 24 is pinned in `.nvmrc`.

## Experience

- Gallery-style design: Newsreader for display and reading, Hanken Grotesk for interface text, white pages with framed photo plates, and a typographic portfolio index on the homepage.
- Real photography only: Cintia’s portrait, past-property photos from Compass, and credited area photos. The AI-generated lifestyle images from the first concept have been removed.
- Original Compass wordmark on every page.
- Four destination guides with source links and photo provenance.
- Six past-property references, property details, text/type filters, recorded-price sorting, and saved references.
- Three-step relocation planner with local persistence, downloadable plan, and an inquiry handoff.
- English, Spanish, and Portuguese introduction panels and preferred contact language; the entire site is not machine-translated.
- Seller, advisor, journal, privacy, accessibility, contact, and useful not-found pages.
- Server inquiry endpoint with validation, consent, origin checking, honeypot, bounded payloads, request timeout, and rate limiting.

## Enable email delivery on a server host

The provided static Sites preview intentionally does not run the email API. Deploy the source to a Node-compatible Next.js host to use the backend. Set these runtime variables in the hosting dashboard; never commit secrets:

| Variable | Purpose |
| --- | --- |
| `APP_ORIGIN` | Exact HTTPS website origin, without a trailing slash. |
| `RESEND_API_KEY` | A valid Resend sending API key. |
| `INQUIRY_FROM` | Sender address on a verified Resend domain. |
| `INQUIRY_TO` | Approved inbox; example defaults to cintia.cox@compass.com. |
| `TRUST_PROXY` | Leave `0` unless the host overwrites forwarded IP headers reliably. |
| `NEXT_PUBLIC_PREVIEW_MODE` | Use `0` for a server build; the static build forces `1`. |

The form checks `/api/contact-config/` for delivery readiness. With incomplete configuration, it prepares a visible draft and offers an email-app link or copy action. It never reports an unsent email as delivered. With complete configuration, `/api/inquiries/` sends plain text through the Resend HTTP API. A successful provider receipt means submission was accepted, not that the recipient read or received it. Provider failures show an honest fallback.

Rate limits are in memory and scoped to the running process. With `TRUST_PROXY=0`, a shared conservative bucket is used. For public high-traffic deployment, use a durable edge/platform rate limiter and trusted proxy configuration. No database, user accounts, or marketing automation are included. Contact messages are not written to application storage or logs. Saved homes and move-plan preferences stay in the visitor's browser; contact fields do not persist.

## Content and publication

This is a private proposal, not a live brokerage listing service. Property records are past transactions and historical prices, not offers or available inventory. No MLS/IDX integration, verified appointment scheduling, mortgage calculator, or payment flow is represented. The supplied sales appointment has not been added to the website or calendar.

Before an authorized public launch, confirm current biography/property facts, brokerage disclosures, brand and photo usage rights, destination-image licenses, privacy text, and the preferred sender/inbox with the business. Obtain an approved IDX/MLS integration if current inventory is needed. Update `app/layout.tsx` from its deliberate `noindex` preview setting only after public content approval.

## Project map

- `app/` — routes, metadata, server API handlers, and `app/styles/` (design tokens, base, chrome, components, forms, page layouts; imported in order from `globals.css`).
- `components/` — navigation, property browsing, forms, planner, and shared UI.
- `lib/content.ts` — editable advisor, area, historical-property, FAQ, and journal content.
- `lib/inquiries.ts` — testable backend validation and delivery handler.
- `public/` — photography (each photo wider than 960px has a `-960` copy made by `node scripts/make-variants.mjs`), original wordmark, and proposed favicon.
- `docs/` — content sources, image provenance, and validation notes.
- `scripts/` — server/static build tooling and export verification.
- `tests/` — meaningful backend failure/success tests.

Newsreader and Hanken Grotesk are SIL Open Font License fonts, loaded with `next/font/google` and self-hosted at build time. Compass marks, Cintia's photograph, destination photographs, and property images remain with their respective rights holders. This package does not grant trademark or third-party image rights.
