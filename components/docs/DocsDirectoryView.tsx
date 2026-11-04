"use client";

import React, { useState, useMemo } from "react";
import { DocsNavbar } from "@/components/layout/DocsNavbar";
import { Footer } from "@/components/layout/Footer";
import { DOCUMENTATIONS, type DocItem } from "@/lib/docs/docs-data";

export function DocsDirectoryView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Filter documentations based solely on search query
  const filteredDocs = useMemo(() => {
    if (!searchQuery.trim()) return DOCUMENTATIONS;

    const q = searchQuery.toLowerCase().trim();
    return DOCUMENTATIONS.filter((doc) => {
      const matchName = doc.name.toLowerCase().includes(q);
      const matchDesc = doc.description.toLowerCase().includes(q);
      const matchTags = doc.tags.some((t) => t.toLowerCase().includes(q));
      return matchName || matchDesc || matchTags;
    });
  }, [searchQuery]);

  const handleCopyEndpoint = (doc: DocItem) => {
    const endpoint = `https://api.remora.dev/v1/docs/${doc.slug}.json`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(endpoint);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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

        {/* Grid: Only Logo, Title, Mini-Paragraph, and Read Button */}
        {filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="rounded-[14px] border border-neutral-300/80 bg-[#f2f2f2] hover:border-neutral-400 p-4.5 flex flex-col justify-between transition-colors shadow-2xs select-none"
              >
                <div>
                  {/* 1. Logo */}
                  <div className="w-8 h-8 shrink-0 mb-3">
                    {doc.logo}
                  </div>

                  {/* 2. Titulo */}
                  <h2 className="text-[15px] font-semibold text-neutral-950 leading-snug">
                    {doc.name}
                  </h2>

                  {/* 3. Mini Parrafo */}
                  <p className="text-[13px] text-neutral-600 mt-1 leading-relaxed line-clamp-2">
                    {doc.description}
                  </p>
                </div>

                {/* 4. Boton de leer */}
                <div className="mt-4 pt-3 border-t border-neutral-300/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="h-8 px-3 rounded-lg bg-white hover:bg-neutral-100 active:scale-95 border border-neutral-300/80 text-xs font-medium text-neutral-900 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Leer</span>
                    <svg
                      className="w-3.5 h-3.5 text-neutral-500"
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
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[14px] border border-neutral-300/80 bg-white p-10 text-center max-w-sm mx-auto my-8">
            <p className="text-sm font-semibold text-neutral-900">
              No se encontraron resultados
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              No hay coincidencias para &quot;{searchQuery}&quot;.
            </p>
          </div>
        )}
      </div>

      {/* Reader Modal when clicking "Leer" */}
      {selectedDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="w-full max-w-lg rounded-[18px] bg-[#f2f2f2] border border-neutral-300/90 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.18)] p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 shrink-0">{selectedDoc.logo}</div>
                <div>
                  <h3 className="text-base font-bold text-neutral-950">
                    {selectedDoc.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    remora.dev/docs/{selectedDoc.slug}.json
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="w-7 h-7 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {selectedDoc.description}
              </p>

              {/* AST Schema Preview */}
              <div className="mt-3 p-3 rounded-[10px] bg-neutral-900 text-neutral-200 font-mono text-[11px] leading-relaxed overflow-x-auto">
                <div className="text-neutral-400">
                  {"// Machine-native schema snippet for AI agents"}
                </div>
                <div>{`{`}</div>
                <div className="pl-3">{`"module": "${selectedDoc.slug}",`}</div>
                <div className="pl-3">{`"version": "${selectedDoc.version}",`}</div>
                <div className="pl-3">{`"type_definitions": ${selectedDoc.endpointsCount},`}</div>
                <div className="pl-3">{`"format": "AST_OPTIMIZED_V2"`}</div>
                <div>{`}`}</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-300/70">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="h-8 px-3 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Cerrar
              </button>

              <button
                type="button"
                onClick={() => handleCopyEndpoint(selectedDoc)}
                className={`h-8 px-3.5 rounded-lg text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  isCopied
                    ? "bg-emerald-600 text-white"
                    : "bg-[#2496ED] hover:bg-[#1f84d1] text-white active:scale-95"
                }`}
              >
                {isCopied ? "¡Endpoint copiado!" : "Copiar endpoint"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
