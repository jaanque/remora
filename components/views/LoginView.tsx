"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RemoraLogo } from "@/components/shared/RemoraLogo";
import { LoginOceanSide } from "@/components/auth/LoginOceanSide";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function LoginView() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!configured) {
      setError(
        "Supabase aún no está configurado. Añade NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu archivo .env.local."
      );
      return;
    }

    const supabase = createClient();

    if (mode === "register") {
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }

      setLoading(true);
      try {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName.trim() || undefined,
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }

        // If session is immediately returned (auto-confirm enabled)
        if (data.session) {
          setSuccess("¡Cuenta creada e inicio de sesión exitoso! Redirigiendo al dashboard...");
          setTimeout(() => {
            router.push("/dashboard");
            router.refresh();
          }, 800);
        } else {
          // Email confirmation is required by Supabase settings
          setSuccess(
            "¡Cuenta creada con éxito! Hemos enviado un correo de confirmación. Revisa tu bandeja de entrada para verificar tu cuenta."
          );
          setLoading(false);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error inesperado al registrarse.");
        setLoading(false);
      }
    } else {
      // Login mode
      setLoading(true);
      try {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          if (signInError.message.includes("Invalid login credentials")) {
            setError("Credenciales incorrectas. Verifica tu email y contraseña.");
          } else if (signInError.message.includes("Email not confirmed")) {
            setError("Tu email aún no ha sido confirmado. Revisa tu bandeja de entrada.");
          } else {
            setError(signInError.message);
          }
          setLoading(false);
          return;
        }

        setSuccess("Inicio de sesión correcto. Redirigiendo al dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 600);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error inesperado al iniciar sesión.");
        setLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen w-full flex bg-[#f2f2f2] overflow-x-hidden">
      {/* LEFT COLUMN: Content & Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between z-20 bg-[#f2f2f2]">
        {/* Top Navbar Header - Exact match in height (h-14), padding, and alignment to the Home Navbar */}
        <header className="w-full border-b border-neutral-100 bg-[#f2f2f2]/80 backdrop-blur-xs sticky top-0 z-30">
          <div className="w-full px-6 sm:px-8 h-14 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold text-[17px] tracking-[-0.03em] text-neutral-950 hover:opacity-85 transition-opacity leading-none -translate-y-px group"
            >
              <RemoraLogo
                className="w-6 h-6 text-[#2496ED] shrink-0 transition-transform group-hover:scale-105"
                size={24}
              />
              <span>REMORA</span>
            </Link>

            <Link
              href="/"
              className="h-8 px-2.5 rounded-[10px] text-xs font-medium tracking-[-0.01em] text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200/50 transition-colors flex items-center gap-1.5 leading-none"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Volver al inicio</span>
            </Link>
          </div>
        </header>

        {/* Center: Auth Box */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-10">
          <div className="w-full max-w-[380px] mx-auto">
            {/* Smooth Animated Title and Subtitle */}
            <div className="relative h-[68px] mb-6 overflow-hidden select-none">
              <div
                className={`absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mode === "login"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <h1 className="text-[26px] sm:text-[28px] font-bold tracking-[-0.03em] text-neutral-950 leading-tight">
                  Iniciar sesión
                </h1>
                <p className="text-[13.5px] text-neutral-600 mt-1.5 leading-relaxed">
                  Ingresa a tu cuenta de Remora con tus credenciales.
                </p>
              </div>

              <div
                className={`absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mode === "register"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <h1 className="text-[26px] sm:text-[28px] font-bold tracking-[-0.03em] text-neutral-950 leading-tight">
                  Crear cuenta
                </h1>
                <p className="text-[13.5px] text-neutral-600 mt-1.5 leading-relaxed">
                  Regístrate para comenzar a utilizar endpoints para agentes de IA.
                </p>
              </div>
            </div>

            {/* Configuration Alert if .env.local is missing keys */}
            {!configured && (
              <div className="mb-5 p-3.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs leading-relaxed">
                <div className="font-semibold flex items-center gap-1.5 mb-1 text-amber-950">
                  <svg className="w-4 h-4 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Configuración de Supabase pendiente
                </div>
                <p>
                  Recuerda añadir tus claves de Supabase en <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">.env.local</code> para activar la autenticación real.
                </p>
              </div>
            )}

            {/* Mode Switcher with Smooth Sliding Indicator */}
            <div className="relative flex rounded-[10px] bg-neutral-200/70 p-1 mb-6 text-[13px] font-medium select-none">
              {/* Animated active pill background */}
              <div
                aria-hidden="true"
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-[8px] bg-white shadow-xs transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mode === "login" ? "translate-x-0" : "translate-x-full"
                }`}
              />
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`relative z-10 flex-1 py-1.5 text-center transition-colors duration-200 cursor-pointer ${
                  mode === "login"
                    ? "text-neutral-950 font-semibold"
                    : "text-neutral-600 hover:text-neutral-950 font-normal"
                }`}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`relative z-10 flex-1 py-1.5 text-center transition-colors duration-200 cursor-pointer ${
                  mode === "register"
                    ? "text-neutral-950 font-semibold"
                    : "text-neutral-600 hover:text-neutral-950 font-normal"
                }`}
              >
                Registrarse
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-[10px] border border-red-200 bg-red-50/90 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
                <svg className="w-4 h-4 shrink-0 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div className="flex-1 leading-relaxed">{error}</div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3.5 rounded-[10px] border border-emerald-200 bg-emerald-50/90 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  ✓
                </div>
                <div className="flex-1 leading-relaxed">{success}</div>
              </div>
            )}

            {/* Auth Form with Smooth Accordion Transitions */}
            <form onSubmit={handleSubmit}>
              {/* Full Name field (smooth slide & expand for register mode) */}
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mode === "register"
                    ? "grid-rows-[1fr] opacity-100 mb-3.5"
                    : "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1"
                  >
                    Nombre completo
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Tu nombre o empresa"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    tabIndex={mode === "register" ? 0 : -1}
                    className="w-full h-10 px-3.5 rounded-[10px] border border-neutral-200/90 bg-[#f2f2f2] text-neutral-900 placeholder:text-neutral-400 text-[13px] outline-none focus:border-[#2496ED] focus:ring-1 focus:ring-[#2496ED] transition-colors"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="mb-3.5">
                <label
                  htmlFor="email"
                  className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="nombre@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-[10px] border border-neutral-200/90 bg-[#f2f2f2] text-neutral-900 placeholder:text-neutral-400 text-[13px] outline-none focus:border-[#2496ED] focus:ring-1 focus:ring-[#2496ED] transition-colors"
                />
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-[10px] border border-neutral-200/90 bg-[#f2f2f2] text-neutral-900 placeholder:text-neutral-400 text-[13px] outline-none focus:border-[#2496ED] focus:ring-1 focus:ring-[#2496ED] transition-colors"
                />
              </div>

              {/* Confirm Password field (smooth slide & expand for register mode) */}
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mode === "register"
                    ? "grid-rows-[1fr] opacity-100 mt-3.5"
                    : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required={mode === "register"}
                    minLength={6}
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    tabIndex={mode === "register" ? 0 : -1}
                    className="w-full h-10 px-3.5 rounded-[10px] border border-neutral-200/90 bg-[#f2f2f2] text-neutral-900 placeholder:text-neutral-400 text-[13px] outline-none focus:border-[#2496ED] focus:ring-1 focus:ring-[#2496ED] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button with Smooth Cross-Fade */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 mt-5 px-4 rounded-[10px] bg-[#2496ED] hover:brightness-95 active:scale-[0.99] text-white text-[13px] font-medium tracking-[-0.01em] transition-all flex items-center justify-center cursor-pointer shadow-xs disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden relative"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Procesando...</span>
                  </div>
                ) : (
                  <div className="relative h-5 w-full flex items-center justify-center">
                    <span
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        mode === "login"
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      Iniciar sesión
                    </span>
                    <span
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        mode === "register"
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                    >
                      Crear cuenta
                    </span>
                  </div>
                )}
              </button>
            </form>

            {/* Smooth Switch Mode Footer Link */}
            <div className="mt-5 text-center text-[12.5px] text-neutral-500 relative h-5 overflow-hidden">
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mode === "login"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <span>
                  ¿No tienes una cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("register")}
                    className="text-[#2496ED] font-medium hover:underline cursor-pointer"
                  >
                    Regístrate aquí
                  </button>
                </span>
              </div>

              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mode === "register"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <span>
                  ¿Ya tienes una cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="text-[#2496ED] font-medium hover:underline cursor-pointer"
                  >
                    Inicia sesión aquí
                  </button>
                </span>
              </div>
            </div>

            {/* Legal disclaimer */}
            <p className="text-[11.5px] text-neutral-400 text-center mt-6 leading-relaxed">
              Al continuar, aceptas nuestros{" "}
              <Link href="/" className="underline hover:text-neutral-700 transition-colors">
                Términos de servicio
              </Link>{" "}
              y{" "}
              <Link href="/" className="underline hover:text-neutral-700 transition-colors">
                Política de privacidad
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-6" />
      </div>

      {/* RIGHT COLUMN: Ocean Blue + Vertical Stepped Skyline Intersection */}
      <LoginOceanSide />
    </main>
  );
}
