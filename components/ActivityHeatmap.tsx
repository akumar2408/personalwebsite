"use client";

import * as React from "react";

type Dot = { x: number; y: number; v: number; date: Date };

export interface ActivityHeatmapProps
  extends React.HTMLAttributes<HTMLDivElement> {
  seed?: number;
  weeks?: number;
  metric?: string;
  startOnMonday?: boolean;
}

export default function ActivityHeatmap({
  seed = 7,
  weeks = 8,
  metric = "ship-days",
  startOnMonday = true,
  className = "",
  ...rest
}: ActivityHeatmapProps) {
  // deterministic rng
  let s = seed || 1;
  const rand = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1000) / 1000;
  };

  const days = 7;
  const end = new Date();
  end.setHours(0, 0, 0, 0);

  const weekday = (d: Date) => (d.getDay() === 0 ? 7 : d.getDay()); // 1..7 (Mon..Sun)
  const endOffset = startOnMonday ? weekday(end) - 1 : end.getDay();

  const dots: Dot[] = [];
  for (let cx = weeks - 1; cx >= 0; cx--) {
    for (let ry = 0; ry < days; ry++) {
      const d = new Date(end);
      // anchor per-row date so Mon..Sun align across columns
      d.setDate(end.getDate() - (endOffset + (weeks - 1 - cx) * 7 - ry));
      dots.push({ x: weeks - 1 - cx, y: ry, v: rand(), date: d });
    }
  }

  const [tip, setTip] = React.useState<{
    left: number;
    top: number;
    text: string;
    show: boolean;
  } | null>(null);

  const gridRef = React.useRef<HTMLDivElement>(null);
  const fmt = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  function level(v: number) {
    if (v > 0.85) return "bg-fuchsia-400/60";
    if (v > 0.65) return "bg-purple-400/60";
    if (v > 0.45) return "bg-cyan-400/60";
    if (v > 0.25) return "bg-zinc-300/40";
    return "bg-zinc-600/30";
  }

  // labels (only on sm+ to keep compact)
  const labels = startOnMonday
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // helpers for tooltip positioning relative to the grid container
  function showTip(el: HTMLElement, text: string) {
    const container = gridRef.current!;
    const crect = container.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const left = rect.left - crect.left + rect.width / 2;
    const top = rect.top - crect.top - 8; // above cell

    // clamp inside container
    const clampedLeft = Math.max(8, Math.min(left, crect.width - 8));
    const clampedTop = Math.max(8, top);

    setTip({ left: clampedLeft, top: clampedTop, text, show: true });
  }

  function hideTip() {
    setTip((t) => (t ? { ...t, show: false } : null));
    // fully remove after fade (avoid layout shift)
    setTimeout(() => setTip(null), 140);
  }

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

      {/* Grid wrapper (relative = tooltip anchor) */}
      <div className="relative">
        {/* Row labels */}
        <div
          className="absolute -left-10 top-0 hidden sm:grid text-[11px] text-zinc-500"
          style={{ gridTemplateRows: `repeat(${days}, 1.4rem)`, rowGap: "0.5rem" }}
        >
          {labels.map((l) => (
            <span key={l} className="h-5 leading-5">
              {l}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="relative grid"
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
                onMouseEnter={(e) => showTip(e.currentTarget, text)}
                onMouseLeave={hideTip}
                onFocus={(e) => showTip(e.currentTarget, text)}
                onBlur={hideTip}
                // IMPORTANT: no native title (prevents the extra tooltip)
                aria-label={text}
              />
            );
          })}

          {/* Tooltip (inside the grid; clamped) */}
          {tip && (
            <div
              className={[
                "pointer-events-none absolute z-[5] -translate-x-1/2 -translate-y-full",
                "rounded-[10px] border border-white/10 bg-zinc-900/95 px-2.5 py-1.5",
                "text-xs text-zinc-100 shadow-xl transition-opacity duration-150",
                tip.show ? "opacity-100" : "opacity-0",
              ].join(" ")}
              style={{ left: tip.left, top: tip.top }}
            >
              {tip.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
