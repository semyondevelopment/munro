/**
 * Resolved content types — the shape the React components actually consume.
 *
 * These mirror the bundled static content in `lib/content.ts`, but with every
 * image reference resolved to a ready-to-render `{ src, alt }` pair (whether it
 * came from a local file or from Sanity). Deriving them from the static exports
 * with `typeof` keeps the two sources guaranteed-compatible: the site renders
 * identically whether content is served from Sanity or the bundled fallback.
 *
 * This module is type-only at runtime (the `content` import is elided), so it is
 * safe to import from both server and client components.
 */
import * as content from "@/lib/content";

// `content` is used only in `typeof` positions below, so this import carries no
// runtime cost — the module stays type-only and safe for client components.

/** A render-ready image: a URL (local path or Sanity CDN) plus alt text. */
export type ResolvedImage = { src: string; alt: string };

/** A button (label + link). Widened from the bundled `as const` literals. */
export type Cta = { label: string; href: string };

export type HeroContent = Omit<
  typeof content.hero,
  "image" | "imageSecondary" | "primaryCta" | "secondaryCta"
> & {
  primaryCta: Cta;
  secondaryCta: Cta;
  image: ResolvedImage;
  imageSecondary: ResolvedImage;
};

export type TrustBarContent = typeof content.trustBar;

type StaticPillar = (typeof content.about.pillars)[number];
export type AboutContent = Omit<typeof content.about, "pillars"> & {
  pillars: Array<Omit<StaticPillar, "image"> & { image: ResolvedImage }>;
};

type StaticRoom = (typeof content.rooms.items)[number];
export type RoomItem = Omit<StaticRoom, "image"> & {
  image: ResolvedImage;
  minMonths?: number;
  maxMonths?: number;
};
export type RoomsContent = Omit<typeof content.rooms, "items"> & { items: RoomItem[] };

export type RoomFinderContent = typeof content.roomFinder;
export type RoomAgeMonths = Record<string, { min: number; max: number }>;

export type WelcomeContent = typeof content.welcome;
export type FeaturesContent = typeof content.features;

export type MealsContent = Omit<typeof content.meals, "menuImage"> & {
  menuImage: ResolvedImage | null;
};

export type DayContent = typeof content.daySchedule;
export type EducatorsContent = typeof content.educators;

export type ImpactContent = Omit<typeof content.impact, "image"> & { image: ResolvedImage };

export type FeesContent = typeof content.fees;
export type TestimonialsContent = typeof content.testimonials;

type StaticGalleryItem = (typeof content.tour.gallery)[number];
export type TourContent = Omit<typeof content.tour, "gallery"> & {
  gallery: Array<Omit<StaticGalleryItem, "image"> & { image: ResolvedImage }>;
};

export type PhilosophyContent = typeof content.philosophy;
export type FaqContent = typeof content.faq;
export type FinalCtaContent = Omit<typeof content.finalCta, "image"> & { image: ResolvedImage };

/** The subset of `lib/site.ts` that staff can edit via Sanity site settings. */
export type ResolvedSite = {
  name: string;
  contact: { phone: string; phoneHref: string; email: string; emailHref: string };
  address: {
    full: string;
    mapUrl: string;
    street: string;
    suburb: string;
    region: string;
    postcode: string;
    country: string;
  };
  hours: { display: string };
  social: { facebook: string; instagram: string };
  acknowledgement: string;
};

/** Everything the homepage + chrome need, resolved and ready to render. */
export type SiteContent = {
  hero: HeroContent;
  trustBar: TrustBarContent;
  about: AboutContent;
  rooms: RoomsContent;
  roomFinder: RoomFinderContent;
  roomAgeMonths: RoomAgeMonths;
  welcome: WelcomeContent;
  features: FeaturesContent;
  meals: MealsContent;
  daySchedule: DayContent;
  educators: EducatorsContent;
  impact: ImpactContent;
  fees: FeesContent;
  testimonials: TestimonialsContent;
  tour: TourContent;
  philosophy: PhilosophyContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
  site: ResolvedSite;
};
