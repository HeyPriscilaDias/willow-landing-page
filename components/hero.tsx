"use client";

import { motion } from "framer-motion";
import { GreyPlaceholder } from "./grey-placeholder";
import { useProposalModal } from "@/lib/proposal-modal-context";

export function Hero() {
  const { openModal } = useProposalModal();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
              Unlock Economic Mobility Through Career Exploration
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Willow Education provides a comprehensive career exploration
              curriculum and platform designed to significantly increase
              economic mobility for students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={openModal}
                className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg shadow-lg"
              >
                Request a Proposal
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg border-2 border-gray-900">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right Column - Hero Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <GreyPlaceholder aspectRatio="square" className="w-full shadow-2xl">
              <p className="text-gray-500 text-sm text-center px-4">
                product screen shot of curriculum (lesson plan and slides)
              </p>
            </GreyPlaceholder>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
