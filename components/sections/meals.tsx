import Image from "next/image";
import { Check, Utensils, CalendarDays } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Atmosphere } from "@/components/primitives/atmosphere";
import { meals } from "@/lib/content";

export function Meals({ menuImageUrl }: { menuImageUrl?: string }) {
  const imageUrl = menuImageUrl || meals.menuImage || null;

  return (
    <section id="meals" className="relative overflow-hidden scroll-mt-24 bg-cream py-section">
      <Atmosphere tone="sage" flip />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{meals.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
              {meals.title}
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
              {meals.copy}
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {meals.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-sage-600 text-cream"
                  >
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-[1.02rem] leading-relaxed text-ink">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Weekly menu */}
          <Reveal delay={0.1}>
            {imageUrl ? (
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] bg-sand shadow-lift">
                <Image
                  src={imageUrl}
                  alt="The Munro Centre's current weekly menu, freshly prepared by KGF"
                  fill
                  sizes="(min-width:1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-[var(--radius-lg)] border border-navy/10 bg-sand p-10 text-center shadow-soft">
                <span className="inline-flex size-16 items-center justify-center rounded-pill bg-terracotta-100 text-terracotta-700">
                  <Utensils className="size-7" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-3xl text-navy">
                  This week&apos;s menu
                </h3>
                <p className="mt-3 max-w-xs text-ink-soft">
                  Freshly prepared and rotated each season by KGF. Ask to see our
                  current menu on your tour.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-pill bg-cream px-4 py-2 text-sm font-medium text-navy ring-1 ring-navy/10">
                  <CalendarDays className="size-4 text-sage-700" strokeWidth={1.8} />
                  Seasonal menu · catered by KGF
                </span>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
