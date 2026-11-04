"use client";

import React, { useRef, useEffect, useCallback } from "react";

// Stepped row steps (in 14px units) for seamless vertical shoreline transition
const ROW_STEPS = [
  2, 3, 2, 3, 1, 2, 3, 2, 1, 3, 2, 2, 3, 1, 2, 3,
  2, 1, 3, 2, 3, 1, 2, 2, 3, 2, 1, 3, 2, 3, 1, 2,
];

const SQUARE_SIZE = 14;
const TOTAL_WIDTH = 56; // 4 steps x 14px = 56px
const PATTERN_HEIGHT = ROW_STEPS.length * SQUARE_SIZE; // 32 * 14 = 448px

// Punctual rising squares on the stepped intersection boundary
const PUNCTUAL_LEFT_SQUARES = [
  { row: 6, x: 0 },
  { row: 7, x: 0 },
  { row: 22, x: 0 },
];

function getVerticalSkylinePath(): string {
  let path = `M ${TOTAL_WIDTH} 0`;
  ROW_STEPS.forEach((steps, i) => {
    const yStart = i * SQUARE_SIZE;
    const yEnd = (i + 1) * SQUARE_SIZE;
    const x = TOTAL_WIDTH - steps * SQUARE_SIZE;
    path += ` L ${x} ${yStart} L ${x} ${yEnd}`;
  });
  path += ` L ${TOTAL_WIDTH} ${PATTERN_HEIGHT} Z`;
  return path;
}

const VERTICAL_SKYLINE_PATH = getVerticalSkylinePath();

interface GridCell {
  col: number;
  row: number;
  litAt: number;
}

export function LoginOceanSide() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const activeCellsRef = useRef<Map<string, GridCell>>(new Map());
  const lastCellRef = useRef<{ col: number; row: number } | null>(null);

  // Sync canvas dimensions with HiDPI support
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
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

  // Animation render loop for interactive 14x14 grid squares
  const triggerAnim = useCallback(() => {
    if (animFrameRef.current !== null) return;

    const render = () => {
      const now = performance.now();
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        animFrameRef.current = null;
        return;
      }

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const ctx = canvas.getContext("2d");

      if (ctx && width > 0 && height > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

        const FADE_DURATION = 900;
        const toDelete: string[] = [];

        activeCellsRef.current.forEach((cell, key) => {
          const age = now - cell.litAt;
          if (age >= FADE_DURATION) {
            toDelete.push(key);
            return;
          }

          const progress = age / FADE_DURATION;
          const alpha = 1 - progress * progress;

          ctx.fillStyle = `rgba(112, 190, 248, ${(alpha * 0.85).toFixed(3)})`;
          ctx.fillRect(
            cell.col * SQUARE_SIZE,
            cell.row * SQUARE_SIZE,
            SQUARE_SIZE,
            SQUARE_SIZE
          );
        });

        toDelete.forEach((k) => activeCellsRef.current.delete(k));
      }

      if (activeCellsRef.current.size > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  // Handle Mouse Over: Light up 14x14 grid squares in 2x2 blocks with zero gap
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerCol = Math.floor(mouseX / SQUARE_SIZE);
    const centerRow = Math.floor(mouseY / SQUARE_SIZE);

    if (
      !lastCellRef.current ||
      lastCellRef.current.col !== centerCol ||
      lastCellRef.current.row !== centerRow
    ) {
      lastCellRef.current = { col: centerCol, row: centerRow };
      const now = performance.now();

      // Light up 2x2 grid blocks
      for (let dc = 0; dc <= 1; dc++) {
        for (let dr = 0; dr <= 1; dr++) {
          const c = centerCol + dc;
          const r = centerRow + dr;
          activeCellsRef.current.set(`${c},${r}`, {
            col: c,
            row: r,
            litAt: now,
          });
        }
      }

      triggerAnim();
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="hidden lg:flex lg:w-1/2 min-h-screen relative overflow-hidden flex-col items-center justify-center select-none cursor-default"
    >
      {/* 1. Left Vertical Stepped Shoreline Boundary: 14x14 pixel blocks */}
      <div className="absolute top-0 bottom-0 left-0 w-14 overflow-hidden pointer-events-none z-30">
        <svg
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="login-vertical-skyline"
              width={TOTAL_WIDTH}
              height={PATTERN_HEIGHT}
              patternUnits="userSpaceOnUse"
            >
              <path d={VERTICAL_SKYLINE_PATH} fill="#2496ED" />
              {PUNCTUAL_LEFT_SQUARES.map((sq, i) => (
                <rect
                  key={`punctual-v-${i}`}
                  x={sq.x}
                  y={sq.row * SQUARE_SIZE}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  fill="#2496ED"
                />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-vertical-skyline)" />
        </svg>
      </div>

      {/* 2. Deep Blue Ocean Surface Background */}
      <div className="absolute top-0 bottom-0 left-14 right-0 bg-[#2496ED] z-10" />

      {/* 3. Interactive 14x14 Grid Square Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20 w-full h-full"
      />
    </div>
  );
}

