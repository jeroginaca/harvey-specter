import { client } from "./client";

export type NewsPost = {
  _id: string;
  excerpt: string;
  link: string;
  imageUrl: string;
};

export type PortfolioProject = {
  _id: string;
  title: string;
  tags: string[];
  tallDesktop: boolean;
  imageUrl: string;
};

export type Testimonial = {
  _id: string;
  text: string;
  name: string;
  logoUrl: string;
  logoW: number;
  logoH: number;
};

export type Service = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
};

const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id";

async function safeFetch<T>(query: string): Promise<T[]> {
  if (!isSanityConfigured) return [];
  try {
    return await client.fetch(query);
  } catch {
    return [];
  }
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  return safeFetch(`
    *[_type == "newsPost"] | order(order asc) {
      _id,
      excerpt,
      link,
      "imageUrl": image.asset->url,
    }
  `);
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return safeFetch(`
    *[_type == "portfolioProject"] | order(order asc) {
      _id,
      title,
      tags,
      tallDesktop,
      "imageUrl": image.asset->url,
    }
  `);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeFetch(`
    *[_type == "testimonial"] | order(order asc) {
      _id,
      text,
      name,
      "logoUrl": logo.asset->url,
      logoW,
      logoH,
    }
  `);
}

export async function getServices(): Promise<Service[]> {
  return safeFetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      name,
      description,
      "imageUrl": image.asset->url,
    }
  `);
}
