import { LetsTalkButton } from "./LetsTalkButton";

export function FooterSection() {
  return (
    <footer data-header-theme="dark" className="sticky bottom-0 z-0 w-full bg-black overflow-hidden">
      <div className="px-4 md:px-8 pt-12">

        {/* ─── MOBILE: CTA + social stacked ─────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p
              className="text-[1.5rem] uppercase text-white"
              style={{ lineHeight: "1.1", letterSpacing: "-0.04em" }}
            >
              <em className="font-light italic">Have a </em>
              <strong className="font-bold not-italic">Project</strong>
              <em className="font-light italic"> in mind?</em>
            </p>
            <LetsTalkButton variant="outlined" />
          </div>
          {["Facebook", "Instagram", "X.com", "Linkedin"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[1.125rem] font-normal uppercase text-white"
              style={{ lineHeight: "1.1", letterSpacing: "-0.04em" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* ─── DESKTOP: 3-column CTA row ────────────────────────────────── */}
        <div className="hidden md:flex items-start justify-between">
          {/* Left: CTA — forced to 298px so justify-between lands on Figma positions */}
          <div className="w-[18.625rem] flex flex-col gap-3">
            <p
              className="text-[1.5rem] uppercase text-white"
              style={{ lineHeight: "1.1", letterSpacing: "-0.04em" }}
            >
              <em className="font-light italic">Have a </em>
              <strong className="font-bold not-italic">Project</strong>
              <em className="font-light italic"> in mind?</em>
            </p>
            <LetsTalkButton variant="outlined" />
          </div>

          {/* Center: Facebook + Instagram — centered */}
          <div className="w-[18.625rem] flex flex-col text-center" style={{ lineHeight: "1.1" }}>
            <a href="#" className="text-[1.125rem] font-normal uppercase tracking-[-0.04em] text-white">
              Facebook
            </a>
            <a href="#" className="text-[1.125rem] font-normal uppercase tracking-[-0.04em] text-white">
              Instagram
            </a>
          </div>

          {/* Right: X.com + Linkedin — right-aligned */}
          <div className="w-[18.625rem] flex flex-col text-right" style={{ lineHeight: "1.1" }}>
            <a href="#" className="text-[1.125rem] font-normal uppercase tracking-[-0.04em] text-white">
              X.com
            </a>
            <a href="#" className="text-[1.125rem] font-normal uppercase tracking-[-0.04em] text-white">
              Linkedin
            </a>
          </div>
        </div>

        {/* ─── DIVIDER ──────────────────────────────────────────────────── */}
        <div className="mt-6 md:mt-12 h-px bg-white" />

        {/* ─── MOBILE BOTTOM: links → code text → H.Studio ─────────────── */}
        <div className="md:hidden mt-12 flex flex-col">
          <div className="flex justify-center gap-[2.125rem] mb-4">
            <a href="#" className="text-[0.75rem] font-normal uppercase tracking-[-0.04em] text-white underline">
              Licences
            </a>
            <a href="#" className="text-[0.75rem] font-normal uppercase tracking-[-0.04em] text-white underline">
              Privacy policy
            </a>
          </div>
          <p className="text-[0.625rem] font-normal uppercase text-white mb-3">
            [ Coded By Claude ]
          </p>
          <h2
            className="font-semibold text-white"
            style={{
              fontSize: "max(5.7125rem, 20vw)",
              letterSpacing: "-0.06em",
              lineHeight: "0.8",
            }}
          >
            H.Studio
          </h2>
        </div>

        {/* ─── DESKTOP BOTTOM: H.Studio (cropped) + links ─────────────────── */}
        {/*  H.Studio sits in a overflow-hidden container sized to ~94.4% of */}
        {/*  the text line-height, cropping ~13px at the bottom (Figma exact) */}
        <div className="hidden md:flex items-end justify-between mt-[7.5rem]">

          {/* H.Studio container — overflow-hidden crops bottom of text */}
          {/* height = 0.9440 × lineHeight(0.8) × font = 0.755 × 20vw = 15.1vw */}
          <div
            className="relative flex-1 min-w-0 overflow-hidden"
            style={{ height: "15.1vw" }}
          >
            {/* Rotated "[ CODED BY CLAUDE ]" */}
            <div className="absolute top-0 bottom-0 left-0 w-4 flex items-center justify-center">
              <span
                className="text-[0.875rem] font-normal uppercase text-white whitespace-nowrap"
                style={{ transform: "rotate(-90deg)" }}
              >
                [ Coded By Claude ]
              </span>
            </div>

            <h2
              className="font-semibold text-white whitespace-nowrap"
              style={{
                fontSize: "max(5.7125rem, 20vw)",
                letterSpacing: "-0.06em",
                lineHeight: "0.8",
              }}
            >
              H.Studio
            </h2>
          </div>

          {/* Footer links — horizontal row, pinned bottom-right, 32px from bottom */}
          <div className="shrink-0 flex gap-[2.125rem] items-center pb-8">
            <a href="#" className="text-[0.75rem] font-normal uppercase tracking-[-0.04em] text-white underline">
              Licences
            </a>
            <a href="#" className="text-[0.75rem] font-normal uppercase tracking-[-0.04em] text-white underline">
              Privacy policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
