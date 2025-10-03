// app/projects/page.tsx
import Link from "next/link";

const items = [
  {
    slug: "stock-based-comp",
    title: "Stock-Based Compensation System",
    summary: "A small, reliable service for calculating stock-based comp and exporting clean reports.",
  },
  {
    slug: "streaming-etl",
    title: "Safety Guardian — Streaming ETL",
    summary: "A steady pipeline for sensor data with simple transforms and visible errors.",
  },
];

export default function ProjectsIndex() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="opacity-70 mt-1">A few things I’ve built and shipped.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="rounded-[20px] border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition block"
          >
            <h2 className="font-medium">{p.title}</h2>
            <p className="text-sm text-zinc-300 mt-1">{p.summary}</p>
            <span className="text-sm underline mt-2 inline-block">Read the case study</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
