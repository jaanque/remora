import React from "react";
import Link from "next/link";
import {
  StripeLogo,
  GitHubLogo,
  SupabaseLogo,
  OpenAiLogo,
  AnthropicLogo,
  NextjsLogo,
  DockerLogo,
  LinearLogo,
  PrismaLogo,
  CloudflareLogo,
} from "@/components/docs/PlatformLogos";

const PLATFORMS = [
  { name: "Stripe", logo: <StripeLogo className="w-7 h-7" /> },
  { name: "GitHub", logo: <GitHubLogo className="w-7 h-7" /> },
  { name: "Supabase", logo: <SupabaseLogo className="w-7 h-7" /> },
  { name: "OpenAI", logo: <OpenAiLogo className="w-7 h-7" /> },
  { name: "Anthropic", logo: <AnthropicLogo className="w-7 h-7" /> },
  { name: "Next.js", logo: <NextjsLogo className="w-7 h-7" /> },
  { name: "Docker", logo: <DockerLogo className="w-7 h-7" /> },
  { name: "Linear", logo: <LinearLogo className="w-7 h-7" /> },
  { name: "Prisma", logo: <PrismaLogo className="w-7 h-7" /> },
  { name: "Cloudflare", logo: <CloudflareLogo className="w-7 h-7" /> },
];

export function DocsExplorer() {
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

      {/* Infinite Horizontal Looping Marquee */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex items-center gap-3 py-1">
          {/* Double list to create seamless infinite loop */}
          {[...PLATFORMS, ...PLATFORMS].map((platform, idx) => (
            <Link
              key={`${platform.name}-${idx}`}
              href="/docs"
              className="rounded-[14px] border border-neutral-300/80 bg-[#f2f2f2] px-4.5 py-3 flex items-center gap-3 shrink-0 select-none hover:border-neutral-400 transition-colors shadow-2xs cursor-pointer"
            >
              {platform.logo}
              <span className="text-[14.5px] font-semibold text-neutral-950 whitespace-nowrap">
                {platform.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
