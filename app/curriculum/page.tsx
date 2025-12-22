"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button";
import { FinalCTA } from "@/components/final-cta";

interface Feature {
  title: string;
  description: string;
  image: string;
  imageScale?: number;
}

const features: Feature[] = [
  {
    title: "Fully scripted, ready-to-teach lessons",
    description:
      "Every lesson is scripted bell to bell for teachers and counselors. Willow includes timers, slide decks, graphic organizers, and checks for understanding, making implementation seamless.",
    image: "/curriculum-page-assets/img-2-willow-curriculum-script-slide-deck.avif",
  },
  {
    title: "Dynamic student portfolios",
    description:
      "Students' goals, reflections, and artifacts are automatically compiled into a digital portfolio—ideal for student-led conferences, resume building, college applications, and work-based learning.",
    image: "/curriculum-page-assets/img-3.avif",
  },
  {
    title: "AI grading & feedback",
    description:
      "Willow uses AI to provide students with individualized feedback on exit tickets—and gives teachers summaries, trends, and alerts for exceptional or concerning responses with recommended next steps.",
    image: "/curriculum-page-assets/willow-curriculum-ai-grading-feedback-exit-ticket.avif",
  },
  {
    title: "Durable skills every day",
    description:
      "Willow's curriculum is mapped to the nationally recognized Durable Skills framework, ensuring students develop core competencies like communication, collaboration, critical thinking, leadership, and resilience.",
    image: "/curriculum-page-assets/durable-skills.avif",
    imageScale: 0.7,
  },
];

function FeatureBlock({
  feature,
  reverse,
}: {
  feature: Feature;
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
      {/* Image */}
      <div className={`${reverse ? "lg:order-2" : ""} flex items-center justify-center`}>
        <Image
          src={feature.image}
          alt={feature.title}
          width={800}
          height={600}
          className="h-auto rounded-lg"
          style={{ width: feature.imageScale ? `${feature.imageScale * 100}%` : '100%' }}
        />
      </div>

      {/* Content */}
      <div className={`${reverse ? "lg:order-1" : ""}`}>
        <h3 className="font-heading text-2xl sm:text-3xl font-medium text-heading mb-4">
          {feature.title}
        </h3>
        <p className="text-secondary text-lg leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function CurriculumPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-30 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-heading mb-6 leading-tight">
                Help every student graduate with purpose
              </h1>
              <p className="text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                Willow's career and college readiness curriculum empowers students with the self-awareness, future planning, and durable skills they need to thrive during and after high school. Our rigorous lessons make it easy for educators to meet state mandates while delivering engaging, meaningful experiences for students.
              </p>
              <Link href="/curriculum-sample">
                <Button>Get a curriculum sample</Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-30 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
            <div className="space-y-24">
              {features.map((feature, index) => (
                <FeatureBlock
                  key={index}
                  feature={feature}
                  reverse={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
