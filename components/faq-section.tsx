"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "phosphor-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What grade levels does Willow Education serve?",
    answer:
      "Willow Education serves students in grades 6-12. Our curriculum is designed to be age-appropriate and scalable, with content tailored to middle school and high school learners.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Typical implementation takes 4-6 weeks from contract signing to launch. This includes educator training, platform setup, and curriculum customization to meet your school's specific needs.",
  },
  {
    question: "What kind of training is provided for educators?",
    answer:
      "We provide comprehensive professional development including online training modules, live workshops, ongoing support, and access to our educator community. Training covers curriculum delivery, platform navigation, and best practices for career exploration.",
  },
  {
    question: "How do you measure student outcomes?",
    answer:
      "Our platform tracks multiple metrics including student engagement, assessment completion, career interest development, and skill growth. We provide detailed analytics dashboards and custom reports to demonstrate program impact.",
  },
  {
    question: "Can the curriculum be customized for our school?",
    answer:
      "Yes! We work closely with each partner to customize curriculum content, align with district goals, and incorporate local career opportunities and industry partnerships.",
  },
  {
    question: "What kind of ongoing support do you provide?",
    answer:
      "Partners receive dedicated account management, technical support, regular check-ins, access to our resource library, and continuous curriculum updates based on the latest research and best practices.",
  },
  {
    question: "How much does Willow Education cost?",
    answer:
      "Pricing varies based on school size, grade levels served, and implementation scope. We offer flexible pricing models and work within school budgets. Request a proposal to receive a customized quote for your school.",
  },
  {
    question: "Is Willow Education research-backed?",
    answer:
      "Absolutely. Our curriculum is built on extensive research in career development, economic mobility, and student engagement. We partner with leading researchers and continuously evaluate program effectiveness.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about partnering with Willow Education.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-heading font-semibold text-gray-900 text-lg">
          {faq.question}
        </span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <Minus size={24} weight="regular" className="text-gray-700" />
          ) : (
            <Plus size={24} weight="regular" className="text-gray-700" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
