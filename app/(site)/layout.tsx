import { homeJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { getSiteContent } from "@/lib/sanity/get-content";

/**
 * Layout for the public marketing site — adds the nav, footer and conversion
 * chrome, plus the homepage JSON-LD (sourced from the resolved CMS content, so
 * structured data stays in sync with edits). The Sanity Studio at /studio sits
 * outside this group, so it renders without any of the site furniture.
 */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getSiteContent();
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD is server-rendered, trusted content (no user input).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(content)) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-cream"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar site={content.site} />
      <main id="main">{children}</main>
      <Footer site={content.site} />
      <MobileCtaBar site={content.site} />
    </>
  );
}
