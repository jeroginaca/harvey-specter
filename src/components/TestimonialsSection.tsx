// Testimonials section
// Desktop: fixed 987px height, heading centered, 4 cards absolutely positioned with rotation
// Mobile:  vertical section, heading + horizontal overflow scroll strip

import Image from "next/image";
import type { Testimonial } from "@/sanity/queries";
import { TestimonialsSlider } from "./TestimonialsSlider";

// Layout positions are design data — not edited via CMS
const LAYOUT_POSITIONS = [
  { left: "42.1875rem", top: "16.9375rem", width: "22.5625rem", rotate: 2.9,   mobileRotate: 3.5,  zIndex: 0  },
  { left: "6.375rem",   top: "8.875rem",   width: "23.75rem",   rotate: -6.84, mobileRotate: -2,   zIndex: 20 },
  { left: "19.0625rem", top: "34.5rem",    width: "22.6875rem", rotate: 2.24,  mobileRotate: 3,    zIndex: 30 },
  { left: "61.6875rem", top: "34.0625rem", width: "22.875rem",  rotate: -4.15, mobileRotate: -2.2, zIndex: 40 },
] as const;

function TestimonialCard({
  t,
  pos,
  className,
  style,
  logoCounterRotate,
}: {
  t: Testimonial;
  pos: (typeof LAYOUT_POSITIONS)[number];
  className?: string;
  style?: React.CSSProperties;
  logoCounterRotate?: number;
}) {
  return (
    <div
      className={`bg-[#f1f1f1] border border-[#dddddd] rounded p-7 flex flex-col gap-2 ${className ?? ""}`}
      style={style}
    >
      {t.logoUrl && (
        <Image
          src={t.logoUrl}
          alt=""
          width={t.logoW ?? 120}
          height={t.logoH ?? 30}
          className="shrink-0 object-contain"
          style={{
            width: `${(t.logoW ?? 120) / 16}rem`,
            height: `${(t.logoH ?? 30) / 16}rem`,
            transform: logoCounterRotate ? `rotate(${logoCounterRotate}deg)` : undefined,
          }}
        />
      )}
      <p className="text-[1.125rem] font-normal text-[#1f1f1f] tracking-[-0.04em] leading-snug flex-1">
        {t.text}
      </p>
      <span className="text-base font-black uppercase tracking-[-0.04em] text-black">
        {t.name}
      </span>
    </div>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="w-full bg-white">

      <div className="hidden md:flex md:items-center md:justify-center relative h-[61.6875rem] px-8 overflow-hidden max-w-[90rem] mx-auto">
        <h2 className="w-full text-center text-[clamp(4rem,13.75vw,12.375rem)] font-medium leading-none tracking-[-0.07em] text-black select-none pointer-events-none z-10">
          Testimonials
        </h2>

        {testimonials.map((t, i) => {
          const pos = LAYOUT_POSITIONS[i % LAYOUT_POSITIONS.length];
          return (
            <TestimonialCard
              key={t._id}
              t={t}
              pos={pos}
              className="absolute"
              style={{
                left: pos.left,
                top: pos.top,
                width: pos.width,
                transform: `rotate(${pos.rotate}deg)`,
                zIndex: pos.zIndex,
              }}
              logoCounterRotate={-pos.rotate}
            />
          );
        })}
      </div>

      <div className="md:hidden py-16 flex flex-col gap-6">
        <h2 className="px-4 text-[2rem] font-medium leading-[0.8] tracking-[-0.07em] text-black">
          Testimonials
        </h2>
        <TestimonialsSlider testimonials={testimonials} />
      </div>

    </section>
  );
}
