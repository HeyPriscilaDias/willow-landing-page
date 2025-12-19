"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function LogoCarousel() {
  // Partner logos
  const logos = [
    { id: 1, src: "/partner-logos/achievement_first.svg", alt: "Achievement First" },
    { id: 2, src: "/partner-logos/activate_work.svg", alt: "Activate Work" },
    { id: 3, src: "/partner-logos/colorado_succeeds.svg", alt: "Colorado Succeeds" },
    { id: 4, src: "/partner-logos/denver_scholarship_foundation.svg", alt: "Denver Scholarship Foundation" },
    { id: 5, src: "/partner-logos/hope-ignites.svg", alt: "Hope Ignites" },
    { id: 6, src: "/partner-logos/kipp.svg", alt: "KIPP" },
  ];

  // Logo dimensions: 128px width + 48px gap = 176px per logo
  // Total width of one set: 6 logos * 176px = 1056px
  const logoWidth = 128; // w-32 = 8rem = 128px
  const gapWidth = 48; // gap-12 = 3rem = 48px
  const totalSetWidth = logos.length * (logoWidth + gapWidth);

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-56 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-56 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-12 items-center"
          animate={{
            x: [0, -totalSetWidth],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Render logos 4 times for seamless infinite scroll */}
          {[...Array(4)].map((_, setIndex) =>
            logos.map((logo, logoIndex) => (
              <div
                key={`${setIndex}-${logo.id}-${logoIndex}`}
                className="flex-shrink-0 w-32 h-16 relative flex items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain grayscale opacity-70"
                />
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
