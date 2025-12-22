"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FinalCTA } from "@/components/final-cta";
import {
  CheckCircle,
  XCircle,
  MinusCircle,
  TrendUp,
  Book,
  Path,
} from "phosphor-react";

export default function WillowVsOthersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <HeroSection />

        {/* KPI Cards Section */}
        <KPICardsSection />

        {/* Comparison Table */}
        <ComparisonTableSection />

        {/* Science of Reading Section */}
        <ScienceOfReadingSection />

        {/* Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
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
            From Graduation Compliance to Economic Mobility
          </h1>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-3xl">
            Legacy platforms help you track who graduates. Willow helps you ensure they thrive. We provide a structured, data-driven roadmap designed to meet district KPIs and break the cycle of student debt.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function KPICardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: TrendUp,
      heading: "50% Higher ROI Pathways",
      body: "The only platform prioritizing program-level ROI. Pilot students were 50% more likely to select high-value pathways.",
    },
    {
      icon: Book,
      heading: "150+ Scripted Lessons",
      body: "Zero-prep, turnkey curriculum that fits directly into existing advisory blocks. No additional work for overstretched staff.",
    },
    {
      icon: Path,
      heading: "220,000+ Vetted Pathways",
      body: "Serve the 40% seeking professional certificates. Trade schools and professional programs side-by-side with college.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-card p-8 border border-gray-100"
            >
              <div className="w-12 h-12 bg-[#062F29] rounded-full flex items-center justify-center mb-6">
                <card.icon size={24} weight="regular" className="text-white" />
              </div>
              <h3 className="font-heading text-xl font-medium text-heading mb-3">
                {card.heading}
              </h3>
              <p className="text-secondary leading-relaxed">
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonTableSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const competitors = ["Willow", "SchooLinks", "Xello", "Naviance", "Overgrad"];

  const features = [
    {
      name: "Mission Aligned",
      subtitle: "Nonprofit or PBC",
      values: [
        { status: "check", note: "Public Benefit Corporation" },
        { status: "x", note: "" },
        { status: "x", note: "" },
        { status: "x", note: "" },
        {
          status: "partial",
          note: "Mission oriented, but not PBC or nonprofit",
        },
      ],
    },
    {
      name: "Quality indicators",
      subtitle: "",
      values: [
        { status: "check", note: "Personalized, program-level ROI projections" },
        { status: "x", note: "" },
        { status: "x", note: "" },
        { status: "x", note: "" },
        { status: "check", note: "Completion rates for institution" },
      ],
    },
    {
      name: "College & Professional Programs",
      subtitle: "",
      values: [
        {
          status: "check",
          note: "220k+ programs, Only platform with both college & professional programs",
        },
        { status: "x", note: "College only" },
        { status: "x", note: "College only" },
        {
          status: "partial",
          note: "College only, but districts can add industry partners",
        },
        {
          status: "partial",
          note: "College only, but districts can add industry partners",
        },
      ],
    },
    {
      name: "AI-native",
      subtitle: "",
      values: [
        {
          status: "check",
          note: "Alma, our friendly and safe AI counselor supports at every step",
        },
        { status: "x", note: "" },
        { status: "x", note: "" },
        { status: "x", note: "" },
        { status: "x", note: "" },
      ],
    },
    {
      name: "Career Exploration",
      subtitle: "",
      values: [
        { status: "check", note: "Fun assessment, and short-form video content" },
        {
          status: "check",
          note: "Some career assessments, exposure and exploration content",
        },
        { status: "check", note: "Strong career exploration tools" },
        { status: "partial", note: "Some assessments & career resources" },
        { status: "partial", note: "Basic tools from O-Net" },
      ],
    },
    {
      name: "Comprehensive curriculum",
      subtitle: "",
      values: [
        {
          status: "check",
          note: "High quality instructional materials >150 lessons in easy-to-use modules",
        },
        { status: "partial", note: "" },
        { status: "partial", note: "" },
        { status: "x", note: "" },
        { status: "x", note: "" },
      ],
    },
  ];

  const StatusIcon = ({
    status,
  }: {
    status: "check" | "x" | "partial";
  }) => {
    switch (status) {
      case "check":
        return (
          <CheckCircle
            size={28}
            weight="fill"
            className="text-green-600"
          />
        );
      case "x":
        return (
          <XCircle size={28} weight="fill" className="text-red-500" />
        );
      case "partial":
        return (
          <MinusCircle
            size={28}
            weight="fill"
            className="text-amber-500"
          />
        );
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-medium text-heading w-[200px]"></th>
                  {competitors.map((competitor, index) => (
                    <th
                      key={competitor}
                      className={`text-center py-4 px-4 font-heading text-lg font-medium ${
                        index === 0
                          ? "text-[#062F29] bg-[#062F29]/5 rounded-t-lg"
                          : "text-heading"
                      }`}
                    >
                      {competitor}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, rowIndex) => (
                  <tr
                    key={feature.name}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    <td className="py-6 px-4 align-top">
                      <div className="font-medium text-heading">
                        {feature.name}
                      </div>
                      {feature.subtitle && (
                        <div className="text-sm text-secondary mt-1">
                          {feature.subtitle}
                        </div>
                      )}
                    </td>
                    {feature.values.map((value, colIndex) => (
                      <td
                        key={colIndex}
                        className={`py-6 px-4 text-center align-top ${
                          colIndex === 0 ? "bg-[#062F29]/5" : ""
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <StatusIcon
                            status={value.status as "check" | "x" | "partial"}
                          />
                          {value.note && (
                            <span className="text-xs text-secondary max-w-[140px]">
                              {value.note}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="bg-white rounded-card p-6 border border-gray-200"
              >
                <h3 className="font-heading text-lg font-medium text-heading mb-1">
                  {feature.name}
                </h3>
                {feature.subtitle && (
                  <p className="text-sm text-secondary mb-4">
                    {feature.subtitle}
                  </p>
                )}
                <div className="space-y-3">
                  {competitors.map((competitor, index) => (
                    <div
                      key={competitor}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        index === 0 ? "bg-[#062F29]/5" : "bg-gray-50"
                      }`}
                    >
                      <StatusIcon
                        status={
                          feature.values[index].status as
                            | "check"
                            | "x"
                            | "partial"
                        }
                      />
                      <div className="flex-1">
                        <div
                          className={`font-medium ${
                            index === 0 ? "text-[#062F29]" : "text-heading"
                          }`}
                        >
                          {competitor}
                        </div>
                        {feature.values[index].note && (
                          <div className="text-xs text-secondary mt-1">
                            {feature.values[index].note}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ScienceOfReadingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-medium text-heading mb-6">
            The &ldquo;Science of Reading&rdquo; for Postsecondary Success.
          </h2>
          <p className="text-lg text-secondary leading-relaxed">
            Just as the &ldquo;Science of Reading&rdquo; replaced guessing with structure, Willow replaces &ldquo;career exposure&rdquo; with a data-backed process. Most platforms are just libraries of options; Willow is the literacy required to navigate them. We don&rsquo;t just add a tool to your district; we provide a proven framework for mobility.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

