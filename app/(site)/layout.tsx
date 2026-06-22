import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { getSiteSettings } from "@/lib/sanity/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer
        facebook={settings?.facebook}
        instagram={settings?.instagram}
        openingHours={settings?.openingHours}
      />
      <MobileCtaBar />
    </>
  );
}
