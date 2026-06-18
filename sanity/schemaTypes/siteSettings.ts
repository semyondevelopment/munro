import { defineField, defineType } from "sanity";

/** Singleton: the centre's contact details, hours and social links. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "hours", title: "Hours" },
    { name: "social", title: "Social & legal" },
  ],
  fields: [
    defineField({ name: "name", title: "Centre name", type: "string", group: "contact" }),
    defineField({ name: "phone", title: "Phone (display)", type: "string", group: "contact" }),
    defineField({
      name: "phoneHref",
      title: "Phone (dial link)",
      type: "string",
      description: 'e.g. "tel:+61738769916"',
      group: "contact",
    }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "addressFull", title: "Full address", type: "string", group: "contact" }),
    defineField({ name: "mapUrl", title: "Google Maps link", type: "url", group: "contact" }),

    defineField({
      name: "hoursDisplay",
      title: "Opening hours (display)",
      type: "string",
      description: 'e.g. "Monday – Friday, 7:30am – 6:00pm"',
      group: "hours",
    }),

    defineField({ name: "facebook", title: "Facebook URL", type: "url", group: "social" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "social" }),
    defineField({
      name: "acknowledgement",
      title: "Acknowledgement of Country",
      type: "text",
      rows: 3,
      group: "social",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
