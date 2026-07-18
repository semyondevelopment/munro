"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// useLayoutEffect runs before paint on the client (so the drift is in place for
// the first frame) but warns during SSR — fall back to useEffect on the server.
const useIsoLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

type ParallaxProps = {
  children?: React.ReactNode;
  className?: string;
  /**
   * Peak vertical drift in px as the element transits the viewport. The layer
   * rests at its natural position when centred in the viewport and drifts up to
   * ±range at the extremes. Positive drifts it upward as you scroll down (a
   * nearer, foreground feel); negative drifts it downward (a slower, background
   * feel). Keep it small — roughly 16–56 — so the movement stays subtle.
   */
  range?: number;
  /** Optional constant tilt (deg) kept while the layer drifts. */
  rotate?: number;
  as?: "div" | "span";
  "aria-hidden"?: boolean;
};

/**
 * Section-relative scroll parallax. Ties a layer's vertical offset to how far
 * it has travelled through the viewport, so decorative layers drift at their
 * own rate and read as depth — anywhere on the page, not just at the top.
 *
 * Driven by a plain passive scroll listener (rAF-throttled) writing a
 * MotionValue, so it fires reliably at any scroll depth. The offset is mapped
 * over the element's own transit — measured from layout, so the applied
 * transform never skews it — which keeps the drift bounded (±range) and centred
 * (zero mid-viewport) wherever the section falls, unlike a raw window offset
 * that grows without limit down the page. It starts at 0 (matches the static
 * layout, so no layout shift), and transforms don't affect layout, so it never
 * nudges surrounding content. Honours `prefers-reduced-motion`: the drift is
 * dropped while any constant `rotate` is kept.
 */
export function Parallax({
  children,
  className,
  range = 24,
  rotate,
  as = "div",
  ...rest
}: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const y = useMotionValue(0);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    // Cached layout metrics — only recomputed on resize / reflow, not per scroll.
    let top = 0;
    let height = 0;
    let vh = 0;
    const measure = () => {
      // Layout position via the offset chain — unaffected by our own transform.
      let t = 0;
      let node: HTMLElement | null = el;
      while (node) {
        t += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      top = t;
      height = el.offsetHeight;
      vh = window.innerHeight;
    };

    const apply = () => {
      const enter = top - vh; // scroll where the element's top reaches viewport bottom
      const exit = top + height; // scroll where the element's bottom reaches viewport top
      const span = exit - enter;
      const p = span <= 0 ? 0 : (window.scrollY - enter) / span;
      const clamped = p < 0 ? 0 : p > 1 ? 1 : p;
      y.set(range - clamped * 2 * range); // enter → +range · centre → 0 · exit → −range
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        apply();
      });
    };
    const onResize = () => {
      measure();
      apply();
    };

    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Re-measure when the page reflows (images/fonts load and shift positions).
    const ro = new ResizeObserver(onResize);
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [range, reduce, y]);

  const style = reduce
    ? rotate !== undefined
      ? { rotate }
      : undefined
    : { y, rotate };

  if (as === "span") {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <motion.span ref={ref as any} className={cn(className)} style={style} {...rest}>
        {children}
      </motion.span>
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <motion.div ref={ref as any} className={cn(className)} style={style} {...rest}>
      {children}
    </motion.div>
  );
}
