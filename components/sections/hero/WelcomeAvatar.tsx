"use client";

import React, { useEffect, useRef, useState } from "react";
import { Blobatar } from "@blobatar/react";

const GREETINGS = [
  "Documentation built exclusively for AI agents.",
  "Machine-native docs for maximum token efficiency.",
  "Zero human fluff. Pure structured context for LLMs.",
  "Slash token usage by 80% with agent-optimized syntax.",
  "Feed Cursor, Claude, and agents docs they truly comprehend.",
  "Documentation structured in machine language for AI.",
];

// Unified canonical Docker Blue (#2496ED)
const DOCKER_PALETTE = {
  head: "#2496ED",
  bg: "transparent",
  eye: "#052e54",
};

interface WelcomeAvatarProps {
  isMcpHovered?: boolean;
}

function generateStarPath(
  cx: number,
  cy: number,
  outerR = 7.4,
  innerR = 3.4
): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + i * (Math.PI / 5);
    const r = i % 2 === 0 ? outerR : innerR;
    const x = (cx + r * Math.cos(angle)).toFixed(2);
    const y = (cy + r * Math.sin(angle)).toFixed(2);
    points.push(`${x} ${y}`);
  }
  return `M ${points.join(" L ")} Z`;
}

export function WelcomeAvatar({ isMcpHovered }: WelcomeAvatarProps) {
  const [seed, setSeed] = useState<string>("remora-docker-blue");
  const [greeting, setGreeting] = useState<string>(GREETINGS[0]);
  const [mounted, setMounted] = useState(false);
  const [isStarBlink, setIsStarBlink] = useState(false);

  const containerRef = useRef<HTMLButtonElement>(null);
  const originalEyePathsRef = useRef<{ path: SVGPathElement; d: string }[]>([]);

  const rollNewAvatar = () => {
    const uniqueSeed = `remora-docker-${Math.random().toString(36).substring(2, 12)}`;
    const randomGreeting =
      GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    originalEyePathsRef.current = [];
    setSeed(uniqueSeed);
    setGreeting(randomGreeting);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      rollNewAvatar();
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Periodic star eyes blink every 3.8 seconds
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setIsStarBlink(true);
      const timer = setTimeout(() => {
        setIsStarBlink(false);
      }, 550); // star blink lasts 550ms

      return () => clearTimeout(timer);
    }, 3800);

    return () => clearInterval(interval);
  }, [mounted]);

  const shouldShowStars = isStarBlink || Boolean(isMcpHovered);

  // Morph eyes into stars when shouldShowStars is true
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const eyeElements =
      containerRef.current.querySelectorAll<SVGGElement>(".mo-eye");
    if (!eyeElements.length) return;

    if (shouldShowStars) {
      // Cache original eye paths if not already saved
      if (originalEyePathsRef.current.length === 0) {
        eyeElements.forEach((eye) => {
          const path = eye.querySelector<SVGPathElement>("path");
          if (path) {
            const d = path.getAttribute("d") || "";
            originalEyePathsRef.current.push({ path, d });
          }
        });
      }

      // Morph each eye into a 5-point star
      eyeElements.forEach((eye) => {
        const path = eye.querySelector<SVGPathElement>("path");
        if (!path) return;

        let cx = 0;
        let cy = 0;

        if (eye.style.transformOrigin) {
          const parts = eye.style.transformOrigin.split(" ");
          if (parts.length >= 2) {
            cx = parseFloat(parts[0]);
            cy = parseFloat(parts[1]);
          }
        }

        if (!cx || !cy || isNaN(cx) || isNaN(cy)) {
          try {
            const bbox = path.getBBox();
            if (bbox.width > 0 && bbox.height > 0) {
              cx = bbox.x + bbox.width / 2;
              cy = bbox.y + bbox.height / 2;
            }
          } catch {
            // fallback
          }
        }

        if (cx && cy) {
          const starPath = generateStarPath(cx, cy, 7.4, 3.4);
          path.setAttribute("d", starPath);
        }
        eye.classList.add("star-eyes");
      });
    } else {
      // Restore original eye paths
      if (originalEyePathsRef.current.length > 0) {
        originalEyePathsRef.current.forEach(({ path, d }) => {
          if (path.isConnected) {
            path.setAttribute("d", d);
          }
        });
        originalEyePathsRef.current = [];
      }
      eyeElements.forEach((eye) => {
        eye.classList.remove("star-eyes");
      });
    }
  }, [mounted, shouldShowStars, seed]);

  // Real-time cursor tracking: eyes follow the user's mouse smoothly across the screen
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const eyesEl =
      containerRef.current.querySelector<SVGGraphicsElement>(".mo-eyes");
    if (!eyesEl) return;

    // Smooth transition for natural eye movement without body deformation
    eyesEl.style.transition = "transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)";
    eyesEl.style.transformOrigin = "50px 50px";

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !eyesEl) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      // Maximum travel excursion in SVG coordinates (keeping eyes inside the head)
      const maxTravel = 5.5;
      const intensity = Math.min(distance / 250, 1);
      const moveX = (deltaX / (distance || 1)) * maxTravel * intensity;
      const moveY = (deltaY / (distance || 1)) * maxTravel * intensity;

      eyesEl.style.transform = `translate(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px)`;
    };

    const handleMouseLeave = () => {
      if (eyesEl) {
        eyesEl.style.transform = "translate(0px, 0px)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted, seed]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-3.5 mb-6 select-none">
        <div className="w-[52px] h-[52px] rounded-[12px] bg-sky-50 animate-pulse shrink-0" />
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
        className="w-[52px] h-[52px] max-w-[52px] max-h-[52px] shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer relative bg-transparent border-0 p-0"
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
