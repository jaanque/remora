"use client";

import React from "react";
import Link from "next/link";
import { RemoraLogo } from "@/components/shared/RemoraLogo";

export function DocsNavbar() {
  return (
    <header className="w-full border-b border-neutral-100 bg-[#f2f2f2]/80 backdrop-blur-xs sticky top-0 z-30">
      <div className="w-full px-6 sm:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand + Breadcrumb to Docs */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold text-[17px] tracking-[-0.03em] text-neutral-950 hover:opacity-85 transition-opacity leading-none -translate-y-px group"
          >
            <RemoraLogo
              className="w-6 h-6 text-[#2496ED] shrink-0 transition-transform group-hover:scale-105"
              size={24}
            />
            <span>REMORA</span>
          </Link>

          <span className="text-neutral-400 select-none">/</span>

          <span className="text-xs font-semibold text-neutral-900 tracking-[-0.01em]">
            Docs
          </span>
        </div>

        {/* Right actions: Back to home button */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="group flex items-center gap-1.5 h-8 px-3 rounded-[9px] bg-neutral-200/60 hover:bg-neutral-200/90 border border-neutral-300/60 text-xs font-medium text-neutral-800 transition-all active:scale-95 shadow-2xs"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Volver a inicio</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

