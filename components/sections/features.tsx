import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { features } from "@/lib/content";
import { iconMap } from "@/components/icon-map";

export function Features() {
  return (
    <section className="bg-sand py-section">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{features.eyebrow}</Eyebrow>
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
                className="border-t border-navy/10 pt-6"
              >
                {Icon && (
                  <span className="inline-flex size-12 items-center justify-center rounded-pill bg-sage-100 text-sage-700">
                    <Icon className="size-6" strokeWidth={1.6} />
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
