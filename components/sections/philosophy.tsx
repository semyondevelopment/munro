import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { philosophy } from "@/lib/content";

export function Philosophy({ cmsCopy }: { cmsCopy?: string }) {
  const copy = cmsCopy || philosophy.copy;
  const showNote = !cmsCopy;

  return (
    <section id="philosophy" className="scroll-mt-24 bg-navy py-section">
      <Container size="narrow" className="relative z-[2] text-center">
        <Reveal>
          <Eyebrow tone="onDark" center>
            {philosophy.eyebrow}
          </Eyebrow>
          <h2 className="mt-7 font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.18] text-cream">
            {copy}
          </h2>
          {showNote && (
            <p className="mt-8 text-sm uppercase tracking-[0.16em] text-sage">
              {philosophy.note}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
