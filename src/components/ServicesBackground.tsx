import Image from "next/image";

export function ServicesBackground() {
  return (
    // Desktop: 1440×900 (56.25rem). Mobile: 375×565 (35.3125rem).
    <div className="relative w-full h-[35.3125rem] md:h-[56.25rem] overflow-hidden">
      <Image
        src="/services-bg.jpg"
        alt=""
        fill
        className="object-cover object-center"
      />
    </div>
  );
}
