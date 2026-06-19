---
description: Build the Vite frontend and deploy it to Vercel as a static site
---

Deploy this project's frontend to Vercel.

Scope: this repo also contains an Express backend (`server/`) using better-sqlite3 for
auth/scores. Vercel does not run a persistent Express server or a local SQLite file, so
this command deploys **frontend only** (the static game build). Login/score-saving
features will not work on the deployed URL until the backend is separately migrated to
serverless functions + a hosted database.

Steps:

1. Confirm `vercel.json` exists at the repo root with:
   - `buildCommand`: `npm run build`
   - `outputDirectory`: `build`
   If it's missing or out of date, create/update it to match.
2. Run `npx vercel whoami` to check login status. If not logged in, run `npx vercel login`
   and let the user complete auth in the browser.
3. Run `npx vercel --prod --yes` from the repo root to build and deploy.
4. Report back the production URL Vercel prints in the output.

Do not modify `server/` code or attempt to deploy the backend as part of this command —
that's a separate, larger task (serverless conversion + DB migration) and should only be
done if explicitly requested.
