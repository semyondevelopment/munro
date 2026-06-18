import { Section } from "@/components/primitives/section";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Atmosphere } from "@/components/primitives/atmosphere";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faq } from "@/lib/content";

export function Faq() {
  return (
    <Section id="faq" tone="cream" className="relative overflow-hidden scroll-mt-24">
      <Atmosphere tone="green" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow color="green">{faq.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
                {faq.title}
              </h2>
              <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-ink-soft">
                Still wondering? Call us on the number below, or book a tour and
                ask in person.
              </p>
              <Button asChild variant="secondary" className="mt-8">
                <a href="#book">Book a tour</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="w-full">
              {faq.items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
