"use client";

import { useEffect, useState } from "react";

/**
 * Thin brand-gradient bar pinned to the very top that fills as you scroll the
 * page — a small, lively sense of progress. Decorative; sits above the navbar.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[130] h-1 origin-left"
      style={{
        transform: `scaleX(${progress / 100})`,
        background:
          "linear-gradient(to right, var(--color-brand-blue), var(--color-brand-green), var(--color-brand-yellow), var(--color-brand-red))",
      }}
    />
  );
}
