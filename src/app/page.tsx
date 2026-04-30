export const dynamic = "force-dynamic";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesBackground } from "@/components/ServicesBackground";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsSection } from "@/components/NewsSection";
import { FooterSection } from "@/components/FooterSection";
import {
  getNewsPosts,
  getPortfolioProjects,
  getTestimonials,
  getServices,
} from "@/sanity/queries";

export default async function Home() {
  const [posts, projects, testimonials, services] = await Promise.all([
    getNewsPosts(),
    getPortfolioProjects(),
    getTestimonials(),
    getServices(),
  ]);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ExperienceSection />
        <AboutSection />
        <ServicesBackground />
        <ServicesSection services={services} />
        <PortfolioSection projects={projects} />
        <TestimonialsSection testimonials={testimonials} />
        <NewsSection posts={posts} />
      </main>
      <FooterSection />
    </>
  );
}
