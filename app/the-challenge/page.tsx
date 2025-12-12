import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GreyPlaceholder } from "@/components/grey-placeholder";
import { ProposalForm } from "@/components/proposal-form";

export const metadata = {
  title: "The Challenge | Willow Education",
  description:
    "Understanding the broken pathways to postsecondary success and how Willow Education is transforming the approach to career readiness.",
};

export default function TheChallengePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-full mb-6">
                <span className="text-sm font-medium text-gray-700">
                  Specific Challenge
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                Overwhelmed and Underinformed
              </h1>
            </div>
          </div>
        </section>

        {/* Four Challenges Grid */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Challenge 1 */}
              <div>
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">
                  A Maze of Choices
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  With nearly 1.1 million postsecondary programs and credentials
                  available, counselors and students are overwhelmed by the
                  sheer number of choices. The challenge isn&apos;t just finding
                  any program, but finding one that truly fits their strengths
                  and goals while offering a positive return on investment.
                </p>
              </div>

              {/* Challenge 2 */}
              <div>
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">
                  Lack of Quality Information
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Students and families expect that completing a program will
                  lead to better opportunities. However, too many programs have
                  low completion rates or a negative ROI, leaving students worse
                  off than before.
                </p>
              </div>

              {/* Challenge 3 */}
              <div>
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">
                  Counselor Constraints
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Guidance counselors are on the front lines, yet they&apos;re
                  often stymied by the lack of comprehensive, unbiased data to
                  compare programs and pathways, particularly those tailored to
                  the diverse needs of their students.
                </p>
              </div>

              {/* Challenge 4 */}
              <div>
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">
                  Opaque Alternatives
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Beyond traditional degrees lies a world of potential in
                  alternative pathways—apprenticeships, certifications, and
                  other professional programs. Yet, the absence of precise data
                  on their credibility and outcomes leaves many students wary and
                  underinformed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
              The Challenge
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              The promise of postsecondary education is clear: better access to
              meaningful work and thriving careers. However, for too many
              students, especially those from historically marginalized
              backgrounds, this promise remains unfulfilled. The pathways to
              success are broken, and it&apos;s time for a transformative approach.
            </p>
          </div>
        </section>

        {/* Navigating a Broken System */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-gray-900 mb-12 text-center">
              Navigating a Broken System
            </h2>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Completion Crisis */}
              <div>
                <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                  Completion Crisis
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The statistics are grim—only 64% of students complete a 4-year
                  degree within six years. For 2-year degrees, that number drops
                  to a mere 30%.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The situation is even more dire for students from low-income
                  households, where only a quarter graduate within six years.
                </p>
              </div>

              {/* Economic Disparities */}
              <div>
                <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                  Economic Disparities
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  The postsecondary system is not delivering equitable results.
                  Students from the lowest income quartile are significantly
                  underrepresented in college enrollment and completion,
                  perpetuating cycles of poverty rather than breaking them.
                </p>
              </div>

              {/* Bad Investments */}
              <div>
                <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                  Bad Investments
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Not all college degrees are created equal.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Shockingly, 30% of college programs leave graduates earning
                  less than their high school peers a decade after graduation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Willow's Response */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
                Willow&apos;s Response
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Empowering Counselors and Students
              </p>
            </div>

            <div className="space-y-16">
              {/* Personalized Guidance */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                    Personalized Guidance
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Tailored recommendations based on each student&apos;s unique
                    strengths, goals, and financial considerations.
                  </p>
                </div>
                <div>
                  <GreyPlaceholder aspectRatio="video" className="w-full" />
                </div>
              </div>

              {/* Comprehensive Exploration */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-2">
                  <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                    Comprehensive Exploration
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Tools to explore both traditional and alternative pathways
                    (which we call &quot;Professional Programs&quot;), ensuring that
                    every student can find the best-fit option for their future.
                  </p>
                </div>
                <div className="lg:order-1">
                  <GreyPlaceholder aspectRatio="video" className="w-full" />
                </div>
              </div>

              {/* Ongoing Support */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                    Ongoing Support
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    A dedicated team and community that works alongside you to
                    ensure every student&apos;s success.
                  </p>
                </div>
                <div>
                  <GreyPlaceholder aspectRatio="video" className="w-full" />
                </div>
              </div>

              {/* Transparent Data */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-2">
                  <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                    Transparent Data
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Real-time cost and ROI projections that empower students to
                    make informed decisions about their educational investments.
                  </p>
                </div>
                <div className="lg:order-1">
                  <GreyPlaceholder aspectRatio="video" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
