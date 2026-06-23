import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import type { FeaturesContent } from "@/lib/sanity/types";
import { iconMap } from "@/components/icon-map";
import { brandTile } from "@/lib/palette";

export function Features({ features }: { features: FeaturesContent }) {
  return (
    <section className="bg-sand py-section">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow color="blue">{features.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
            {features.title}
          </h2>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <Reveal
                as="li"
                key={feature.title}
                delay={(i % 3) * 0.08}
                className="group rounded-[var(--radius)] bg-cream p-6 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
              >
                {Icon && (
                  <span
                    className={`wiggle inline-flex size-12 items-center justify-center rounded-2xl ${brandTile(i)}`}
                  >
                    <Icon className="size-6" strokeWidth={1.8} />
                  </span>
                )}
                <h3 className="mt-5 font-display text-2xl leading-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">
                  {feature.copy}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
