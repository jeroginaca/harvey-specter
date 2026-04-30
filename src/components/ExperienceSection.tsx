"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BIG = [
  "text-[clamp(2rem,6.67vw,6rem)]",
  "font-light uppercase tracking-[-0.08em] leading-none text-black",
  "text-center md:text-left",
].join(" ");

// Each word/token that participates in the scroll-fill animation
function W({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span data-word className={`inline-block ${className ?? ""}`}>
      {children}
    </span>
  );
}

export function ExperienceSection() {
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
          stagger: 0.12,
          ease: "none",
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 px-4 md:py-[7.5rem] md:px-8">
      <div className="flex flex-col gap-6 w-full">

        {/* "[ 8+ years in industry ]" + divider */}
        <div className="flex flex-col gap-3 items-end w-full">
          <span className="text-sm font-normal uppercase text-[#1f1f1f]">
            [ 8+ years in industry ]
          </span>
          <div className="w-full h-px bg-black" />
        </div>

        {/* Staggered typography rows */}
        <div className="flex flex-col gap-2 w-full">

          {/* Row 1 — "A CREATIVE DIRECTOR /" + "001" */}
          <div className="flex flex-col-reverse items-center gap-3 md:flex-row md:items-start">
            <p className={BIG}>
              <W>A</W>{" "}
              <W>creative</W>{" "}
              <W>director</W>{"   "}
              <W>/</W>
            </p>
            <W className="text-sm font-normal uppercase text-[#1f1f1f] shrink-0 md:pt-1">
              001
            </W>
          </div>

          {/* Row 2 — "PHOTOGRAPHER" */}
          <div className="md:pl-[13.375rem]">
            <p className={BIG}>
              <W>Photographer</W>
            </p>
          </div>

          {/* Row 3 — "BORN & RAISED" */}
          <div className="md:pl-[38.125rem]">
            <p className={BIG}>
              <W>Born</W>{" "}
              <W>
                <span
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  &amp;
                </span>
              </W>
              {" "}
              <W>raised</W>
            </p>
          </div>

          {/* Row 4 — "ON THE SOUTH SIDE" */}
          <p className={BIG}>
            <W>on</W>{" "}
            <W>the</W>{" "}
            <W>south</W>{" "}
            <W>side</W>
          </p>

          {/* Row 5 — "OF CHICAGO." + "[ creative freelancer ]" */}
          <div className="flex flex-col items-center gap-3 md:items-start md:gap-0 md:pl-[37.875rem]">
            <p className={BIG}>
              <W>of</W>{" "}
              <W>chicago.</W>
            </p>
            <W className="text-sm font-normal uppercase text-[#1f1f1f] text-center md:text-left">
              [ creative freelancer ]
            </W>
          </div>

        </div>
      </div>
    </section>
  );
}
