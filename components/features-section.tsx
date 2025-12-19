"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GreyPlaceholder } from "./grey-placeholder";
import { Button } from "./button";
import Link from "next/link";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Curriculum-led",
    description:
      "Our comprehensive curriculum guides students through a structured journey from self-discovery and career exploration to postsecondary program research and application support, ensuring every learner has the foundation to make informed decisions about their future.",
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
    <section id="features" className="py-20 md:py-30 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
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
        <h3 className="font-heading text-2xl sm:text-3xl font-medium text-heading mb-4">
          {feature.title}
        </h3>
        <p className="text-secondary text-lg mb-6 leading-relaxed">
          {feature.description}
        </p>
        {index === 0 ? (
          <Link href="/curriculum-sample">
            <Button variant="secondary">
              Get a curriculum sample
            </Button>
          </Link>
        ) : index === 1 ? (
          <Link href="/personality-quiz">
            <Button variant="secondary">
              Take the quiz
            </Button>
          </Link>
        ) : (
          <button className="text-content-link font-semibold hover:text-[#025f80] transition-colors inline-flex items-center gap-2 border-b-2 border-content-link pb-1">
            Learn More
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
