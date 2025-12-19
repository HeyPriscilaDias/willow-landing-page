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

  // Duplicate for infinite scroll
  const duplicatedLogos = [...logos, ...logos];

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
            x: ["0%", "-50%"],
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
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 w-32 h-16 relative flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain grayscale opacity-70"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
