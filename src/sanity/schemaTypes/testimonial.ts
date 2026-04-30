import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "text", title: "Quote", type: "text", rows: 4 }),
    defineField({ name: "name", title: "Author Name", type: "string" }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      description: "Upload the client's company logo (SVG or PNG)",
    }),
    defineField({ name: "logoW", title: "Logo Width (px)", type: "number" }),
    defineField({ name: "logoH", title: "Logo Height (px)", type: "number" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
