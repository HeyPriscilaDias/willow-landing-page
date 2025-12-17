"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface Step {
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    title: "Plan",
    description:
      "Assess needs, determine how to partner (advisory, seminar, etc.), draft implementation plan/SAS.",
    image: "/plan.png",
  },
  {
    title: "Kickoff",
    description:
      "Onboard staff, get kids on platform, start curriculum.",
    image: "/launch.png",
  },
  {
    title: "Refine & Grow",
    description:
      "Continuous data tracking, observations, coaching, etc.",
    image: "/grow.png",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-30 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-heading mb-4">
            How does it work?
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Our proven three-step process makes it easy to bring transformative
            career exploration to your school.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative h-full"
    >
      <div className="relative bg-[#062F29] rounded-[12px] pt-6 px-6 pb-10 h-full overflow-hidden flex flex-col">
        {/* Decorative Illustration */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3, type: "spring", bounce: 0.4 }}
          className="relative w-full h-[280px] flex-shrink-0 mb-8"
        >
          <Image
            src={step.image}
            alt=""
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Content */}
        <div className="text-center">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
            className="font-heading text-2xl md:text-3xl font-medium text-white mb-4"
          >
            {step.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
            className="text-white/90 leading-relaxed text-base"
          >
            {step.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
