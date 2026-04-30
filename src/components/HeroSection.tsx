import Image from "next/image";
import { LetsTalkButton } from "./LetsTalkButton";

export function HeroSection() {
  return (
    <section
      className={[
        "relative isolate w-full flex flex-col",
        // Height: min full screen on mobile, fixed Figma height on desktop
        "min-h-[100svh] md:h-[52.9375rem]",
        // Padding: 16px mobile (Figma), 32px desktop (Figma)
        "px-4 md:px-8",
        // Bottom padding: 24px mobile (Figma), none desktop
        "pb-6 md:pb-0",
        // Spacing: SPACE_BETWEEN on mobile pushes header top / intro bottom;
        // desktop uses fixed 240px gap between header and intro
        "justify-between md:justify-start md:gap-[15rem]",
      ].join(" ")}
    >
      {/* Background photo — overflow-hidden lives here (not on section) so the
          absolute overlay in Header can extend full-screen within the same stacking context */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Progressive background blur overlay
          Figma: BACKGROUND_BLUR radius=20, PROGRESSIVE top→bottom, bottom 349px */}
      <div
        className="absolute bottom-0 inset-x-0 h-[21.8125rem] pointer-events-none bg-white/[0.01] backdrop-blur-[1.25rem]"
        style={{
          maskImage: "linear-gradient(to top, black 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent)",
        }}
      />

      {/* Spacer matching fixed header height so the intro stays in the same vertical position */}
      <div className="h-[4.5rem] shrink-0" aria-hidden="true" />

      {/* Introduction
          Mobile: SPACE_BETWEEN (name at top, description at bottom of this container)
          Desktop: centered */}
      <div className="flex flex-col gap-10 md:gap-0 md:justify-center items-center z-10">
        {/* Name block */}
        <div className="w-full flex flex-col">
          {/* Greeting — centered on mobile, left on desktop */}
          <div className="flex items-center justify-center md:justify-start">
            <span className="font-mono text-sm font-normal text-white mix-blend-overlay">
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
            Harvey{"   "}Specter
          </h1>
        </div>

        {/* Description + CTA
            Mobile: flows naturally below name block with gap
            Desktop: absolutely anchored bottom-right */}
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
