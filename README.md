# Make My Marriage 💍

**A family-first Indian wedding planning web application** — MERN monolith, created from the approved **PRD v1.2**.

One repository, one Express application in production, one MongoDB database. Bride-side and groom-side workspaces are isolated by backend authorization. Invited guests **do not need accounts**.

> This is a **working-source MVP foundation**, not a production-certified launch. Some advanced PRD features are still to be completed; see `docs/IMPLEMENTATION_STATUS.md`.

## System requirements

- Node.js 20.19+ or 22+ and npm 10+
- MongoDB Community Server 7+ **or** Docker Desktop
- Visual Studio Code (optional)
- SMTP mail account for sending real emails (development works without one)
- AI API key only if you want generative AI (free offline suggestions otherwise)

## Windows: exact destination

The ZIP is structured for extraction into **your folder itself**, without an extra nested project folder:

```powershell
$destination = 'C:\Users\Lenovo\OneDrive\Desktop\Namastae AI\Project\Make my marriage'
New-Item -ItemType Directory -Force -Path $destination | Out-Null
Expand-Archive -Path "$env:USERPROFILE\Downloads\Make-My-Marriage-MERN.zip" -DestinationPath $destination -Force
Set-Location $destination
```

If you save the ZIP somewhere other than Downloads, change the `-Path` accordingly.

## 1. Configure backend

```powershell
Copy-Item .env.example .env
notepad .env
```

Change `JWT_SECRET` to a long random value (32+ characters). Example generator:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Update `JWT_SECRET` in `.env` with the generated value.

The default DB is local MongoDB: `mongodb://127.0.0.1:27017/make_my_marriage`.

### Start MongoDB

If Docker Desktop is installed:

```powershell
docker compose up -d
```

Otherwise start your installed MongoDB Windows service or point `MONGODB_URI` to your Atlas connection string.

## 2. Install and start

```powershell
npm install
npm run dev
```

Open **http://localhost:5173**. API: **http://localhost:4000/api/health**.

Vite proxies `/api` to Express in development, so all cookies remain same-origin to the browser.

### Production build (one deployed application)

```powershell
npm run build
npm start
```

After building, Express serves `public/` and `/api` on `http://localhost:4000`. Set `NODE_ENV=production`, `APP_URL=https://your-domain` and configure HTTPS, MongoDB, image storage, email service and monitoring before real users.

## Deploy to Vercel

The root `index.js` exports the Express application for Vercel, and `npm run build` writes the Vite frontend to `public/` for Vercel's CDN.

1. Import `Umang292/MakeMyMarriage` at [vercel.com/new](https://vercel.com/new) and deploy the `main` branch.
2. In the Vercel project settings, add these environment variables for Production (and Preview if needed):
   - `MONGODB_URI` — your MongoDB Atlas connection string. Do not commit it or share it in chat.
   - `JWT_SECRET` — a private random secret of at least 32 characters.
   - `NODE_ENV` — `production`.
3. Add `APP_URL` with your production Vercel URL if you use a custom domain. Optional email and AI integrations need their matching `SMTP_*` and `AI_*` variables.
4. Redeploy after saving environment variables.

The app's API uses the same Vercel deployment and MongoDB connection. Vercel Functions do not provide durable local file storage or a continuously running worker: photo uploads need a persistent object-storage provider, and scheduled reminder emails need a Vercel Cron route before those features are production-ready.

## 3. First-use test journey

1. Open `/register`, create an organizer account.
2. Without SMTP credentials, a **development-only verification link** is returned in the UI and logged in the API terminal. Confirm email ownership using it.
3. Sign in at `/login`.
4. Complete the four-step wedding wizard as the bride or groom owner.
5. Add ceremonies in **Wedding events**. Each event creates a unique photo album.
6. Add guest households to your own family side; create an invitation for selected functions.
7. Click **Share**, copy the secure invitation URL and open it in a separate browser/incognito window.
8. Complete guest RSVP; submit an event photograph; return as an organizer and approve it.
9. Enter planned expenses and vendor details; try the local AI planning tips.
10. Invite the other family owner from the wizard or a family member from **Family members**. Their invite link is logged to the API console in development without SMTP.

## Important: two kinds of invitations

- **Organizer invitations**: email-bound, single-use, expiring links; invitees **sign in and verify their email** to join bride or groom side as OWNER/PARENT/SIBLING.
- **Guest household invitations**: unique 256-bit bearer links; **no guest login**; invited functions, event RSVPs, moderated photos and YouTube video embeds. Store hashes in DB and encrypted delivery capability for email reminders; do not paste guest links into logs or public pages.

## Configuration

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: SMTP email delivery. Without credentials **development mode only**, links print to API terminal; email won't reach real recipients.
- `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`: optional OpenAI-compatible HTTPS chat-completions provider. No key or paid service included. Local suggestions available without AI setup.
- `MAX_UPLOAD_MB`: image size limit (default 8). Images are transformed into metadata-free JPEGs on the backend with `sharp`.

## Directory layout

```
client/                   React, Vite and responsive organizer/guest pages
server/src/index.js       Express app; serves React build in production
server/src/models.js      Mongoose schema definitions, indexes, scopes
server/src/routes/        Auth, weddings, invitations, photos, guest, AI
server/src/services/      SMTP provider and background reminder worker
server/tests/             Node built-in regression tests
docs/                     Feature status and development notes
```

## Tests

```powershell
npm test
npm run check
```

Full integration tests require a running MongoDB instance. Add real email delivery, session security and cross-side penetration tests before launch.

## Security / deployment warnings

- Don't commit `.env`. Set `APP_URL` to the correct deployed HTTPS origin and use a strong JWT secret.
- Outbound invitation emails require configured SMTP. SMTP `sent` does **not** imply delivered/read; webhook delivery tracking requires implementation with a provider.
- Photos use private, authorized Express file routes. For multi-instance hosting use **private cloud object storage** and signed URLs instead of local disk (ephemeral disks will lose uploads).
- Unlisted YouTube streams are **not confidential** and can be reshared externally.
- Guests holding a bearer link can read it; use link revocation for leaked tokens.
- Browser editor text can be moved and styled; complete advanced editing (image layers, crop, snap guides, high quality print PDF) is listed as unfinished.
- India-specific data protection and email consent requirements need legal review before public launch.
