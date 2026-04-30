"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";

// ─── Shared ───────────────────────────────────────────────────────────────────

function W({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return <span data-word className={`inline-block ${className ?? ""}`} style={style}>{children}</span>;
}

const BIG = "text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-black";

function CornerTL() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 0L0 0L0 14" stroke="black" strokeWidth="1" strokeLinecap="square"/></svg>; }
function CornerBL() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 2L0 16L14 16" stroke="black" strokeWidth="1" strokeLinecap="square"/></svg>; }
function CornerTR() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 0L16 0L16 14" stroke="black" strokeWidth="1" strokeLinecap="square"/></svg>; }
function CornerBR() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 2L16 16L2 16" stroke="black" strokeWidth="1" strokeLinecap="square"/></svg>; }

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const words = sectionRef.current?.querySelectorAll("[data-word]");
    if (!words?.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(words, { opacity: 0.15 }, {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "bottom 50%", scrub: 0.5 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white min-h-[100svh] flex flex-col px-4 md:px-8 pt-32 pb-12 md:pb-20">
      <div className="flex items-center justify-between mb-auto">
        <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ Contact ]</span>
        <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ Get In Touch ]</span>
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <p className={BIG}><W>Let&apos;s</W> <W>build</W></p>
        <p className={`${BIG} md:pl-[12rem]`}>
          <W style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>something</W>
        </p>
        <p className={`${BIG} md:pl-[5rem]`}><W>great</W> <W>together</W><W>.</W></p>
        <div className="mt-4">
          <W className="text-sm font-normal uppercase text-[#1f1f1f]">[ Available for Freelance &amp; Collaborative Projects ]</W>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3">
        <div className="w-full h-px bg-black/10" />
        <div className="flex items-end justify-between">
          <a
            href="mailto:hello@hstudio.com"
            className="text-[clamp(1rem,2.5vw,1.5rem)] font-light tracking-[-0.04em] text-black/30 hover:text-black transition-colors duration-300"
          >
            hello@hstudio.com
          </a>
          <span className="hidden md:block font-mono text-sm font-normal uppercase text-[#1f1f1f] pb-1">
            Chicago, IL — Available Worldwide
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────

function Field({
  label, name, type = "text", value, onChange, required, textarea,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  textarea?: boolean;
}) {
  const sharedClass =
    "w-full bg-transparent border-b border-black/20 focus:border-black outline-none text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5] transition-colors duration-300 placeholder:text-black/20 py-3";

  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-xs font-normal uppercase text-[#999]">
        {label}{required && <span className="text-black ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={5}
          className={`${sharedClass} resize-none`}
          placeholder={`Your ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={sharedClass}
          placeholder={`Your ${label.toLowerCase()}...`}
        />
      )}
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────

type Status = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Replace with your preferred form handler (Resend, Formspree, etc.)
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
      setName(""); setEmail(""); setSubject(""); setMessage("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col gap-6 py-12">
        <div className="flex items-stretch gap-3">
          <div className="flex flex-col justify-between w-6 shrink-0 py-px"><CornerTL /><CornerBL /></div>
          <div className="flex-1 flex flex-col gap-3 py-4">
            <span className="font-mono text-xs uppercase text-[#999]">[ Message Sent ]</span>
            <p className="text-[1.75rem] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-black">
              Thanks for reaching out.
            </p>
            <p className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.5]">
              I&apos;ll get back to you within 24–48 hours.
            </p>
          </div>
          <div className="flex flex-col justify-between w-6 shrink-0 py-px"><CornerTR /><CornerBR /></div>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-black underline underline-offset-4 w-fit"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Field label="Name"    name="name"    value={name}    onChange={setName}    required />
        <Field label="Email"   name="email"   type="email" value={email}   onChange={setEmail}   required />
      </div>
      <Field label="Subject" name="subject" value={subject} onChange={setSubject} required />
      <Field label="Message" name="message" value={message} onChange={setMessage} required textarea />

      {status === "error" && (
        <p className="text-sm text-red-600 tracking-[-0.04em]">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="relative overflow-hidden flex items-center px-6 py-3 text-sm font-medium tracking-[-0.035rem] rounded-full bg-black text-white disabled:opacity-50 transition-opacity duration-300 group"
        >
          <span className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom rounded-full" />
          <span className="relative group-hover:text-black transition-colors duration-300">
            {status === "sending" ? "Sending..." : "Send Message"}
          </span>
        </button>
        <span className="font-mono text-xs uppercase text-[#999]">
          * Required fields
        </span>
      </div>
    </form>
  );
}

// ─── Contact info ─────────────────────────────────────────────────────────────

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn",  href: "#" },
  { label: "X.com",     href: "#" },
  { label: "Facebook",  href: "#" },
];

const INFO = [
  { label: "Email",    value: "hello@hstudio.com",      href: "mailto:hello@hstudio.com" },
  { label: "Based in", value: "Chicago, IL",             href: null },
  { label: "Phone",    value: "+1 (312) 000 0000",       href: "tel:+13120000000" },
];

function ContactInfo() {
  return (
    <div className="flex flex-col gap-10">
      {/* Info rows */}
      <div className="flex flex-col gap-0">
        {INFO.map(({ label, value, href }) => (
          <div key={label} className="flex items-start justify-between py-4 border-b border-black/10 gap-4">
            <span className="font-mono text-xs font-normal uppercase text-[#999] shrink-0">{label}</span>
            {href ? (
              <a href={href} className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] text-right hover:text-black transition-colors duration-300 underline-offset-4 hover:underline">
                {value}
              </a>
            ) : (
              <span className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] text-right">{value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Socials */}
      <div className="flex flex-col gap-4">
        <span className="font-mono text-xs font-normal uppercase text-[#999]">[ Social ]</span>
        <div className="flex flex-col gap-1">
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[1.5rem] font-light uppercase tracking-[-0.06em] leading-[1.1] text-black/30 hover:text-black transition-colors duration-300 w-fit"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Availability badge */}
      <div className="flex items-stretch gap-3">
        <div className="flex flex-col justify-between w-6 shrink-0 py-px"><CornerTL /><CornerBL /></div>
        <div className="flex-1 flex flex-col gap-2 py-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
            <span className="font-mono text-xs uppercase text-[#1f1f1f]">Available for new projects</span>
          </div>
          <p className="text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.4]">
            Currently accepting freelance and collaborative work for Q3 2026 and beyond.
          </p>
        </div>
        <div className="flex flex-col justify-between w-6 shrink-0 py-px"><CornerTR /><CornerBR /></div>
      </div>
    </div>
  );
}

// ─── Main contact section ─────────────────────────────────────────────────────

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      [formRef, infoRef].forEach((ref, i) => {
        gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
          delay: i * 0.1,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-16 md:grid md:grid-cols-[1fr_26rem] md:gap-16 md:items-start">

        {/* Form */}
        <div ref={formRef} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ Send a Message ]</span>
            <div className="w-full h-px bg-black/10" />
          </div>
          <ContactForm />
        </div>

        {/* Info */}
        <div ref={infoRef} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f]">[ Contact Info ]</span>
            <div className="w-full h-px bg-black/10" />
          </div>
          <ContactInfo />
        </div>

      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <div className="relative z-10">
        <Header />
        <main>
          <ContactHero />
          <ContactSection />
        </main>
      </div>
      <FooterSection />
    </>
  );
}
