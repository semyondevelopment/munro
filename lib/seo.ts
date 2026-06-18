/**
 * JSON-LD structured data builders.
 *
 * Accurate, consistent structured data earns rich results and the local
 * knowledge panel for "childcare St Lucia" and related queries. Everything
 * reads from lib/site.ts so the NAP stays identical to the rendered page.
 *
 * Note: no aggregateRating is emitted — self-asserted ratings without genuine,
 * verifiable on-site reviews violate Google's policy. Add it (sourced from the
 * real Google Business Profile, with Review markup) only when real reviews exist.
 */

import { site } from "./site";
import { faq, rooms } from "./content";

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

function localBusiness() {
  return {
    "@type": ["ChildCare", "EducationalOrganization"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    image: `${site.url}/images/team.jpg`,
    logo: `${site.url}/icon.svg`,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    email: site.contact.email,
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
    hasMap: site.address.mapUrl,
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
    sameAs: [site.social.facebook, site.social.instagram],
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "en-AU",
    publisher: { "@id": ORG_ID },
  };
}

function programs() {
  return rooms.items.map((room) => ({
    "@type": "EducationalOccupationalProgram",
    name: `${room.name} — ${room.tag}`,
    description: room.copy,
    provider: { "@id": ORG_ID },
    typicalAgeRange: room.age,
  }));
}

function faqPage() {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Full @graph for the homepage. */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness(), website(), ...programs(), faqPage()],
  };
}
