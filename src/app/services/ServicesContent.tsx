"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";
import { LetsTalkButton } from "@/components/LetsTalkButton";
import type { Service } from "@/sanity/queries";

// ─── Shared ───────────────────────────────────────────────────────────────────

function W({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return <span data-word className={`inline-block ${className ?? ""}`} style={style}>{children}</span>;
}

const BIG = "text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-black";
const BIG_WHITE = "text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-white";

function CornerTL({ white }: { white?: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M 14 0 L 0 0 L 0 14" stroke={white ? "white" : "black"} strokeWidth="1" strokeLinecap="square" /></svg>;
}
function CornerBL({ white }: { white?: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M 0 2 L 0 16 L 14 16" stroke={white ? "white" : "black"} strokeWidth="1" strokeLinecap="square" /></svg>;
}
function CornerTR({ white }: { white?: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M 2 0 L 16 0 L 16 14" stroke={white ? "white" : "black"} strokeWidth="1" strokeLinecap="square" /></svg>;
}
function CornerBR({ white }: { white?: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M 16 2 L 16 16 L 2 16" stroke={white ? "white" : "black"} strokeWidth="1" strokeLinecap="square" /></svg>;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ServicesHero({ count }: { count: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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

      gsap.fromTo(imgRef.current, { scale: 1.08 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black min-h-[100svh] flex flex-col overflow-hidden" data-header-theme="dark">
      <div className="absolute inset-0 z-0">
        <Image
          ref={imgRef}
          src="/services-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative z-10 flex flex-col justify-end flex-1 px-4 md:px-8 pt-32 pb-12 md:pb-20">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm font-normal uppercase text-white/60 mb-3">[ Services ]</span>
          <p className={BIG_WHITE}><W>What</W> <W>we</W></p>
          <p className={`${BIG_WHITE} md:pl-[13rem]`}><W>do</W> <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>&amp;</W></p>
          <p className={`${BIG_WHITE} md:pl-[6rem]`}>
            <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>how</W>{" "}
            <W>we</W>{" "}
            <W>do it</W>
            <W>.</W>
          </p>
          <div className="mt-4">
            <W className="text-sm font-normal uppercase text-white">[ Brand Identity — Art Direction — Photography ]</W>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services List ────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(imgRef.current, { y: 20 }, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="group flex flex-col gap-[0.5625rem] cursor-default px-4 py-6 -mx-4 transition-colors duration-500 hover:bg-white">

      <div className="flex flex-col gap-[0.5625rem]">
        <span className="font-mono text-sm font-normal uppercase text-white transition-colors duration-500 group-hover:text-black">
          [ {String(index + 1).padStart(2, "0")} ]
        </span>
        <div className="w-full h-px bg-white/20 transition-colors duration-500 group-hover:bg-black" />
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start">

        {/* Name */}
        <h3 className="text-[2.25rem] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-white shrink-0 transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:text-black md:w-[18rem]">
          {service.name}
        </h3>

        {/* Description + image */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8 md:flex-1">
          <p className="text-sm font-normal text-white/70 tracking-[-0.04em] leading-[1.5] md:max-w-[28rem] transition-colors duration-500 group-hover:text-black/70">
            {service.description}
          </p>

          {service.imageUrl && (
            <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: "9.4375rem", height: "9.4375rem" }}>
              <div ref={imgRef} className="absolute inset-0">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  sizes="9.4375rem"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ServicesList({ services }: { services: Service[] }) {
  return (
    <section data-header-theme="dark" className="w-full bg-black py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-12">
        <div className="flex flex-row justify-between items-center">
          <span className="text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-white">
            [{services.length}]
          </span>
          <span className="text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-white">
            Deliverables
          </span>
        </div>

        <div className="flex flex-col">
          {services.map((svc, i) => (
            <ServiceCard key={svc._id} service={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

const STEPS = [
  { num: "01", title: "Discovery", body: "We start with a deep-dive into your brand, goals, and audience. This shapes everything that follows — no guessing, no assumptions." },
  { num: "02", title: "Strategy", body: "With clear insights in hand, we define the creative direction: visual language, messaging tone, and the story we want to tell." },
  { num: "03", title: "Design & Craft", body: "This is where ideas become tangible. Every element is considered — from typography and colour to photography and motion." },
  { num: "04", title: "Deliver & Refine", body: "We hand over final assets and stay close through any refinements. The work isn't done until you're genuinely proud of it." },
];

function ProcessSection() {
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
          end: "center 40%",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-12">

        <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-end">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ How It Works ]</span>
            <div className="flex flex-col gap-1 mt-4">
              <p className={BIG}><W>The</W> <W>process</W></p>
              <p className={`${BIG} md:pl-[10rem]`}>
                <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>behind</W>{" "}
                <W>the</W>
              </p>
              <p className={`${BIG} md:pl-[4rem]`}><W>work</W><W>.</W></p>
            </div>
          </div>
          <div className="hidden md:flex items-stretch gap-3 md:w-[26rem] shrink-0">
            <div className="flex flex-col justify-between w-6 shrink-0 py-px">
              <CornerTL /><CornerBL />
            </div>
            <p className="flex-1 text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5] py-3">
              Every project follows the same rigorous process — because great creative work is never accidental. It&apos;s the result of clear thinking, disciplined craft, and genuine collaboration.
            </p>
            <div className="flex flex-col justify-between w-6 shrink-0 py-px">
              <CornerTR /><CornerBR />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`flex flex-col gap-4 p-6 md:p-8 border-black/10
                ${i % 2 === 0 ? "border-r-0 md:border-r" : ""}
                ${i < 2 ? "border-b" : ""}
              `}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-normal uppercase text-[#999]">[ {step.num} ]</span>
              </div>
              <h3 className="text-[1.75rem] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-black">
                {step.title}
              </h3>
              <p className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5]">
                {step.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Full-bleed image ─────────────────────────────────────────────────────────

function ServicesImage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { filter: "blur(20px)" }, {
        filter: "blur(0px)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 2,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} data-header-theme="dark" className="relative w-full h-[35.3125rem] md:h-[56.25rem] overflow-hidden">
      <Image ref={imgRef} src="/services-bg.jpg" alt="" fill sizes="100vw" className="object-cover object-center" />
    </div>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function ServicesCTA() {
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
    <section ref={sectionRef} className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="w-full h-px bg-black/10" />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className={BIG}><W>Start</W> <W>your</W></p>
            <p className={`${BIG} md:pl-[10rem]`}>
              <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>next</W>{" "}
              <W>project</W>
            </p>
            <p className={`${BIG} md:pl-[3rem]`}><W>with</W> <W>us</W><W>.</W></p>
          </div>
          <div className="flex flex-col gap-4 shrink-0 md:pb-2">
            <div className="flex items-stretch gap-3 md:max-w-[22rem]">
              <div className="flex flex-col justify-between w-5 shrink-0 py-px">
                <CornerTL /><CornerBL />
              </div>
              <p className="flex-1 text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5] py-2">
                Whether you need a full brand identity or a single campaign, let&apos;s talk about what we can build together.
              </p>
              <div className="flex flex-col justify-between w-5 shrink-0 py-px">
                <CornerTR /><CornerBR />
              </div>
            </div>
            <LetsTalkButton variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <section className="w-full bg-white py-32 px-4 md:px-8 flex flex-col items-center gap-6 text-center">
      <span className="font-mono text-sm uppercase text-[#999]">[ No services yet ]</span>
      <p className="text-[clamp(1.5rem,4vw,3rem)] font-light uppercase tracking-[-0.08em] text-black/20">
        Check back soon.
      </p>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ServicesContent({ services }: { services: Service[] }) {
  return (
    <>
      <div className="relative z-10">
        <Header />
        <main>
          <ServicesHero count={services.length} />
          {services.length > 0 ? <ServicesList services={services} /> : <EmptyState />}
          <ProcessSection />
          <ServicesImage />
          <ServicesCTA />
        </main>
      </div>
      <FooterSection />
    </>
  );
}
