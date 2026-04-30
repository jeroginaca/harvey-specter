"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LetsTalkButton } from "./LetsTalkButton";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const harveyRef = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Harvey + greeting slide out left
      tl.to([greetingRef.current, harveyRef.current], {
        x: "-35vw",
        ease: "none",
      }, 0);

      // Specter slides out right
      tl.to(specterRef.current, {
        x: "35vw",
        ease: "none",
      }, 0);

      // Background grows
      tl.to(bgRef.current, {
        scale: 1.25,
        ease: "none",
      }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className={[
        "relative isolate w-full flex flex-col overflow-hidden",
        "min-h-[100svh] md:h-[52.9375rem]",
        "px-4 md:px-8",
        "pb-6 md:pb-0",
        "justify-between md:justify-start md:gap-[15rem]",
      ].join(" ")}
    >
      {/* Background photo */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Progressive background blur overlay */}
      <div
        className="absolute bottom-0 inset-x-0 h-[21.8125rem] pointer-events-none bg-white/[0.01] backdrop-blur-[1.25rem]"
        style={{
          maskImage: "linear-gradient(to top, black 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent)",
        }}
      />

      {/* Spacer matching fixed header height */}
      <div className="h-[4.5rem] shrink-0" aria-hidden="true" />

      <div className="flex flex-col gap-10 md:gap-0 md:justify-center items-center z-10">
        {/* Name block */}
        <div className="w-full flex flex-col">
          {/* Greeting — moves with Harvey */}
          <div className="flex items-center justify-center md:justify-start">
            <span
              ref={greetingRef}
              className="inline-block font-mono text-sm font-normal text-white mix-blend-overlay"
            >
              [ Hello i&apos;m ]
            </span>
          </div>

          <h1
            className={[
              "text-[4rem] min-[430px]:text-[clamp(6rem,14vw,16rem)] font-medium leading-none tracking-[-0.07em] text-white",
              "w-full",
              "whitespace-normal md:whitespace-nowrap",
              "md:-mt-[0.9375rem]",
              "text-center md:text-left mix-blend-overlay",
            ].join(" ")}
          >
            <span ref={harveyRef} className="inline-block">Harvey</span>
            {"   "}
            <span ref={specterRef} className="inline-block">Specter</span>
          </h1>
        </div>

        {/* Description + CTA */}
        <div className="w-[18.375rem] flex flex-col gap-[1.0625rem] md:absolute md:bottom-[9.5rem] md:right-8">
          <p className="text-sm font-bold uppercase italic tracking-[-0.035rem] text-[#1f1f1f] leading-[1.1]">
            H.Studio is a{" "}
            <span className="font-normal">full-service</span>
            {" "}creative studio creating beautiful digital experiences and
            products. We are an{" "}
            <span className="font-normal">award winning</span>
            {" "}desing and art group specializing in branding, web design and
            engineering.
          </p>
          <LetsTalkButton variant="dark" />
        </div>
      </div>
    </section>
  );
}
