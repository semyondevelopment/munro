import { client } from "./client";

// ─── Image reference type ───────────────────────────────────────────────────

export type CmsImageRef = {
  asset: { _ref: string; _type: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

// ─── Home page ──────────────────────────────────────────────────────────────

export type CmsRoom = {
  key: string;
  name: string;
  tag?: string;
  age?: string;
  copy?: string;
  image?: CmsImageRef;
};

export type CmsGalleryItem = {
  image?: CmsImageRef;
  caption?: string;
};

export type CmsHomePage = {
  // Hero
  heroSubhead?: string;
  heroHighlights?: string[];
  // About
  aboutIntro?: string;
  aboutPillarBelong?: string;
  aboutPillarGrow?: string;
  aboutPillarThrive?: string;
  // Rooms
  rooms?: CmsRoom[];
  // Team
  teamCopy?: string;
  teamPoints?: string[];
  teamImage?: CmsImageRef;
  // Impact
  impactCopy?: string;
  impactStats?: Array<{ value: string; label: string }>;
  // Meals
  menuImage?: CmsImageRef;
  // Gallery
  gallery?: CmsGalleryItem[];
  // Testimonials
  testimonials?: Array<{ quote: string; name: string; detail?: string }>;
  // Philosophy
  philosophy?: string;
  // FAQ
  faq?: Array<{ question: string; answer: string }>;
};

const HOME_QUERY = `*[_type == "homePage" && _id == "homePage"][0]{
  heroSubhead,
  heroHighlights,
  aboutIntro,
  aboutPillarBelong,
  aboutPillarGrow,
  aboutPillarThrive,
  rooms[]{ key, name, tag, age, copy, image{ asset, hotspot, crop } },
  teamCopy,
  teamPoints,
  teamImage{ asset, hotspot, crop },
  impactCopy,
  impactStats[]{ value, label },
  menuImage{ asset, hotspot, crop },
  gallery[]{ image{ asset, hotspot, crop }, caption },
  testimonials[]{ quote, name, detail },
  philosophy,
  faq[]{ question, answer }
}`;

export async function getHomePage(): Promise<CmsHomePage | null> {
  if (!client) return null;
  try {
    return await client.fetch<CmsHomePage>(
      HOME_QUERY,
      {},
      { next: { revalidate: 3600 } },
    );
  } catch {
    return null;
  }
}

// ─── Site settings ──────────────────────────────────────────────────────────

export type CmsSiteSettings = {
  openingHours?: string;
  facebook?: string;
  instagram?: string;
};

const SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  openingHours,
  facebook,
  instagram
}`;

export async function getSiteSettings(): Promise<CmsSiteSettings | null> {
  if (!client) return null;
  try {
    return await client.fetch<CmsSiteSettings>(
      SETTINGS_QUERY,
      {},
      { next: { revalidate: 3600 } },
    );
  } catch {
    return null;
  }
}
