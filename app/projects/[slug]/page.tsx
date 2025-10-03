// app/projects/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

type Case = {
  title: string;
  problem: string[];
  built: string[];
  impact: string[];
  stack: string[];
  owned: string[]; // what you personally owned
  code?: string;
  demo?: string;
};

const cases: Record<string, Case> = {
  "stock-based-comp": {
    title: "Stock-Based Compensation System",
    problem: [
      "Team needed a simple way to calculate and track stock-based comp with clean exports for finance.",
    ],
    built: [
      "Designed a small service with clear inputs/outputs and predictable jobs.",
      "Added basic tests and a seed script for reliable demos.",
    ],
    impact: [
      "Cut manual time by ~40% (estimated) and reduced spreadsheet errors.",
      "The API stayed up during finals week with smooth deploys.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "GitHub Actions"],
    owned: ["API design", "data model", "tests", "deployment"],
    code: "https://github.com/akumar2408/stock-based-comp", // <- edit or remove
    demo: "", // optional
  },

  "streaming-etl": {
    title: "Safety Guardian – Streaming ETL",
    problem: [
      "Sensor data arrived in bursts; analytics lagged and dashboards lagged even more.",
    ],
    built: [
      "A tiny streaming pipeline with clear transforms and backfill support.",
      "Simple dead-letter queue and metrics so issues were visible.",
    ],
    impact: [
      "Fresh data within minutes instead of hours.",
      "On-call could triage faster because logs and metrics were obvious.",
    ],
    stack: ["AWS Kinesis", "Glue", "Redshift", "Python"],
    owned: ["ETL steps", "infra as code", "alerts", "dashboards"],
    code: "",
    demo: "",
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = cases[params.slug];
  return { title: item ? `${item.title} · Case Study` : "Project" };
}

export default function ProjectCase({ params }: { params: { slug: string } }) {
  const item = cases[params.slug];
  if (!item) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-zinc-300">Not found.</p>
        <Link href="/projects" className="underline text-sm opacity-80">← Back to projects</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/projects" className="text-sm opacity-80 hover:underline">← Back to projects</Link>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{item.title}</h1>

      <Section title="Problem" points={item.problem} />
      <Section title="What I built" points={item.built} />
      <Section title="Impact" points={item.impact} />
      <Section title="Stack" points={item.stack} />
      <Section title="What I owned" points={item.owned} />

      {(item.code || item.demo) && (
        <div className="mt-6 flex gap-3">
          {item.code && (
            <a href={item.code} target="_blank" rel="noopener noreferrer"
               className="rounded-[12px] border border-white/10 px-3 py-2 text-sm hover:bg-white/5">View code</a>
          )}
          {item.demo && (
            <a href={item.demo} target="_blank" rel="noopener noreferrer"
               className="rounded-[12px] border border-white/10 px-3 py-2 text-sm hover:bg-white/5">Open demo</a>
          )}
        </div>
      )}
    </main>
  );
}

function Section({ title, points }: { title: string; points: string[] }) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-medium">{title}</h2>
      <ul className="mt-2 list-disc ml-5 text-zinc-300 leading-relaxed space-y-2">
        {points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </section>
  );
}
