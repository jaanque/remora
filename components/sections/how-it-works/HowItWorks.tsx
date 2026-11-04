import React from "react";

const STEPS = [
  {
    step: "01",
    title: "Connect",
    description:
      "Connect your repository via GitHub App, CLI, or OpenAPI spec. Initial indexing completes in under 60 seconds.",
  },
  {
    step: "02",
    title: "Compile",
    description:
      "Remora analyzes your code AST, extracting types, endpoints, and interfaces while stripping all narrative prose.",
  },
  {
    step: "03",
    title: "Query",
    description:
      "Your coding assistant pulls structured definitions on demand from a single dedicated URL without context bloat.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-2">
      <div className="mb-3">
        <h2 className="text-[17px] sm:text-[19px] font-semibold tracking-[-0.02em] text-neutral-950">
          How it works
        </h2>
      </div>

      {/* Vertical list layout (not a 3-column grid) */}
      <div className="space-y-2.5">
        {STEPS.map((item) => (
          <div
            key={item.step}
            className="rounded-[14px] border border-neutral-300/80 bg-[#f2f2f2] p-4 sm:p-4.5 flex items-start gap-4 hover:border-neutral-400 transition-colors"
          >
            <span className="font-mono text-xs font-semibold text-[#2496ED] shrink-0 mt-0.5">
              {item.step}
            </span>
            <div>
              <h3 className="text-[14.5px] font-semibold text-neutral-950">
                {item.title}
              </h3>
              <p className="text-[13px] text-neutral-600 mt-0.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
