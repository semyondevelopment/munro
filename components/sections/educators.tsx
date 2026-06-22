import { Quote } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import type { EducatorsContent } from "@/lib/sanity/types";
import { brandTile } from "@/lib/palette";

export function Educators({ educators }: { educators: EducatorsContent }) {
  return (
    <section id="team" className="scroll-mt-24 bg-cream py-section">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow color="green">{educators.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
            {educators.title}
          </h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-soft">
            {educators.copy}
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {educators.people.map((person, i) => (
            <Reveal
              as="li"
              key={person.name}
              delay={(i % 3) * 0.08}
              className="group flex h-full flex-col rounded-[var(--radius)] bg-paper p-6 shadow-soft ring-1 ring-navy/5 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex size-14 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-bold transition-transform duration-500 ease-out-expo group-hover:-rotate-6 ${brandTile(i)}`}
                  aria-hidden
                >
                  {person.name.charAt(0)}
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight text-navy">
                    {person.name}
                  </h3>
                  <p className="text-sm text-ink-soft">{person.role}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-pill bg-sand px-2.5 py-1 text-xs font-medium text-navy/70">
                  {person.room}
                </span>
                <span className="rounded-pill bg-sand px-2.5 py-1 text-xs font-medium text-navy/70">
                  {person.years}
                </span>
              </div>

              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                <Quote
                  className="mb-1 inline size-4 text-brand-yellow"
                  strokeWidth={2}
                  fill="currentColor"
                />{" "}
                {person.quote}
              </p>

              <p className="mt-5 border-t border-navy/10 pt-4 text-xs font-medium uppercase tracking-[0.1em] text-ink-faint">
                Speaks {person.languages.join(" · ")}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
