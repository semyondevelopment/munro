"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { welcome } from "@/lib/content";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

const pillTones = [
  "bg-cream text-navy",
  "bg-sage-100 text-navy",
  "bg-terracotta-100 text-navy",
  "bg-sand-200 text-navy",
];

export function Welcome() {
  const reduce = useReducedMotion();

  return (
    <section
      id="welcome"
      className="scroll-mt-24 overflow-hidden bg-cream py-section"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Copy */}
          <div>
            <Eyebrow>{welcome.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.02]">
              {welcome.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              {welcome.copy}
            </p>
            <p className="mt-8 font-display text-2xl italic text-sage-700">
              {welcome.greetings.length}+ languages spoken by our families.
            </p>
          </div>

          {/* Greeting cluster */}
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-end">
            {welcome.greetings.map((g, i) => (
              <motion.li
                key={`${g.word}-${g.lang}`}
                initial={reduce ? false : { opacity: 0, scale: 0.85, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.55, delay: (i % 8) * 0.06, ease: EASE_OUT_EXPO }}
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
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
