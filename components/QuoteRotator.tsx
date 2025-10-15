'use client';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  quotes: string[];
  intervalMs?: number;
};

export default function QuoteCard({ title, quotes, intervalMs = 3500 }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!quotes?.length) return;
    const t = setInterval(() => setI((n) => (n + 1) % quotes.length), intervalMs);
    return () => clearInterval(t);
  }, [quotes, intervalMs]);

  const q = quotes[i] ?? "";

  return (
    <div className="rounded-[20px] ring-1 ring-white/10 bg-white/[0.05] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="text-xs text-zinc-400 mb-1">{title}</div>
      <div className="text-sm text-zinc-200 leading-relaxed min-h-[2lh] transition">
        “{q}”
      </div>
      <div className="mt-2 flex gap-1">
        {quotes.map((_, idx) => (
          <span
            key={idx}
            className={[
              "h-1.5 w-1.5 rounded-full",
              idx === i ? "bg-white/70" : "bg-white/25",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
