import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { About } from "@/components/sections/about";
import { Rooms } from "@/components/sections/rooms";
import { RoomFinder } from "@/components/sections/room-finder";
import { Welcome } from "@/components/sections/welcome";
import { Features } from "@/components/sections/features";
import { Meals } from "@/components/sections/meals";
import { DayAtMunro } from "@/components/sections/day-at-munro";
import { Educators } from "@/components/sections/educators";
import { Impact } from "@/components/sections/impact";
import { Fees } from "@/components/sections/fees";
import { Testimonials } from "@/components/sections/testimonials";
import { VirtualTour } from "@/components/sections/virtual-tour";
import { Philosophy } from "@/components/sections/philosophy";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Enrol } from "@/components/sections/enrol";
import { Visit } from "@/components/sections/visit";
import { SoftDivider } from "@/components/primitives/soft-divider";
import { getSiteContent } from "@/lib/sanity/get-content";

export default async function HomePage() {
  const c = await getSiteContent();
  return (
    <>
      <Hero hero={c.hero} />
      <TrustBar trustBar={c.trustBar} />
      <About about={c.about} />
      <Rooms rooms={c.rooms} />
      <RoomFinder rooms={c.rooms} roomAgeMonths={c.roomAgeMonths} roomFinder={c.roomFinder} />
      <Welcome welcome={c.welcome} />
      <Features features={c.features} />
      <Meals meals={c.meals} />
      <DayAtMunro daySchedule={c.daySchedule} />
      <Educators educators={c.educators} />
      <SoftDivider from="cream" to="sage" />
      <Impact impact={c.impact} />
      <Fees fees={c.fees} />
      <SoftDivider from="sage" to="cream" />
      <Testimonials testimonials={c.testimonials} />
      <VirtualTour tour={c.tour} />
      <SoftDivider from="sand" to="navy" />
      <Philosophy philosophy={c.philosophy} />
      <SoftDivider from="navy" to="cream" />
      <Faq faq={c.faq} />
      <SoftDivider from="cream" to="sand" />
      <Visit site={c.site} />
      <SoftDivider from="sand" to="navy" />
      <FinalCta finalCta={c.finalCta} site={c.site} />
      <Enrol site={c.site} />
    </>
  );
}
