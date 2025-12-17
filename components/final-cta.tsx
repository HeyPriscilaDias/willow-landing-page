"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useProposalModal } from "@/lib/proposal-modal-context";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { openModal } = useProposalModal();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Ready to transform career readiness at your school?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join hundreds of schools nationwide using Willow Education to
            increase economic mobility for their students. Request a proposal
            today to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openModal}
              className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg"
            >
              Request a Proposal
            </button>
            <button className="bg-transparent text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold text-lg border-2 border-white">
              Schedule a Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
