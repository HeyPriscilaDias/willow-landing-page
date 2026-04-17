import { cn } from "@/lib/utils";
import { fraunces } from "./fonts";

interface InlineTestimonialProps {
  quote: string;
  name: string;
  role: string;
  tone?: "light" | "alt";
}

export function InlineTestimonial({
  quote,
  name,
  role,
  tone = "light",
}: InlineTestimonialProps) {
  const bg = tone === "alt" ? "bg-[#FAFAF7]" : "bg-white";

  return (
    <section className={cn(bg, "border-t border-[#E5E5E0] py-16 md:py-24")}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#525252] mb-8 md:mb-10">
          From the field
        </p>
        <figure className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          <blockquote
            className={cn(
              fraunces.className,
              "md:col-span-9 italic text-[#0A0A0A] text-[28px] md:text-[36px] lg:text-[44px] leading-[1.25] tracking-[-0.01em] max-w-[32ch]"
            )}
          >
            &ldquo;{quote}&rdquo;
          </blockquote>
          <figcaption className="md:col-span-3 flex flex-col gap-0.5 md:pt-4">
            <span className="text-[15px] font-medium text-[#0A0A0A]">
              {name}
            </span>
            <span className="text-[13px] text-[#525252] leading-[1.4]">
              {role}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export const testimonialVinny: InlineTestimonialProps = {
  quote:
    "I'm seeing students engage in a different way than they ever have before.",
  name: "Vinny Caricato",
  role: "Director, KIPP Forward",
};

export const testimonialWauneta: InlineTestimonialProps = {
  quote:
    "This partnership has truly transformed the way my team and students thrive.",
  name: "Wauneta Vann",
  role: "High School Principal, Rocky Mountain Prep RISE",
};

export const testimonialTim: InlineTestimonialProps = {
  quote:
    "Our entire Pathsmith framework is embedded into the curriculum and platform.",
  name: "Tim Taylor",
  role: "President, America Succeeds",
};
