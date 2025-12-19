"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button";
import { GreyPlaceholder } from "@/components/grey-placeholder";
import { ProposalForm } from "@/components/proposal-form";
import { useProposalModal } from "@/lib/proposal-modal-context";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  MinusCircle,
  Buildings,
  Robot,
  Books,
} from "phosphor-react";

export default function WillowVsOthersPage() {
  const { isOpen, closeModal, openModal } = useProposalModal();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <HeroSection openModal={openModal} />

        {/* Three Cards Section */}
        <ThreeCardsSection />

        {/* Feature Section 1: College & Professional Programs */}
        <FeatureSection
          title="College & Professional Programs"
          description="Access over 220,000 programs across colleges, universities, trade schools, bootcamps, and professional certifications. Willow is the only platform that combines both college and professional programs in one place, giving students a complete picture of their postsecondary options."
          reverse={false}
        />

        {/* Feature Section 2: ROI Projections */}
        <FeatureSection
          title="ROI Projections"
          description="Make informed decisions with personalized, program-level ROI projections. Students can see expected earnings, costs, and time to completion for each pathway, helping them choose programs that maximize their economic mobility."
          reverse={true}
        />

        {/* Comparison Table */}
        <ComparisonTableSection />
      </main>
      <Footer />
      <ProposalForm isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

function HeroSection({ openModal }: { openModal: () => void }) {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-24 pb-16 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-5 md:px-10 max-w-4xl mx-auto"
      >
        <div className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-full mb-6">
          <span className="text-sm font-medium text-primary">
            Platform comparison
          </span>
        </div>
        <h1 className="font-heading text-[32px] md:text-5xl lg:text-[60px] font-medium text-heading mb-6 leading-tight">
          Willow vs Others
        </h1>
        <p className="text-base md:text-lg text-secondary mb-8 max-w-2xl mx-auto">
          See how Willow compares to other career exploration platforms. Our
          mission-driven approach, AI-native technology, and comprehensive
          curriculum set us apart.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={openModal}>Request a proposal</Button>
          <Link href="/curriculum-sample">
            <Button variant="secondary">Get a curriculum sample</Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function ThreeCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: Buildings,
      title: "Mission Aligned",
      description:
        "As a Public Benefit Corporation, our mission is baked into our charter. We exist to increase economic mobility for students, not to maximize profits.",
    },
    {
      icon: Robot,
      title: "AI-Native",
      description:
        "Meet Alma, our friendly and safe AI counselor. Alma supports students at every step of their journey, providing personalized guidance 24/7.",
    },
    {
      icon: Books,
      title: "Comprehensive",
      description:
        "Over 150 lesson modules covering self-discovery, career exploration, program research, and application support. A complete curriculum, not just a tool.",
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
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-card p-8 border border-gray-100"
            >
              <div className="w-12 h-12 bg-[#062F29] rounded-full flex items-center justify-center mb-6">
                <card.icon size={24} weight="regular" className="text-white" />
              </div>
              <h3 className="font-heading text-xl font-medium text-heading mb-3">
                {card.title}
              </h3>
              <p className="text-secondary leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureSection({
  title,
  description,
  reverse,
}: {
  title: string;
  description: string;
  reverse: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
        >
          {/* Image Placeholder */}
          <div className={`${reverse ? "lg:order-2" : ""}`}>
            <GreyPlaceholder aspectRatio="video" className="w-full" />
          </div>

          {/* Content */}
          <div className={`${reverse ? "lg:order-1" : ""}`}>
            <h3 className="font-heading text-2xl sm:text-3xl font-medium text-heading mb-4">
              {title}
            </h3>
            <p className="text-secondary text-lg mb-6 leading-relaxed">
              {description}
            </p>
            <button className="text-content-link font-semibold hover:text-[#025f80] transition-colors inline-flex items-center gap-2 border-b-2 border-content-link pb-1">
              Learn More
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
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
      name: "Quality Indicators",
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
      name: "Comprehensive Curriculum",
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
          <h2 className="font-heading text-3xl sm:text-4xl font-medium text-heading mb-4 text-center">
            Willow compared
          </h2>
          <p className="text-secondary text-lg text-center mb-12 max-w-2xl mx-auto">
            See how Willow stacks up against other career exploration platforms
          </p>

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
