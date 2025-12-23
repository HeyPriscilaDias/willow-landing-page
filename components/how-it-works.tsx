"use client";

import Image from "next/image";

interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: "Plan",
    description:
      "Assess district needs and draft a custom implementation plan for advisory or seminar blocks.",
    icon: "/how-it-works/plan.svg",
  },
  {
    title: "Launch",
    description:
      "Seamless staff onboarding and student launch to start the curriculum on day one.",
    icon: "/how-it-works/launch.svg",
  },
  {
    title: "Refine & Grow",
    description:
      "Ongoing data tracking, observations, and coaching for long-term success.",
    icon: "/how-it-works/refine.svg",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-5xl mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-heading mb-6">
            A Proven Roadmap That Doesn&apos;t Add to Your Workload
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We know your team is at capacity. That&apos;s why we don&apos;t just give you a login; we provide a{" "}
            <span className="relative inline-block font-semibold text-gray-900">
              ready to deliver curriculum
              <svg className="absolute bottom-0 left-0 w-full h-2" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M2 5c40-1 80 1 120 0s50 1 76 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
              </svg>
            </span>{" "}
            and a{" "}
            <span className="relative inline-block font-semibold text-gray-900">
              dedicated success partner
              <svg className="absolute bottom-0 left-0 w-full h-2" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M2 4c50 1 100-1 150 0c16 .3 32 0 46 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
              </svg>
            </span>{" "}
            to ensure a seamless launch and long-term results.
          </p>
        </div>

        {/* Steps - Horizontal Row */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-[280px] mx-auto md:mx-0">
              {/* Icon */}
              <div className="w-16 h-16 mb-4 relative">
                <Image
                  src={step.icon}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg font-medium text-heading mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
