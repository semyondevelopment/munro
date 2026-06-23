import Image from "next/image";
import { Phone, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import type { HeroContent } from "@/lib/sanity/types";

export function Hero({ hero }: { hero: HeroContent }) {
  const image = hero.image;
  const secondary = hero.imageSecondary;
  const lines = hero.title.split("\n");

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pb-16 pt-28 sm:pb-20 lg:pb-28 lg:pt-36"
    >
      {/* Atmospheric brand accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 size-[36rem] rounded-full bg-sage-100 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-[28rem] rounded-full bg-terracotta-100/60 blur-3xl"
      />

      {/* Playful floating shapes */}
      <span
        aria-hidden
        className="animate-float pointer-events-none absolute left-[8%] top-32 hidden size-4 rounded-full bg-brand-yellow/70 sm:block"
        style={{ animationDelay: "0.4s" }}
      />
      <span
        aria-hidden
        className="animate-float pointer-events-none absolute right-[6%] top-44 hidden size-6 rounded-lg bg-brand-blue/40 sm:block lg:right-[42%]"
        style={{ animationDelay: "1.4s" }}
      />
      <span
        aria-hidden
        className="animate-float pointer-events-none absolute bottom-24 left-[40%] hidden size-3 rounded-full bg-brand-red/50 sm:block"
        style={{ animationDelay: "2.1s" }}
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
                <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
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
            <Reveal className="img-zoom relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-[1.75rem] bg-sand shadow-hero sm:aspect-[4/5] lg:ml-auto lg:max-w-none lg:rounded-[2rem]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width:1024px) 44vw, 90vw"
                className="object-cover"
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
              className="mt-4 flex justify-center sm:hidden"
            >
              <span className="inline-flex items-center gap-2 rounded-pill bg-cream px-4 py-2 text-sm font-medium text-navy shadow-soft ring-1 ring-navy/5">
                <Sparkles className="size-4 text-brand-green-deep" strokeWidth={1.9} />
                Community-owned since 1981
              </span>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
