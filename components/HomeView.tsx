"use client";

import React from "react";
import { Hero } from "./Hero";
import { Why } from "./Why";
import { HowItWorks } from "./HowItWorks";
import { AgentFeatures } from "./AgentFeatures";
import { SocialProof } from "./SocialProof";
import { Faq } from "./Faq";

export function HomeView() {
  return (
    <div className="pb-24 space-y-16">
      {/* 1. Hero, 2. Why Remora, 3. How It Works, 4. Core Capabilities */}
      <div className="max-w-3xl mx-auto px-6 space-y-16">
        <Hero />
        <Why />
        <HowItWorks />
        <AgentFeatures />
      </div>

      {/* 5. Reviews / Social Proof: Dedicated width with sticky companion sidebar */}
      <div className="max-w-5xl mx-auto px-6">
        <SocialProof />
      </div>

      {/* 6. FAQ & Technical Architecture */}
      <div className="max-w-3xl mx-auto px-6">
        <Faq />
      </div>
    </div>
  );
}
