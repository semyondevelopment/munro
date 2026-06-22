"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/content";
import type { ResolvedSite } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export function Navbar({ site }: { site: ResolvedSite }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 16;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] border-b bg-paper transition-shadow duration-500 ease-out-expo",
        scrolled ? "border-navy/10 shadow-soft" : "border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-[92rem] items-center justify-between px-6 sm:px-8 lg:px-10"
      >
        <a href="#top" className="relative z-10 -m-2 rounded-lg p-2" aria-label={site.name}>
          <Logo className="h-14 w-auto" priority />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="link-underline text-[0.95rem] font-medium text-navy/75 transition-colors duration-300 hover:text-navy"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.contact.phoneHref}
            className="hidden items-center gap-2 rounded-pill px-4 py-2 text-sm font-medium text-navy/75 transition-colors duration-300 hover:text-navy lg:inline-flex"
          >
            <Phone className="size-4" strokeWidth={1.8} />
            {site.contact.phone}
          </a>

          <Button asChild size="sm" className="sm:hidden">
            <a href="#book">Book</a>
          </Button>
          <Button asChild size="md" className="hidden sm:inline-flex">
            <a href="#book">Book a Tour</a>
          </Button>

          {/* Mobile menu */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-pill text-navy transition-colors hover:bg-navy/5 lg:hidden"
              >
                <Menu className="size-6" strokeWidth={1.8} />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay fixed inset-0 z-[110] bg-navy/40 backdrop-blur-sm lg:hidden" />
              <Dialog.Content
                aria-describedby={undefined}
                className="sheet-content fixed inset-x-0 top-0 z-[120] rounded-b-[2rem] bg-paper px-6 pb-10 pt-6 shadow-lift focus:outline-none lg:hidden"
              >
                <div className="flex items-center justify-between">
                  <Logo className="h-12 w-auto" />
                  <Dialog.Title className="sr-only">Menu</Dialog.Title>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="inline-flex size-11 items-center justify-center rounded-pill text-navy hover:bg-navy/5"
                  >
                    <X className="size-6" strokeWidth={1.8} />
                  </Dialog.Close>
                </div>

                <ul className="mt-8 flex flex-col gap-1">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-navy/10 py-4 font-display text-3xl text-navy"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <Button asChild size="lg" className="w-full">
                    <a href="#book" onClick={() => setOpen(false)}>
                      Book a Tour
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="w-full">
                    <a href={site.contact.phoneHref}>
                      <Phone className="size-4" strokeWidth={1.8} />
                      {site.contact.phone}
                    </a>
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
