"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RemoraLogo } from "@/components/shared/RemoraLogo";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface DashboardViewProps {
  user: User;
}

export function DashboardView({ user }: DashboardViewProps) {
  const router = useRouter();

  // Navigation state
  const [activeItem, setActiveItem] = useState<string>("introduction");

  // Repositories & pages
  const [repositories, setRepositories] = useState<string[]>([
    "remora/core",
    "acme/api-service",
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  // Ask Agent dialog
  const [showAskAgent, setShowAskAgent] = useState(false);
  const [agentPrompt, setAgentPrompt] = useState("");

  // User Profile Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+J / Cmd+J for Ask Agent
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setShowAskAgent(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside listener for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newItemName.trim();
    if (!trimmed) return;
    setRepositories([...repositories, trimmed]);
    setActiveItem(`repo-${trimmed}`);
    setNewItemName("");
    setShowAddModal(false);
  };

  return (
    <main className="min-h-screen w-full flex bg-white text-neutral-900 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* NAVIGATION SIDEBAR (Pegado al lateral con fondo #f2f2f2)                  */}
      {/* ========================================================================= */}
      <aside className="w-60 sm:w-64 min-h-screen bg-[#f2f2f2] border-r border-neutral-200/80 flex flex-col justify-between py-4 px-3 shrink-0 z-10">
        <div className="space-y-3">
          {/* Header con Logo de Remora */}
          <div className="px-2 py-1 mb-1 flex items-center justify-between">
            <Link
              href="/"
              title="Volver a Remora"
              className="flex items-center gap-2.5 font-semibold text-[15px] tracking-[-0.03em] text-neutral-950 hover:opacity-85 transition-opacity"
            >
              <RemoraLogo className="w-5 h-5 text-[#2496ED] shrink-0" size={20} />
              <span>REMORA</span>
            </Link>
          </div>

          {/* Menú de navegación plano y sin hijos, todo bien alineado */}
          <nav className="space-y-0.5">
            <button
              type="button"
              onClick={() => setActiveItem("introduction")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] text-xs tracking-[-0.01em] transition-all cursor-pointer ${
                activeItem === "introduction"
                  ? "bg-white text-neutral-950 font-semibold shadow-2xs border border-neutral-200/70"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60 font-medium"
              }`}
            >
              <svg className="w-4 h-4 text-neutral-400 shrink-0" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 2H12.5C12.7761 2 13 2.22386 13 2.5V13.5C13 13.7761 12.7761 14 12.5 14H3.5C3.22386 14 3 13.7761 3 13.5V2.5C3 2.22386 3.22386 2 3.5 2Z" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5.5 5.5H10.5M5.5 8H10.5M5.5 10.5H8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span>Introduction</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveItem("quickstart")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] text-xs tracking-[-0.01em] transition-all cursor-pointer ${
                activeItem === "quickstart"
                  ? "bg-white text-neutral-950 font-semibold shadow-2xs border border-neutral-200/70"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60 font-medium"
              }`}
            >
              <svg className="w-4 h-4 text-neutral-400 shrink-0" viewBox="0 0 16 16" fill="none">
                <path d="M10 2C10 2 13.5 2.5 14 6C14 8 12.5 10 10.5 11L8.5 9L10 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M8.5 9L6 9.5L4 12L4.5 13.5L6 14L8.5 12L9 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <circle cx="10.5" cy="5.5" r="0.9" fill="currentColor" />
              </svg>
              <span>Quickstart</span>
            </button>

            {repositories.map((repo) => {
              const isSelected = activeItem === `repo-${repo}`;
              return (
                <button
                  key={repo}
                  type="button"
                  onClick={() => setActiveItem(`repo-${repo}`)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] text-xs tracking-[-0.01em] transition-all cursor-pointer truncate ${
                    isSelected
                      ? "bg-white text-neutral-950 font-semibold shadow-2xs border border-neutral-200/70"
                      : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60 font-medium"
                  }`}
                >
                  <svg className="w-4 h-4 text-neutral-400 shrink-0" viewBox="0 0 16 16" fill="none">
                    <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H12.5C12.7761 2 13 2.22386 13 2.5V14L8 11.5L3 14V2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                  <span className="truncate">{repo}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setActiveItem("settings")}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] text-xs tracking-[-0.01em] transition-all cursor-pointer ${
                activeItem === "settings"
                  ? "bg-white text-neutral-950 font-semibold shadow-2xs border border-neutral-200/70"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60 font-medium"
              }`}
            >
              <svg className="w-4 h-4 text-neutral-400 shrink-0" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 1.75V3.25M8 12.75V14.25M1.75 8H3.25M12.75 8H14.25M3.58 3.58L4.64 4.64M11.36 11.36L12.42 12.42M3.58 12.42L4.64 11.36M11.36 4.64L12.42 3.58" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Pinned Action Button */}
        <div className="pt-3 border-t border-neutral-200/80">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="w-full h-8.5 px-2.5 rounded-[8px] bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>New page</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT CANVAS (Fondo blanco)                                      */}
      {/* ========================================================================= */}
      <div className="flex-1 min-h-screen flex flex-col bg-white overflow-y-auto relative">
        {/* Píldora de perfil flotante (sin ocupar espacio de navbar) */}
        <div className="fixed top-4 right-6 sm:right-8 z-30" ref={dropdownRef}>
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
                ? "bg-neutral-200 border-neutral-300 shadow-inner"
                : "bg-neutral-100/90 hover:bg-neutral-200/70 border-neutral-200/80 shadow-2xs backdrop-blur-xs"
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
                  href="/"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-center justify-between px-2.5 py-1.5 rounded-[8px] tracking-[-0.01em] text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/90 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" viewBox="0 0 16 16" fill="none">
                      <path d="M2.5 6.5L8 2L13.5 6.5V13C13.5 13.5523 13.0523 14 12.5 14H3.5C2.94772 14 2.5 13.5523 2.5 13V6.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                      <path d="M6 14V8.5H10V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <span>Volver al inicio</span>
                  </div>
                  <svg className="w-3 h-3 text-neutral-300 group-hover:text-neutral-500 transition-colors" viewBox="0 0 16 16" fill="none">
                    <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setActiveItem("settings");
                    setDropdownOpen(false);
                  }}
                  className="group w-full flex items-center justify-between px-2.5 py-1.5 rounded-[8px] tracking-[-0.01em] text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/90 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M8 1.75V3.25M8 12.75V14.25M1.75 8H3.25M12.75 8H14.25M3.58 3.58L4.64 4.64M11.36 11.36L12.42 12.42M3.58 12.42L4.64 11.36M11.36 4.64L12.42 3.58" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <span>Ajustes del workspace</span>
                  </div>
                </button>
              </div>

              {/* Separador */}
              <div className="h-px bg-neutral-200/70 my-1" />

              {/* Cerrar sesión */}
              <button
                type="button"
                onClick={handleSignOut}
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

        {/* Canvas Body: Contenido de documentación con Lorem Ipsum */}
        <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12 space-y-7">
          {/* Header del documento */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-[38px] font-bold tracking-[-0.035em] text-neutral-950 leading-tight">
              {activeItem === "introduction"
                ? "Lorem Ipsum Dolor Sit Amet"
                : activeItem === "quickstart"
                ? "Consectetur Adipiscing Elit"
                : activeItem === "settings"
                ? "Workspace & System Settings"
                : activeItem.replace("repo-", "")}
            </h1>
            <p className="text-[16px] text-neutral-600 tracking-[-0.015em] leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>

          {/* Párrafo introductorio */}
          <p className="text-[14.5px] text-neutral-600 leading-relaxed tracking-[-0.01em]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi nulla, quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
          </p>

          {/* Callout / Nota informativa */}
          <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/80 p-4 flex items-start gap-3 shadow-2xs">
            <div className="text-[#2496ED] mt-0.5 shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div className="text-[13px] text-neutral-700 leading-relaxed">
              <strong className="font-semibold text-neutral-900">Nota: </strong>
              <span>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam nec odio vel lacus convallis tincidunt. Phasellus fermentum in dolor sit amet hendrerit.
              </span>
            </div>
          </div>

          {/* Sección 1: Estructura y Sintaxis */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.025em] text-neutral-950">
              Estructura y Sintaxis
            </h2>
            <p className="text-[14.5px] text-neutral-600 leading-relaxed tracking-[-0.01em]">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            {/* Snippet de código / Configuración */}
            <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 shadow-2xs overflow-hidden mt-3">
              <div className="px-4 py-2 border-b border-neutral-200/60 bg-neutral-100/70 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>config.json</span>
                <span className="text-[11px] text-neutral-400">JSON</span>
              </div>
              <pre className="p-4 text-xs font-mono text-neutral-800 overflow-x-auto leading-relaxed bg-neutral-50/40">
{`{
  "project": "remora-ast",
  "version": "1.0.0",
  "lorem": {
    "ipsum": "dolor-sit-amet",
    "consectetur": true,
    "maxDepth": 5
  }
}`}
              </pre>
            </div>
          </div>

          {/* Sección 2: Parámetros del Protocolo */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.025em] text-neutral-950">
              Parámetros del Protocolo
            </h2>
            <p className="text-[14.5px] text-neutral-600 leading-relaxed tracking-[-0.01em]">
              Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam:
            </p>

            <ul className="space-y-2.5 text-[14px] text-neutral-600 pl-4 list-disc marker:text-neutral-400">
              <li>
                <strong className="text-neutral-900 font-semibold font-mono text-[13px]">lorem.init()</strong>: Praesent libero sed cursus ante dapibus diam.
              </li>
              <li>
                <strong className="text-neutral-900 font-semibold font-mono text-[13px]">ipsum.resolve()</strong>: Quis sem at nibh elementum imperdiet duis sagittis ipsum.
              </li>
              <li>
                <strong className="text-neutral-900 font-semibold font-mono text-[13px]">dolor.transform()</strong>: Vestibulum lacinia arcu eget nulla class aptent taciti sociosqu.
              </li>
            </ul>
          </div>

          {/* Párrafo final / Resumen */}
          <div className="space-y-3 pt-2 pb-8 border-t border-neutral-100">
            <p className="text-[14.5px] text-neutral-600 leading-relaxed tracking-[-0.01em]">
              Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: New Page / Add Repository                                          */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-2xs">
          <div className="w-full max-w-sm bg-white rounded-xl border border-neutral-200 p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-950 tracking-[-0.02em]">
                New page / Add repository
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-neutral-700 text-base leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNew} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                  Nombre o ruta
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Quickstart o usuario/proyecto"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  autoFocus
                  className="w-full h-9 px-3 rounded-[8px] bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 text-xs tracking-[-0.01em] outline-none focus:border-[#2496ED] focus:bg-white transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="h-8 px-3 rounded-[8px] text-xs font-medium tracking-[-0.01em] text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8 px-3.5 rounded-[8px] bg-[#2496ED] hover:brightness-95 text-white text-xs font-medium tracking-[-0.01em] transition-all cursor-pointer shadow-xs"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Ask Agent (Ctrl + J)                                               */}
      {/* ========================================================================= */}
      {showAskAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-2xs">
          <div className="w-full max-w-lg bg-white rounded-xl border border-neutral-200 p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-[#2496ED] font-mono font-bold">#</span>
                <span className="text-sm font-semibold text-neutral-950 tracking-[-0.02em]">
                  Ask agent
                </span>
                <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                  Ctrl + J
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAskAgent(false)}
                className="text-neutral-400 hover:text-neutral-700 text-base leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Ask anything about your documentation or codebase..."
              value={agentPrompt}
              onChange={(e) => setAgentPrompt(e.target.value)}
              autoFocus
              className="w-full h-10 px-3.5 rounded-[10px] border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#2496ED] focus:bg-white transition-colors"
            />

            <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-400 font-mono">
              <span>Powered by Remora AST Context</span>
              <button
                type="button"
                onClick={() => setShowAskAgent(false)}
                className="h-7 px-3 rounded-[6px] bg-[#2496ED] text-white font-medium hover:brightness-95 transition-all cursor-pointer"
              >
                Preguntar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
