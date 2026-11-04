"use client";

import { useState, useEffect } from "react";
import { type DocPlatform } from "./types";
import { fetchPlatformsClient } from "./docs-client";

/**
 * Hook para cargar y gestionar las plataformas del marquee en la home.
 * Protegido contra fugas de memoria y llamadas concurrentes.
 */
export function usePlatforms(limit = 24, initialPlatforms?: DocPlatform[]) {
  const [platforms, setPlatforms] = useState<DocPlatform[]>(initialPlatforms ?? []);
  const [isLoading, setIsLoading] = useState(!initialPlatforms || initialPlatforms.length === 0);

  useEffect(() => {
    if (initialPlatforms && initialPlatforms.length > 0) {
      setPlatforms(initialPlatforms);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function load() {
      try {
        const data = await fetchPlatformsClient(limit);
        if (isMounted) {
          setPlatforms(data);
        }
      } catch {
        // En caso de fallo silencioso mantener lista vacía
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [limit, initialPlatforms]);

  return { platforms, isLoading };
}
