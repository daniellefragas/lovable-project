import { useMemo } from "react";

/**
 * Retro pixel computer drawn purely with CSS grid cells.
 * Mirror of the reference asset (flipped horizontally) so the
 * monitor faces the left side of the layout.
 *
 * Legend for the map:
 *   "."  -> empty (transparent)
 *   "#"  -> body / casing pixel
 *   "s"  -> screen / glass pixel
 *   "k"  -> keyboard accent pixel
 */

// 24 cols x 20 rows. Designed left->right as if facing left
// (so the monitor screen sits on the LEFT side, mirroring the asset).
const MAP = [
  "........................",
  "........................",
  "....#####...............",
  "...#sssss##.............",
  "..#ssssssss##...........",
  ".#sssssssssss##.........",
  "#ssssssssssssss##.......",
  "#ssssssssssssssss##.....",
  "#ssssssssssssssssss##...",
  "#sssssssssssssssssss##..",
  "#ssssssssssssssssss##...",
  ".#sssssssssssssss##.....",
  "..#ssssssssssss##.......",
  "...############.........",
  "..####################..",
  ".#kkkkkkkkkkkkkkkkkkkk#.",
  "#kkkkkkkkkkkkkkkkkkkkkk#",
  "#######################.",
  "........................",
  "........................",
];

const COLS = MAP[0].length;
const ROWS = MAP.length;

type Cell = { type: "body" | "screen" | "key"; delay: number; duration: number };

export const PixelComputer = () => {
  // Pre-compute pixel cells with stable randomized blink timings.
  const cells = useMemo(() => {
    const out: (Cell | null)[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const ch = MAP[r][c];
        if (ch === ".") {
          out.push(null);
          continue;
        }
        const type = ch === "s" ? "screen" : ch === "k" ? "key" : "body";
        out.push({
          type,
          // Long, scattered delays so blinks feel sparse and organic
          delay: Math.random() * 8,
          duration: 2.5 + Math.random() * 3.5,
        });
      }
    }
    return out;
  }, []);

  return (
    <div className="relative w-full h-full grid place-items-center">
      {/* Soft glow halos */}
      <div className="absolute h-[70%] w-[70%] rounded-full bg-py-teal/15 blur-3xl animate-pulse-glow" />
      <div className="absolute h-[40%] w-[40%] rounded-full bg-py-yellow/10 blur-3xl" />

      {/* Decorative pixel grid frame */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Pixel grid — flipped horizontally so it mirrors the original asset */}
      <div
        className="relative z-10 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          width: "min(320px, 80%)",
          aspectRatio: `${COLS} / ${ROWS}`,
          transform: "scaleX(-1)",
          imageRendering: "pixelated",
        }}
      >
        {cells.map((cell, i) => {
          if (!cell) return <div key={i} />;
          const color =
            cell.type === "screen"
              ? "hsl(var(--py-teal))"
              : cell.type === "key"
              ? "hsl(0 0% 70%)"
              : "hsl(0 0% 92%)";
          return (
            <div
              key={i}
              className="animate-pixel-blink"
              style={{
                backgroundColor: color,
                animationDelay: `${cell.delay}s`,
                animationDuration: `${cell.duration}s`,
                boxShadow:
                  cell.type === "screen"
                    ? "0 0 4px hsl(var(--py-teal) / 0.6)"
                    : undefined,
              }}
            />
          );
        })}
      </div>

      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, hsl(var(--py-teal)) 0px, hsl(var(--py-teal)) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Corner labels */}
      <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-py-teal/60">
        SYS://PYTHONLAB
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.2em] uppercase text-py-teal/60">
        v2025.04
      </div>
    </div>
  );
};
