/**
 * `npm run clean:homepage` — one-off cleanup for a dataset that was first
 * imported with an older shape of the `homePage` document.
 *
 * Early imports wrote a handful of fields (embedded rooms/faq/testimonials and
 * some renamed section fields) that the current schema no longer defines. The
 * live site never reads them, but the Studio flags them as "unknown fields".
 * This script unsets ONLY those orphan fields, on both the published and draft
 * versions of the document — every current field and every staff edit is left
 * exactly as-is. It is idempotent: run it as many times as you like.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_WRITE_TOKEN=sk... \
 *   npm run clean:homepage
 */
import { createClient } from "next-sanity";

/**
 * Fields older imports left on `homePage` that the current schema
 * (sanity/schemaTypes/homePage.ts) does not define. Rooms, FAQs and
 * testimonials now live in their own document types, and the section copy uses
 * `aboutPillars` / `philosophyCopy` / `educatorsCopy` instead of these names.
 */
const ORPHAN_FIELDS = [
  "aboutPillarBelong",
  "aboutPillarGrow",
  "aboutPillarThrive",
  "faq",
  "philosophy",
  "rooms",
  "teamCopy",
  "teamPoints",
  "testimonials",
] as const;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function main() {
  // Clean both the published document and any in-progress draft.
  const ids = ["homePage", "drafts.homePage"];
  let cleaned = 0;

  for (const id of ids) {
    const doc = await client.getDocument(id);
    if (!doc) continue;

    const present = ORPHAN_FIELDS.filter((field) => field in doc);
    if (present.length === 0) {
      console.log(`✓ ${id}: already clean.`);
      continue;
    }

    await client.patch(id).unset([...present]).commit();
    cleaned += present.length;
    console.log(`✓ ${id}: removed ${present.length} stale field(s) — ${present.join(", ")}`);
  }

  console.log(
    cleaned === 0
      ? "Nothing to do — the homePage document is already clean."
      : `Done. Reopen the Homepage in the Studio and the warning is gone.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
