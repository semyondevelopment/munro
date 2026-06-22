"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Atmosphere } from "@/components/primitives/atmosphere";
import { tour as staticTour } from "@/lib/content";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  imageSrc: string;
  imageAlt: string;
  caption: string;
};

const aspects = [
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
];

export function VirtualTour({ cmsGallery }: { cmsGallery?: GalleryItem[] }) {
  const gallery: GalleryItem[] =
    cmsGallery && cmsGallery.length > 0
      ? cmsGallery
      : staticTour.gallery.map((item) => {
          const { src, alt } = img(item.image);
          return { imageSrc: src, imageAlt: alt, caption: item.caption };
        });

  const [openAt, setOpenAt] = useState<number | null>(null);
  const open = openAt !== null;

  const step = useCallback(
    (delta: number) =>
      setOpenAt((i) =>
        i === null ? i : (i + delta + gallery.length) % gallery.length,
      ),
    [gallery.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const active = openAt !== null ? gallery[openAt] : null;

  return (
    <section className="relative overflow-hidden bg-sand py-section">
      <Atmosphere tone="terracotta" />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{staticTour.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
              {staticTour.title}
            </h2>
          </div>
          <p className="max-w-sm text-[1.02rem] leading-relaxed text-ink-soft">
            {staticTour.copy}
          </p>
        </div>

        {/* Masonry gallery */}
        <Reveal className="mt-12">
          <div className="gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
            {gallery.map((item, i) => (
              <button
                key={`${item.imageSrc}-${i}`}
                type="button"
                onClick={() => setOpenAt(i)}
                aria-label={`Open ${item.caption}`}
                className="group mb-4 block w-full break-inside-avoid"
              >
                <div
                  className={cn(
                    "img-zoom relative w-full overflow-hidden rounded-[var(--radius)] bg-sand shadow-soft transition-shadow duration-500 group-hover:shadow-lift",
                    aspects[i % aspects.length],
                  )}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width:1024px) 31vw, (min-width:640px) 46vw, 92vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="font-display text-xl text-cream">
                      {item.caption}
                    </span>
                    <span className="inline-flex size-9 items-center justify-center rounded-pill bg-cream/15 text-cream backdrop-blur-md">
                      <Expand className="size-4" strokeWidth={1.8} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={(o) => !o && setOpenAt(null)}>
        <DialogContent showClose aria-describedby={undefined} className="max-w-6xl">
          <DialogTitle className="sr-only">
            {active ? active.caption : "Gallery image"}
          </DialogTitle>
          {active && (
            <figure className="overflow-hidden rounded-[var(--radius)] bg-navy">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  sizes="92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-cream">
                <span className="font-display text-xl">{active.caption}</span>
                <span className="text-sm text-cream/60">
                  {(openAt ?? 0) + 1} / {gallery.length}
                </span>
              </figcaption>
            </figure>
          )}

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-[calc(50%-2rem)] inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-pill bg-cream/10 text-cream backdrop-blur-md transition-colors hover:bg-cream/20 sm:-left-2 sm:-translate-x-full"
          >
            <ArrowLeft className="size-5" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-3 top-[calc(50%-2rem)] inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-pill bg-cream/10 text-cream backdrop-blur-md transition-colors hover:bg-cream/20 sm:-right-2 sm:translate-x-full"
          >
            <ArrowRight className="size-5" strokeWidth={1.8} />
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
