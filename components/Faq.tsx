"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How is Remora different from standard llms.txt?",
    answer:
      "Standard llms.txt files are flat Markdown dumps written for human eyes: they contain verbose prose, introductory fluff, and unstructured text that waste model context. Remora compiles documentation into a machine-native Abstract Syntax Tree (AST) with strict type boundaries, schemas, and zero conversational padding.",
  },
  {
    question: "Does Remora support private repositories?",
    answer:
      "Yes. Remora connects to private GitHub and GitLab repositories using isolated worker sandboxes. Your code and internal schemas are never logged, exposed publicly, or used for model training.",
  },
  {
    question: "Can I keep my existing human documentation?",
    answer:
      "Yes. Remora runs alongside existing platforms like Mintlify, GitBook, Docusaurus, or Nextra. Human engineers browse your normal web documentation, while AI coding agents query Remora's dedicated machine endpoint.",
  },
  {
    question: "Can I host the schemas on my own domain?",
    answer:
      "Yes. You can route queries through a custom domain (e.g. docs.api.yourcompany.com) or commit static AST manifests directly to your repository for offline and local LLM workflows.",
  },
  {
    question: "How do I connect Remora to my codebase?",
    answer:
      "Install our GitHub App or run `npx remora init` in your repository. Initial AST indexing finishes in under a minute, and continuous webhooks keep schemas updated on every commit.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="pt-4">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-[17px] sm:text-[19px] font-semibold tracking-[-0.02em] text-neutral-950">
          Frequently asked questions
        </h2>
        <p className="text-[14px] text-neutral-600 mt-1 leading-relaxed">
          Everything you need to know about machine-native documentation and agent integration.
        </p>
      </div>

      {/* Accordion List */}
      <div className="rounded-[16px] border border-neutral-200/80 bg-white overflow-hidden divide-y divide-neutral-100">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={idx} className="transition-colors hover:bg-neutral-50/40">
              <button
                onClick={() => toggleItem(idx)}
                className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-[14.5px] font-medium tracking-[-0.01em] transition-colors ${
                    isOpen ? "text-neutral-950 font-semibold" : "text-neutral-800 group-hover:text-neutral-950"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-out ${
                    isOpen
                      ? "rotate-180 bg-[#2496ED]/10 text-[#2496ED]"
                      : "rotate-0 text-neutral-400 bg-neutral-100 group-hover:bg-neutral-200/60"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-4.5 pt-0 text-[13.5px] text-neutral-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

