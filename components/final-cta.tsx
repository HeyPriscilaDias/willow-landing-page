"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useProposalModal } from "@/lib/proposal-modal-context";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { openModal } = useProposalModal();

  return (
    <section className="py-20 md:py-30 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#ACF7B2] rounded-[12px] p-10 md:p-[80px] text-center overflow-hidden"
        >
          <Image
            src="/cta-bg.png"
            alt=""
            fill
            className="object-cover opacity-10 pointer-events-none"
          />
          <div className="relative z-10">
            <h2 className="font-heading text-[26px] md:text-[30px] font-medium text-heading mb-8 max-w-4xl mx-auto leading-tight">
              Ready to bridge the gap from graduation to career?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/curriculum-sample">
                <Button variant="white">
                  Get a curriculum sample
                </Button>
              </Link>
              <Button onClick={openModal} variant="primary">
                Request a proposal
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
