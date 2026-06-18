import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { About } from "@/components/sections/about";
import { Rooms } from "@/components/sections/rooms";
import { Welcome } from "@/components/sections/welcome";
import { Features } from "@/components/sections/features";
import { Meals } from "@/components/sections/meals";
import { Team } from "@/components/sections/team";
import { Impact } from "@/components/sections/impact";
import { Testimonials } from "@/components/sections/testimonials";
import { VirtualTour } from "@/components/sections/virtual-tour";
import { Philosophy } from "@/components/sections/philosophy";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { BookTour } from "@/components/sections/book-tour";
import { SoftDivider } from "@/components/primitives/soft-divider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <Rooms />
      <Welcome />
      <Features />
      <Meals />
      <Team />
      <SoftDivider from="sand" to="sage" />
      <Impact />
      <SoftDivider from="sage" to="cream" />
      <Testimonials />
      <VirtualTour />
      <SoftDivider from="sand" to="navy" />
      <Philosophy />
      <SoftDivider from="navy" to="cream" />
      <Faq />
      <SoftDivider from="cream" to="navy" />
      <FinalCta />
      <BookTour />
    </>
  );
}
