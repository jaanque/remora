import React from "react";

const FAQS = [
  {
    q: "How does agent-native documentation differ from human docs?",
    a: "Standard documentation is written for human eyes with narrative prose, UI screenshots, and verbose prose that waste LLM context windows. Remora formats your documentation into compact, structured semantic tokens and machine schemas, slashing token usage by up to 80% while maximizing agent comprehension.",
  },
  {
    q: "Can I host Remora docs alongside existing human documentation?",
    a: "Yes. Remora connects to your existing GitHub repo and documentation files (Markdown, MDX, OpenAPI), compiling and publishing an agent-dedicated endpoint (llms.txt and structured AST endpoints) alongside your existing human docs.",
  },
  {
    q: "How do AI agents like Cursor, Claude Code, or Codex consume the docs?",
    a: "Agents can connect directly to Remora's token-optimized endpoints or query machine-native schemas on demand. When an agent requests context, it receives precise, hallucination-resistant machine schemas instead of bloated HTML.",
  },
  {
    q: "Can I connect private repositories?",
    a: "Yes. Connect via our GitHub App with granular read-only permissions scoped specifically to chosen repos. Your docs and code schemas are compiled inside isolated sandboxes and never used for foundation model training.",
  },
];

export function PricingFaq() {
  return (
    <section className="pt-6 border-t border-neutral-100">
      <h2 className="text-[17px] font-semibold tracking-[-0.025em] text-neutral-900 mb-6">
        Frequently asked questions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-[10px] border border-neutral-200/70 p-4 bg-neutral-50/50 hover:bg-white hover:border-neutral-300 transition-colors"
          >
            <h3 className="text-xs font-semibold text-neutral-900 tracking-tight mb-1.5">
              {faq.q}
            </h3>
            <p className="text-[12px] text-neutral-500 leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
