import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Atmosphere } from "@/components/primitives/atmosphere";
import { rooms as staticRooms } from "@/lib/content";
import { img } from "@/lib/images";

export type RoomItem = {
  key: string;
  name: string;
  tag: string;
  age: string;
  copy: string;
  imageSrc: string;
  imageAlt: string;
};

export function Rooms({ cmsRooms }: { cmsRooms?: RoomItem[] }) {
  const items: RoomItem[] =
    cmsRooms && cmsRooms.length > 0
      ? cmsRooms
      : staticRooms.items.map((r) => {
          const { src, alt } = img(r.image);
          return {
            key: r.key,
            name: r.name,
            tag: r.tag,
            age: r.age,
            copy: r.copy,
            imageSrc: src,
            imageAlt: alt,
          };
        });

  return (
    <section id="rooms" className="relative overflow-hidden scroll-mt-24 bg-sand py-section">
      <Atmosphere tone="terracotta" flip />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{staticRooms.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
              {staticRooms.title}
            </h2>
          </div>
          <p className="max-w-sm text-[1.02rem] leading-relaxed text-ink-soft">
            {staticRooms.intro}
          </p>
        </div>

        <ul className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((room, i) => (
            <Reveal as="li" key={room.key} delay={(i % 3) * 0.08}>
              <a href="#book" className="group block">
                <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-sand shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
                  <Image
                    src={room.imageSrc}
                    alt={room.imageAlt}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-pill bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-navy backdrop-blur-sm">
                    {room.tag}
                  </span>
                </div>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[1.7rem] leading-tight">
                      {room.name}
                    </h3>
                    <span className="shrink-0 text-sm font-medium text-terracotta-700">
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
          ))}
        </ul>
      </Container>
    </section>
  );
}
