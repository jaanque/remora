"use client";

import { useRef, useEffect, useCallback } from "react";

export const LETTERS = ["R", "E", "M", "O", "R", "A"];
export const SQUARE_SIZE = 14;
export const TOTAL_HEIGHT = 56;
export const COLUMN_STEPS = [
  2, 3, 2, 3, 1, 2, 3, 2, 1, 3, 2, 2, 3, 1, 2, 3,
  2, 1, 3, 2, 3, 1, 2, 2, 3, 2, 1, 3, 2, 3, 1, 2,
];
export const PATTERN_WIDTH = COLUMN_STEPS.length * SQUARE_SIZE;
export const PUNCTUAL_RISING_SQUARES = [
  { col: 6, y: 8 },
  { col: 7, y: 0 },
  { col: 22, y: 8 },
];

export function getSkylinePath(): string {
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

export const SKYLINE_PATH = getSkylinePath();

export interface SpringPhysics {
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

export interface GridCell {
  col: number;
  row: number;
  litAt: number;
}

export function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(112, 190, 248, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
}

interface UseFooterPhysicsOptions {
  accentColor: string;
  lightColor: string;
}

export function useFooterPhysics({ lightColor }: UseFooterPhysicsOptions) {
  const footerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const lightColorRef = useRef(lightColor);
  useEffect(() => {
    lightColorRef.current = lightColor;
  }, [lightColor]);

  const logoPhysicsRef = useRef<SpringPhysics>({
    x: 0, y: 0, rot: 0, vx: 0, vy: 0, vRot: 0, targetX: 0, targetY: 0, targetRot: 0,
  });
  const lettersPhysicsRef = useRef<SpringPhysics[]>(
    LETTERS.map(() => ({
      x: 0, y: 0, rot: 0, vx: 0, vy: 0, vRot: 0, targetX: 0, targetY: 0, targetRot: 0,
    }))
  );

  const activeCellsRef = useRef<Map<string, GridCell>>(new Map());
  const lastCellRef = useRef<{ col: number; row: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);

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
    window.addEventListener("resize", syncCanvasSize, { passive: true });
    return () => {
      window.removeEventListener("resize", syncCanvasSize);
    };
  }, [syncCanvasSize]);

  const renderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const now = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const cells = activeCellsRef.current;
    const FADE_DURATION = 600;

    cells.forEach((cell, key) => {
      const age = now - cell.litAt;
      if (age >= FADE_DURATION) {
        cells.delete(key);
      } else {
        const progress = age / FADE_DURATION;
        const alpha = Math.max(0, 1 - progress);
        ctx.fillStyle = hexToRgba(lightColorRef.current, alpha);
        ctx.fillRect(
          cell.col * SQUARE_SIZE,
          cell.row * SQUARE_SIZE,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
      }
    });

    const k = 0.12;
    const damping = 0.85;
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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const footer = footerRef.current;
    if (!footer) return;

    const rect = footer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const col = Math.floor(mouseX / SQUARE_SIZE);
    const row = Math.floor(mouseY / SQUARE_SIZE);

    const last = lastCellRef.current;
    const now = performance.now();

    if (!last) {
      lightCell(col, row, now);
      lastCellRef.current = { col, row };
    } else if (last.col !== col || last.row !== row) {
      const dx = col - last.col;
      const dy = row - last.row;
      const steps = Math.max(Math.abs(dx), Math.abs(dy));

      for (let s = 1; s <= steps; s++) {
        const ic = Math.round(last.col + (dx * s) / steps);
        const ir = Math.round(last.row + (dy * s) / steps);
        lightCell(ic, ir, now);
      }
      lastCellRef.current = { col, row };
    }

    const centerX = rect.width / 2;
    const relX = (mouseX - centerX) / (rect.width / 2);

    const logo = logoPhysicsRef.current;
    logo.targetX = relX * 12;
    logo.targetY = Math.sin(relX * Math.PI) * 5;
    logo.targetRot = relX * 3.5;

    lettersPhysicsRef.current.forEach((p, i) => {
      const letterFraction = (i - (LETTERS.length - 1) / 2) / ((LETTERS.length - 1) / 2);
      const distFromCursor = relX - letterFraction;
      const wave = Math.sin(distFromCursor * Math.PI) * 10;
      p.targetY = -wave;
      p.targetX = distFromCursor * 3;
      p.targetRot = distFromCursor * 2.5;
    });

    triggerAnim();
  }, [lightCell, triggerAnim]);

  const handleMouseLeave = useCallback(() => {
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
  }, [triggerAnim]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, []);

  return {
    footerRef,
    canvasRef,
    logoRef,
    letterRefs,
    handleMouseMove,
    handleMouseLeave,
  };
}

