import { defineField, defineType } from "sanity";

/** A photo with required alt text (accessibility + SEO). */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text (describe the photo)",
      type: "string",
      description:
        "A short description of what's in the photo, for screen readers and Google.",
      validation: (r) => r.required().warning("Add alt text for accessibility."),
    }),
  ],
});

/** A call-to-action button (label + link). */
export const cta = defineType({
  name: "cta",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Button text", type: "string" }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: 'e.g. "#book" to jump to the booking form, or a full URL.',
    }),
  ],
});
