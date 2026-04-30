import Image from "next/image";

const SERVICES = [
  {
    num: "[ 1 ]",
    name: "Brand Discovery",
    img: "/service-1.jpg",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
  },
  {
    num: "[ 2 ]",
    name: "Web Design & Dev",
    img: "/service-2.jpg",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
  },
  {
    num: "[ 3 ]",
    name: "Marketing",
    img: "/service-3.jpg",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
  },
  {
    num: "[ 4 ]",
    name: "Photography",
    img: "/service-4.jpg",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
  },
];

export function ServicesSection() {
  return (
    <section className="w-full bg-black py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-12">

        {/* "[ services ]" label — Geist Mono, 14px, UPPER */}
        <span className="font-mono text-sm font-normal uppercase text-white">
          [ services ]
        </span>

        {/* Services Section: "[4]" + "Deliverables"
            Desktop: 96px Inter Light, SPACE_BETWEEN
            Mobile:  32px — clamp(2rem,6.67vw,6rem) hits 2rem=32px at 375px */}
        <div className="flex flex-row justify-between items-center">
          <span className="text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-white">
            [4]
          </span>
          <span className="text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-white">
            Deliverables
          </span>
        </div>

        {/* Service list — gap=48 between cards */}
        <div className="flex flex-col gap-12">
          {SERVICES.map((svc) => (
            <div key={svc.num} className="flex flex-col gap-[0.5625rem]">

              {/* Service Header: code label + white divider line (gap=9) */}
              <div className="flex flex-col gap-[0.5625rem]">
                <span className="font-mono text-sm font-normal uppercase text-white">
                  {svc.num}
                </span>
                <div className="w-full h-px bg-white" />
              </div>

              {/* Service Content
                  Desktop: HORIZONTAL SPACE_BETWEEN — name left, desc+image right
                  Mobile:  VERTICAL — name → description → image stacked */}
              <div className="flex flex-col gap-4 md:flex-row md:justify-between">

                {/* Service name — 36px Bold Italic UPPER ls=-0.04em */}
                <h3 className="text-[2.25rem] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-white shrink-0">
                  {svc.name}
                </h3>

                {/* Description Container
                    Desktop: HORIZONTAL — description text (393px) + image (151px, gap=24)
                    Mobile:  VERTICAL   — description text (full-width) + image */}
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-6">
                  <p className="text-sm font-normal text-white tracking-[-0.04em] leading-[1.3] md:w-[24.5625rem]">
                    {svc.description}
                  </p>

                  {/* Service image — 151×151 on both breakpoints */}
                  <div className="relative shrink-0 overflow-hidden" style={{ width: "9.4375rem", height: "9.4375rem" }}>
                    <Image
                      src={svc.img}
                      alt={svc.name}
                      fill
                      sizes="9.4375rem"
                      className="object-cover"
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
