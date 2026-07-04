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
  { label: "Fees", href: "#fees" },
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
  /**
   * Real Google reviews from Munro families — lightly trimmed to complete
   * sentences, with obvious typos and US spellings normalised (no wording
   * invented). Every one shown here reads as a 5-star review. Update here or in
   * the CMS as new reviews come in.
   */
  items: [
    {
      quote:
        "We've just left the Munro Centre after about 5 years in total with our two children, who both loved their time there. It's a great place for families, with wonderful educators and management who strike the right balance between care and professionalism.",
      name: "Tyler Riordan",
      detail: "Parent of two · 5 years at Munro",
    },
    {
      quote:
        "My daughter has been attending the Munro Centre since she was 6 months old — at first just a few days a week, and now full time. She absolutely loves all the staff and children there, and it has been amazing watching her community grow.",
      name: "Marina Burgin",
      detail: "Parent · St Lucia",
    },
    {
      quote:
        "So happy to have found this place for my child's care. Staff are welcoming and lovely, the place is well set up, the program excellent and communication great. It's a small centre, so lots of individual attention — my daughter loves it so much that half the time she runs away when I go to pick her up!",
      name: "Claudia Jade",
      detail: "Parent · St Lucia",
    },
    {
      quote:
        "A great daycare centre, especially for kids 3 and under. It's an independent not-for-profit, so all funds are reinvested back into the centre. On top of a high level of care, it strikes an impressive learning balance of Indigenous, Anglo-Australian and overseas cultures.",
      name: "Blake Tindale",
      detail: "Parent",
    },
    {
      quote:
        "Our son is in the Green Tree Frog (nursery) room and we couldn't be happier. Having looked at other daycare centres, this one had the most genuinely caring and attentive educators and office staff.",
      name: "Amanda Salmon",
      detail: "Nursery (GTF) parent",
    },
    {
      quote:
        "A wonderful experience — all the educators are warm, friendly and supportive. My daughter has grown so much in confidence, independence and social skills over the years. I'd strongly recommend Munro to any family looking for a caring centre.",
      name: "Junqiao Du",
      detail: "Parent",
    },
    {
      quote:
        "Hard-working and caring staff in a smaller setting. We travel interstate and were so grateful to Munro for accommodating our 12-month-old at short notice.",
      name: "Bianca Das",
      detail: "Visiting family",
    },
    {
      quote:
        "I can't say enough good things about Munro! Our family has moved a lot, so between our two kids we've been in 11 different daycares — we've seen a lot of centres, and Munro is one of our favourites.",
      name: "Emily Wang",
      detail: "Parent of two",
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

/* ===========================================================================
   Interactive Room Finder
   Age bounds (in months) for each room — overlaps are intentional, since
   several rooms span similar ages. Keyed by room.key.
   ======================================================================== */
export const roomAgeMonths: Record<string, { min: number; max: number }> = {
  gtf: { min: 0, max: 15 },
  bandicoots: { min: 15, max: 24 },
  echidna: { min: 15, max: 30 },
  "cassowary-chicks": { min: 18, max: 30 },
  cassowary: { min: 24, max: 42 },
  kookaburra: { min: 42, max: 66 },
};

export const roomFinder = {
  eyebrow: "Find your room",
  title: "Which room is right for your child?",
  copy: "Tell us how old your little one is and we'll show you where they'd belong — then book a tour to come and see it.",
  /** Quick-pick age presets (in months). */
  presets: [
    { label: "Baby", detail: "6 wks–15 mo", months: 9 },
    { label: "Toddler", detail: "15 mo–2 yrs", months: 20 },
    { label: "Pre-kindy", detail: "2–3.5 yrs", months: 34 },
    { label: "Kindy", detail: "3.5 yrs+", months: 48 },
  ],
};

/* ===========================================================================
   Meet the Educators
   PLACEHOLDER people — names, roles and details are illustrative sample data
   to show the layout. Replace with the centre's real team (with consent and
   photos) before launch. Avatars render coloured initials, so no portrait
   photography is required to ship the design.
   ======================================================================== */
export type Educator = {
  name: string;
  role: string;
  room: string;
  years: string;
  languages: string[];
  quote: string;
};

export const educators = {
  eyebrow: "Meet the team",
  title: "The people your child will love",
  copy: "Qualified, warm and wonderfully diverse — many of our educators have been with Munro for years. They speak your child's languages, know them by name, and treat your family like their own.",
  // PLACEHOLDER — replace with real educators before launch.
  people: [
    {
      name: "Ana",
      role: "Centre Director",
      room: "Whole centre",
      years: "20+ years",
      languages: ["English", "Spanish"],
      quote: "Every child here is known, celebrated and safe — that's the promise we keep every single day.",
    },
    {
      name: "Mei",
      role: "Lead Educator",
      room: "Kookaburra · Kindy",
      years: "9 years",
      languages: ["English", "Mandarin"],
      quote: "I love watching our kindy kids grow into confident, curious little learners ready for school.",
    },
    {
      name: "Priya",
      role: "Early Childhood Teacher",
      room: "Cassowary",
      years: "7 years",
      languages: ["English", "Hindi"],
      quote: "Play is how children make sense of the world — my job is to follow their wonder.",
    },
    {
      name: "Sose",
      role: "Educator",
      room: "GTF · Nursery",
      years: "11 years",
      languages: ["English", "Samoan"],
      quote: "Our littlest ones need tender, responsive care — and so do their parents. We're here for both.",
    },
    {
      name: "Lucas",
      role: "Educator",
      room: "Bandicoots",
      years: "5 years",
      languages: ["English", "Portuguese"],
      quote: "Big feelings, first words, new friendships — toddler days are never dull and I wouldn't trade them.",
    },
    {
      name: "Hana",
      role: "Educator & Cultural Lead",
      room: "Echidna",
      years: "8 years",
      languages: ["English", "Japanese"],
      quote: "We weave every family's culture into our days — belonging is something children can feel.",
    },
  ] as Educator[],
};

/* ===========================================================================
   A Day at Munro — the rhythm of a typical day (answers a top parent worry).
   ======================================================================== */
export const daySchedule = {
  eyebrow: "A day at Munro",
  title: "What a day with us looks like",
  copy: "Unhurried, predictable and full of play. Every day flows to a gentle rhythm that helps children feel secure — with plenty of room for discovery in between.",
  steps: [
    { time: "7:30am", title: "Warm welcomes", copy: "Soft starts, familiar faces and a calm landing into the day." },
    { time: "9:00am", title: "Morning tea & play", copy: "Freshly catered morning tea, then child-led indoor and outdoor play." },
    { time: "10:30am", title: "Intentional learning", copy: "Play-based experiences guided by educators — language, art, nature and culture." },
    { time: "12:00pm", title: "Lunch together", copy: "A nutritious cooked lunch by KGF, shared around the table." },
    { time: "1:00pm", title: "Rest & quiet time", copy: "Sleep or restful play, tailored to each child's needs." },
    { time: "3:00pm", title: "Afternoon adventures", copy: "Afternoon tea, more play and projects that follow the children's interests." },
    { time: "6:00pm", title: "Happy goodbyes", copy: "Daily highlights and photos shared with you through the OWNA app." },
  ],
};

/* ===========================================================================
   Fees & Child Care Subsidy (CCS)
   The estimator uses the official 2024–25 CCS taper, but the base daily fee is
   an EDITABLE SAMPLE — confirm the centre's real fee before relying on figures.
   ======================================================================== */
export const fees = {
  eyebrow: "Fees & subsidy",
  title: "Affordable, transparent — and not-for-profit",
  copy: "As a community-owned centre, our fees go straight back into your child's care, never to shareholders. Most families also access the Child Care Subsidy (CCS), which significantly reduces what you actually pay.",
  points: [
    { title: "Child Care Subsidy", copy: "Eligible families can have a large share of fees subsidised by the government, paid directly to us." },
    { title: "Every dollar reinvested", copy: "Surplus goes back into educators, resources and your child's everyday experience." },
    { title: "No hidden extras", copy: "Meals, nappies and the kindy program are included — no lunchboxes, no surprises." },
  ],
  estimator: {
    /** SAMPLE daily fee — editable in the UI. Confirm the real figure. */
    sampleDailyFee: 130,
    note: "Indicative only. CCS depends on your income, activity level and child's age — we'll give you exact figures on your tour.",
  },
};
