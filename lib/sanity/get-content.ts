/**
 * The single source of content for the public site.
 *
 * `getSiteContent()` returns the whole homepage + chrome content, resolved to a
 * render-ready shape (see lib/sanity/types.ts). It pulls from Sanity when a
 * project is configured (env vars set) and otherwise — or on any error — falls
 * back to the bundled content in lib/content.ts. Every field falls back
 * individually, so a missing document or empty list can never blank a section.
 *
 * Server-only: it reads the Sanity client and is called from the server
 * components in app/(site)/. Client components receive the resolved, serialised
 * data as props.
 */
import { cache } from "react";
import type { Image } from "sanity";

import { client } from "./client";
import { urlForImage } from "./image";
import { isSanityConfigured } from "@/sanity/env";
import * as content from "@/lib/content";
import { site as staticSite } from "@/lib/site";
import { images as imageManifest, type ImageKey } from "@/lib/images";
import type { ResolvedImage, ResolvedSite, RoomItem, SiteContent } from "./types";

/** Cache tag used for on-demand revalidation from the Sanity webhook. */
export const CONTENT_TAG = "content";

/* ------------------------------------------------------------------ helpers */

const str = (v: string | null | undefined, fallback: string): string =>
  v == null || v === "" ? fallback : v;

const numOr = (v: number | null | undefined, fallback: number): number =>
  v == null ? fallback : v;

const list = <T>(v: T[] | null | undefined, fallback: T[]): T[] =>
  Array.isArray(v) && v.length > 0 ? v : fallback;

/** Resolve a bundled image key to a render-ready image. */
const fromKey = (key: ImageKey): ResolvedImage => {
  const im = imageManifest[key];
  return { src: im.src, alt: im.alt };
};

/** Resolve a Sanity image object to a render-ready image (null if unset). */
function fromSanity(img: RawImage, fallbackAlt = ""): ResolvedImage | null {
  if (!img?.asset?._ref) return null;
  return {
    src: urlForImage(img as unknown as Image).width(1600).url(),
    alt: str(img.alt, fallbackAlt),
  };
}

const cta = (v: RawCta, fallback: { label: string; href: string }) => ({
  label: str(v?.label, fallback.label),
  href: str(v?.href, fallback.href),
});

/* ----------------------------------------------------- raw Sanity shapes */

type RawImage = { asset?: { _ref?: string }; alt?: string } | null;
type RawCta = { label?: string; href?: string } | null;

interface RawHome {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubhead?: string;
  heroPrimaryCta?: RawCta;
  heroSecondaryCta?: RawCta;
  heroHighlights?: string[];
  heroImage?: RawImage;
  heroImageSecondary?: RawImage;
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutIntro?: string;
  aboutPillars?: { name?: string; copy?: string; image?: RawImage }[];
  welcomeEyebrow?: string;
  welcomeTitle?: string;
  welcomeCopy?: string;
  greetings?: { word?: string; lang?: string }[];
  mealsEyebrow?: string;
  mealsTitle?: string;
  mealsCopy?: string;
  mealsPoints?: string[];
  menuImage?: RawImage;
  dayEyebrow?: string;
  dayTitle?: string;
  dayCopy?: string;
  daySteps?: { time?: string; title?: string; copy?: string }[];
  educatorsEyebrow?: string;
  educatorsTitle?: string;
  educatorsCopy?: string;
  impactEyebrow?: string;
  impactTitle?: string;
  impactCopy?: string;
  impactPoints?: string[];
  impactStats?: { value?: string; label?: string }[];
  impactImage?: RawImage;
  feesEyebrow?: string;
  feesTitle?: string;
  feesCopy?: string;
  feesPoints?: { title?: string; copy?: string }[];
  sampleDailyFee?: number;
  feesNote?: string;
  finderEyebrow?: string;
  finderTitle?: string;
  finderCopy?: string;
  tourEyebrow?: string;
  tourTitle?: string;
  tourCopy?: string;
  tourGallery?: { image?: RawImage; caption?: string }[];
  philosophyEyebrow?: string;
  philosophyTitle?: string;
  philosophyCopy?: string;
  philosophyNote?: string;
  finalCtaEyebrow?: string;
  finalCtaTitle?: string;
  finalCtaCopy?: string;
  finalCtaImage?: RawImage;
}

interface RawSettings {
  name?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  addressFull?: string;
  mapUrl?: string;
  hoursDisplay?: string;
  facebook?: string;
  instagram?: string;
  acknowledgement?: string;
}

interface RawData {
  home: RawHome | null;
  settings: RawSettings | null;
  rooms:
    | {
        _id?: string;
        name?: string;
        tag?: string;
        age?: string;
        minMonths?: number;
        maxMonths?: number;
        copy?: string;
        image?: RawImage;
      }[]
    | null;
  educators:
    | { name?: string; role?: string; room?: string; years?: string; languages?: string[]; quote?: string }[]
    | null;
  testimonials: { quote?: string; name?: string; detail?: string }[] | null;
  faqs: { q?: string; a?: string }[] | null;
  features: { icon?: string; title?: string; copy?: string }[] | null;
  trustItems: { icon?: string; label?: string; sub?: string }[] | null;
}

const CONTENT_QUERY = /* groq */ `{
  "home": *[_type == "homePage"][0]{
    heroEyebrow, heroTitle, heroSubhead, heroPrimaryCta, heroSecondaryCta, heroHighlights, heroImage, heroImageSecondary,
    aboutEyebrow, aboutTitle, aboutIntro, aboutPillars[]{ name, copy, image },
    welcomeEyebrow, welcomeTitle, welcomeCopy, greetings[]{ word, lang },
    mealsEyebrow, mealsTitle, mealsCopy, mealsPoints, menuImage,
    dayEyebrow, dayTitle, dayCopy, daySteps[]{ time, title, copy },
    educatorsEyebrow, educatorsTitle, educatorsCopy,
    impactEyebrow, impactTitle, impactCopy, impactPoints, impactStats[]{ value, label }, impactImage,
    feesEyebrow, feesTitle, feesCopy, feesPoints[]{ title, copy }, sampleDailyFee, feesNote,
    finderEyebrow, finderTitle, finderCopy,
    tourEyebrow, tourTitle, tourCopy, tourGallery[]{ image, caption },
    philosophyEyebrow, philosophyTitle, philosophyCopy, philosophyNote,
    finalCtaEyebrow, finalCtaTitle, finalCtaCopy, finalCtaImage
  },
  "settings": *[_type == "siteSettings"][0]{
    name, phone, phoneHref, email, addressFull, mapUrl, hoursDisplay, facebook, instagram, acknowledgement
  },
  "rooms": *[_type == "room"] | order(order asc){ _id, name, tag, age, minMonths, maxMonths, copy, image },
  "educators": *[_type == "educator"] | order(order asc){ name, role, room, years, languages, quote },
  "testimonials": *[_type == "testimonial"] | order(order asc){ quote, name, detail },
  "faqs": *[_type == "faq"] | order(order asc){ q, a },
  "features": *[_type == "feature"] | order(order asc){ icon, title, copy },
  "trustItems": *[_type == "trustItem"] | order(order asc){ icon, label, sub }
}`;

/* ------------------------------------------------------------- builder */

function resolveSite(s: RawSettings | null): ResolvedSite {
  return {
    name: str(s?.name, staticSite.name),
    contact: {
      phone: str(s?.phone, staticSite.contact.phone),
      phoneHref: str(s?.phoneHref, staticSite.contact.phoneHref),
      email: str(s?.email, staticSite.contact.email),
      emailHref: s?.email ? `mailto:${s.email}` : staticSite.contact.emailHref,
    },
    address: {
      full: str(s?.addressFull, staticSite.address.full),
      mapUrl: str(s?.mapUrl, staticSite.address.mapUrl),
      street: staticSite.address.street,
      suburb: staticSite.address.suburb,
      region: staticSite.address.region,
      postcode: staticSite.address.postcode,
      country: staticSite.address.country,
    },
    hours: { display: str(s?.hoursDisplay, staticSite.hours.display) },
    social: {
      facebook: str(s?.facebook, staticSite.social.facebook),
      instagram: str(s?.instagram, staticSite.social.instagram),
    },
    acknowledgement: str(s?.acknowledgement, staticSite.acknowledgement),
  };
}

/**
 * Build the resolved content. `data === null` (no Sanity / fetch failure) yields
 * the pure bundled content; otherwise every field is taken from Sanity with a
 * per-field fallback to the bundled value.
 */
function buildContent(data: RawData | null): SiteContent {
  const c = content;
  const h = data?.home ?? null;

  // Rooms (collection) — keep the bundled set unless Sanity has rooms.
  const items: RoomItem[] =
    data?.rooms && data.rooms.length
      ? data.rooms.map((r, i): RoomItem => {
          const key = (r._id ?? `room-${i}`).replace(/^room-/, "");
          const fb = c.rooms.items[i] ?? c.rooms.items[0];
          return {
            key,
            name: str(r.name, fb.name),
            tag: str(r.tag, fb.tag),
            age: str(r.age, fb.age),
            copy: str(r.copy, fb.copy),
            image: fromSanity(r.image ?? null, str(r.name, fb.name)) ?? fromKey(fb.image),
            minMonths: numOr(r.minMonths, c.roomAgeMonths[key]?.min ?? 0),
            maxMonths: numOr(r.maxMonths, c.roomAgeMonths[key]?.max ?? 999),
          };
        })
      : c.rooms.items.map((r): RoomItem => ({
          key: r.key,
          name: r.name,
          tag: r.tag,
          age: r.age,
          copy: r.copy,
          image: fromKey(r.image),
          minMonths: c.roomAgeMonths[r.key]?.min,
          maxMonths: c.roomAgeMonths[r.key]?.max,
        }));

  const roomAgeMonths: Record<string, { min: number; max: number }> = {};
  for (const r of items) {
    roomAgeMonths[r.key] = { min: r.minMonths ?? 0, max: r.maxMonths ?? 999 };
  }

  return {
    hero: {
      eyebrow: str(h?.heroEyebrow, c.hero.eyebrow),
      title: str(h?.heroTitle, c.hero.title),
      subhead: str(h?.heroSubhead, c.hero.subhead),
      primaryCta: cta(h?.heroPrimaryCta ?? null, c.hero.primaryCta),
      secondaryCta: cta(h?.heroSecondaryCta ?? null, c.hero.secondaryCta),
      highlights: list(h?.heroHighlights, c.hero.highlights),
      image: fromSanity(h?.heroImage ?? null) ?? fromKey(c.hero.image),
      imageSecondary: fromSanity(h?.heroImageSecondary ?? null) ?? fromKey(c.hero.imageSecondary),
    },

    trustBar:
      data?.trustItems && data.trustItems.length
        ? data.trustItems.map((t, i) => ({
            icon: str(t.icon, c.trustBar[i]?.icon ?? "heart"),
            label: str(t.label, ""),
            sub: str(t.sub, ""),
          }))
        : c.trustBar,

    about: {
      eyebrow: str(h?.aboutEyebrow, c.about.eyebrow),
      title: str(h?.aboutTitle, c.about.title),
      intro: str(h?.aboutIntro, c.about.intro),
      pillars:
        h?.aboutPillars && h.aboutPillars.length
          ? h.aboutPillars.map((p, i) => ({
              key: c.about.pillars[i]?.key ?? `pillar-${i}`,
              name: str(p.name, ""),
              copy: str(p.copy, ""),
              image:
                fromSanity(p.image ?? null, str(p.name, "")) ??
                fromKey((c.about.pillars[i] ?? c.about.pillars[0]).image),
            }))
          : c.about.pillars.map((p) => ({
              key: p.key,
              name: p.name,
              copy: p.copy,
              image: fromKey(p.image),
            })),
    },

    rooms: {
      eyebrow: c.rooms.eyebrow,
      title: c.rooms.title,
      intro: c.rooms.intro,
      items,
    },

    roomFinder: {
      eyebrow: str(h?.finderEyebrow, c.roomFinder.eyebrow),
      title: str(h?.finderTitle, c.roomFinder.title),
      copy: str(h?.finderCopy, c.roomFinder.copy),
      presets: c.roomFinder.presets,
    },
    roomAgeMonths,

    welcome: {
      eyebrow: str(h?.welcomeEyebrow, c.welcome.eyebrow),
      title: str(h?.welcomeTitle, c.welcome.title),
      copy: str(h?.welcomeCopy, c.welcome.copy),
      greetings:
        h?.greetings && h.greetings.length
          ? h.greetings.map((g) => ({ word: str(g.word, ""), lang: str(g.lang, "") }))
          : c.welcome.greetings,
    },

    features: {
      eyebrow: c.features.eyebrow,
      title: c.features.title,
      items:
        data?.features && data.features.length
          ? data.features.map((f) => ({
              icon: str(f.icon, "heart"),
              title: str(f.title, ""),
              copy: str(f.copy, ""),
            }))
          : c.features.items,
    },

    meals: {
      eyebrow: str(h?.mealsEyebrow, c.meals.eyebrow),
      title: str(h?.mealsTitle, c.meals.title),
      copy: str(h?.mealsCopy, c.meals.copy),
      points: list(h?.mealsPoints, c.meals.points),
      menuImage:
        fromSanity(h?.menuImage ?? null, "The Munro Centre's weekly menu") ??
        (c.meals.menuImage
          ? { src: c.meals.menuImage, alt: "The Munro Centre's weekly menu" }
          : null),
    },

    daySchedule: {
      eyebrow: str(h?.dayEyebrow, c.daySchedule.eyebrow),
      title: str(h?.dayTitle, c.daySchedule.title),
      copy: str(h?.dayCopy, c.daySchedule.copy),
      steps:
        h?.daySteps && h.daySteps.length
          ? h.daySteps.map((s) => ({
              time: str(s.time, ""),
              title: str(s.title, ""),
              copy: str(s.copy, ""),
            }))
          : c.daySchedule.steps,
    },

    educators: {
      eyebrow: str(h?.educatorsEyebrow, c.educators.eyebrow),
      title: str(h?.educatorsTitle, c.educators.title),
      copy: str(h?.educatorsCopy, c.educators.copy),
      people:
        data?.educators && data.educators.length
          ? data.educators.map((p) => ({
              name: str(p.name, ""),
              role: str(p.role, ""),
              room: str(p.room, ""),
              years: str(p.years, ""),
              languages: list(p.languages, []),
              quote: str(p.quote, ""),
            }))
          : c.educators.people,
    },

    impact: {
      eyebrow: str(h?.impactEyebrow, c.impact.eyebrow),
      title: str(h?.impactTitle, c.impact.title),
      copy: str(h?.impactCopy, c.impact.copy),
      points: list(h?.impactPoints, c.impact.points),
      image: fromSanity(h?.impactImage ?? null) ?? fromKey(c.impact.image),
      stats:
        h?.impactStats && h.impactStats.length
          ? h.impactStats.map((s) => ({ value: str(s.value, ""), label: str(s.label, "") }))
          : c.impact.stats,
    },

    fees: {
      eyebrow: str(h?.feesEyebrow, c.fees.eyebrow),
      title: str(h?.feesTitle, c.fees.title),
      copy: str(h?.feesCopy, c.fees.copy),
      points:
        h?.feesPoints && h.feesPoints.length
          ? h.feesPoints.map((p) => ({ title: str(p.title, ""), copy: str(p.copy, "") }))
          : c.fees.points,
      estimator: {
        sampleDailyFee: numOr(h?.sampleDailyFee, c.fees.estimator.sampleDailyFee),
        note: str(h?.feesNote, c.fees.estimator.note),
      },
    },

    testimonials: {
      eyebrow: c.testimonials.eyebrow,
      title: c.testimonials.title,
      items:
        data?.testimonials && data.testimonials.length
          ? data.testimonials.map((t) => ({
              quote: str(t.quote, ""),
              name: str(t.name, ""),
              detail: str(t.detail, ""),
            }))
          : c.testimonials.items,
    },

    tour: {
      eyebrow: str(h?.tourEyebrow, c.tour.eyebrow),
      title: str(h?.tourTitle, c.tour.title),
      copy: str(h?.tourCopy, c.tour.copy),
      gallery:
        h?.tourGallery && h.tourGallery.length
          ? h.tourGallery.map((g, i) => ({
              image:
                fromSanity(g.image ?? null, str(g.caption, "")) ??
                fromKey((c.tour.gallery[i] ?? c.tour.gallery[0]).image),
              caption: str(g.caption, ""),
            }))
          : c.tour.gallery.map((g) => ({ image: fromKey(g.image), caption: g.caption })),
    },

    philosophy: {
      eyebrow: str(h?.philosophyEyebrow, c.philosophy.eyebrow),
      title: str(h?.philosophyTitle, c.philosophy.title),
      copy: str(h?.philosophyCopy, c.philosophy.copy),
      note: str(h?.philosophyNote, c.philosophy.note),
    },

    faq: {
      eyebrow: c.faq.eyebrow,
      title: c.faq.title,
      items:
        data?.faqs && data.faqs.length
          ? data.faqs.map((f) => ({ q: str(f.q, ""), a: str(f.a, "") }))
          : c.faq.items,
    },

    finalCta: {
      eyebrow: str(h?.finalCtaEyebrow, c.finalCta.eyebrow),
      title: str(h?.finalCtaTitle, c.finalCta.title),
      copy: str(h?.finalCtaCopy, c.finalCta.copy),
      image: fromSanity(h?.finalCtaImage ?? null) ?? fromKey(c.finalCta.image),
    },

    site: resolveSite(data?.settings ?? null),
  };
}

/**
 * Fetch + resolve the site content. Cached per request (React `cache`) so the
 * page and the layout share a single fetch. Tagged for on-demand revalidation
 * via the publish webhook (POST /api/revalidate — instant, and the reliable
 * path), with a 30s time-based refresh as a safety net if the webhook isn't
 * configured yet.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!isSanityConfigured) return buildContent(null);
  try {
    const data = await client
      .withConfig({ useCdn: false })
      .fetch<RawData>(CONTENT_QUERY, {}, { next: { tags: [CONTENT_TAG], revalidate: 30 } });
    return buildContent(data);
  } catch (err) {
    console.error("[sanity] content fetch failed; serving bundled content.", err);
    return buildContent(null);
  }
});
