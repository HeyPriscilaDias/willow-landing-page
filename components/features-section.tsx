"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GreyPlaceholder } from "./grey-placeholder";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Curriculum-led",
    description:
      "Our comprehensive curriculum guides students through a structured journey of self-discovery and career exploration, ensuring every learner has the foundation to make informed decisions about their future.",
  },
  {
    title: "Personality Quiz",
    description:
      "Students complete an engaging personality assessment that reveals their unique strengths, work preferences, and natural talents, providing valuable insights to guide their career exploration journey.",
  },
  {
    title: "Alma AI",
    description:
      "Meet Alma, our AI-powered assistant that provides personalized guidance and answers students' questions about career pathways, programs, and opportunities in real-time.",
  },
  {
    title: "Career Exploration",
    description:
      "Students explore hundreds of career options through interactive tools that showcase job responsibilities, salary ranges, required education, and real-world career trajectories.",
  },
  {
    title: "College and Professional Program Exploration",
    description:
      "Discover best-fit educational pathways with our comprehensive database of colleges, universities, and professional programs, complete with ROI data, completion rates, and program outcomes.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Everything You Need to Transform Career Readiness
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            By helping students make quality next steps, we can transform the
            economic and social mobility of communities.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureBlock
              key={index}
              feature={feature}
              index={index}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({
  feature,
  index,
  reverse,
}: {
  feature: Feature;
  index: number;
  reverse: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image Placeholder */}
      <div className={`${reverse ? "lg:order-2" : ""}`}>
        <GreyPlaceholder aspectRatio="video" className="w-full" />
      </div>

      {/* Content */}
      <div className={`${reverse ? "lg:order-1" : ""}`}>
        <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          {feature.description}
        </p>
        <button className="text-gray-900 font-semibold hover:text-gray-700 transition-colors inline-flex items-center gap-2 border-b-2 border-gray-900 pb-1">
          Learn More
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </motion.div>
  );
}
