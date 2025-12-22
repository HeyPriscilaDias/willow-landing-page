"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GreyPlaceholder } from "./grey-placeholder";

interface Feature {
  title: string;
  description: string;
  imagePlaceholder: string;
  customImage?: string;
  customBgColor?: string;
}

const features: Feature[] = [
  {
    title: "ROI-Focused Discovery",
    description:
      "Compare 220,000+ college and professional programs side-by-side with personalized ROI projections.",
    imagePlaceholder: "Recommendation Engine / ROI Dashboard",
    customImage: "/feature-assets/personalized-roi.png",
    customBgColor: "#D8FBDB",
  },
  {
    title: "Career Discovery with Short-Form Videos",
    description:
      "Meet students where they are with an engaging, video-first discovery experience. Willow offers a library of short-form, \"day-in-the-life\" social media videos that bring careers to life. Combined with psychometric assessments, students can explore high-growth, high-paying roles through the eyes of real professionals rather than just reading static job descriptions.",
    imagePlaceholder: "Scripted Lesson / Curriculum View",
    customImage: "/feature-assets/short-videos.gif",
  },
  {
    title: "Alma: Scaling Personalized Guidance",
    description:
      "Bridge the gap between student needs and counselor capacity with Alma, our AI-native mentor. By automating routine career exploration and data-driven program matching, Alma provides every student with 24/7 personalized guidance. This scalable support ensures no student falls through the cracks while freeing your staff to focus on high-impact, 1-on-1 interventions.",
    imagePlaceholder: "Alma AI Chat Interface",
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
        {feature.customImage ? (
          <div
            className={`w-full overflow-hidden rounded-[12px] ${feature.customBgColor ? "py-8 pl-8 lg:py-12 lg:pl-12" : ""}`}
            style={{
              backgroundColor: feature.customBgColor,
            }}
          >
            <Image
              src={feature.customImage}
              alt={feature.title}
              width={800}
              height={600}
              unoptimized
              className={`w-full h-auto block ${feature.customBgColor ? "" : "rounded-[12px]"}`}
              style={{
                filter: feature.customBgColor ? "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))" : "none",
              }}
            />
          </div>
        ) : (
          <GreyPlaceholder aspectRatio="video" className="w-full">
            <span className="text-gray-500 text-sm text-center px-4">
              {feature.imagePlaceholder}
            </span>
          </GreyPlaceholder>
        )}
      </div>

      {/* Content */}
      <div className={`${reverse ? "lg:order-1" : ""}`}>
        <h4 className="text-heading mb-4">
          {feature.title}
        </h4>
        <p className="text-secondary text-base leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
