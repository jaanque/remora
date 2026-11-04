"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RemoraLogo } from "@/components/shared/RemoraLogo";

interface SectionItem {
  id: string;
  name: string;
}

const LANDING_SECTIONS: SectionItem[] = [
  { id: "how-it-works", name: "How it works" },
  { id: "docs", name: "Compiled documentation" },
  { id: "capabilities", name: "Core capabilities" },
  { id: "why", name: "Why Remora" },
  { id: "faq", name: "FAQs" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="w-full border-b border-neutral-100 bg-[#f2f2f2]/80 backdrop-blur-xs sticky top-0 z-30">
      <div className="w-full px-6 sm:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand + Navigation links */}
        <div className="flex items-center gap-6 shrink-0">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 font-semibold text-[17px] tracking-[-0.03em] text-neutral-950 hover:opacity-85 transition-opacity leading-none -translate-y-px group cursor-pointer"
          >
            <RemoraLogo className="w-6 h-6 text-[#2496ED] shrink-0 transition-transform group-hover:scale-105" size={24} />
            <span>REMORA</span>
          </Link>

          {/* Landing Sections Navigation (sin estética de sección activa) */}
          <nav className="hidden sm:flex items-center gap-5 text-xs tracking-[-0.01em] h-14">
            {LANDING_SECTIONS.map((item) => {
              const href = isHome ? `#${item.id}` : `/#${item.id}`;

              return (
                <a
                  key={item.id}
                  href={href}
                  className="h-14 flex items-center text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right actions: CTA leading to /docs */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/docs"
            className="h-8 px-3.5 rounded-lg bg-[#2496ED] hover:bg-[#1f84d1] active:scale-[0.98] text-white text-xs font-medium tracking-tight transition-all flex items-center justify-center gap-1.5 shadow-xs group cursor-pointer"
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
        </div>
      </div>
    </header>
  );
}
