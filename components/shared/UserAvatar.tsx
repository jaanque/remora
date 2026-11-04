"use client";

import React, { useState, useEffect } from "react";
import { Blobatar } from "@blobatar/react";

// Paleta canónica sin marco (fondo transparente)
const DOCKER_PALETTE = {
  head: "#2496ED",
  bg: "transparent",
  eye: "#052e54",
};

interface UserAvatarProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  title?: string;
  seed?: string;
}

// Semilla compartida para que todos los avatares de la sesión (píldora, desplegable, barra lateral)
// muestren exactamente la misma criatura, variando aleatoriamente en cada recarga de página.
let sharedSessionSeed: string | null = null;

function getSharedSeed(): string {
  if (!sharedSessionSeed) {
    sharedSessionSeed = `remora-user-${Math.random().toString(36).substring(2, 12)}`;
  }
  return sharedSessionSeed;
}

/**
 * Avatar dinámico sin marco para el usuario:
 * Criatura sin marco ni fondo cuadrado que sincroniza la misma apariencia
 * en la píldora, menú desplegable y barra lateral, renovándose en cada recarga.
 */
export function UserAvatar({
  size = 26,
  className = "",
  onClick,
  title = "Tu avatar de Remora",
  seed: propSeed,
}: UserAvatarProps) {
  const [seed, setSeed] = useState<string>(propSeed || "");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeed(propSeed || getSharedSeed());
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [propSeed]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (!mounted || !seed) {
    return (
      <span
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`shrink-0 bg-transparent animate-pulse inline-block ${className}`}
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      title={title}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
      }}
      className={`shrink-0 inline-flex items-center justify-center relative bg-transparent border-0 p-0 outline-none select-none ${className}`}
    >
      <Blobatar
        name={seed}
        size={size}
        animate="hover"
        palette={DOCKER_PALETTE}
      />
    </span>
  );
}
