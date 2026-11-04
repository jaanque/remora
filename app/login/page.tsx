"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RemoraLogo } from "@/components/RemoraLogo";
import { LoginOceanSide } from "@/components/LoginOceanSide";

// Official GitHub vector icon
function GitHubIcon() {
  return (
    <svg className="w-4 h-4 fill-[#24292f] shrink-0" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// Official Google vector icon in authentic brand colors
function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen w-full flex bg-white overflow-x-hidden">
      {/* LEFT COLUMN: Content & Sign In Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-20 bg-white">
        {/* Top Header with Back to Home Link */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-semibold text-[17px] tracking-[-0.03em] text-neutral-950 hover:opacity-85 transition-opacity leading-none group"
          >
            <RemoraLogo
              className="w-6 h-6 text-[#2496ED] shrink-0 transition-transform group-hover:scale-105"
              size={24}
            />
            <span>REMORA</span>
          </Link>

          <Link
            href="/"
            className="text-xs font-medium text-neutral-500 hover:text-neutral-950 transition-colors flex items-center gap-1.5"
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
            <span>Back to home</span>
          </Link>
        </div>

        {/* Center: Sign in Box */}
        <div className="w-full max-w-[360px] mx-auto py-12">
          <div className="mb-6">
            <h1 className="text-[26px] sm:text-[28px] font-bold tracking-[-0.03em] text-neutral-950 leading-tight">
              Sign in to Remora
            </h1>
            <p className="text-[14px] text-neutral-600 mt-1.5 leading-relaxed">
              Connect your developer account to access your machine-native documentation endpoints.
            </p>
          </div>

          {/* Social Auth Buttons: Gray background with authentic brand logos */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <button
              type="button"
              className="h-10 px-3 rounded-[10px] bg-neutral-100 hover:bg-neutral-200/70 active:scale-[0.98] border border-neutral-200/70 text-neutral-900 text-[13px] font-medium tracking-[-0.01em] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </button>

            <button
              type="button"
              className="h-10 px-3 rounded-[10px] bg-neutral-100 hover:bg-neutral-200/70 active:scale-[0.98] border border-neutral-200/70 text-neutral-900 text-[13px] font-medium tracking-[-0.01em] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
          </div>

          {/* Clean Separator Line */}
          <div className="my-5 border-t border-neutral-200/70" />

          {/* Email Magic Link Form */}
          {submitted ? (
            <div className="rounded-[12px] border border-[#2496ED]/30 bg-[#2496ED]/5 p-4 text-center">
              <div className="w-7 h-7 rounded-full bg-[#2496ED]/15 text-[#2496ED] flex items-center justify-center mx-auto mb-2 font-mono text-xs font-bold">
                ✓
              </div>
              <div className="text-[13.5px] font-semibold text-neutral-900 mb-0.5">
                Check your inbox
              </div>
              <p className="text-[12.5px] text-neutral-600 leading-relaxed">
                We sent a secure magic link to <strong className="text-neutral-950 font-medium">{email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs text-[#2496ED] hover:underline font-medium cursor-pointer"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="email"
                  className="block text-[12px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5"
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-[10px] border border-neutral-200/90 bg-white text-neutral-900 placeholder:text-neutral-400 text-[13px] outline-none focus:border-[#2496ED] focus:ring-1 focus:ring-[#2496ED] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 px-4 rounded-[10px] bg-[#2496ED] hover:brightness-95 active:scale-[0.99] text-white text-[13px] font-medium tracking-[-0.01em] transition-all flex items-center justify-center cursor-pointer shadow-xs"
              >
                Send magic link
              </button>
            </form>
          )}

          {/* Legal disclaimer */}
          <p className="text-[11.5px] text-neutral-400 text-center mt-6 leading-relaxed">
            By signing in, you agree to our{" "}
            <Link href="/" className="underline hover:text-neutral-700 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/" className="underline hover:text-neutral-700 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Bottom spacing spacer */}
        <div className="w-full" />
      </div>

      {/* RIGHT COLUMN: Ocean Blue + Vertical Stepped Skyline Intersection */}
      <LoginOceanSide />
    </main>
  );
}
