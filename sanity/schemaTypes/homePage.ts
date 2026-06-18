import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton holding the editable copy + images for each homepage section.
 * Repeating collections (rooms, educators, testimonials, FAQs, features, trust
 * items) live in their own documents so staff can add/remove entries freely.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About" },
    { name: "community", title: "Community" },
    { name: "meals", title: "Meals" },
    { name: "day", title: "A Day" },
    { name: "team", title: "Educators" },
    { name: "impact", title: "Impact" },
    { name: "fees", title: "Fees" },
    { name: "finder", title: "Room Finder" },
    { name: "tour", title: "Gallery" },
    { name: "philosophy", title: "Philosophy" },
    { name: "finalCta", title: "Final CTA" },
  ],
  fields: [
    // ---- Hero ----
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({
      name: "heroTitle",
      title: "Headline",
      type: "text",
      rows: 2,
      description: "Use a line break to split the headline across two lines.",
      group: "hero",
    }),
    defineField({ name: "heroSubhead", title: "Subheading", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroPrimaryCta", title: "Primary button", type: "cta", group: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Secondary button", type: "cta", group: "hero" }),
    defineField({
      name: "heroHighlights",
      title: "Highlights (small ticks)",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
    }),
    defineField({ name: "heroImage", title: "Main photo", type: "imageWithAlt", group: "hero" }),
    defineField({ name: "heroImageSecondary", title: "Inset photo", type: "imageWithAlt", group: "hero" }),

    // ---- About ----
    defineField({ name: "aboutEyebrow", title: "Eyebrow", type: "string", group: "about" }),
    defineField({ name: "aboutTitle", title: "Title", type: "text", rows: 2, group: "about" }),
    defineField({ name: "aboutIntro", title: "Intro", type: "text", rows: 3, group: "about" }),
    defineField({
      name: "aboutPillars",
      title: "Pillars (Belong / Grow / Thrive)",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "copy", title: "Copy", type: "text", rows: 3 },
            { name: "image", title: "Photo", type: "imageWithAlt" },
          ],
          preview: { select: { title: "name", media: "image" } },
        }),
      ],
    }),

    // ---- Community / Welcome ----
    defineField({ name: "welcomeEyebrow", title: "Eyebrow", type: "string", group: "community" }),
    defineField({ name: "welcomeTitle", title: "Title", type: "text", rows: 2, group: "community" }),
    defineField({ name: "welcomeCopy", title: "Copy", type: "text", rows: 3, group: "community" }),
    defineField({
      name: "greetings",
      title: "Greetings (word + language)",
      type: "array",
      group: "community",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "word", title: "Greeting", type: "string" },
            { name: "lang", title: "Language", type: "string" },
          ],
          preview: { select: { title: "word", subtitle: "lang" } },
        }),
      ],
    }),

    // ---- Meals ----
    defineField({ name: "mealsEyebrow", title: "Eyebrow", type: "string", group: "meals" }),
    defineField({ name: "mealsTitle", title: "Title", type: "text", rows: 2, group: "meals" }),
    defineField({ name: "mealsCopy", title: "Copy", type: "text", rows: 3, group: "meals" }),
    defineField({
      name: "mealsPoints",
      title: "Points",
      type: "array",
      of: [{ type: "string" }],
      group: "meals",
    }),
    defineField({
      name: "menuImage",
      title: "Weekly menu photo (optional)",
      type: "imageWithAlt",
      group: "meals",
    }),

    // ---- A Day ----
    defineField({ name: "dayEyebrow", title: "Eyebrow", type: "string", group: "day" }),
    defineField({ name: "dayTitle", title: "Title", type: "text", rows: 2, group: "day" }),
    defineField({ name: "dayCopy", title: "Copy", type: "text", rows: 3, group: "day" }),
    defineField({
      name: "daySteps",
      title: "Timeline steps",
      type: "array",
      group: "day",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "time", title: "Time", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "copy", title: "Copy", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "time" } },
        }),
      ],
    }),

    // ---- Educators (intro text; people are separate docs) ----
    defineField({ name: "educatorsEyebrow", title: "Eyebrow", type: "string", group: "team" }),
    defineField({ name: "educatorsTitle", title: "Title", type: "text", rows: 2, group: "team" }),
    defineField({ name: "educatorsCopy", title: "Copy", type: "text", rows: 3, group: "team" }),

    // ---- Impact ----
    defineField({ name: "impactEyebrow", title: "Eyebrow", type: "string", group: "impact" }),
    defineField({ name: "impactTitle", title: "Title", type: "text", rows: 2, group: "impact" }),
    defineField({ name: "impactCopy", title: "Copy", type: "text", rows: 3, group: "impact" }),
    defineField({
      name: "impactPoints",
      title: "Points",
      type: "array",
      of: [{ type: "string" }],
      group: "impact",
    }),
    defineField({
      name: "impactStats",
      title: "Stats",
      type: "array",
      group: "impact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "value", title: "Value (e.g. 100% or 1981)", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({ name: "impactImage", title: "Photo", type: "imageWithAlt", group: "impact" }),

    // ---- Fees ----
    defineField({ name: "feesEyebrow", title: "Eyebrow", type: "string", group: "fees" }),
    defineField({ name: "feesTitle", title: "Title", type: "text", rows: 2, group: "fees" }),
    defineField({ name: "feesCopy", title: "Copy", type: "text", rows: 3, group: "fees" }),
    defineField({
      name: "feesPoints",
      title: "Points",
      type: "array",
      group: "fees",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "copy", title: "Copy", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "sampleDailyFee",
      title: "Sample daily fee ($)",
      type: "number",
      description: "Starting value for the subsidy estimator slider.",
      group: "fees",
    }),
    defineField({ name: "feesNote", title: "Disclaimer note", type: "text", rows: 2, group: "fees" }),

    // ---- Room Finder ----
    defineField({ name: "finderEyebrow", title: "Eyebrow", type: "string", group: "finder" }),
    defineField({ name: "finderTitle", title: "Title", type: "text", rows: 2, group: "finder" }),
    defineField({ name: "finderCopy", title: "Copy", type: "text", rows: 3, group: "finder" }),

    // ---- Gallery / Tour ----
    defineField({ name: "tourEyebrow", title: "Eyebrow", type: "string", group: "tour" }),
    defineField({ name: "tourTitle", title: "Title", type: "text", rows: 2, group: "tour" }),
    defineField({ name: "tourCopy", title: "Copy", type: "text", rows: 3, group: "tour" }),
    defineField({
      name: "tourGallery",
      title: "Gallery photos",
      type: "array",
      group: "tour",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "image", title: "Photo", type: "imageWithAlt" },
            { name: "caption", title: "Caption", type: "string" },
          ],
          preview: { select: { title: "caption", media: "image" } },
        }),
      ],
    }),

    // ---- Philosophy ----
    defineField({ name: "philosophyEyebrow", title: "Eyebrow", type: "string", group: "philosophy" }),
    defineField({ name: "philosophyTitle", title: "Title", type: "text", rows: 2, group: "philosophy" }),
    defineField({ name: "philosophyCopy", title: "Copy", type: "text", rows: 4, group: "philosophy" }),
    defineField({ name: "philosophyNote", title: "Note", type: "string", group: "philosophy" }),

    // ---- Final CTA ----
    defineField({ name: "finalCtaEyebrow", title: "Eyebrow", type: "string", group: "finalCta" }),
    defineField({ name: "finalCtaTitle", title: "Title", type: "text", rows: 2, group: "finalCta" }),
    defineField({ name: "finalCtaCopy", title: "Copy", type: "text", rows: 3, group: "finalCta" }),
    defineField({ name: "finalCtaImage", title: "Background photo", type: "imageWithAlt", group: "finalCta" }),
  ],
  preview: { prepare: () => ({ title: "Homepage content" }) },
});
