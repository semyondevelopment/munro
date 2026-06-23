/**
 * On-demand revalidation webhook for Sanity.
 *
 * Point a Sanity webhook (Manage → API → Webhooks) at POST /api/revalidate with
 * the secret below, and published edits appear on the live site within seconds —
 * no redeploy. Without the webhook, content still refreshes via the 60s
 * time-based revalidation in lib/sanity/get-content.ts.
 *
 * Required env var: SANITY_REVALIDATE_SECRET (must match the webhook secret).
 */
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { CONTENT_TAG } from "@/lib/sanity/get-content";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    // `{ expire: 0 }` expires the tag immediately — the recommended form for
    // third-party webhooks (Next 16: `revalidateTag(tag)` alone is deprecated).
    revalidateTag(CONTENT_TAG, { expire: 0 });
    return NextResponse.json({
      revalidated: true,
      tag: CONTENT_TAG,
      type: body?._type,
      now: Date.now(),
    });
  } catch (err) {
    console.error("[sanity] revalidate webhook error", err);
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
