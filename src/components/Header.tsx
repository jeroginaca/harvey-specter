"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = ["About", "Services", "Projects", "News", "Contact"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Gradient blur backdrop — separate fixed element so backdrop-filter isn't
          blocked by mix-blend-difference stacking contexts inside the header */}
      <div
        className="fixed top-0 inset-x-0 z-[49] pointer-events-none h-32 backdrop-blur-[20px] transition-opacity duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          maskImage: "linear-gradient(to bottom, black 30%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent)",
        }}
      />

      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-8 py-6">

        <span className="relative text-base font-semibold tracking-[-0.04em] text-black mix-blend-difference">
          H.Studio
        </span>

        {/* Desktop nav */}
        <nav className="relative hidden md:flex items-center gap-14">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-base font-semibold tracking-[-0.04em] text-black mix-blend-difference hover:opacity-60 transition-opacity duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button className="relative hidden md:flex items-center gap-2.5 bg-black px-4 py-3 text-sm font-medium tracking-[-0.035rem] text-white rounded-full hover:bg-neutral-800 transition-colors duration-200">
          Let&apos;s talk
        </button>

        {/* Mobile hamburger */}
        <button
          className="relative md:hidden flex items-center justify-center w-6 h-6 mix-blend-difference"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block w-[1.125rem] h-3">
            <span
              className={`absolute left-0 w-full h-px rounded-full bg-black transition-all duration-300 ease-in-out ${
                open ? "top-[0.34375rem] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[0.34375rem] w-full h-px rounded-full bg-black transition-all duration-300 ease-in-out ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-px rounded-full bg-black transition-all duration-300 ease-in-out ${
                open ? "top-[0.34375rem] -rotate-45" : "top-[0.6875rem]"
              }`}
            />
          </span>
        </button>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black flex flex-col px-4 pt-[4.5rem] pb-10 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col flex-1 justify-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-[2.5rem] font-semibold tracking-[-0.04em] leading-none py-5 border-b border-white/10 hover:opacity-60 transition-opacity duration-200"
              style={{
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

        <button
          className="w-fit flex items-center gap-2.5 bg-black text-black px-4 py-3 text-sm font-medium tracking-[-0.035rem] rounded-full hover:bg-neutral-200 transition-colors duration-200"
          onClick={() => setOpen(false)}
        >
          Let&apos;s talk
        </button>
      </div>
    </>
  );
}
