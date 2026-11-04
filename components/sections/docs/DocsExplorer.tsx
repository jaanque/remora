"use client";

import React from "react";
import Link from "next/link";
import { renderPlatformLogo } from "@/components/docs/PlatformLogos";
import { usePlatforms } from "@/logic/docs";

export function DocsExplorer() {
  const { platforms, isLoading } = usePlatforms(24);

  return (
    <section id="docs" className="pt-2 overflow-hidden">
      {/* Title & Link to Full Directory */}
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="text-[17px] sm:text-[19px] font-semibold tracking-[-0.02em] text-neutral-950">
          Compiled documentation
        </h2>

        <Link
          href="/docs"
          className="text-xs font-medium text-neutral-500 hover:text-[#2496ED] transition-colors flex items-center gap-1 group"
        >
          <span>Ver todas las documentaciones</span>
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6 3.5L10.5 8L6 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Dynamic Looping Marquee */}
      {isLoading ? (
        <div className="flex items-center gap-3 py-1 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-12 w-36 rounded-[14px] border border-neutral-300/80 bg-[#f2f2f2] animate-pulse shrink-0"
            />
          ))}
        </div>
      ) : platforms.length > 0 ? (
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex items-center gap-3 py-1">
            {/* Double list to create seamless infinite loop */}
            {[...platforms, ...platforms].map((platform, idx) => (
              <Link
                key={`${platform.slug}-${idx}`}
                href={`/docs/${platform.slug}`}
                className="rounded-[14px] border border-neutral-300/80 bg-[#f2f2f2] px-4.5 py-3 flex items-center gap-3 shrink-0 select-none hover:border-neutral-400 transition-colors shadow-2xs cursor-pointer group active:scale-[0.98]"
              >
                <div className="w-7 h-7 shrink-0 transition-transform group-hover:scale-105">
                  {renderPlatformLogo(platform.logo_key ?? platform.slug, "w-7 h-7")}
                </div>
                <span className="text-[14.5px] font-semibold text-neutral-950 whitespace-nowrap group-hover:text-[#2496ED] transition-colors">
                  {platform.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-[14px] border border-neutral-300/80 bg-white/60 p-6 text-center">
          <p className="text-xs text-neutral-500">
            Explora el{" "}
            <Link href="/docs" className="text-[#2496ED] underline font-medium">
              directorio de documentación
            </Link>{" "}
            para consultar las especificaciones disponibles.
          </p>
        </div>
      )}
    </section>
  );
}
