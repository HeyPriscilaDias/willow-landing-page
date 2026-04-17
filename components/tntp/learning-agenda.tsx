const questions = [
  "Does a structured, relationship-focused advisory curriculum produce a greater sense of belonging and clearer career identity?",
  "How can AI-enabled tools increase the ROI of human advising by automating administrative work and surfacing real-time student need?",
  "How can districts align advisory with their Portrait of a Graduate and career-connected learning to create one coherent student experience?",
  "Does early purpose-setting and AI-supported navigation lead to higher enrollment and persistence in positive-ROI postsecondary pathways?",
];

export function LearningAgenda() {
  return (
    <section className="bg-white border-t border-[#E5E5E0] py-20 md:py-30">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#525252] mb-4">
              What we&rsquo;ll learn together
            </p>
            <h3 className="font-heading font-medium text-[28px] md:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]">
              Four questions. One cohort. Real answers.
            </h3>
          </div>
        </div>

        <ol className="md:col-span-12 divide-y divide-[#E5E5E0] border-t border-b border-[#E5E5E0]">
          {questions.map((q, i) => (
            <li
              key={q}
              className="py-6 md:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-baseline"
            >
              <span className="md:col-span-1 font-heading text-[13px] tracking-[0.12em] text-[#B45309]">
                Q{i + 1}
              </span>
              <p className="md:col-span-11 text-[17px] md:text-[19px] text-[#0A0A0A] leading-[1.55] max-w-[72ch]">
                {q}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
