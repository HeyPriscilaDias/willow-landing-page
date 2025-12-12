import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GreyPlaceholder } from "@/components/grey-placeholder";

export const metadata = {
  title: "About Us | Willow Education",
  description:
    "Our mission is to help 10 million students realize their full potential by choosing a best-fit, best-quality education next step by 2033.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section - Mission & Vision */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-12">
              About Us
            </h1>

            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our mission is to help 10m students realize their full
                  potential by choosing a best-fit, best-quality education next
                  step by 2033.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our vision is to that by helping students make quality next
                  steps, we can transform the economic and social mobility of
                  communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Theory of Action */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
              Theory of Action
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              When more students choose high-quality next steps after high
              school, not only are they better off, we can shift the demand
              patterns in higher education and employment away from low-quality
              programs/jobs, towards higher quality ones. As the postsecondary
              education system shifts to changed demand patterns, over time,
              this increases a community&apos;s systemic economic and social
              mobility.
            </p>
          </div>
        </section>

        {/* Our Solution */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-gray-900 mb-12 text-center">
              Our Solution
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Willow Education has developed a cutting-edge recommendation
                  engine that puts learners in control. By focusing on their
                  unique interests, goals, and financial considerations, we help
                  students discover the best-fit, high-quality educational
                  pathways across college and professional programs.
                </p>
              </div>
              <div>
                <GreyPlaceholder aspectRatio="video" className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-gray-900 mb-16 text-center">
              Meet the Team
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* James Cryan */}
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <GreyPlaceholder
                    aspectRatio="square"
                    className="w-48 h-48 rounded-full"
                  />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-1">
                  James Cryan
                </h3>
                <p className="text-gray-600 font-medium mb-4">
                  Founder & CEO
                </p>
                <p className="text-gray-600 leading-relaxed text-left">
                  The founder and former CEO of Rocky Mountain Prep – one of
                  Colorado&apos;s most successful public charter school networks –
                  James carries with him over 15 years of experience in the
                  education sector. James believes all learners deserve support
                  to navigate their post-secondary education journey with
                  confidence. Growing up, his mother, Fredrica, instilled in him
                  a simple yet powerful belief: with hard work, anything is
                  achievable. He is painfully aware that promise is not true for
                  everyone today; and is steadfast in that mission to shape a
                  world where every individual has the opportunity to fully
                  realize their potential.
                </p>
              </div>

              {/* Ryan York */}
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <GreyPlaceholder
                    aspectRatio="square"
                    className="w-48 h-48 rounded-full"
                  />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-1">
                  Ryan York
                </h3>
                <p className="text-gray-600 font-medium mb-4">
                  Chief Product & Technology Officer
                </p>
                <p className="text-gray-600 leading-relaxed text-left">
                  Ryan York has worked in education for 18 years as a teacher,
                  instructional coach, principal, and charter school founder /
                  co-CEO. Throughout his career, he has been passionate about
                  the intersection of technology and student outcomes. Ryan
                  began writing software over a decade ago, creating online
                  tools for teachers. He went on to design a computer science
                  curriculum and learning management platform that served over
                  10,000 students and won the Sally Ride & Deloitte National
                  Award for Innovation. Ryan believes intentionally designed
                  technology can and should serve as a catalytic force to
                  address inherent inequities in schools and society and is
                  honored to be moving that work forward with the Willow team.
                </p>
              </div>

              {/* Jaime Hudgins */}
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <GreyPlaceholder
                    aspectRatio="square"
                    className="w-48 h-48 rounded-full"
                  />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-1">
                  Jaime Hudgins
                </h3>
                <p className="text-gray-600 font-medium mb-4">
                  Chief Academic Officer
                </p>
                <p className="text-gray-600 leading-relaxed text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
