"use client";

import React from "react";
import Link from "next/link";
import { DocsNavbar } from "@/components/layout/DocsNavbar";
import { Footer } from "@/components/layout/Footer";
import { renderPlatformLogo } from "@/components/docs/PlatformLogos";
import { type DocItem, useDocs } from "@/logic/docs";

interface DocsDirectoryViewProps {
  initialDocs?: DocItem[];
}

function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }

  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
}

export function DocsDirectoryView({ initialDocs }: DocsDirectoryViewProps) {
  const {
    paginatedDocs,
    isLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount,
  } = useDocs(initialDocs);

  const getLogo = (doc: DocItem) => {
    if (doc.logo) return doc.logo;
    return renderPlatformLogo(doc.logo_key ?? doc.logoKey ?? doc.slug);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f2f2f2] flex flex-col justify-between selection:bg-[#2496ED]/20 selection:text-neutral-950 font-sans antialiased">
      {/* Dedicated Docs Navbar */}
      <DocsNavbar />

      <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 sm:py-12">
        {/* Clean Header */}
        <div className="mb-6">
          <h1 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.03em] text-neutral-950 leading-tight">
            Compiled documentation
          </h1>
          <p className="text-[13.5px] text-neutral-600 mt-1 leading-relaxed">
            Explora todas las documentaciones compiladas en formato nativo para agentes de IA.
          </p>
        </div>

        {/* Minimal Search Bar */}
        <div className="relative w-full max-w-md mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar documentación..."
            className="w-full h-10 pl-9 pr-8 rounded-[10px] border border-neutral-300/80 bg-white text-neutral-900 placeholder:text-neutral-400 text-[13px] outline-none focus:border-[#2496ED] focus:ring-1 focus:ring-[#2496ED] transition-colors shadow-2xs"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-2 px-2 flex items-center text-xs text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[14px] border border-neutral-300/80 bg-[#f2f2f2] p-4.5 flex flex-col justify-between shadow-2xs animate-pulse"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-neutral-300/70 mb-3" />
                  <div className="h-4 w-32 rounded-md bg-neutral-300/80 mb-2" />
                  <div className="space-y-1.5 mt-1">
                    <div className="h-3.5 w-full rounded bg-neutral-300/50" />
                    <div className="h-3.5 w-4/5 rounded bg-neutral-300/40" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-300/60 flex items-center justify-between">
                  <div className="h-8 w-16 rounded-lg bg-neutral-300/60" />
                </div>
              </div>
            ))}
          </div>
        ) : paginatedDocs.length > 0 ? (
          <>
            {/* Grid: 15 Cards per page */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {paginatedDocs.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/docs/${doc.slug}`}
                  className="rounded-[14px] border border-neutral-300/80 bg-[#f2f2f2] hover:border-neutral-400 p-4.5 flex flex-col justify-between transition-all duration-150 shadow-2xs select-none group cursor-pointer hover:shadow-xs active:scale-[0.99]"
                >
                  <div>
                    {/* 1. Logo */}
                    <div className="w-8 h-8 shrink-0 mb-3 transition-transform group-hover:scale-105">
                      {getLogo(doc)}
                    </div>

                    {/* 2. Titulo */}
                    <h2 className="text-[15px] font-semibold text-neutral-950 leading-snug group-hover:text-[#2496ED] transition-colors">
                      {doc.name}
                    </h2>

                    {/* 3. Mini Parrafo */}
                    <p className="text-[13px] text-neutral-600 mt-1 leading-relaxed line-clamp-2">
                      {doc.description}
                    </p>
                  </div>

                  {/* 4. Indicador de accion "Leer" */}
                  <div className="mt-4 pt-3 border-t border-neutral-300/60 flex items-center justify-between">
                    <span className="h-8 px-3 rounded-lg bg-white group-hover:bg-neutral-100 border border-neutral-300/80 text-xs font-medium text-neutral-900 transition-colors flex items-center gap-1.5 shadow-2xs">
                      <span>Leer</span>
                      <svg
                        className="w-3.5 h-3.5 text-neutral-500 transition-transform group-hover:translate-x-0.5"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6 3.5L10.5 8L6 12.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Simple & Clean Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 pt-6 border-t border-neutral-300/60 flex items-center justify-between gap-4 select-none">
                {/* Previous button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="h-8 px-3 rounded-lg border border-neutral-300/80 bg-white hover:bg-neutral-100 text-xs font-medium text-neutral-700 disabled:opacity-35 disabled:hover:bg-white disabled:cursor-not-allowed transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10 12.5L5.5 8L10 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Anterior</span>
                </button>

                {/* Desktop: Numeric Page buttons */}
                <div className="hidden sm:flex items-center gap-1">
                  {getPageNumbers(currentPage, totalPages).map((p, idx) =>
                    p === "..." ? (
                      <span key={`dots-${idx}`} className="px-2 text-xs text-neutral-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePageChange(Number(p))}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors shadow-2xs cursor-pointer ${
                          currentPage === p
                            ? "bg-neutral-950 text-white border border-neutral-950 font-semibold"
                            : "bg-white text-neutral-700 border border-neutral-300/80 hover:bg-neutral-100"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                {/* Mobile: Compact Page indicator */}
                <span className="sm:hidden text-xs text-neutral-500 font-medium">
                  {currentPage} / {totalPages}
                </span>

                {/* Next button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="h-8 px-3 rounded-lg border border-neutral-300/80 bg-white hover:bg-neutral-100 text-xs font-medium text-neutral-700 disabled:opacity-35 disabled:hover:bg-white disabled:cursor-not-allowed transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Siguiente</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 3.5L10.5 8L6 12.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-[14px] border border-neutral-300/80 bg-white p-10 text-center max-w-sm mx-auto my-8">
            <p className="text-sm font-semibold text-neutral-900">
              {searchQuery ? "No se encontraron resultados" : "No hay documentaciones disponibles"}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {searchQuery
                ? `No hay coincidencias para "${searchQuery}".`
                : "Inserta registros en la tabla 'docs' de Supabase para ver las cards aquí."}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
