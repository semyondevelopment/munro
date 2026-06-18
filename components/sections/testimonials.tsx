"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Atmosphere } from "@/components/primitives/atmosphere";
import { testimonials } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const items = testimonials.items;

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  // Gate the enter animation until after mount so the first quote is rendered
  // visible server-side (Framer's `initial` would otherwise emit opacity:0 as
  // an SSR inline style — invisible on Vercel until JS hydrates).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const go = useCallback((step: number) => {
    setDir(step > 0 ? 1 : -1);
    setIndex((i) => (i + step + items.length) % items.length);
  }, []);

  const toIndex = useCallback(
    (i: number) => {
      setDir(i > index ? 1 : -1);
      setIndex(i);
    },
    [index],
  );

  // Auto-advance — disabled for reduced-motion; pauses on hover/focus; the
  // `index` dependency restarts the timer after any manual navigation.
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [reduce, paused, go, index]);

  const active = items[index];

  return (
    <section
      aria-label="What families say"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-cream py-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Atmosphere tone="red" flip />
      <Container size="narrow" className="relative text-center">
        <Eyebrow center color="red">{testimonials.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight">
          {testimonials.title}
        </h2>

        <div className="relative mt-12 min-h-[18rem] sm:min-h-[15rem]" aria-live="polite">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-display text-[10rem] leading-none text-brand-yellow/40"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={reduce || !mounted ? false : { opacity: 0, x: dir * 40 }}
              animate={reduce ? undefined : { opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="relative flex flex-col items-center"
            >
              <blockquote className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-snug text-navy">
                {active.quote}
              </blockquote>
              <figcaption className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-ink-soft">
                {active.name} · {active.detail}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="inline-flex size-12 items-center justify-center rounded-pill border border-navy/15 text-navy transition-colors hover:border-navy/35 hover:bg-navy/[0.03]"
          >
            <ArrowLeft className="size-5" strokeWidth={1.7} />
          </button>

          <div className="flex items-center gap-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-400 ease-out-expo",
                  i === index ? "w-7 bg-brand-green" : "w-2 bg-navy/20 hover:bg-navy/40",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="inline-flex size-12 items-center justify-center rounded-pill border border-navy/15 text-navy transition-colors hover:border-navy/35 hover:bg-navy/[0.03]"
          >
            <ArrowRight className="size-5" strokeWidth={1.7} />
          </button>
        </div>
      </Container>
    </section>
  );
}
