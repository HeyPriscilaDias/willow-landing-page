"use client";

import Image from "next/image";

export function LogoCarousel() {
  // Partner logos - all rendered in uniform light grey
  const logos = [
    { id: 1, src: "/partner-logos/achievement_first.svg", alt: "Achievement First" },
    { id: 2, src: "/partner-logos/colorado_succeeds.svg", alt: "Colorado Succeeds", scale: 0.9 },
    { id: 3, src: "/partner-logos/denver_scholarship_foundation.svg", alt: "Denver Scholarship Foundation" },
    { id: 4, src: "/partner-logos/hope-ignites.svg", alt: "Hope Ignites", scale: 0.729 },
    { id: 5, src: "/partner-logos/kipp_colorado.png", alt: "KIPP Colorado", scale: 1.1, extraSpacing: true },
    { id: 6, src: "/partner-logos/kipp-norcal.png", alt: "KIPP NorCal", scale: 1.1 },
    { id: 26, src: "/partner-logos/valor.png", alt: "Valor Collegiate Academies", scale: 0.9 },
    { id: 7, src: "/partner-logos/pathsmith.svg", alt: "Pathsmith" },
    { id: 8, src: "/partner-logos/access_opportunity.png", alt: "Access Opportunity" },
    { id: 11, src: "/partner-logos/america_succeeds.png", alt: "America Succeeds" },
    { id: 12, src: "/partner-logos/atlas_prep.png", alt: "Atlas Prep", scale: 1.1 },
    { id: 13, src: "/partner-logos/breakthrough_denver.png", alt: "Breakthrough Denver" },
    { id: 14, src: "/partner-logos/colorado_early.png", alt: "Colorado Early Colleges" },
    { id: 15, src: "/partner-logos/cripple_creek_school_district.png", alt: "Cripple Creek - Victor" },
    { id: 17, src: "/partner-logos/gary_community_ventures.png", alt: "Gary Community Ventures", scale: 0.81 },
    { id: 20, src: "/partner-logos/mile_high.png", alt: "MileHigh 360" },
    { id: 21, src: "/partner-logos/rise_up.png", alt: "RiseUp Community Schools", scale: 1.1 },
    { id: 22, src: "/partner-logos/rocky_mountain_prep.png", alt: "Rocky Mountain Prep" },
    { id: 23, src: "/partner-logos/save_our_youth.png", alt: "Save Our Youth" },
    { id: 24, src: "/partner-logos/the_project_on_workforce.png", alt: "The Harvard Project on Workforce" },
    { id: 25, src: "/partner-logos/mesa.png", alt: "MESA", scale: 1.1 },
    { id: 27, src: "/partner-logos/bbbs_colorado.png", alt: "Big Brothers Big Sisters Colorado", scale: 0.8 },
    { id: 28, src: "/partner-logos/american_student_assistance.png", alt: "American Student Assistance", scale: 1.21 },
    { id: 29, src: "/partner-logos/opportunity_trust.png", alt: "Next Prep (Opportunity Trust)" },
    { id: 30, src: "/partner-logos/next-level-lab.png", alt: "Next Level Lab", customOpacity: 0.35 },
  ];

  // 28 logos * 112px + 27 gaps * 40px = 4216px per set
  const setWidth = logos.length * 112 + (logos.length - 1) * 40;

  return (
    <section className="py-12 bg-white overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-${setWidth}px, 0, 0);
          }
        }
        .animate-scroll {
          animation: scroll 80s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-56 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-56 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling container - CSS animation for smooth mobile performance */}
        <div className="flex gap-10 items-center animate-scroll">
          {/* Render logos 2 times for seamless loop */}
          {[...Array(2)].map((_, setIndex) =>
            logos.map((logo, logoIndex) => (
              <div
                key={`${setIndex}-${logo.id}-${logoIndex}`}
                className={`flex-shrink-0 w-[112px] h-[56px] relative flex items-center justify-center ${logo.extraSpacing ? 'mr-6' : ''}`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className={`object-contain grayscale ${logo.customOpacity ? '' : 'opacity-50'}`}
                  style={{
                    ...(logo.scale ? { transform: `scale(${logo.scale})` } : {}),
                    ...(logo.customOpacity ? { opacity: logo.customOpacity } : {})
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
