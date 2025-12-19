"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useProposalModal } from "@/lib/proposal-modal-context";
import { Button } from "./button";
import Image from "next/image";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { openModal } = useProposalModal();

  return (
    <section className="py-20 md:py-30 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#ACF7B2] rounded-[12px] p-[80px] text-center overflow-hidden"
        >
          <Image
            src="/cta-bg.png"
            alt=""
            fill
            className="object-cover opacity-10 pointer-events-none"
          />
          <div className="relative z-10">
            <h2 className="font-heading text-[30px] font-medium text-[#13271C] mb-8 max-w-4xl mx-auto leading-tight">
              Join hundreds of schools nationwide using Willow Education to increase economic mobility for their students.
            </h2>
            <Button onClick={openModal} variant="primary">
              Request a proposal
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
