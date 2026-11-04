"use client";

import React from "react";
import {
  OpenAiLogo,
  ClaudeLogo,
  GeminiLogo,
  CursorLogo,
  CopilotLogo,
  DeepSeekLogo,
} from "@/components/shared/AiLogos";
import { useModelRotator } from "@/logic/animation";

const models = [
  {
    name: "Cursor",
    icon: <CursorLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    borderGradient: "from-zinc-700 via-neutral-900 to-zinc-700",
  },
  {
    name: "Claude",
    icon: <ClaudeLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    borderGradient: "from-amber-600 via-orange-500 to-amber-600",
  },
  {
    name: "OpenAI",
    icon: <OpenAiLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    borderGradient: "from-emerald-500 via-teal-500 to-emerald-500",
  },
  {
    name: "DeepSeek",
    icon: <DeepSeekLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    borderGradient: "from-blue-600 via-indigo-500 to-blue-600",
  },
  {
    name: "Gemini",
    icon: <GeminiLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    borderGradient: "from-purple-600 via-rose-500 to-blue-500",
  },
  {
    name: "Copilot",
    icon: <CopilotLogo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    borderGradient: "from-purple-600 via-indigo-600 to-purple-600",
  },
];

export function HeroAgentAnimation() {
  const { modelIndex, isExiting } = useModelRotator(models.length, 2800, 280);
  const currentModel = models[modelIndex];

  return (
    <span className="relative inline-flex items-center align-middle ml-2.5 -translate-y-[2px] select-none">
      {/* 1.5px animated gradient border container */}
      <span className="relative rounded-[9px] p-[1.5px] overflow-hidden inline-flex">
        {models.map((m, i) => (
          <span
            key={`border-${m.name}`}
            aria-hidden="true"
            className={`absolute inset-0 rounded-[9px] bg-gradient-to-r ${
              m.borderGradient
            } animate-aura pointer-events-none transition-opacity duration-700 ease-in-out ${
              i === modelIndex ? "opacity-90" : "opacity-0"
            }`}
          />
        ))}

        {/* Inner pill surface */}
        <span className="relative rounded-[7.5px] bg-white px-2.5 sm:px-3 h-7.5 sm:h-8.5 flex items-center gap-2 z-10 shadow-2xs">
          {/* Rotating AI Model Icon */}
          <span className="relative flex items-center justify-center w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0">
            {models.map((m, i) => (
              <span
                key={m.name}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
                  i === modelIndex
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-75 rotate-12 pointer-events-none"
                }`}
              >
                {m.icon}
              </span>
            ))}
          </span>

          {/* Model Name */}
          <span className="relative flex items-center h-full min-w-0">
            <span
              className={`font-semibold text-[13.5px] sm:text-[14.5px] tracking-tight text-neutral-950 whitespace-nowrap leading-none transition-all duration-300 ease-out ${
                isExiting
                  ? "opacity-0 -translate-y-1.5"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {currentModel.name}
            </span>
          </span>
        </span>
      </span>
    </span>
  );
}
