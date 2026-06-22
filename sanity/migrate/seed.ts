/**
 * One-off migration: copies the bundled static content (lib/content.ts,
 * lib/site.ts, lib/images.ts) into the centre's Sanity dataset, including
 * uploading every photo from /public/images.
 *
 * Run AFTER creating the Sanity project and setting env vars:
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_WRITE_TOKEN=sk... \
 *   npm run seed
 *
 * Safe to re-run: it uses createOrReplace with stable ids (it will overwrite,
 * but re-upload images each time — run once unless you mean to reset).
 */
// `@sanity/client` isn't a direct dependency; next-sanity re-exports the same
// `createClient` (and its entrypoint pulls in no `server-only`, so it runs fine
// under tsx for this migration script).
import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";
import { join, basename } from "node:path";

import { site } from "../../lib/site";
import { images, type ImageKey } from "../../lib/images";
import {
  hero,
  about,
  welcome,
  meals,
  daySchedule,
  educators,
  impact,
  fees,
  roomFinder,
  rooms,
  roomAgeMonths,
  testimonials,
  faq,
  features,
  trustBar,
  tour,
  philosophy,
  finalCta,
} from "../../lib/content";

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

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;
const withKeys = <T extends object>(arr: T[]) => arr.map((o) => ({ _key: key(), ...o }));
const id = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Upload every site image once, returning a key -> asset id map. */
async function uploadImages() {
  const map = new Map<ImageKey, string>();
  for (const k of Object.keys(images) as ImageKey[]) {
    const { src } = images[k];
    try {
      const buf = readFileSync(join(process.cwd(), "public", src));
      const asset = await client.assets.upload("image", buf, {
        filename: basename(src),
      });
      map.set(k, asset._id);
      console.log(`  uploaded ${src}`);
    } catch (e) {
      console.warn(`  ! could not upload ${src} (${(e as Error).message})`);
    }
  }
  return map;
}

const imageField = (assets: Map<ImageKey, string>, k: ImageKey) => {
  const ref = assets.get(k);
  return ref
    ? { _type: "imageWithAlt", alt: images[k].alt, asset: { _type: "reference", _ref: ref } }
    : undefined;
};

async function run() {
  console.log("Uploading images…");
  const assets = await uploadImages();

  console.log("Writing documents…");
  const tx = client.transaction();

  // ---- Site settings ----
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: site.name,
    phone: site.contact.phone,
    phoneHref: site.contact.phoneHref,
    email: site.contact.email,
    addressFull: site.address.full,
    mapUrl: site.address.mapUrl,
    hoursDisplay: site.hours.display,
    facebook: site.social.facebook,
    instagram: site.social.instagram,
    acknowledgement: site.acknowledgement,
  });

  // ---- Homepage ----
  tx.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: hero.eyebrow,
    heroTitle: hero.title,
    heroSubhead: hero.subhead,
    heroPrimaryCta: { _type: "cta", ...hero.primaryCta },
    heroSecondaryCta: { _type: "cta", ...hero.secondaryCta },
    heroHighlights: hero.highlights,
    heroImage: imageField(assets, hero.image),
    heroImageSecondary: imageField(assets, hero.imageSecondary),

    aboutEyebrow: about.eyebrow,
    aboutTitle: about.title,
    aboutIntro: about.intro,
    aboutPillars: about.pillars.map((p) => ({
      _key: key(),
      name: p.name,
      copy: p.copy,
      image: imageField(assets, p.image),
    })),

    welcomeEyebrow: welcome.eyebrow,
    welcomeTitle: welcome.title,
    welcomeCopy: welcome.copy,
    greetings: withKeys(welcome.greetings.map((g) => ({ word: g.word, lang: g.lang }))),

    mealsEyebrow: meals.eyebrow,
    mealsTitle: meals.title,
    mealsCopy: meals.copy,
    mealsPoints: meals.points,

    dayEyebrow: daySchedule.eyebrow,
    dayTitle: daySchedule.title,
    dayCopy: daySchedule.copy,
    daySteps: withKeys(daySchedule.steps.map((s) => ({ ...s }))),

    educatorsEyebrow: educators.eyebrow,
    educatorsTitle: educators.title,
    educatorsCopy: educators.copy,

    impactEyebrow: impact.eyebrow,
    impactTitle: impact.title,
    impactCopy: impact.copy,
    impactPoints: impact.points,
    impactStats: withKeys(impact.stats.map((s) => ({ ...s }))),
    impactImage: imageField(assets, impact.image),

    feesEyebrow: fees.eyebrow,
    feesTitle: fees.title,
    feesCopy: fees.copy,
    feesPoints: withKeys(fees.points.map((p) => ({ ...p }))),
    sampleDailyFee: fees.estimator.sampleDailyFee,
    feesNote: fees.estimator.note,

    finderEyebrow: roomFinder.eyebrow,
    finderTitle: roomFinder.title,
    finderCopy: roomFinder.copy,

    tourEyebrow: tour.eyebrow,
    tourTitle: tour.title,
    tourCopy: tour.copy,
    tourGallery: tour.gallery.map((g) => ({
      _key: key(),
      image: imageField(assets, g.image),
      caption: g.caption,
    })),

    philosophyEyebrow: philosophy.eyebrow,
    philosophyTitle: philosophy.title,
    philosophyCopy: philosophy.copy,
    philosophyNote: philosophy.note,

    finalCtaEyebrow: finalCta.eyebrow,
    finalCtaTitle: finalCta.title,
    finalCtaCopy: finalCta.copy,
    finalCtaImage: imageField(assets, finalCta.image),
  });

  // ---- Collections ----
  rooms.items.forEach((r, i) => {
    const b = roomAgeMonths[r.key];
    tx.createOrReplace({
      _id: `room-${id(r.key)}`,
      _type: "room",
      name: r.name,
      tag: r.tag,
      age: r.age,
      minMonths: b?.min,
      maxMonths: b?.max,
      copy: r.copy,
      image: imageField(assets, r.image),
      order: i,
    });
  });

  educators.people.forEach((p, i) => {
    tx.createOrReplace({
      _id: `educator-${id(p.name)}`,
      _type: "educator",
      name: p.name,
      role: p.role,
      room: p.room,
      years: p.years,
      languages: p.languages,
      quote: p.quote,
      order: i,
    });
  });

  testimonials.items.forEach((t, i) => {
    tx.createOrReplace({
      _id: `testimonial-${i}`,
      _type: "testimonial",
      quote: t.quote,
      name: t.name,
      detail: t.detail,
      order: i,
    });
  });

  faq.items.forEach((f, i) => {
    tx.createOrReplace({ _id: `faq-${i}`, _type: "faq", q: f.q, a: f.a, order: i });
  });

  features.items.forEach((f, i) => {
    tx.createOrReplace({
      _id: `feature-${i}`,
      _type: "feature",
      icon: f.icon,
      title: f.title,
      copy: f.copy,
      order: i,
    });
  });

  trustBar.forEach((t, i) => {
    tx.createOrReplace({
      _id: `trust-${i}`,
      _type: "trustItem",
      icon: t.icon,
      label: t.label,
      sub: t.sub,
      order: i,
    });
  });

  await tx.commit();
  console.log("✓ Seed complete.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
