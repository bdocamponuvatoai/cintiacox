# Source and content notes

Reviewed November 24, 2026. Copy is newly written for the concept, with the single short testimonial excerpt below attributed to its original source.

## Advisor and brokerage

Primary: https://www.compass.com/agents/cintia-cox/

Used for name, title, business phone/email, English/Spanish/Portuguese languages, buyer/listing/relocation specialties, corporate sales background, personal Boca Raton context, portrait, original Compass wordmark, and selected past transactions. The reference to twenty years on the source concerns corporate sales experience, not a claimed real estate career length. No such numerical experience claim is made in this design.

Short testimonial used: “Cintia took full charge, dotted every I and crossed every T, and the entire transaction was painless with zero issues.” It is attributed to a client testimonial published on Compass; no reviewer identity or star rating has been invented.

Secondary agent profile: https://www.bocaratonrealestate.com/agents/cintia-cox/
This profile linked to https://www.bocaflrealestate.com/, whose content could not be retrieved in this session. The official Compass profile was the primary reference.

## Areas

- Boca Raton: https://www.thepalmbeaches.com/explore-cities/boca-raton
- Delray Beach: https://www.thepalmbeaches.com/explore-cities/delray-beach
- Palm Beach: https://www.thepalmbeaches.com/explore-cities/palm-beach
- Highland Beach: https://highlandbeach.us/

Descriptions focus on geography, public destinations, architecture, and activities. No school rankings, demographic targeting, safety claims, commute guarantees, or investment forecasts are made. Highland Beach's card uses the view from a past property record, identified accordingly.

## Property records

Six examples and their original record/profile links are in `lib/content.ts`. All are presented as past transactions, never current inventory. The original profile's active/rental status was not adopted as a live feed. Historical prices, sizes, and bedroom/bathroom counts require business review before a public launch.

## Image records

`original-assets.json` records the downloaded original URLs and resulting local assets. The Compass SVG paths were extracted from the official profile and normalized to valid standalone SVG syntax; the artwork was not redrawn. Cintia's portrait and property photos are real source images. The C favicon is a proposed personal monogram, not an official Compass icon. The AI lifestyle assets from the first concept were removed in the November 25, 2026 redesign; see `generated-assets.md` for the history note.

## Technical references

Next.js App Router route handlers and static exports were checked in the installed Next.js documentation. Email delivery follows https://resend.com/docs/api-reference/emails/send-email and uses a fixed configured recipient with a validated reply-to address.
