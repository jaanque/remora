"use client";

import React, { useState } from "react";

interface DocInstallSnippetProps {
  command: string;
}

export function DocInstallSnippet({ command }: DocInstallSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback si el navegador restringe clipboard
      const input = document.createElement("input");
      input.value = command;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-neutral-300/80 bg-white p-3 sm:p-3.5 flex items-center justify-between gap-4 shadow-2xs">
      <div className="flex items-center gap-2.5 overflow-x-auto min-w-0">
        <span className="text-neutral-400 select-none text-xs sm:text-sm">$</span>
        <code className="text-xs sm:text-sm text-neutral-900 font-medium select-all whitespace-nowrap">
          {command}
        </code>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 h-7 sm:h-8 px-2.5 rounded-lg border border-neutral-300/80 bg-[#f8f8f8] hover:bg-neutral-100 text-xs font-medium text-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
        title="Copiar comando"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5 text-neutral-900" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5L6.5 12L13 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-neutral-900">Copiado</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5 text-neutral-500" viewBox="0 0 16 16" fill="none">
              <rect
                x="5"
                y="5"
                width="8"
                height="8"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M3 11V3.5C3 3.22386 3.22386 3 3.5 3H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>Copiar</span>
          </>
        )}
      </button>
    </div>
  );
}

