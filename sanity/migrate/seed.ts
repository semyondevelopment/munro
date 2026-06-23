/**
 * Content migration: copies the bundled static content (lib/content.ts,
 * lib/site.ts, lib/images.ts) into the centre's Sanity dataset, including the
 * site photos. Idempotent — it uses createOrReplace with stable ids, so running
 * it again simply resets those documents to the bundled defaults.
 *
 * Editors never run this. It is a one-time setup step, available two ways:
 *   - Browser (no terminal): set SANITY_SEED_SECRET, deploy, and POST
 *     /api/seed (see app/api/seed/route.ts).
 *   - Terminal: `npm run seed` (see sanity/migrate/cli.ts).
 */
import { readFileSync } from "node:fs";
import { join, basename } from "node:path";
import { createClient } from "next-sanity";

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

export interface SeedConfig {
  projectId: string;
  dataset: string;
  token: string;
  /**
   * Origin of the running site (e.g. https://www.munrocentre.com). When the
   * photos aren't on the local filesystem (serverless), they're fetched from
   * `${origin}${src}` instead. Omitted for the local CLI run.
   */
  origin?: string;
}

export interface SeedResult {
  uploaded: number;
  warnings: string[];
}

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;
const withKeys = <T extends object>(arr: T[]) => arr.map((o) => ({ _key: key(), ...o }));
const id = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Read image bytes from the bundled /public folder, falling back to the origin. */
async function loadImageBytes(src: string, origin?: string): Promise<Buffer> {
  try {
    return readFileSync(join(process.cwd(), "public", src));
  } catch {
    if (!origin) throw new Error(`image not found on disk: ${src}`);
    const res = await fetch(new URL(src, origin));
    if (!res.ok) throw new Error(`could not fetch ${src} (HTTP ${res.status})`);
    return Buffer.from(await res.arrayBuffer());
  }
}

/** Run the content + image migration into Sanity. Safe to call repeatedly. */
export async function runSeed(config: SeedConfig): Promise<SeedResult> {
  keyCounter = 0;
  const warnings: string[] = [];

  const client = createClient({
    projectId: config.projectId,
    dataset: config.dataset || "production",
    token: config.token,
    apiVersion: "2024-10-01",
    useCdn: false,
  });

  // ---- Upload every site image once → key -> asset id ----
  const assets = new Map<ImageKey, string>();
  for (const k of Object.keys(images) as ImageKey[]) {
    const { src } = images[k];
    try {
      const buf = await loadImageBytes(src, config.origin);
      const asset = await client.assets.upload("image", buf, { filename: basename(src) });
      assets.set(k, asset._id);
    } catch (e) {
      warnings.push(`could not upload ${src}: ${(e as Error).message}`);
    }
  }

  const imageField = (k: ImageKey) => {
    const ref = assets.get(k);
    return ref
      ? { _type: "imageWithAlt", alt: images[k].alt, asset: { _type: "reference", _ref: ref } }
      : undefined;
  };

  // ---- Documents ----
  const tx = client.transaction();

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

  tx.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: hero.eyebrow,
    heroTitle: hero.title,
    heroSubhead: hero.subhead,
    heroPrimaryCta: { _type: "cta", ...hero.primaryCta },
    heroSecondaryCta: { _type: "cta", ...hero.secondaryCta },
    heroHighlights: hero.highlights,
    heroImage: imageField(hero.image),
    heroImageSecondary: imageField(hero.imageSecondary),

    aboutEyebrow: about.eyebrow,
    aboutTitle: about.title,
    aboutIntro: about.intro,
    aboutPillars: about.pillars.map((p) => ({
      _key: key(),
      name: p.name,
      copy: p.copy,
      image: imageField(p.image),
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
    impactImage: imageField(impact.image),

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
      image: imageField(g.image),
      caption: g.caption,
    })),

    philosophyEyebrow: philosophy.eyebrow,
    philosophyTitle: philosophy.title,
    philosophyCopy: philosophy.copy,
    philosophyNote: philosophy.note,

    finalCtaEyebrow: finalCta.eyebrow,
    finalCtaTitle: finalCta.title,
    finalCtaCopy: finalCta.copy,
    finalCtaImage: imageField(finalCta.image),
  });

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
      image: imageField(r.image),
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
  return { uploaded: assets.size, warnings };
}
