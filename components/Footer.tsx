"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { RemoraLogo } from "./RemoraLogo";

// Stepped column heights (in 14px units) for seamless skyline transition
// Perfect 1:1 SQUARE proportions (14px width x 14px step height)
const COLUMN_STEPS = [
  2, 3, 2, 3, 1, 2, 3, 2, 1, 3, 2, 2, 3, 1, 2, 3,
  2, 1, 3, 2, 3, 1, 2, 2, 3, 2, 1, 3, 2, 3, 1, 2,
];

const SQUARE_SIZE = 14;  // Square unit: 14px width = 14px height
const TOTAL_HEIGHT = 56; // 4 steps x 14px = 56px
const PATTERN_WIDTH = COLUMN_STEPS.length * SQUARE_SIZE; // 32 * 14 = 448px

// Punctual rising squares: exact 14x14 squares aligned to column boundaries
const PUNCTUAL_RISING_SQUARES = [
  { col: 6, y: 8 },
  { col: 7, y: 0 },
  { col: 22, y: 8 },
];

function getSkylinePath(): string {
  let path = `M 0 ${TOTAL_HEIGHT}`;
  COLUMN_STEPS.forEach((steps, i) => {
    const xStart = i * SQUARE_SIZE;
    const xEnd = (i + 1) * SQUARE_SIZE;
    const y = TOTAL_HEIGHT - steps * SQUARE_SIZE;
    path += ` L ${xStart} ${y} L ${xEnd} ${y}`;
  });
  path += ` L ${PATTERN_WIDTH} ${TOTAL_HEIGHT} Z`;
  return path;
}

const SKYLINE_PATH = getSkylinePath();

const LETTERS = ["R", "E", "M", "O", "R", "A"];

interface SpringPhysics {
  x: number;
  y: number;
  rot: number;
  vx: number;
  vy: number;
  vRot: number;
  targetX: number;
  targetY: number;
  targetRot: number;
}

interface GridCell {
  col: number;
  row: number;
  litAt: number;
}

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Smooth, natural spring physics for logo and letters
  const logoPhysicsRef = useRef<SpringPhysics>({
    x: 0, y: 0, rot: 0, vx: 0, vy: 0, vRot: 0, targetX: 0, targetY: 0, targetRot: 0,
  });
  const lettersPhysicsRef = useRef<SpringPhysics[]>(
    LETTERS.map(() => ({
      x: 0, y: 0, rot: 0, vx: 0, vy: 0, vRot: 0, targetX: 0, targetY: 0, targetRot: 0,
    }))
  );

  // Grid of static squares changing color as cursor passes
  const activeCellsRef = useRef<Map<string, GridCell>>(new Map());
  const lastCellRef = useRef<{ col: number; row: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Resize canvas to match footer size with HiDPI support
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const footer = footerRef.current;
    if (!canvas || !footer) return;

    const rect = footer.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    syncCanvasSize();
    window.addEventListener("resize", syncCanvasSize);
    return () => window.removeEventListener("resize", syncCanvasSize);
  }, [syncCanvasSize]);

  // Main render loop: renders static square color changes and subtle water spring return
  const renderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const now = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const cells = activeCellsRef.current;
    const FADE_DURATION = 600; // Square color transition duration in ms

    // 1. Draw static grid squares with fading color shift back to base blue (zero separation)
    cells.forEach((cell, key) => {
      const age = now - cell.litAt;
      if (age >= FADE_DURATION) {
        cells.delete(key);
      } else {
        const progress = age / FADE_DURATION;
        const alpha = Math.max(0, 1 - progress);

        // Render fixed square seamlessly in #70BEF8 fading back to #2496ED
        ctx.fillStyle = `rgba(112, 190, 248, ${alpha.toFixed(3)})`;
        ctx.fillRect(
          cell.col * SQUARE_SIZE,
          cell.row * SQUARE_SIZE,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
      }
    });

    // 2. Subtle, natural aquatic wave deflection and spring return (soft & organic)
    const k = 0.12;       // Gentle spring pull towards target
    const damping = 0.85; // Smooth fluid damping

    let isMoving = cells.size > 0;

    const updateSpring = (p: SpringPhysics, el: HTMLElement | null) => {
      if (!el) return;

      const ax = (p.targetX - p.x) * k;
      const ay = (p.targetY - p.y) * k;
      const aRot = (p.targetRot - p.rot) * k;

      p.vx = (p.vx + ax) * damping;
      p.vy = (p.vy + ay) * damping;
      p.vRot = (p.vRot + aRot) * damping;

      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vRot;

      // Softly decay targets back toward 0
      p.targetX *= 0.9;
      p.targetY *= 0.9;
      p.targetRot *= 0.9;

      const isResting =
        Math.abs(p.x) < 0.05 &&
        Math.abs(p.y) < 0.05 &&
        Math.abs(p.vx) < 0.05 &&
        Math.abs(p.vy) < 0.05 &&
        Math.abs(p.targetX) < 0.05 &&
        Math.abs(p.targetY) < 0.05;

      if (isResting) {
        p.x = 0;
        p.y = 0;
        p.rot = 0;
        p.vx = 0;
        p.vy = 0;
        p.vRot = 0;
        p.targetX = 0;
        p.targetY = 0;
        p.targetRot = 0;
        el.style.transform = "";
      } else {
        isMoving = true;
        el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${p.rot.toFixed(2)}deg)`;
      }
    };

    updateSpring(logoPhysicsRef.current, logoRef.current);
    lettersPhysicsRef.current.forEach((p, idx) => {
      updateSpring(p, letterRefs.current[idx]);
    });

    if (isMoving) {
      animFrameRef.current = requestAnimationFrame(renderLoop);
    } else {
      animFrameRef.current = null;
    }
  }, []);

  const triggerAnim = useCallback(() => {
    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(renderLoop);
    }
  }, [renderLoop]);

  const lightCell = useCallback((col: number, row: number, time: number) => {
    const key = `${col},${row}`;
    activeCellsRef.current.set(key, { col, row, litAt: time });
  }, []);

  // 2 squares big brush (2x2 grid blocks, seamless)
  const lightBrush = useCallback(
    (col: number, row: number, time: number) => {
      lightCell(col, row, time);
      lightCell(col + 1, row, time);
      lightCell(col, row + 1, time);
      lightCell(col + 1, row + 1, time);
    },
    [lightCell]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const footer = footerRef.current;
    if (!footer) return;

    const rect = footer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const now = performance.now();

    const col = Math.floor(mouseX / SQUARE_SIZE);
    const row = Math.floor(mouseY / SQUARE_SIZE);

    // 1. Grid of squares: 2 squares thick brush along mouse path (zero gaps)
    if (lastCellRef.current) {
      const prev = lastCellRef.current;
      const dist = Math.max(Math.abs(col - prev.col), Math.abs(row - prev.row));
      if (dist > 0) {
        for (let i = 0; i <= dist; i++) {
          const c = Math.round(prev.col + (col - prev.col) * (i / dist));
          const r = Math.round(prev.row + (row - prev.row) * (i / dist));
          lightBrush(c, r, now);
        }
      }
    } else {
      lightBrush(col, row, now);
    }

    lastCellRef.current = { col, row };

    // 2. Gentle, subtle wave deflection on Logo (capped, smoothstep falloff)
    const logoEl = logoRef.current;
    if (logoEl) {
      const lRect = logoEl.getBoundingClientRect();
      const lx = lRect.left + lRect.width / 2 - rect.left;
      const ly = lRect.top + lRect.height / 2 - rect.top;
      const distToLogo = Math.hypot(lx - mouseX, ly - mouseY);
      const radius = 160;

      if (distToLogo < radius && distToLogo > 1) {
        const norm = 1 - distToLogo / radius;
        const factor = norm * norm * (3 - 2 * norm); // smoothstep
        const maxDisplacement = 8; // Max 8px deflection
        const pushX = (lx - mouseX) / distToLogo;
        const pushY = (ly - mouseY) / distToLogo;
        const phys = logoPhysicsRef.current;
        phys.targetX = pushX * maxDisplacement * factor;
        phys.targetY = pushY * (maxDisplacement * 0.7) * factor;
        phys.targetRot = pushX * 2.5 * factor; // Max 2.5 degrees tilt
      }
    }

    // 3. Gentle, subtle wave deflection on Letters (buoyant bobbing, capped displacement)
    letterRefs.current.forEach((el, idx) => {
      if (!el) return;
      const letRect = el.getBoundingClientRect();
      const letX = letRect.left + letRect.width / 2 - rect.left;
      const letY = letRect.top + letRect.height / 2 - rect.top;
      const distToLetter = Math.hypot(letX - mouseX, letY - mouseY);
      const radius = 130;

      if (distToLetter < radius && distToLetter > 1) {
        const norm = 1 - distToLetter / radius;
        const factor = norm * norm * (3 - 2 * norm); // smoothstep
        const maxLetterY = 8; // Gentle 8px vertical wave
        const maxLetterX = 4; // Subtle 4px horizontal push
        const pushX = (letX - mouseX) / distToLetter;
        const pushY = (letY - mouseY) / distToLetter;
        const phys = lettersPhysicsRef.current[idx];
        phys.targetX = pushX * maxLetterX * factor;
        phys.targetY = pushY * maxLetterY * factor;
        phys.targetRot = pushX * 2 * factor; // Max 2 degrees rotation
      }
    });

    triggerAnim();
  };

  const handleMouseLeave = () => {
    lastCellRef.current = null;
    logoPhysicsRef.current.targetX = 0;
    logoPhysicsRef.current.targetY = 0;
    logoPhysicsRef.current.targetRot = 0;
    lettersPhysicsRef.current.forEach((p) => {
      p.targetX = 0;
      p.targetY = 0;
      p.targetRot = 0;
    });
    triggerAnim();
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full mt-auto flex flex-col bg-white cursor-default select-none overflow-hidden"
    >
      {/* Grid of static squares canvas: handles in-place color change on mouse pass */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20 w-full h-full"
      />

      {/* Stepped Blue Skyline */}
      <div className="w-full h-[56px] overflow-hidden leading-none pointer-events-none -mb-[1px]">
        <svg
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="footer-solid-skyline"
              width={PATTERN_WIDTH}
              height={TOTAL_HEIGHT}
              patternUnits="userSpaceOnUse"
            >
              <path d={SKYLINE_PATH} fill="#2496ED" />
              {PUNCTUAL_RISING_SQUARES.map((sq, i) => (
                <rect
                  key={`punctual-sq-${i}`}
                  x={sq.col * SQUARE_SIZE}
                  y={sq.y}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  fill="#2496ED"
                />
              ))}
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#footer-solid-skyline)"
          />
        </svg>
      </div>

      {/* Footer Body: Deflecting Logo and individual waving Letters */}
      <div className="w-full bg-[#2496ED] overflow-hidden pt-10 sm:pt-14 md:pt-18 relative z-10">
        <div className="w-full flex flex-col items-center select-none pointer-events-none">
          {/* Logo with gentle liquid wave deflection - enlarged iconic presence */}
          <div
            ref={logoRef}
            className="mb-2 sm:mb-3 md:mb-4 shrink-0 will-change-transform"
          >
            <RemoraLogo className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 text-[#70BEF8]" />
          </div>

          {/* Text container clips bottom 25%; individual letters ripple with subtle fluid physics */}
          <div className="w-full overflow-hidden flex justify-center h-[0.68em] text-[19vw] sm:text-[20vw] md:text-[240px]">
            <div className="flex font-black tracking-[-0.05em] leading-none text-[#70BEF8] text-center">
              {LETTERS.map((char, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    letterRefs.current[i] = el;
                  }}
                  className="inline-block will-change-transform"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
