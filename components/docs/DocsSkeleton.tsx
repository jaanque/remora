import React from "react";
import { DocsNavbar } from "@/components/layout/DocsNavbar";
import { Footer } from "@/components/layout/Footer";

export interface DocsSkeletonProps {
  cardCount?: number;
  showHeader?: boolean;
}

export function DocsSkeleton({ cardCount = 6, showHeader = true }: DocsSkeletonProps) {
  return (
    <main
      className="min-h-screen bg-[#f2f2f2] flex flex-col justify-between font-sans antialiased"
      aria-busy="true"
      aria-label="Cargando documentación"
    >
      {/* Dedicated Docs Navbar */}
      <DocsNavbar />

      <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 sm:py-12">
        {showHeader && (
          <>
            {/* Header Skeleton */}
            <div className="mb-6 space-y-2">
              <div className="h-8 sm:h-9 w-60 sm:w-72 rounded-lg bg-neutral-300/70 animate-pulse" />
              <div className="h-4 w-72 sm:w-96 max-w-full rounded-md bg-neutral-300/40 animate-pulse" />
            </div>

            {/* Minimal Search Bar Skeleton */}
            <div className="relative w-full max-w-md h-10 mb-8 rounded-[10px] border border-neutral-300/80 bg-white/60 px-3 flex items-center gap-2.5 shadow-2xs animate-pulse">
              <div className="w-4 h-4 rounded-full bg-neutral-300/70 shrink-0" />
              <div className="h-3.5 w-36 rounded bg-neutral-300/40" />
            </div>
          </>
        )}

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: cardCount }).map((_, index) => (
            <div
              key={index}
              className="rounded-[14px] border border-neutral-300/80 bg-[#f2f2f2] p-4.5 flex flex-col justify-between shadow-2xs select-none animate-pulse"
            >
              <div>
                {/* 1. Logo Skeleton */}
                <div className="w-8 h-8 rounded-lg bg-neutral-300/70 mb-3" />

                {/* 2. Title Skeleton */}
                <div className="h-4 w-32 rounded-md bg-neutral-300/80 mb-2" />

                {/* 3. Description Skeleton */}
                <div className="space-y-1.5 mt-1">
                  <div className="h-3.5 w-full rounded bg-neutral-300/50" />
                  <div className="h-3.5 w-4/5 rounded bg-neutral-300/40" />
                </div>
              </div>

              {/* 4. Action Button Skeleton */}
              <div className="mt-4 pt-3 border-t border-neutral-300/60 flex items-center justify-between">
                <div className="h-8 w-16 rounded-lg bg-neutral-300/60" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

