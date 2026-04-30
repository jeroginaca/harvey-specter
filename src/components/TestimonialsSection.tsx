"use client";

// Testimonials section
// Desktop: fixed 987px height, heading centered, 4 cards absolutely positioned with rotation
// Mobile:  vertical section, heading + horizontal overflow scroll strip

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import type { Testimonial } from "@/sanity/queries";
import { TestimonialsSlider } from "./TestimonialsSlider";

const LAYOUT_POSITIONS = [
  { left: "42.1875rem", top: "16.9375rem", width: "22.5625rem", rotate: 2.9,   zIndex: 0,  drift: -60 },
  { left: "6.375rem",   top: "8.875rem",   width: "23.75rem",   rotate: -6.84, zIndex: 20, drift: -90 },
  { left: "19.0625rem", top: "34.5rem",    width: "22.6875rem", rotate: 2.24,  zIndex: 30, drift: -40 },
  { left: "61.6875rem", top: "34.0625rem", width: "22.875rem",  rotate: -4.15, zIndex: 40, drift: -75 },
] as const;

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const draggableRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        parallaxRefs.current.forEach((wrap, i) => {
          if (!wrap) return;
          const drift = LAYOUT_POSITIONS[i % LAYOUT_POSITIONS.length].drift;
          gsap.fromTo(
            wrap,
            { y: 0 },
            {
              y: drift,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        });

        draggableRefs.current.forEach((card, i) => {
          if (!card) return;
          const baseZ = LAYOUT_POSITIONS[i % LAYOUT_POSITIONS.length].zIndex;
          Draggable.create(card, {
            type: "x,y",
            cursor: "grab",
            activeCursor: "grabbing",
            onDragStart() {
              gsap.set(parallaxRefs.current[i], { zIndex: 1000 });
            },
            onDragEnd() {
              gsap.set(parallaxRefs.current[i], { zIndex: baseZ });
            },
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-white">

      <div
        ref={sectionRef}
        className="hidden md:flex md:items-center md:justify-center relative h-[61.6875rem] px-8 max-w-[90rem] mx-auto"
      >
        <h2 className="w-full text-center text-[clamp(4rem,13.75vw,12.375rem)] font-medium leading-none tracking-[-0.07em] text-black select-none pointer-events-none z-10">
          Testimonials
        </h2>

        {testimonials.map((t, i) => {
          const pos = LAYOUT_POSITIONS[i % LAYOUT_POSITIONS.length];
          return (
            <div
              key={t._id}
              ref={(el) => { parallaxRefs.current[i] = el; }}
              className="absolute"
              style={{ left: pos.left, top: pos.top, width: pos.width, zIndex: pos.zIndex }}
            >
              <div
                ref={(el) => { draggableRefs.current[i] = el; }}
                className="bg-[#f1f1f1] border border-[#dddddd] rounded p-7 flex flex-col gap-2 select-none"
                style={{ transform: `rotate(${pos.rotate}deg)` }}
              >
                {t.logoUrl && (
                  <Image
                    src={t.logoUrl}
                    alt=""
                    width={t.logoW ?? 120}
                    height={t.logoH ?? 30}
                    className="shrink-0 object-contain pointer-events-none"
                    style={{
                      width: `${(t.logoW ?? 120) / 16}rem`,
                      height: `${(t.logoH ?? 30) / 16}rem`,
                      transform: `rotate(${-pos.rotate}deg)`,
                    }}
                  />
                )}
                <p className="text-[1.125rem] font-normal text-[#1f1f1f] tracking-[-0.04em] leading-snug flex-1 pointer-events-none">
                  {t.text}
                </p>
                <span className="text-base font-black uppercase tracking-[-0.04em] text-black pointer-events-none">
                  {t.name}
                </span>
              </div>
            </div>
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
