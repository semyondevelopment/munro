import type { Metadata } from "next";
import Link from "next/link";
import {
  LogIn,
  PenLine,
  ImagePlus,
  Rocket,
  Phone,
  Clock,
  MessageSquareQuote,
  Users,
  DoorOpen,
  Star,
  HelpCircle,
  ArrowUpDown,
  Share2,
  Trash2,
  ShieldCheck,
  Undo2,
  Sparkles,
  Info,
  LayoutGrid,
  Settings,
  ImageIcon,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Logo } from "@/components/brand/logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Unlisted staff guide (/guide) — a friendly, plain-English walkthrough of how
 * to edit the website in Sanity Studio. Deliberately kept out of the marketing
 * chrome, the nav/footer, the sitemap and the search index (see `robots` below
 * and app/robots.ts). It's a static server component with no CMS dependency, so
 * it renders identically on localhost, preview and production, whether or not
 * Sanity is connected. Share the URL directly with the team.
 */
export const metadata: Metadata = {
  title: "Team Guide · Updating your website",
  description:
    "A friendly, step-by-step guide for The Munro Centre team on updating the website yourselves — no code, no developer.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/guide" },
};

/* ---------------------------------------------------------------- tokens */

type Tone = "blue" | "green" | "yellow" | "red";

const toneTile: Record<Tone, string> = {
  blue: "bg-brand-blue-100 text-brand-blue-deep",
  green: "bg-brand-green-100 text-brand-green-deep",
  yellow: "bg-brand-yellow-100 text-brand-yellow-deep",
  red: "bg-brand-red-100 text-brand-red-deep",
};

/* ------------------------------------------------------------ tiny pieces */

function SectionHeading({
  color,
  label,
  title,
  children,
}: {
  color: Tone;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow color={color} center>
        {label}
      </Eyebrow>
      <h2 className="mt-5 text-balance text-3xl sm:text-4xl">{title}</h2>
      {children ? (
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
          {children}
        </p>
      ) : null}
    </div>
  );
}

/** A numbered step with an accent circle. */
function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-[0.8rem] font-semibold text-cream">
        {n}
      </span>
      <span className="text-[1.02rem] leading-relaxed text-ink">{children}</span>
    </li>
  );
}

/** A "where to click" breadcrumb chip, e.g. Site settings → Contact. */
function Where({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill bg-sand px-3 py-1 font-sans text-[0.72rem] font-semibold uppercase tracking-wide text-navy/70">
      <LayoutGrid className="size-3.5" strokeWidth={2} aria-hidden />
      {children}
    </span>
  );
}

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-navy/8 bg-paper p-6 shadow-soft print:break-inside-avoid sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Tile({ icon: Icon, tone }: { icon: LucideIcon; tone: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-2xl",
        toneTile[tone],
      )}
    >
      <Icon className="size-6" strokeWidth={1.9} aria-hidden />
    </span>
  );
}

/* ------------------------------------------------------------------- data */

const studioUrl = `${site.url.replace(/^https?:\/\//, "")}/studio`;

const menu: { icon: LucideIcon; tone: Tone; name: string; blurb: string }[] = [
  {
    icon: LayoutGrid,
    tone: "blue",
    name: "Homepage",
    blurb:
      "Every word and photo on the main page. Split into tabs along the top — Hero, About, Community, Meals, A Day, Educators, Impact, Fees, Room Finder, Gallery, Philosophy and Final CTA.",
  },
  {
    icon: Settings,
    tone: "green",
    name: "Site settings",
    blurb:
      "Your phone, email, address, opening hours, Google Maps link and social links. Three tabs: Contact, Hours, and Social & legal.",
  },
  {
    icon: DoorOpen,
    tone: "yellow",
    name: "Rooms",
    blurb:
      "Your six rooms — GTF, Bandicoots, Echidna, Cassowary Chicks, Cassowary and Kookaburra. Edit the name, age, description and photo of each.",
  },
  {
    icon: Users,
    tone: "red",
    name: "Educators",
    blurb:
      "Your team members and their short quotes. Add someone new, update a role, or remove a person who has moved on.",
  },
  {
    icon: MessageSquareQuote,
    tone: "blue",
    name: "Testimonials",
    blurb: "Real family reviews. Paste in new Google or Facebook reviews as they come in.",
  },
  {
    icon: HelpCircle,
    tone: "green",
    name: "FAQs",
    blurb: "The questions and answers near the bottom of the page.",
  },
  {
    icon: Star,
    tone: "yellow",
    name: "Features",
    blurb: "The “What makes Munro, Munro” highlight cards.",
  },
  {
    icon: ShieldCheck,
    tone: "red",
    name: "Trust bar",
    blurb: "The little badges near the top — Not-for-profit, Since 1981, Kindy Approved, and so on.",
  },
];

const recipes: {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  where: string;
  steps: React.ReactNode[];
}[] = [
  {
    icon: Phone,
    tone: "blue",
    title: "Change our phone, email or address",
    where: "Site settings → Contact",
    steps: [
      "Click Site settings in the left menu.",
      "Make sure you're on the Contact tab.",
      "Type your change into the phone, email or address box.",
      <>
        Click <strong>Publish</strong>.
      </>,
    ],
  },
  {
    icon: Clock,
    tone: "green",
    title: "Update our opening hours",
    where: "Site settings → Hours",
    steps: [
      "Click Site settings, then the Hours tab.",
      <>
        Edit the <em>Opening hours</em> line (e.g. “Monday – Friday, 7:30am – 6:00pm”).
      </>,
      <>
        Click <strong>Publish</strong>.
      </>,
    ],
  },
  {
    icon: MessageSquareQuote,
    tone: "yellow",
    title: "Add a new family review",
    where: "Testimonials → + Create",
    steps: [
      "Click Testimonials in the left menu.",
      <>
        Click <strong>+ Create</strong> at the top.
      </>,
      "Paste the review into Quote, and add the family's name and suburb.",
      <>
        Set an <em>Order</em> number (lower shows first), then <strong>Publish</strong>.
      </>,
    ],
  },
  {
    icon: Users,
    tone: "red",
    title: "Add or update a team member",
    where: "Educators → + Create",
    steps: [
      "Click Educators in the left menu.",
      <>
        Click an existing person to edit them, or <strong>+ Create</strong> for someone new.
      </>,
      "Fill in the first name, role, room and a short quote.",
      <>
        Click <strong>Publish</strong>.
      </>,
    ],
  },
  {
    icon: DoorOpen,
    tone: "blue",
    title: "Change a room's photo or words",
    where: "Rooms",
    steps: [
      "Click Rooms, then click the room you want to change.",
      "Edit the description, or click the photo to upload a new one.",
      "Add a few words of alt text describing the new photo.",
      <>
        Click <strong>Publish</strong>.
      </>,
    ],
  },
  {
    icon: ImageIcon,
    tone: "green",
    title: "Swap the big front-page photo or headline",
    where: "Homepage → Hero",
    steps: [
      "Click Homepage, then the Hero tab at the top.",
      "Edit the Headline, or click Main photo to upload a new one.",
      "Add alt text for any new photo.",
      <>
        Click <strong>Publish</strong>.
      </>,
    ],
  },
  {
    icon: HelpCircle,
    tone: "yellow",
    title: "Add or change a question (FAQ)",
    where: "FAQs → + Create",
    steps: [
      "Click FAQs in the left menu.",
      <>
        Click a question to edit it, or <strong>+ Create</strong> to add a new one.
      </>,
      "Type the Question and the Answer.",
      <>
        Give it an <em>Order</em> number, then <strong>Publish</strong>.
      </>,
    ],
  },
  {
    icon: ArrowUpDown,
    tone: "red",
    title: "Put things in a different order",
    where: "Any list → Order",
    steps: [
      "Open the room, educator, review or FAQ you want to move.",
      <>
        Change its <em>Order</em> number — lower numbers show first (1 is at the top).
      </>,
      <>
        Click <strong>Publish</strong>.
      </>,
    ],
  },
  {
    icon: Share2,
    tone: "blue",
    title: "Add our Facebook or Instagram",
    where: "Site settings → Social & legal",
    steps: [
      "Click Site settings, then the Social & legal tab.",
      "Paste the full link (starting with https://) into Facebook or Instagram.",
      <>
        Click <strong>Publish</strong> — the icon then appears in the footer.
      </>,
    ],
  },
  {
    icon: Trash2,
    tone: "green",
    title: "Remove something",
    where: "Any item → ⋮ menu",
    steps: [
      "Open the item you want to remove.",
      <>
        Click the <strong>⋮</strong> menu (top right) and choose <strong>Delete</strong>.
      </>,
      "Confirm — it disappears from the website within a minute.",
    ],
  },
];

const rules: { icon: LucideIcon; tone: Tone; title: string; copy: string }[] = [
  {
    icon: Rocket,
    tone: "blue",
    title: "Nothing is live until you Publish",
    copy: "You can type and change anything safely. It only reaches the public website when you click the green Publish button.",
  },
  {
    icon: ImagePlus,
    tone: "green",
    title: "Always add alt text to photos",
    copy: "A few words describing each photo. It helps families using screen readers, and helps Google understand your page.",
  },
  {
    icon: Undo2,
    tone: "yellow",
    title: "You can't lose your work",
    copy: "Your changes save as a draft automatically as you type. Close the tab and come back — it'll still be there.",
  },
  {
    icon: ShieldCheck,
    tone: "red",
    title: "You can't break the design",
    copy: "You only ever edit words and pictures. The layout, colours and fonts are locked — the site always looks right.",
  },
  {
    icon: Undo2,
    tone: "blue",
    title: "Made a mistake? Roll it back",
    copy: "Open the item, click the ⋮ menu → Review changes, and restore an earlier version. Nothing is ever truly gone.",
  },
  {
    icon: Clock,
    tone: "green",
    title: "Give it about a minute",
    copy: "After you Publish, the website updates within roughly 60 seconds. Refresh the page if you don't see it straight away.",
  },
];

const jumpLinks = [
  { href: "#sign-in", label: "Signing in" },
  { href: "#tour", label: "The tour" },
  { href: "#everyday", label: "Everyday edits" },
  { href: "#recipes", label: "How-to recipes" },
  { href: "#rules", label: "Golden rules" },
  { href: "#help", label: "Help" },
];

/* ------------------------------------------------------------------- page */

export default function GuidePage() {
  return (
    <div className="min-h-dvh bg-cream">
      {/* Slim top bar — always keep "Open the editor" one click away. */}
      <header className="sticky top-0 z-50 border-b border-navy/8 bg-paper/85 backdrop-blur-xl print:hidden">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-auto" />
            <span className="hidden rounded-pill bg-brand-green-100 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-brand-green-deep sm:inline">
              Team guide
            </span>
          </div>
          <Link
            href="/studio"
            className="inline-flex h-10 items-center gap-2 rounded-pill bg-navy px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-navy-700"
          >
            <LogIn className="size-4" strokeWidth={2} aria-hidden />
            Open the editor
          </Link>
        </Container>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent_75%)]"
        />
        <Container className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-pill bg-sand px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-ink-soft">
              <Info className="size-3.5" strokeWidth={2} aria-hidden />
              Private team page · not shown on the public website
            </span>
            <h1 className="mt-6 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              You can update the website —{" "}
              <span className="squiggle">all by yourself</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              No code, no developer, no waiting. This is your friendly,
              step-by-step guide to changing the words and photos on{" "}
              <strong className="text-navy">munrocentre.com</strong>. Take your
              time — you really can&rsquo;t break anything.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/studio"
                className="inline-flex h-13 items-center gap-2 rounded-pill bg-navy px-8 py-3.5 font-medium text-cream shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lift"
              >
                <LogIn className="size-5" strokeWidth={2} aria-hidden />
                Open the editor
              </Link>
              <a
                href="#recipes"
                className="inline-flex h-13 items-center gap-2 rounded-pill border border-navy/15 px-8 py-3.5 font-medium text-navy transition-colors hover:border-navy/35 hover:bg-navy/[0.03]"
              >
                Jump to the how-tos
              </a>
            </div>
          </div>

          {/* Reassurance trio */}
          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                tone: "green" as Tone,
                title: "You can't break it",
                copy: "You only edit words and pictures. The design stays perfect.",
              },
              {
                icon: Clock,
                tone: "blue" as Tone,
                title: "Live in a minute",
                copy: "Click Publish and your change appears in about 60 seconds.",
              },
              {
                icon: Undo2,
                tone: "yellow" as Tone,
                title: "Always undoable",
                copy: "Every change is saved. Restore an earlier version any time.",
              },
            ].map((f) => (
              <Card key={f.title} className="text-center">
                <div className="flex justify-center">
                  <Tile icon={f.icon} tone={f.tone} />
                </div>
                <h3 className="mt-4 text-xl">{f.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-soft">
                  {f.copy}
                </p>
              </Card>
            ))}
          </div>

          {/* Jump nav */}
          <nav
            aria-label="On this page"
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 print:hidden"
          >
            {jumpLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-pill border border-navy/12 bg-paper px-4 py-2 text-sm font-medium text-navy/75 transition-colors hover:border-navy/30 hover:text-navy"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* 1 · Signing in */}
      <section id="sign-in" className="scroll-mt-24 py-14 sm:py-16">
        <Container>
          <SectionHeading color="blue" label="Step one" title="Signing in">
            You edit the website in a tool called <strong>Sanity Studio</strong>.
            It lives right inside your own website.
          </SectionHeading>

          <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-5 md:grid-cols-2">
            <Card>
              <Tile icon={LogIn} tone="blue" />
              <h3 className="mt-4 text-2xl">Log in</h3>
              <ol className="mt-4 space-y-3">
                <Step n={1}>
                  In your web browser, go to{" "}
                  <strong className="whitespace-nowrap text-navy">{studioUrl}</strong>
                </Step>
                <Step n={2}>
                  Sign in with the email you were invited with (Google or email
                  link).
                </Step>
                <Step n={3}>
                  That&rsquo;s it — you&rsquo;re in the editor. You&rsquo;ll only
                  need to do this once on your own computer.
                </Step>
              </ol>
            </Card>

            <Card className="flex flex-col justify-center bg-gradient-to-br from-brand-blue-100 to-sand">
              <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-brand-blue-deep">
                Tip
              </p>
              <p className="mt-2 text-lg leading-relaxed text-navy">
                Bookmark{" "}
                <strong className="whitespace-nowrap">{studioUrl}</strong> on
                your computer so it&rsquo;s always one tap away. It works best on
                a laptop or desktop.
              </p>
              <Link
                href="/studio"
                className="mt-5 inline-flex h-11 w-fit items-center gap-2 rounded-pill bg-navy px-6 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-navy-700 print:hidden"
              >
                <LogIn className="size-4" strokeWidth={2} aria-hidden />
                Open the editor now
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      {/* 2 · The tour */}
      <section id="tour" className="scroll-mt-24 bg-sand/50 py-14 sm:py-16">
        <Container>
          <SectionHeading color="green" label="Step two" title="A 60-second tour">
            When you sign in, everything you can change is listed down the{" "}
            <strong>left-hand side</strong>. Here&rsquo;s what each one is.
          </SectionHeading>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
            {menu.map((m) => (
              <Card key={m.name} className="flex gap-4">
                <div className="shrink-0">
                  <Tile icon={m.icon} tone={m.tone} />
                </div>
                <div>
                  <h3 className="text-xl">{m.name}</h3>
                  <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-soft">
                    {m.blurb}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 3 · Everyday edits */}
      <section id="everyday" className="scroll-mt-24 py-14 sm:py-16">
        <Container>
          <SectionHeading
            color="yellow"
            label="Step three"
            title="The three things you'll do most"
          >
            Almost every update is one of these three moves. Learn them once and
            you can change anything.
          </SectionHeading>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            <Card>
              <Tile icon={PenLine} tone="blue" />
              <h3 className="mt-4 text-2xl">Change words</h3>
              <ol className="mt-4 space-y-3">
                <Step n={1}>Click the item you want to change.</Step>
                <Step n={2}>Click into any text box and type.</Step>
                <Step n={3}>
                  Click <strong>Publish</strong>.
                </Step>
              </ol>
            </Card>

            <Card>
              <Tile icon={ImagePlus} tone="green" />
              <h3 className="mt-4 text-2xl">Change a photo</h3>
              <ol className="mt-4 space-y-3">
                <Step n={1}>Click the photo area.</Step>
                <Step n={2}>
                  Drag a photo in, or click <strong>Upload</strong>.
                </Step>
                <Step n={3}>Add a few words of alt text.</Step>
                <Step n={4}>
                  Click <strong>Publish</strong>.
                </Step>
              </ol>
            </Card>

            <Card className="bg-gradient-to-br from-brand-green-100 to-sand">
              <Tile icon={Rocket} tone="red" />
              <h3 className="mt-4 text-2xl">Publish</h3>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-ink">
                The <strong>Publish</strong> button sits at the{" "}
                <strong>bottom-right</strong>. Nothing you type is live until you
                click it — then your change appears on the website within about a
                minute.
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-green-deep">
                <CheckCircle2 className="size-4" strokeWidth={2} aria-hidden />
                One button. That&rsquo;s the whole secret.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* 4 · Recipes */}
      <section id="recipes" className="scroll-mt-24 bg-sand/50 py-14 sm:py-16">
        <Container>
          <SectionHeading
            color="red"
            label="Copy me"
            title="Step-by-step recipes"
          >
            The updates you&rsquo;ll actually make, each spelled out. Find the one
            you need and follow along.
          </SectionHeading>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
            {recipes.map((r) => (
              <Card key={r.title}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <Tile icon={r.icon} tone={r.tone} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl leading-snug">{r.title}</h3>
                    <div className="mt-2">
                      <Where>{r.where}</Where>
                    </div>
                  </div>
                </div>
                <ol className="mt-5 space-y-2.5">
                  {r.steps.map((s, i) => (
                    <Step key={i} n={i + 1}>
                      {s}
                    </Step>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 5 · Golden rules */}
      <section id="rules" className="scroll-mt-24 py-14 sm:py-16">
        <Container>
          <SectionHeading
            color="green"
            label="Good to know"
            title="Six golden rules"
          >
            Keep these in the back of your mind and you&rsquo;ll always be safe.
          </SectionHeading>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rules.map((r) => (
              <Card key={r.title}>
                <Tile icon={r.icon} tone={r.tone} />
                <h3 className="mt-4 text-lg">{r.title}</h3>
                <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-soft">
                  {r.copy}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 6 · Help */}
      <section id="help" className="scroll-mt-24 pb-20">
        <Container>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] bg-navy px-8 py-12 text-center text-cream shadow-lift grain sm:px-14 sm:py-14">
            <span className="inline-flex items-center justify-center rounded-2xl bg-cream/10 p-3">
              <Sparkles className="size-6 text-brand-yellow" strokeWidth={1.9} aria-hidden />
            </span>
            <h2 className="mt-5 text-3xl text-cream sm:text-4xl">
              Stuck, or something looks off?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/80">
              Don&rsquo;t worry — you can&rsquo;t break the site from the editor.
              If a change didn&rsquo;t appear, give it a minute and refresh. If
              you&rsquo;re unsure about anything, save your draft (don&rsquo;t
              publish) and reach out.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={site.contact.emailHref}
                className="inline-flex h-12 items-center gap-2 rounded-pill bg-cream px-7 font-medium text-navy shadow-soft transition-colors hover:bg-sand"
              >
                Email the office
              </a>
              <a
                href={site.contact.phoneHref}
                className="inline-flex h-12 items-center gap-2 rounded-pill border border-cream/25 px-7 font-medium text-cream transition-colors hover:bg-cream/10"
              >
                <Phone className="size-4" strokeWidth={2} aria-hidden />
                {site.contact.phone}
              </a>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-ink-faint">
            This page is just for the Munro team — it isn&rsquo;t linked from the
            public website or shown in Google. Bookmark it and share the link
            with anyone who helps keep the site up to date.
          </p>
        </Container>
      </section>
    </div>
  );
}
