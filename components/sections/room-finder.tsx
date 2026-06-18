"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Atmosphere } from "@/components/primitives/atmosphere";
import { Button } from "@/components/ui/button";
import { rooms, roomAgeMonths, roomFinder } from "@/lib/content";
import { img } from "@/lib/images";
import { brandTile } from "@/lib/palette";
import { cn } from "@/lib/utils";

const MIN = 2; // ~6 weeks
const MAX = 60; // 5 years

function ageLabel(months: number) {
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const yr = `${y} year${y === 1 ? "" : "s"}`;
  return m ? `${yr} ${m} mo` : yr;
}

export function RoomFinder() {
  const [months, setMonths] = useState(20);

  const matches = useMemo(
    () =>
      rooms.items.filter((r) => {
        const b = roomAgeMonths[r.key];
        return b && months >= b.min && months <= b.max;
      }),
    [months],
  );

  // Index of the best (first) match, for the highlighted hero card.
  const best = matches[0];
  const bestImg = best ? img(best.image) : null;

  return (
    <section
      id="find-room"
      className="relative overflow-hidden scroll-mt-24 bg-cream py-section"
    >
      <Atmosphere tone="blue" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow color="blue" center>
            {roomFinder.eyebrow}
          </Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight">
            {roomFinder.title}
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">
            {roomFinder.copy}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[var(--radius-lg)] bg-paper p-6 shadow-lift ring-1 ring-navy/5 sm:p-9">
          {/* Quick presets */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {roomFinder.presets.map((p, i) => {
              const active = Math.abs(p.months - months) <= 3;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setMonths(p.months)}
                  className={cn(
                    "rounded-pill px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out-expo",
                    active
                      ? `${brandTile(i)} scale-105 shadow-soft`
                      : "bg-sand text-navy/70 hover:bg-sand-200 hover:text-navy",
                  )}
                >
                  {p.label}
                  <span className="ml-2 hidden font-normal opacity-70 sm:inline">
                    {p.detail}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Age slider */}
          <div className="mt-9">
            <div className="flex items-end justify-between">
              <label htmlFor="age" className="text-sm font-medium text-ink-soft">
                My child is
              </label>
              <span className="font-display text-3xl font-bold text-brand-blue-deep">
                {ageLabel(months)}
              </span>
            </div>
            <input
              id="age"
              type="range"
              min={MIN}
              max={MAX}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="mt-3 w-full accent-brand-blue"
              aria-valuetext={ageLabel(months)}
            />
            <div className="mt-1 flex justify-between text-xs text-ink-faint">
              <span>6 weeks</span>
              <span>5 years</span>
            </div>
          </div>

          {/* Result */}
          <div className="mt-8 border-t border-navy/10 pt-8">
            {best && bestImg ? (
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-stretch">
                <div className="img-zoom relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] bg-sand shadow-soft sm:w-56">
                  <Image
                    src={bestImg.src}
                    alt={bestImg.alt}
                    fill
                    sizes="(min-width:640px) 14rem, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm font-medium text-ink-soft">
                    Your child would belong in
                  </p>
                  <h3 className="mt-1 font-display text-3xl text-navy">
                    {best.name}
                    <span className="ml-2 align-middle text-base font-medium text-brand-blue-deep">
                      {best.tag}
                    </span>
                  </h3>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">
                    {best.copy}
                  </p>

                  {matches.length > 1 && (
                    <p className="mt-3 text-sm text-ink-soft">
                      Also a great fit:{" "}
                      <span className="font-medium text-navy">
                        {matches.slice(1).map((r) => r.name).join(", ")}
                      </span>
                    </p>
                  )}

                  <Button asChild className="mt-5" variant="brand">
                    <a href="#book">
                      Book a tour for {best.name}
                      <ArrowRight className="size-4" strokeWidth={1.9} />
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-ink-soft">
                  We care for children from 6 weeks to kindergarten age. Move the
                  slider, or{" "}
                  <a href="#book" className="font-medium text-navy underline-offset-4 hover:underline">
                    book a tour
                  </a>{" "}
                  and we&apos;ll help you find the right fit.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
