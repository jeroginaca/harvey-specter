import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "../public");

const client = createClient({
  projectId: "vy9qa49t",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function upload(filePath, contentType) {
  const stream = createReadStream(filePath);
  const opts = contentType ? { contentType } : {};
  const asset = await client.assets.upload("image", stream, opts);
  return asset._id;
}

async function deleteAll(type) {
  const ids = await client.fetch(`*[_type == "${type}"]._id`);
  if (ids.length) await Promise.all(ids.map((id) => client.delete(id)));
}

// ─── SERVICES ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    name: "Brand Discovery",
    description:
      "Strategy sessions to uncover your brand's identity, positioning, and unique value proposition. We define the visual language and messaging that sets you apart before a single pixel is designed.",
    imgFile: "service-1.jpg",
    order: 1,
  },
  {
    name: "Web Design & Dev",
    description:
      "End-to-end design and development of high-performance websites. From wireframes to launch, every screen is crafted to convert visitors into clients.",
    imgFile: "service-2.jpg",
    order: 2,
  },
  {
    name: "Marketing",
    description:
      "Data-driven marketing campaigns that combine compelling visuals with strategic distribution. Social media, email, and digital ads that actually move the needle.",
    imgFile: "service-3.jpg",
    order: 3,
  },
  {
    name: "Photography",
    description:
      "Professional photography that captures the essence of your brand. Product, lifestyle, and editorial shoots delivered with the same precision as every other touchpoint.",
    imgFile: "service-4.jpg",
    order: 4,
  },
];

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    text: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    logoFile: "testimonial-logos/logo-lukas.svg",
    logoW: 139,
    logoH: 27,
    order: 1,
  },
  {
    text: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    logoFile: "testimonial-logos/logo-marko.svg",
    logoW: 144,
    logoH: 36,
    order: 2,
  },
  {
    text: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    logoFile: "testimonial-logos/logo-sarah.svg",
    logoW: 110,
    logoH: 35,
    order: 3,
  },
  {
    text: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    logoFile: "testimonial-logos/logo-sofia.svg",
    logoW: 84,
    logoH: 42,
    order: 4,
  },
];

// ─── NEWS POSTS ────────────────────────────────────────────────────────────
const NEWS = [
  {
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    link: "#",
    imgFile: "news/news-1.jpg",
    order: 1,
  },
  {
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    link: "#",
    imgFile: "news/news-2.jpg",
    order: 2,
  },
  {
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    link: "#",
    imgFile: "news/news-3.jpg",
    order: 3,
  },
  {
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    link: "#",
    imgFile: "news/news-2.jpg",
    order: 4,
  },
];

async function seedServices() {
  console.log("\n── Services ──────────────────────────────");
  await deleteAll("service");
  for (const svc of SERVICES) {
    const assetId = await upload(join(PUBLIC, svc.imgFile));
    await client.create({
      _type: "service",
      name: svc.name,
      description: svc.description,
      order: svc.order,
      image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
    });
    console.log(`  ✓ ${svc.name}`);
  }
}

async function seedTestimonials() {
  console.log("\n── Testimonials ──────────────────────────");
  await deleteAll("testimonial");
  for (const t of TESTIMONIALS) {
    const assetId = await upload(join(PUBLIC, t.logoFile), "image/svg+xml");
    await client.create({
      _type: "testimonial",
      text: t.text,
      name: t.name,
      logoW: t.logoW,
      logoH: t.logoH,
      order: t.order,
      logo: { _type: "image", asset: { _type: "reference", _ref: assetId } },
    });
    console.log(`  ✓ ${t.name}`);
  }
}

async function seedNews() {
  console.log("\n── News Posts ────────────────────────────");
  await deleteAll("newsPost");
  for (const post of NEWS) {
    const assetId = await upload(join(PUBLIC, post.imgFile));
    await client.create({
      _type: "newsPost",
      excerpt: post.excerpt,
      link: post.link,
      order: post.order,
      image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
    });
    console.log(`  ✓ News post ${post.order}`);
  }
}

async function run() {
  console.log("Seeding all sections...");
  await seedServices();
  await seedTestimonials();
  await seedNews();
  console.log("\n✓ Done! All sections seeded.");
}

run().catch(console.error);
