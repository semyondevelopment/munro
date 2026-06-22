import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "openingHours",
      title: "Opening hours",
      description:
        'Shown in the footer. e.g. "Monday – Friday, 7:30am – 6:00pm"',
      type: "string",
    }),
    defineField({
      name: "facebook",
      title: "Facebook page URL",
      description: "Full URL e.g. https://www.facebook.com/munrocentre",
      type: "url",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      description: "Full URL e.g. https://www.instagram.com/munrocentre",
      type: "url",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
