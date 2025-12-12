"use client";

import { motion } from "framer-motion";

export function LogoCarousel() {
  // Create placeholder logos - circles and squares
  const logos = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    type: i % 2 === 0 ? "circle" : "square",
  }));

  // Duplicate for infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 bg-white overflow-hidden border-y border-gray-200">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-12"
          animate={{
            x: [0, -50 * logos.length],
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
              className="flex-shrink-0"
            >
              {logo.type === "circle" ? (
                <div className="w-16 h-16 bg-gray-300 rounded-full" />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-xl" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
