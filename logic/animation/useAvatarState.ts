"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GREETINGS, generateStarPath } from "@/logic/content/avatar-data";

export function useAvatarState(isMcpHovered?: boolean) {
  const [seed, setSeed] = useState<string>("remora-docker-blue");
  const [greeting, setGreeting] = useState<string>(GREETINGS[0]);
  const [mounted, setMounted] = useState(false);
  const [isStarBlink, setIsStarBlink] = useState(false);

  const containerRef = useRef<HTMLButtonElement>(null);
  const originalEyePathsRef = useRef<{ path: SVGPathElement; d: string }[]>([]);
  const starBlinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mouseMoveRafRef = useRef<number | null>(null);

  const rollNewAvatar = useCallback(() => {
    const uniqueSeed = `remora-docker-${Math.random().toString(36).substring(2, 12)}`;
    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    originalEyePathsRef.current = [];
    setSeed(uniqueSeed);
    setGreeting(randomGreeting);
  }, []);

  useEffect(() => {
    rollNewAvatar();
    setMounted(true);
  }, [rollNewAvatar]);

  // Periodic star eyes blink every 3.8s, blindado contra fugas de memoria
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setIsStarBlink(true);
      starBlinkTimeoutRef.current = setTimeout(() => {
        setIsStarBlink(false);
      }, 550);
    }, 3800);

    return () => {
      clearInterval(interval);
      if (starBlinkTimeoutRef.current) {
        clearTimeout(starBlinkTimeoutRef.current);
      }
    };
  }, [mounted]);

  const shouldShowStars = isStarBlink || Boolean(isMcpHovered);

  // Morph eyes into stars
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const eyeElements = containerRef.current.querySelectorAll<SVGGElement>(".mo-eye");
    if (!eyeElements.length) return;

    if (shouldShowStars) {
      if (originalEyePathsRef.current.length === 0) {
        eyeElements.forEach((eye) => {
          const path = eye.querySelector<SVGPathElement>("path");
          if (path) {
            const d = path.getAttribute("d") || "";
            originalEyePathsRef.current.push({ path, d });
          }
        });
      }

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
            // Fallback seguro
          }
        }

        if (cx && cy) {
          const starPath = generateStarPath(cx, cy, 7.4, 3.4);
          path.setAttribute("d", starPath);
        }
        eye.classList.add("star-eyes");
      });
    } else {
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

  // Cursor tracking for eyes throttled with requestAnimationFrame
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const eyesEl = containerRef.current.querySelector<SVGGraphicsElement>(".mo-eyes");
    if (!eyesEl) return;

    eyesEl.style.transition = "transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)";
    eyesEl.style.transformOrigin = "50px 50px";

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseMoveRafRef.current) return;

      mouseMoveRafRef.current = requestAnimationFrame(() => {
        mouseMoveRafRef.current = null;
        if (!containerRef.current || !eyesEl) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);

        const maxTravel = 5.5;
        const intensity = Math.min(distance / 250, 1);
        const moveX = (deltaX / (distance || 1)) * maxTravel * intensity;
        const moveY = (deltaY / (distance || 1)) * maxTravel * intensity;

        eyesEl.style.transform = `translate(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px)`;
      });
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
      if (mouseMoveRafRef.current) {
        cancelAnimationFrame(mouseMoveRafRef.current);
        mouseMoveRafRef.current = null;
      }
    };
  }, [mounted, seed]);

  return {
    seed,
    greeting,
    mounted,
    containerRef,
    rollNewAvatar,
  };
}

