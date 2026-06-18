"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Animation start delay in seconds (use for stagger). */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Render container element. */
  as?: "div" | "li" | "span";
};

const EASING = "cubic-bezier(0.16,1,0.3,1)";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const transition = `opacity 0.85s ${EASING} ${delay}s, transform 0.85s ${EASING} ${delay}s`;

    const show = () => {
      el.style.transition = transition;
      // One frame lets the browser register the transition before value changes.
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    };

    // If the element is already above the fold, reveal it immediately in the
    // same JS task so the browser never paints an invisible state.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      el.style.opacity = "0";
      el.style.transform = `translateY(${y}px)`;
      // Defer one frame so the browser registers the starting state before
      // applying the transition — gives us the CSS animation without a flash.
      requestAnimationFrame(() => {
        el.style.transition = transition;
        requestAnimationFrame(show);
      });
      return;
    }

    // Below the fold — hide it now (user can't see it) and watch for entry.
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, reduce, y]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={cn(className)}>
      {children}
    </Tag>
  );
}
