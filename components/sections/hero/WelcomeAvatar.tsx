"use client";

import React from "react";
import { Blobatar } from "@blobatar/react";
import { useAvatarState } from "@/logic/animation";
import { DOCKER_PALETTE } from "@/logic/content";

interface WelcomeAvatarProps {
  isMcpHovered?: boolean;
}

export function WelcomeAvatar({ isMcpHovered }: WelcomeAvatarProps) {
  const { seed, greeting, mounted, containerRef, rollNewAvatar } = useAvatarState(isMcpHovered);

  if (!mounted) {
    return (
      <div className="flex items-center gap-3.5 mb-6 select-none">
        <div className="w-13 h-13 rounded-xl bg-sky-50 animate-pulse shrink-0" />
        <div className="space-y-1">
          <div className="h-4 w-28 bg-neutral-100 rounded animate-pulse" />
          <div className="h-3.5 w-44 bg-neutral-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3.5 mb-6 select-none">
      <button
        ref={containerRef}
        type="button"
        onClick={rollNewAvatar}
        title="Click to meet another avatar"
        style={{ width: "52px", height: "52px", maxWidth: "52px", maxHeight: "52px" }}
        className="w-13 h-13 max-w-13 max-h-13 shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer relative bg-transparent border-0 p-0"
      >
        <Blobatar
          name={seed}
          size={52}
          animate="hover"
          palette={DOCKER_PALETTE}
        />
      </button>

      <div>
        <div className="text-[13.5px] font-semibold text-neutral-950 tracking-[-0.02em]">
          Welcome to Remora
        </div>
        <p className="text-[12.5px] text-neutral-500 tracking-[-0.01em]">
          {greeting}
        </p>
      </div>
    </div>
  );
}
