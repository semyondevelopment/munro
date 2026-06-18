import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { impact } from "@/lib/content";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/primitives/count-up";

export function Impact() {
  const image = img(impact.image);

  return (
    <section id="not-for-profit" className="scroll-mt-24 bg-sage-100 py-section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-sand shadow-soft">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width:1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow color="yellow">{impact.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
              {impact.title}
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
              {impact.copy}
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {impact.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-green-deep text-cream"
                  >
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-[1.02rem] leading-relaxed text-ink">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-navy/10 pt-8">
              {impact.stats.map((stat, i) => {
                // Parse "100%" / "1981" / "6" into prefix · number · suffix.
                const m = stat.value.match(/^(\D*)(\d+)(\D*)$/);
                const num = m ? Number(m[2]) : null;
                const isYear = num !== null && num > 1900;
                const color = ["text-brand-blue-deep", "text-brand-green-deep", "text-brand-red-deep"][i % 3];
                return (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    {num !== null && !isYear ? (
                      <CountUp
                        value={num}
                        prefix={m![1]}
                        suffix={m![3]}
                        className={cn("block font-display text-4xl sm:text-5xl", color)}
                      />
                    ) : (
                      <span className={cn("block font-display text-4xl sm:text-5xl", color)}>
                        {stat.value}
                      </span>
                    )}
                    <span className="mt-1 block text-sm leading-snug text-ink-soft">
                      {stat.label}
                    </span>
                  </dd>
                </div>
                );
              })}
            </dl>

            <Button asChild size="lg" className="mt-10">
              <a href="#book">Book a tour</a>
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
