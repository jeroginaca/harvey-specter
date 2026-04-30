"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { NewsPost } from "@/sanity/queries";

function ArrowIcon() {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true">
      <path d="M3.77653 1.88826L-5.83637e-08 5.66479L1.33521 7L5.11173 3.2235L5.11173 6.13686L7 6.13686L7 1.70857e-07L0.863115 4.39109e-07L0.863115 1.88826L3.77653 1.88826Z" fill="black" />
    </svg>
  );
}

export function NewsSlider({ posts }: { posts: NewsPost[] }) {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = posts.length;

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
    <div className="flex flex-col gap-6">
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
          {posts.map((post) => (
            <div key={post._id} className="w-full shrink-0 px-4 flex flex-col gap-4">
              <div className="relative w-full" style={{ aspectRatio: "300/398" }}>
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <p className="text-[0.875rem] font-normal tracking-[-0.04em] text-[#1f1f1f] leading-snug">
                {post.excerpt}
              </p>
              <a
                href={post.link || "#"}
                className="flex items-center gap-2.5"
                style={{ width: "6rem", height: "1.625rem" }}
              >
                <span className="text-[0.875rem] font-medium tracking-[-0.04em] text-black">Read more</span>
                <ArrowIcon />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to news post ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-black" : "w-1.5 bg-black/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
