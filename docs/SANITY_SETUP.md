# Connecting the CMS (one-time technical setup)

The site already has a full Sanity Studio built in at **`/studio`** and content
models for everything editable. Until a Sanity project is connected, the site
falls back to the bundled content in `lib/content.ts`, so nothing breaks.

Follow these steps once to switch live editing on.

## 1. Create the Sanity project (centre's account)

1. Go to **sanity.io** and sign up with the centre's email (e.g.
   `office@munrocentre.com`) so the centre owns it.
2. Create a new project named **The Munro Centre**, dataset **`production`**
   (public).
3. Copy the **Project ID** (Manage → API, or the URL).

## 2. Add environment variables

Create `.env.local` (copy from `.env.example`) and, more importantly, add the
same variables in **Vercel → Project → Settings → Environment Variables**:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_WRITE_TOKEN=<editor token>   # local only, for seeding
```

Create the write token in **Manage → API → Tokens** with **Editor** permission.

## 3. Allow the site to talk to Sanity (CORS)

In **Manage → API → CORS origins**, add:
- `http://localhost:3000` (dev)
- your production URL, e.g. `https://www.munrocentre.com`

## 4. Migrate the existing content + images

With the env vars set locally, run once:

```bash
npm run seed
```

This uploads every photo in `/public/images` and creates the Homepage, Site
settings, rooms, educators, testimonials, FAQs, features and trust-bar entries —
so the Studio opens fully populated with the current site content.

## 5. Turn on instant updates (recommended)

The site **already reads published content from Sanity** — every section fetches
through `lib/sanity/get-content.ts`, with an automatic fallback to the bundled
content. No code changes are needed; edits appear within ~60 seconds on their
own. To make them appear within a *second*, add a publish webhook:

1. Choose a random secret and set it as `SANITY_REVALIDATE_SECRET` in
   **Vercel → Settings → Environment Variables** (redeploy after adding it).
2. In **Manage → API → Webhooks**, create a webhook:
   - **URL:** `https://www.munrocentre.com/api/revalidate`
   - **Dataset:** `production` · **Trigger on:** Create, Update, Delete
   - **HTTP method:** POST · **API version:** `v2024-10-01`
   - **Secret:** the same value as `SANITY_REVALIDATE_SECRET`

On publish, Sanity calls the webhook and the homepage refreshes on the next
visit. Without it, the 60-second time-based refresh still applies.

## 6. Hand over

- Give staff the link **`https://www.munrocentre.com/studio`** and invite them
  in **Manage → Members** as **Editor**.
- They log in with email — no code, no GitHub, no Vercel.
- Share `docs/EDITING_GUIDE.md` with them.

## Notes
- Public content is fetched on the server and cached by Next.js (tagged + 60s
  revalidation), so reads stay fast and update without a redeploy.
- Never expose `SANITY_API_WRITE_TOKEN` or `SANITY_REVALIDATE_SECRET` to the
  browser (no `NEXT_PUBLIC_` prefix).
- The Studio is at `/studio` and is excluded from the marketing layout.
- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` must be set in
  Vercel for production. Until they are, the live site renders the bundled
  content — so deploying is always safe, even before Sanity is connected.
