"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Testimonial } from "@/sanity/queries";

const MOBILE_ROTATIONS = [3.5, -2, 3, -2.2];

function SliderCard({ t, rotate }: { t: Testimonial; rotate: number }) {
  return (
    <div
      className="bg-[#f1f1f1] border border-[#dddddd] rounded p-7 flex flex-col gap-3"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {t.logoUrl && (
        <Image
          src={t.logoUrl}
          alt=""
          width={t.logoW ?? 120}
          height={t.logoH ?? 30}
          className="shrink-0 object-contain object-left"
          style={{
            width: `${(t.logoW ?? 120) / 16}rem`,
            height: `${(t.logoH ?? 30) / 16}rem`,
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

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = testimonials.length;

  const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3000);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [current, resetTimer]);

  const goTo = (i: number) => {
    setCurrent(Math.max(0, Math.min(total - 1, i)));
    resetTimer();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      const next = dx < 0 ? (current + 1) % total : (current - 1 + total) % total;
      goTo(next);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Track */}
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-350 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={t._id} className="w-full shrink-0 px-6 py-10">
              <SliderCard
                t={t}
                rotate={MOBILE_ROTATIONS[i % MOBILE_ROTATIONS.length]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-black" : "w-1.5 bg-black/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
