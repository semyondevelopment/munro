import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { trustBar } from "@/lib/content";
import { iconMap } from "@/components/icon-map";

export function TrustBar() {
  return (
    <section
      aria-label="Why families trust The Munro Centre"
      className="border-b border-navy/10 bg-sand"
    >
      <Container className="py-8 lg:py-10">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
          {trustBar.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal
                as="li"
                key={item.label}
                delay={(i % 6) * 0.06}
                y={16}
                className="flex flex-col items-center gap-2 text-center lg:border-l lg:border-navy/10 lg:px-5 lg:first:border-l-0"
              >
                {Icon && (
                  <Icon className="size-6 text-sage-700" strokeWidth={1.5} />
                )}
                <span className="mt-1 font-display text-xl leading-none text-navy">
                  {item.label}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink-soft">
                  {item.sub}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
