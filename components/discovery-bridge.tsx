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
  const floatingImages = [
    // Top left
    {
      src: "/personality-archetype-illustrations/CONVENTIONAL_CONSCIENTIOUSNESS.jpg",
      alt: "Conventional Conscientiousness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [15, -15]),
      y: useTransform(smoothMouseY, [-1, 1], [10, -10]),
      className: "absolute -top-4 -left-8 md:left-4 w-32 h-40 md:w-44 md:h-56 rounded-2xl rotate-[-8deg] shadow-xl",
      delay: 0
    },
    // Top right
    {
      src: "/personality-archetype-illustrations/ENTERPRISING_OPENNESS.jpg",
      alt: "Enterprising Openness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [-20, 20]),
      y: useTransform(smoothMouseY, [-1, 1], [12, -12]),
      className: "absolute -top-8 -right-4 md:right-8 w-28 h-36 md:w-36 md:h-44 rounded-xl rotate-[12deg] shadow-xl",
      delay: 0.1
    },
    // Middle left
    {
      src: "/personality-archetype-illustrations/SOCIAL_AGREEABLENESS.jpg",
      alt: "Social Agreeableness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [25, -25]),
      y: useTransform(smoothMouseY, [-1, 1], [-8, 8]),
      className: "absolute top-1/3 -left-12 md:-left-16 w-24 h-32 md:w-28 md:h-36 rounded-xl shadow-lg",
      delay: 0.2
    },
    // Middle right
    {
      src: "/personality-archetype-illustrations/INVESTIGATIVE_EXTRAVERSION.jpg",
      alt: "Investigative Extraversion archetype",
      x: useTransform(smoothMouseX, [-1, 1], [-18, 18]),
      y: useTransform(smoothMouseY, [-1, 1], [-15, 15]),
      className: "absolute top-1/4 -right-8 md:-right-12 w-28 h-36 md:w-32 md:h-44 rounded-2xl rotate-[6deg] shadow-xl",
      delay: 0.15
    },
    // Bottom left
    {
      src: "/personality-archetype-illustrations/REALISTIC_CONSCIENTIOUSNESS.jpg",
      alt: "Realistic Conscientiousness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [12, -12]),
      y: useTransform(smoothMouseY, [-1, 1], [-20, 20]),
      className: "absolute -bottom-6 left-0 md:left-12 w-28 h-36 md:w-32 md:h-40 rounded-xl rotate-[-4deg] shadow-lg",
      delay: 0.25
    },
    // Bottom right
    {
      src: "/personality-archetype-illustrations/SOCIAL_OPENNESS.jpg",
      alt: "Social Openness archetype",
      x: useTransform(smoothMouseX, [-1, 1], [-15, 15]),
      y: useTransform(smoothMouseY, [-1, 1], [-12, 12]),
      className: "absolute -bottom-4 -right-6 md:right-4 w-32 h-40 md:w-40 md:h-48 rounded-2xl rotate-[8deg] shadow-xl",
      delay: 0.3
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto px-5 md:px-10 lg:px-16">
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
              className="object-cover rounded-[inherit]"
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
