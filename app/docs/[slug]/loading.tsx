import React from "react";
import { DocsNavbar } from "@/components/layout/DocsNavbar";
import { Footer } from "@/components/layout/Footer";

export default function DocDetailLoading() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] flex flex-col justify-between font-sans antialiased">
      {/* Docs Navbar */}
      <DocsNavbar backHref="/docs" backLabel="Volver a Docs" />

      <div className="flex-1 max-w-2xl w-full mx-auto px-6 py-12 sm:py-16 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-lg bg-neutral-300/80 shrink-0" />
          <div className="h-7 sm:h-8 w-48 sm:w-56 bg-neutral-300/80 rounded-md" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-neutral-300/60 rounded" />
          <div className="h-4 w-5/6 bg-neutral-300/50 rounded" />
        </div>

        {/* Install Snippet Skeleton */}
        <div className="h-12 w-full rounded-xl bg-neutral-300/70 mb-6" />

        {/* Content Skeleton */}
        <div className="mt-8 pt-6 border-t border-neutral-300/60 space-y-2.5">
          <div className="h-4 w-full bg-neutral-300/60 rounded" />
          <div className="h-4 w-11/12 bg-neutral-300/50 rounded" />
          <div className="h-4 w-3/4 bg-neutral-300/40 rounded" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
