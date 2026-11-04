"use client";

import React, { useMemo } from "react";
import { useScrollProgress } from "@/logic/animation";
import { MANIFESTO_TEXT } from "@/logic/content";

export function Why() {
  const { containerRef, progress } = useScrollProgress();
  const words = useMemo(() => MANIFESTO_TEXT.split(" "), []);

  return (
    <section id="why" ref={containerRef} className="relative h-[150vh] sm:h-[170vh]">
      {/* Sticky centered viewport stage */}
      <div className="sticky top-[28vh] sm:top-[30vh] max-w-3xl mx-auto py-6">
        {/* Section title matching other landing sections */}
        <div className="mb-4">
          <h2 className="text-[17px] sm:text-[19px] font-semibold tracking-[-0.02em] text-neutral-950">
            Why Remora
          </h2>
        </div>

        {/* Scroll-revealing manifesto paragraph */}
        <p className="text-[21px] sm:text-[27px] md:text-[31px] font-medium tracking-[-0.025em] leading-[1.38] select-none">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            const amount = Math.min(1, Math.max(0, (progress - start) / (end - start)));

            return (
              <span key={`${word}-${i}`} className="relative inline-block mr-[0.28em]">
                {/* Inactive muted gray layer */}
                <span className="text-neutral-300 transition-colors">
                  {word}
                </span>

                {/* Active brand Docker blue layer */}
                <span
                  className="absolute inset-0 text-[#2496ED] select-none pointer-events-none"
                  style={{
                    opacity: amount,
                    transition: "opacity 0.08s ease-out",
                  }}
                  aria-hidden="true"
                >
                  {word}
                </span>
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
