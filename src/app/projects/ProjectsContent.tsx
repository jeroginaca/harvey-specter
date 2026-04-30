"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";
import { LetsTalkButton } from "@/components/LetsTalkButton";
import type { PortfolioProject } from "@/sanity/queries";

// ─── Shared ───────────────────────────────────────────────────────────────────

function W({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return <span data-word className={`inline-block ${className ?? ""}`} style={style}>{children}</span>;
}

const BIG = "text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-black";

function ArrowNE() {
  return (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" aria-hidden="true">
      <path d="M1 12L12 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 1H12V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ProjectsHero({ count }: { count: number }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const words = sectionRef.current?.querySelectorAll("[data-word]");
    if (!words?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(words, { opacity: 0.15 }, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white min-h-[100svh] flex flex-col px-4 md:px-8 pt-32 pb-12 md:pb-20">
      <div className="flex items-center justify-between mb-auto">
        <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ Projects ]</span>
        <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ {String(count).padStart(2, "0")} Works ]</span>
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <p className={BIG}><W>Selected</W></p>
        <p className={`${BIG} md:pl-[13rem]`}><W>work</W></p>
        <p className={`${BIG} md:pl-[6rem]`}>
          <W>&amp;</W>{" "}
          <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>projects</W>
          <W>.</W>
        </p>
        <div className="mt-4">
          <W className="text-sm font-normal uppercase text-[#1f1f1f]">[ Art Direction — Photography — Brand Identity ]</W>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3">
        <div className="w-full h-px bg-black/10" />
        <div className="flex items-center justify-between">
          <span className="text-[clamp(4rem,13.75vw,12rem)] font-light tracking-[-0.08em] leading-none text-black/10">
            {String(count).padStart(2, "0")}
          </span>
          <span className="hidden md:block font-mono text-sm font-normal uppercase text-[#1f1f1f]">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Project Row ──────────────────────────────────────────────────────────────

function ProjectRow({ project, index }: { project: PortfolioProject; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          imgRef.current,
          { y: 30 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`group flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-0 md:items-stretch border-b border-black/10 last:border-0 py-12 md:py-0`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[36rem] ${isEven ? "md:order-1" : "md:order-2"}`}>
        {project.imageUrl && (
          <div ref={imgRef} className="absolute inset-0">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-[#111] bg-white/30 backdrop-blur-[1.25rem] rounded-full px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div
        ref={infoRef}
        className={`flex flex-col justify-between gap-6 px-4 md:px-8 md:py-12 ${isEven ? "md:order-2" : "md:order-1"}`}
      >
        <div className="flex flex-col gap-4">
          {/* Number + divider */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-sm font-normal uppercase text-[#999]">
              [ {String(index + 1).padStart(2, "0")} ]
            </span>
            <div className="w-full h-px bg-black/10" />
          </div>

          {/* Title */}
          <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] font-bold italic uppercase tracking-[-0.04em] leading-[1.05] text-black transition-transform duration-500 ease-out group-hover:translate-x-2">
            {project.title}
          </h2>

          {/* Meta */}
          <div className="flex flex-col gap-0">
            {project.client && (
              <div className="flex items-center justify-between py-3 border-b border-black/10">
                <span className="font-mono text-xs uppercase text-[#999]">Client</span>
                <span className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em]">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center justify-between py-3 border-b border-black/10">
                <span className="font-mono text-xs uppercase text-[#999]">Year</span>
                <span className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em]">{project.year}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5]">
              {project.description}
            </p>
          )}
        </div>

        {/* CTA link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-black w-fit transition-gap duration-300 group/link"
          >
            <span className="border-b border-black/20 pb-px transition-colors duration-300 group-hover/link:border-black">
              View Project
            </span>
            <span className="transition-transform duration-300 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
              <ArrowNE />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Projects List ────────────────────────────────────────────────────────────

function ProjectsList({ projects }: { projects: PortfolioProject[] }) {
  return (
    <section className="w-full bg-white px-4 md:px-0">
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <ProjectRow key={project._id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <section className="w-full bg-white py-32 px-4 md:px-8 flex flex-col items-center gap-6 text-center">
      <span className="font-mono text-sm uppercase text-[#999]">[ No projects yet ]</span>
      <p className="text-[clamp(1.5rem,4vw,3rem)] font-light uppercase tracking-[-0.08em] text-black/20">
        Check back soon.
      </p>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function ProjectsCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const words = sectionRef.current?.querySelectorAll("[data-word]");
    if (!words?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(words, { opacity: 0.15 }, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "center 50%",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f3f3f3] py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="w-full h-px bg-black/10" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className={BIG}><W>Have a</W> <W>project</W></p>
            <p className={`${BIG} md:pl-[8rem]`}>
              <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>in mind</W>
              <W>?</W>
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <p className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.4] max-w-[20rem]">
              Every project starts with a conversation. Let&apos;s talk about yours.
            </p>
            <LetsTalkButton variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ProjectsContent({ projects }: { projects: PortfolioProject[] }) {
  return (
    <>
      <div className="relative z-10">
        <Header />
        <main>
          <ProjectsHero count={projects.length} />
          {projects.length > 0 ? (
            <ProjectsList projects={projects} />
          ) : (
            <EmptyState />
          )}
          <ProjectsCTA />
        </main>
      </div>
      <FooterSection />
    </>
  );
}
