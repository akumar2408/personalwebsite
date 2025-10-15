'use client';

type Item = { tag: string; title: string; note: string };
type Props = { items: Item[]; user?: string };

export default function FocusBoard({ items, user }: Props) {
  return (
    <div className="rounded-[20px] ring-1 ring-white/10 bg-white/[0.05] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-zinc-400">
          {user ? `${user}’s focus` : "What I’m tracking"}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="rounded-[14px] ring-1 ring-white/10 bg-white/5 p-3 hover:ring-white/20 transition"
          >
            <div className="text-[11px] uppercase tracking-wider text-cyan-300/90 mb-1">
              {it.tag}
            </div>
            <div className="text-sm font-medium">{it.title}</div>
            <div className="text-xs text-zinc-400 mt-1">{it.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
