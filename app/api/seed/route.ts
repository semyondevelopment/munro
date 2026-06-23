/**
 * One-time, browser-based content import — so connecting the CMS needs no
 * terminal at all.
 *
 * Setup: set SANITY_SEED_SECRET (+ NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN) in Vercel, deploy, then
 * open `/api/seed?secret=<secret>` and click the button. Once the Studio is
 * populated, REMOVE `SANITY_SEED_SECRET` (and optionally the write token) — with
 * no secret set, this route is permanently disabled (always 403).
 *
 * Idempotent: re-running resets the seeded documents to the bundled defaults.
 */
import { type NextRequest, NextResponse } from "next/server";

import { runSeed } from "@/sanity/migrate/seed";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(req: NextRequest): boolean {
  const secret = process.env.SANITY_SEED_SECRET;
  const provided =
    req.nextUrl.searchParams.get("secret") ?? req.headers.get("x-seed-secret") ?? "";
  return !!secret && provided === secret;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return new NextResponse("Forbidden", { status: 403 });
  const secret = req.nextUrl.searchParams.get("secret") ?? "";
  const action = `?secret=${encodeURIComponent(secret)}`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Import content into Sanity</title></head>
<body style="font-family:system-ui,sans-serif;max-width:34rem;margin:4rem auto;padding:0 1.25rem;color:#11253f;line-height:1.55">
<h1 style="font-size:1.4rem">Import the current site content into Sanity</h1>
<p>This uploads the site's photos and creates (or overwrites) the Homepage, Site settings, rooms, educators, testimonials, FAQs, features and trust-bar entries, so the Studio opens fully populated with the current content.</p>
<p style="color:#7a5b00;background:#fff7e0;padding:.75rem 1rem;border-radius:.6rem">Run this <strong>once</strong>. Afterwards, remove the <code>SANITY_SEED_SECRET</code> environment variable to disable this page.</p>
<form method="post" action="${action}">
<button type="submit" style="font-size:1rem;padding:.75rem 1.3rem;border:0;border-radius:.6rem;background:#11253f;color:#fff;cursor:pointer">Run import</button>
</form>
</body></html>`;
  return new NextResponse(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) return new NextResponse("Forbidden", { status: 403 });

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || projectId === "placeholder" || !token) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN in the environment first.",
      },
      { status: 500 },
    );
  }

  try {
    const result = await runSeed({ projectId, dataset, token, origin: req.nextUrl.origin });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[seed] failed", err);
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
