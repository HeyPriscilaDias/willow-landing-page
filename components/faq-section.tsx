"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question:
      "What makes this product truly different from all the other college and career planning tools out there?",
    answer:
      "There are three things that make us different:\n\n1. Curriculum > Tech: We are a high-quality curriculum first and a platform second, because schools aren't great at using platforms to drive change and results effectively for all of their students. But they are great at having committed educators use great curriculum.\n\n2. All students: We serve all students, not just the ones who are going to college. We are the only platform on the market where you can compare a college program side by side with a high-quality professional program or a non-accredited degree pathway.\n\n3. Quality: We are honest with students and educators. We tell them which programs are working for students like them and which aren't. Throughout the Willow experience, we are constantly nudging students to higher-quality options where they will achieve economic mobility.",
  },
  {
    question:
      "We already have a lot of tools and platforms. How is Willow different?",
    answer:
      "Platform fatigue is real. We design our platform with students and educators we serve. Every time we build a new feature, we're asking them for feedback.\n\nI used to be a school leader. I've had the experience of buying EdTech tools and being disappointed with how clunky they are, how hard they are to use, how ineffective they are, and just how much training and PD is required to make them successful.\n\nI refuse to bring another subpar EdTech tool into this world, so we are highly aware and cognizant of that as we are building Willow.",
  },
  {
    question:
      "Does this program only focus on students going to college, or does it help students who want other career paths?",
    answer:
      "We are built to serve all students, not just the ones going to college.\n\nMore than 40 percent of students do not enroll in college right after high school. They deserve high-quality guidance towards a next step that leads to economic mobility.\n\nFor too long, this has been framed as college versus workforce. We see it as college and professional pathways. Whether a student is pursuing a four-year degree, a debt free certification, or a high-quality apprenticeship, Willow strives to provide the same level of data, outcomes insight, and ROI transparency so every student can make an informed choice.",
  },
  {
    question: "How does Willow actually improve key student results?",
    answer:
      "Our north star is clear: students enroll in a high-quality next step after high school that leads to economic mobility.\n\nWe define quality in simple terms:\n1) A program should have more than a 50 percent completion rate\n2) A positive projected ROI ten years out\n\nWhen students see that level of transparency, they make better choices. In early work with partners such as DSST Public Schools, students using Willow were 50 percent more likely to choose high-quality programs.\n\nBut enrollment is only part of it. Research from the Charter School Growth Fund shows that students who have nine meaningful career experiences in high school are far more likely to thrive and earn higher wages, regardless of the pathway they choose. Our curriculum is designed to deliver those experiences, help students build a strong postsecondary plan, and develop the adulting and AI fluency skills they need to flourish.\n\nYou can't be what you can't see. Willow helps students see high-quality options and act on them.",
  },
  {
    question:
      "How does the AI make results 10 times better than what we do now?",
    answer:
      "To be honest, it doesn't... yet. That is the vision, and we are moving aggressively in that direction.\n\nToday, AI increases the level of personalized support each student receives. The typical counselor cannot provide ongoing, individualized guidance to every student. Alma, our AI career coach, helps expand that capacity through regular check-ins, personalized nudges, and guidance aligned with each student's goals.\n\nIt is not magic. It is leverage. Over time, that leverage helps improve outcomes at scale.",
  },
  {
    question: "What grade levels does Willow serve?",
    answer:
      "Willow is primarily designed for high school students in grades 9-12. The stress of the transition often hits in senior year, but strong planning needs to start much earlier. Our curriculum helps students build a digital portfolio and a meaningful plan across their entire high school journey.\n\nWe are also beginning to pilot with middle schools. If you are seeing challenges or opportunities at the middle school level, we would welcome a conversation. We are actively bringing on middle school partners now and would love to have you among them.",
  },
  {
    question:
      "What level of staff involvement does Willow require, and how can we set our team up for success?",
    answer:
      "It is important to have one dedicated leader for this work. Clear ownership matters. Beyond that, we recommend identifying a small group of champions, often counselors or career advisors, who can support the rollout and model strong implementation.\n\nWe know counselors are stretched thin. Willow is designed to be a force multiplier, not an added burden. Because the platform automates progress tracking and reporting, it helps free up staff time for deeper, more meaningful conversations with students.",
  },
  {
    question:
      "How does Willow fit into our existing schedule and programming?",
    answer:
      "We've built Willow to be flexible. Whether you have a dedicated \"Advisory\" period, a CTE block, or integrate it into senior seminars, Willow is designed to enable students to engage with it whenever and wherever they are.",
  },
  {
    question: "What is the setup process like?",
    answer:
      "We aim for simple and meaningful.\n\nThe process starts with a kickoff to align Willow with your district's goals and graduation or career planning requirements. We handle the heavy lifting around data integration and program mapping so your team can stay focused on students.\n\nFrom there, we provide the professional development and coaching needed for success. We can do it for you, do it with you, or provide turnkey training so you can lead it yourself for your team.",
  },
  {
    question:
      "What kind of ongoing support will we get to make sure the program succeeds?",
    answer:
      "We don't just \"hand over the keys\" and walk away. We provide ongoing support including automated check-ins for students and robust administrative reporting for your team. You'll have access to our team to ensure you're meeting state compliance and, more importantly, seeing the student growth you expect.",
  },
  {
    question:
      "What technology or materials do we need to implement Willow?",
    answer:
      "Willow is a web-based platform, so there's no software required. As long as students have access to a tablet or laptop, they have everything they need to start exploring their future.",
  },
];

function AnimatedPlusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      {/* Horizontal line (always visible) */}
      <motion.span
        className="absolute w-4 h-0.5 bg-current rounded-full"
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Vertical line (rotates to become horizontal for minus) */}
      <motion.span
        className="absolute w-4 h-0.5 bg-current rounded-full"
        initial={false}
        animate={{ rotate: isOpen ? 0 : 90 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-30 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-heading mb-4 text-left">
                The questions we get asked most
              </h2>
              <p className="text-lg text-secondary text-left">
                Answered by our CEO, James Cryan
              </p>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-gray-200 max-w-[600px] ml-auto">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="py-5">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 text-left group"
      >
        <span className="font-sans font-semibold text-primary text-base group-hover:text-heading transition-colors">
          {faq.question}
        </span>
        <div className="flex-shrink-0 mt-1 text-primary group-hover:text-heading transition-colors">
          <AnimatedPlusIcon isOpen={isOpen} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-base text-secondary leading-relaxed pr-10 whitespace-pre-line">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
