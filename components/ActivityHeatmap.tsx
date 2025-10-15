"use client";

import * as React from "react";

type Dot = { x: number; y: number; v: number };

export interface ActivityHeatmapProps
  extends React.HTMLAttributes<HTMLDivElement> {
  seed?: number;           // keep your seed
  user?: string;           // optional future use
  metric?: string;         // NEW: “commits”, “sessions”, etc (purely cosmetic)
}

export default function ActivityHeatmap({
  seed = 7,
  user,
  metric,
  className = "",
  ...rest                      // <-- picks up aria-label and any other HTML props
}: ActivityHeatmapProps) {
  // tiny PRNG so the dots are deterministic per seed
  let s = seed || 1;
  const rand = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    // map to [0,1]
    return ((s >>> 0) % 1000) / 1000;
  };

  const weeks = 10;      // columns
  const days = 7;        // rows
  const dots: Dot[] = [];

  for (let x = 0; x < weeks; x++) {
    for (let y = 0; y < days; y++) {
      dots.push({ x, y, v: rand() });
    }
  }

  function level(v: number) {
    if (v > 0.85) return "bg-fuchsia-400/60";
    if (v > 0.65) return "bg-purple-400/60";
    if (v > 0.45) return "bg-cyan-400/60";
    if (v > 0.25) return "bg-zinc-300/40";
    return "bg-zinc-600/30";
  }

  return (
    <div
      {...rest} // e.g. aria-label, title, id, onClick…
      className={[
        "rounded-[20px] ring-1 ring-white/10 bg-white/[0.04] p-4",
        "backdrop-blur shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        className,
      ].join(" ")}
      role="img"
      aria-roledescription="heatmap"
    >
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-sm text-zinc-300">Last few weeks</p>
        {metric && (
          <span className="text-xs text-zinc-400">metric: {metric}</span>
        )}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${weeks}, 1.25rem)`,
          gridTemplateRows: `repeat(${days}, 1.25rem)`,
          gap: "0.5rem",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            className={[
              "h-5 w-5 rounded-[6px]",
              "ring-1 ring-white/10",
              level(d.v),
            ].join(" ")}
            title={`week ${d.x + 1}, day ${d.y + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
