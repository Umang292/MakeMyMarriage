# Make My Marriage — MERN Monolith Architecture

## Single deployment

```
Browser (React + Vite SPA)
        |
   /api HTTP + cookie
        |
Express/Node application ------- MongoDB (Mongoose)
        |   |    |    |
       SMTP AI  Private Images  Cron Reminder Worker
```

In development React runs on port 5173 while Express runs on port 4000. Vite proxies `/api`. In production `npm run build` creates `client/dist` and Express serves **both** the UI and API from one web service.

## Database relationships

```
User --< WeddingMember >-- Side (BRIDE or GROOM) >-- Wedding
                 |                                 |       |
             role/permissions                  Budget   Event (BRIDE/GROOM/JOINT)
                                               |       |
                                             Expense  Album (unique event)
                                                       |
                                                      Photo
Side --< Household --< Invitation >--< Event (allowed events)
                              |
                             RSVP (unique invitation,event)
                              |
                            EmailJob
```

All family-owned data uses `wedding` and `side` references. Backend permission middleware loads an authorized membership, checks role, and scopes every query to the selected side. A JOINT ceremony does **not** imply visibility of private tasks, budgets, guests or images. The current MVP does not yet support fully configurable selective sharing grants, so no other-side private records are exposed.

## Roles

- OWNER: One side owner; can manage their side and invite parents/siblings.
- PARENT: Side manager for guests, finances, invitations, events and media.
- SIBLING: Limited tasks and invitation link sharing; cannot access side budgets, expense records, full household guest data or vendor list.
- GUEST: No account; an unguessable household bearer link provides read, RSVP and invited-event photo actions.

## Security and decisions

1. Organizer sessions use signed JWT HTTP-only cookies; server re-checks MongoDB side membership each request.
2. Organizer invitation tokens are hashed and accepted exactly once after verified email match.
3. Household bearer tokens are stored as SHA-256 hashes for verification, and AES-256-GCM encrypted for outbound reminders. Never expose tokens in logging.
4. Event photo albums are a unique event record. Physical storage uses randomized keys, *never* guest-provided filenames. Images are re-encoded to JPEG without original EXIF metadata.
5. RSVPs are one response per event per household; repeat edits require organizer intervention until an OTP flow is implemented.
6. Email reminder cron worker is in the Express process; queue job idempotency keys prevent duplicate application scheduling. Use an external persistent queue before scale-out.
7. Live stream is a YouTube embed per event, not first-party streaming. Unlisted streams aren't confidential.
8. AI receives only data authorized to the current side/role and does not mutate data or send email.

## Priority order

Auth → four-step wedding creation → second-side owner invite → dashboard → events/tasks/family → budgets/guests/vendors → invitations/RSVP → moderated event albums → streaming/AI → advanced features and production QA.

## Deployment caveats

Single-host local disk image storage is appropriate for prototyping only. Use S3-compatible private object storage for production, enable DB backups, inspect email sender reputation and provider webhooks, add legal privacy notices and consent handling, and run cross-side authorization integration tests.
