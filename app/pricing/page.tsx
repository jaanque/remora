import { Navbar } from "@/components/Navbar";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingCards } from "@/components/pricing/PricingCards";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Pricing Plans — Remora",
  description:
    "Simple, transparent pricing for machine-native documentation, token compression, and autonomous agent context servers.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-12 pb-24 space-y-12 flex-1 w-full">
        <PricingHero />
        <PricingCards />
        <PricingFaq />
      </div>

      <Footer />
    </main>
  );
}
