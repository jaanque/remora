"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook para calcular el progreso de scroll suave de un contenedor.
 * Protegido con requestAnimationFrame para evitar sobrecarga en eventos de scroll.
 */
export function useScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.7;
      const scrollDistance = rect.height - windowHeight * 0.6;

      const currentScroll = startOffset - rect.top;
      const rawProgress = currentScroll / Math.max(1, scrollDistance);
      const clamped = Math.min(1, Math.max(0, rawProgress));

      setProgress(clamped);
    };

    const handleScroll = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => {
        updateProgress();
        rafIdRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  return { containerRef, progress };
}

