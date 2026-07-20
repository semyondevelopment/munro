import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Crawlable by everyone — including AI assistants (GPTBot, Google-Extended,
        // PerplexityBot, ClaudeBot…) — except the editing UI and API routes.
        userAgent: "*",
        allow: "/",
        // /guide is an unlisted staff how-to page; keep it out of search.
        disallow: ["/studio/", "/api/", "/guide"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
