import type { StructureResolver } from "sanity/structure";

/**
 * Custom desk: the two singletons (Homepage, Site settings) open straight to
 * their single document, with the repeatable collections listed below.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("room").title("Rooms"),
      S.documentTypeListItem("educator").title("Educators"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("feature").title("Features"),
      S.documentTypeListItem("trustItem").title("Trust bar"),
    ]);
