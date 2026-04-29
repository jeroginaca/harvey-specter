const BIG = [
  // Mobile: 32px (2rem) at 375px. Desktop: 96px (6rem) at 1440px.
  // 6.67vw is the slope: 96/1440*100. clamp min=2rem locks mobile at exactly 32px.
  "text-[clamp(2rem,6.67vw,6rem)]",
  "font-light uppercase tracking-[-0.08em] leading-none text-black",
  // Mobile: all lines centered. Desktop: left-aligned (each row controls its own indent).
  "text-center md:text-left",
].join(" ");

export function ExperienceSection() {
  return (
    <section className="w-full bg-white py-12 px-4 md:py-[7.5rem] md:px-8">
      <div className="flex flex-col gap-6 w-full">

        {/* "[ 8+ years in industry ]" + full-width divider — right-aligned */}
        <div className="flex flex-col gap-3 items-end w-full">
          <span className="text-sm font-normal uppercase text-[#1f1f1f]">
            [ 8+ years in industry ]
          </span>
          <div className="w-full h-px bg-black" />
        </div>

        {/* Staggered typography rows */}
        <div className="flex flex-col gap-2 w-full">

          {/* Row 1 — "A CREATIVE DIRECTOR   /" + code "001"
              Mobile:  VERTICAL, "001" above text, both centered  (flex-col-reverse centers
                       "001" at top via reversed DOM order [text, code] → code paints first)
              Desktop: HORIZONTAL, text left, code top-right beside slash */}
          <div className="flex flex-col-reverse items-center gap-3 md:flex-row md:items-start">
            <p className={BIG}>
              A creative director{"   "}/
            </p>
            <span className="text-sm font-normal uppercase text-[#1f1f1f] shrink-0 md:pt-1">
              001
            </span>
          </div>

          {/* Row 2 — "PHOTOGRAPHER"
              Mobile:  centered, no indent
              Desktop: indented 214px (13.375rem) from content left */}
          <div className="md:pl-[13.375rem]">
            <p className={BIG}>Photographer</p>
          </div>

          {/* Row 3 — "BORN & RAISED"
              Mobile:  centered, no indent
              Desktop: indented 610px (38.125rem) from content left
              "&" character only → Playfair Italic (styleOverride on char index 5) */}
          <div className="md:pl-[38.125rem]">
            <p className={BIG}>
              Born{" "}
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                &amp;
              </span>
              {" "}raised
            </p>
          </div>

          {/* Row 4 — "ON THE SOUTH SIDE"
              Mobile:  centered
              Desktop: left-aligned, no indent */}
          <p className={BIG}>on the south side</p>

          {/* Row 5 — "OF CHICAGO." + "[ creative freelancer ]"
              Mobile:  centered, no indent, items stacked (code below text)
              Desktop: indented 606px (37.875rem), left-aligned stack */}
          <div className="flex flex-col items-center gap-3 md:items-start md:gap-0 md:pl-[37.875rem]">
            <p className={BIG}>of chicago.</p>
            <span className="text-sm font-normal uppercase text-[#1f1f1f] text-center md:text-left">
              [ creative freelancer ]
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
