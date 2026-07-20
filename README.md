# The Munro Centre

A premium, conversion-focused website for **The Munro Centre** — a community-based, **not-for-profit** early learning and long day care centre at **UQ, St Lucia, Brisbane**, caring for local families since **1981**.

Two jobs, done well: **make parents want to book a tour**, and **rank locally on Google** for early-learning searches in St Lucia and inner-west Brisbane.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Radix UI (shadcn-style components)
- **Design:** warm, friendly, playful — Baloo 2 rounded display + Inter body, the bright logo palette (blue/yellow/green/red) as cheerful accents on a calm cream base, soft motion.
- **Standalone project:** this lives in its own folder and git repo — it is unrelated to any other project on the machine.

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3200 (see .claude/launch.json)
pnpm build    # production build (fully static)
pnpm start
pnpm lint
```

## Project structure

```
app/
  layout.tsx           Fonts, global SEO metadata + geo tags, JSON-LD, nav/footer/sticky CTA
  page.tsx             Homepage — composes the sections in order
  actions.ts           Tour-request server action (validation; wire to email/CRM)
  globals.css          Design tokens (@theme), base styles, utilities, keyframes
  sitemap.ts / robots.ts / manifest.ts / opengraph-image.tsx / twitter-image.tsx / icon.svg
lib/
  site.ts              Single source of truth: NAP, hours, OWNA, KGF meals, SEO config  ← EDIT FIRST
  content.ts           All page copy (CMS-ready)
  images.ts            Image manifest → files in /public/images
  seo.ts               JSON-LD (LocalBusiness/ChildCare, WebSite, per-room programs, FAQPage)
  motion.ts / utils.ts
components/
  brand/ · primitives/ (Container, Section, Eyebrow, Reveal, Stars, CountUp, Atmosphere) · ui/ (Button, Accordion, Dialog)
  layout/ (Navbar, Footer, MobileCtaBar, ScrollProgress) · icon-map.ts
  sections/  Hero · TrustBar · About · Rooms · RoomFinder · Welcome · Features · Meals ·
             DayAtMunro · Educators · Impact · Fees · Testimonials · VirtualTour ·
             Philosophy · Faq · FinalCta · BookTour
public/images/         The centre's own photography
```

## What's included (per Ana's brief)

- **Six real rooms** with age ranges (GTF, Bandicoots, Echidna, Cassowary Chicks, Cassowary, Kookaburra).
- **Kindy Approved** kindergarten program (Kookaburra room) — surfaced in the trust bar, Features and FAQ.
- **OWNA** named as the digital platform for communication & bookings (Features + FAQ + `lib/site.ts`).
- **Not-for-profit, community-based** positioning throughout (hero, Features, Impact, since-1981).
- **Multicultural & inclusive** — a signature "Every Family Is Welcome" section (18+ language greetings) plus real multicultural-storytelling, First Nations and reconciliation photography.
- **Meals provided via KGF** — a dedicated Meals section + trust bar + FAQ.
- A clear **Book a Tour** path everywhere (nav, hero, every room card, final CTA, sticky mobile bar) + a working form.

## Editing content

Two ways to edit, and they work together:

- **Sanity CMS (no code) — the everyday way.** Staff log in at **`/studio`** and edit all copy, images, rooms, educators, testimonials, FAQs, fees and contact details; published changes appear on the live site automatically. One-time setup (create the project + add Vercel env vars) is in **`docs/SANITY_SETUP.md`**; the plain-English staff guide is **`docs/EDITING_GUIDE.md`**. There's also a friendly, illustrated how-to page built into the site at **`/guide`** (unlisted — `noindex`, not in the nav or sitemap) that staff can follow along with, plus a ready-to-run training script for onboarding the team in **`docs/CMS_TRAINING_PRESENTATION.md`**.
- **Code (defaults & fallback).** Until Sanity is connected — and as the built-in fallback for anything not yet entered there — content comes from `lib/content.ts` (copy), `lib/site.ts` (NAP, hours, OWNA, KGF) and `lib/images.ts` (photo slots → `/public/images`). Because of this fallback the site never renders blank, and deploying before Sanity is set up is always safe.

## SEO — built in (on-page / technical)

Per-page metadata (title, description, local keywords, canonical, OpenGraph/Twitter, robots, geo tags), `lang="en-AU"`, structured data (`ChildCare`/`EducationalOrganization` with NAP + geo + hours + areaServed, per-room `EducationalOccupationalProgram`, `WebSite`, `FAQPage`), `sitemap.xml`, `robots.txt`, manifest, generated OG/Twitter cards, fully static prerender, `next/image` + `next/font`, semantic headings with the locality keyword in the H1 and section H2s.

> No star rating is shown or emitted in schema — self-asserted ratings without genuine, verifiable reviews violate Google's policy. Add a real, sourced rating (from your Google Business Profile, with Review markup) once reviews exist.

## ⚠️ Before launch — supply / confirm

- [ ] **Philosophy:** replace the interim statement in `lib/content.ts` (`philosophy`) with Ana's final version.
- [ ] **Weekly menu photo:** add the image to `/public/images` and set `meals.menuImage` in `lib/content.ts` (currently a styled placeholder).
- [ ] **Opening hours:** confirm the real hours in `lib/site.ts` (`hours`) — currently a typical 7:30am–6:00pm placeholder.
- [ ] **Testimonials:** replace the placeholder sentiment in `lib/content.ts` (`testimonials`) with real, attributed Google/Facebook reviews.
- [ ] **Social URLs** and **legal/approved-provider name** in `lib/site.ts` (marked `CONFIRM`).
- [ ] **OWNA booking link:** if you have a direct OWNA enrolment URL, point the CTAs at it (or wire the form below to it).
- [ ] **Wire the tour form:** `app/actions.ts` validates and succeeds but doesn't deliver the lead yet — connect the `TODO(integration)` to email (Resend), Formspree, OWNA or a CRM.

## Off-page — to actually rank #1 locally

On-page is necessary but not sufficient:

- [ ] Verify a **Google Business Profile** at the exact NAP; add photos, hours, categories.
- [ ] Verify in **Google Search Console** (add the token to `metadata.verification.google` in `app/layout.tsx`) and submit the sitemap.
- [ ] Earn real **Google reviews**; build **local citations** (consistent NAP) and a few quality local backlinks.
- [ ] Run Google's **Rich Results Test** after deploy.

## Deploy

Optimised for **Vercel** (import repo → set production domain → deploy). Any Node host running `next build` / `next start` works.
