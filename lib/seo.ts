/**
 * JSON-LD structured data builders.
 *
 * Accurate, consistent structured data earns rich results and the local
 * knowledge panel for "childcare St Lucia" and related queries, and gives AI
 * search engines clean facts to quote.
 *
 * Sourced from the resolved site content (`getSiteContent()`), so CMS edits to
 * the FAQs, rooms, phone, email, social links and centre name flow straight
 * into the schema Google and AI crawlers read. The structural NAP fields (exact
 * street/suburb, geo-coordinates, opening-hour times, areaServed) stay
 * authoritative in lib/site.ts so the canonical local-SEO signals never drift.
 *
 * Note: no aggregateRating is emitted — self-asserted ratings without genuine,
 * verifiable on-site reviews violate Google's policy. Add it (sourced from the
 * real Google Business Profile, with Review markup) only when real reviews exist.
 */
import { site } from "./site";
import type { SiteContent } from "./sanity/types";

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

function localBusiness(content: SiteContent) {
  const s = content.site;
  return {
    "@type": ["ChildCare", "EducationalOrganization"],
    "@id": ORG_ID,
    name: s.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    image: `${site.url}/images/team.jpg`,
    logo: `${site.url}/icon.svg`,
    telephone: s.contact.phoneHref.replace("tel:", ""),
    email: s.contact.email,
    priceRange: site.priceRange,
    foundingDate: String(site.foundingYear),
    slogan: site.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: s.address.mapUrl,
    areaServed: site.areaServed.map((name) => ({
      "@type": name === "Brisbane" ? "City" : "Place",
      name,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    sameAs: [s.social.facebook, s.social.instagram].filter(Boolean),
  };
}

function website(content: SiteContent) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: content.site.name,
    inLanguage: "en-AU",
    publisher: { "@id": ORG_ID },
  };
}

function programs(content: SiteContent) {
  return content.rooms.items.map((room) => ({
    "@type": "EducationalOccupationalProgram",
    name: `${room.name} — ${room.tag}`,
    description: room.copy,
    provider: { "@id": ORG_ID },
    typicalAgeRange: room.age,
  }));
}

function faqPage(content: SiteContent) {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: content.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Full @graph for the homepage, built from the resolved (CMS or bundled) content. */
export function homeJsonLd(content: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusiness(content),
      website(content),
      ...programs(content),
      faqPage(content),
    ],
  };
}
