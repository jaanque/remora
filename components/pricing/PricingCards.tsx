import React from "react";
import Link from "next/link";

export function PricingCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
      {/* Plan 1: Community (Free) */}
      <div className="rounded-[10px] border border-neutral-200/90 bg-white p-5 flex flex-col justify-between hover:border-neutral-300 transition-colors">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-xs tracking-tight text-neutral-900">
              Community
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[6px] bg-neutral-100 text-neutral-600">
              Free
            </span>
          </div>

          <div className="mt-3 mb-4">
            <span className="text-3xl font-semibold tracking-[-0.035em] text-neutral-950">
              $0
            </span>
            <span className="text-xs text-neutral-400 ml-1">/ forever</span>
          </div>

          <p className="text-[12px] text-neutral-500 leading-relaxed mb-4">
            For open-source projects and builders hosting machine docs for AI agents.
          </p>

          <ul className="space-y-2 text-[12px] text-neutral-600 border-t border-neutral-100 pt-4">
            <li className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Up to 50 agent-native doc pages</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Automatic llms.txt generation</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Basic token compression (up to 40%)</span>
            </li>
          </ul>
        </div>

        <Link
          href="/login"
          className="mt-6 w-full h-8 rounded-[10px] border border-neutral-200/80 hover:border-neutral-300 text-neutral-700 hover:text-black text-xs font-medium tracking-[-0.01em] transition-colors flex items-center justify-center cursor-pointer"
        >
          Start free
        </Link>
      </div>

      {/* Plan 2: Pro */}
      <div className="relative group flex flex-col">
        {/* Dynamic Linear 1px gradient border */}
        <div className="relative rounded-[10px] p-[1px] bg-gradient-to-r from-violet-500/50 via-fuchsia-500/50 to-cyan-400/50 animate-aura group-hover:from-violet-500/80 group-hover:via-fuchsia-500/80 group-hover:to-cyan-400/80 transition-all duration-300 flex-1 flex flex-col">
          {/* Inner card surface */}
          <div className="rounded-[9px] bg-white p-5 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs tracking-tight text-neutral-900">
                  Pro
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[6px] bg-neutral-950 text-white font-medium">
                  Popular
                </span>
              </div>

              <div className="mt-3 mb-4">
                <span className="text-3xl font-semibold tracking-[-0.035em] text-neutral-950">
                  $29
                </span>
                <span className="text-xs text-neutral-400 ml-1">/ month</span>
              </div>

              <p className="text-[12px] text-neutral-500 leading-relaxed mb-4">
                For fast-shipping teams feeding Cursor, Claude, and production AI agents.
              </p>

              <ul className="space-y-2 text-[12px] text-neutral-700 border-t border-neutral-100 pt-4">
                <li className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-neutral-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Unlimited agent documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-neutral-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Advanced AST token compression (up to 80%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-neutral-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Continuous GitHub repo auto-sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-neutral-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Real-time agent endpoints &amp; llms.txt</span>
                </li>
              </ul>
            </div>

            <Link
              href="/login"
              className="mt-6 w-full h-8 rounded-[10px] bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-medium tracking-[-0.01em] transition-colors flex items-center justify-center cursor-pointer active:scale-[0.98]"
            >
              Get started with Pro
            </Link>
          </div>
        </div>
      </div>

      {/* Plan 3: Enterprise */}
      <div className="rounded-[10px] border border-neutral-200/90 bg-white p-5 flex flex-col justify-between hover:border-neutral-300 transition-colors">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-xs tracking-tight text-neutral-900">
              Enterprise
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[6px] bg-neutral-100 text-neutral-600">
              Custom
            </span>
          </div>

          <div className="mt-3 mb-4">
            <span className="text-3xl font-semibold tracking-[-0.035em] text-neutral-950">
              Custom
            </span>
            <span className="text-xs text-neutral-400 ml-1">/ volume</span>
          </div>

          <p className="text-[12px] text-neutral-500 leading-relaxed mb-4">
            For organizations with private repos, custom fine-tuned tokens, and SLAs.
          </p>

          <ul className="space-y-2 text-[12px] text-neutral-600 border-t border-neutral-100 pt-4">
            <li className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Private VPC / On-prem doc hosting</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Dedicated private agent context servers</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Custom semantic token encodings</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>SOC2 Type II compliance & 99.99% SLA</span>
            </li>
          </ul>
        </div>

        <Link
          href="/login"
          className="mt-6 w-full h-8 rounded-[10px] border border-neutral-200/80 hover:border-neutral-300 text-neutral-700 hover:text-black text-xs font-medium tracking-[-0.01em] transition-colors flex items-center justify-center cursor-pointer"
        >
          Contact sales
        </Link>
      </div>
    </section>
  );
}
