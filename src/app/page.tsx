import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesBackground } from "@/components/ServicesBackground";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsSection } from "@/components/NewsSection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ExperienceSection />
        <AboutSection />
        <ServicesBackground />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <NewsSection />
      </main>
      <FooterSection />
    </>
  );
}
