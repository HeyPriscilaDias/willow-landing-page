"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

export function DiscoveryBridge() {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse position as motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize to -1 to 1 range based on container center
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Floating archetype images with different parallax intensities
  // All images use 4:5 aspect ratio but different sizes, spread across full width
  const floatingImages = [
    // Far left, upper - large
    {
      src: "/personality-archetype-illustrations/CONVENTIONAL_CONSCIENTIOUSNESS.jpg",
      alt: "Conventional Conscientiousness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [15, -15]),
      y: useTransform(smoothMouseY, [-1, 1], [10, -10]),
      className: "absolute top-[5%] left-[2%] md:left-[4%] lg:left-[6%] w-28 h-[140px] md:w-36 md:h-[180px] lg:w-44 lg:h-[220px] rounded-[12px] rotate-[-7deg] shadow-xl",
      delay: 0
    },
    // Far left, lower - small
    {
      src: "/personality-archetype-illustrations/ARTISTIC_OPENNESS.jpg",
      alt: "Artistic Openness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [18, -18]),
      y: useTransform(smoothMouseY, [-1, 1], [-14, 14]),
      className: "absolute bottom-[12%] left-[3%] md:left-[5%] lg:left-[7%] w-24 h-[120px] md:w-28 md:h-[140px] lg:w-32 lg:h-[160px] rounded-[12px] rotate-[5deg] shadow-lg",
      delay: 0.18
    },
    // Left of center, high - medium
    {
      src: "/personality-archetype-illustrations/SOCIAL_AGREEABLENESS.jpg",
      alt: "Social Agreeableness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [22, -22]),
      y: useTransform(smoothMouseY, [-1, 1], [-8, 8]),
      className: "absolute top-[18%] left-[16%] md:left-[18%] lg:left-[20%] w-24 h-[120px] md:w-32 md:h-[160px] lg:w-36 lg:h-[180px] rounded-[12px] rotate-[3deg] shadow-lg",
      delay: 0.12
    },
    // Left of center, low - small
    {
      src: "/personality-archetype-illustrations/REALISTIC_CONSCIENTIOUSNESS.jpg",
      alt: "Realistic Conscientiousness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [14, -14]),
      y: useTransform(smoothMouseY, [-1, 1], [-16, 16]),
      className: "absolute bottom-[8%] left-[14%] md:left-[16%] lg:left-[18%] w-20 h-[100px] md:w-24 md:h-[120px] lg:w-28 lg:h-[140px] rounded-[12px] rotate-[-4deg] shadow-md",
      delay: 0.25
    },
    // Right of center, high - medium
    {
      src: "/personality-archetype-illustrations/ENTERPRISING_OPENNESS.jpg",
      alt: "Enterprising Openness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [-20, 20]),
      y: useTransform(smoothMouseY, [-1, 1], [10, -10]),
      className: "absolute top-[12%] right-[16%] md:right-[18%] lg:right-[20%] w-24 h-[120px] md:w-32 md:h-[160px] lg:w-36 lg:h-[180px] rounded-[12px] rotate-[-5deg] shadow-lg",
      delay: 0.08
    },
    // Right of center, low - small
    {
      src: "/personality-archetype-illustrations/CONVENTIONAL_EMOTIONALSTABILITY.jpg",
      alt: "Conventional Emotional Stability archetype",
      x: useTransform(smoothMouseX, [-1, 1], [-16, 16]),
      y: useTransform(smoothMouseY, [-1, 1], [-12, 12]),
      className: "absolute bottom-[15%] right-[14%] md:right-[16%] lg:right-[18%] w-20 h-[100px] md:w-28 md:h-[140px] lg:w-32 lg:h-[160px] rounded-[12px] rotate-[6deg] shadow-md",
      delay: 0.22
    },
    // Far right, upper - medium
    {
      src: "/personality-archetype-illustrations/INVESTIGATIVE_EXTRAVERSION.jpg",
      alt: "Investigative Extraversion archetype",
      x: useTransform(smoothMouseX, [-1, 1], [-18, 18]),
      y: useTransform(smoothMouseY, [-1, 1], [12, -12]),
      className: "absolute top-[8%] right-[2%] md:right-[4%] lg:right-[6%] w-28 h-[140px] md:w-36 md:h-[180px] lg:w-40 lg:h-[200px] rounded-[12px] rotate-[9deg] shadow-xl",
      delay: 0.05
    },
    // Far right, lower - large
    {
      src: "/personality-archetype-illustrations/SOCIAL_OPENNESS.jpg",
      alt: "Social Openness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [-14, 14]),
      y: useTransform(smoothMouseY, [-1, 1], [-10, 10]),
      className: "absolute bottom-[5%] right-[3%] md:right-[5%] lg:right-[7%] w-28 h-[140px] md:w-40 md:h-[200px] lg:w-48 lg:h-[240px] rounded-[12px] rotate-[-6deg] shadow-xl",
      delay: 0.15
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="relative w-full px-5 md:px-10 lg:px-16">
        {/* Floating archetype images */}
        {floatingImages.map((image, index) => (
          <motion.div
            key={index}
            style={{ x: image.x, y: image.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: image.delay }}
            className={image.className}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-[12px]"
              sizes="(max-width: 768px) 120px, 180px"
            />
          </motion.div>
        ))}

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center py-16 md:py-24"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-heading mb-8">
            Discovery Starts Here
          </h2>

          <blockquote className="text-lg md:text-xl text-secondary leading-relaxed mb-4 max-w-2xl mx-auto">
            &ldquo;When I was a principal, the hardest question to answer was &lsquo;What do I want to be?&rsquo; This quiz is how we start that conversation with every student.&rdquo;
          </blockquote>

          <p className="text-secondary font-medium mb-10">
            — James Cryan, Founder & CEO
          </p>

          <Link href="/personality-quiz">
            <Button variant="primary">
              Take the 2-minute Personality Quiz
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
