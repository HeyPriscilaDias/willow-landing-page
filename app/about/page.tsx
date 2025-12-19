import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "About Us | Willow Education",
  description: "Learn more about Willow Education and our mission.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-medium text-heading mb-4">
            Coming soon...
          </h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
