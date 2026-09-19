# Department Feedback & Suggestion System

A single-repository Vercel application for anonymous university department feedback. Students submit only programme, session, class, level, feedback type, and a message. Administrators securely review, filter, analyse, delete, and export feedback.

## Stack

- React, TypeScript, Vite, and Tailwind CSS
- Vercel Serverless Functions under `api/`
- Neon PostgreSQL through `@neondatabase/serverless`
- Recharts and Lucide React
- Zod validation, bcrypt password hashing, and signed HTTP-only cookies

## Local setup

1. Copy `.env.example` to `.env` and set a Neon `DATABASE_URL`, a random `AUTH_SECRET` of at least 32 characters, and initial admin variables. The migration and seed commands load this local `.env` automatically.
2. Install dependencies: `npm install`.
3. Apply the schema: `npm run db:migrate`.
4. Create/update the administrator account: `npm run db:seed-admin`.
5. Start the frontend with `npm run dev`. For local API emulation, use the Vercel CLI (`vercel dev`) after installing it globally.

## Deploy to Vercel

1. Push this repository to your Git provider, then import it in Vercel.
2. Add `DATABASE_URL` and `AUTH_SECRET` in **Project Settings → Environment Variables**. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` temporarily only if seeding from a Vercel-safe environment; do not leave the admin password variable in production after setup.
3. From a trusted local machine with those environment variables set, run `npm run db:migrate` and `npm run db:seed-admin` once against the production Neon database.
4. Deploy. Vercel discovers the Vite frontend and the files under `api/` as serverless functions. `VERCEL_ENV` is supplied by Vercel and enables the `Secure` cookie flag in production.

## Security notes

- Student submissions are anonymous: the app neither asks for nor stores identifying data.
- Admin-only API routes verify a signed, HTTP-only, `SameSite=Strict` session cookie on the server.
- API inputs are validated on the server and database values are parameterized.
- Keep `.env` private. Do not expose database URLs, the auth secret, or password hashes.

## Project structure

- `api/` — Vercel serverless API endpoints and shared server helpers
- `database/migrations/` — PostgreSQL schema
- `database/seed/` — one-time admin seed script
- `public/assets/` — supplied official logos, copied unchanged
- `src/` — mobile-first React interface
