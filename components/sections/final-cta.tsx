import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { finalCta } from "@/lib/content";
import { img } from "@/lib/images";
import { site } from "@/lib/site";

export function FinalCta() {
  const image = img(finalCta.image);
  const lines = finalCta.title.split("\n");

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy py-section text-cream">

      {/* Backdrop */}
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-navy/20" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="onDark">{finalCta.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[1.02] text-cream">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/80">
              {finalCta.copy}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="xl" variant="onDark">
                <a href="#book">Book a Tour</a>
              </Button>
              <Button asChild size="xl" variant="onDarkOutline">
                <a href={site.contact.phoneHref}>
                  <Phone className="size-4" strokeWidth={1.8} />
                  {site.contact.phone}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
