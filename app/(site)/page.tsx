import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { About } from "@/components/sections/about";
import { Rooms } from "@/components/sections/rooms";
import type { RoomItem } from "@/components/sections/rooms";
import { Welcome } from "@/components/sections/welcome";
import { Features } from "@/components/sections/features";
import { Meals } from "@/components/sections/meals";
import { Team } from "@/components/sections/team";
import { Impact } from "@/components/sections/impact";
import { Testimonials } from "@/components/sections/testimonials";
import { VirtualTour } from "@/components/sections/virtual-tour";
import type { GalleryItem } from "@/components/sections/virtual-tour";
import { Philosophy } from "@/components/sections/philosophy";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { BookTour } from "@/components/sections/book-tour";
import { SoftDivider } from "@/components/primitives/soft-divider";
import { getHomePage } from "@/lib/sanity/queries";
import { sanityImage } from "@/lib/sanity/image";
import { img } from "@/lib/images";
import { rooms as staticRooms } from "@/lib/content";

export default async function HomePage() {
  const cms = await getHomePage();

  // ─── Menu image ────────────────────────────────────────────────────────────
  const menuImageUrl = cms?.menuImage?.asset
    ? sanityImage(cms.menuImage).width(900).quality(85).url()
    : undefined;

  // ─── Testimonials ──────────────────────────────────────────────────────────
  const testimonialItems = cms?.testimonials?.length
    ? cms.testimonials.map((t) => ({
        quote: t.quote,
        name: t.name,
        detail: t.detail ?? "",
      }))
    : undefined;

  // ─── FAQ ───────────────────────────────────────────────────────────────────
  const faqItems = cms?.faq?.length
    ? cms.faq.map((f) => ({ q: f.question, a: f.answer }))
    : undefined;

  // ─── Rooms: merge CMS overrides onto static room list ──────────────────────
  // Static rooms are the source of truth for order/names; CMS overrides copy,
  // age, tag, and photo per room (matched by key).
  const cmsRoomsMap = new Map(cms?.rooms?.map((r) => [r.key, r]) ?? []);
  const processedRooms: RoomItem[] = staticRooms.items.map((staticRoom) => {
    const override = cmsRoomsMap.get(staticRoom.key);
    const fallbackImg = img(staticRoom.image);
    const imageSrc = override?.image?.asset
      ? sanityImage(override.image).width(800).quality(85).url()
      : fallbackImg.src;
    return {
      key: staticRoom.key,
      name: staticRoom.name,
      tag: override?.tag ?? staticRoom.tag,
      age: override?.age ?? staticRoom.age,
      copy: override?.copy ?? staticRoom.copy,
      imageSrc,
      imageAlt: fallbackImg.alt,
    };
  });

  // ─── Team image ────────────────────────────────────────────────────────────
  const teamImageUrl = cms?.teamImage?.asset
    ? sanityImage(cms.teamImage).width(900).quality(85).url()
    : undefined;

  // ─── Gallery ───────────────────────────────────────────────────────────────
  const galleryItems: GalleryItem[] | undefined = cms?.gallery?.length
    ? cms.gallery
        .filter((item) => item.image?.asset)
        .map((item) => ({
          imageSrc: sanityImage(item.image!).width(900).quality(85).url(),
          imageAlt: item.caption ?? "The Munro Centre",
          caption: item.caption ?? "",
        }))
    : undefined;

  // ─── Impact stats ──────────────────────────────────────────────────────────
  const impactStats = cms?.impactStats?.length ? cms.impactStats : undefined;

  return (
    <>
      <Hero
        highlights={cms?.heroHighlights}
        subhead={cms?.heroSubhead}
      />
      <TrustBar />
      <About
        intro={cms?.aboutIntro}
        pillarBelong={cms?.aboutPillarBelong}
        pillarGrow={cms?.aboutPillarGrow}
        pillarThrive={cms?.aboutPillarThrive}
      />
      <Rooms cmsRooms={processedRooms} />
      <Welcome />
      <Features />
      <Meals menuImageUrl={menuImageUrl} />
      <Team
        copy={cms?.teamCopy}
        points={cms?.teamPoints}
        imageSrc={teamImageUrl}
      />
      <SoftDivider from="sand" to="sage" />
      <Impact copy={cms?.impactCopy} stats={impactStats} />
      <SoftDivider from="sage" to="cream" />
      <Testimonials cmsItems={testimonialItems} />
      <VirtualTour cmsGallery={galleryItems} />
      <SoftDivider from="sand" to="navy" />
      <Philosophy cmsCopy={cms?.philosophy ?? undefined} />
      <SoftDivider from="navy" to="cream" />
      <Faq cmsItems={faqItems} />
      <SoftDivider from="cream" to="navy" />
      <FinalCta />
      <BookTour />
    </>
  );
}
