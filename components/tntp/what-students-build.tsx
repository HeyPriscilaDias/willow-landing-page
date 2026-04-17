const outcomes = [
  {
    title: "Transferable capability",
    body: "The skills to apply what they learn in new contexts, again and again.",
  },
  {
    title: "Social capital",
    body: "Relationships they can mobilize for opportunity, not just collect.",
  },
  {
    title: "Navigation capacity",
    body: "Goal-setting, decision-making, help-seeking, and follow-through.",
  },
  {
    title: "AI fluency",
    body: "Using AI to think, reflect, create, and decide. Aligned to OECD literacy and fluency standards.",
  },
];

export function WhatStudentsBuild() {
  return (
    <section className="bg-white border-t border-[#E5E5E0] py-20 md:py-30">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#525252] mb-4">
              What students build
            </p>
            <h3 className="font-heading font-medium text-[28px] md:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]">
              Four outcomes. Measurable over time.
            </h3>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          {outcomes.map((o, i) => (
            <li
              key={o.title}
              className="flex flex-col gap-2 pt-6 border-t border-[#E5E5E0]"
            >
              <span className="font-heading text-xs text-[#B45309] tracking-[0.08em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="font-heading font-medium text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] text-[#0A0A0A]">
                {o.title}
              </h4>
              <p className="text-[15px] md:text-base text-[#2D2D2D] leading-[1.6] max-w-[48ch]">
                {o.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
