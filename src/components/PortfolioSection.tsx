import Image from "next/image";

// ── Corner bracket SVGs (same pattern as About section) ─────────────────────
function CTL() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M14 0L0 0L0 14" stroke="black" strokeWidth="1"/></svg>;
}
function CBL() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M0 2L0 16L14 16" stroke="black" strokeWidth="1"/></svg>;
}
function CTR() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 0L16 0L16 14" stroke="black" strokeWidth="1"/></svg>;
}
function CBR() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M16 2L16 16L2 16" stroke="black" strokeWidth="1"/></svg>;
}

// ── Northeast arrow icon (fi_10486523, 14×13) ────────────────────────────────
function ArrowNE() {
  return (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" aria-hidden="true">
      <path d="M1 12L12 1" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 1H12V8"  stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Surfers paradise",
    tags: ["Social Media", "Photography"],
    img: "/portfolio-1.jpg",
    // Desktop: 744px tall (46.5rem). Mobile: all images 390px (24.375rem).
    tallDesktop: true,
  },
  {
    title: "Cyberpunk caffe",
    tags: ["Social Media", "Photography"],
    img: "/portfolio-2.jpg",
    tallDesktop: false, // 699px = 43.6875rem
  },
  {
    title: "Agency 976",
    tags: ["Social Media", "Photography"],
    img: "/portfolio-3.jpg",
    tallDesktop: false,
  },
  {
    title: "Minimal Playground",
    tags: ["Social Media", "Photography"],
    img: "/portfolio-4.jpg",
    tallDesktop: true,
  },
];

// ── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const desktopH = project.tallDesktop ? "md:h-[46.5rem]" : "md:h-[43.6875rem]";
  return (
    <div className="flex flex-col gap-[0.625rem]">
      {/* Image — tags overlaid at bottom-left (jc=MAX inside image frame) */}
      <div className={`relative h-[24.375rem] ${desktopH} overflow-hidden`}>
        <Image
          src={project.img}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-center"
        />
        {/* Frosted-glass tag pills */}
        <div className="absolute bottom-4 left-4 flex gap-3">
          {project.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center rounded-full bg-white/30 backdrop-blur-[1.25rem] px-2 py-1"
            >
              <span className="text-sm font-medium text-[#111111]">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Title + arrow — SPACE_BETWEEN, items-CENTER */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl md:text-[2.25rem] font-black uppercase tracking-[-0.04em] leading-none text-black">
          {project.title}
        </h3>
        {/* Arrow icon wrapper matches Figma 32×31 container */}
        <div className="w-8 h-[1.9375rem] flex items-center justify-center shrink-0">
          <ArrowNE />
        </div>
      </div>
    </div>
  );
}

// ── Callout CTA (bracketed text + button) ────────────────────────────────────
function Callout() {
  return (
    <div className="flex items-stretch gap-3">
      {/* Left bracket */}
      <div className="flex flex-col justify-between w-6 shrink-0">
        <CTL />
        <CBL />
      </div>

      {/* Text + button — py-3 matches Figma pad=[12,0,12,0] */}
      <div className="flex flex-col gap-[0.625rem] py-3 flex-1">
        <p className="text-sm font-normal italic text-[#1f1f1f] tracking-[-0.04em] leading-[1.3]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <button className="w-fit flex items-center gap-2.5 bg-black px-4 py-3 text-sm font-medium tracking-[-0.035rem] text-white rounded-full hover:bg-neutral-800 transition-colors duration-200">
          Let&apos;s talk
        </button>
      </div>

      {/* Right bracket */}
      <div className="flex flex-col justify-between w-6 shrink-0">
        <CTR />
        <CBR />
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function PortfolioSection() {
  return (
    <section className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-8 md:gap-[3.8125rem]">

        {/* ── Header ─────────────────────────────────────────────────── */}
        {/*
          Desktop: HORIZONTAL SPACE_BETWEEN
            Left:  "Selected\nWork" (96px) + "004" code (top-aligned)
            Right: "[ portfolio ]" vertical rotated text
          Mobile: VERTICAL
            Top:   "[ portfolio ]" horizontal
            Below: "Selected Work" ←→ "004" (space-between)
        */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          {/* "[ portfolio ]" — mobile: horizontal at top */}
          <span className="md:hidden font-mono text-sm font-normal uppercase text-[#1f1f1f]">
            [ portfolio ]
          </span>

          {/* "Selected\nWork" + "004" */}
          <div className="flex items-start justify-between md:justify-start md:gap-[0.625rem]">
            <p className="text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-black">
              Selected<br />Work
            </p>
            <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f] leading-none self-start">
              004
            </span>
          </div>

          {/* "[ portfolio ]" — desktop: vertical rotated text on far right */}
          <span
            className="hidden md:block font-mono text-sm font-normal uppercase text-[#1f1f1f]"
            style={{ writingMode: "vertical-rl" }}
          >
            [ portfolio ]
          </span>
        </div>

        {/* ── Image grid ─────────────────────────────────────────────── */}
        {/*
          Desktop: 2-column grid, right col offset 240px down
          Mobile:  single column, all 4 images stacked
        */}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-6 md:items-start">

          {/* Left column: images 1 & 2 + callout (desktop only) */}
          <div className="flex flex-col gap-6 md:gap-[7.6875rem]">
            <ProjectCard project={PROJECTS[0]} />
            <ProjectCard project={PROJECTS[1]} />
            {/* Callout — desktop: inside left column below image 2 */}
            <div className="hidden md:block">
              <Callout />
            </div>
          </div>

          {/* Right column: images 3 & 4, offset 240px on desktop */}
          <div className="flex flex-col gap-6 md:pt-[15rem] md:gap-[7.3125rem]">
            <ProjectCard project={PROJECTS[2]} />
            <ProjectCard project={PROJECTS[3]} />
          </div>
        </div>

        {/* Callout — mobile: full-width at bottom of section */}
        <div className="md:hidden">
          <Callout />
        </div>

      </div>
    </section>
  );
}
