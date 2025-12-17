"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const titleLeft = titleLeftRef.current;
    const titleRight = titleRightRef.current;

    if (!section || !cardsContainer || !titleLeft || !titleRight) return;

    // Kill any existing ScrollTriggers and remove pin-spacers
    ScrollTrigger.getAll().forEach(st => st.kill());
    document.querySelectorAll('.pin-spacer').forEach(el => el.remove());

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // First animate the title moving up from center
    tl.to([titleLeft, titleRight], {
      y: "-25vh",
      ease: "none",
      duration: 1,
    })
      // Then animate cards scrolling up through the title
      .to(
        cardsContainer,
        {
          y: "-250%",
          ease: "none",
          duration: 4,
        },
        "-=0.5"
      )
      // Finally animate title split and fade - starts at 4th card
      .to(
        titleLeft,
        {
          x: "-30%",
          opacity: 0,
          ease: "power2.inOut",
          duration: 1.5,
        },
        "-=2.5"
      )
      .to(
        titleRight,
        {
          x: "30%",
          opacity: 0,
          ease: "power2.inOut",
          duration: 1.5,
        },
        "<"
      )
      // Add a tiny hold at the end to ensure timeline matches scroll duration
      .to({}, { duration: 0.1 }, "+=0");

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="testimonial-scroll-section relative overflow-hidden"
      style={{
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(4, 29, 26, 0.7), rgba(4, 29, 26, 0.7)), url('/testimonials-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pin-wrapper-testimonials h-full flex justify-center items-center relative">
        {/* Title - Split Left and Right */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 px-8 pointer-events-none" style={{ zIndex: 10 }}>
          <h2
            ref={titleLeftRef}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white whitespace-nowrap"
            style={{ textShadow: 'none' }}
          >
            What partners
          </h2>
          <h2
            ref={titleRightRef}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white whitespace-nowrap"
            style={{ textShadow: 'none' }}
          >
            are saying
          </h2>
        </div>

        {/* Cards Container */}
        <div
          ref={cardsContainerRef}
          className="cards-container-testimonials absolute w-full max-w-[600px]"
          style={{
            top: "100%",
            zIndex: 20,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card backdrop-blur-md rounded-[12px] p-6 mb-10 shadow-lg"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
            >
              {/* Quote */}
              <p className="text-gray-900 mb-6 leading-relaxed text-base opacity-100">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 opacity-100">
                {/* Author Image Placeholder */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />

                {/* Author Details */}
                <div>
                  <div className="font-semibold text-gray-900 text-base">
                    {testimonial.author}
                  </div>
                  {testimonial.role && (
                    <div className="text-sm text-gray-700">
                      {testimonial.role}
                    </div>
                  )}
                  {testimonial.school && (
                    <div className="text-sm text-gray-600">
                      {testimonial.school}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
