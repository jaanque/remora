"use client";

import React, { useEffect, useRef, useState } from "react";

const MANIFESTO_TEXT =
  "Documentation was built to guide human developers through tutorials and conversational prose. But AI coding agents don't need tutorials—they need exact compiler constraints. Remora compiles codebases into type-safe AST endpoints, eliminating token waste and giving machines the pure schema contracts they need to build without hallucinating.";

export function Why() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const words = MANIFESTO_TEXT.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start transition when the container enters the upper-middle of viewport
      const startOffset = windowHeight * 0.7;
      const scrollDistance = rect.height - windowHeight * 0.6;

      const currentScroll = startOffset - rect.top;
      const rawProgress = currentScroll / Math.max(1, scrollDistance);
      const clamped = Math.min(1, Math.max(0, rawProgress));

      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="why" ref={containerRef} className="relative h-[150vh] sm:h-[170vh]">
      {/* Sticky centered viewport stage */}
      <div className="sticky top-[28vh] sm:top-[30vh] max-w-3xl mx-auto py-6">
        {/* Subtle section label */}
        <div className="text-[12px] font-mono uppercase tracking-wider text-neutral-400 mb-5">
          Why Remora
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
