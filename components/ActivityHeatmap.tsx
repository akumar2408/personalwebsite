"use client";

import * as React from "react";

type Dot = {
  x: number;  // column (0 = oldest)
  y: number;  // row    (0 = Mon)
  v: number;  // intensity 0..1
  date: Date;
};

export interface ActivityHeatmapProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Deterministic randomizer for the demo look */
  seed?: number;
  /** How many weeks (columns) to show */
  weeks?: number;
  /** Label for what the heat represents (e.g. “ship-days”) */
  metric?: string;
  /** Optional: start week on Monday (default true) */
  startOnMonday?: boolean;
}

export default function ActivityHeatmap({
  seed = 7,
  weeks = 8,
  metric = "activity",
  startOnMonday = true,
  className = "",
  ...rest
}: ActivityHeatmapProps) {
  // --- tiny deterministic PRNG (xor-shift) ---
  let s = seed || 1;
  const rand = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1000) / 1000;
  };

  // --- build grid (oldest -> newest, Mon..Sun) ---
  const days = 7;
  const today = new Date();
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // strip time

  // Helper to get Monday/Sunday index
  const weekday = (d: Date) => (d.getDay() === 0 ? 7 : d.getDay()); // 1..7 (Mon..Sun)

  const dots: Dot[] = [];
  // Find the first column’s Monday (or Sunday) so columns align to weeks
  const endWeekAnchor = new Date(end);
  const endOffset = startOnMonday ? weekday(endWeekAnchor) - 1 : endWeekAnchor.getDay(); // 0..6
  // last cell is today; newest column may be partial — that’s fine

  for (let cx = weeks - 1; cx >= 0; cx--) {
    for (let ry = 0; ry < days; ry++) {
      const daysBack = cx * 7 + (startOnMonday ? ry : (ry + 1) % 7) + (startOnMonday ? 0 : 0);
      // Align so column 0 starts at Monday of that week
      const delta = cx * 7 + ry - (endOffset - (startOnMonday ? 0 : end.getDay()));
      const d = new Date(end);
      d.setDate(end.getDate() - (weeks * 7 - 1 - (cx * 7 + ry))); // simple sliding window
      // override with a clean anchored calc so labels are correct
      const anchored = new Date(end);
      anchored.setDate(end.getDate() - (endOffset + (weeks - 1 - cx) * 7 - ry));

      dots.push({
        x: weeks - 1 - cx, // 0..weeks-1 oldest->newest
        y: ry,              // 0..6
        v: rand(),
        date: anchored,
      });
    }
  }

  // UI state for tooltip
  const [tip, setTip] = React.useState<{
    x: number;
    y: number;
    text: string;
    key: string;
  } | null>(null);

  function level(v: number) {
    if (v > 0.85) return "bg-fuchsia-400/60";
    if (v > 0.65) return "bg-purple-400/60";
    if (v > 0.45) return "bg-cyan-400/60";
    if (v > 0.25) return "bg-zinc-300/40";
    return "bg-zinc-600/30";
  }

  const fmt = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // weekday labels (Mon..Sun)
  const labels = startOnMonday
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      {...rest}
      className={[
        "relative rounded-[20px] ring-1 ring-white/10 bg-white/[0.04] p-4",
        "backdrop-blur shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        className,
      ].join(" ")}
      role="group"
      aria-label={`Heatmap of ${weeks} weeks of ${metric}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-3">
        <div className="text-sm text-zinc-300">Last {weeks} weeks</div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
          <span className="opacity-80">metric:</span>
          <span className="rounded-full px-2 py-0.5 ring-1 ring-white/10 bg-white/5">
            {metric}
          </span>
          <span className="ml-2 opacity-60">low</span>
          <span className="h-3 w-3 rounded-[4px] bg-zinc-600/30 ring-1 ring-white/10" />
          <span className="h-3 w-3 rounded-[4px] bg-cyan-400/60 ring-1 ring-white/10" />
          <span className="h-3 w-3 rounded-[4px] bg-purple-400/60 ring-1 ring-white/10" />
          <span className="h-3 w-3 rounded-[4px] bg-fuchsia-400/60 ring-1 ring-white/10" />
          <span className="opacity-60">high</span>
        </div>
      </div>

      {/* Grid wrapper to position tooltip relative to it */}
      <div className="relative">
        {/* Row labels (compact) */}
        <div className="absolute -left-10 top-0 hidden sm:grid text-[11px] text-zinc-500"
             style={{ gridTemplateRows: `repeat(${days}, 1.4rem)`, rowGap: "0.5rem" }}>
          {labels.map((l) => (
            <span key={l} className="h-5 leading-5">{l}</span>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${weeks}, 1.25rem)`,
            gridTemplateRows: `repeat(${days}, 1.25rem)`,
            gap: "0.5rem",
          }}
        >
          {dots.map((d, i) => {
            const text = `${fmt.format(d.date)} • ${metric}`;
            return (
              <button
                key={`${d.x}-${d.y}-${i}`}
                className={[
                  "h-5 w-5 rounded-[6px] ring-1 ring-white/10 focus:outline-none",
                  "transition-transform hover:scale-[1.07]",
                  level(d.v),
                ].join(" ")}
                onMouseEnter={(e) => {
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setTip({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 6, // above
                    text,
                    key: `${i}`,
                  });
                }}
                onMouseLeave={() => setTip((t) => (t && t.key === `${i}` ? null : t))}
                onFocus={(e) => {
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setTip({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 6,
                    text,
                    key: `${i}`,
                  });
                }}
                onBlur={() => setTip(null)}
                title={text} // native tooltip as fallback
                aria-label={text}
              />
            );
          })}
        </div>

        {/* Tooltip (portal-like but relative) */}
        {tip && (
          <div
            className="pointer-events-none fixed z-[70] -translate-x-1/2 -translate-y-full
                       rounded-[10px] border border-white/10 bg-zinc-900/95 px-2.5 py-1.5
                       text-xs text-zinc-100 shadow-xl"
            style={{ left: tip.x, top: tip.y }}
          >
            {tip.text}
          </div>
        )}
      </div>
    </div>
  );
}
