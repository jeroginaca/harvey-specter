import React from "react";
import Image from "next/image";

function ArrowIcon() {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.77653 1.88826L-5.83637e-08 5.66479L1.33521 7L5.11173 3.2235L5.11173 6.13686L7 6.13686L7 1.70857e-07L0.863115 4.39109e-07L0.863115 1.88826L3.77653 1.88826Z" fill="black"/>
    </svg>
  );
}

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.";


export function NewsSection() {
  return (
    <section className="w-full bg-[#f3f3f3]">

      {/* ─── DESKTOP ──────────────────────────────────────────────────────── */}
      {/* Full-width: heading fixed left, cards scroll right */}
      <div className="hidden md:flex md:items-stretch">

        {/* Fixed left column: section padding + heading + gap before cards */}
        <div className="shrink-0 pl-8 pr-[15.375rem] py-[7.5rem] flex items-stretch">
          <div className="relative w-[6.875rem] self-stretch">
            <h2
              className="absolute top-1/2 left-1/2 text-[4rem] font-light uppercase text-black"
              style={{
                transform: "translate(-50%, -50%) rotate(-90deg)",
                whiteSpace: "nowrap",
                letterSpacing: "-0.08em",
                lineHeight: "0.86",
              }}
            >
              Keep up with my latest<br />news &amp; achievements
            </h2>
          </div>
        </div>

        {/* Scrollable cards — bleeds to the right viewport edge, ~2.5 visible */}
        <div className="flex-1 min-w-0 overflow-x-auto py-[7.5rem]">
          <div className="inline-flex items-start">
            {[
              { img: "/news/news-1.jpg", topPad: false },
              { img: "/news/news-2.jpg", topPad: true },
              { img: "/news/news-3.jpg", topPad: false },
              { img: "/news/news-2.jpg", topPad: true },
            ].map(({ img, topPad }, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className="w-px self-stretch bg-[#cccccc] mx-[1.96875rem] shrink-0" />
                )}
                <div
                  className={`shrink-0 flex flex-col gap-4${topPad ? " pt-[7.5rem]" : ""}`}
                  style={{ width: "24rem" }}
                >
                  <div className="relative w-full" style={{ aspectRatio: "353/469" }}>
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                  <p className="text-[0.875rem] font-normal tracking-[-0.04em] text-[#1f1f1f] leading-snug">
                    {LOREM}
                  </p>
                  <a href="#" className="flex items-center gap-2.5 text-[0.875rem] font-medium text-black">
                    Read more <ArrowIcon />
                  </a>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

      {/* ─── MOBILE ───────────────────────────────────────────────────────── */}
      <div className="md:hidden py-16 flex flex-col gap-8">

        {/* Heading wraps naturally — no explicit breaks */}
        <h2
          className="px-4 text-[2rem] font-light uppercase text-black"
          style={{ letterSpacing: "-0.08em", lineHeight: "0.86" }}
        >
          Keep up with my latest news &amp; achievements
        </h2>

        {/* Scroll strip — 300px cards, 16px gap, bleeds to the right edge */}
        <div className="overflow-x-auto pl-4">
          <div className="inline-flex" style={{ gap: "1rem" }}>
            {["/news/news-1.jpg", "/news/news-2.jpg", "/news/news-3.jpg"].map((img, i) => (
              <div key={i} className="shrink-0 flex flex-col gap-4" style={{ width: "18.75rem" }}>
                <div className="relative w-full" style={{ aspectRatio: "300/398" }}>
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
                <p className="text-[0.875rem] font-normal tracking-[-0.04em] text-[#1f1f1f] leading-snug">
                  {LOREM}
                </p>
                <a
                  href="#"
                  className="flex items-center justify-between border border-black"
                  style={{ width: "6rem", height: "1.625rem" }}
                >
                  <span className="text-[0.875rem] font-medium tracking-[-0.04em] text-black">Read more</span>
                  <ArrowIcon />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
