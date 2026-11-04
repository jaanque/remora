import React from "react";

// Canonical Pixel Palette
const P_SKY = "#70BEF8";
const P_BLUE = "#2496ED";
const P_DARK = "#1B75BC";
const P_NAVY = "#0C436F";
const P_WHITE = "#FFFFFF";
const P_LIGHT = "#E2E8F0";
const P_MUTED = "#CBD5E1";
const P_SLATE = "#94A3B8";

// 1. Pixel Art Token Reduction: Massive uncompressed verbose stack -> Compacted blue micro-core
function PixelCompressionVisual() {
  return (
    <svg
      viewBox="0 0 180 76"
      className="w-full h-full max-h-[110px]"
      shapeRendering="crispEdges"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* LEFT: Tall verbose uncompressed documentation stack (100% capacity) */}
      {/* Layer 1 (bottom) */}
      <rect x="16" y="58" width="40" height="6" fill={P_LIGHT} />
      <rect x="16" y="58" width="40" height="2" fill={P_WHITE} />
      <rect x="54" y="58" width="2" height="6" fill={P_SLATE} />

      {/* Layer 2 */}
      <rect x="16" y="50" width="40" height="6" fill={P_MUTED} />
      <rect x="16" y="50" width="40" height="2" fill={P_WHITE} />
      <rect x="54" y="50" width="2" height="6" fill={P_SLATE} />

      {/* Layer 3 */}
      <rect x="16" y="42" width="40" height="6" fill={P_LIGHT} />
      <rect x="16" y="42" width="40" height="2" fill={P_WHITE} />
      <rect x="54" y="42" width="2" height="6" fill={P_SLATE} />

      {/* Layer 4 */}
      <rect x="16" y="34" width="40" height="6" fill={P_MUTED} />
      <rect x="16" y="34" width="40" height="2" fill={P_WHITE} />
      <rect x="54" y="34" width="2" height="6" fill={P_SLATE} />

      {/* Layer 5 (top) */}
      <rect x="16" y="26" width="40" height="6" fill={P_LIGHT} />
      <rect x="16" y="26" width="40" height="2" fill={P_WHITE} />
      <rect x="54" y="26" width="2" height="6" fill={P_SLATE} />

      {/* Faint wireframe guides showing sheer vertical volume */}
      <rect x="14" y="24" width="2" height="42" fill={P_SLATE} opacity="0.4" />
      <rect x="56" y="24" width="2" height="42" fill={P_SLATE} opacity="0.4" />

      {/* CENTER: Compression funnels & bold pixel arrows squeezing into core */}
      {/* Upper compression guide */}
      <rect x="62" y="30" width="4" height="2" fill={P_BLUE} />
      <rect x="66" y="32" width="4" height="2" fill={P_BLUE} />
      <rect x="70" y="34" width="4" height="2" fill={P_BLUE} />

      {/* Main double arrows: ▶▶ */}
      <rect x="70" y="38" width="2" height="14" fill={P_BLUE} />
      <rect x="72" y="40" width="2" height="10" fill={P_BLUE} />
      <rect x="74" y="42" width="2" height="6" fill={P_BLUE} />
      <rect x="76" y="44" width="2" height="2" fill={P_BLUE} />

      <rect x="80" y="38" width="2" height="14" fill={P_BLUE} />
      <rect x="82" y="40" width="2" height="10" fill={P_BLUE} />
      <rect x="84" y="42" width="2" height="6" fill={P_BLUE} />
      <rect x="86" y="44" width="2" height="2" fill={P_BLUE} />

      {/* Lower compression guide */}
      <rect x="62" y="58" width="4" height="2" fill={P_BLUE} />
      <rect x="66" y="56" width="4" height="2" fill={P_BLUE} />
      <rect x="70" y="54" width="4" height="2" fill={P_BLUE} />

      {/* RIGHT: Compacted High-Density Solid Blue Micro-Core (-80%) */}
      {/* Outer chassis */}
      <rect x="100" y="28" width="44" height="34" fill={P_NAVY} />
      {/* Main solid core */}
      <rect x="104" y="32" width="36" height="26" fill={P_BLUE} />
      {/* Highlight bevel */}
      <rect x="104" y="32" width="36" height="4" fill={P_SKY} />
      <rect x="104" y="32" width="4" height="26" fill={P_SKY} />
      {/* Shadow bevel */}
      <rect x="136" y="32" width="4" height="26" fill={P_DARK} />
      <rect x="104" y="54" width="36" height="4" fill={P_DARK} />
      {/* Inner glowing energy core */}
      <rect x="116" y="40" width="12" height="10" fill={P_SKY} />
      <rect x="118" y="42" width="8" height="6" fill={P_WHITE} />

      {/* Pixel star sparkles around dense core */}
      {/* Star 1 */}
      <rect x="148" y="22" width="2" height="2" fill={P_BLUE} />
      <rect x="146" y="24" width="6" height="2" fill={P_SKY} />
      <rect x="148" y="26" width="2" height="2" fill={P_BLUE} />

      {/* Star 2 */}
      <rect x="102" y="16" width="2" height="2" fill={P_SKY} />
      <rect x="100" y="18" width="6" height="2" fill={P_WHITE} />
      <rect x="102" y="20" width="2" height="2" fill={P_SKY} />
    </svg>
  );
}

// 2. Pixel Art Real-time Endpoints: Server terminal emitting continuous pixel broadcast waves
function PixelStreamingVisual() {
  return (
    <svg
      viewBox="0 0 180 76"
      className="w-full h-full max-h-[110px]"
      shapeRendering="crispEdges"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* LEFT: 8-bit Server Terminal / Endpoint */}
      {/* Antenna Mast */}
      <rect x="26" y="12" width="2" height="2" fill={P_SKY} />
      <rect x="25" y="14" width="4" height="2" fill={P_BLUE} />
      <rect x="26" y="16" width="2" height="8" fill={P_NAVY} />

      {/* Server Tower Body */}
      <rect x="14" y="24" width="26" height="38" fill={P_NAVY} />
      <rect x="16" y="26" width="22" height="34" fill="#1E293B" />

      {/* Server Bay 1 */}
      <rect x="18" y="28" width="18" height="8" fill="#334155" />
      <rect x="20" y="31" width="4" height="2" fill={P_BLUE} />
      <rect x="26" y="31" width="4" height="2" fill={P_SKY} />
      <rect x="32" y="31" width="2" height="2" fill={P_WHITE} />

      {/* Server Bay 2 */}
      <rect x="18" y="38" width="18" height="8" fill="#334155" />
      <rect x="20" y="41" width="4" height="2" fill={P_BLUE} />
      <rect x="26" y="41" width="8" height="2" fill={P_SKY} />

      {/* Server Bay 3 */}
      <rect x="18" y="48" width="18" height="8" fill="#334155" />
      <rect x="20" y="51" width="6" height="2" fill={P_SKY} />
      <rect x="28" y="51" width="6" height="2" fill={P_BLUE} />

      {/* CENTER: Concentric Signal Broadcast Waves: ) ) ) ) */}
      {/* Wave 1 */}
      <rect x="46" y="38" width="2" height="8" fill={P_BLUE} />
      <rect x="44" y="34" width="2" height="4" fill={P_BLUE} />
      <rect x="44" y="46" width="2" height="4" fill={P_BLUE} />

      {/* Wave 2 */}
      <rect x="56" y="34" width="2" height="16" fill={P_SKY} />
      <rect x="54" y="28" width="2" height="6" fill={P_SKY} />
      <rect x="54" y="50" width="2" height="6" fill={P_SKY} />
      <rect x="52" y="24" width="2" height="4" fill={P_SKY} />
      <rect x="52" y="56" width="2" height="4" fill={P_SKY} />

      {/* Wave 3 */}
      <rect x="68" y="30" width="2" height="24" fill={P_BLUE} />
      <rect x="66" y="22" width="2" height="8" fill={P_BLUE} />
      <rect x="66" y="54" width="2" height="8" fill={P_BLUE} />
      <rect x="64" y="16" width="2" height="6" fill={P_BLUE} />
      <rect x="64" y="62" width="2" height="6" fill={P_BLUE} />

      {/* Floating Kinetic Stream Packets */}
      {/* Packet 1 */}
      <rect x="80" y="38" width="8" height="8" fill={P_NAVY} />
      <rect x="81" y="39" width="6" height="6" fill={P_BLUE} />
      <rect x="82" y="40" width="4" height="4" fill={P_WHITE} />

      {/* Packet 2 */}
      <rect x="98" y="28" width="10" height="10" fill={P_NAVY} />
      <rect x="99" y="29" width="8" height="8" fill={P_SKY} />
      <rect x="101" y="31" width="4" height="4" fill={P_WHITE} />

      {/* Packet 3 */}
      <rect x="118" y="42" width="8" height="8" fill={P_NAVY} />
      <rect x="119" y="43" width="6" height="6" fill={P_BLUE} />
      <rect x="121" y="45" width="2" height="2" fill={P_SKY} />

      {/* RIGHT: Agent Receiver Node Target */}
      <rect x="144" y="30" width="22" height="22" fill={P_LIGHT} />
      <rect x="144" y="30" width="22" height="2" fill={P_MUTED} />
      <rect x="144" y="50" width="22" height="2" fill={P_SLATE} />
      <rect x="144" y="30" width="2" height="22" fill={P_MUTED} />
      <rect x="164" y="30" width="2" height="22" fill={P_SLATE} />

      {/* Receiver Target Reticle in Docker Blue */}
      <rect x="150" y="36" width="10" height="10" fill={P_BLUE} />
      <rect x="152" y="38" width="6" height="6" fill={P_SKY} />
      <rect x="154" y="40" width="2" height="2" fill={P_WHITE} />
    </svg>
  );
}

// 3. Pixel Art Deterministic Contract: Two interlocking puzzle pieces with precision alignment and checkmark
function PixelContractVisual() {
  return (
    <svg
      viewBox="0 0 180 76"
      className="w-full h-full max-h-[110px]"
      shapeRendering="crispEdges"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* LEFT: Neutral Socket Puzzle Piece */}
      <rect x="30" y="20" width="40" height="40" fill={P_LIGHT} />
      <rect x="30" y="20" width="40" height="3" fill={P_WHITE} />
      <rect x="30" y="20" width="3" height="40" fill={P_WHITE} />
      <rect x="67" y="20" width="3" height="40" fill={P_SLATE} />
      <rect x="30" y="57" width="40" height="3" fill={P_SLATE} />

      {/* Socket Indentation Notch (Female Joint) */}
      <rect x="52" y="32" width="18" height="16" fill="#f2f2f2" />
      <rect x="52" y="32" width="18" height="2" fill={P_MUTED} />
      <rect x="52" y="32" width="2" height="16" fill={P_MUTED} />
      <rect x="52" y="46" width="18" height="2" fill={P_LIGHT} />

      {/* RIGHT: Docker Blue Precision Key Puzzle Piece */}
      <rect x="94" y="20" width="40" height="40" fill={P_BLUE} />
      <rect x="94" y="20" width="40" height="3" fill={P_SKY} />
      <rect x="94" y="20" width="3" height="40" fill={P_SKY} />
      <rect x="131" y="20" width="3" height="40" fill={P_DARK} />
      <rect x="94" y="57" width="40" height="3" fill={P_NAVY} />

      {/* Key Tab Extrusion (Male Joint) sliding towards socket */}
      <rect x="76" y="32" width="18" height="16" fill={P_BLUE} />
      <rect x="76" y="32" width="18" height="2" fill={P_SKY} />
      <rect x="76" y="32" width="2" height="16" fill={P_SKY} />
      <rect x="76" y="46" width="18" height="2" fill={P_NAVY} />

      {/* Interlocking Gap / Alignment Rays */}
      <rect x="71" y="34" width="4" height="2" fill={P_SKY} />
      <rect x="71" y="44" width="4" height="2" fill={P_SKY} />

      {/* Verification Seal: Floating Pixel Checkmark Badge [✓] */}
      {/* Badge Diamond Frame */}
      <rect x="80" y="2" width="4" height="4" fill={P_NAVY} />
      <rect x="76" y="6" width="12" height="4" fill={P_NAVY} />
      <rect x="74" y="10" width="16" height="4" fill={P_NAVY} />
      <rect x="76" y="14" width="12" height="4" fill={P_NAVY} />
      <rect x="80" y="18" width="4" height="4" fill={P_NAVY} />

      {/* Badge Fill */}
      <rect x="78" y="6" width="8" height="12" fill={P_SKY} />
      <rect x="76" y="8" width="12" height="8" fill={P_SKY} />

      {/* Crisp White Pixel Checkmark [✓] */}
      <rect x="77" y="12" width="2" height="2" fill={P_WHITE} />
      <rect x="79" y="14" width="2" height="2" fill={P_WHITE} />
      <rect x="81" y="12" width="2" height="2" fill={P_WHITE} />
      <rect x="83" y="10" width="2" height="2" fill={P_WHITE} />
      <rect x="85" y="8" width="2" height="2" fill={P_WHITE} />
    </svg>
  );
}

// 4. Pixel Art Continuous Git Sync: Branching Git tree with circular 8-bit sync loop
function PixelSyncVisual() {
  return (
    <svg
      viewBox="0 0 180 76"
      className="w-full h-full max-h-[110px]"
      shapeRendering="crispEdges"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main Git Trunk Rail (horizontal baseline) */}
      <rect x="18" y="52" width="144" height="4" fill={P_LIGHT} />
      <rect x="18" y="52" width="144" height="1" fill={P_MUTED} />

      {/* Commit Node 1 (Root, Neutral) */}
      <rect x="32" y="47" width="14" height="14" fill={P_NAVY} />
      <rect x="34" y="49" width="10" height="10" fill={P_SLATE} />
      <rect x="36" y="51" width="6" height="6" fill={P_WHITE} />

      {/* Branch Rail diverging upward */}
      <rect x="46" y="48" width="4" height="4" fill={P_BLUE} />
      <rect x="50" y="44" width="4" height="4" fill={P_BLUE} />
      <rect x="54" y="40" width="4" height="4" fill={P_BLUE} />
      <rect x="58" y="36" width="4" height="4" fill={P_BLUE} />
      <rect x="62" y="32" width="56" height="4" fill={P_BLUE} />
      <rect x="118" y="36" width="4" height="4" fill={P_BLUE} />
      <rect x="122" y="40" width="4" height="4" fill={P_BLUE} />
      <rect x="126" y="44" width="4" height="4" fill={P_BLUE} />
      <rect x="130" y="48" width="4" height="4" fill={P_BLUE} />

      {/* Commit Node 3 (Trunk merge, Neutral) */}
      <rect x="134" y="47" width="14" height="14" fill={P_NAVY} />
      <rect x="136" y="49" width="10" height="10" fill={P_SLATE} />
      <rect x="138" y="51" width="6" height="6" fill={P_WHITE} />

      {/* Active Sync Commit Node on Branch (Docker Blue) */}
      <rect x="82" y="26" width="16" height="16" fill={P_NAVY} />
      <rect x="84" y="28" width="12" height="12" fill={P_BLUE} />
      <rect x="84" y="28" width="12" height="2" fill={P_SKY} />
      <rect x="84" y="28" width="2" height="12" fill={P_SKY} />
      <rect x="88" y="32" width="4" height="4" fill={P_WHITE} />

      {/* Continuous Circular 8-Bit Sync Loop Icon [↻] encircling active node */}
      {/* Top Arc */}
      <rect x="82" y="12" width="16" height="3" fill={P_SKY} />
      {/* Right Arc */}
      <rect x="102" y="16" width="3" height="12" fill={P_SKY} />
      {/* Bottom Arc */}
      <rect x="82" y="30" width="14" height="3" fill={P_SKY} />
      {/* Left Arc */}
      <rect x="75" y="18" width="3" height="12" fill={P_SKY} />

      {/* Top Arrowhead */}
      <rect x="98" y="8" width="3" height="3" fill={P_BLUE} />
      <rect x="101" y="6" width="3" height="3" fill={P_BLUE} />
      <rect x="104" y="4" width="3" height="3" fill={P_BLUE} />
      <rect x="104" y="7" width="3" height="3" fill={P_BLUE} />
      <rect x="104" y="10" width="3" height="3" fill={P_BLUE} />

      {/* Sparkle energy pixels around sync */}
      <rect x="72" y="12" width="2" height="2" fill={P_SKY} />
      <rect x="108" y="32" width="2" height="2" fill={P_SKY} />
    </svg>
  );
}

export function AgentFeatures() {
  return (
    <section id="capabilities" className="pt-4">
      <div className="mb-4">
        <h2 className="text-[17px] sm:text-[19px] font-semibold tracking-[-0.02em] text-neutral-950">
          Core capabilities
        </h2>
      </div>

      {/* Asymmetric Bento Grid (desalineada / staggered 7+5 and 5+7) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Card 1: 80% Token reduction (Wide 7-span) */}
        <div className="col-span-1 md:col-span-7 rounded-[16px] border border-neutral-200/80 bg-[#f2f2f2] p-5 sm:p-6 transition-all duration-200 hover:border-neutral-300 hover:shadow-2xs flex flex-col justify-between min-h-[250px] group cursor-default">
          <div>
            <h3 className="text-[16px] font-semibold text-neutral-950 mb-1.5">
              80% Token reduction
            </h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed">
              Replaces verbose prose and HTML layouts with machine-dense AST tokens, leaving maximum context for agent reasoning.
            </p>
          </div>

          {/* Pure white backdrop, no gray box, large bold pixel art */}
          <div className="mt-4 flex items-center justify-center w-full h-[115px]">
            <PixelCompressionVisual />
          </div>
        </div>

        {/* Card 2: Sub-second streaming (Compact 5-span) */}
        <div className="col-span-1 md:col-span-5 rounded-[16px] border border-neutral-200/80 bg-[#f2f2f2] p-5 sm:p-6 transition-all duration-200 hover:border-neutral-300 hover:shadow-2xs flex flex-col justify-between min-h-[250px] group cursor-default">
          <div>
            <h3 className="text-[16px] font-semibold text-neutral-950 mb-1.5">
              Sub-second streaming
            </h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed">
              Low-latency REST and SSE endpoints stream syntax trees directly into active generation loops without stalls.
            </p>
          </div>

          {/* Pure white backdrop, no gray box, large bold pixel art */}
          <div className="mt-4 flex items-center justify-center w-full h-[115px]">
            <PixelStreamingVisual />
          </div>
        </div>

        {/* Card 3: Deterministic type contracts (Compact 5-span) */}
        <div className="col-span-1 md:col-span-5 rounded-[16px] border border-neutral-200/80 bg-[#f2f2f2] p-5 sm:p-6 transition-all duration-200 hover:border-neutral-300 hover:shadow-2xs flex flex-col justify-between min-h-[250px] group cursor-default">
          <div>
            <h3 className="text-[16px] font-semibold text-neutral-950 mb-1.5">
              Deterministic type contracts
            </h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed">
              Strict regex patterns, enums, and parameter constraints eliminate model guesswork and broken function calls.
            </p>
          </div>

          {/* Pure white backdrop, no gray box, large bold pixel art */}
          <div className="mt-4 flex items-center justify-center w-full h-[115px]">
            <PixelContractVisual />
          </div>
        </div>

        {/* Card 4: Continuous Git sync (Wide 7-span) */}
        <div className="col-span-1 md:col-span-7 rounded-[16px] border border-neutral-200/80 bg-[#f2f2f2] p-5 sm:p-6 transition-all duration-200 hover:border-neutral-300 hover:shadow-2xs flex flex-col justify-between min-h-[250px] group cursor-default">
          <div>
            <h3 className="text-[16px] font-semibold text-neutral-950 mb-1.5">
              Continuous Git sync
            </h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed">
              Instant webhooks re-index function signatures on every commit, so models never generate deprecated code.
            </p>
          </div>

          {/* Pure white backdrop, no gray box, large bold pixel art */}
          <div className="mt-4 flex items-center justify-center w-full h-[115px]">
            <PixelSyncVisual />
          </div>
        </div>
      </div>
    </section>
  );
}


