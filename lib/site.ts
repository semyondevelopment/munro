/**
 * Single source of truth for The Munro Centre's identity.
 *
 * Consistent Name / Address / Phone (NAP) across the site and structured data
 * is a primary local-ranking signal. Everything SEO-facing reads from here.
 *
 * Verified facts (munrocentre.com, ACECQA, directories): community-based
 * not-for-profit long day care at UQ, St Lucia, operating since 1981.
 * Items marked CONFIRM should be checked against the business before launch.
 */

export const site = {
  name: "The Munro Centre",
  legalName: "The Munro Centre", // CONFIRM legal/approved-provider name
  shortName: "Munro",
  tagline: "Every Child Deserves To Belong",

  /** Live domain. */
  url: "https://www.munrocentre.com",

  description:
    "The Munro Centre is a community-based, not-for-profit early learning and long day care centre at UQ, St Lucia in Brisbane. Caring for children from 6 weeks to kindergarten age since 1981, with a Kindy Approved program, nutritious meals and a warm, multicultural community. Book a tour today.",

  ogDescription:
    "Community-based, not-for-profit early learning at UQ St Lucia since 1981. Kindy Approved · multicultural · meals provided. Where every child belongs. Book a tour.",

  contact: {
    phone: "(07) 3876 9916",
    phoneHref: "tel:+61738769916",
    email: "office@munrocentre.com",
    emailHref: "mailto:office@munrocentre.com",
  },

  address: {
    street: "7 Dell Road",
    suburb: "St Lucia",
    region: "QLD",
    regionName: "Queensland",
    postcode: "4067",
    country: "AU",
    countryName: "Australia",
    full: "7 Dell Road, St Lucia QLD 4067",
    mapUrl: "https://maps.google.com/?q=7+Dell+Road+St+Lucia+QLD+4067",
  },

  /** Approx coordinates for St Lucia / UQ — refine to the exact site. */
  geo: {
    latitude: -27.4975,
    longitude: 153.0137,
  },

  /** CONFIRM exact hours before launch (typical long-day-care hours shown). */
  hours: {
    opens: "07:30",
    closes: "18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    display: "Monday – Friday, 7:30am – 6:00pm",
  },

  /** Suburbs we draw families from — fuels areaServed in LocalBusiness schema. */
  areaServed: [
    "St Lucia",
    "Toowong",
    "Indooroopilly",
    "Taringa",
    "Auchenflower",
    "Chelmer",
    "Graceville",
    "West End",
    "Brisbane",
  ],

  priceRange: "$$",
  foundingYear: 1981,

  /** OWNA is the centre's digital platform for family comms + bookings. */
  owna: {
    name: "OWNA",
    blurb:
      "We use OWNA, a secure digital platform, for everyday communication, daily updates, photos and bookings — so you're always connected to your child's day.",
  },

  /** Meals are provided and outsourced through KGF (Kids Gourmet Food). */
  meals: {
    provider: "KGF",
    providerName: "Kids Gourmet Food (KGF)",
    blurb:
      "Nutritious meals are provided every day, freshly prepared and delivered by our catering partner KGF, with all dietary, allergy and cultural needs carefully catered for.",
  },

  social: {
    facebook: "https://www.facebook.com/", // CONFIRM
    instagram: "https://www.instagram.com/", // CONFIRM
  },

  /** Acknowledgement of Country — Turrbal & Jagera peoples (Meanjin/Brisbane). */
  acknowledgement:
    "The Munro Centre acknowledges the Traditional Custodians of the land on which we learn and play, the Turrbal and Jagera peoples, and pays respect to Elders past, present and emerging.",

  /** Primary local-SEO keyword set woven through metadata + copy. */
  keywords: [
    "childcare St Lucia",
    "early learning centre St Lucia",
    "long day care St Lucia",
    "daycare St Lucia",
    "kindergarten St Lucia",
    "childcare near UQ",
    "not-for-profit childcare Brisbane",
    "childcare Brisbane",
    "preschool St Lucia",
    "child care Toowong",
    "child care Indooroopilly",
    "The Munro Centre",
  ],
} as const;

export type Site = typeof site;
