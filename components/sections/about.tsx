import Image from "next/image";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Parallax } from "@/components/primitives/parallax";
import { Atmosphere } from "@/components/primitives/atmosphere";
import type { AboutContent } from "@/lib/sanity/types";
import { brandTile } from "@/lib/palette";

export function About({ about }: { about: AboutContent }) {
  return (
    <section id="about" className="relative overflow-hidden scroll-mt-24 bg-cream py-section">
      <Atmosphere tone="sage" />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow color="green">{about.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
              {about.title}
            </h2>
          </div>
          <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
            {about.intro}
          </p>
        </div>

        <ul className="mt-14 grid gap-x-7 gap-y-12 md:grid-cols-3">
          {about.pillars.map((pillar, i) => {
            const image = pillar.image;
            return (
              <Reveal as="li" key={pillar.key} delay={i * 0.08}>
                <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-sand shadow-soft">
                  {/* Oversized wrapper so the gentle drift never reveals an edge. */}
                  <Parallax range={16} className="absolute inset-x-0 -inset-y-[7%]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width:768px) 30vw, 90vw"
                      className="object-cover"
                    />
                  </Parallax>
                </div>
                <div className="mt-6">
                  <span
                    className={`inline-flex size-9 items-center justify-center rounded-full font-display text-lg font-bold ${brandTile(i)}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-2xl leading-tight">
                    {pillar.name}
                  </h3>
                  <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">
                    {pillar.copy}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
