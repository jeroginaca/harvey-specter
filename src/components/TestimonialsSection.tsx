// Testimonials section
// Desktop: fixed 987px height, heading centered, 4 cards absolutely positioned with rotation
// Mobile:  vertical section, heading + horizontal overflow scroll strip

import Image from "next/image";

const TESTIMONIALS = [
  {
    id: 1,
    text: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    logo: "/testimonial-logos/logo-lukas.svg",
    logoW: 139,
    logoH: 27,
    left: "42.1875rem",
    top: "16.9375rem",
    width: "22.5625rem",
    rotate: 2.9,
    mobileRotate: 3.5,
    zIndex: 0,
  },
  {
    id: 2,
    text: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    logo: "/testimonial-logos/logo-marko.svg",
    logoW: 144,
    logoH: 36,
    left: "6.375rem",
    top: "8.875rem",
    width: "23.75rem",
    rotate: -6.84,
    mobileRotate: -2,
    zIndex: 20,
  },
  {
    id: 3,
    text: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    logo: "/testimonial-logos/logo-sarah.svg",
    logoW: 110,
    logoH: 35,
    left: "19.0625rem",
    top: "34.5rem",
    width: "22.6875rem",
    rotate: 2.24,
    mobileRotate: 3,
    zIndex: 30,
  },
  {
    id: 4,
    text: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    logo: "/testimonial-logos/logo-sofia.svg",
    logoW: 84,
    logoH: 42,
    left: "61.6875rem",
    top: "34.0625rem",
    width: "22.875rem",
    rotate: -4.15,
    mobileRotate: -2.2,
    zIndex: 40,
  },
] as const;

function TestimonialCard({
  t,
  className,
  style,
  logoCounterRotate,
}: {
  t: (typeof TESTIMONIALS)[number];
  className?: string;
  style?: React.CSSProperties;
  logoCounterRotate?: number;
}) {
  return (
    <div
      className={`bg-[#f1f1f1] border border-[#dddddd] rounded p-7 flex flex-col gap-2 ${className ?? ""}`}
      style={style}
    >
      {/* Brand logo — counter-rotated on desktop so it appears upright inside the tilted card */}
      <Image
        src={t.logo}
        alt=""
        width={t.logoW}
        height={t.logoH}
        className="shrink-0 object-contain"
        style={{
          width: `${t.logoW / 16}rem`,
          height: `${t.logoH / 16}rem`,
          transform: logoCounterRotate ? `rotate(${logoCounterRotate}deg)` : undefined,
        }}
      />

      {/* Testimonial body */}
      <p className="text-[1.125rem] font-normal text-[#1f1f1f] tracking-[-0.04em] leading-snug flex-1">
        {t.text}
      </p>

      {/* Author name */}
      <span className="text-base font-black uppercase tracking-[-0.04em] text-black">
        {t.name}
      </span>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="w-full bg-white">

      {/* ─── DESKTOP ─────────────────────────────────────────────────────────
          Heading is a flex child — items-center keeps it vertically centered.
          Cards are absolute (out of flow). Logo gets inverse rotation so it
          appears upright inside the tilted card. */}
      <div className="hidden md:flex md:items-center md:justify-center relative h-[61.6875rem] px-8 overflow-hidden max-w-[90rem] mx-auto">

        {/* Heading — z-10 so Lukas (z-0) sits behind it, Marko/Sarah/Sofia (z-20+) sit in front */}
        <h2 className="w-full text-center text-[clamp(4rem,13.75vw,12.375rem)] font-medium leading-none tracking-[-0.07em] text-black select-none pointer-events-none z-10">
          Testimonials
        </h2>

        {/* Absolutely positioned cards — logo counter-rotated to stay upright */}
        {TESTIMONIALS.map((t) => (
          <TestimonialCard
            key={t.id}
            t={t}
            className="absolute"
            style={{
              left: t.left,
              top: t.top,
              width: t.width,
              transform: `rotate(${t.rotate}deg)`,
              zIndex: t.zIndex,
            }}
            logoCounterRotate={-t.rotate}
          />
        ))}
      </div>

      {/* ─── MOBILE ──────────────────────────────────────────────────────────
          64px top/bottom padding, 16px sides. Heading at 2rem / leading-0.8.
          Cards in a horizontal-scroll strip that bleeds to viewport edges. */}
      <div className="md:hidden py-16 px-4 flex flex-col gap-8">

        <h2 className="text-[2rem] font-medium leading-[0.8] tracking-[-0.07em] text-black">
          Testimonials
        </h2>

        {/* Scroll strip — outer div bleeds to viewport edges, inner inline-flex hugs content */}
        <div className="overflow-x-auto -mx-4 px-4" style={{ overflowY: "hidden" }}>
          <div className="inline-flex py-8" style={{ gap: "30px" }}>
            {TESTIMONIALS.map((t) => (
              <TestimonialCard
                key={t.id}
                t={t}
                className="shrink-0"
                style={{ width: "260px", transform: `rotate(${t.mobileRotate}deg)` }}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
