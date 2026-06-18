import Image from "next/image";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Atmosphere } from "@/components/primitives/atmosphere";
import { about } from "@/lib/content";
import { img } from "@/lib/images";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden scroll-mt-24 bg-cream py-section">
      <Atmosphere tone="sage" />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{about.eyebrow}</Eyebrow>
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
            const image = img(pillar.image);
            return (
              <Reveal as="li" key={pillar.key} delay={i * 0.08}>
                <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-sand shadow-soft">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width:768px) 30vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-6">
                  <span className="font-mono text-xs font-medium tracking-[0.18em] text-terracotta-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="ml-3 inline-block h-px w-8 align-middle bg-sage/60" />
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
