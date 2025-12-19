"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "./button";
import Link from "next/link";

export function DiscoveryBridge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-5 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gray-50 border border-gray-200 rounded-[16px] p-8 md:p-12 text-center"
        >
          <blockquote className="text-lg md:text-xl text-heading leading-relaxed mb-6">
            &ldquo;When I was a principal, the hardest question to answer was &lsquo;What do I want to be?&rsquo; This quiz is how we start that conversation with every student.&rdquo;
          </blockquote>
          <p className="text-secondary font-medium mb-8">
            — James Cryan, Founder
          </p>
          <Link href="/personality-quiz">
            <Button variant="primary">
              Take the 2-minute Personality Quiz
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
