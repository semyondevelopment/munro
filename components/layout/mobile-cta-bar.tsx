"use client";

import { useEffect, useState } from "react";
import { Phone, ClipboardList } from "lucide-react";
import { site as siteConfig } from "@/lib/site";
import type { ResolvedSite } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

/**
 * Sticky conversion bar on mobile — keeps "Call" and "Join the Waitlist" one
 * tap away at all times. Appears once the user scrolls past the hero.
 */
export function MobileCtaBar({ site }: { site: ResolvedSite }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Appear soon after the hero so a one-tap path is always close at hand.
      const next = window.scrollY > 320;
      setShow((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[90] border-t border-navy/10 bg-cream/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-[transform,opacity] duration-500 ease-out-expo lg:hidden",
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="flex items-center gap-3">
        <a
          href={site.contact.phoneHref}
          className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-pill border border-navy/15 px-4 text-[0.95rem] font-medium text-navy"
        >
          <Phone className="size-4" strokeWidth={1.8} />
          Call
        </a>
        <a
          href={siteConfig.owna.waitlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-13 flex-[1.6] items-center justify-center gap-2 rounded-pill bg-brand-green-deep px-4 text-[0.95rem] font-medium text-cream shadow-soft"
        >
          <ClipboardList className="size-4" strokeWidth={1.8} />
          Join the Waitlist
        </a>
      </div>
    </div>
  );
}
