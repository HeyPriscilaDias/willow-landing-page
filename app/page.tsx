"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LogoCarousel } from "@/components/logo-carousel";
import { DiscoveryBridge } from "@/components/discovery-bridge";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorks } from "@/components/how-it-works";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { ProposalForm } from "@/components/proposal-form";
import { useProposalModal } from "@/lib/proposal-modal-context";

export default function Home() {
  const { isOpen, closeModal } = useProposalModal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoCarousel />
        <DiscoveryBridge />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <Footer />
      <ProposalForm isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
