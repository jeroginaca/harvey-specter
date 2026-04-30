"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

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

function CtaButton({ dark, onClick, children }: { dark?: boolean; onClick?: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);

  const onEnter = () => {
    gsap.to(ref.current, {
      scale: 1.05,
      duration: 0.25,
      ease: "back.out(2)",
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.inOut",
    });
  };

  const onClick_ = () => {
    gsap.timeline()
      .to(ref.current, { scale: 0.93, duration: 0.1, ease: "power2.in" })
      .to(ref.current, { scale: 1.05, duration: 0.15, ease: "back.out(2)" })
      .to(ref.current, { scale: 1, duration: 0.15, ease: "power2.out" });
    onClick?.();
  };

  return (
    <button
      ref={ref}
      className={`w-fit flex items-center gap-2.5 px-4 py-3 text-sm font-medium tracking-[-0.035rem] rounded-full ${
        dark
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick_}
    >
      {children}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const items = navItemsRef.current;
    const cta = ctaRef.current;

    if (open) {
      // Slide in overlay
      gsap.fromTo(
        overlay,
        { yPercent: -100, opacity: 1 },
        { yPercent: 0, duration: 0.5, ease: "expo.out" }
      );
      // Stagger nav items up
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.15,
        }
      );
      // CTA fade in
      gsap.fromTo(
        cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.5 }
      );
    } else {
      // Slide out overlay
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.4,
        ease: "expo.in",
      });
      gsap.to(items, { opacity: 0, y: 20, duration: 0.2, stagger: 0.04 });
      gsap.to(cta, { opacity: 0, duration: 0.15 });
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
          <CtaButton dark>Let&apos;s talk</CtaButton>
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
        className={`md:hidden fixed inset-0 z-40 bg-black flex flex-col px-4 pt-[4.5rem] pb-10 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ transform: "translateY(-100%)" }}
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

        <button
          ref={ctaRef}
          className="w-fit flex items-center gap-2.5 bg-white text-black px-4 py-3 text-sm font-medium tracking-[-0.035rem] rounded-full"
          style={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          Let&apos;s talk
        </button>
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
