import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { welcome } from "@/lib/content";
import { cn } from "@/lib/utils";

const pillTones = [
  "bg-brand-blue-100 text-navy",
  "bg-brand-yellow-100 text-navy",
  "bg-brand-green-100 text-navy",
  "bg-brand-red-100 text-navy",
  "bg-cream text-navy",
];

export function Welcome() {
  return (
    <section
      id="welcome"
      className="scroll-mt-24 overflow-hidden bg-cream py-section"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Copy */}
          <div>
            <Eyebrow color="red">{welcome.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.02]">
              {welcome.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              {welcome.copy}
            </p>
            <p className="mt-8 font-display text-2xl font-bold text-brand-green-deep">
              {welcome.greetings.length}+ languages spoken by our families.
            </p>
          </div>

          {/* Greeting cluster — gentle, never-blank CSS float (no JS gate) */}
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-end">
            {welcome.greetings.map((g, i) => (
              <li
                key={`${g.word}-${g.lang}`}
                className={cn(
                  i % 3 === 0 ? "mt-0" : i % 3 === 1 ? "mt-3" : "-mt-2",
                )}
              >
                <span
                  className={cn(
                    "animate-float inline-flex flex-col items-start gap-0.5 rounded-[1.25rem] px-5 py-3 shadow-soft ring-1 ring-navy/[0.04]",
                    pillTones[i % pillTones.length],
                  )}
                  style={{ animationDelay: `${(i % 6) * 0.7}s` }}
                >
                  <span className="font-display text-xl leading-none sm:text-2xl">
                    {g.word}
                  </span>
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
                    {g.lang}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
