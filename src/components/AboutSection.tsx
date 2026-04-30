"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function CornerTL() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M 14 0 L 0 0 L 0 14" stroke="black" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
function CornerBL() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M 0 2 L 0 16 L 14 16" stroke="black" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
function CornerTR() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M 2 0 L 16 0 L 16 14" stroke="black" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
function CornerBR() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M 16 2 L 16 16 L 2 16" stroke="black" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}

const ABOUT_TEXT =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

export function AboutSection() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtainRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 100%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-start">

        {/* ── Left column ─────────────────────────────────────── */}
        <div className="flex flex-col gap-5 md:gap-0">
          <span className="md:hidden text-sm font-normal uppercase text-[#1f1f1f]">
            002
          </span>
          <span className="text-sm font-normal uppercase text-[#1f1f1f]">
            [ About ]
          </span>
        </div>

        {/* ── Right column ────────────────────────────────────── */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-8">

          {/* Bracketed text block */}
          <div className="flex items-stretch gap-3 md:w-[29.0625rem]">
            <div className="flex flex-col justify-between w-6 shrink-0 py-px">
              <CornerTL />
              <CornerBL />
            </div>
            <p className="flex-1 text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.3] py-3">
              {ABOUT_TEXT}
            </p>
            <div className="flex flex-col justify-between w-6 shrink-0 py-px">
              <CornerTR />
              <CornerBR />
            </div>
          </div>

          {/* Image column */}
          <div className="flex flex-row items-start gap-6">
            <span className="hidden md:block text-sm font-normal uppercase text-[#1f1f1f] shrink-0">
              002
            </span>

            {/* Image + curtain overlay */}
            <div
              ref={imageWrapRef}
              className="relative w-full md:w-[27.25rem] aspect-[436/614] overflow-hidden"
            >
              <Image
                src="/about-photo.jpg"
                alt="About Harvey Specter"
                fill
                sizes="(min-width: 768px) 27.25rem, 100vw"
                className="object-cover object-center"
              />

              {/* Black curtain — shrinks left-to-right on scroll */}
              <div
                ref={curtainRef}
                className="absolute inset-0 bg-black origin-left"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
