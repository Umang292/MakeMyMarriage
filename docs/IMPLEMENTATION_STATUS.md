# PRD v1.2 — implementation status

This repository is an **MVP implementation baseline**, not a representation that every PRD acceptance criterion has passed. Status assumes MongoDB and optional external credentials are configured.

| Feature | Status | Notes |
|---|---|---|
| Register / login / verify email / reset password | Implemented | JWT HTTP-only cookies; development links displayed without SMTP |
| Wedding setup | Implemented | Four-step, India-only wizard; creates BRIDE and GROOM sides |
| Family invitations | Implemented | Single-use hashed token, verified-email match; parent/sibling roles |
| Family-side privacy | Implemented baseline | Endpoint side checks, finance denied to siblings; expand testing |
| Dashboard | Implemented | Tasks, countdown, guests, budget, pending photo counts |
| Events and dedicated album creation | Implemented | JOINT, BRIDE, GROOM; one album per event |
| Tasks, budgets, vendors, guest households | Implemented baseline | Create/list/update REST APIs; no CSV import yet |
| Household invitation URLs | Implemented | Hash & AES-GCM encrypted delivery capability; revocation |
| Invitation email sending | Implemented SMTP adapter | Needs real SMTP and deliverability QA |
| Email scheduled reminders | Implemented basic worker | Minute tick; RSVP skip; requires running backend |
| WhatsApp sharing | Implemented manual | Opens share composer; does not automatically deliver |
| Guest RSVP | Implemented | Per event, household headcounts; prevent unverified repeat edit |
| Invitation designer | Partial | Drag text, colors, undo/redo, save/publish, PNG export. Image blocks, rotation, layering, accurate PDF exports outstanding |
| Moderated photo galleries | Implemented baseline | Event folders, organizer approval; local encrypted? No: local private disk with authorized reads. Need external storage for deployment |
| Photo upload privacy | Implemented baseline | Sharp re-encode to strip EXIF, MIME validation; malware scanning pending |
| Live streaming | Implemented | Event-specific YouTube embeds, no direct hosting |
| AI assistant | Partial | Scoped backend context + optional AI provider; local guidance without credentials |
| Sharing grants across bride/groom | Pending | Joint events visible; configurable record-by-record finance/guest sharing is not implemented yet |
| Rich notifications / delivery webhooks | Pending | Email provider delivery/bounce events not yet tracked |
| Guest CSV imports, vendor invoice uploads, exports | Pending | To complete before business launch |
| Complete authentication E2E/penetration QA | Pending | Add automated Mongo integration tests / Playwright tests |
| Accessibility / multilingual full content | Partial | Responsive design; Hindi templates can be drafted by AI, translation coverage incomplete |
| Production deployment | Pending | Configure HTTPS, Mongo deployment, private cloud storage, monitoring |

## Prioritized next development iterations

1. Strengthen MongoDB data-level sharing grants and role-permission tests.
2. Invitation designer richer tools, image assets, print PDF export and responsive layouts.
3. Add CSV imports/exports, photo reassignment and moderation audit.
4. Real SMTP provider webhooks, bounced email suppression, idempotent retries, event-specific reminder policies.
5. Cloud object storage, signed image URLs, image malware scanning, backups and retention/deletion.
6. Full integration + security E2E tests, localization and deployment.

**Out of scope:** accommodation/travel, live physical guest attendance/check-in, vendor marketplace, automated WhatsApp sends, native app.
