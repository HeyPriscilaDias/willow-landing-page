"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
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
    <section ref={sectionRef} className="relative overflow-hidden pt-24 md:pt-32 pb-0 bg-gradient-to-b from-white to-[#F5F1EB]">
      {/* Paper texture background */}
      <Image
        src="/hero-assets/paper.avif"
        alt=""
        fill
        className="object-cover z-0 pointer-events-none opacity-10"
        aria-hidden="true"
        priority
      />
      {/* Paper scrap decorations - Right side */}
      <div className="absolute bottom-[-2px] right-0 w-[65%] max-w-[723px] h-auto z-[1] pointer-events-none">
        <Image
          src="/hero-assets/paper-scrap-1.svg"
          alt=""
          width={1006}
          height={478}
          className="w-full h-auto opacity-0"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: "url(/hero-assets/paper-scrap-1.svg)",
            maskSize: "100% 100%",
            WebkitMaskImage: "url(/hero-assets/paper-scrap-1.svg)",
            WebkitMaskSize: "100% 100%",
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-[-20%] w-[140%] h-[140%]"
            style={{
              backgroundImage: "url(/hero-assets/notebook-pattern.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "rotate(10deg)",
            }}
          />
        </div>
      </div>
      <div className="absolute bottom-[-2px] right-0 w-[68%] max-w-[765px] h-auto z-0 pointer-events-none">
        <Image
          src="/hero-assets/paper-scrap-2.svg"
          alt=""
          width={893}
          height={445}
          className="w-full h-auto"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url(/hero-assets/noise-1.png)",
            backgroundSize: "200px",
            maskImage: "url(/hero-assets/paper-scrap-2.svg)",
            maskSize: "100% 100%",
            WebkitMaskImage: "url(/hero-assets/paper-scrap-2.svg)",
            WebkitMaskSize: "100% 100%",
          }}
          aria-hidden="true"
        />
      </div>
      {/* Paper scrap decorations - Left side */}
      {/* Paper scrap 4 (white) - behind */}
      <Image
        src="/hero-assets/paper-scrap-4.svg"
        alt=""
        width={1373}
        height={570}
        className="absolute bottom-[-2px] left-0 w-[83%] max-w-[918px] h-auto z-0 pointer-events-none"
        aria-hidden="true"
      />
      {/* Paper scrap 3 - in front */}
      <div className="absolute bottom-[-2px] left-0 w-[75%] max-w-[826px] h-auto z-[1] pointer-events-none">
        <Image
          src="/hero-assets/paper-scrap-3.svg"
          alt=""
          width={1370}
          height={564}
          className="w-full h-auto"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url(/hero-assets/black-texture.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            maskImage: "url(/hero-assets/paper-scrap-3.svg)",
            maskSize: "100% 100%",
            WebkitMaskImage: "url(/hero-assets/paper-scrap-3.svg)",
            WebkitMaskSize: "100% 100%",
          }}
          aria-hidden="true"
        />
      </div>
      {/* Paper scrap 6 (white) - behind */}
      <Image
        src="/hero-assets/paper-scrap-6.svg"
        alt=""
        width={924}
        height={519}
        className="absolute bottom-[-2px] left-0 w-[30%] max-w-[319px] h-auto z-[2] pointer-events-none"
        aria-hidden="true"
      />
      {/* Paper scrap 5 - in front */}
      <div className="absolute bottom-[-2px] left-0 w-[27%] max-w-[298px] h-auto z-[3] pointer-events-none">
        <Image
          src="/hero-assets/paper-scrap-5.svg"
          alt=""
          width={930}
          height={458}
          className="w-full h-auto opacity-0"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#ACF7B2",
            maskImage: "url(/hero-assets/paper-scrap-5.svg)",
            maskSize: "100% 100%",
            WebkitMaskImage: "url(/hero-assets/paper-scrap-5.svg)",
            WebkitMaskSize: "100% 100%",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url(/hero-assets/noise-1.png)",
            backgroundSize: "200px",
            maskImage: "url(/hero-assets/paper-scrap-5.svg)",
            maskSize: "100% 100%",
            WebkitMaskImage: "url(/hero-assets/paper-scrap-5.svg)",
            WebkitMaskSize: "100% 100%",
          }}
          aria-hidden="true"
        />
      </div>
      {/* Text Content - Centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-5 md:px-10 max-w-4xl mx-auto"
      >
        <h1 className="font-heading text-[32px] md:text-5xl lg:text-[60px] font-medium text-heading mb-6 leading-tight">
          The &ldquo;Science of Reading&rdquo; for Postsecondary Success
        </h1>
        <p className="text-base md:text-lg text-secondary mb-8 max-w-2xl mx-auto">
          Beyond &ldquo;random acts of dual enrollment.&rdquo; An AI-native roadmap built for economic mobility.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/curriculum-sample">
            <Button variant="secondary">
              Get a curriculum sample
            </Button>
          </Link>
          <a href="https://calendly.com/d/cq6c-qdg-hjw/willow-curriculum-platform-demo-meeting?month=2025-12" target="_blank" rel="noopener noreferrer">
            <Button>
              Request a proposal
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Hero Image Composition */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mt-12 md:mt-16 px-5 md:px-10 lg:px-16 max-w-7xl mx-auto mb-[-2px]"
      >
        <div className="relative w-[76%] mx-auto -translate-x-[5%]">
          {/* UI Frame - Base layer */}
          <div className="overflow-hidden [aspect-ratio:1223/743]">
            <Image
              src="/hero-assets/hero-img-ui.png"
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
            className="absolute top-[15%] right-[-30%] w-[62%] z-10"
          >
            <Image
              src="/hero-assets/hero-img-slide.png"
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

      {/* Divider line */}
      <div className="w-full h-px bg-[#D5D7DA]" />
    </section>
  );
}
