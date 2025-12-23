"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FinalCTA } from "@/components/final-cta";

export default function AboutPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const challengeRef = useRef(null);
  const challengeInView = useInView(challengeRef, { once: true, margin: "-100px" });

  const solutionRef = useRef(null);
  const solutionInView = useInView(solutionRef, { once: true, margin: "-100px" });

  const progressRef = useRef(null);
  const progressInView = useInView(progressRef, { once: true, margin: "-100px" });

  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-16">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-heading mb-6 leading-tight">
                Why we&apos;re building Willow
              </h1>
              <p className="text-secondary text-base leading-relaxed">
                (TL;DR: The system is broken, but it&apos;s fixable. We&apos;re helping 10 million students find their best-fit next step by 2033.)
              </p>
            </motion.div>
          </div>
        </section>

        {/* Personal Note Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="font-heading text-2xl md:text-3xl font-medium text-heading mb-6 flex items-center flex-wrap gap-2">
                <span>A note from our</span>
                <span className="relative inline-block w-[80px] h-[50px] md:w-[100px] md:h-[60px] rounded-full overflow-hidden">
                  <Image
                    src="/about-is-assets/james-cryan-profile.jpeg"
                    alt="James Cryan"
                    fill
                    className="object-cover"
                  />
                </span>
                <span>founder</span>
              </h4>
              <div className="space-y-6 text-secondary text-base leading-relaxed">
                <p>
                  My wife Liz is a pediatrician. Anyone who knows us well knows that I delight in drawing way too many comparisons between the challenges in our healthcare system and our education system.
                </p>
                <p>
                  In medicine, we don&apos;t just give a patient a &ldquo;passing grade&rdquo; and send them on their way; we look at outcomes. Yet, in education, we&apos;ve spent decades focusing on the input (getting students into college) without enough honesty about the output (whether they actually graduate and find economic mobility).
                </p>
                <p>
                  I spent years leading charter schools, and I&apos;ll be the first to admit: I was wrong about a lot of things. I used to think a &ldquo;college-for-all&rdquo; mantra was the only way to ensure equity. But the data tells a different, more complicated story.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-16 md:py-20 bg-white">
          <motion.div
            ref={challengeRef}
            initial={{ opacity: 0, y: 30 }}
            animate={challengeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Header */}
            <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-16 mb-16 md:mb-20">
              <h4 className="font-heading text-2xl md:text-3xl font-medium text-heading mb-6">
                The challenge: a system in crisis
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                We have to be honest about the reality our students are facing:
              </p>
            </div>

            {/* Three Column Grid */}
            <div className="max-w-5xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row justify-start items-start gap-12 md:gap-12 lg:gap-16 mb-16">
              <div className="flex flex-col items-start max-w-[280px]">
                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src="/about-is-assets/completion-gap-icon.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading text-lg font-medium text-heading mb-2">
                  The completion gap
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  85% of students from low-income households don&apos;t complete college by age 24.
                </p>
              </div>

              <div className="flex flex-col items-start max-w-[280px]">
                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src="/about-is-assets/debt-trap.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading text-lg font-medium text-heading mb-2">
                  The debt trap
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  There is currently $300 billion in debt held by 40 million people who didn&apos;t even finish their degree.
                </p>
              </div>

              <div className="flex flex-col items-start max-w-[280px]">
                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src="/about-is-assets/underemployment-trap.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading text-lg font-medium text-heading mb-2">
                  The underemployment trap
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  More than half of recent college graduates are underemployed a year after they finish school.
                </p>
              </div>
            </div>

            {/* Closing statement */}
            <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-16">
              <p className="text-gray-600 text-base leading-relaxed">
                For a student taking on debt, this isn&apos;t just disappointing—it&apos;s devastating. We call it &ldquo;random acts of dual enrollment&rdquo; or &ldquo;prestige chasing,&rdquo; but the result is the same: students dropping out with debt and no clear path forward.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Platform Statement Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-5 md:px-10 lg:px-16">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-heading text-xl md:text-2xl leading-relaxed"
            >
              We&apos;ve built a student success platform that simplifies the noise. Whether it&apos;s an apprenticeship, a certification, or a four-year degree, we help students find their best-fit, best-quality education next step.
            </motion.p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 md:py-20 bg-white">
          <motion.div
            ref={solutionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={solutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Header */}
            <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-16 mb-16 md:mb-20">
              <h4 className="font-heading text-2xl md:text-3xl font-medium text-heading mb-6">
                The Willow solution: beyond &ldquo;college vs. career&rdquo;
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                At Willow, we don&apos;t believe in a &ldquo;college vs. workforce&rdquo; binary. It&apos;s about college AND professional pathways. Equity requires transparency about costs, outcomes, and quality.
              </p>
            </div>

            {/* Three Column Grid */}
            <div className="max-w-5xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row justify-start items-start gap-12 md:gap-12 lg:gap-16">
              <div className="flex flex-col items-start max-w-[280px]">
                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src="/about-is-assets/roi-transparency.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading text-lg font-medium text-heading mb-2">
                  ROI transparency
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We provide personalized ROI projections so students understand the financial impact of their choices before they sign on the dotted line.
                </p>
              </div>

              <div className="flex flex-col items-start max-w-[280px]">
                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src="/about-is-assets/comprehensive-pathways.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading text-lg font-medium text-heading mb-2">
                  Comprehensive pathways
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our database includes 220,000+ verified programs, from traditional degrees to high-quality professional certifications.
                </p>
              </div>

              <div className="flex flex-col items-start max-w-[280px]">
                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src="/about-is-assets/ai-powered-support.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading text-lg font-medium text-heading mb-2">
                  AI-powered support
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our 24/7 career coach, Alma, ensures that no student has to navigate these massive life decisions alone.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Progress Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-16">
            <motion.div
              ref={progressRef}
              initial={{ opacity: 0, y: 30 }}
              animate={progressInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="font-heading text-2xl md:text-3xl font-medium text-heading mb-4">
                Our progress (and where we&apos;re going)
              </h4>
              <div className="space-y-6 text-secondary text-base leading-relaxed">
                <p>
                  We are a Public Benefit Corporation founded in 2023 with a &ldquo;North Star&rdquo; goal: <strong className="text-heading">Help 10 million students realize their full potential by 2033.</strong>
                </p>
                <p>
                  It&apos;s working. In our early pilots, students using Willow were 50% more likely to choose high-ROI programs compared to their peers. We&apos;re currently partnering with forward-thinking districts like DSST Public Schools to prove that when students have better information, they make better lives.
                </p>
                <p>
                  Join us in building a better map for the next generation. Onwards,
                </p>
              </div>
              <Image
                src="/about-is-assets/james-cryan-signature.png"
                alt="James Cryan signature"
                width={270}
                height={90}
                className="mt-8"
              />
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-16">
            <motion.div
              ref={teamRef}
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-heading mb-4">
                The team
              </h2>
              <p className="text-secondary text-base leading-relaxed mb-8">
                We&apos;re a group of educators, designers, and builders who believe the system is fixable.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-1 bg-[#ACF7B2] rounded-full" />
                  <div>
                    <a href="https://www.linkedin.com/in/jamescryan/" target="_blank" rel="noopener noreferrer" className="font-semibold text-heading hover:underline">James Cryan, Founder &amp; CEO</a>
                    <p className="text-secondary text-base leading-relaxed">
                      The founder and former CEO of Rocky Mountain Prep—one of Colorado&apos;s most successful public charter school networks—James carries with him over 15 years of experience in the education sector. He believes all learners deserve support to navigate their post-secondary education journey with confidence.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-1 bg-[#ACF7B2] rounded-full" />
                  <div>
                    <a href="https://www.linkedin.com/in/jaime-hudgins/" target="_blank" rel="noopener noreferrer" className="font-semibold text-heading hover:underline">Jaime Hudgins</a>
                    <p className="text-secondary text-base leading-relaxed">
                      Lorem ipsum.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-1 bg-[#ACF7B2] rounded-full" />
                  <div>
                    <a href="https://www.linkedin.com/in/ryan-york-148356a9/" target="_blank" rel="noopener noreferrer" className="font-semibold text-heading hover:underline">Ryan York, Chief Product &amp; Technology Officer</a>
                    <p className="text-secondary text-base leading-relaxed">
                      Ryan has worked in education for 18 years as a teacher, instructional coach, principal, and charter school founder/co-CEO. He began writing software over a decade ago, creating online tools for teachers. He went on to design a computer science curriculum and learning management platform that served over 10,000 students and won the Sally Ride &amp; Deloitte National Award for Innovation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
