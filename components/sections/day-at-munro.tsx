import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { daySchedule } from "@/lib/content";
import { brandTiles } from "@/lib/palette";

export function DayAtMunro() {
  return (
    <section className="bg-sand py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow color="yellow">{daySchedule.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
              {daySchedule.title}
            </h2>
            <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-ink-soft">
              {daySchedule.copy}
            </p>
          </div>

          <ol className="relative">
            {/* Connecting line */}
            <span
              aria-hidden
              className="absolute left-[1.45rem] top-3 bottom-3 w-0.5 bg-navy/10"
            />
            {daySchedule.steps.map((step, i) => {
              const dot = brandTiles[i % brandTiles.length];
              return (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={(i % 4) * 0.06}
                  y={18}
                  className="relative flex gap-5 pb-9 last:pb-0"
                >
                  <span
                    className={`relative z-[1] inline-flex size-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${dot}`}
                  >
                    {step.time.replace(/(am|pm)/, "")}
                  </span>
                  <div className="pt-1.5">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-display text-xl text-navy">{step.title}</h3>
                      <span className="text-xs font-medium uppercase tracking-[0.1em] text-ink-faint">
                        {step.time}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.97rem] leading-relaxed text-ink-soft">
                      {step.copy}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
