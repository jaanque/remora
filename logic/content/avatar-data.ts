export const GREETINGS = [
  "Documentation built exclusively for AI agents.",
  "Machine-native docs for maximum token efficiency.",
  "Zero human fluff. Pure structured context for LLMs.",
  "Slash token usage by 80% with agent-optimized syntax.",
  "Feed Cursor, Claude, and agents docs they truly comprehend.",
  "Documentation structured in machine language for AI.",
];

export const DOCKER_PALETTE = {
  head: "#2496ED",
  bg: "transparent",
  eye: "#052e54",
};

/**
 * Genera el path SVG de una estrella de 5 puntas.
 */
export function generateStarPath(
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

