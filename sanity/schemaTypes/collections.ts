import { defineField, defineType } from "sanity";

/** A room/age group. `order` controls position on the page. */
export const room = defineType({
  name: "room",
  title: "Room",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Room name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tag", title: "Tag (e.g. Nursery)", type: "string" }),
    defineField({ name: "age", title: "Age range (display)", type: "string" }),
    defineField({ name: "minMonths", title: "Youngest age (months)", type: "number" }),
    defineField({ name: "maxMonths", title: "Oldest age (months)", type: "number" }),
    defineField({ name: "copy", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Photo", type: "imageWithAlt" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "age", media: "image" } },
});

/** An educator shown in the Meet the Team grid. */
export const educator = defineType({
  name: "educator",
  title: "Educator",
  type: "document",
  fields: [
    defineField({ name: "name", title: "First name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "room", title: "Room", type: "string" }),
    defineField({ name: "years", title: "Years at Munro", type: "string" }),
    defineField({ name: "languages", title: "Languages spoken", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "quote", title: "Short quote", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role" } },
});

/** A family testimonial / review. */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Attribution", type: "string" }),
    defineField({ name: "detail", title: "Detail (e.g. suburb)", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "detail" } },
});

/** A frequently-asked question. */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "q" } },
});

/** A "Munro difference" feature card. */
export const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: ["heart", "graduation", "calendar", "globe", "utensils", "phone"],
      },
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "copy", title: "Copy", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "icon" } },
});

/** A small trust-bar item. */
export const trustItem = defineType({
  name: "trustItem",
  title: "Trust item",
  type: "document",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: ["heart", "graduation", "calendar", "globe", "utensils", "phone"],
      },
    }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sub", title: "Subtitle", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label", subtitle: "sub" } },
});
