"use client";

import React, { useState, useEffect } from "react";
import {
  OpenAiLogo,
  ClaudeLogo,
  GeminiLogo,
  CursorLogo,
  CopilotLogo,
  DeepSeekLogo,
} from "./AiLogos";

const models = [
  {
    name: "Cursor",
    icon: <CursorLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    color: "text-neutral-950",
    borderGradient: "from-zinc-700 via-neutral-900 to-zinc-700",
  },
  {
    name: "Claude",
    icon: <ClaudeLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    color: "text-[#D97706]",
    borderGradient: "from-amber-600 via-orange-500 to-amber-600",
  },
  {
    name: "OpenAI",
    icon: <OpenAiLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    color: "text-[#10a37f]",
    borderGradient: "from-emerald-500 via-teal-500 to-emerald-500",
  },
  {
    name: "DeepSeek",
    icon: <DeepSeekLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    color: "",
    borderGradient: "from-blue-600 via-indigo-500 to-blue-600",
  },
  {
    name: "Gemini",
    icon: <GeminiLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    color: "",
    borderGradient: "from-purple-600 via-rose-500 to-blue-500",
  },
  {
    name: "Copilot",
    icon: <CopilotLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    color: "text-[#6e40c9]",
    borderGradient: "from-purple-600 via-indigo-600 to-purple-600",
  },
];

export function HeroAgentAnimation() {
  const [modelIndex, setModelIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Trigger upward letter exit
      setIsExiting(true);

      // 2. Swap model and trigger upward entry
      setTimeout(() => {
        setModelIndex((prev) => (prev + 1) % models.length);
        setIsExiting(false);
      }, 280);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const currentModel = models[modelIndex];

  return (
    <span className="relative inline-flex items-center align-middle ml-2.5 -translate-y-[2px] select-none">
      {/* 1px animated gradient border container */}
      <span className="relative rounded-[9px] p-[1.5px] overflow-hidden inline-flex">
        {models.map((m, i) => (
          <span
            key={`border-${m.name}`}
            aria-hidden="true"
            className={`absolute inset-0 rounded-[9px] bg-gradient-to-r ${
              m.borderGradient
            } animate-aura pointer-events-none transition-opacity duration-700 ease-in-out ${
              i === modelIndex ? "opacity-85" : "opacity-0"
            }`}
          />
        ))}

        {/* Inner pill surface */}
        <span className="relative rounded-[7.5px] bg-neutral-100/90 sm:bg-white px-2.5 sm:px-3 h-7.5 sm:h-8.5 flex items-center gap-2 z-10 shadow-2xs">
          {/* Animated Icon */}
          <span
            key={`icon-${modelIndex}-${isExiting ? "out" : "in"}`}
            className={`w-4 h-4 sm:w-[18px] sm:h-[18px] flex items-center justify-center shrink-0 ${
              currentModel.color
            } ${isExiting ? "animate-letter-out" : "animate-letter-in"}`}
          >
            {currentModel.icon}
          </span>

          {/* Staggered animated letters */}
          <span className="w-[66px] sm:w-[74px] h-4 sm:h-5 overflow-hidden flex items-center relative">
            <span className="inline-flex font-semibold text-[13px] sm:text-[15px] tracking-[-0.015em] text-neutral-900 leading-none">
              {currentModel.name.split("").map((char, i) => (
                <span
                  key={`${modelIndex}-${isExiting ? "out" : "in"}-${i}`}
                  className={`inline-block ${
                    isExiting ? "animate-letter-out" : "animate-letter-in"
                  }`}
                  style={{
                    animationDelay: isExiting
                      ? `${i * 20}ms`
                      : `${i * 26}ms`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </span>
        </span>
      </span>
    </span>
  );
}
