"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ─── Shared ───────────────────────────────────────────────────────────────────

function CornerTL() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 0L0 0L0 14" stroke="black" strokeWidth="1" strokeLinecap="square"/></svg>; }
function CornerBL() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 2L0 16L14 16" stroke="black" strokeWidth="1" strokeLinecap="square"/></svg>; }
function CornerTR() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 0L16 0L16 14" stroke="black" strokeWidth="1" strokeLinecap="square"/></svg>; }
function CornerBR() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 2L16 16L2 16" stroke="black" strokeWidth="1" strokeLinecap="square"/></svg>; }

function Field({
  label, name, type = "text", value, onChange, required, textarea,
}: {
  label: string; name: string; type?: string;
  value: string; onChange: (v: string) => void;
  required?: boolean; textarea?: boolean;
}) {
  const base = "w-full bg-transparent border-b border-black/20 focus:border-black outline-none text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5] transition-colors duration-300 placeholder:text-black/20 py-3";
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-xs font-normal uppercase text-[#999]">
        {label}{required && <span className="text-black ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea name={name} value={value} onChange={(e) => onChange(e.target.value)}
          required={required} rows={4}
          className={`${base} resize-none`}
          placeholder={`Your ${label.toLowerCase()}...`} />
      ) : (
        <input type={type} name={name} value={value} onChange={(e) => onChange(e.target.value)}
          required={required}
          className={base}
          placeholder={`Your ${label.toLowerCase()}...`} />
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

type Status = "idle" | "sending" | "success" | "error";

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");

  // Mount on first open so SSR doesn't render it
  useEffect(() => { if (isOpen) setMounted(true); }, [isOpen]);

  // Animate in / out
  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(panelRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", delay: 0.05 });
    } else {
      gsap.to(panelRef.current, { opacity: 0, y: 20, duration: 0.25, ease: "power2.in" });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => {
        document.body.style.overflow = "";
      }});
    }
  }, [isOpen, mounted]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Replace with your real form handler (Resend, Formspree, /api/contact, etc.)
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
      setName(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error");
    }
  };

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        style={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-[38rem] bg-white rounded-sm p-8 md:p-12 flex flex-col gap-8 max-h-[90svh] overflow-y-auto"
        style={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs font-normal uppercase text-[#999]">[ Get in touch ]</span>
            <h2 className="text-[1.75rem] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-black">
              Let&apos;s Talk.
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-black/10 hover:bg-black hover:border-black transition-colors duration-200 group mt-1"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="group-hover:stroke-white transition-colors duration-200"/>
            </svg>
          </button>
        </div>

        <div className="w-full h-px bg-black/10" />

        {/* Form or success */}
        {status === "success" ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-stretch gap-3">
              <div className="flex flex-col justify-between w-6 shrink-0 py-px"><CornerTL /><CornerBL /></div>
              <div className="flex-1 flex flex-col gap-2 py-3">
                <p className="text-sm font-bold uppercase tracking-[-0.04em] text-black">Message sent!</p>
                <p className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.4]">
                  Thanks for reaching out. I&apos;ll get back to you within 24–48 hours.
                </p>
              </div>
              <div className="flex flex-col justify-between w-6 shrink-0 py-px"><CornerTR /><CornerBR /></div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStatus("idle")} className="text-sm font-medium text-black underline underline-offset-4">
                Send another
              </button>
              <button onClick={onClose} className="text-sm font-medium text-[#999] underline underline-offset-4">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Name"  name="name"  value={name}  onChange={setName}  required />
              <Field label="Email" name="email" type="email" value={email} onChange={setEmail} required />
            </div>
            <Field label="Message" name="message" value={message} onChange={setMessage} required textarea />

            {status === "error" && (
              <p className="text-sm text-red-600 tracking-[-0.04em]">
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="relative overflow-hidden flex items-center px-6 py-3 text-sm font-medium tracking-[-0.035rem] rounded-full bg-black text-white disabled:opacity-50 group"
              >
                <span className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom rounded-full" />
                <span className="relative group-hover:text-black transition-colors duration-300">
                  {status === "sending" ? "Sending..." : "Send Message"}
                </span>
              </button>
              <a href="/contact" className="text-sm font-normal text-[#999] hover:text-black transition-colors duration-300 tracking-[-0.04em]">
                Full contact page →
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
