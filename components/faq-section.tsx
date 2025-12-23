"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What makes this product truly different from all the other college and career planning tools out there?",
    answer:
      "I've spent most of my career in schools, and I've seen firsthand how \"prestige\" often wins over \"quality\" in the college search. Most tools focus on where a student can get in. Willow focuses on where they will thrive and actually finish. We are the only platform that prioritizes ROI transparency across more than 220,000 programs—including professional pathways like apprenticeships and certifications that other tools often treat as an afterthought.",
  },
  {
    question: "We already have a lot of tools. How is Willow different?",
    answer:
      "My wife Liz often reminds me that adding more \"stuff\" to a doctor's plate doesn't necessarily make the patient healthier; it just makes the doctor more tired. We didn't build Willow to be \"one more thing\" for counselors. We built it to be the \"one thing\" that actually works. Unlike legacy platforms that feel like a compliance checklist, Willow is mobile-first and built for student engagement. We simplify state-specific ICAP reporting so you can stop chasing paperwork and start chasing outcomes.",
  },
  {
    question: "Does this program only focus on students going to college, or does it help students who want other career paths?",
    answer:
      "This is personal for me. For too long, we've framed this as \"college vs. workforce,\" but the reality is it's about \"college and professional pathways\". Every student deserves high-quality guidance. Whether a student is aiming for a four-year degree, a debt-free certification, or a high-paying apprenticeship, Willow provides the same level of data and ROI analysis. We believe that quality matters more than the name of the credential.",
  },
  {
    question: "How does Willow actually improve key student results?",
    answer:
      "We believe that when you give students better data, they make better choices. It's not just a theory—it's working. In our early work with partners like DSST Public Schools, students using Willow were 50% more likely to choose high-ROI programs. By helping students avoid \"bad investments\" (high debt, low outcomes), we are directly impacting their long-term economic mobility.",
  },
  {
    question: "How does the AI make results 10 times better than what we do now?",
    answer:
      "Think about the typical counselor's caseload. It's impossible to give every student 24/7 personalized attention. That's where Alma, our AI career coach, comes in. Alma doesn't just answer questions; she provides personalized guidance and automated check-ins based on each student's unique goals. Our team includes experts like Juan, who helped design Khan Academy's AI tools, so we're bringing that same level of \"cutting-edge\" support to the postsecondary maze.",
  },
  {
    question: "What grade levels does Willow serve?",
    answer:
      "While the \"stress\" of the transition hits hardest in 12th grade, we believe the planning must start much earlier. Willow is primarily designed for high school students (grades 9-12), helping them build a digital portfolio and a meaningful plan over their entire high school career.",
  },
  {
    question: "What level of staff involvement does Willow require, and how can we set our team up for success?",
    answer:
      "We know counselors are overwhelmed. Willow is designed to be a \"force multiplier\" for your team, not a burden. We recommend identifying a small group of \"champions\"—usually counselors or career advisors—who can lead the rollout. Because the platform automates so much of the progress tracking and reporting, it actually frees up staff time to have deeper, more human conversations with students.",
  },
  {
    question: "How does Willow fit into our existing schedule and programming?",
    answer:
      "We've built Willow to be flexible. Whether you have a dedicated \"Advisory\" period, a CTE block, or you integrate it into senior seminars, the platform's mobile-first design means students can engage with it whenever and wherever they are.",
  },
  {
    question: "What is the setup process like?",
    answer:
      "We aim for \"simple and meaningful\". The process starts with a kickoff to align Willow with your district's specific goals and ICAP requirements. We handle the heavy lifting of data integration and program mapping so your team can focus on the students.",
  },
  {
    question: "What kind of ongoing support will we get to make sure the program succeeds?",
    answer:
      "We don't just \"hand over the keys\" and walk away. We provide ongoing support including automated check-ins for students and robust administrative reporting for your team. You'll have access to our team to ensure you're meeting state compliance and, more importantly, seeing the student growth you expect.",
  },
  {
    question: "What technology or materials do we need to implement Willow?",
    answer:
      "Willow is a web-based, mobile-first platform, so there's no special hardware required. As long as students have access to a smartphone, tablet, or laptop, they have everything they need to start exploring their future.",
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
            <div className="pt-4 text-base text-secondary leading-relaxed pr-10">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
