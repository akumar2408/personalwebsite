"use client";

import { useEffect, useState } from "react";
import { Fraunces } from "next/font/google";

// Elegant serif for quotes (pairs nicely with your UI)
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

type Props = {
  items: string[];
  intervalMs?: number;
  className?: string;
};

export default function QuoteRotator({
  items,
  intervalMs = 5200,
  className = "",
}: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), intervalMs);
    return () => clearInterval(t);
  }, [items, intervalMs]);

  return (
    <div
      className={[
        // full width card; visually aligns with your text column
        "w-full rounded-[20px] ring-1 ring-white/10 bg-white/[0.05] backdrop-blur",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] p-5 md:p-6",
        className,
      ].join(" ")}
      aria-label="Stuff I live by"
    >
      <div className="text-xs tracking-wide text-zinc-400 mb-2">Stuff I live by</div>

      {/* Quote */}
      <blockquote
        key={i}
        className={[
          fraunces.className,
          "relative text-2xl md:text-[28px] leading-[1.25] text-zinc-100",
          "transition-opacity duration-300",
        ].join(" ")}
      >
        {/* decorative opening quote */}
        <span
          aria-hidden
          className="select-none absolute -left-3 -top-1 text-3xl md:text-4xl text-white/20"
        >
          “
        </span>
        <span className="pl-3">{items[i]}</span>
      </blockquote>

      {/* dots */}
      {items.length > 1 && (
        <div className="mt-3 flex gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Show quote ${idx + 1}`}
              onClick={() => setI(idx)}
              className={[
                "h-1.5 w-3 rounded-full transition-all",
                idx === i ? "bg-white/70" : "bg-white/20 hover:bg-white/35",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
