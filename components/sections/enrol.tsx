import { Check, Phone, ClipboardList, ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { site as siteConfig } from "@/lib/site";
import type { ResolvedSite } from "@/lib/sanity/types";

const expect = [
  "Join the waitlist for your preferred room and start date",
  "Enrol online in minutes through OWNA, our secure platform",
  "Straight answers on fees, CCS & availability",
  "Prefer to look first? Come in for a relaxed tour",
];

export function Enrol({ site }: { site: ResolvedSite }) {
  return (
    <section id="book" className="scroll-mt-24 bg-navy py-section">
      <Container className="relative z-[2]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Persuasion panel */}
          <Reveal className="flex flex-col justify-center">
            <Eyebrow tone="onDark">Enrolling now</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.03] text-cream">
              Join the Munro community
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/75">
              Ready to get started? Join our waitlist or enrol online through
              OWNA — and we&apos;ll be in touch to welcome your family.
            </p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {expect.map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream/85">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-sage/20 text-sage">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-[1.02rem]">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Action card */}
          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-lg)] bg-cream p-6 shadow-hero sm:p-9">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
                <ClipboardList className="size-7" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 font-display text-3xl text-navy">
                Two easy ways to start
              </h3>
              <p className="mt-2 text-ink-soft">
                Both take just a few minutes on OWNA, our secure family platform.
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <Button asChild size="lg" className="w-full">
                  <a
                    href={siteConfig.owna.waitlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join the Waitlist
                    <ArrowRight className="size-4" strokeWidth={1.9} />
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full">
                  <a
                    href={siteConfig.owna.enrolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enrol Now
                    <ArrowRight className="size-4" strokeWidth={1.9} />
                  </a>
                </Button>
              </div>

              <div className="mt-7 flex items-center gap-3 border-t border-navy/10 pt-6 text-ink-soft">
                <Phone className="size-5 shrink-0 text-sage-700" strokeWidth={1.7} />
                <span>
                  Prefer to talk or book a tour?{" "}
                  <a
                    href={site.contact.phoneHref}
                    className="font-medium text-navy underline-offset-4 hover:underline"
                  >
                    {site.contact.phone}
                  </a>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
