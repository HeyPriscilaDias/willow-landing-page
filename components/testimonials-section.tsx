"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  school: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Willow is incredible! It helps me, my students, and families find high-quality post-secondary educational options. I would highly recommend working with Willow.",
    author: "Cassidy",
    role: "Counselor",
    school: "",
  },
  {
    quote:
      "Partnering with Willow has truly transformed the way my team and students thrive. I have complete peace of mind knowing my team is equipped with a top-tier curriculum, meticulously tailored to align with our unique vision and needs. Even more importantly, my students now engage with a high-quality, real-world curriculum that empowers them to navigate and excel during some of the most pivotal years of their lives.",
    author: "Wauneta",
    role: "High School Principal",
    school: "",
  },
  {
    quote:
      "Willow is providing students the opportunity to expand their horizons and explore professional pathways that otherwise tend to get overlooked. My students too often miss out on these paths because they simply don't know about them. Being informed is half the battle.",
    author: "Nuvia",
    role: "Counselor",
    school: "",
  },
  {
    quote:
      "Willow is helping us serve all of our students with excellence.",
    author: "Annalise",
    role: "Charter Network Leader",
    school: "",
  },
  {
    quote:
      "Willow Ed has enhanced my seminar class by providing me with great tools. This has allowed me to focus on providing high quality classroom instruction and building strong student relationships. Willow Ed has made it a priority to implement my feedback and my students as well. We are lucky to have the Willow Ed curriculum and platform in our classroom to support the future generation of leaders.",
    author: "Yosedit",
    role: "College Seminar Teacher",
    school: "",
  },
  {
    quote:
      "I'm seeing students engage in a different way than they ever have before. Students are now interested in applying for summer programs, getting involved in community service, advocating for themselves. It's been really exciting to see how this work is translating into students taking ownership of their futures earlier.",
    author: "Vincent Caricato",
    role: "",
    school: "KIPP Colorado",
  },
  {
    quote:
      "Willow has embedded our entire Pathsmith framework into the Willow curriculum and platform. It's like an 'Intel Inside' approach—if you want to deliver really high-quality durable skills development, you use a validated framework, and it's already baked in. You shouldn't be able to separate durable skills from learning. That's how Willow has built it.",
    author: "Tim Taylor",
    role: "President @ America Succeeds",
    school: "",
  },
];

function TestimonialCard({
  testimonial,
  index,
  onDragStart,
  onDragEnd,
}: {
  testimonial: Testimonial;
  index: number;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  const initial = testimonial.author.charAt(0).toUpperCase();

  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.3}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      className="testimonial-card bg-white p-6 shadow-lg flex-shrink-0 w-[320px] md:w-[380px] cursor-grab active:cursor-grabbing"
      style={{
        translateY: index % 2 === 0 ? 0 : 40,
        borderRadius: '12px',
      }}
    >
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        {/* Initial Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#D5D7DA' }}
        >
          <span className="text-gray-700 font-semibold text-lg">{initial}</span>
        </div>

        {/* Author Details */}
        <div>
          <div className="font-semibold text-gray-900 text-sm">
            {testimonial.author}
          </div>
          {testimonial.role && (
            <div className="text-xs text-gray-500">
              {testimonial.role}
            </div>
          )}
          {testimonial.school && (
            <div className="text-xs text-gray-500">
              {testimonial.school}
            </div>
          )}
        </div>
      </div>

      {/* Quote */}
      <p className="text-gray-700 leading-relaxed text-sm">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 overflow-hidden bg-gray-50"
    >
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 mb-16 md:mb-20 text-center">
        <h2 className="text-heading">
          <span className="inline">&ldquo;</span>Partnering with Willow has truly transformed the way my team and students thrive<span className="inline">&rdquo;</span>
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Fade gradients on edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgb(249 250 251), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgb(249 250 251), transparent)",
          }}
        />

        {/* Scrolling Track */}
        <div
          className={`flex items-start gap-6 testimonial-carousel py-8 ${isDragging || isHovered ? 'paused' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
