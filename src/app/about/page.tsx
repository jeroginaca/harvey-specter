"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";
import { LetsTalkButton } from "@/components/LetsTalkButton";

// ─── Shared SVGs ──────────────────────────────────────────────────────────────

function CornerTL() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M 14 0 L 0 0 L 0 14" stroke="black" strokeWidth="1" strokeLinecap="square" /></svg>;
}
function CornerBL() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M 0 2 L 0 16 L 14 16" stroke="black" strokeWidth="1" strokeLinecap="square" /></svg>;
}
function CornerTR() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M 2 0 L 16 0 L 16 14" stroke="black" strokeWidth="1" strokeLinecap="square" /></svg>;
}
function CornerBR() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M 16 2 L 16 16 L 2 16" stroke="black" strokeWidth="1" strokeLinecap="square" /></svg>;
}

function W({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <span data-word className={`inline-block ${className ?? ""}`} style={style}>{children}</span>;
}

const BIG = "text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-black";

// ─── Hero + Bio (shared sticky image layout) ──────────────────────────────────

const STATS = [
  { num: 8,   suffix: "+", label: "Years in industry" },
  { num: 120, suffix: "+", label: "Projects delivered" },
  { num: 40,  suffix: "+", label: "Happy clients" },
];

function AboutHeroAndBio() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Word-fill on scroll
    const words = heroRef.current?.querySelectorAll("[data-word]");
    const ctx = gsap.context(() => {
      if (words?.length) {
        gsap.fromTo(words, { opacity: 0.15 }, {
          opacity: 1, stagger: 0.1, ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%", end: "bottom 50%", scrub: 0.5,
          },
        });
      }

      // Counter animation on mount
      STATS.forEach(({ num, suffix }, i) => {
        const el = statRefs.current[i];
        if (!el) return;
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: num,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.4 + i * 0.12,
          onUpdate() { el.textContent = Math.round(proxy.val) + suffix; },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white flex flex-col md:flex-row">

      {/* Left: hero + bio stacked — order-2 on mobile (image goes first) */}
      <div className="flex-1 min-w-0 order-2 md:order-1">

        {/* Hero content */}
        <div ref={heroRef} className="flex flex-col justify-between md:min-h-[100svh] px-4 md:px-8 pt-10 md:pt-32 pb-12 md:pb-20">
          <div />

          <div className="flex flex-col gap-2 mt-auto">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f] mb-3">[ About ]</span>
              <p className={BIG}><W>The</W> <W>creative</W></p>
              <p className={`${BIG} md:pl-[13rem]`}>
                <W>mind</W>{" "}
                <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>behind</W>
              </p>
              <p className={`${BIG} md:pl-[6rem]`}>
                <W>H.</W><W>Studio</W><W>.</W>
              </p>
              <div className="mt-3">
                <W className="text-sm font-normal uppercase text-[#1f1f1f]">[ Visual Storyteller — Chicago, IL ]</W>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3">
            <div className="w-full h-px bg-black/20" />
            <div className="flex items-end justify-between">
              <div className="flex gap-8 md:gap-16">
                {STATS.map(({ num, suffix, label }, i) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span
                      ref={(el) => { statRefs.current[i] = el; }}
                      className="text-[2rem] md:text-[3rem] font-light tracking-[-0.08em] leading-none text-black"
                    >
                      0{suffix}
                    </span>
                    <span className="text-xs font-normal uppercase tracking-[-0.02em] text-[#1f1f1f]">{label}</span>
                  </div>
                ))}
              </div>
              <span className="hidden md:block font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ Creative Freelancer ]</span>
            </div>
          </div>
        </div>

        {/* Bio content */}
        <div className="px-4 md:px-8 py-12 md:py-20">
          <div className="flex flex-col gap-8 max-w-[56.25rem]">

            <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ Bio ]</span>

            <div className="flex items-stretch gap-3">
              <div className="flex flex-col justify-between w-6 shrink-0 py-px">
                <CornerTL /><CornerBL />
              </div>
              <div className="flex-1 flex flex-col gap-4 py-3">
                <p className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5]">
                  Harvey Specter is a Chicago-born creative director and photographer with over eight years
                  of experience crafting visual identities for brands across fashion, hospitality, and
                  technology. His work sits at the intersection of fine art and commercial storytelling —
                  always rooted in a deep respect for craft.
                </p>
                <p className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5]">
                  After graduating from the School of the Art Institute of Chicago, Harvey cut his teeth
                  at some of the most respected agencies in the midwest before going independent in 2021.
                  Today he leads H.Studio — a boutique creative practice built on one principle:
                  every pixel should earn its place.
                </p>
              </div>
              <div className="flex flex-col justify-between w-6 shrink-0 py-px">
                <CornerTR /><CornerBR />
              </div>
            </div>

            <div className="flex flex-col gap-0">
              {[
                { label: "Based in", value: "Chicago, IL" },
                { label: "Education", value: "SAIC — BFA Visual Communication" },
                { label: "Speciality", value: "Brand Identity, Art Direction, Photography" },
                { label: "Available for", value: "Freelance & Collaborative Projects" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="group flex items-start justify-between py-4 border-b border-black/10 gap-4 hover:px-5 hover:bg-black transition-all duration-300 cursor-default"
                >
                  <span className="font-mono text-xs font-normal uppercase text-[#999] shrink-0 transition-colors duration-300 group-hover:text-white/60">
                    {label}
                  </span>
                  <span className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] text-right transition-colors duration-300 group-hover:text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Image — order-1 on mobile (top), sticky right column on desktop */}
      <div className="order-1 md:order-2 w-full md:w-[42%] shrink-0">
        {/* Mobile: tall fixed-height portrait */}
        <div className="relative h-[75svh] md:hidden overflow-hidden">
          <Image
            src="/about-photo.jpg"
            alt="Harvey Specter"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        {/* Desktop: sticky pinned column */}
        <div className="hidden md:block sticky top-0 h-[100svh] relative overflow-hidden">
          <Image
            src="/about-photo.jpg"
            alt="Harvey Specter"
            fill
            priority
            sizes="42vw"
            className="object-cover object-top"
          />
        </div>
      </div>

    </div>
  );
}

// ─── Journey / Timeline ───────────────────────────────────────────────────────

const MILESTONES = [
  { year: "2015", role: "Design Intern", company: "Chicago Tribune — Chicago, IL" },
  { year: "2017", role: "Junior Art Director", company: "Wieden+Kennedy — Chicago, IL" },
  { year: "2019", role: "Art Director", company: "AKQA — New York, NY" },
  { year: "2021", role: "Senior Creative Director", company: "Independent — Remote" },
  { year: "2023", role: "Founder & Creative Director", company: "H.Studio — Chicago, IL" },
];

function AboutJourney() {
  return (
    <section data-header-theme="dark" className="w-full bg-black py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-12">

        <div className="flex flex-row justify-between items-center">
          <span className="font-mono text-sm font-normal uppercase text-white">[ The Journey ]</span>
          <span className="text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-white">
            [{MILESTONES.length}]
          </span>
        </div>

        <div className="flex flex-col">
          {MILESTONES.map((m, i) => (
            <div
              key={m.year}
              className="group flex flex-col gap-[0.5625rem] cursor-default px-4 py-6 -mx-4 transition-colors duration-500 hover:bg-white"
            >
              <div className="flex flex-col gap-[0.5625rem]">
                <span className="font-mono text-sm font-normal uppercase text-white transition-colors duration-500 group-hover:text-black">
                  [ {String(i + 1).padStart(2, "0")} ]
                </span>
                <div className="w-full h-px bg-white/20 transition-colors duration-500 group-hover:bg-black" />
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-end">
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-[2.25rem] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-white transition-all duration-500 ease-out group-hover:text-black group-hover:translate-x-4">
                    {m.year}
                  </span>
                  <span className="text-[2.25rem] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-white transition-all duration-500 ease-out group-hover:text-black group-hover:translate-x-4">
                    {m.role}
                  </span>
                </div>
                <span className="text-sm font-normal text-white/50 tracking-[-0.04em] transition-colors duration-500 group-hover:text-black/60">
                  {m.company}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Philosophy ───────────────────────────────────────────────────────────────

const VALUES = [
  {
    num: "01",
    title: "Vision First",
    body: "Every great project starts with a clear vision. I spend more time asking questions than opening design tools — understanding the why before touching the how.",
  },
  {
    num: "02",
    title: "Craft Over Speed",
    body: "Quality is not negotiable. Every pixel, every frame, every word should be intentional. Rushed work is forgettable work.",
  },
  {
    num: "03",
    title: "Story in Every Frame",
    body: "Whether it's a brand identity or a photograph, story is always the foundation. Design without narrative is decoration.",
  },
];

function AboutPhilosophy() {
  return (
    <section className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-start">

        <div className="flex flex-col gap-5 md:gap-0">
          <span className="text-sm font-normal uppercase text-[#1f1f1f]">[ Philosophy ]</span>
        </div>

        <div className="flex flex-col gap-0 md:w-[54rem]">
          {VALUES.map((v) => (
            <div key={v.num} className="flex flex-col gap-4 py-8 border-b border-black/10 last:border-0">
              <div className="flex items-start justify-between gap-8">
                <div className="flex flex-col gap-3 flex-1">
                  <span className="font-mono text-xs font-normal uppercase text-[#999]">[ {v.num} ]</span>
                  <h3 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-black">
                    {v.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-stretch gap-3">
                <div className="flex flex-col justify-between w-6 shrink-0 py-px">
                  <CornerTL /><CornerBL />
                </div>
                <p className="flex-1 text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5] py-3">
                  {v.body}
                </p>
                <div className="flex flex-col justify-between w-6 shrink-0 py-px">
                  <CornerTR /><CornerBR />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Full-bleed image ─────────────────────────────────────────────────────────

function AboutImage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { filter: "blur(20px)" },
        {
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white py-12 md:py-20">
      <div
        ref={sectionRef}
        data-header-theme="dark"
        className="relative w-full h-[35.3125rem] md:h-[56.25rem] overflow-hidden"
      >
        <Image
          ref={imgRef}
          src="/services-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const words = sectionRef.current?.querySelectorAll("[data-word]");
    if (!words?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "center 50%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="w-full h-px bg-black/10" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className={BIG}><W>Ready</W> <W>to</W> <W>create</W></p>
            <p className={`${BIG} md:pl-[10rem]`}><W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>something</W></p>
            <p className={`${BIG} md:pl-[4rem]`}>
              <W>great</W>{" "}
              <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>&</W>{" "}
              <W>together?</W>
            </p>
          </div>
          <div className="shrink-0">
            <LetsTalkButton variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <div className="relative z-10">
        <Header />
        <main>
          <AboutHeroAndBio />
          <AboutJourney />
          <AboutPhilosophy />
          <AboutImage />
          <AboutCTA />
        </main>
      </div>
      <FooterSection />
    </>
  );
}
