import React from "react";

export function PricingHero() {
  return (
    <section>
      {/* Back navigation */}
      <a
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-black transition-colors mb-6 group w-fit cursor-pointer"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
        <span>Back to home</span>
      </a>

      <h1 className="text-[32px] sm:text-[38px] font-semibold tracking-[-0.035em] text-neutral-950 leading-[1.12]">
        Simple, agent-first pricing
      </h1>
      <p className="text-[13.5px] text-neutral-500 mt-2.5 leading-relaxed max-w-xl tracking-[-0.01em]">
        Host machine-native documentation designed exclusively for AI agents and LLMs. Reduce token burn, eliminate context loss, and scale effortlessly.
      </p>
    </section>
  );
}
