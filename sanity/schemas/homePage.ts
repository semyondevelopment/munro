import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",

  groups: [
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "rooms", title: "Rooms" },
    { name: "team", title: "Team" },
    { name: "impact", title: "Impact" },
    { name: "meals", title: "Meals" },
    { name: "gallery", title: "Gallery" },
    { name: "testimonials", title: "Testimonials" },
    { name: "philosophy", title: "Philosophy" },
    { name: "faq", title: "FAQ" },
  ],

  fields: [
    // ─── HERO ──────────────────────────────────────────────────────────────────

    defineField({
      name: "heroSubhead",
      title: "Subtitle (under the main heading)",
      description:
        'The single sentence below "Every Child Deserves To Belong".',
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHighlights",
      title: "Credential badges (bottom of hero)",
      description:
        "Short labels that appear with tick marks. Keep to 3 items.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(4),
      group: "hero",
    }),

    // ─── ABOUT ─────────────────────────────────────────────────────────────────

    defineField({
      name: "aboutIntro",
      title: "About — Intro paragraph",
      type: "text",
      rows: 4,
      group: "about",
    }),
    defineField({
      name: "aboutPillarBelong",
      title: 'About — "Belong" card copy',
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutPillarGrow",
      title: 'About — "Grow" card copy',
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutPillarThrive",
      title: 'About — "Thrive" card copy',
      type: "text",
      rows: 3,
      group: "about",
    }),

    // ─── ROOMS ─────────────────────────────────────────────────────────────────

    defineField({
      name: "rooms",
      title: "Rooms",
      description:
        "Edit copy, age range and photo for each room. The room names are fixed.",
      type: "array",
      group: "rooms",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Room key (do not change)",
              description:
                "Internal identifier — matches the code. Do not edit.",
              type: "string",
              readOnly: true,
            }),
            defineField({
              name: "name",
              title: "Room name",
              type: "string",
              readOnly: true,
            }),
            defineField({
              name: "tag",
              title: "Tag label",
              description: 'Short label e.g. "Nursery", "Toddlers"',
              type: "string",
            }),
            defineField({
              name: "age",
              title: "Age range",
              description: 'e.g. "6 weeks – 15 months"',
              type: "string",
            }),
            defineField({
              name: "copy",
              title: "Room description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Room photo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "tag" },
          },
        },
      ],
    }),

    // ─── TEAM ──────────────────────────────────────────────────────────────────

    defineField({
      name: "teamCopy",
      title: "Team — Paragraph",
      type: "text",
      rows: 4,
      group: "team",
    }),
    defineField({
      name: "teamPoints",
      title: "Team — Checklist items",
      type: "array",
      of: [{ type: "string" }],
      group: "team",
    }),
    defineField({
      name: "teamImage",
      title: "Team — Photo",
      description: "Photo of your educators / team wall.",
      type: "image",
      options: { hotspot: true },
      group: "team",
    }),

    // ─── IMPACT ────────────────────────────────────────────────────────────────

    defineField({
      name: "impactCopy",
      title: "Impact — Paragraph",
      type: "text",
      rows: 4,
      group: "impact",
    }),
    defineField({
      name: "impactStats",
      title: "Impact — Statistics",
      description:
        'The 3 big numbers. e.g. value "100%" + label "of surplus reinvested".',
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Number / value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      validation: (Rule) => Rule.max(3),
      group: "impact",
    }),

    // ─── MEALS ─────────────────────────────────────────────────────────────────

    defineField({
      name: "menuImage",
      title: "Weekly menu photo",
      description:
        "Upload the current weekly menu photo here — update each Monday.",
      type: "image",
      options: { hotspot: true },
      group: "meals",
    }),

    // ─── GALLERY ───────────────────────────────────────────────────────────────

    defineField({
      name: "gallery",
      title: "Gallery photos",
      description:
        "Photos shown in the Life at Munro gallery. Drag to reorder. Aim for 6-12 photos.",
      type: "array",
      group: "gallery",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "caption",
              title: "Caption",
              description: 'Short label e.g. "Our children\'s art"',
              type: "string",
            }),
          ],
          preview: { select: { title: "caption", media: "image" } },
        },
      ],
    }),

    // ─── TESTIMONIALS ──────────────────────────────────────────────────────────

    defineField({
      name: "testimonials",
      title: "Family Testimonials",
      description:
        "Real reviews from Google or parent feedback. Add as many as you like.",
      type: "array",
      group: "testimonials",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Review text",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "Name",
              description: 'e.g. "Sarah M." or "A Munro family"',
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "detail",
              title: "Location / Detail",
              description: 'e.g. "St Lucia" or "Parent since 2022"',
              type: "string",
            }),
          ],
          preview: { select: { title: "name", subtitle: "quote" } },
        },
      ],
    }),

    // ─── PHILOSOPHY ────────────────────────────────────────────────────────────

    defineField({
      name: "philosophy",
      title: "Philosophy statement",
      description:
        "The statement shown in the dark Philosophy section. Ana's full text goes here when ready.",
      type: "text",
      rows: 6,
      group: "philosophy",
    }),

    // ─── FAQ ───────────────────────────────────────────────────────────────────

    defineField({
      name: "faq",
      title: "FAQ Items",
      description: "Frequently asked questions. Drag to reorder.",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
