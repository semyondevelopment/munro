"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type CountUpProps = {
  /** Target number to count to. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
};

// useLayoutEffect on the client (runs before paint, so we never flash the final
// value), but fall back to useEffect during SSR to avoid React's warning.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Animated number that counts up when scrolled into view. The final value is
 * rendered server-side, so it's always visible (and crawlable) even if JS never
 * runs — the animation is pure enhancement.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  // Before first paint, reset to 0 so the count-up has somewhere to travel from
  // (skipped for reduced-motion, which keeps the static final value).
  useIsoLayoutEffect(() => {
    if (reduce) return;
    setDisplay(0);
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    let raf = 0;
    let start = 0;
    const run = () => {
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min((now - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-AU")}
      {suffix}
    </span>
  );
}
