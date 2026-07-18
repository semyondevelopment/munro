"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children?: React.ReactNode;
  className?: string;
  /**
   * How far the layer drifts, as a fraction of the page's scroll distance.
   * Positive drifts the layer *down* as you scroll (a slower, further-away
   * feel); negative drifts it *up* (a nearer, foreground feel). Keep it small
   * — roughly 0.04–0.14 — so the movement stays subtle.
   */
  speed?: number;
  /** Optional constant tilt (deg) kept while the layer drifts. */
  rotate?: number;
  as?: "div" | "span";
  "aria-hidden"?: boolean;
};

/**
 * A lightweight scroll-parallax wrapper. Drives a layer's vertical position
 * from the window scroll so decorative elements drift at different rates and
 * read as depth.
 *
 * Transforms don't affect layout, so this never nudges surrounding content and
 * is safe on absolutely-positioned decoration. At first paint (scroll = 0) the
 * transform is a no-op, so the static layout is matched exactly — no flash, no
 * layout shift. Honours `prefers-reduced-motion`: the drift is dropped while any
 * constant `rotate` is kept.
 */
export function Parallax({
  children,
  className,
  speed = 0.1,
  rotate,
  as = "div",
  ...rest
}: ParallaxProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * speed);

  const style = reduce
    ? rotate !== undefined
      ? { rotate }
      : undefined
    : { y, rotate };

  if (as === "span") {
    return (
      <motion.span className={cn(className)} style={style} {...rest}>
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div className={cn(className)} style={style} {...rest}>
      {children}
    </motion.div>
  );
}
