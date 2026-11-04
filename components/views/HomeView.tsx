"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { HowItWorks } from "@/components/sections/how-it-works/HowItWorks";
import { DocsExplorer } from "@/components/sections/docs/DocsExplorer";
import { AgentFeatures } from "@/components/sections/capabilities/AgentFeatures";
import { Why } from "@/components/sections/why/Why";
import { Faq } from "@/components/sections/faq/Faq";

export function HomeView() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] flex flex-col justify-between">
      <Navbar />

      <div className="pb-24 space-y-16">
        {/* 1. Hero, 2. How It Works, 3. Compiled Docs Marquee, 4. Core Capabilities, 5. Why Remora */}
        <div className="max-w-3xl mx-auto px-6 space-y-16">
          <Hero />
          <HowItWorks />
          <DocsExplorer />
          <AgentFeatures />
          <Why />
        </div>

        {/* 6. FAQ & Technical Architecture */}
        <div className="max-w-3xl mx-auto px-6">
          <Faq />
        </div>
      </div>

      <Footer />
    </main>
  );
}
