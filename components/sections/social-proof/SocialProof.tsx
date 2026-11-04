"use client";

import React, { useEffect, useRef, useState } from "react";
import { Blobatar } from "@blobatar/react";

// Canonical Docker Blue palette with transparent background (frameless)
const DOCKER_PALETTE = {
  head: "#2496ED",
  bg: "transparent",
  eye: "#052e54",
};

interface TestimonialCard {
  name: string;
  seed: string;
  quote: string;
  zIndex: string;
  tiltClass: string;
  shadowClass: string;
}

const TESTIMONIALS: TestimonialCard[] = [
  {
    name: "Alex Rivera",
    seed: "remora-alex-rivera-99",
    quote:
      "Cursor used to choke trying to digest our 120-page API reference. With Remora AST endpoints, context usage dropped by 80% and multi-file edits work on the first try.",
    zIndex: "z-10",
    tiltClass: "-rotate-[2.2deg] -translate-x-2",
    shadowClass: "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]",
  },
  {
    name: "Sarah Chen",
    seed: "remora-sarah-chen-42",
    quote:
      "Standard markdown dumps waste thousands of tokens on prose tutorials and layout tags. Remora delivers pure, type-safe schema contracts directly into agent loops.",
    zIndex: "z-20",
    tiltClass: "rotate-[2.5deg] translate-x-2",
    shadowClass: "shadow-[0_10px_25px_-5px_rgba(0,0,0,0.09)]",
  },
  {
    name: "Marcus Vance",
    seed: "remora-marcus-vance-77",
    quote:
      "Continuous webhooks re-index function signatures on every commit. Our coding assistants haven't hallucinated a deprecated endpoint in months.",
    zIndex: "z-30",
    tiltClass: "-rotate-[1.8deg] -translate-x-1.5",
    shadowClass: "shadow-[0_16px_30px_-6px_rgba(0,0,0,0.11)]",
  },
  {
    name: "Elena Rostova",
    seed: "remora-elena-rostova-11",
    quote:
      "Running npx remora init took under a minute. Our entire codebase schema was immediately live, structured, and queryable with zero prompt overflow.",
    zIndex: "z-40",
    tiltClass: "rotate-[2deg] translate-x-2",
    shadowClass: "shadow-[0_22px_35px_-8px_rgba(0,0,0,0.13)]",
  },
];

export function SocialProof() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track active card via static anchors unaffected by position:sticky
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerWidth >= 640 ? 140 : 120;
      let current = 0;
      anchorRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold + 30) {
          current = index;
        }
      });
      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smoothly scroll to the true static anchor for this card
  const scrollToCard = (index: number) => {
    const anchor = anchorRefs.current[index];
    if (anchor) {
      const targetOffset = window.innerWidth >= 640 ? 128 : 112;
      const rect = anchor.getBoundingClientRect();
      const scrollTarget = window.pageYOffset + rect.top - targetOffset;
      window.scrollTo({
        top: Math.max(0, scrollTarget),
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="reviews" className="pt-4 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Sticky companion */}
        <div className="md:col-span-5 md:sticky md:top-28 space-y-6">
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.02em] text-neutral-950">
              Loved by agent builders
            </h2>
            <p className="text-[14px] text-neutral-600 mt-1.5 leading-relaxed">
              Real feedback from engineers shipping high-throughput coding agents
              with Remora.
            </p>
          </div>

          {/* Reviewer Rail: click to scroll smoothly to that testimonial */}
          <div className="space-y-1 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-2">
            {TESTIMONIALS.map((t, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-[#f2f2f2] shadow-sm border border-neutral-200/90 text-neutral-950"
                      : "hover:bg-neutral-100/70 border border-transparent text-neutral-600 hover:text-neutral-900 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Frameless Avatar (no box, no frame, no border) */}
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                    {mounted ? (
                      <Blobatar
                        name={t.seed}
                        size={32}
                        animate="hover"
                        palette={DOCKER_PALETTE}
                      />
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                  <span
                    className={`text-[13.5px] ${
                      isActive ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {t.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Stacked Card Deck */}
        <div className="md:col-span-7 relative">
          {/* Static geometric scroll anchors for reliable navigation and tracking */}
          <div className="absolute inset-0 pointer-events-none">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={`anchor-${t.name}`}
                ref={(el) => {
                  anchorRefs.current[idx] = el;
                }}
                className="absolute left-0 w-full"
                style={{ top: `${idx * 75}vh` }}
              />
            ))}
          </div>

          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className={`sticky top-28 sm:top-32 ${t.zIndex} mb-[60vh] sm:mb-[75vh]`}
            >
              <div
                className={`w-full rounded-[16px] border border-neutral-200/90 bg-[#f2f2f2] p-6 sm:p-7 ${t.tiltClass} ${t.shadowClass} transition-transform duration-200 hover:rotate-0 hover:scale-[1.01]`}
              >
                {/* Quote text only */}
                <p className="text-[15px] sm:text-[15.5px] text-neutral-800 leading-relaxed font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Avatar + Name only (Frameless avatar) */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-neutral-100">
                  <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                    {mounted ? (
                      <Blobatar
                        name={t.seed}
                        size={36}
                        animate="hover"
                        palette={DOCKER_PALETTE}
                      />
                    ) : (
                      <div className="w-9 h-9" />
                    )}
                  </div>

                  <span className="text-[14px] font-semibold text-neutral-950">
                    {t.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


