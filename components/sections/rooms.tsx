import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Atmosphere } from "@/components/primitives/atmosphere";
import type { RoomsContent } from "@/lib/sanity/types";
import { brandTile } from "@/lib/palette";

export function Rooms({ rooms }: { rooms: RoomsContent }) {
  return (
    <section id="rooms" className="relative overflow-hidden scroll-mt-24 bg-sand py-section">
      <Atmosphere tone="yellow" flip />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow color="yellow">{rooms.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
              {rooms.title}
            </h2>
          </div>
          <p className="max-w-sm text-[1.02rem] leading-relaxed text-ink-soft">
            {rooms.intro}
          </p>
        </div>

        <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.items.map((room, i) => {
            const image = room.image;
            return (
              <Reveal as="li" key={room.key} delay={(i % 3) * 0.08}>
                <a href="#book" className="group block">
                  <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-sand shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                      className="object-cover"
                    />
                    <span
                      className={`absolute left-4 top-4 rounded-pill px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] ${brandTile(i)}`}
                    >
                      {room.tag}
                    </span>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[1.7rem] leading-tight">
                        {room.name}
                      </h3>
                      <span className="shrink-0 rounded-pill bg-sand-200 px-2.5 py-0.5 text-xs font-semibold text-navy">
                        {room.age}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">
                      {room.copy}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                      Book a tour
                      <ArrowRight
                        className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
