'use client';

type Props = { seed?: number };

/* tiny seeded rng so the pattern is stable across renders */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => (s = (1664525 * s + 1013904223) >>> 0) / 2 ** 32;
}

export default function ActivityHeatmap({ seed = 1 }: Props) {
  const rand = lcg(seed);
  const days = Array.from({ length: 7 * 6 }, () => rand()); // 6 weeks grid

  return (
    <div className="rounded-[20px] ring-1 ring-white/10 bg-white/[0.05] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="text-xs text-zinc-400 mb-2">Last few weeks</div>
      <div
        className="grid grid-cols-7 gap-1.5"
        aria-label="Activity heatmap"
      >
        {days.map((v, i) => {
          const lvl = v > 0.85 ? 4 : v > 0.6 ? 3 : v > 0.35 ? 2 : v > 0.15 ? 1 : 0;
          const classes = [
            "bg-white/10",
            "bg-cyan-400/30",
            "bg-fuchsia-400/35",
            "bg-purple-400/40",
            "bg-white/60",
          ][lvl];
          return (
            <div
              key={i}
              className={`h-4 w-4 rounded-[4px] ${classes} ring-1 ring-white/10`}
            />
          );
        })}
      </div>
    </div>
  );
}
