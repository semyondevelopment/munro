/**
 * `npm run seed` — terminal entry point for the content migration. Editors
 * never use this; the browser equivalent is app/api/seed/route.ts.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_WRITE_TOKEN=sk... \
 *   npm run seed
 */
import { runSeed } from "./seed";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN.",
  );
  process.exit(1);
}

console.log("Seeding Sanity…");
runSeed({ projectId, dataset, token })
  .then((r) => {
    console.log(`✓ Seed complete. Uploaded ${r.uploaded} images.`);
    for (const w of r.warnings) console.warn(`  ! ${w}`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
