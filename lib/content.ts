/**
 * All editorial copy + structured content for the homepage.
 * Kept separate from presentation so it can move to a CMS later untouched.
 * Image references are *keys* into lib/images.ts.
 *
 * NOTE: testimonials are PLACEHOLDER sentiment — replace with real, attributed
 * Google/Facebook reviews before launch. The philosophy is interim (Ana's full
 * statement is being refreshed). A weekly-menu photo is requested from the centre.
 */

import type { ImageKey } from "./images";
import { site } from "./site";

export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Community", href: "#welcome" },
  { label: "Meals", href: "#meals" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Not-for-profit early learning · St Lucia",
  title: "Every Child\nDeserves To Belong",
  subhead:
    "Community-based care and kindergarten in St Lucia, Brisbane — nurturing local families since 1981.",
  primaryCta: { label: "Book a Tour", href: "#book" },
  secondaryCta: { label: `Call ${site.contact.phone}`, href: site.contact.phoneHref },
  highlights: ["Caring since 1981", "Kindy Approved", "Not-for-profit"],
  image: "child_nora" as ImageKey,
  imageSecondary: "child_ruby" as ImageKey,
};

export type TrustItem = { icon: string; label: string; sub: string };

export const trustBar: TrustItem[] = [
  { icon: "heart", label: "Not-for-profit", sub: "Community-owned" },
  { icon: "calendar", label: "Since 1981", sub: "40+ years of care" },
  { icon: "graduation", label: "Kindy Approved", sub: "Government-approved" },
  { icon: "globe", label: "Multicultural", sub: "Every family welcome" },
  { icon: "utensils", label: "Meals provided", sub: "Freshly catered by KGF" },
  { icon: "phone", label: "OWNA app", sub: "Connected to your child's day" },
];

export const about = {
  eyebrow: "Why families choose Munro",
  title: "More than childcare — a St Lucia community where children belong",
  intro:
    "Since 1981 we've been a not-for-profit centre owned by our community, not shareholders. That difference shows up everywhere: in unhurried, genuine care, in educators who stay, and in children who feel at home.",
  pillars: [
    {
      key: "belong",
      name: "Belong",
      copy: "Children feel safe, seen and valued in a warm, multicultural community where every family is welcome.",
      image: "team" as ImageKey,
    },
    {
      key: "grow",
      name: "Grow",
      copy: "Play-based learning, guided by qualified educators, that builds curiosity, confidence and a love of discovery.",
      image: "multicultural_storytelling" as ImageKey,
    },
    {
      key: "thrive",
      name: "Thrive",
      copy: "A nurturing, inclusive environment — rich in culture and connection — that prepares children for life's next chapter.",
      image: "first_nations" as ImageKey,
    },
  ],
};

export const rooms = {
  eyebrow: "Our rooms",
  title: "A room for every age and stage",
  intro:
    "Six thoughtfully designed rooms, each named for a native Australian animal, with educators who specialise in that age — from our nursery to our Kindy Approved kindergarten room.",
  items: [
    {
      key: "gtf",
      name: "GTF",
      tag: "Nursery",
      age: "6 weeks – 15 months",
      copy: "Tender, responsive care in a calm, home-like room where your baby feels secure and deeply known.",
      image: "child_ruby" as ImageKey,
    },
    {
      key: "bandicoots",
      name: "Bandicoots",
      tag: "Toddlers",
      age: "15 months – 2 years",
      copy: "First steps and big discoveries — sensory play, early language and the comfort of familiar faces.",
      image: "child_vinh" as ImageKey,
    },
    {
      key: "echidna",
      name: "Echidna",
      tag: "Toddlers",
      age: "15 months – 2.5 years",
      copy: "Curious explorers building independence, friendships and confidence through hands-on play.",
      image: "child_johnathan" as ImageKey,
    },
    {
      key: "cassowary-chicks",
      name: "Cassowary Chicks",
      tag: "Juniors",
      age: "18 months – 2.5 years",
      copy: "Busy, joyful days that grow social skills, language and an early love of learning.",
      image: "foyer_display" as ImageKey,
    },
    {
      key: "cassowary",
      name: "Cassowary",
      tag: "Pre-kindy",
      age: "2 years – 3.5 years",
      copy: "Imaginative, child-led learning that builds resilience, creativity and connection to community.",
      image: "community_incursion" as ImageKey,
    },
    {
      key: "kookaburra",
      name: "Kookaburra",
      tag: "Kindy Approved",
      age: "3.5 years – Prep age",
      copy: "Our Kindy Approved kindergarten room — preparing confident, capable learners for a smooth start to school.",
      image: "children_writing" as ImageKey,
    },
  ],
};

export const welcome = {
  eyebrow: "Multicultural & inclusive",
  title: "Every Family Is Welcome Here",
  copy: "Our families speak many languages and bring many cultures — and we celebrate every one. From multicultural storytelling to embedding Aboriginal and Torres Strait Islander perspectives, belonging is woven through everything we do.",
  greetings: [
    { word: "Welcome", lang: "English" },
    { word: "Kia ora", lang: "Māori" },
    { word: "Bienvenida", lang: "Spanish" },
    { word: "ようこそ", lang: "Japanese" },
    { word: "欢迎", lang: "Mandarin" },
    { word: "환영합니다", lang: "Korean" },
    { word: "Xin chào", lang: "Vietnamese" },
    { word: "Talofa", lang: "Samoan" },
    { word: "नमस्ते", lang: "Hindi" },
    { word: "Salam", lang: "Arabic" },
    { word: "Bula", lang: "Fijian" },
    { word: "Selamat datang", lang: "Indonesian" },
    { word: "Benvenuto", lang: "Italian" },
    { word: "Witaj", lang: "Polish" },
    { word: "Hej", lang: "Danish" },
    { word: "Ayubowan", lang: "Sinhala" },
    { word: "Sawubona", lang: "Zulu" },
    { word: "Mālō e lelei", lang: "Tongan" },
  ],
};

export type Feature = { icon: string; title: string; copy: string };

export const features = {
  eyebrow: "The Munro difference",
  title: "What makes Munro, Munro",
  items: [
    {
      icon: "heart",
      title: "Not-for-profit & community-owned",
      copy: "Every dollar goes back into children, educators and our community — never shareholders.",
    },
    {
      icon: "graduation",
      title: "Kindy Approved",
      copy: "A government-approved kindergarten program in our Kookaburra room, led by a qualified teacher.",
    },
    {
      icon: "calendar",
      title: "Trusted since 1981",
      copy: "More than 40 years of warm, reliable care for St Lucia families, right on the UQ campus.",
    },
    {
      icon: "globe",
      title: "Multicultural & inclusive",
      copy: "Many languages, many cultures, one community — where every family genuinely belongs.",
    },
    {
      icon: "utensils",
      title: "Meals provided",
      copy: "Nutritious meals freshly catered each day by KGF, with all dietary needs covered. No lunchboxes.",
    },
    {
      icon: "phone",
      title: "Connected with OWNA",
      copy: "Daily updates, photos and bookings through the OWNA app — so you never miss a moment.",
    },
  ] as Feature[],
};

export const meals = {
  eyebrow: "Nourishing little learners",
  title: "Freshly prepared meals, every day",
  copy: "Good food fuels big days. All meals and snacks are provided and freshly prepared by our catering partner KGF (Kids Gourmet Food) — so there are no lunchboxes to pack, and every child eats well.",
  points: [
    "Morning tea, lunch & afternoon tea included",
    "Allergy, dietary & cultural needs catered for",
    "Seasonal, child-friendly menus on rotation",
    "Freshly catered by KGF — Kids Gourmet Food",
  ],
  /** TODO: add the real weekly menu image to /public/images and set this. */
  menuImage: "" as string,
};

export const team = {
  eyebrow: "Meet our team",
  title: "The people your child will love",
  copy: "Qualified, warm and wonderfully diverse — many of our educators have been with Munro for years. They speak your child's languages, know them by name, and treat your family like their own.",
  image: "educators_wall" as ImageKey,
  points: [
    "Qualified, degree- and diploma-led educators",
    "A multilingual, multicultural team",
    "Familiar faces who stay, year after year",
  ],
};

export const impact = {
  eyebrow: "The not-for-profit difference",
  title: "Every Dollar Goes Back Into Children",
  copy: "As a community-owned, not-for-profit centre, we don't answer to shareholders. Every dollar is reinvested into the people and places that shape your child's day — which is exactly why the care here feels different, and why families have trusted us since 1981.",
  points: [
    "Richer, natural learning resources in every room",
    "Ongoing training and development for our educators",
    "Safe, welcoming and well-cared-for spaces",
    "Strong community, cultural and family programs",
  ],
  image: "reconciliation" as ImageKey,
  stats: [
    { value: "100%", label: "of surplus reinvested in children" },
    { value: "1981", label: "caring for St Lucia since" },
    { value: "6", label: "age-specific rooms" },
  ],
};

export const testimonials = {
  eyebrow: "From our families",
  title: "Loved by St Lucia families",
  // PLACEHOLDER sentiment — replace with real, attributed reviews before launch.
  items: [
    {
      quote:
        "The Munro Centre feels like family. Our daughter runs in smiling every morning — and as a parent, that's everything.",
      name: "A Munro family",
      detail: "St Lucia",
    },
    {
      quote:
        "The educators truly know our son — his moods, his words, what makes him laugh. That kind of genuine care is rare.",
      name: "A Munro family",
      detail: "Toowong",
    },
    {
      quote:
        "Knowing it's not-for-profit and every dollar goes back into the children gave us real peace of mind from the first tour.",
      name: "A Munro family",
      detail: "Indooroopilly",
    },
  ],
};

export const tour = {
  eyebrow: "A look inside",
  title: "Life at Munro",
  copy: "Real moments from our rooms, our community and the culture that makes Munro feel like home.",
  gallery: [
    { image: "foyer_display" as ImageKey, caption: "Our children's art" },
    { image: "educators_wall" as ImageKey, caption: "Our educators" },
    { image: "community_incursion" as ImageKey, caption: "Community visits" },
    { image: "multicultural_storytelling" as ImageKey, caption: "Multicultural storytelling" },
    { image: "first_nations" as ImageKey, caption: "First Nations perspectives" },
    { image: "reconciliation" as ImageKey, caption: "Reconciliation in action" },
  ],
};

export const philosophy = {
  eyebrow: "Our philosophy",
  title: "What guides us",
  copy: "Our full philosophy is currently being refreshed together with our educators and families. At its heart is a simple belief: that every child deserves to belong, to be known, and to learn through play in a safe, inclusive and culturally rich community.",
  note: "The complete statement will be shared here soon.",
};

export const faq = {
  eyebrow: "Good questions",
  title: "Everything you might be wondering",
  items: [
    {
      q: "What are your fees, and is the Child Care Subsidy (CCS) available?",
      a: "Our fees depend on your child's room and the days they attend. As an approved provider, eligible families can access the Child Care Subsidy (CCS), which significantly reduces out-of-pocket costs. As a not-for-profit, our fees go straight back into your child's care — we'll walk you through the detail on your tour.",
    },
    {
      q: "How do I book a tour or enrol?",
      a: "Tap “Book a Tour”, leave a few details, and we'll be in touch within one business day. Bookings and enrolment are managed through OWNA, our secure digital platform — we'll help you get set up.",
    },
    {
      q: "What rooms and age groups do you have?",
      a: "We have six rooms, each named for a native Australian animal: GTF (6 weeks–15 months), Bandicoots (15 months–2 years), Echidna (15 months–2.5 years), Cassowary Chicks (18 months–2.5 years), Cassowary (2–3.5 years) and our Kindy Approved Kookaburra room (3.5 years–Prep age).",
    },
    {
      q: "Are meals provided?",
      a: "Yes — all meals and snacks are included and freshly prepared by our catering partner KGF (Kids Gourmet Food): morning tea, lunch and afternoon tea, with all dietary, allergy and cultural needs catered for. There are no lunchboxes to pack.",
    },
    {
      q: "Do you offer a kindergarten program?",
      a: "Yes. Our Kookaburra room runs a Kindy Approved kindergarten program led by a qualified early childhood teacher, preparing children for a confident transition to school.",
    },
    {
      q: "What makes a not-for-profit, community-based centre different?",
      a: "We've been community-owned since 1981 and we don't answer to shareholders. Every dollar is reinvested into children, educators and our community — which is why the care, the resources and the relationships here feel different.",
    },
    {
      q: "Where are you located?",
      a: "We're at 7 Dell Road, St Lucia QLD 4067 — on the University of Queensland campus, close to Toowong and Indooroopilly, with easy access for drop-off.",
    },
  ],
};

export const finalCta = {
  eyebrow: "Enrolling now",
  title: "We'd Love To Welcome\nYour Family",
  copy: "Come and feel the difference a community-owned centre makes. Book a tour, or call us — we'd love to show you around.",
  image: "child_nora" as ImageKey,
};

export const footer = {
  columns: [
    {
      title: "Explore",
      links: [
        { label: "About", href: "#about" },
        { label: "Our Rooms", href: "#rooms" },
        { label: "Community", href: "#welcome" },
        { label: "Meals", href: "#meals" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Our Rooms",
      links: [
        { label: "GTF — Nursery", href: "#rooms" },
        { label: "Bandicoots", href: "#rooms" },
        { label: "Echidna", href: "#rooms" },
        { label: "Cassowary Chicks", href: "#rooms" },
        { label: "Cassowary", href: "#rooms" },
        { label: "Kookaburra — Kindy", href: "#rooms" },
      ],
    },
  ],
};
