"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WelcomeAvatar } from "./WelcomeAvatar";
import { HeroAgentAnimation } from "./HeroAgentAnimation";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("npx remora init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

      {/* Hero CTA */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/login"
          className="h-10 px-4.5 rounded-[10px] bg-[#2496ED] text-white text-[13.5px] font-medium tracking-[-0.01em] hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs group"
        >
          <span>Get started</span>
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <button
          onClick={copyCommand}
          className="h-10 px-4 rounded-[10px] border border-neutral-200/90 bg-white hover:bg-neutral-50/80 hover:border-neutral-300 text-neutral-800 text-[13px] font-mono tracking-tight transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs group"
          title="Copy command to clipboard"
        >
          <span className="text-neutral-400 select-none">$</span>
          <span>npx remora init</span>
          <span className="text-neutral-400 group-hover:text-neutral-600 transition-colors ml-1">
            {copied ? (
              <span className="text-[#2496ED] text-[11px] font-sans font-medium">
                Copied!
              </span>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </section>
  );
}
