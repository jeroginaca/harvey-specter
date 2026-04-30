"use client";

import { useRef } from "react";
import gsap from "gsap";

type Variant = "dark" | "light" | "outlined";

const VARIANTS: Record<Variant, { cls: string; defaultText: string; fillBg: string; fillText: string }> = {
  dark:     { cls: "bg-black text-white",                      defaultText: "#ffffff", fillBg: "#ffffff", fillText: "#000000" },
  light:    { cls: "bg-white text-black",                      defaultText: "#000000", fillBg: "#000000", fillText: "#ffffff" },
  outlined: { cls: "bg-black text-white border border-white",  defaultText: "#ffffff", fillBg: "#ffffff", fillText: "#000000" },
};

export function LetsTalkButton({
  variant = "dark",
  onClick,
  className,
}: {
  variant?: Variant;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const v = VARIANTS[variant];

  const onMouseMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.28,
      y: (e.clientY - rect.top - rect.height / 2) * 0.28,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onEnter = () => {
    gsap.fromTo(
      fillRef.current,
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1, transformOrigin: "bottom center", duration: 0.45, ease: "power3.out" }
    );
    gsap.to(textRef.current, { color: v.fillText, duration: 0.3, delay: 0.1 });
  };

  const onLeave = () => {
    gsap.to(fillRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 0.4,
      ease: "power3.in",
    });
    gsap.to(textRef.current, { color: v.defaultText, duration: 0.25 });
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
  };

  const handleClick = () => {
    gsap.timeline()
      .to(ref.current, { scale: 0.9, duration: 0.1, ease: "power3.in" })
      .to(ref.current, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    onClick?.();
  };

  return (
    <button
      ref={ref}
      className={`relative w-fit overflow-hidden flex items-center px-4 py-3 text-sm font-medium tracking-[-0.035rem] rounded-full ${v.cls} ${className ?? ""}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      <span
        ref={fillRef}
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{ backgroundColor: v.fillBg, transform: "scaleY(0)", transformOrigin: "bottom center" }}
      />
      <span ref={textRef} className="relative" style={{ color: v.defaultText }}>
        Let&apos;s talk
      </span>
    </button>
  );
}
