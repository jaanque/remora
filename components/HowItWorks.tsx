"use client";

import React, { useRef, useState } from "react";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

function StepCard({ step, title, description }: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[14px] border border-neutral-200/80 p-6 bg-white overflow-hidden transition-all duration-300 hover:border-neutral-300 hover:shadow-xs flex flex-col justify-between"
    >
      {/* Background Layer 1: Animated shifting gradient flow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-100/70 to-neutral-50 animate-cell-flow pointer-events-none transition-opacity duration-500 ease-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Background Layer 2: Interactive dynamic spotlight following the cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.045), transparent 75%)`,
        }}
      />

      {/* Subtle top edge glow on hover */}
      <div
        className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-400/40 to-transparent pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <span className="font-mono text-xs font-semibold text-[#2496ED]">
            {step}
          </span>
          <h3 className="text-[16px] font-semibold text-neutral-950 mt-3 mb-2">
            {title}
          </h3>
          <p className="text-[14px] text-neutral-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-4">
      <div className="mb-4">
        <h2 className="text-[17px] sm:text-[19px] font-semibold tracking-[-0.02em] text-neutral-950">
          How it works
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <StepCard
          step="01"
          title="Connect"
          description="Connect your repository via GitHub App, CLI, or OpenAPI spec. Initial indexing completes in under 60 seconds."
        />

        <StepCard
          step="02"
          title="Compile"
          description="Remora analyzes your code AST, extracting types, endpoints, and interfaces while stripping all narrative prose."
        />

        <StepCard
          step="03"
          title="Query"
          description="Your coding assistant pulls structured definitions on demand from a single dedicated URL without context bloat."
        />
      </div>
    </section>
  );
}
