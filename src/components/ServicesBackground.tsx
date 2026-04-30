"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ServicesBackground() {
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
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
    <div
      ref={sectionRef}
      data-header-theme="dark"
      className="relative w-full h-[35.3125rem] md:h-[56.25rem] overflow-hidden"
    >
      <Image
        ref={imageRef}
        src="/services-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
