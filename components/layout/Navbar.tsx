"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RemoraLogo } from "@/components/shared/RemoraLogo";

interface NavItem {
  name: string;
  href: string;
  badge?: string;
  disabled?: boolean;
}

const NAV_LINKS: NavItem[] = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "Docs", href: "/#docs" },
  { name: "Capabilities", href: "/#capabilities" },
  { name: "Why", href: "/#why" },
  { name: "Reviews", href: "/#reviews" },
  { name: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-neutral-100 bg-[#f2f2f2]/80 backdrop-blur-xs sticky top-0 z-30">
      <div className="w-full px-6 sm:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand + Navigation links with active route indicator */}
        <div className="flex items-center gap-6 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold text-[17px] tracking-[-0.03em] text-neutral-950 hover:opacity-85 transition-opacity leading-none -translate-y-px group"
          >
            <RemoraLogo className="w-6 h-6 text-[#2496ED] shrink-0 transition-transform group-hover:scale-105" size={24} />
            <span>REMORA</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-5 text-xs tracking-[-0.01em] h-14">
            {NAV_LINKS.map((item) => {
              if (item.disabled) {
                return (
                  <div
                    key={item.name}
                    className="h-14 flex items-center gap-1.5 text-xs font-medium text-neutral-400 select-none cursor-not-allowed"
                    title="Coming soon"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono uppercase tracking-wider px-1 py-0.2 rounded-sm bg-neutral-100 text-neutral-400 font-normal">
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              }

              const isActive =
                !item.href.includes("#") &&
                (pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative h-14 flex items-center gap-1.5 text-xs transition-colors ${
                    isActive
                      ? "text-neutral-950 font-semibold"
                      : "text-neutral-500 hover:text-neutral-900 font-medium"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono uppercase tracking-wider px-1 py-0.2 rounded-sm bg-neutral-100 text-neutral-400 font-normal">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2496ED]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right actions: perfectly height-matched & centered */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/login"
            className="h-8 px-2.5 rounded-[10px] text-xs font-medium tracking-[-0.01em] text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-colors flex items-center justify-center leading-none"
          >
            Sign in
          </Link>

          <Link
            href="/login"
            className="h-8 px-3.5 rounded-[10px] bg-[#2496ED] text-white text-xs font-medium tracking-[-0.01em] hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center leading-none shadow-xs"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
