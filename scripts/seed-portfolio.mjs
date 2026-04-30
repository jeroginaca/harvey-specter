import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: "vy9qa49t",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const projects = [
  {
    title: "Surfers Paradise",
    tags: ["Social Media", "Photography"],
    description:
      "A vibrant social media campaign capturing the raw energy of Australia's Gold Coast surf culture. Editorial photography series featuring local surfers, golden hour light, and the untamed coastline.",
    client: "Surfers Paradise Tourism",
    year: 2024,
    tallDesktop: true,
    order: 1,
    imgFile: "portfolio-1.jpg",
  },
  {
    title: "Cyberpunk Caffe",
    tags: ["Social Media", "Photography"],
    description:
      "Brand identity and social media presence for an avant-garde coffee shop blending retro-futuristic aesthetics with specialty coffee culture. Neon-lit product photography and moody atmospheric shots.",
    client: "Cyberpunk Caffe",
    year: 2023,
    tallDesktop: false,
    order: 2,
    imgFile: "portfolio-2.jpg",
  },
  {
    title: "Agency 976",
    tags: ["Social Media", "Photography"],
    description:
      "Complete visual identity and ongoing content creation for a boutique creative agency. Clean, minimal photography paired with bold typographic social templates that elevated their digital presence.",
    client: "Agency 976",
    year: 2024,
    tallDesktop: false,
    order: 3,
    imgFile: "portfolio-3.jpg",
  },
  {
    title: "Minimal Playground",
    tags: ["Social Media", "Photography"],
    description:
      "A personal project exploring the intersection of minimalist design principles and playful visual experimentation. Conceptual still-life photographs published across digital platforms.",
    client: "Personal Project",
    year: 2023,
    tallDesktop: true,
    order: 4,
    imgFile: "portfolio-4.jpg",
  },
];

async function uploadImage(filename) {
  const filePath = join(__dirname, "../public", filename);
  console.log(`Uploading ${filename}...`);
  const asset = await client.assets.upload(
    "image",
    createReadStream(filePath),
    { filename }
  );
  console.log(`  ✓ Uploaded: ${asset._id}`);
  return asset._id;
}

async function seed() {
  console.log("Seeding portfolio projects...\n");

  // Delete existing portfolio documents first
  const existing = await client.fetch('*[_type == "portfolioProject"]._id');
  if (existing.length > 0) {
    console.log(`Deleting ${existing.length} existing documents...`);
    await Promise.all(existing.map((id) => client.delete(id)));
  }

  for (const project of projects) {
    const assetId = await uploadImage(project.imgFile);

    const { imgFile, ...data } = project;
    const doc = {
      _type: "portfolioProject",
      ...data,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      },
    };

    const created = await client.create(doc);
    console.log(`  ✓ Created: "${project.title}" (${created._id})\n`);
  }

  console.log("Done! All portfolio projects seeded.");
}

seed().catch(console.error);
