"use client";

import { useState } from "react";

const NAV_ITEMS = ["About", "Services", "Projects", "News", "Contact"];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header bar — z-40 keeps it above the z-30 overlay */}
      <header className="relative flex items-center justify-between py-6 z-40">
        <span
          className={`text-base font-semibold tracking-[-0.04em] transition-colors duration-300 ${
            open ? "text-white" : "text-black"
          }`}
        >
          H.Studio
        </span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-14">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-base font-semibold tracking-[-0.04em] text-black hover:opacity-60 transition-opacity duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button className="hidden md:flex items-center gap-2.5 bg-black px-4 py-3 text-sm font-medium tracking-[-0.035rem] text-white rounded-full hover:bg-neutral-800 transition-colors duration-200">
          Let&apos;s talk
        </button>

        {/* Mobile animated icon — hamburger morphs to × */}
        <button
          className="md:hidden flex items-center justify-center w-6 h-6"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block w-[1.125rem] h-3">
            {/* Top line → rotates to first arm of × */}
            <span
              className={`absolute left-0 w-full h-px rounded-full transition-all duration-300 ease-in-out ${
                open
                  ? "bg-white top-[0.34375rem] rotate-45"
                  : "bg-black top-0"
              }`}
            />
            {/* Middle line → fades out */}
            <span
              className={`absolute left-0 top-[0.34375rem] w-full h-px rounded-full transition-all duration-300 ease-in-out ${
                open ? "bg-white opacity-0" : "bg-black opacity-100"
              }`}
            />
            {/* Bottom line → rotates to second arm of × */}
            <span
              className={`absolute left-0 w-full h-px rounded-full transition-all duration-300 ease-in-out ${
                open
                  ? "bg-white top-[0.34375rem] -rotate-45"
                  : "bg-black top-[0.6875rem]"
              }`}
            />
          </span>
        </button>
      </header>

      {/* Full-screen mobile overlay — absolute so it lives in the section's stacking context,
          z-30 keeps it below the z-40 header (logo + icon stay visible above it) */}
      <div
        className={`md:hidden absolute inset-0 z-30 bg-black flex flex-col px-4 pt-[4.5rem] pb-10 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Nav items */}
        <nav className="flex flex-col flex-1 justify-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-[2.5rem] font-semibold tracking-[-0.04em] leading-none py-5 border-b border-white/10 hover:opacity-60 transition-opacity duration-200"
              style={{
                transitionDelay: open ? `${i * 40}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(0.5rem)",
                opacity: open ? 1 : 0,
                transition: `transform 0.35s ease ${i * 40}ms, opacity 0.35s ease ${i * 40}ms`,
              }}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA — white bg, black text (inverted on black bg) */}
        <button
          className="w-fit flex items-center gap-2.5 bg-white text-black px-4 py-3 text-sm font-medium tracking-[-0.035rem] rounded-full hover:bg-neutral-200 transition-colors duration-200"
          onClick={() => setOpen(false)}
        >
          Let&apos;s talk
        </button>
      </div>
    </>
  );
}
