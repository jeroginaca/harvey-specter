import Image from "next/image";

function CornerTL() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M 14 0 L 0 0 L 0 14" stroke="black" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
function CornerBL() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M 0 2 L 0 16 L 14 16" stroke="black" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
function CornerTR() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M 2 0 L 16 0 L 16 14" stroke="black" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
function CornerBR() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M 16 2 L 16 16 L 2 16" stroke="black" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}

const ABOUT_TEXT =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

export function AboutSection() {
  return (
    <section className="w-full bg-white py-12 px-4 md:py-20 md:px-8">
      {/*
        About Section
        Mobile:  single vertical column — 002, [About], text block, image
        Desktop: 2-column SPACE_BETWEEN — [About] left | text+image right (items-end)
      */}
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-start">

        {/* ── Left column ─────────────────────────────────────── */}
        <div className="flex flex-col gap-5 md:gap-0">
          {/* "002" — mobile: above [About]; desktop: hidden here, shown in image column */}
          <span className="md:hidden text-sm font-normal uppercase text-[#1f1f1f]">
            002
          </span>
          <span className="text-sm font-normal uppercase text-[#1f1f1f]">
            [ About ]
          </span>
        </div>

        {/* ── Right column: Paragraph Container ───────────────── */}
        {/*
          Desktop: HORIZONTAL, items-end (bottom-aligns text block to image bottom)
          Mobile:  VERTICAL, gap=20
        */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-8">

          {/* Bracketed text block
              Desktop: 465px wide, 132px tall (hugs content)
              Mobile:  full-width, taller (~168px)
              Brackets: 24px wide containers with corner SVGs at top + bottom */}
          <div className="flex items-stretch gap-3 md:w-[29.0625rem]">
            {/* Left bracket column */}
            <div className="flex flex-col justify-between w-6 shrink-0 py-px">
              <CornerTL />
              <CornerBL />
            </div>

            {/* Text body — py-3 matches Figma pad=[12,0,12,0] on Placeholder Text Container */}
            <p className="flex-1 text-sm font-normal text-[#1f1f1f] tracking-[-0.04em] leading-[1.3] py-3">
              {ABOUT_TEXT}
            </p>

            {/* Right bracket column */}
            <div className="flex flex-col justify-between w-6 shrink-0 py-px">
              <CornerTR />
              <CornerBR />
            </div>
          </div>

          {/* Image column
              Desktop: HORIZONTAL — "002" label (left, top-aligned) + image (right)
                       Image Container: 486×614 = 26(002) + 24(gap) + 436(img)
              Mobile:  image only, full-width, 002 already shown at top of section */}
          <div className="flex flex-row items-start gap-6">
            {/* "002" label — desktop only, top-aligned beside the image */}
            <span className="hidden md:block text-sm font-normal uppercase text-[#1f1f1f] shrink-0">
              002
            </span>

            {/* Image
                Desktop: 436×614 = 27.25rem × 38.375rem
                Mobile:  full-width, same aspect ratio → height auto-scales via aspect-ratio */}
            <div className="relative w-full md:w-[27.25rem] aspect-[436/614] overflow-hidden">
              <Image
                src="/about-photo.jpg"
                alt="About Harvey Specter"
                fill
                sizes="(min-width: 768px) 27.25rem, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
