"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: 300000,
    suffix: "+",
    label: "Students Reached",
    description: "Empowering students nationwide with career exploration tools.",
  },
  {
    value: 500,
    suffix: "+",
    label: "Partners",
    description: "Trusted by schools and nonprofits across the country.",
  },
  {
    value: 95,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Educators love our platform and curriculum.",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 md:py-30 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card-bg rounded-card p-8 shadow-subtle border border-gray-200"
    >
      <div className="text-center">
        <div className="font-heading text-5xl font-medium text-status-good mb-2">
          {hasAnimated ? (
            <>
              <CountUp
                start={0}
                end={stat.value}
                duration={2.5}
                separator=","
              />
              {stat.suffix}
            </>
          ) : (
            <>0{stat.suffix}</>
          )}
        </div>
        <div className="font-heading text-xl font-medium text-primary mb-3">
          {stat.label}
        </div>
        <p className="text-secondary text-sm leading-relaxed">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}
