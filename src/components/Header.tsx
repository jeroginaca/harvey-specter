"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { LetsTalkButton } from "./LetsTalkButton";

const NAV_ITEMS = ["About", "Services", "Projects", "News", "Contact"];

function NavLink({ item }: { item: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.killTweensOf(underlineRef.current);
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.to(ref.current, { y: -2, duration: 0.2, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.killTweensOf(underlineRef.current);
    gsap.to(underlineRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(ref.current, { y: 0, duration: 0.2, ease: "power2.in" });
  };

  return (
    <a
      ref={ref}
      href={`#${item.toLowerCase()}`}
      className="relative text-base font-semibold tracking-[-0.04em] text-black mix-blend-difference"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {item}
      <span
        ref={underlineRef}
        className="absolute left-0 -bottom-0.5 w-full h-px bg-black origin-left scale-x-0"
      />
    </a>
  );
}


export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Set initial opacity state for nav items and CTA
  useLayoutEffect(() => {
    gsap.set(navItemsRef.current.filter(Boolean), { opacity: 0, y: 40 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
  }, []);

  // GSAP handles item stagger; CSS transition handles the overlay slide
  useEffect(() => {
    const items = navItemsRef.current.filter(Boolean);
    const cta = ctaRef.current;

    if (open) {
      gsap.to(items, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.07, delay: 0.25 });
      gsap.to(cta, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.55 });
    } else {
      gsap.to(items, { opacity: 0, y: 20, duration: 0.2, stagger: 0.04 });
      gsap.to(cta, { opacity: 0, y: 10, duration: 0.15 });
    }
  }, [open]);

  return (
    <>
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
            <NavLink key={item} item={item} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="relative hidden md:flex">
          <LetsTalkButton variant="dark" />
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative md:hidden flex items-center justify-center w-6 h-6"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block w-[1.125rem] h-3">
            <span className={`absolute left-0 w-full h-px rounded-full transition-all duration-300 ease-in-out ${open ? "top-[0.34375rem] rotate-45 bg-white" : "top-0 bg-black"}`} />
            <span className={`absolute left-0 top-[0.34375rem] w-full h-px rounded-full transition-all duration-300 ease-in-out ${open ? "opacity-0 bg-white" : "opacity-100 bg-black"}`} />
            <span className={`absolute left-0 w-full h-px rounded-full transition-all duration-300 ease-in-out ${open ? "top-[0.34375rem] -rotate-45 bg-white" : "top-[0.6875rem] bg-black"}`} />
          </span>
        </button>
      </header>

      {/* Mobile overlay — GSAP controlled */}
      <div
        ref={overlayRef}
        className={`md:hidden fixed top-0 left-0 w-full h-[100svh] z-40 bg-black flex flex-col px-4 pt-[4.5rem] pb-28 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
          }`}
      >
        <nav className="flex flex-col flex-1 justify-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              ref={(el) => { navItemsRef.current[i] = el; }}
              href={`#${item.toLowerCase()}`}
              className="text-white text-[2.5rem] font-semibold tracking-[-0.04em] leading-none py-5 border-b border-white/10"
              style={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <LetsTalkButton variant="light" onClick={() => setOpen(false)} />
        </div>
      </div>

      {/* Clickable backdrop to close */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
