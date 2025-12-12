"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clipboard, Rocket, TrendUp, Icon } from "phosphor-react";
import type { IconProps } from "phosphor-react";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Plan",
    description:
      "Work with our team to design a career exploration program tailored to your school's needs and goals.",
    icon: Clipboard,
  },
  {
    number: 2,
    title: "Launch",
    description:
      "Implement our curriculum with comprehensive training and support for educators. Students begin their career exploration journey.",
    icon: Rocket,
  },
  {
    number: 3,
    title: "Refine & Grow",
    description:
      "Use data insights to measure impact and continuously improve. Scale successful programs across your district.",
    icon: TrendUp,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            How Does It Work?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative"
    >
      <div className="bg-white rounded-2xl p-8 h-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
          className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center mb-6"
        >
          <Icon size={32} weight="regular" className="text-white" />
        </motion.div>

        {/* Step Number */}
        <div className="text-sm font-semibold text-gray-500 mb-2">
          STEP {step.number}
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl font-semibold text-gray-900">
          {step.title}
        </h3>
      </div>
    </motion.div>
  );
}
