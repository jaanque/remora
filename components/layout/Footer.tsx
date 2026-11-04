"use client";

import React from "react";
import { RemoraLogo } from "@/components/shared/RemoraLogo";
import {
  useFooterPhysics,
  LETTERS,
  PATTERN_WIDTH,
  TOTAL_HEIGHT,
  SKYLINE_PATH,
  PUNCTUAL_RISING_SQUARES,
  SQUARE_SIZE,
} from "@/logic/animation";

interface FooterProps {
  accentColor?: string;
  lightColor?: string;
}

export function Footer({
  accentColor = "#2496ED",
  lightColor = "#70BEF8",
}: FooterProps = {}) {
  const {
    footerRef,
    canvasRef,
    logoRef,
    letterRefs,
    handleMouseMove,
    handleMouseLeave,
  } = useFooterPhysics({ accentColor, lightColor });

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full mt-auto flex flex-col bg-[#f2f2f2] cursor-default select-none overflow-hidden"
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
              <path d={SKYLINE_PATH} fill={accentColor} />
              {PUNCTUAL_RISING_SQUARES.map((sq, i) => (
                <rect
                  key={`punctual-sq-${i}`}
                  x={sq.col * SQUARE_SIZE}
                  y={sq.y}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  fill={accentColor}
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
      <div
        className="w-full overflow-hidden pt-10 sm:pt-14 md:pt-18 relative z-10 transition-colors"
        style={{ backgroundColor: accentColor }}
      >
        <div className="w-full flex flex-col items-center select-none pointer-events-none">
          {/* Logo with gentle liquid wave deflection */}
          <div
            ref={logoRef}
            className="mb-2 sm:mb-3 md:mb-4 shrink-0 will-change-transform"
          >
            <RemoraLogo
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 transition-colors"
              style={{ color: lightColor }}
            />
          </div>

          {/* Text container with wave ripple */}
          <div className="w-full overflow-hidden flex justify-center h-[0.68em] text-[19vw] sm:text-[20vw] md:text-[240px]">
            <div
              className="flex font-black tracking-[-0.05em] leading-none text-center transition-colors"
              style={{ color: lightColor }}
            >
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
