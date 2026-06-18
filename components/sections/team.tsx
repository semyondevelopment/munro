import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { team } from "@/lib/content";
import { img } from "@/lib/images";

export function Team() {
  const image = img(team.image);

  return (
    <section id="team" className="scroll-mt-24 bg-sand py-section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <Eyebrow color="blue">{team.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
              {team.title}
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
              {team.copy}
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {team.points.map((point) => (
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
            <Button asChild variant="secondary" size="lg" className="mt-9">
              <a href="#book">Meet them on a tour</a>
            </Button>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-sand-200 shadow-lift">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width:1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
