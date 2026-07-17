import Image from "next/image";
import { Phone, Check, Sparkles, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import type { HeroContent } from "@/lib/sanity/types";

export function Hero({ hero }: { hero: HeroContent }) {
  const image = hero.image;
  const secondary = hero.imageSecondary;
  const lines = hero.title.split("\n");
  const primaryExternal = hero.primaryCta.href.startsWith("http");

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pb-24 pt-28 sm:pb-28 lg:pb-32 lg:pt-36"
    >
      {/* Atmospheric brand washes — layered for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 size-[36rem] rounded-full bg-sage-100 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-[28rem] rounded-full bg-terracotta-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/2 size-[24rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand-blue-100/40 blur-3xl"
      />

      {/* Soft dot-grid texture behind the copy, fading towards the centre */}
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-y-0 left-0 hidden w-[52%] opacity-70 [mask-image:radial-gradient(68%_62%_at_32%_40%,black,transparent)] sm:block"
      />

      {/* Playful floating shapes */}
      <span
        aria-hidden
        className="animate-float pointer-events-none absolute left-[8%] top-32 hidden size-4 rounded-full bg-brand-yellow/70 sm:block"
        style={{ animationDelay: "0.4s" }}
      />
      <span
        aria-hidden
        className="animate-float pointer-events-none absolute right-[6%] top-44 hidden size-7 rounded-full border-[3px] border-brand-blue/40 sm:block lg:right-[42%]"
        style={{ animationDelay: "1.4s" }}
      />
      <span
        aria-hidden
        className="animate-float pointer-events-none absolute bottom-28 left-[40%] hidden size-3 rounded-full bg-brand-red/50 sm:block"
        style={{ animationDelay: "2.1s" }}
      />
      <span
        aria-hidden
        className="animate-float pointer-events-none absolute bottom-48 left-[4%] hidden size-5 rotate-12 rounded-[6px] bg-brand-green/35 lg:block"
        style={{ animationDelay: "3s" }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Content */}
          <div className="max-w-xl">
            <Reveal
              as="span"
              delay={0.05}
              className="inline-flex items-center gap-2 rounded-pill bg-sage-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green-deep"
            >
              <span className="size-1.5 rounded-full bg-brand-green" />
              {hero.eyebrow}
            </Reveal>

            {/* H1 — LCP element, rendered statically (Baloo, navy). The final
                word gets a playful hand-drawn squiggle underline. */}
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.06] text-navy">
              {lines.map((line, li) => {
                const isLast = li === lines.length - 1;
                if (!isLast) {
                  return (
                    <span key={line} className="block">
                      {line}
                    </span>
                  );
                }
                const words = line.split(" ");
                const last = words.pop();
                return (
                  <span key={line} className="block">
                    {words.join(" ")} <span className="squiggle">{last}</span>
                  </span>
                );
              })}
            </h1>

            <Reveal
              as="p"
              delay={0.3}
              className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
            >
              {hero.subhead}
            </Reveal>

            <Reveal
              delay={0.45}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button asChild size="xl" variant="brand" className="w-full sm:w-auto">
                <a
                  href={hero.primaryCta.href}
                  {...(primaryExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {hero.primaryCta.label}
                </a>
              </Button>
              <Button asChild size="xl" variant="secondary" className="w-full sm:w-auto">
                <a href={hero.secondaryCta.href}>
                  <Phone className="size-4" strokeWidth={1.9} />
                  {hero.secondaryCta.label}
                </a>
              </Button>
            </Reveal>

            <Reveal
              as="ul"
              delay={0.6}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-navy/10 pt-7 text-sm font-medium text-ink"
            >
              {hero.highlights.map((h) => (
                <li key={h} className="inline-flex items-center gap-2">
                  <Check className="size-4 text-brand-green-deep" strokeWidth={2.6} />
                  {h}
                </li>
              ))}
            </Reveal>
          </div>

          {/* Image collage */}
          <div className="relative">
            <Reveal className="relative mx-auto w-full max-w-md lg:ml-auto lg:max-w-none">
              {/* Tilted colour tile + hand-drawn ring — grounding depth layers
                  that peek out from behind the photo. Purely decorative. */}
              <div
                aria-hidden
                className="absolute -inset-2 -rotate-2 rounded-[2rem] bg-brand-yellow-200/70 sm:-inset-3 lg:rounded-[2.5rem]"
              />
              <div
                aria-hidden
                className="absolute -left-6 -top-6 size-12 rounded-full border-[3px] border-dashed border-brand-blue/50"
              />

              <div className="img-zoom relative aspect-[5/4] w-full overflow-hidden rounded-[1.75rem] bg-sand shadow-hero sm:aspect-[4/5] lg:rounded-[2rem]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width:1024px) 44vw, 90vw"
                  className="object-cover"
                />
              </div>

              {/* Small sticker-style sparkle on the photo's corner */}
              <Sparkle
                aria-hidden
                className="absolute -bottom-4 right-10 size-9 rotate-12 fill-brand-yellow text-brand-yellow drop-shadow-sm"
                strokeWidth={1}
              />
            </Reveal>

            {/* Overlapping secondary image */}
            <Reveal
              delay={0.5}
              className="absolute -bottom-7 -left-3 hidden aspect-square w-[40%] overflow-hidden rounded-[1.5rem] shadow-lift ring-[6px] ring-cream sm:block lg:-left-8"
            >
              <Image
                src={secondary.src}
                alt={secondary.alt}
                fill
                sizes="(min-width:1024px) 18vw, 40vw"
                className="object-cover"
              />
            </Reveal>

            {/* Floating credential card */}
            <Reveal
              delay={0.7}
              className="absolute -right-3 top-8 hidden items-center gap-3 rounded-2xl bg-cream/95 px-4 py-3 shadow-lift ring-1 ring-navy/5 backdrop-blur-sm sm:flex lg:-right-6"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-green/15 text-brand-green-deep">
                <Sparkles className="size-5" strokeWidth={1.8} />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-xl text-navy">Since 1981</span>
                <span className="block text-xs font-medium text-ink-soft">
                  Community-owned in St Lucia
                </span>
              </span>
            </Reveal>

            {/* Mobile-only trust pill — keeps the image area polished on phones,
                where the overlapping collage cards are hidden. */}
            <Reveal
              delay={0.4}
              className="mt-6 flex justify-center sm:hidden"
            >
              <span className="inline-flex items-center gap-2 rounded-pill bg-cream px-4 py-2 text-sm font-medium text-navy shadow-soft ring-1 ring-navy/5">
                <Sparkles className="size-4 text-brand-green-deep" strokeWidth={1.9} />
                Community-owned since 1981
              </span>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Gentle wave into the trust bar below (bg-sand) — melts the hard seam */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          className="block h-8 w-full text-sand sm:h-12 lg:h-14"
        >
          <path
            d="M0,56 L0,34 C220,6 470,0 720,14 C970,28 1220,50 1440,22 L1440,56 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
