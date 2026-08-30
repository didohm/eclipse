# ECLIPSE

Premium, light-first website for ECLIPSE — ESGEN’s scientific and digital student club.

## Start locally

1. Copy `.env.example` to `.env.local` and add Firebase Admin, Cloudinary, and admin-session values.
2. Run `npm install`.
3. Run `npm run dev`.

The public site works without configuration, using honest empty states until Firestore content is published. Firestore powers the `leaders`, `events`, and contact `messages` collections. Event dates are stored as `YYYY-MM-DD` strings, so the dynamic newest-first query requires no composite Firestore index.

## Content flow

1. Go to `/admin` and authenticate with `ADMIN_PASSWORD`.
2. Add leaders or events; images are sent to the protected server route and uploaded to Cloudinary.
3. Public pages read the Firestore collections server-side. The home page selects its three latest events from the date-sorted collection.

Never expose values from `.env.local`; it is intentionally ignored by Git.
