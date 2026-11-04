"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RemoraLogo } from "@/components/shared/RemoraLogo";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    let isMounted = true;

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (isMounted) {
        setUser(user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (!isSupabaseConfigured()) return;
    setIsSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setIsSigningOut(false);
    router.refresh();
  };

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

        {/* Right actions: user state or sign in / register */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDropdownOpen(!dropdownOpen);
                  }
                }}
                className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-[10px] border text-xs text-neutral-800 transition-all duration-150 cursor-pointer select-none active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#2496ED] ${
                  dropdownOpen
                    ? "bg-neutral-200/90 border-neutral-300 shadow-inner"
                    : "bg-neutral-200/50 hover:bg-neutral-200/80 border-neutral-200/80 shadow-2xs"
                }`}
                aria-expanded={dropdownOpen}
              >
                <UserAvatar size={24} />
                <span className="text-xs font-medium tracking-[-0.01em] text-neutral-800 max-w-[130px] sm:max-w-[160px] truncate" title={user.email}>
                  {user.user_metadata?.full_name || user.email}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-neutral-800" : ""
                  }`}
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Menú desplegable elegante e integrado con la estética Remora */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-[14px] bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-[0_14px_36px_-6px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.03)] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
                  {/* Ficha de usuario */}
                  <div className="p-2.5 bg-neutral-100/70 rounded-[10px] mb-1.5 border border-neutral-200/60 flex items-center gap-2.5">
                    <UserAvatar size={26} className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold tracking-[-0.01em] text-neutral-900 truncate mb-0.5">
                        {user.user_metadata?.full_name || "Cuenta Remora"}
                      </p>
                      <p className="text-[11.5px] tracking-[-0.01em] text-neutral-500 truncate" title={user.email}>
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="space-y-0.5 text-xs">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="group flex items-center justify-between px-2.5 py-1.5 rounded-[8px] tracking-[-0.01em] text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/90 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" viewBox="0 0 16 16" fill="none">
                          <rect x="2" y="2" width="5" height="5" rx="1.25" stroke="currentColor" strokeWidth="1.3" />
                          <rect x="9" y="2" width="5" height="5" rx="1.25" stroke="currentColor" strokeWidth="1.3" />
                          <rect x="2" y="9" width="5" height="5" rx="1.25" stroke="currentColor" strokeWidth="1.3" />
                          <rect x="9" y="9" width="5" height="5" rx="1.25" stroke="currentColor" strokeWidth="1.3" />
                        </svg>
                        <span>Ir al Dashboard</span>
                      </div>
                      <svg className="w-3 h-3 text-neutral-300 group-hover:text-neutral-500 transition-colors" viewBox="0 0 16 16" fill="none">
                        <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

                    <Link
                      href="/#docs"
                      onClick={() => setDropdownOpen(false)}
                      className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-[8px] tracking-[-0.01em] text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/90 transition-colors"
                    >
                      <svg className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" viewBox="0 0 16 16" fill="none">
                        <path d="M2.5 3.25C2.5 2.55964 3.05964 2 3.75 2H13.5V13.5H3.75C3.05964 13.5 2.5 12.9404 2.5 12.25V3.25Z" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M2.5 11.5H13.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M5.5 5.5H10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M5.5 8H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      <span>Documentación</span>
                    </Link>
                  </div>

                  {/* Separador */}
                  <div className="h-px bg-neutral-200/70 my-1" />

                  {/* Cerrar sesión */}
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      handleSignOut();
                    }}
                    disabled={isSigningOut}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[8px] text-xs font-medium tracking-[-0.01em] text-red-600 hover:bg-red-50/80 hover:text-red-700 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 text-red-500" viewBox="0 0 16 16" fill="none">
                      <path d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M10.5 11L13.5 8L10.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 8H13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <span>{isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
