"use client";

import { motion } from "framer-motion";
import { GreyPlaceholder } from "./grey-placeholder";
import { useProposalModal } from "@/lib/proposal-modal-context";
import { Button } from "./button";
import Link from "next/link";

export function Hero() {
  const { openModal } = useProposalModal();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 md:py-30">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="font-heading text-[32px] md:text-5xl lg:text-[60px] font-medium text-heading mb-6 leading-tight">
              Unlock economic mobility through career exploration
            </h1>
            <p className="text-base text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
              A comprehensive career exploration curriculum and platform designed
              to significantly increase economic mobility for students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={openModal}>
                Request a proposal
              </Button>
              <Link href="/curriculum-sample">
                <Button variant="secondary">
                  Get a curriculum sample
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Hero Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <GreyPlaceholder aspectRatio="square" className="w-full shadow-subtle">
              <p className="text-secondary text-sm text-center px-4">
                product screen shot of curriculum (lesson plan and slides)
              </p>
            </GreyPlaceholder>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
