// components/Changelog.tsx
"use client";

type Item = {
  tag: "BUILDING" | "LEARNING" | "SHIPPING" | "LIFE";
  title: string;
  note?: string;
  href?: string;
};

const titleGrad = 
    "bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-300";
    
export default function Changelog({
  updated,
  intro,
  items,
}: {
  updated: string;            // e.g. "Oct 15"
  intro?: string;             // one-liner under the Now heading
  items: Item[];
}) {
  const tagColor: Record<Item["tag"], string> = {
    BUILDING: "text-cyan-300",
    LEARNING: "text-emerald-300",
    SHIPPING: "text-fuchsia-300",
    LIFE: "text-purple-300",
  };

  return (
    <section id="now" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="flex items-baseline gap-3">
      <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>Now</h2>
        <span className="text-xs text-zinc-400">Updated {updated}</span>
      </div>
      {intro && <p className="mt-1 text-sm text-zinc-400">{intro}</p>}

      <div className="mt-6 grid md:grid-cols-2 gap-6 rounded-[28px] ring-1 ring-white/10 p-5 bg-white/[0.04] backdrop-blur">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-[16px] ring-1 ring-white/10 bg-white/[0.04] px-4 py-3 hover:ring-white/20 transition"
          >
            <p className={`text-[11px] font-semibold tracking-wider ${tagColor[it.tag]}`}>
              {it.tag}
            </p>

            {it.href ? (
              <a
                className="mt-1 inline-block font-medium underline underline-offset-4"
                href={it.href}
              >
                {it.title}
              </a>
            ) : (
              <p className="mt-1 font-medium">{it.title}</p>
            )}

            {it.note && <p className="mt-1 text-sm text-zinc-400">{it.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
