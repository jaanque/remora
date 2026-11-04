"use client";

import React from "react";
import Link from "next/link";
import { WelcomeAvatar } from "./WelcomeAvatar";
import { HeroAgentAnimation } from "./HeroAgentAnimation";

export function Hero() {
  return (
    <section className="min-h-[58vh] sm:min-h-[64vh] flex flex-col justify-center py-6 sm:py-10">
      <WelcomeAvatar />

      <h1 className="text-[34px] sm:text-[44px] md:text-[48px] font-semibold tracking-[-0.035em] text-neutral-950 leading-[1.14]">
        Documentation built exclusively for AI agents
        <HeroAgentAnimation />
      </h1>

      <p className="text-[16px] sm:text-[17px] text-neutral-600 mt-4 leading-relaxed max-w-xl">
        Engineered from scratch for machine intelligence. Every page is compiled
        into token-optimized, machine-native schemas so autonomous agents and LLMs
        understand exactly what they read without burning context.
      </p>

      {/* Hero CTA Actions: Lead directly to Compiled Documentation Directory */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {/* 1. Get started (Blue primary action linking to /docs directory) */}
        <Link
          href="/docs"
          className="h-10 px-4.5 rounded-lg bg-[#2496ED] hover:bg-[#1f84d1] active:scale-[0.98] text-white text-[14px] font-medium tracking-tight transition-all flex items-center justify-center gap-2 shadow-xs group cursor-pointer"
        >
          <span>Get started</span>
          <svg
            className="w-3.5 h-3.5 text-white/90 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6 3.5L10.5 8L6 12.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* 2. Documentation Directory */}
        <Link
          href="/docs"
          className="h-10 px-4.5 rounded-lg bg-neutral-200/90 hover:bg-neutral-300/80 active:scale-[0.98] border border-neutral-300/80 text-neutral-900 text-[14px] font-medium tracking-tight transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
        >
          <svg className="w-4 h-4 text-neutral-700" viewBox="0 0 16 16" fill="none">
            <path d="M2.5 3.25C2.5 2.55964 3.05964 2 3.75 2H13.5V13.5H3.75C3.05964 13.5 2.5 12.9404 2.5 12.25V3.25Z" stroke="currentColor" strokeWidth="1.3" />
            <path d="M2.5 11.5H13.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M5.5 5.5H10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M5.5 8H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span>Explore Documentations</span>
        </Link>
      </div>
    </section>
  );
}
