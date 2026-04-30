import Image from "next/image";
import type { Service } from "@/sanity/queries";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section data-header-theme="dark" className="w-full bg-black py-12 px-4 md:py-20 md:px-8">
      <div className="flex flex-col gap-12">

        <span className="font-mono text-sm font-normal uppercase text-white">
          [ services ]
        </span>

        <div className="flex flex-row justify-between items-center">
          <span className="text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-white">
            [{services.length}]
          </span>
          <span className="text-[clamp(2rem,6.67vw,6rem)] font-light uppercase tracking-[-0.08em] leading-none text-white">
            Deliverables
          </span>
        </div>

        <div className="flex flex-col">
          {services.map((svc, i) => (
            <div
              key={svc._id}
              className="group flex flex-col gap-[0.5625rem] cursor-pointer px-4 py-6 -mx-4 transition-colors duration-500 hover:bg-white"
            >

              <div className="flex flex-col gap-[0.5625rem]">
                <span className="font-mono text-sm font-normal uppercase text-white transition-colors duration-500 group-hover:text-black">
                  [ {i + 1} ]
                </span>
                <div className="w-full h-px bg-white transition-colors duration-500 group-hover:bg-black" />
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <h3 className="text-[2.25rem] font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-white shrink-0 transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:text-black">
                  {svc.name}
                </h3>

                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-6">
                  <p className="text-sm font-normal text-white tracking-[-0.04em] leading-[1.3] md:w-[24.5625rem] transition-colors duration-500 group-hover:text-black">
                    {svc.description}
                  </p>

                  {svc.imageUrl && (
                    <div className="relative shrink-0 overflow-hidden" style={{ width: "9.4375rem", height: "9.4375rem" }}>
                      <Image
                        src={svc.imageUrl}
                        alt={svc.name}
                        fill
                        sizes="9.4375rem"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
