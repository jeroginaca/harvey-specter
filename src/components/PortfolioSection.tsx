import Image from "next/image";
import type { PortfolioProject } from "@/sanity/queries";

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

function ArrowNE() {
  return (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" aria-hidden="true">
      <path d="M1 12L12 1" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 1H12V8"  stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const desktopH = project.tallDesktop ? "md:h-[46.5rem]" : "md:h-[43.6875rem]";
  return (
    <div className="flex flex-col gap-[0.625rem]">
      <div className={`relative h-[24.375rem] ${desktopH} overflow-hidden`}>
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
        )}
        <div className="absolute bottom-4 left-4 flex gap-3">
          {project.tags?.map((tag) => (
            <div
              key={tag}
              className="flex items-center rounded-full bg-white/30 backdrop-blur-[1.25rem] px-2 py-1"
            >
              <span className="text-sm font-medium text-[#111111]">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-2xl md:text-[2.25rem] font-black uppercase tracking-[-0.04em] leading-none text-black">
          {project.title}
        </h3>
        <div className="w-8 h-[1.9375rem] flex items-center justify-center shrink-0">
          <ArrowNE />
        </div>
      </div>
    </div>
  );
}

function Callout() {
  return (
    <div className="flex items-stretch gap-3">
      <div className="flex flex-col justify-between w-6 shrink-0">
        <CTL />
        <CBL />
      </div>
      <div className="flex flex-col gap-[0.625rem] py-3 flex-1">
        <p className="text-sm font-normal italic text-[#1f1f1f] tracking-[-0.04em] leading-[1.3]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <button className="w-fit flex items-center gap-2.5 bg-black px-4 py-3 text-sm font-medium tracking-[-0.035rem] text-white rounded-full hover:bg-neutral-800 transition-colors duration-200">
          Let&apos;s talk
        </button>
      </div>
      <div className="flex flex-col justify-between w-6 shrink-0">
        <CTR />
        <CBR />
      </div>
    </div>
  );
}

export function PortfolioSection({ projects }: { projects: PortfolioProject[] }) {
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <section className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-8 md:gap-[3.8125rem]">

        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <span className="md:hidden font-mono text-sm font-normal uppercase text-[#1f1f1f]">
            [ portfolio ]
          </span>
          <div className="flex items-start justify-between md:justify-start md:gap-[0.625rem]">
            <p className="text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-black">
              Selected<br />Work
            </p>
            <span className="font-mono text-sm font-normal uppercase text-[#1f1f1f] leading-none self-start">
              00{projects.length}
            </span>
          </div>
          <span
            className="hidden md:block font-mono text-sm font-normal uppercase text-[#1f1f1f]"
            style={{ writingMode: "vertical-rl" }}
          >
            [ portfolio ]
          </span>
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-6 md:items-start">

          <div className="flex flex-col gap-6 md:gap-[7.6875rem]">
            {left.map((p) => <ProjectCard key={p._id} project={p} />)}
            <div className="hidden md:block">
              <Callout />
            </div>
          </div>

          <div className="flex flex-col gap-6 md:pt-[15rem] md:gap-[7.3125rem]">
            {right.map((p) => <ProjectCard key={p._id} project={p} />)}
          </div>
        </div>

        <div className="md:hidden">
          <Callout />
        </div>

      </div>
    </section>
  );
}
