"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useProposalModal } from "@/lib/proposal-modal-context";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const { openModal } = useProposalModal();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth horizontal movement for the slide image (left to right)
  const slideXRaw = useTransform(scrollYProgress, [0, 1], [-20, 60]);
  const slideX = useSpring(slideXRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Slight upward movement
  const slideYRaw = useTransform(scrollYProgress, [0, 1], [10, -30]);
  const slideY = useSpring(slideYRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-24 pb-0">
      {/* Text Content - Centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-5 md:px-10 max-w-4xl mx-auto"
      >
        <h1 className="font-heading text-[32px] md:text-5xl lg:text-[60px] font-medium text-heading mb-6 leading-tight">
          Unlock economic mobility through career exploration
        </h1>
        <p className="text-base md:text-lg text-secondary mb-8 max-w-2xl mx-auto">
          A comprehensive career exploration curriculum and platform designed
          to significantly increase economic mobility for students.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={openModal}>
            Request a proposal
          </Button>
          <Link href="/curriculum-sample">
            <Button variant="secondary">
              Get a curriculum sample
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Hero Image Composition */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 md:mt-16 px-5 md:px-10 lg:px-16 max-w-7xl mx-auto"
      >
        <div className="relative w-[76%] mx-auto -translate-x-[5%]">
          {/* UI Frame - Base layer, cropped 20% from bottom */}
          <div className="overflow-hidden [aspect-ratio:1223/646]">
            <Image
              src="/hero-img-ui.png"
              alt="Willow curriculum interface"
              width={1223}
              height={919}
              quality={100}
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 76vw, 900px"
              unoptimized
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Slide Image - On top, positioned right, smooth scroll animation */}
          <motion.div
            style={{ x: slideX, y: slideY }}
            className="absolute top-[5%] right-[-30%] w-[62%] z-10"
          >
            <Image
              src="/hero-img-slide.png"
              alt="Curriculum slide preview"
              width={927}
              height={532}
              quality={100}
              sizes="(max-width: 768px) 60vw, 500px"
              unoptimized
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
