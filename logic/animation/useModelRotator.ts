"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Hook para la rotación periódica de modelos de IA con animación de entrada y salida.
 * Blindado contra fugas de memoria con cancelación de timers activos al desmontar.
 */
export function useModelRotator(totalModels: number, intervalMs = 2800, exitDurationMs = 280) {
  const [modelIndex, setModelIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsExiting(true);

      exitTimeoutRef.current = setTimeout(() => {
        setModelIndex((prev) => (prev + 1) % totalModels);
        setIsExiting(false);
      }, exitDurationMs);
    }, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, [totalModels, intervalMs, exitDurationMs]);

  return { modelIndex, isExiting };
}

